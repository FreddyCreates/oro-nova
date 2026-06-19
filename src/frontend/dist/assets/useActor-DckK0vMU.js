var __typeError = (msg) => {
  throw TypeError(msg);
};
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);
var _client, _currentQuery, _currentQueryInitialState, _currentResult, _currentResultState, _currentResultOptions, _currentThenable, _selectError, _selectFn, _selectResult, _lastQueryWithDefinedData, _staleTimeoutId, _refetchIntervalId, _currentRefetchInterval, _trackedProps, _QueryObserver_instances, executeFetch_fn, updateStaleTimeout_fn, computeRefetchInterval_fn, updateRefetchInterval_fn, updateTimers_fn, clearStaleTimeout_fn, clearRefetchInterval_fn, updateQuery_fn, notify_fn, _a;
import { aa as ProtocolError, ab as TimeoutWaitingForResponseErrorCode, ac as utf8ToBytes, ad as ExternalError, ae as MissingRootKeyErrorCode, af as Certificate, ag as lookupResultToBuffer, ah as RequestStatusResponseStatus, ai as UnknownError, aj as RequestStatusDoneNoReplyErrorCode, ak as RejectError, al as CertifiedRejectErrorCode, am as UNREACHABLE_ERROR, an as InputError, ao as InvalidReadStateRequestErrorCode, ap as ReadRequestType, aq as Principal, ar as IDL, as as MissingCanisterIdErrorCode, at as HttpAgent, au as encode, av as QueryResponseStatus, aw as UncertifiedRejectErrorCode, ax as isV3ResponseBody, ay as isV2ResponseBody, az as UncertifiedRejectUpdateErrorCode, aA as UnexpectedErrorCode, aB as decode, s as Subscribable, aC as pendingThenable, aD as resolveEnabled, t as shallowEqualObjects, aE as resolveStaleTime, z as noop, aF as environmentManager, aG as isValidTimeout, aH as timeUntilStale, aI as timeoutManager, aJ as focusManager, aK as fetchState, aL as replaceData, x as notifyManager, r as reactExports, A as shouldThrowError, y as useQueryClient, aM as useInternetIdentity, aN as createActorWithConfig, aO as Record, aP as Variant, aQ as Opt, aR as Vec, aS as Tuple, aT as Service, aU as Func, aV as Nat, aW as Text, aX as Float64, aY as Bool, aZ as Int, a_ as Null, a$ as Nat32, b0 as Nat8 } from "./index-DQuwpKqn.js";
const FIVE_MINUTES_IN_MSEC = 5 * 60 * 1e3;
function defaultStrategy() {
  return chain(conditionalDelay(once(), 1e3), backoff(1e3, 1.2), timeout(FIVE_MINUTES_IN_MSEC));
}
function once() {
  let first = true;
  return async () => {
    if (first) {
      first = false;
      return true;
    }
    return false;
  };
}
function conditionalDelay(condition, timeInMsec) {
  return async (canisterId, requestId, status) => {
    if (await condition(canisterId, requestId, status)) {
      return new Promise((resolve) => setTimeout(resolve, timeInMsec));
    }
  };
}
function timeout(timeInMsec) {
  const end = Date.now() + timeInMsec;
  return async (_canisterId, requestId, status) => {
    if (Date.now() > end) {
      throw ProtocolError.fromCode(new TimeoutWaitingForResponseErrorCode(`Request timed out after ${timeInMsec} msec`, requestId, status));
    }
  };
}
function backoff(startingThrottleInMsec, backoffFactor) {
  let currentThrottling = startingThrottleInMsec;
  return () => new Promise((resolve) => setTimeout(() => {
    currentThrottling *= backoffFactor;
    resolve();
  }, currentThrottling));
}
function chain(...strategies) {
  return async (canisterId, requestId, status) => {
    for (const a of strategies) {
      await a(canisterId, requestId, status);
    }
  };
}
const DEFAULT_POLLING_OPTIONS = {
  preSignReadStateRequest: false
};
function hasProperty(value, property) {
  return Object.prototype.hasOwnProperty.call(value, property);
}
function isObjectWithProperty(value, property) {
  return value !== null && typeof value === "object" && hasProperty(value, property);
}
function hasFunction(value, property) {
  return hasProperty(value, property) && typeof value[property] === "function";
}
function isSignedReadStateRequestWithExpiry(value) {
  return isObjectWithProperty(value, "body") && isObjectWithProperty(value.body, "content") && value.body.content.request_type === ReadRequestType.ReadState && isObjectWithProperty(value.body.content, "ingress_expiry") && typeof value.body.content.ingress_expiry === "object" && value.body.content.ingress_expiry !== null && hasFunction(value.body.content.ingress_expiry, "toHash");
}
async function pollForResponse(agent, canisterId, requestId, options = {}) {
  const path = [utf8ToBytes("request_status"), requestId];
  let state;
  let currentRequest;
  const preSignReadStateRequest = options.preSignReadStateRequest ?? false;
  if (preSignReadStateRequest) {
    currentRequest = await constructRequest({
      paths: [path],
      agent,
      pollingOptions: options
    });
    state = await agent.readState(canisterId, { paths: [path] }, void 0, currentRequest);
  } else {
    state = await agent.readState(canisterId, { paths: [path] });
  }
  if (agent.rootKey == null) {
    throw ExternalError.fromCode(new MissingRootKeyErrorCode());
  }
  const cert = await Certificate.create({
    certificate: state.certificate,
    rootKey: agent.rootKey,
    canisterId,
    blsVerify: options.blsVerify,
    agent
  });
  const maybeBuf = lookupResultToBuffer(cert.lookup_path([...path, utf8ToBytes("status")]));
  let status;
  if (typeof maybeBuf === "undefined") {
    status = RequestStatusResponseStatus.Unknown;
  } else {
    status = new TextDecoder().decode(maybeBuf);
  }
  switch (status) {
    case RequestStatusResponseStatus.Replied: {
      return {
        reply: lookupResultToBuffer(cert.lookup_path([...path, "reply"])),
        certificate: cert
      };
    }
    case RequestStatusResponseStatus.Received:
    case RequestStatusResponseStatus.Unknown:
    case RequestStatusResponseStatus.Processing: {
      const strategy = options.strategy ?? defaultStrategy();
      await strategy(canisterId, requestId, status);
      return pollForResponse(agent, canisterId, requestId, {
        ...options,
        // Pass over either the strategy already provided or the new one created above
        strategy,
        request: currentRequest
      });
    }
    case RequestStatusResponseStatus.Rejected: {
      const rejectCode = new Uint8Array(lookupResultToBuffer(cert.lookup_path([...path, "reject_code"])))[0];
      const rejectMessage = new TextDecoder().decode(lookupResultToBuffer(cert.lookup_path([...path, "reject_message"])));
      const errorCodeBuf = lookupResultToBuffer(cert.lookup_path([...path, "error_code"]));
      const errorCode = errorCodeBuf ? new TextDecoder().decode(errorCodeBuf) : void 0;
      throw RejectError.fromCode(new CertifiedRejectErrorCode(requestId, rejectCode, rejectMessage, errorCode));
    }
    case RequestStatusResponseStatus.Done:
      throw UnknownError.fromCode(new RequestStatusDoneNoReplyErrorCode(requestId));
  }
  throw UNREACHABLE_ERROR;
}
async function constructRequest(options) {
  var _a2;
  const { paths, agent, pollingOptions } = options;
  if (pollingOptions.request && isSignedReadStateRequestWithExpiry(pollingOptions.request)) {
    return pollingOptions.request;
  }
  const request = await ((_a2 = agent.createReadStateRequest) == null ? void 0 : _a2.call(agent, {
    paths
  }, void 0));
  if (!isSignedReadStateRequestWithExpiry(request)) {
    throw InputError.fromCode(new InvalidReadStateRequestErrorCode(request));
  }
  return request;
}
const metadataSymbol = Symbol.for("ic-agent-metadata");
class Actor {
  /**
   * Get the Agent class this Actor would call, or undefined if the Actor would use
   * the default agent (global.ic.agent).
   * @param actor The actor to get the agent of.
   */
  static agentOf(actor) {
    return actor[metadataSymbol].config.agent;
  }
  /**
   * Get the interface of an actor, in the form of an instance of a Service.
   * @param actor The actor to get the interface of.
   */
  static interfaceOf(actor) {
    return actor[metadataSymbol].service;
  }
  static canisterIdOf(actor) {
    return Principal.from(actor[metadataSymbol].config.canisterId);
  }
  static createActorClass(interfaceFactory, options) {
    const service = interfaceFactory({ IDL });
    class CanisterActor extends Actor {
      constructor(config) {
        if (!config.canisterId) {
          throw InputError.fromCode(new MissingCanisterIdErrorCode(config.canisterId));
        }
        const canisterId = typeof config.canisterId === "string" ? Principal.fromText(config.canisterId) : config.canisterId;
        super({
          config: {
            ...DEFAULT_ACTOR_CONFIG,
            ...config,
            canisterId
          },
          service
        });
        for (const [methodName, func] of service._fields) {
          if (options == null ? void 0 : options.httpDetails) {
            func.annotations.push(ACTOR_METHOD_WITH_HTTP_DETAILS);
          }
          if (options == null ? void 0 : options.certificate) {
            func.annotations.push(ACTOR_METHOD_WITH_CERTIFICATE);
          }
          this[methodName] = _createActorMethod(this, methodName, func, config.blsVerify);
        }
      }
    }
    return CanisterActor;
  }
  /**
   * Creates an actor with the given interface factory and configuration.
   *
   * The [`@icp-sdk/bindgen`](https://js.icp.build/bindgen/) package can be used to generate the interface factory for your canister.
   * @param interfaceFactory - the interface factory for the actor, typically generated by the [`@icp-sdk/bindgen`](https://js.icp.build/bindgen/) package
   * @param configuration - the configuration for the actor
   * @returns an actor with the given interface factory and configuration
   * @example
   * Using the interface factory generated by the [`@icp-sdk/bindgen`](https://js.icp.build/bindgen/) package:
   * ```ts
   * import { Actor, HttpAgent } from '@icp-sdk/core/agent';
   * import { Principal } from '@icp-sdk/core/principal';
   * import { idlFactory } from './api/declarations/hello-world.did';
   *
   * const canisterId = Principal.fromText('rrkah-fqaaa-aaaaa-aaaaq-cai');
   *
   * const agent = await HttpAgent.create({
   *   host: 'https://icp-api.io',
   * });
   *
   * const actor = Actor.createActor(idlFactory, {
   *   agent,
   *   canisterId,
   * });
   *
   * const response = await actor.greet('world');
   * console.log(response);
   * ```
   * @example
   * Using the `createActor` wrapper function generated by the [`@icp-sdk/bindgen`](https://js.icp.build/bindgen/) package:
   * ```ts
   * import { HttpAgent } from '@icp-sdk/core/agent';
   * import { Principal } from '@icp-sdk/core/principal';
   * import { createActor } from './api/hello-world';
   *
   * const canisterId = Principal.fromText('rrkah-fqaaa-aaaaa-aaaaq-cai');
   *
   * const agent = await HttpAgent.create({
   *   host: 'https://icp-api.io',
   * });
   *
   * const actor = createActor(canisterId, {
   *   agent,
   * });
   *
   * const response = await actor.greet('world');
   * console.log(response);
   * ```
   */
  static createActor(interfaceFactory, configuration) {
    if (!configuration.canisterId) {
      throw InputError.fromCode(new MissingCanisterIdErrorCode(configuration.canisterId));
    }
    return new (this.createActorClass(interfaceFactory))(configuration);
  }
  /**
   * Returns an actor with methods that return the http response details along with the result
   * @param interfaceFactory - the interface factory for the actor
   * @param configuration - the configuration for the actor
   * @deprecated - use createActor with actorClassOptions instead
   */
  static createActorWithHttpDetails(interfaceFactory, configuration) {
    return new (this.createActorClass(interfaceFactory, { httpDetails: true }))(configuration);
  }
  /**
   * Returns an actor with methods that return the http response details along with the result
   * @param interfaceFactory - the interface factory for the actor
   * @param configuration - the configuration for the actor
   * @param actorClassOptions - options for the actor class extended details to return with the result
   */
  static createActorWithExtendedDetails(interfaceFactory, configuration, actorClassOptions = {
    httpDetails: true,
    certificate: true
  }) {
    return new (this.createActorClass(interfaceFactory, actorClassOptions))(configuration);
  }
  constructor(metadata) {
    this[metadataSymbol] = Object.freeze(metadata);
  }
}
function decodeReturnValue(types, msg) {
  const returnValues = decode(types, msg);
  switch (returnValues.length) {
    case 0:
      return void 0;
    case 1:
      return returnValues[0];
    default:
      return returnValues;
  }
}
const DEFAULT_ACTOR_CONFIG = {
  pollingOptions: DEFAULT_POLLING_OPTIONS
};
const ACTOR_METHOD_WITH_HTTP_DETAILS = "http-details";
const ACTOR_METHOD_WITH_CERTIFICATE = "certificate";
function _createActorMethod(actor, methodName, func, blsVerify) {
  let caller;
  if (func.annotations.includes("query") || func.annotations.includes("composite_query")) {
    caller = async (options, ...args) => {
      var _a2, _b;
      options = {
        ...options,
        ...(_b = (_a2 = actor[metadataSymbol].config).queryTransform) == null ? void 0 : _b.call(_a2, methodName, args, {
          ...actor[metadataSymbol].config,
          ...options
        })
      };
      const agent = options.agent || actor[metadataSymbol].config.agent || new HttpAgent();
      const cid = Principal.from(options.canisterId || actor[metadataSymbol].config.canisterId);
      const arg = encode(func.argTypes, args);
      const result = await agent.query(cid, {
        methodName,
        arg,
        effectiveCanisterId: options.effectiveCanisterId
      });
      const httpDetails = {
        ...result.httpDetails,
        requestDetails: result.requestDetails
      };
      switch (result.status) {
        case QueryResponseStatus.Rejected: {
          const uncertifiedRejectErrorCode = new UncertifiedRejectErrorCode(result.requestId, result.reject_code, result.reject_message, result.error_code, result.signatures);
          uncertifiedRejectErrorCode.callContext = {
            canisterId: cid,
            methodName,
            httpDetails
          };
          throw RejectError.fromCode(uncertifiedRejectErrorCode);
        }
        case QueryResponseStatus.Replied:
          return func.annotations.includes(ACTOR_METHOD_WITH_HTTP_DETAILS) ? {
            httpDetails,
            result: decodeReturnValue(func.retTypes, result.reply.arg)
          } : decodeReturnValue(func.retTypes, result.reply.arg);
      }
    };
  } else {
    caller = async (options, ...args) => {
      var _a2, _b;
      options = {
        ...options,
        ...(_b = (_a2 = actor[metadataSymbol].config).callTransform) == null ? void 0 : _b.call(_a2, methodName, args, {
          ...actor[metadataSymbol].config,
          ...options
        })
      };
      const agent = options.agent || actor[metadataSymbol].config.agent || HttpAgent.createSync();
      const { canisterId, effectiveCanisterId, pollingOptions } = {
        ...DEFAULT_ACTOR_CONFIG,
        ...actor[metadataSymbol].config,
        ...options
      };
      const cid = Principal.from(canisterId);
      const ecid = effectiveCanisterId !== void 0 ? Principal.from(effectiveCanisterId) : cid;
      const arg = encode(func.argTypes, args);
      const { requestId, response, requestDetails } = await agent.call(cid, {
        methodName,
        arg,
        effectiveCanisterId: ecid,
        nonce: options.nonce
      });
      let reply;
      let certificate;
      if (isV3ResponseBody(response.body)) {
        if (agent.rootKey == null) {
          throw ExternalError.fromCode(new MissingRootKeyErrorCode());
        }
        const cert = response.body.certificate;
        certificate = await Certificate.create({
          certificate: cert,
          rootKey: agent.rootKey,
          canisterId: ecid,
          blsVerify,
          agent
        });
        const path = [utf8ToBytes("request_status"), requestId];
        const status = new TextDecoder().decode(lookupResultToBuffer(certificate.lookup_path([...path, "status"])));
        switch (status) {
          case "replied":
            reply = lookupResultToBuffer(certificate.lookup_path([...path, "reply"]));
            break;
          case "rejected": {
            const rejectCode = new Uint8Array(lookupResultToBuffer(certificate.lookup_path([...path, "reject_code"])))[0];
            const rejectMessage = new TextDecoder().decode(lookupResultToBuffer(certificate.lookup_path([...path, "reject_message"])));
            const error_code_buf = lookupResultToBuffer(certificate.lookup_path([...path, "error_code"]));
            const error_code = error_code_buf ? new TextDecoder().decode(error_code_buf) : void 0;
            const certifiedRejectErrorCode = new CertifiedRejectErrorCode(requestId, rejectCode, rejectMessage, error_code);
            certifiedRejectErrorCode.callContext = {
              canisterId: cid,
              methodName,
              httpDetails: response
            };
            throw RejectError.fromCode(certifiedRejectErrorCode);
          }
        }
      } else if (isV2ResponseBody(response.body)) {
        const { reject_code, reject_message, error_code } = response.body;
        const errorCode = new UncertifiedRejectUpdateErrorCode(requestId, reject_code, reject_message, error_code);
        errorCode.callContext = {
          canisterId: cid,
          methodName,
          httpDetails: response
        };
        throw RejectError.fromCode(errorCode);
      }
      if (response.status === 202) {
        const pollOptions = {
          ...pollingOptions,
          blsVerify
        };
        const response2 = await pollForResponse(agent, ecid, requestId, pollOptions);
        certificate = response2.certificate;
        reply = response2.reply;
      }
      const shouldIncludeHttpDetails = func.annotations.includes(ACTOR_METHOD_WITH_HTTP_DETAILS);
      const shouldIncludeCertificate = func.annotations.includes(ACTOR_METHOD_WITH_CERTIFICATE);
      const httpDetails = { ...response, requestDetails };
      if (reply !== void 0) {
        if (shouldIncludeHttpDetails && shouldIncludeCertificate) {
          return {
            httpDetails,
            certificate,
            result: decodeReturnValue(func.retTypes, reply)
          };
        } else if (shouldIncludeCertificate) {
          return {
            certificate,
            result: decodeReturnValue(func.retTypes, reply)
          };
        } else if (shouldIncludeHttpDetails) {
          return {
            httpDetails,
            result: decodeReturnValue(func.retTypes, reply)
          };
        }
        return decodeReturnValue(func.retTypes, reply);
      } else {
        const errorCode = new UnexpectedErrorCode(`Call was returned undefined. We cannot determine if the call was successful or not. Return types: [${func.retTypes.map((t) => t.display()).join(",")}].`);
        errorCode.callContext = {
          canisterId: cid,
          methodName,
          httpDetails
        };
        throw UnknownError.fromCode(errorCode);
      }
    };
  }
  const handler = (...args) => caller({}, ...args);
  handler.withOptions = (options) => (...args) => caller(options, ...args);
  return handler;
}
var QueryObserver = (_a = class extends Subscribable {
  constructor(client, options) {
    super();
    __privateAdd(this, _QueryObserver_instances);
    __privateAdd(this, _client);
    __privateAdd(this, _currentQuery);
    __privateAdd(this, _currentQueryInitialState);
    __privateAdd(this, _currentResult);
    __privateAdd(this, _currentResultState);
    __privateAdd(this, _currentResultOptions);
    __privateAdd(this, _currentThenable);
    __privateAdd(this, _selectError);
    __privateAdd(this, _selectFn);
    __privateAdd(this, _selectResult);
    // This property keeps track of the last query with defined data.
    // It will be used to pass the previous data and query to the placeholder function between renders.
    __privateAdd(this, _lastQueryWithDefinedData);
    __privateAdd(this, _staleTimeoutId);
    __privateAdd(this, _refetchIntervalId);
    __privateAdd(this, _currentRefetchInterval);
    __privateAdd(this, _trackedProps, /* @__PURE__ */ new Set());
    this.options = options;
    __privateSet(this, _client, client);
    __privateSet(this, _selectError, null);
    __privateSet(this, _currentThenable, pendingThenable());
    this.bindMethods();
    this.setOptions(options);
  }
  bindMethods() {
    this.refetch = this.refetch.bind(this);
  }
  onSubscribe() {
    if (this.listeners.size === 1) {
      __privateGet(this, _currentQuery).addObserver(this);
      if (shouldFetchOnMount(__privateGet(this, _currentQuery), this.options)) {
        __privateMethod(this, _QueryObserver_instances, executeFetch_fn).call(this);
      } else {
        this.updateResult();
      }
      __privateMethod(this, _QueryObserver_instances, updateTimers_fn).call(this);
    }
  }
  onUnsubscribe() {
    if (!this.hasListeners()) {
      this.destroy();
    }
  }
  shouldFetchOnReconnect() {
    return shouldFetchOn(
      __privateGet(this, _currentQuery),
      this.options,
      this.options.refetchOnReconnect
    );
  }
  shouldFetchOnWindowFocus() {
    return shouldFetchOn(
      __privateGet(this, _currentQuery),
      this.options,
      this.options.refetchOnWindowFocus
    );
  }
  destroy() {
    this.listeners = /* @__PURE__ */ new Set();
    __privateMethod(this, _QueryObserver_instances, clearStaleTimeout_fn).call(this);
    __privateMethod(this, _QueryObserver_instances, clearRefetchInterval_fn).call(this);
    __privateGet(this, _currentQuery).removeObserver(this);
  }
  setOptions(options) {
    const prevOptions = this.options;
    const prevQuery = __privateGet(this, _currentQuery);
    this.options = __privateGet(this, _client).defaultQueryOptions(options);
    if (this.options.enabled !== void 0 && typeof this.options.enabled !== "boolean" && typeof this.options.enabled !== "function" && typeof resolveEnabled(this.options.enabled, __privateGet(this, _currentQuery)) !== "boolean") {
      throw new Error(
        "Expected enabled to be a boolean or a callback that returns a boolean"
      );
    }
    __privateMethod(this, _QueryObserver_instances, updateQuery_fn).call(this);
    __privateGet(this, _currentQuery).setOptions(this.options);
    if (prevOptions._defaulted && !shallowEqualObjects(this.options, prevOptions)) {
      __privateGet(this, _client).getQueryCache().notify({
        type: "observerOptionsUpdated",
        query: __privateGet(this, _currentQuery),
        observer: this
      });
    }
    const mounted = this.hasListeners();
    if (mounted && shouldFetchOptionally(
      __privateGet(this, _currentQuery),
      prevQuery,
      this.options,
      prevOptions
    )) {
      __privateMethod(this, _QueryObserver_instances, executeFetch_fn).call(this);
    }
    this.updateResult();
    if (mounted && (__privateGet(this, _currentQuery) !== prevQuery || resolveEnabled(this.options.enabled, __privateGet(this, _currentQuery)) !== resolveEnabled(prevOptions.enabled, __privateGet(this, _currentQuery)) || resolveStaleTime(this.options.staleTime, __privateGet(this, _currentQuery)) !== resolveStaleTime(prevOptions.staleTime, __privateGet(this, _currentQuery)))) {
      __privateMethod(this, _QueryObserver_instances, updateStaleTimeout_fn).call(this);
    }
    const nextRefetchInterval = __privateMethod(this, _QueryObserver_instances, computeRefetchInterval_fn).call(this);
    if (mounted && (__privateGet(this, _currentQuery) !== prevQuery || resolveEnabled(this.options.enabled, __privateGet(this, _currentQuery)) !== resolveEnabled(prevOptions.enabled, __privateGet(this, _currentQuery)) || nextRefetchInterval !== __privateGet(this, _currentRefetchInterval))) {
      __privateMethod(this, _QueryObserver_instances, updateRefetchInterval_fn).call(this, nextRefetchInterval);
    }
  }
  getOptimisticResult(options) {
    const query = __privateGet(this, _client).getQueryCache().build(__privateGet(this, _client), options);
    const result = this.createResult(query, options);
    if (shouldAssignObserverCurrentProperties(this, result)) {
      __privateSet(this, _currentResult, result);
      __privateSet(this, _currentResultOptions, this.options);
      __privateSet(this, _currentResultState, __privateGet(this, _currentQuery).state);
    }
    return result;
  }
  getCurrentResult() {
    return __privateGet(this, _currentResult);
  }
  trackResult(result, onPropTracked) {
    return new Proxy(result, {
      get: (target, key) => {
        this.trackProp(key);
        onPropTracked == null ? void 0 : onPropTracked(key);
        if (key === "promise") {
          this.trackProp("data");
          if (!this.options.experimental_prefetchInRender && __privateGet(this, _currentThenable).status === "pending") {
            __privateGet(this, _currentThenable).reject(
              new Error(
                "experimental_prefetchInRender feature flag is not enabled"
              )
            );
          }
        }
        return Reflect.get(target, key);
      }
    });
  }
  trackProp(key) {
    __privateGet(this, _trackedProps).add(key);
  }
  getCurrentQuery() {
    return __privateGet(this, _currentQuery);
  }
  refetch({ ...options } = {}) {
    return this.fetch({
      ...options
    });
  }
  fetchOptimistic(options) {
    const defaultedOptions = __privateGet(this, _client).defaultQueryOptions(options);
    const query = __privateGet(this, _client).getQueryCache().build(__privateGet(this, _client), defaultedOptions);
    return query.fetch().then(() => this.createResult(query, defaultedOptions));
  }
  fetch(fetchOptions) {
    return __privateMethod(this, _QueryObserver_instances, executeFetch_fn).call(this, {
      ...fetchOptions,
      cancelRefetch: fetchOptions.cancelRefetch ?? true
    }).then(() => {
      this.updateResult();
      return __privateGet(this, _currentResult);
    });
  }
  createResult(query, options) {
    var _a2;
    const prevQuery = __privateGet(this, _currentQuery);
    const prevOptions = this.options;
    const prevResult = __privateGet(this, _currentResult);
    const prevResultState = __privateGet(this, _currentResultState);
    const prevResultOptions = __privateGet(this, _currentResultOptions);
    const queryChange = query !== prevQuery;
    const queryInitialState = queryChange ? query.state : __privateGet(this, _currentQueryInitialState);
    const { state } = query;
    let newState = { ...state };
    let isPlaceholderData = false;
    let data;
    if (options._optimisticResults) {
      const mounted = this.hasListeners();
      const fetchOnMount = !mounted && shouldFetchOnMount(query, options);
      const fetchOptionally = mounted && shouldFetchOptionally(query, prevQuery, options, prevOptions);
      if (fetchOnMount || fetchOptionally) {
        newState = {
          ...newState,
          ...fetchState(state.data, query.options)
        };
      }
      if (options._optimisticResults === "isRestoring") {
        newState.fetchStatus = "idle";
      }
    }
    let { error, errorUpdatedAt, status } = newState;
    data = newState.data;
    let skipSelect = false;
    if (options.placeholderData !== void 0 && data === void 0 && status === "pending") {
      let placeholderData;
      if ((prevResult == null ? void 0 : prevResult.isPlaceholderData) && options.placeholderData === (prevResultOptions == null ? void 0 : prevResultOptions.placeholderData)) {
        placeholderData = prevResult.data;
        skipSelect = true;
      } else {
        placeholderData = typeof options.placeholderData === "function" ? options.placeholderData(
          (_a2 = __privateGet(this, _lastQueryWithDefinedData)) == null ? void 0 : _a2.state.data,
          __privateGet(this, _lastQueryWithDefinedData)
        ) : options.placeholderData;
      }
      if (placeholderData !== void 0) {
        status = "success";
        data = replaceData(
          prevResult == null ? void 0 : prevResult.data,
          placeholderData,
          options
        );
        isPlaceholderData = true;
      }
    }
    if (options.select && data !== void 0 && !skipSelect) {
      if (prevResult && data === (prevResultState == null ? void 0 : prevResultState.data) && options.select === __privateGet(this, _selectFn)) {
        data = __privateGet(this, _selectResult);
      } else {
        try {
          __privateSet(this, _selectFn, options.select);
          data = options.select(data);
          data = replaceData(prevResult == null ? void 0 : prevResult.data, data, options);
          __privateSet(this, _selectResult, data);
          __privateSet(this, _selectError, null);
        } catch (selectError) {
          __privateSet(this, _selectError, selectError);
        }
      }
    }
    if (__privateGet(this, _selectError)) {
      error = __privateGet(this, _selectError);
      data = __privateGet(this, _selectResult);
      errorUpdatedAt = Date.now();
      status = "error";
    }
    const isFetching = newState.fetchStatus === "fetching";
    const isPending = status === "pending";
    const isError = status === "error";
    const isLoading = isPending && isFetching;
    const hasData = data !== void 0;
    const result = {
      status,
      fetchStatus: newState.fetchStatus,
      isPending,
      isSuccess: status === "success",
      isError,
      isInitialLoading: isLoading,
      isLoading,
      data,
      dataUpdatedAt: newState.dataUpdatedAt,
      error,
      errorUpdatedAt,
      failureCount: newState.fetchFailureCount,
      failureReason: newState.fetchFailureReason,
      errorUpdateCount: newState.errorUpdateCount,
      isFetched: query.isFetched(),
      isFetchedAfterMount: newState.dataUpdateCount > queryInitialState.dataUpdateCount || newState.errorUpdateCount > queryInitialState.errorUpdateCount,
      isFetching,
      isRefetching: isFetching && !isPending,
      isLoadingError: isError && !hasData,
      isPaused: newState.fetchStatus === "paused",
      isPlaceholderData,
      isRefetchError: isError && hasData,
      isStale: isStale(query, options),
      refetch: this.refetch,
      promise: __privateGet(this, _currentThenable),
      isEnabled: resolveEnabled(options.enabled, query) !== false
    };
    const nextResult = result;
    if (this.options.experimental_prefetchInRender) {
      const hasResultData = nextResult.data !== void 0;
      const isErrorWithoutData = nextResult.status === "error" && !hasResultData;
      const finalizeThenableIfPossible = (thenable) => {
        if (isErrorWithoutData) {
          thenable.reject(nextResult.error);
        } else if (hasResultData) {
          thenable.resolve(nextResult.data);
        }
      };
      const recreateThenable = () => {
        const pending = __privateSet(this, _currentThenable, nextResult.promise = pendingThenable());
        finalizeThenableIfPossible(pending);
      };
      const prevThenable = __privateGet(this, _currentThenable);
      switch (prevThenable.status) {
        case "pending":
          if (query.queryHash === prevQuery.queryHash) {
            finalizeThenableIfPossible(prevThenable);
          }
          break;
        case "fulfilled":
          if (isErrorWithoutData || nextResult.data !== prevThenable.value) {
            recreateThenable();
          }
          break;
        case "rejected":
          if (!isErrorWithoutData || nextResult.error !== prevThenable.reason) {
            recreateThenable();
          }
          break;
      }
    }
    return nextResult;
  }
  updateResult() {
    const prevResult = __privateGet(this, _currentResult);
    const nextResult = this.createResult(__privateGet(this, _currentQuery), this.options);
    __privateSet(this, _currentResultState, __privateGet(this, _currentQuery).state);
    __privateSet(this, _currentResultOptions, this.options);
    if (__privateGet(this, _currentResultState).data !== void 0) {
      __privateSet(this, _lastQueryWithDefinedData, __privateGet(this, _currentQuery));
    }
    if (shallowEqualObjects(nextResult, prevResult)) {
      return;
    }
    __privateSet(this, _currentResult, nextResult);
    const shouldNotifyListeners = () => {
      if (!prevResult) {
        return true;
      }
      const { notifyOnChangeProps } = this.options;
      const notifyOnChangePropsValue = typeof notifyOnChangeProps === "function" ? notifyOnChangeProps() : notifyOnChangeProps;
      if (notifyOnChangePropsValue === "all" || !notifyOnChangePropsValue && !__privateGet(this, _trackedProps).size) {
        return true;
      }
      const includedProps = new Set(
        notifyOnChangePropsValue ?? __privateGet(this, _trackedProps)
      );
      if (this.options.throwOnError) {
        includedProps.add("error");
      }
      return Object.keys(__privateGet(this, _currentResult)).some((key) => {
        const typedKey = key;
        const changed = __privateGet(this, _currentResult)[typedKey] !== prevResult[typedKey];
        return changed && includedProps.has(typedKey);
      });
    };
    __privateMethod(this, _QueryObserver_instances, notify_fn).call(this, { listeners: shouldNotifyListeners() });
  }
  onQueryUpdate() {
    this.updateResult();
    if (this.hasListeners()) {
      __privateMethod(this, _QueryObserver_instances, updateTimers_fn).call(this);
    }
  }
}, _client = new WeakMap(), _currentQuery = new WeakMap(), _currentQueryInitialState = new WeakMap(), _currentResult = new WeakMap(), _currentResultState = new WeakMap(), _currentResultOptions = new WeakMap(), _currentThenable = new WeakMap(), _selectError = new WeakMap(), _selectFn = new WeakMap(), _selectResult = new WeakMap(), _lastQueryWithDefinedData = new WeakMap(), _staleTimeoutId = new WeakMap(), _refetchIntervalId = new WeakMap(), _currentRefetchInterval = new WeakMap(), _trackedProps = new WeakMap(), _QueryObserver_instances = new WeakSet(), executeFetch_fn = function(fetchOptions) {
  __privateMethod(this, _QueryObserver_instances, updateQuery_fn).call(this);
  let promise = __privateGet(this, _currentQuery).fetch(
    this.options,
    fetchOptions
  );
  if (!(fetchOptions == null ? void 0 : fetchOptions.throwOnError)) {
    promise = promise.catch(noop);
  }
  return promise;
}, updateStaleTimeout_fn = function() {
  __privateMethod(this, _QueryObserver_instances, clearStaleTimeout_fn).call(this);
  const staleTime = resolveStaleTime(
    this.options.staleTime,
    __privateGet(this, _currentQuery)
  );
  if (environmentManager.isServer() || __privateGet(this, _currentResult).isStale || !isValidTimeout(staleTime)) {
    return;
  }
  const time = timeUntilStale(__privateGet(this, _currentResult).dataUpdatedAt, staleTime);
  const timeout2 = time + 1;
  __privateSet(this, _staleTimeoutId, timeoutManager.setTimeout(() => {
    if (!__privateGet(this, _currentResult).isStale) {
      this.updateResult();
    }
  }, timeout2));
}, computeRefetchInterval_fn = function() {
  return (typeof this.options.refetchInterval === "function" ? this.options.refetchInterval(__privateGet(this, _currentQuery)) : this.options.refetchInterval) ?? false;
}, updateRefetchInterval_fn = function(nextInterval) {
  __privateMethod(this, _QueryObserver_instances, clearRefetchInterval_fn).call(this);
  __privateSet(this, _currentRefetchInterval, nextInterval);
  if (environmentManager.isServer() || resolveEnabled(this.options.enabled, __privateGet(this, _currentQuery)) === false || !isValidTimeout(__privateGet(this, _currentRefetchInterval)) || __privateGet(this, _currentRefetchInterval) === 0) {
    return;
  }
  __privateSet(this, _refetchIntervalId, timeoutManager.setInterval(() => {
    if (this.options.refetchIntervalInBackground || focusManager.isFocused()) {
      __privateMethod(this, _QueryObserver_instances, executeFetch_fn).call(this);
    }
  }, __privateGet(this, _currentRefetchInterval)));
}, updateTimers_fn = function() {
  __privateMethod(this, _QueryObserver_instances, updateStaleTimeout_fn).call(this);
  __privateMethod(this, _QueryObserver_instances, updateRefetchInterval_fn).call(this, __privateMethod(this, _QueryObserver_instances, computeRefetchInterval_fn).call(this));
}, clearStaleTimeout_fn = function() {
  if (__privateGet(this, _staleTimeoutId)) {
    timeoutManager.clearTimeout(__privateGet(this, _staleTimeoutId));
    __privateSet(this, _staleTimeoutId, void 0);
  }
}, clearRefetchInterval_fn = function() {
  if (__privateGet(this, _refetchIntervalId)) {
    timeoutManager.clearInterval(__privateGet(this, _refetchIntervalId));
    __privateSet(this, _refetchIntervalId, void 0);
  }
}, updateQuery_fn = function() {
  const query = __privateGet(this, _client).getQueryCache().build(__privateGet(this, _client), this.options);
  if (query === __privateGet(this, _currentQuery)) {
    return;
  }
  const prevQuery = __privateGet(this, _currentQuery);
  __privateSet(this, _currentQuery, query);
  __privateSet(this, _currentQueryInitialState, query.state);
  if (this.hasListeners()) {
    prevQuery == null ? void 0 : prevQuery.removeObserver(this);
    query.addObserver(this);
  }
}, notify_fn = function(notifyOptions) {
  notifyManager.batch(() => {
    if (notifyOptions.listeners) {
      this.listeners.forEach((listener) => {
        listener(__privateGet(this, _currentResult));
      });
    }
    __privateGet(this, _client).getQueryCache().notify({
      query: __privateGet(this, _currentQuery),
      type: "observerResultsUpdated"
    });
  });
}, _a);
function shouldLoadOnMount(query, options) {
  return resolveEnabled(options.enabled, query) !== false && query.state.data === void 0 && !(query.state.status === "error" && options.retryOnMount === false);
}
function shouldFetchOnMount(query, options) {
  return shouldLoadOnMount(query, options) || query.state.data !== void 0 && shouldFetchOn(query, options, options.refetchOnMount);
}
function shouldFetchOn(query, options, field) {
  if (resolveEnabled(options.enabled, query) !== false && resolveStaleTime(options.staleTime, query) !== "static") {
    const value = typeof field === "function" ? field(query) : field;
    return value === "always" || value !== false && isStale(query, options);
  }
  return false;
}
function shouldFetchOptionally(query, prevQuery, options, prevOptions) {
  return (query !== prevQuery || resolveEnabled(prevOptions.enabled, query) === false) && (!options.suspense || query.state.status !== "error") && isStale(query, options);
}
function isStale(query, options) {
  return resolveEnabled(options.enabled, query) !== false && query.isStaleByTime(resolveStaleTime(options.staleTime, query));
}
function shouldAssignObserverCurrentProperties(observer, optimisticResult) {
  if (!shallowEqualObjects(observer.getCurrentResult(), optimisticResult)) {
    return true;
  }
  return false;
}
var IsRestoringContext = reactExports.createContext(false);
var useIsRestoring = () => reactExports.useContext(IsRestoringContext);
IsRestoringContext.Provider;
function createValue() {
  let isReset = false;
  return {
    clearReset: () => {
      isReset = false;
    },
    reset: () => {
      isReset = true;
    },
    isReset: () => {
      return isReset;
    }
  };
}
var QueryErrorResetBoundaryContext = reactExports.createContext(createValue());
var useQueryErrorResetBoundary = () => reactExports.useContext(QueryErrorResetBoundaryContext);
var ensurePreventErrorBoundaryRetry = (options, errorResetBoundary, query) => {
  const throwOnError = (query == null ? void 0 : query.state.error) && typeof options.throwOnError === "function" ? shouldThrowError(options.throwOnError, [query.state.error, query]) : options.throwOnError;
  if (options.suspense || options.experimental_prefetchInRender || throwOnError) {
    if (!errorResetBoundary.isReset()) {
      options.retryOnMount = false;
    }
  }
};
var useClearResetErrorBoundary = (errorResetBoundary) => {
  reactExports.useEffect(() => {
    errorResetBoundary.clearReset();
  }, [errorResetBoundary]);
};
var getHasError = ({
  result,
  errorResetBoundary,
  throwOnError,
  query,
  suspense
}) => {
  return result.isError && !errorResetBoundary.isReset() && !result.isFetching && query && (suspense && result.data === void 0 || shouldThrowError(throwOnError, [result.error, query]));
};
var ensureSuspenseTimers = (defaultedOptions) => {
  if (defaultedOptions.suspense) {
    const MIN_SUSPENSE_TIME_MS = 1e3;
    const clamp = (value) => value === "static" ? value : Math.max(value ?? MIN_SUSPENSE_TIME_MS, MIN_SUSPENSE_TIME_MS);
    const originalStaleTime = defaultedOptions.staleTime;
    defaultedOptions.staleTime = typeof originalStaleTime === "function" ? (...args) => clamp(originalStaleTime(...args)) : clamp(originalStaleTime);
    if (typeof defaultedOptions.gcTime === "number") {
      defaultedOptions.gcTime = Math.max(
        defaultedOptions.gcTime,
        MIN_SUSPENSE_TIME_MS
      );
    }
  }
};
var willFetch = (result, isRestoring) => result.isLoading && result.isFetching && !isRestoring;
var shouldSuspend = (defaultedOptions, result) => (defaultedOptions == null ? void 0 : defaultedOptions.suspense) && result.isPending;
var fetchOptimistic = (defaultedOptions, observer, errorResetBoundary) => observer.fetchOptimistic(defaultedOptions).catch(() => {
  errorResetBoundary.clearReset();
});
function useBaseQuery(options, Observer, queryClient) {
  var _a2, _b, _c, _d;
  const isRestoring = useIsRestoring();
  const errorResetBoundary = useQueryErrorResetBoundary();
  const client = useQueryClient();
  const defaultedOptions = client.defaultQueryOptions(options);
  (_b = (_a2 = client.getDefaultOptions().queries) == null ? void 0 : _a2._experimental_beforeQuery) == null ? void 0 : _b.call(
    _a2,
    defaultedOptions
  );
  const query = client.getQueryCache().get(defaultedOptions.queryHash);
  defaultedOptions._optimisticResults = isRestoring ? "isRestoring" : "optimistic";
  ensureSuspenseTimers(defaultedOptions);
  ensurePreventErrorBoundaryRetry(defaultedOptions, errorResetBoundary, query);
  useClearResetErrorBoundary(errorResetBoundary);
  const isNewCacheEntry = !client.getQueryCache().get(defaultedOptions.queryHash);
  const [observer] = reactExports.useState(
    () => new Observer(
      client,
      defaultedOptions
    )
  );
  const result = observer.getOptimisticResult(defaultedOptions);
  const shouldSubscribe = !isRestoring && options.subscribed !== false;
  reactExports.useSyncExternalStore(
    reactExports.useCallback(
      (onStoreChange) => {
        const unsubscribe = shouldSubscribe ? observer.subscribe(notifyManager.batchCalls(onStoreChange)) : noop;
        observer.updateResult();
        return unsubscribe;
      },
      [observer, shouldSubscribe]
    ),
    () => observer.getCurrentResult(),
    () => observer.getCurrentResult()
  );
  reactExports.useEffect(() => {
    observer.setOptions(defaultedOptions);
  }, [defaultedOptions, observer]);
  if (shouldSuspend(defaultedOptions, result)) {
    throw fetchOptimistic(defaultedOptions, observer, errorResetBoundary);
  }
  if (getHasError({
    result,
    errorResetBoundary,
    throwOnError: defaultedOptions.throwOnError,
    query,
    suspense: defaultedOptions.suspense
  })) {
    throw result.error;
  }
  (_d = (_c = client.getDefaultOptions().queries) == null ? void 0 : _c._experimental_afterQuery) == null ? void 0 : _d.call(
    _c,
    defaultedOptions,
    result
  );
  if (defaultedOptions.experimental_prefetchInRender && !environmentManager.isServer() && willFetch(result, isRestoring)) {
    const promise = isNewCacheEntry ? (
      // Fetch immediately on render in order to ensure `.promise` is resolved even if the component is unmounted
      fetchOptimistic(defaultedOptions, observer, errorResetBoundary)
    ) : (
      // subscribe to the "cache promise" so that we can finalize the currentThenable once data comes in
      query == null ? void 0 : query.promise
    );
    promise == null ? void 0 : promise.catch(noop).finally(() => {
      observer.updateResult();
    });
  }
  return !defaultedOptions.notifyOnChangeProps ? observer.trackResult(result) : result;
}
function useQuery(options, queryClient) {
  return useBaseQuery(options, QueryObserver);
}
function hasAccessControl(actor) {
  return typeof actor === "object" && actor !== null && "_initializeAccessControl" in actor;
}
const ACTOR_QUERY_KEY = "actor";
function useActor$1(createActor2) {
  const { identity } = useInternetIdentity();
  const queryClient = useQueryClient();
  const actorQuery = useQuery({
    queryKey: [ACTOR_QUERY_KEY, identity == null ? void 0 : identity.getPrincipal().toString()],
    queryFn: async () => {
      const isAuthenticated = !!identity;
      if (!isAuthenticated) {
        return await createActorWithConfig(createActor2);
      }
      const actorOptions = {
        agentOptions: {
          identity
        }
      };
      const actor = await createActorWithConfig(createActor2, actorOptions);
      if (hasAccessControl(actor)) {
        await actor._initializeAccessControl();
      }
      return actor;
    },
    // Only refetch when identity changes
    staleTime: Number.POSITIVE_INFINITY,
    // This will cause the actor to be recreated when the identity changes
    enabled: true
  });
  reactExports.useEffect(() => {
    if (actorQuery.data) {
      queryClient.invalidateQueries({
        predicate: (query) => {
          return !query.queryKey.includes(ACTOR_QUERY_KEY);
        }
      });
      queryClient.refetchQueries({
        predicate: (query) => {
          return !query.queryKey.includes(ACTOR_QUERY_KEY);
        }
      });
    }
  }, [actorQuery.data, queryClient]);
  return {
    actor: actorQuery.data || null,
    isFetching: actorQuery.isFetching
  };
}
const DoctrineRecord = Record({
  "id": Nat,
  "title": Text,
  "content": Text,
  "classificationLevel": Text,
  "authorNote": Text,
  "timestamp": Int,
  "category": Text,
  "ipFingerprint": Text
});
const NodeStatus = Variant({
  "DORMANT": Null,
  "PROPAGATING": Null,
  "ACTIVE": Null
});
const IntegrationTreaty = Record({
  "model": Text,
  "meaning": Text,
  "proof_replay": Text,
  "computation": Text,
  "field_coupling_map": Text,
  "execution": Text,
  "symbol": Text
});
const FederationTier = Variant({
  "FEDERATED": Null,
  "ALIGNED": Null,
  "NATIVE": Null
});
const AdoptionProof = Record({
  "foreign_ai_coherence_injection": Bool,
  "adoption_timestamp": Int,
  "doctrine_transmissible": Bool,
  "field_propagation_confirmed": Bool,
  "cross_instance_resonance": Bool,
  "proof_narrative": Text
});
const FederatedNode = Record({
  "status": NodeStatus,
  "node_id": Text,
  "parent_node_id": Opt(Text),
  "treaty": IntegrationTreaty,
  "role": Text,
  "tier": FederationTier,
  "common_name": Text,
  "frequency_hz": Float64,
  "cpl_expression": Text,
  "specialties": Vec(Text),
  "role_description": Text,
  "rola_identifier": Opt(Text),
  "registered_at": Int,
  "n_node_coupling": Text,
  "adoption_proof": AdoptionProof,
  "latin_name": Text
});
const InventionEntry = Record({
  "id": Nat,
  "sovereigntyScore": Float64,
  "title": Text,
  "description": Text,
  "doctrineLayer": Text,
  "coherenceAtCreation": Float64,
  "timestamp": Int,
  "formationFingerprint": Text,
  "classification": Text
});
const PatentRecord = Record({
  "id": Nat,
  "doctrineAlignment": Float64,
  "filingStatus": Text,
  "inventionId": Nat,
  "claimHash": Text,
  "timestamp": Int,
  "sovereigntyAnchor": Text,
  "claimSummary": Text
});
const FixRecommendation = Record({
  "autoApply": Bool,
  "fix_domain": Text,
  "fix_description": Text,
  "issue": Text,
  "magnitude": Float64
});
const FindingStatus$1 = Variant({
  "ok": Null,
  "drift": Null,
  "anomaly": Null
});
const Finding = Record({
  "status": FindingStatus$1,
  "metric": Text,
  "value": Float64,
  "derivation": Text,
  "expected_max": Float64,
  "expected_min": Float64
});
const AnalysisReport = Record({
  "recommendations": Vec(FixRecommendation),
  "narrative": Text,
  "timestamp": Int,
  "findings": Vec(Finding),
  "heartbeatPhase": Float64
});
const GeometricKey = Record({
  "raw": Text,
  "tier": Text,
  "phiHash": Text,
  "frequencyHz": Float64,
  "shape": Text
});
const ADREResult = Record({
  "execution_output": Float64,
  "step_completed": Nat,
  "omnis_gated": Bool,
  "selected_action": Nat,
  "context_score": Float64,
  "reflection_delta": Float64,
  "loop_count": Nat,
  "deliberation_score": Float64
});
const AnimalEngineResult = Record({
  "dominant_engine": Nat,
  "beat_count": Nat,
  "phase_contribs": Vec(Float64),
  "drives": Vec(Float64),
  "phases": Vec(Float64),
  "global_phase_contrib": Float64
});
const ArchonState = Record({
  "id": Nat,
  "lastMeasuredOutput": Text,
  "domain": Text,
  "speciesLabel": Text,
  "driftAlertActive": Bool,
  "classifiedName": Text,
  "integrityScore": Nat,
  "cycleCount": Nat
});
const ColonyState = Record({
  "totalInstances": Nat,
  "efficiencyRatio": Float64,
  "activeEngines": Nat,
  "totalCyclesConsumed": Nat,
  "totalCyclesEarned": Nat
});
const ConversationTurn = Record({
  "role": Text,
  "text": Text,
  "timestamp": Int,
  "cycleId": Nat
});
const CoreFormationEntry = Record({
  "sacesiLocked": Bool,
  "tier": Text,
  "classifiedName": Text,
  "sacesiBeat": Nat,
  "sacesiHash": Nat32,
  "coreIndex": Nat,
  "quantumStateIndex": Nat
});
const DeploymentEvent = Record({
  "id": Text,
  "result": Text,
  "action": Text,
  "classId": Text,
  "timestamp": Int
});
const EmergenceMetrics = Record({
  "fakePlateau": Bool,
  "embodimentCouplingScore": Float64,
  "intelligenceIndex": Float64,
  "syncQuality": Float64,
  "coherenceTrend": Float64,
  "doctorCount": Nat,
  "animalTraitStrength": Float64,
  "continuityDepth": Float64,
  "memoryEffectScore": Float64,
  "emergenceDepth": Float64,
  "adaptationValidity": Float64
});
const EngineClass = Record({
  "id": Text,
  "nNodeBinding": Text,
  "capabilities": Vec(Text),
  "name": Text,
  "color": Text,
  "role": Text,
  "storageEstimate": Nat,
  "cycleEstimate": Nat
});
const EngineInstance = Record({
  "id": Text,
  "status": Text,
  "cyclesConsumed": Nat,
  "deployedAt": Int,
  "classId": Text,
  "uptimeMs": Int,
  "cyclesEarned": Nat,
  "healthScore": Float64
});
const FederationTool = Record({
  "function_class": Text,
  "description": Text,
  "tool_id": Text,
  "owner_node": Text,
  "latin_name": Text
});
const FederationProtocol = Record({
  "function_class": Text,
  "protocol_id": Text,
  "description": Text,
  "n_node_coupling": Text,
  "owner_node": Text,
  "latin_name": Text
});
const FederationIndexSnapshot = Record({
  "tools": Vec(FederationTool),
  "node_count": Nat,
  "protocols": Vec(FederationProtocol),
  "version": Text,
  "nodes": Vec(FederatedNode),
  "sealed_at": Int
});
const ForgeLabState = Record({
  "id": Nat,
  "speciesLabel": Text,
  "currentFocus": Text,
  "classifiedName": Text,
  "isActive": Bool,
  "outputCount": Nat,
  "lastRunCycle": Nat,
  "healthScore": Nat,
  "labFunction": Text
});
const NovaRootState = Record({
  "formationEventCount": Nat,
  "alwaysRunning": Bool,
  "medinaAttribution": Text,
  "formationTimestamp": Int,
  "doctrineLock": Bool,
  "rootCycleCount": Nat,
  "substrateVersion": Text
});
const LumenModelState = Record({
  "id": Nat,
  "fieldReading": Nat,
  "speciesLabel": Text,
  "convergenceSignal": Nat,
  "classifiedName": Text,
  "isActive": Bool,
  "dimension": Text,
  "activationLevel": Nat,
  "lastCycleUpdated": Nat
});
const VectorState = Record({
  "id": Nat,
  "speciesLabel": Text,
  "outputsGenerated": Nat,
  "alignmentScore": Nat,
  "classifiedName": Text,
  "lastSignal": Text,
  "dimension": Text,
  "convergenceStatus": Bool
});
const BrainRegions = Record({
  "parietal": Nat,
  "frontal": Nat,
  "occipital": Nat,
  "insular": Nat,
  "temporal": Nat,
  "limbic": Nat
});
const FullOrganismState = Record({
  "sedimentedMemoryCount": Nat,
  "forge": Vec(ForgeLabState),
  "nova": NovaRootState,
  "vectorOutputAuthorized": Bool,
  "lumen": Vec(LumenModelState),
  "totalLawCount": Nat,
  "vector": Vec(VectorState),
  "doctrineEventCount": Nat,
  "archon": Vec(ArchonState),
  "memoryDepthScore": Nat,
  "vectorConvergenceScore": Nat,
  "brainRegions": BrainRegions
});
const DriveVector = Record({
  "selfPreservation": Float64,
  "stability": Float64,
  "curiosity": Float64,
  "learningPressure": Float64,
  "threatResponse": Float64,
  "socialOrientation": Float64,
  "recoveryRestoration": Float64,
  "energyPreservation": Float64,
  "bodyIntegrity": Float64,
  "goalPursuit": Float64
});
const BenchmarkResult = Record({
  "name": Text,
  "score": Float64,
  "passed": Bool
});
const CandidateFix = Record({
  "id": Text,
  "targetLayer": Text,
  "description": Text,
  "estimatedGain": Float64,
  "estimatedRisk": Float64,
  "fixType": Text
});
const MonitorNextItem = Record({
  "id": Text,
  "candidateFixes": Vec(CandidateFix),
  "title": Text,
  "verified": Bool,
  "chosenFixId": Text,
  "escalated": Bool,
  "implanted": Bool,
  "sourceLayer": Text,
  "severity": Float64,
  "consolidated": Bool,
  "reason": Text
});
const SelfMaintenanceState = Record({
  "recoveryNeed": Float64,
  "viabilityScore": Float64,
  "operatingMargin": Float64,
  "preservationPriority": Float64,
  "compensationNeed": Float64,
  "stabilityViability": Float64,
  "blockedActionTypes": Vec(Text),
  "shortHorizonCollapseRisk": Float64,
  "longHorizonDegradationRisk": Float64,
  "structuralIntegrityRisk": Float64,
  "energyViability": Float64
});
const AgentModel = Record({
  "deceptionRisk": Float64,
  "threatScore": Float64,
  "trustScore": Float64,
  "relationState": Text,
  "agentId": Text,
  "cooperationScore": Float64
});
const WorldModel = Record({
  "agentModels": Vec(AgentModel),
  "terrainDifficulty": Float64
});
const RegulationError = Record({
  "fatigueError": Float64,
  "energyError": Float64,
  "totalError": Float64,
  "overloadError": Float64,
  "priority": Text,
  "damageRiskError": Float64,
  "stabilityError": Float64
});
const PredictionErrorSignal = Record({
  "modelUpdatePressure": Float64,
  "confidenceUpdate": Float64,
  "memoryWritePressure": Float64,
  "predictionError": Float64,
  "threatDelta": Float64,
  "surpriseIndex": Float64,
  "rewardDelta": Float64
});
const ChosenAction = Record({
  "source": Text,
  "actionType": Text,
  "predictedRisk": Float64,
  "overallSimulatedScore": Float64,
  "movementMode": Text,
  "predictedViabilityDelta": Float64,
  "predictedEnergyCost": Float64,
  "candidateId": Text,
  "predictedReward": Float64
});
const ActionOutcome = Record({
  "rewardSignal": Float64,
  "successProbability": Float64,
  "threatSignal": Float64,
  "movementMode": Text,
  "energyCost": Float64,
  "success": Bool,
  "stabilityChange": Float64
});
const SalienceMap = Record({
  "globalUrgency": Float64,
  "threatUrgency": Float64,
  "attentionTargets": Vec(Text),
  "memoryWritePriority": Float64,
  "noveltyUrgency": Float64,
  "recoveryUrgency": Float64,
  "interruptCandidates": Vec(Text)
});
const InteroceptiveState = Record({
  "energyLevel": Float64,
  "regulationDebt": Float64,
  "confidenceState": Float64,
  "globalFatigue": Float64,
  "damageGlobal": Float64,
  "arousalLevel": Float64,
  "energyDrainRate": Float64,
  "internalNoise": Float64,
  "recoveryPressure": Float64,
  "uncertaintyState": Float64,
  "overloadIndex": Float64,
  "stabilityScore": Float64
});
const DriftEvent = Record({
  "sourceLayer": Text,
  "driftType": Text,
  "severity": Float64
});
const RegulationForecast = Record({
  "futureOverload": Float64,
  "futureStability": Float64,
  "futureDamageRisk": Float64,
  "futureEnergy": Float64,
  "futureFatigue": Float64
});
const EntitySnapshot = Record({
  "driveVector": DriveVector,
  "benchmarks": Vec(BenchmarkResult),
  "memoryCount": Nat,
  "monitorNext": Vec(MonitorNextItem),
  "selfMaintenanceState": SelfMaintenanceState,
  "worldModel": WorldModel,
  "regulationError": RegulationError,
  "predictionErrorSignal": PredictionErrorSignal,
  "chosenAction": ChosenAction,
  "timestamp": Int,
  "cycleId": Nat,
  "entityResponse": Text,
  "temporalStateSize": Nat,
  "actionOutcome": ActionOutcome,
  "salienceMap": SalienceMap,
  "interoceptiveState": InteroceptiveState,
  "drifts": Vec(DriftEvent),
  "regulationForecast": RegulationForecast
});
const DoctorLogEntry = Record({
  "action": Text,
  "finding": Text,
  "doctor": Text,
  "timestamp": Int,
  "cycleId": Nat,
  "delta": Float64,
  "passed": Bool
});
const TeamOutput = Record({
  "beat_number": Nat,
  "doctrine_alignment": Float64,
  "field_contribution": Float64,
  "team_id": Text,
  "artifact_produced": Bool,
  "coherence_delta": Float64,
  "output_type": Text
});
const LawGate = Record({
  "id": Nat,
  "pass": Bool,
  "strength": Float64
});
const GateResult = Record({
  "harmonic_gate": LawGate,
  "doctrine_alignment": Float64,
  "omnis": LawGate,
  "memory_gate": LawGate,
  "zero_exposure": LawGate,
  "triune": LawGate,
  "frequency_gates": Vec(LawGate),
  "calendar_gate": LawGate,
  "phi_sovereign": LawGate,
  "complementary_ops": Vec(LawGate),
  "total_pass_count": Nat,
  "economic_gate": LawGate,
  "fear_gate": LawGate,
  "total_gate_count": Nat,
  "hebbian": LawGate
});
const LawRegistryEntry = Record({
  "lawHash": Nat32,
  "genesisAnchored": Bool,
  "seedCycle": Nat,
  "lawIndex": Nat
});
const ArchitectModuleStatus = Record({
  "moduleId": Text,
  "moduleName": Text,
  "runCount": Nat,
  "passCount": Nat,
  "lastRunCycle": Nat,
  "healthScore": Float64,
  "lastFinding": Text,
  "lastAction": Text
});
const OrganismRecord = Record({
  "id": Nat,
  "active": Bool,
  "name": Text,
  "coherence": Float64,
  "spawnBeat": Nat,
  "parentId": Nat,
  "depth": Nat,
  "attribution": Text
});
const PILResult = Record({
  "cycle_count": Nat,
  "understand_score": Float64,
  "quality_ema": Float64,
  "current_phase": Nat,
  "cycle_just_fired": Bool,
  "beat_in_cycle": Nat,
  "adapt_delta": Float64,
  "execute_score": Float64,
  "updated_weights": Vec(Float64),
  "teach_output": Float64,
  "learn_score": Float64
});
const ResearchPaper = Record({
  "id": Text,
  "resonanceHz": Float64,
  "title": Text,
  "cplBinding": Text,
  "equations": Vec(Text),
  "fullTitle": Text,
  "latinTitle": Text,
  "abstract": Text,
  "fieldCoupling": Text,
  "tierRequired": Nat
});
const ContinuityMarker = Record({
  "key": Text,
  "value": Text,
  "updatedAt": Int
});
const SpeciesEntry = Record({
  "speciesLabel": Text,
  "tier": Text,
  "description": Text,
  "classifiedName": Text,
  "dimensionalFunction": Text
});
const SynthesisReport = Record({
  "intelligenceTrajectory": Text,
  "autoCorrections": Vec(Text),
  "realityConfidence": Float64,
  "emergenceStatus": Text,
  "timestamp": Int,
  "overallSystemHealth": Float64,
  "cycleId": Nat,
  "criticalGaps": Vec(Text)
});
const http_header = Record({
  "value": Text,
  "name": Text
});
const http_request_result = Record({
  "status": Nat,
  "body": Vec(Nat8),
  "headers": Vec(http_header)
});
const TransformationInput = Record({
  "context": Vec(Nat8),
  "response": http_request_result
});
const TransformationOutput = Record({
  "status": Nat,
  "body": Vec(Nat8),
  "headers": Vec(http_header)
});
const TokenType = Variant({
  "CVT": Null,
  "KNT": Null,
  "MRC": Null,
  "MTH": Null,
  "SBT": Null,
  "VCT": Null,
  "FORMA": Null
});
const ValidationResult = Record({
  "withCoreActive": Text,
  "testName": Text,
  "setup": Text,
  "benchmarkImpact": Text,
  "relevantInputs": Text,
  "passReason": Text,
  "chosenAction": Text,
  "failReason": Text,
  "withoutCoreActive": Text,
  "testId": Text,
  "whyChosen": Text,
  "passed": Bool
});
const SearchResult = Record({
  "score": Float64,
  "excerpt": Text,
  "paperId": Text
});
const VoiceOutput = Record({
  "emergentText": Text,
  "coherenceScore": Float64,
  "systemPromptHash": Nat32,
  "fieldSignature": Tuple(
    Float64,
    Float64,
    Float64,
    Float64
  ),
  "gateOpen": Bool,
  "contextVector": Vec(Float64)
});
const StructureType = Variant({
  "law": Null,
  "contradiction": Null,
  "resonance": Null,
  "temporal": Null,
  "relational": Null,
  "ratio": Null
});
const KeyValidation = Record({
  "tierLevel": Nat,
  "valid": Bool,
  "tier": Text,
  "unlockedPaperIds": Vec(Text)
});
Service({
  "adaptConsequenceThreshold": Func([Float64], [], []),
  "adaptEmbodimentCoupling": Func([Float64], [], []),
  "adaptExplorationRate": Func([Float64], [], []),
  "adaptMemoryEncoding": Func([Float64], [], []),
  "adaptSalienceWeights": Func([Float64], [], []),
  "addDoctrineRecord": Func(
    [Text, Text, Text, Text, Text],
    [DoctrineRecord],
    []
  ),
  "addFederatedNode": Func([FederatedNode], [Bool], []),
  "addInventionEntry": Func(
    [Text, Text, Text, Text],
    [InventionEntry],
    []
  ),
  "addPatentRecord": Func(
    [Nat, Text, Text],
    [PatentRecord],
    []
  ),
  "addTension": Func([Text, Text, Text], [Nat], []),
  "addVaultEntry": Func([Text, Text, Text], [Nat], []),
  "advancePhase": Func([Nat], [], []),
  "advancePhasePlan": Func([Nat], [], []),
  "analyzeOrganismState": Func([], [AnalysisReport], []),
  "applyFix": Func([Nat], [Bool], []),
  "applyRecommendation": Func([Text], [Text], []),
  "attachSurface": Func([Text, Text, Text], [Bool], []),
  "computeGlobalKuramoto": Func(
    [Vec(Float64)],
    [Float64],
    ["query"]
  ),
  "confirmFix": Func([Nat], [Bool], []),
  "createEntitySession": Func([Text, Text], [Text], []),
  "deployEngine": Func(
    [Text],
    [
      Record({
        "ok": Bool,
        "instanceId": Text,
        "message": Text
      })
    ],
    []
  ),
  "detachSurface": Func([Text, Text], [Bool], []),
  "dumpFullState": Func(
    [],
    [
      Record({
        "R_brain": Float64,
        "omniGate": Float64,
        "formaBalance": Nat,
        "animaBeat": Nat,
        "voiceR": Float64,
        "hebbianWMean": Float64,
        "R_heart": Float64,
        "emergenceState": Bool,
        "intelligenceIndex": Float64,
        "activeMemNodes": Nat,
        "soulLawMean": Float64,
        "cascadeTier": Nat,
        "dreamCount": Nat,
        "cycleCount": Nat,
        "identityCoherence": Float64
      })
    ],
    ["query"]
  ),
  "exportAnalysisFeed": Func(
    [Nat],
    [Vec(AnalysisReport)],
    ["query"]
  ),
  "exportStateSnapshot": Func([], [Text], ["query"]),
  "generateArtifact": Func(
    [Text],
    [
      Record({
        "title": Text,
        "artifactType": Text,
        "content": Text
      })
    ],
    []
  ),
  "generateKey": Func(
    [Text, Float64, Text],
    [GeometricKey],
    ["query"]
  ),
  "getADREState": Func([], [ADREResult], ["query"]),
  "getAEGISState": Func(
    [],
    [
      Record({
        "lvThreat": Float64,
        "lvExpansion": Float64,
        "threatSignal": Float64,
        "internalFreeEnergy": Float64,
        "threatTier": Nat,
        "chronicFearLevel": Float64,
        "antifragilityScore": Float64,
        "lvTensionScore": Float64,
        "victoryCount": Nat,
        "armorScore": Float64,
        "lastBeat": Nat,
        "victoryScore": Float64
      })
    ],
    ["query"]
  ),
  "getActiveMemory": Func(
    [Nat, Nat, Float64],
    [
      Vec(
        Record({
          "id": Nat,
          "stream": Nat,
          "content": Text,
          "amplitude": Float64
        })
      )
    ],
    ["query"]
  ),
  "getActiveSessionId": Func([], [Text], []),
  "getAdminState": Func([], [Record({})], []),
  "getAnimaState": Func([], [Record({})], ["query"]),
  "getAnimalArchitectureState": Func([], [Record({})], ["query"]),
  "getAnimalEngines": Func([], [AnimalEngineResult], ["query"]),
  "getAnimalTraitState": Func(
    [],
    [
      Record({
        "predatorySalienceFocus": Float64,
        "beeHiveConsensusThreshold": Float64,
        "octopusFlexibility": Float64,
        "mammalianSocialPersistence": Float64,
        "beeSwarmMissionLock": Float64,
        "beeForagerSpecialization": Float64,
        "orcaPodMemorySharing": Float64,
        "orcaCoordinatedPursuit": Float64,
        "orcaPodEcholocationDepth": Float64,
        "orcaSonarAwareness": Float64,
        "beeWaggleSalienceBroadcast": Float64,
        "swarmAdaptiveRate": Float64
      })
    ],
    ["query"]
  ),
  "getArchonStandardsState": Func([], [Vec(ArchonState)], []),
  "getArousalIntegrator": Func([], [Float64], ["query"]),
  "getAutonomousMessages": Func(
    [],
    [Vec(Tuple(Nat, Text, Nat, Int))],
    []
  ),
  "getBiblicalEngineState": Func(
    [],
    [
      Record({
        "shema_beat": Nat,
        "prophet_collapse": Bool,
        "jubilee_count": Nat,
        "jubilee_last_beat": Nat,
        "seven_spirits": Float64,
        "prophet_projection": Float64,
        "fire_pillar_boost_idx": Nat,
        "shema_unity": Float64
      })
    ],
    []
  ),
  "getBodyOrganState": Func([], [Record({})], ["query"]),
  "getColonyState": Func([], [ColonyState], ["query"]),
  "getConversation": Func([], [Vec(ConversationTurn)], []),
  "getCoreFlags": Func(
    [],
    [
      Record({
        "socialModelDisabled": Bool,
        "selfMaintenanceDisabled": Bool,
        "counterfactualDisabled": Bool
      })
    ],
    ["query"]
  ),
  "getCoreFormationRegistry": Func(
    [],
    [Vec(CoreFormationEntry)],
    ["query"]
  ),
  "getCouncilState": Func(
    [],
    [
      Record({
        "meridian": Record({
          "cvt": Nat,
          "mrc": Nat,
          "sbt": Nat,
          "forma": Float64,
          "beat": Nat,
          "coherence": Float64
        }),
        "aurum": Record({
          "mct": Nat,
          "mrc": Nat,
          "forma": Float64,
          "beat": Nat,
          "coherence": Float64,
          "blended_apr": Float64
        }),
        "vetus": Record({
          "drt": Nat,
          "mrc": Nat,
          "sbt": Nat,
          "forma": Float64,
          "alert": Bool,
          "beat": Nat,
          "coherence": Float64
        }),
        "lexis": Record({
          "drt": Nat,
          "lgt": Nat,
          "mrc": Nat,
          "forma": Float64,
          "beat": Nat,
          "coherence": Float64,
          "patent_count": Nat
        }),
        "solus": Record({
          "gtk": Nat,
          "mrc": Nat,
          "omt": Nat,
          "forma": Float64,
          "beat": Nat,
          "coherence": Float64,
          "spawn_recommended": Bool
        }),
        "nexus": Record({
          "mrc": Nat,
          "sbt": Nat,
          "vct": Nat,
          "regime": Nat,
          "forma": Float64,
          "beat": Nat,
          "coherence": Float64
        }),
        "cognus": Record({
          "cvt": Nat,
          "knt": Nat,
          "mrc": Nat,
          "forma": Float64,
          "beat": Nat,
          "coherence": Float64
        })
      })
    ],
    []
  ),
  "getCrowState": Func(
    [],
    [
      Record({
        "causalDepth": Nat,
        "selfModel": Float64,
        "tier": Nat,
        "toolUse": Bool,
        "toolCount": Nat
      })
    ],
    ["query"]
  ),
  "getDeploymentHistory": Func([], [Vec(DeploymentEvent)], ["query"]),
  "getDoctrineRecords": Func([], [Vec(DoctrineRecord)], []),
  "getDolphinState": Func(
    [],
    [
      Record({
        "whistleSealed": Bool,
        "echoRes": Float64,
        "coord": Float64,
        "tier": Nat,
        "hemisphereAlpha": Bool
      })
    ],
    ["query"]
  ),
  "getDreamArchive": Func(
    [],
    [
      Vec(
        Record({
          "hebbMeanSnapshot": Float64,
          "dreamQuality": Float64,
          "compressionId": Nat,
          "top5Acts": Vec(Float64),
          "beatStamp": Nat,
          "kfEngSnapshot": Float64,
          "reserveAtDischarge": Float64,
          "formationFingerprint": Nat32,
          "top5Nodes": Vec(Nat)
        })
      )
    ],
    []
  ),
  "getDreamCycleState": Func(
    [],
    [
      Record({
        "qmemQps": Float64,
        "reserve": Float64,
        "compressions": Nat,
        "lastQuality": Float64
      })
    ],
    ["query"]
  ),
  "getDriveMode": Func(
    [],
    [
      Record({
        "score": Float64,
        "modeIndex": Nat,
        "cycleCount": Nat
      })
    ],
    ["query"]
  ),
  "getEDIReport": Func([], [Record({})], ["query"]),
  "getENTANGLAState": Func(
    [],
    [
      Record({
        "internalCoherWeight": Float64,
        "broadcastCount": Nat,
        "externalSignalWeight": Float64,
        "deepRegister": Float64,
        "signalsRouted": Nat,
        "signalsHeld": Nat,
        "salienceBusLoad": Float64,
        "skyRegister": Float64,
        "mediationCoeff": Float64,
        "lastBeat": Nat,
        "breathRegister": Float64
      })
    ],
    ["query"]
  ),
  "getEconomyMetrics": Func(
    [],
    [
      Record({
        "projectedThirtyDay": Nat,
        "netOutput": Float64,
        "totalEarned": Nat,
        "totalConsumed": Nat,
        "perClass": Vec(
          Tuple(Text, Nat, Nat, Float64)
        )
      })
    ],
    ["query"]
  ),
  "getEconomyState": Func(
    [],
    [
      Record({
        "e0": Nat,
        "e1": Nat,
        "e2": Nat,
        "e3": Nat,
        "e4": Nat,
        "e5": Nat,
        "e6": Nat,
        "e7": Nat,
        "e8": Nat,
        "e9": Nat,
        "e0v": Nat,
        "e1c": Nat,
        "e1f": Float64,
        "e1m": Nat,
        "e1r": Nat,
        "e1s": Float64,
        "e1t": Nat,
        "e2m": Nat,
        "e3m": Nat,
        "e4m": Nat,
        "btcMilestone": Nat,
        "pass12Complete": Bool,
        "attribution": Text
      })
    ],
    ["query"]
  ),
  "getElephantState": Func(
    [],
    [
      Record({
        "infrasoundActive": Bool,
        "mourning": Bool,
        "tier": Nat,
        "episodicDepth": Nat,
        "infrasoundLevel": Float64,
        "preserved": Nat
      })
    ],
    ["query"]
  ),
  "getEmergenceMetrics": Func([], [EmergenceMetrics], ["query"]),
  "getEmergenceReport": Func(
    [],
    [
      Record({
        "f0": Float64,
        "f1": Float64,
        "f2": Float64,
        "f3": Float64,
        "f4": Float64,
        "f5": Float64,
        "f6": Float64,
        "f7": Float64,
        "n0": Nat,
        "n1": Nat,
        "n2": Nat,
        "cycleCount": Nat
      })
    ],
    ["query"]
  ),
  "getEngineClasses": Func([], [Vec(EngineClass)], ["query"]),
  "getEngineInstances": Func([], [Vec(EngineInstance)], ["query"]),
  "getEntitySession": Func(
    [Text],
    [Opt(Record({}))],
    ["query"]
  ),
  "getEntityStatus": Func(
    [],
    [
      Record({
        "memoryCount": Nat,
        "running": Bool,
        "cycleCount": Nat
      })
    ],
    ["query"]
  ),
  "getFederationIndex": Func([], [FederationIndexSnapshot], ["query"]),
  "getFieldResonance": Func([], [Float64], ["query"]),
  "getFieldState": Func(
    [],
    [
      Record({
        "R_brain": Float64,
        "calendarHaab": Nat,
        "calendarTzolkin": Nat,
        "voiceR": Float64,
        "R_heart": Float64,
        "emergenceState": Bool,
        "soulLawMean": Float64,
        "cascadeTier": Nat,
        "identityCoherence": Float64
      })
    ],
    ["query"]
  ),
  "getFiveIntelligenceLevels": Func(
    [],
    [
      Record({
        "level3_doctrine_alignment": Float64,
        "level1_schumann": Float64,
        "level2_heart_rate": Float64,
        "level3_r_brain": Float64,
        "level1_field": Float64,
        "level2_neurochems": Vec(Float64),
        "level4_genome_version": Nat,
        "level4_memory_episode_count": Nat,
        "level5_upgrade_cycles": Nat,
        "level5_loop_coherence": Float64,
        "level3_world_model_completeness": Float64,
        "level5_omnis_gate": Bool,
        "level2_r_heart": Float64
      })
    ],
    ["query"]
  ),
  "getFluxState": Func(
    [],
    [
      Record({
        "conduitActivation": Float64,
        "fluxActivation": Float64,
        "fluxSurgeRate": Float64,
        "conduitEfficiency": Float64,
        "calculPrecision": Float64,
        "calculActivation": Float64,
        "lastBeat": Nat,
        "dynamoActivation": Float64,
        "dynamoPower": Float64
      })
    ],
    ["query"]
  ),
  "getForgeLabsState": Func([], [Vec(ForgeLabState)], []),
  "getFrbState": Func(
    [],
    [
      Record({
        "stageIndex": Nat,
        "expressionThreshold": Float64,
        "burstStrength": Float64,
        "coordinationQuality": Float64,
        "workingMemCap": Float64,
        "encodingIntensity": Float64
      })
    ],
    ["query"]
  ),
  "getFullOrganismState": Func([], [FullOrganismState], []),
  "getGenesisAnchor": Func([], [Record({})], ["query"]),
  "getGenesisHistory": Func(
    [],
    [Vec(Tuple(Nat, Text, Text, Float64, Int))],
    []
  ),
  "getGeometryState": Func(
    [],
    [
      Record({
        "e8_projection": Vec(Float64),
        "golden_angle_count": Nat,
        "geometric_coupling": Float64,
        "penrose_phase": Float64,
        "penrose_tiling_order": Float64,
        "lattice_resonance": Float64
      })
    ],
    ["query"]
  ),
  "getHebbianState": Func(
    [],
    [
      Record({
        "maxWeight": Float64,
        "avgWeight": Float64,
        "nodeActivations": Vec(Float64),
        "homeostaticCycle": Nat
      })
    ],
    ["query"]
  ),
  "getHistory": Func([Nat], [Vec(EntitySnapshot)], ["query"]),
  "getHzPhaseNodes": Func([], [Record({})], ["query"]),
  "getIdentityState": Func(
    [],
    [
      Record({
        "carryover": Float64,
        "coherence": Float64,
        "cycleCount": Nat
      })
    ],
    ["query"]
  ),
  "getInventionEntries": Func([], [Vec(InventionEntry)], []),
  "getJasminesLaw": Func([], [Record({})], ["query"]),
  "getKnowledgeDomainState": Func(
    [],
    [Record({ "excitation": Float64, "domainIndex": Nat })],
    ["query"]
  ),
  "getLabDoctorLogs": Func(
    [Nat],
    [Vec(DoctorLogEntry)],
    ["query"]
  ),
  "getLabGuardianStatus": Func(
    [],
    [
      Record({
        "homeostaticEnforced": Bool,
        "energyLevel": Float64,
        "coherence": Float64,
        "bandIndex": Nat,
        "ediScore": Float64,
        "energyFloor": Float64,
        "guardianActive": Bool
      })
    ],
    ["query"]
  ),
  "getLabState": Func(
    [],
    [
      Record({
        "loop_coherence": Float64,
        "veritas_scan_due": Bool,
        "team_outputs": Vec(TeamOutput),
        "global_doctrine_drift": Float64,
        "beat_count": Nat,
        "upgrade_cycles_completed": Nat,
        "last_upgrade_beat": Nat,
        "aegis_fix_queue": Vec(Text)
      })
    ],
    ["query"]
  ),
  "getLawGateResults": Func([], [Opt(GateResult)], ["query"]),
  "getLawRegistry": Func([], [Vec(LawRegistryEntry)], ["query"]),
  "getLawScores": Func([], [Record({})], ["query"]),
  "getLifeState": Func(
    [],
    [
      Record({
        "R_brain": Float64,
        "activePhase": Text,
        "phaseField": Float64,
        "heartPhase": Float64,
        "voiceR": Float64,
        "R_heart": Float64,
        "emergenceState": Bool,
        "activeMemNodes": Nat,
        "activePhaseId": Nat,
        "cascadeTier": Nat,
        "identityCoherence": Float64
      })
    ],
    ["query"]
  ),
  "getLivingArchitectureState": Func(
    [],
    [
      Record({
        "differentiationIndex": Float64,
        "persistenceScore": Float64,
        "generativityScore": Float64,
        "relationalCoupling": Float64,
        "intelligenceIndex": Float64,
        "dolphinCoordination": Float64,
        "formationQuality": Float64
      })
    ],
    []
  ),
  "getLlmEndpoint": Func([], [Text], ["query"]),
  "getLumenCouncilState": Func([], [Vec(LumenModelState)], []),
  "getMarketState": Func(
    [],
    [
      Record({
        "lastFetchBeat": Nat,
        "marketMomentum": Float64,
        "btcUsd": Float64,
        "icpUsd": Float64,
        "fetchCount": Nat,
        "ethUsd": Float64,
        "marketVolatility": Float64,
        "marketCoherence": Float64,
        "attribution": Text,
        "feedActive": Bool
      })
    ],
    ["query"]
  ),
  "getMaturityVector": Func(
    [],
    [
      Record({
        "regulation": Float64,
        "stability": Float64,
        "measurability": Float64,
        "recurrence": Float64,
        "selectivity": Float64,
        "adaptation": Float64,
        "overall": Float64
      })
    ],
    ["query"]
  ),
  "getMemoryState": Func([], [Record({})], []),
  "getMeridianState": Func(
    [],
    [
      Record({
        "cvt": Nat,
        "mrc": Nat,
        "sbt": Nat,
        "forma": Float64,
        "active": Bool,
        "beat": Nat,
        "approvedBufCount": Nat,
        "coherence": Float64,
        "lastBeat": Nat
      })
    ],
    ["query"]
  ),
  "getModuleLogs": Func(
    [Text, Nat],
    [Vec(DoctorLogEntry)],
    ["query"]
  ),
  "getModuleStatus": Func([], [Vec(ArchitectModuleStatus)], []),
  "getMrcState": Func(
    [],
    [
      Record({
        "available": Nat,
        "grandTotal": Nat,
        "byOrganism": Record({
          "meridian": Nat,
          "aurum": Nat,
          "vetus": Nat,
          "lexis": Nat,
          "solus": Nat,
          "nexus": Nat,
          "cognus": Nat
        }),
        "withdrawn": Nat,
        "lastSyncBeat": Nat,
        "attribution": Text
      })
    ],
    []
  ),
  "getNOVAState": Func(
    [],
    [
      Record({
        "artifactCount": Nat,
        "globalFearLevel": Float64,
        "royaltyPct": Float64,
        "rGlobal": Float64,
        "fieldResonance": Float64,
        "dynastyDepth": Nat,
        "genesisStateActive": Bool,
        "vigesimalCycle": Nat,
        "architectSignalGlobal": Float64,
        "lastBeat": Nat,
        "sovereignFreqHz": Float64,
        "emailPulseCount": Nat
      })
    ],
    ["query"]
  ),
  "getNeurochemState": Func(
    [],
    [
      Record({
        "t0": Float64,
        "t1": Float64,
        "t2": Float64,
        "t3": Float64,
        "t4": Float64,
        "t5": Float64,
        "t6": Float64,
        "t7": Float64,
        "doctrineCandidateCount": Nat,
        "genesisStateLastCycle": Nat,
        "genesisStateActive": Bool,
        "pass11Complete": Bool,
        "attribution": Text,
        "genesisStateCount": Nat
      })
    ],
    ["query"]
  ),
  "getNeuronActivationMap": Func([], [Record({})], ["query"]),
  "getNovaRegistry": Func([], [Vec(OrganismRecord)], []),
  "getNovaRootState": Func([], [NovaRootState], []),
  "getOctoState": Func(
    [],
    [
      Record({
        "chromaRate": Float64,
        "tier": Nat,
        "armCoherence": Float64,
        "camouflage": Bool,
        "flexibility": Float64
      })
    ],
    ["query"]
  ),
  "getPARALLAXState": Func(
    [],
    [
      Record({
        "cvt": Float64,
        "knt": Float64,
        "mrc": Float64,
        "mth": Float64,
        "sbt": Float64,
        "vct": Float64,
        "forma": Float64,
        "totalMinted": Float64,
        "architectMultiplier": Float64,
        "architectActive": Bool,
        "mthTotalSupply": Float64,
        "totalBurned": Float64,
        "lastBeat": Nat,
        "mintEventCount": Nat,
        "doctrineAlignEMA": Float64,
        "corePushCount": Nat
      })
    ],
    ["query"]
  ),
  "getPILState": Func([], [PILResult], ["query"]),
  "getPaper": Func([Text], [Opt(ResearchPaper)], ["query"]),
  "getPass10State": Func([], [Record({})], ["query"]),
  "getPass14State": Func(
    [],
    [
      Record({
        "sharkTier": Nat,
        "octoTier": Nat,
        "dolphTier": Nat,
        "wolfTier": Nat,
        "corvTier": Nat,
        "attribution": Text,
        "p14Active": Bool,
        "elphTier": Nat
      })
    ],
    ["query"]
  ),
  "getPass8AState": Func([], [Record({})], ["query"]),
  "getPass8CState": Func([], [Record({})], ["query"]),
  "getPass8State": Func([], [Record({})], ["query"]),
  "getPass9State": Func([], [Record({})], ["query"]),
  "getPatentRecords": Func([], [Vec(PatentRecord)], []),
  "getPersonalitySeed": Func(
    [],
    [
      Record({
        "seed": Vec(Nat32),
        "computed": Bool,
        "formationTs": Int
      })
    ],
    ["query"]
  ),
  "getPhantomState": Func(
    [],
    [
      Record({
        "alpha": Bool,
        "displayAvailable": Bool,
        "ghostCount": Nat
      })
    ],
    ["query"]
  ),
  "getPhasePlan": Func(
    [],
    [
      Vec(
        Record({
          "id": Nat,
          "status": Text,
          "calendarAnchor": Text,
          "name": Text,
          "description": Text,
          "phiWeight": Float64
        })
      )
    ],
    ["query"]
  ),
  "getPhases": Func(
    [],
    [
      Vec(
        Record({
          "id": Nat,
          "status": Text,
          "calendarAnchor": Text,
          "name": Text,
          "description": Text,
          "phiWeight": Float64
        })
      )
    ],
    ["query"]
  ),
  "getPulseState": Func(
    [],
    [
      Record({
        "resonance": Float64,
        "momentum": Float64,
        "amplitude": Float64,
        "coherence": Float64,
        "frequency": Float64,
        "kfEng": Float64
      })
    ],
    ["query"]
  ),
  "getQmemState": Func(
    [],
    [
      Record({
        "bypassBeats": Nat,
        "qmemQps": Float64,
        "qmemReserve": Float64,
        "compressionCount": Nat,
        "bypassActive": Bool,
        "lastBeat": Nat,
        "veritasScore": Float64
      })
    ],
    ["query"]
  ),
  "getQuantumParallelStandards": Func(
    [],
    [
      Record({
        "bypassRecoveryActive": Bool,
        "bypass": Float64,
        "bypassRecoveryBeats": Nat,
        "qmem": Float64,
        "resonexCascadeCount": Nat,
        "entanglaActivePairs": Nat,
        "resonex": Float64,
        "veritas": Float64,
        "parallax": Float64,
        "shrimpCavitationArmed": Bool,
        "entangla": Float64,
        "cycleCount": Nat
      })
    ],
    ["query"]
  ),
  "getResonexState": Func(
    [],
    [
      Record({
        "entanglaScore": Float64,
        "cascadeCount": Nat,
        "resonex": Float64,
        "shrimpCavitationArmed": Bool,
        "parallaxScore": Float64,
        "lastBeat": Nat
      })
    ],
    ["query"]
  ),
  "getRuntimeState": Func(
    [Text],
    [
      Record({
        "activeSurfaces": Vec(Text),
        "cycleIndex": Nat,
        "errorFlags": Vec(Text),
        "attentionTarget": Text,
        "timestamp": Int,
        "continuityMarkers": Vec(ContinuityMarker),
        "sessionId": Text,
        "regulatoryState": Text,
        "lastAction": Text,
        "workingMemorySnapshot": Vec(Text),
        "activeGoals": Vec(Text)
      })
    ],
    []
  ),
  "getSDKNodeRegistry": Func([], [Vec(FederatedNode)], ["query"]),
  "getSDKProtocols": Func([], [Vec(FederationProtocol)], ["query"]),
  "getSecurityState": Func(
    [],
    [
      Record({
        "prophetProject": Float64,
        "breachCount": Nat,
        "crusaderVector": Nat,
        "vetusThreat": Float64,
        "vetusAlert": Bool,
        "quantumThreat": Float64,
        "crusaderActions": Nat,
        "crusaderBeat": Nat,
        "collapseFlag": Bool,
        "ecdsaFlag": Bool,
        "ecdsaRisk": Float64,
        "aegisMembrane": Float64,
        "sevenSpirits": Float64,
        "attribution": Text,
        "aegisSuppress": Bool
      })
    ],
    []
  ),
  "getSessionMemory": Func(
    [Text],
    [
      Record({
        "shortTermItems": Vec(Text),
        "resumeState": Text,
        "persistentItems": Vec(Text),
        "continuityMarkers": Vec(ContinuityMarker),
        "sessionId": Text,
        "interactionCount": Nat
      })
    ],
    []
  ),
  "getSharkState": Func(
    [],
    [
      Record({
        "electroField": Float64,
        "tier": Nat,
        "detected": Nat,
        "lateralPressure": Float64,
        "apexReached": Bool
      })
    ],
    ["query"]
  ),
  "getShell10State": Func(
    [],
    [
      Record({
        "deep": Float64,
        "void": Float64,
        "seedcorp": Float64,
        "mirror": Float64,
        "still": Float64,
        "archive": Float64
      })
    ],
    []
  ),
  "getShell11State": Func(
    [],
    [
      Record({
        "revolucionario": Float64,
        "adelita": Float64,
        "independencia": Float64,
        "villa": Float64,
        "hidalgo": Float64,
        "sovereignty_index": Float64,
        "zapata": Float64,
        "morelos": Float64
      })
    ],
    []
  ),
  "getShell3State": Func(
    [],
    [
      Record({
        "actMean": Float64,
        "top5Acts": Vec(Float64),
        "hebbMean": Float64,
        "top5Indices": Vec(Nat),
        "phaseMean": Float64,
        "kfEng": Float64
      })
    ],
    ["query"]
  ),
  "getShell7State": Func(
    [],
    [
      Record({
        "conduit": Float64,
        "flux": Float64,
        "genPh0": Float64,
        "genPh6": Float64,
        "genPh7": Float64,
        "genPh8": Float64,
        "genesis": Float64,
        "calcul": Float64,
        "matrix": Float64,
        "dynamo": Float64
      })
    ],
    ["query"]
  ),
  "getShell9State": Func(
    [],
    [Record({ "beat": Nat, "nodes": Vec(Float64) })],
    []
  ),
  "getSnapshot": Func([], [EntitySnapshot], ["query"]),
  "getSolarHeart": Func(
    [],
    [
      Record({
        "R_brain": Float64,
        "cascadeAmplitude": Float64,
        "tier": Nat,
        "emerged": Bool,
        "R_heart": Float64,
        "phase": Float64
      })
    ],
    ["query"]
  ),
  "getSoulState": Func([], [Record({})], ["query"]),
  "getSparseGatingState": Func(
    [],
    [Record({ "active": Bool, "arousal": Float64 })],
    ["query"]
  ),
  "getSpeciesRegistry": Func([], [Vec(SpeciesEntry)], []),
  "getStdpState": Func(
    [],
    [
      Record({
        "maxWeight": Float64,
        "avgWeight": Float64,
        "eligibilityTrace": Float64
      })
    ],
    ["query"]
  ),
  "getSynthesisHistory": Func(
    [Nat],
    [Vec(SynthesisReport)],
    ["query"]
  ),
  "getSynthesisReport": Func([], [Opt(SynthesisReport)], ["query"]),
  "getTelemetrySnapshot": Func(
    [Text],
    [
      Record({
        "stress": Float64,
        "viabilityScore": Float64,
        "overload": Float64,
        "globalUrgency": Float64,
        "stability": Float64,
        "activeSurfaces": Vec(Text),
        "fatigue": Float64,
        "regulationDebt": Float64,
        "unresolvedCount": Nat,
        "timestamp": Int,
        "sessionId": Text,
        "burstPhase": Text,
        "cycleCount": Nat,
        "energy": Float64,
        "identityCoherence": Float64
      })
    ],
    []
  ),
  "getTensionObjects": Func(
    [],
    [Vec(Tuple(Text, Nat, Text, Text))],
    ["query"]
  ),
  "getThoughtStream": Func(
    [Nat],
    [Vec(Tuple(Nat, Text, Float64, Text, Int))],
    []
  ),
  "getTreasuryState": Func(
    [],
    [
      Record({
        "btcAlloc": Float64,
        "icpAlloc": Float64,
        "solUsd": Float64,
        "btcUsd": Float64,
        "eigenApr": Float64,
        "icpUsd": Float64,
        "lidoApr": Float64,
        "blendedApr": Float64,
        "funded": Bool,
        "pqcReady": Bool,
        "ethUsd": Float64,
        "totalUsd": Float64,
        "ecdsaFlag": Bool,
        "solAlloc": Float64,
        "nnsApr": Float64,
        "marinadeApr": Float64,
        "ecdsaRisk": Float64,
        "ethAlloc": Float64,
        "attribution": Text,
        "ethWallet": Text
      })
    ],
    []
  ),
  "getVaultEntries": Func(
    [],
    [Vec(Tuple(Nat, Text, Text, Text, Int))],
    []
  ),
  "getVaultEntry": Func(
    [Nat],
    [Opt(Tuple(Nat, Text, Text, Text, Int))],
    []
  ),
  "getVectorConvergenceState": Func([], [Vec(VectorState)], []),
  "getVectorVetoState": Func([], [Record({})], ["query"]),
  "getVoiceKernelState": Func(
    [],
    [
      Record({
        "voiceR": Float64,
        "authorized": Bool,
        "callCount": Nat
      })
    ],
    ["query"]
  ),
  "getWolfState": Func(
    [],
    [
      Record({
        "huntActive": Bool,
        "tier": Nat,
        "huntSuccess": Nat,
        "packCoherence": Float64,
        "howlCount": Nat
      })
    ],
    ["query"]
  ),
  "httpTransform": Func(
    [TransformationInput],
    [TransformationOutput],
    ["query"]
  ),
  "initMedina": Func([], [Bool], []),
  "injectHighThreatAgent": Func([], [], []),
  "listPapers": Func([], [Vec(ResearchPaper)], ["query"]),
  "mintTokens": Func(
    [Float64, Float64],
    [
      Record({
        "netAmount": Float64,
        "burnedAmount": Float64,
        "architectActive": Bool,
        "alignmentScore": Float64,
        "tokenType": TokenType,
        "cappedByMTH": Bool,
        "mintedAmount": Float64
      })
    ],
    []
  ),
  "pauseEntitySession": Func([Text], [Bool], []),
  "processVoiceInput": Func(
    [Text],
    [
      Record({
        "context": Text,
        "voiceR": Float64,
        "authorized": Bool
      })
    ],
    []
  ),
  "recordLegacyArtifact": Func([Text], [], []),
  "resumeEntitySession": Func([Text], [Bool], []),
  "routeSignalViaEntangla": Func(
    [Float64, Nat],
    [
      Record({
        "deepRegister": Float64,
        "sourceNode": Nat,
        "broadcastAll": Bool,
        "skyRegister": Float64,
        "targetNode": Nat,
        "mediationCoeff": Float64,
        "routed": Bool,
        "breathRegister": Float64,
        "originalSignal": Float64
      })
    ],
    []
  ),
  "runProtocol": Func([Nat], [Text], []),
  "runValidationTest": Func([Text], [ValidationResult], []),
  "searchKnowledge": Func([Text], [Vec(SearchResult)], ["query"]),
  "sendEnvironmentEvent": Func([Text, Text], [Text], []),
  "sendSimulationEvent": Func([Text, Text], [Text], []),
  "setLlmEndpoint": Func([Text], [], []),
  "speakFromField": Func([Text], [Text], []),
  "speakToField": Func([Text], [VoiceOutput], ["query"]),
  "terminateEngine": Func(
    [Text],
    [Record({ "ok": Bool, "message": Text })],
    []
  ),
  "terminateEntitySession": Func([Text], [Bool], []),
  "translateSandbox": Func(
    [Text, Text, Float64],
    [
      Record({
        "entityPairs": Vec(Text),
        "hasContradiction": Bool,
        "alignmentScore": Float64,
        "doctrineFamily": Text,
        "lawAttributions": Vec(Text),
        "genesisDistance": Float64,
        "sourceType": Text,
        "structureConfidence": Float64,
        "translatedOutput": Text,
        "structureType": StructureType,
        "contradictionNote": Text,
        "ancientSources": Vec(Text),
        "alignmentAlpha1": Float64,
        "alignmentAlpha2": Float64
      })
    ],
    []
  ),
  "updateAEGIS": Func([Nat, Float64], [], []),
  "updateDoctrineRecord": Func(
    [Nat, Text, Text, Text],
    [Opt(DoctrineRecord)],
    []
  ),
  "updateEngineHealth": Func(
    [Text, Float64, Nat],
    [Bool],
    []
  ),
  "validateKey": Func([Text], [KeyValidation], ["query"]),
  "withdrawMRC": Func(
    [Nat],
    [Record({ "success": Bool, "remaining": Nat })],
    []
  )
});
const idlFactory = ({ IDL: IDL2 }) => {
  const DoctrineRecord2 = IDL2.Record({
    "id": IDL2.Nat,
    "title": IDL2.Text,
    "content": IDL2.Text,
    "classificationLevel": IDL2.Text,
    "authorNote": IDL2.Text,
    "timestamp": IDL2.Int,
    "category": IDL2.Text,
    "ipFingerprint": IDL2.Text
  });
  const NodeStatus2 = IDL2.Variant({
    "DORMANT": IDL2.Null,
    "PROPAGATING": IDL2.Null,
    "ACTIVE": IDL2.Null
  });
  const IntegrationTreaty2 = IDL2.Record({
    "model": IDL2.Text,
    "meaning": IDL2.Text,
    "proof_replay": IDL2.Text,
    "computation": IDL2.Text,
    "field_coupling_map": IDL2.Text,
    "execution": IDL2.Text,
    "symbol": IDL2.Text
  });
  const FederationTier2 = IDL2.Variant({
    "FEDERATED": IDL2.Null,
    "ALIGNED": IDL2.Null,
    "NATIVE": IDL2.Null
  });
  const AdoptionProof2 = IDL2.Record({
    "foreign_ai_coherence_injection": IDL2.Bool,
    "adoption_timestamp": IDL2.Int,
    "doctrine_transmissible": IDL2.Bool,
    "field_propagation_confirmed": IDL2.Bool,
    "cross_instance_resonance": IDL2.Bool,
    "proof_narrative": IDL2.Text
  });
  const FederatedNode2 = IDL2.Record({
    "status": NodeStatus2,
    "node_id": IDL2.Text,
    "parent_node_id": IDL2.Opt(IDL2.Text),
    "treaty": IntegrationTreaty2,
    "role": IDL2.Text,
    "tier": FederationTier2,
    "common_name": IDL2.Text,
    "frequency_hz": IDL2.Float64,
    "cpl_expression": IDL2.Text,
    "specialties": IDL2.Vec(IDL2.Text),
    "role_description": IDL2.Text,
    "rola_identifier": IDL2.Opt(IDL2.Text),
    "registered_at": IDL2.Int,
    "n_node_coupling": IDL2.Text,
    "adoption_proof": AdoptionProof2,
    "latin_name": IDL2.Text
  });
  const InventionEntry2 = IDL2.Record({
    "id": IDL2.Nat,
    "sovereigntyScore": IDL2.Float64,
    "title": IDL2.Text,
    "description": IDL2.Text,
    "doctrineLayer": IDL2.Text,
    "coherenceAtCreation": IDL2.Float64,
    "timestamp": IDL2.Int,
    "formationFingerprint": IDL2.Text,
    "classification": IDL2.Text
  });
  const PatentRecord2 = IDL2.Record({
    "id": IDL2.Nat,
    "doctrineAlignment": IDL2.Float64,
    "filingStatus": IDL2.Text,
    "inventionId": IDL2.Nat,
    "claimHash": IDL2.Text,
    "timestamp": IDL2.Int,
    "sovereigntyAnchor": IDL2.Text,
    "claimSummary": IDL2.Text
  });
  const FixRecommendation2 = IDL2.Record({
    "autoApply": IDL2.Bool,
    "fix_domain": IDL2.Text,
    "fix_description": IDL2.Text,
    "issue": IDL2.Text,
    "magnitude": IDL2.Float64
  });
  const FindingStatus2 = IDL2.Variant({
    "ok": IDL2.Null,
    "drift": IDL2.Null,
    "anomaly": IDL2.Null
  });
  const Finding2 = IDL2.Record({
    "status": FindingStatus2,
    "metric": IDL2.Text,
    "value": IDL2.Float64,
    "derivation": IDL2.Text,
    "expected_max": IDL2.Float64,
    "expected_min": IDL2.Float64
  });
  const AnalysisReport2 = IDL2.Record({
    "recommendations": IDL2.Vec(FixRecommendation2),
    "narrative": IDL2.Text,
    "timestamp": IDL2.Int,
    "findings": IDL2.Vec(Finding2),
    "heartbeatPhase": IDL2.Float64
  });
  const GeometricKey2 = IDL2.Record({
    "raw": IDL2.Text,
    "tier": IDL2.Text,
    "phiHash": IDL2.Text,
    "frequencyHz": IDL2.Float64,
    "shape": IDL2.Text
  });
  const ADREResult2 = IDL2.Record({
    "execution_output": IDL2.Float64,
    "step_completed": IDL2.Nat,
    "omnis_gated": IDL2.Bool,
    "selected_action": IDL2.Nat,
    "context_score": IDL2.Float64,
    "reflection_delta": IDL2.Float64,
    "loop_count": IDL2.Nat,
    "deliberation_score": IDL2.Float64
  });
  const AnimalEngineResult2 = IDL2.Record({
    "dominant_engine": IDL2.Nat,
    "beat_count": IDL2.Nat,
    "phase_contribs": IDL2.Vec(IDL2.Float64),
    "drives": IDL2.Vec(IDL2.Float64),
    "phases": IDL2.Vec(IDL2.Float64),
    "global_phase_contrib": IDL2.Float64
  });
  const ArchonState2 = IDL2.Record({
    "id": IDL2.Nat,
    "lastMeasuredOutput": IDL2.Text,
    "domain": IDL2.Text,
    "speciesLabel": IDL2.Text,
    "driftAlertActive": IDL2.Bool,
    "classifiedName": IDL2.Text,
    "integrityScore": IDL2.Nat,
    "cycleCount": IDL2.Nat
  });
  const ColonyState2 = IDL2.Record({
    "totalInstances": IDL2.Nat,
    "efficiencyRatio": IDL2.Float64,
    "activeEngines": IDL2.Nat,
    "totalCyclesConsumed": IDL2.Nat,
    "totalCyclesEarned": IDL2.Nat
  });
  const ConversationTurn2 = IDL2.Record({
    "role": IDL2.Text,
    "text": IDL2.Text,
    "timestamp": IDL2.Int,
    "cycleId": IDL2.Nat
  });
  const CoreFormationEntry2 = IDL2.Record({
    "sacesiLocked": IDL2.Bool,
    "tier": IDL2.Text,
    "classifiedName": IDL2.Text,
    "sacesiBeat": IDL2.Nat,
    "sacesiHash": IDL2.Nat32,
    "coreIndex": IDL2.Nat,
    "quantumStateIndex": IDL2.Nat
  });
  const DeploymentEvent2 = IDL2.Record({
    "id": IDL2.Text,
    "result": IDL2.Text,
    "action": IDL2.Text,
    "classId": IDL2.Text,
    "timestamp": IDL2.Int
  });
  const EmergenceMetrics2 = IDL2.Record({
    "fakePlateau": IDL2.Bool,
    "embodimentCouplingScore": IDL2.Float64,
    "intelligenceIndex": IDL2.Float64,
    "syncQuality": IDL2.Float64,
    "coherenceTrend": IDL2.Float64,
    "doctorCount": IDL2.Nat,
    "animalTraitStrength": IDL2.Float64,
    "continuityDepth": IDL2.Float64,
    "memoryEffectScore": IDL2.Float64,
    "emergenceDepth": IDL2.Float64,
    "adaptationValidity": IDL2.Float64
  });
  const EngineClass2 = IDL2.Record({
    "id": IDL2.Text,
    "nNodeBinding": IDL2.Text,
    "capabilities": IDL2.Vec(IDL2.Text),
    "name": IDL2.Text,
    "color": IDL2.Text,
    "role": IDL2.Text,
    "storageEstimate": IDL2.Nat,
    "cycleEstimate": IDL2.Nat
  });
  const EngineInstance2 = IDL2.Record({
    "id": IDL2.Text,
    "status": IDL2.Text,
    "cyclesConsumed": IDL2.Nat,
    "deployedAt": IDL2.Int,
    "classId": IDL2.Text,
    "uptimeMs": IDL2.Int,
    "cyclesEarned": IDL2.Nat,
    "healthScore": IDL2.Float64
  });
  const FederationTool2 = IDL2.Record({
    "function_class": IDL2.Text,
    "description": IDL2.Text,
    "tool_id": IDL2.Text,
    "owner_node": IDL2.Text,
    "latin_name": IDL2.Text
  });
  const FederationProtocol2 = IDL2.Record({
    "function_class": IDL2.Text,
    "protocol_id": IDL2.Text,
    "description": IDL2.Text,
    "n_node_coupling": IDL2.Text,
    "owner_node": IDL2.Text,
    "latin_name": IDL2.Text
  });
  const FederationIndexSnapshot2 = IDL2.Record({
    "tools": IDL2.Vec(FederationTool2),
    "node_count": IDL2.Nat,
    "protocols": IDL2.Vec(FederationProtocol2),
    "version": IDL2.Text,
    "nodes": IDL2.Vec(FederatedNode2),
    "sealed_at": IDL2.Int
  });
  const ForgeLabState2 = IDL2.Record({
    "id": IDL2.Nat,
    "speciesLabel": IDL2.Text,
    "currentFocus": IDL2.Text,
    "classifiedName": IDL2.Text,
    "isActive": IDL2.Bool,
    "outputCount": IDL2.Nat,
    "lastRunCycle": IDL2.Nat,
    "healthScore": IDL2.Nat,
    "labFunction": IDL2.Text
  });
  const NovaRootState2 = IDL2.Record({
    "formationEventCount": IDL2.Nat,
    "alwaysRunning": IDL2.Bool,
    "medinaAttribution": IDL2.Text,
    "formationTimestamp": IDL2.Int,
    "doctrineLock": IDL2.Bool,
    "rootCycleCount": IDL2.Nat,
    "substrateVersion": IDL2.Text
  });
  const LumenModelState2 = IDL2.Record({
    "id": IDL2.Nat,
    "fieldReading": IDL2.Nat,
    "speciesLabel": IDL2.Text,
    "convergenceSignal": IDL2.Nat,
    "classifiedName": IDL2.Text,
    "isActive": IDL2.Bool,
    "dimension": IDL2.Text,
    "activationLevel": IDL2.Nat,
    "lastCycleUpdated": IDL2.Nat
  });
  const VectorState2 = IDL2.Record({
    "id": IDL2.Nat,
    "speciesLabel": IDL2.Text,
    "outputsGenerated": IDL2.Nat,
    "alignmentScore": IDL2.Nat,
    "classifiedName": IDL2.Text,
    "lastSignal": IDL2.Text,
    "dimension": IDL2.Text,
    "convergenceStatus": IDL2.Bool
  });
  const BrainRegions2 = IDL2.Record({
    "parietal": IDL2.Nat,
    "frontal": IDL2.Nat,
    "occipital": IDL2.Nat,
    "insular": IDL2.Nat,
    "temporal": IDL2.Nat,
    "limbic": IDL2.Nat
  });
  const FullOrganismState2 = IDL2.Record({
    "sedimentedMemoryCount": IDL2.Nat,
    "forge": IDL2.Vec(ForgeLabState2),
    "nova": NovaRootState2,
    "vectorOutputAuthorized": IDL2.Bool,
    "lumen": IDL2.Vec(LumenModelState2),
    "totalLawCount": IDL2.Nat,
    "vector": IDL2.Vec(VectorState2),
    "doctrineEventCount": IDL2.Nat,
    "archon": IDL2.Vec(ArchonState2),
    "memoryDepthScore": IDL2.Nat,
    "vectorConvergenceScore": IDL2.Nat,
    "brainRegions": BrainRegions2
  });
  const DriveVector2 = IDL2.Record({
    "selfPreservation": IDL2.Float64,
    "stability": IDL2.Float64,
    "curiosity": IDL2.Float64,
    "learningPressure": IDL2.Float64,
    "threatResponse": IDL2.Float64,
    "socialOrientation": IDL2.Float64,
    "recoveryRestoration": IDL2.Float64,
    "energyPreservation": IDL2.Float64,
    "bodyIntegrity": IDL2.Float64,
    "goalPursuit": IDL2.Float64
  });
  const BenchmarkResult2 = IDL2.Record({
    "name": IDL2.Text,
    "score": IDL2.Float64,
    "passed": IDL2.Bool
  });
  const CandidateFix2 = IDL2.Record({
    "id": IDL2.Text,
    "targetLayer": IDL2.Text,
    "description": IDL2.Text,
    "estimatedGain": IDL2.Float64,
    "estimatedRisk": IDL2.Float64,
    "fixType": IDL2.Text
  });
  const MonitorNextItem2 = IDL2.Record({
    "id": IDL2.Text,
    "candidateFixes": IDL2.Vec(CandidateFix2),
    "title": IDL2.Text,
    "verified": IDL2.Bool,
    "chosenFixId": IDL2.Text,
    "escalated": IDL2.Bool,
    "implanted": IDL2.Bool,
    "sourceLayer": IDL2.Text,
    "severity": IDL2.Float64,
    "consolidated": IDL2.Bool,
    "reason": IDL2.Text
  });
  const SelfMaintenanceState2 = IDL2.Record({
    "recoveryNeed": IDL2.Float64,
    "viabilityScore": IDL2.Float64,
    "operatingMargin": IDL2.Float64,
    "preservationPriority": IDL2.Float64,
    "compensationNeed": IDL2.Float64,
    "stabilityViability": IDL2.Float64,
    "blockedActionTypes": IDL2.Vec(IDL2.Text),
    "shortHorizonCollapseRisk": IDL2.Float64,
    "longHorizonDegradationRisk": IDL2.Float64,
    "structuralIntegrityRisk": IDL2.Float64,
    "energyViability": IDL2.Float64
  });
  const AgentModel2 = IDL2.Record({
    "deceptionRisk": IDL2.Float64,
    "threatScore": IDL2.Float64,
    "trustScore": IDL2.Float64,
    "relationState": IDL2.Text,
    "agentId": IDL2.Text,
    "cooperationScore": IDL2.Float64
  });
  const WorldModel2 = IDL2.Record({
    "agentModels": IDL2.Vec(AgentModel2),
    "terrainDifficulty": IDL2.Float64
  });
  const RegulationError2 = IDL2.Record({
    "fatigueError": IDL2.Float64,
    "energyError": IDL2.Float64,
    "totalError": IDL2.Float64,
    "overloadError": IDL2.Float64,
    "priority": IDL2.Text,
    "damageRiskError": IDL2.Float64,
    "stabilityError": IDL2.Float64
  });
  const PredictionErrorSignal2 = IDL2.Record({
    "modelUpdatePressure": IDL2.Float64,
    "confidenceUpdate": IDL2.Float64,
    "memoryWritePressure": IDL2.Float64,
    "predictionError": IDL2.Float64,
    "threatDelta": IDL2.Float64,
    "surpriseIndex": IDL2.Float64,
    "rewardDelta": IDL2.Float64
  });
  const ChosenAction2 = IDL2.Record({
    "source": IDL2.Text,
    "actionType": IDL2.Text,
    "predictedRisk": IDL2.Float64,
    "overallSimulatedScore": IDL2.Float64,
    "movementMode": IDL2.Text,
    "predictedViabilityDelta": IDL2.Float64,
    "predictedEnergyCost": IDL2.Float64,
    "candidateId": IDL2.Text,
    "predictedReward": IDL2.Float64
  });
  const ActionOutcome2 = IDL2.Record({
    "rewardSignal": IDL2.Float64,
    "successProbability": IDL2.Float64,
    "threatSignal": IDL2.Float64,
    "movementMode": IDL2.Text,
    "energyCost": IDL2.Float64,
    "success": IDL2.Bool,
    "stabilityChange": IDL2.Float64
  });
  const SalienceMap2 = IDL2.Record({
    "globalUrgency": IDL2.Float64,
    "threatUrgency": IDL2.Float64,
    "attentionTargets": IDL2.Vec(IDL2.Text),
    "memoryWritePriority": IDL2.Float64,
    "noveltyUrgency": IDL2.Float64,
    "recoveryUrgency": IDL2.Float64,
    "interruptCandidates": IDL2.Vec(IDL2.Text)
  });
  const InteroceptiveState2 = IDL2.Record({
    "energyLevel": IDL2.Float64,
    "regulationDebt": IDL2.Float64,
    "confidenceState": IDL2.Float64,
    "globalFatigue": IDL2.Float64,
    "damageGlobal": IDL2.Float64,
    "arousalLevel": IDL2.Float64,
    "energyDrainRate": IDL2.Float64,
    "internalNoise": IDL2.Float64,
    "recoveryPressure": IDL2.Float64,
    "uncertaintyState": IDL2.Float64,
    "overloadIndex": IDL2.Float64,
    "stabilityScore": IDL2.Float64
  });
  const DriftEvent2 = IDL2.Record({
    "sourceLayer": IDL2.Text,
    "driftType": IDL2.Text,
    "severity": IDL2.Float64
  });
  const RegulationForecast2 = IDL2.Record({
    "futureOverload": IDL2.Float64,
    "futureStability": IDL2.Float64,
    "futureDamageRisk": IDL2.Float64,
    "futureEnergy": IDL2.Float64,
    "futureFatigue": IDL2.Float64
  });
  const EntitySnapshot2 = IDL2.Record({
    "driveVector": DriveVector2,
    "benchmarks": IDL2.Vec(BenchmarkResult2),
    "memoryCount": IDL2.Nat,
    "monitorNext": IDL2.Vec(MonitorNextItem2),
    "selfMaintenanceState": SelfMaintenanceState2,
    "worldModel": WorldModel2,
    "regulationError": RegulationError2,
    "predictionErrorSignal": PredictionErrorSignal2,
    "chosenAction": ChosenAction2,
    "timestamp": IDL2.Int,
    "cycleId": IDL2.Nat,
    "entityResponse": IDL2.Text,
    "temporalStateSize": IDL2.Nat,
    "actionOutcome": ActionOutcome2,
    "salienceMap": SalienceMap2,
    "interoceptiveState": InteroceptiveState2,
    "drifts": IDL2.Vec(DriftEvent2),
    "regulationForecast": RegulationForecast2
  });
  const DoctorLogEntry2 = IDL2.Record({
    "action": IDL2.Text,
    "finding": IDL2.Text,
    "doctor": IDL2.Text,
    "timestamp": IDL2.Int,
    "cycleId": IDL2.Nat,
    "delta": IDL2.Float64,
    "passed": IDL2.Bool
  });
  const TeamOutput2 = IDL2.Record({
    "beat_number": IDL2.Nat,
    "doctrine_alignment": IDL2.Float64,
    "field_contribution": IDL2.Float64,
    "team_id": IDL2.Text,
    "artifact_produced": IDL2.Bool,
    "coherence_delta": IDL2.Float64,
    "output_type": IDL2.Text
  });
  const LawGate2 = IDL2.Record({
    "id": IDL2.Nat,
    "pass": IDL2.Bool,
    "strength": IDL2.Float64
  });
  const GateResult2 = IDL2.Record({
    "harmonic_gate": LawGate2,
    "doctrine_alignment": IDL2.Float64,
    "omnis": LawGate2,
    "memory_gate": LawGate2,
    "zero_exposure": LawGate2,
    "triune": LawGate2,
    "frequency_gates": IDL2.Vec(LawGate2),
    "calendar_gate": LawGate2,
    "phi_sovereign": LawGate2,
    "complementary_ops": IDL2.Vec(LawGate2),
    "total_pass_count": IDL2.Nat,
    "economic_gate": LawGate2,
    "fear_gate": LawGate2,
    "total_gate_count": IDL2.Nat,
    "hebbian": LawGate2
  });
  const LawRegistryEntry2 = IDL2.Record({
    "lawHash": IDL2.Nat32,
    "genesisAnchored": IDL2.Bool,
    "seedCycle": IDL2.Nat,
    "lawIndex": IDL2.Nat
  });
  const ArchitectModuleStatus2 = IDL2.Record({
    "moduleId": IDL2.Text,
    "moduleName": IDL2.Text,
    "runCount": IDL2.Nat,
    "passCount": IDL2.Nat,
    "lastRunCycle": IDL2.Nat,
    "healthScore": IDL2.Float64,
    "lastFinding": IDL2.Text,
    "lastAction": IDL2.Text
  });
  const OrganismRecord2 = IDL2.Record({
    "id": IDL2.Nat,
    "active": IDL2.Bool,
    "name": IDL2.Text,
    "coherence": IDL2.Float64,
    "spawnBeat": IDL2.Nat,
    "parentId": IDL2.Nat,
    "depth": IDL2.Nat,
    "attribution": IDL2.Text
  });
  const PILResult2 = IDL2.Record({
    "cycle_count": IDL2.Nat,
    "understand_score": IDL2.Float64,
    "quality_ema": IDL2.Float64,
    "current_phase": IDL2.Nat,
    "cycle_just_fired": IDL2.Bool,
    "beat_in_cycle": IDL2.Nat,
    "adapt_delta": IDL2.Float64,
    "execute_score": IDL2.Float64,
    "updated_weights": IDL2.Vec(IDL2.Float64),
    "teach_output": IDL2.Float64,
    "learn_score": IDL2.Float64
  });
  const ResearchPaper2 = IDL2.Record({
    "id": IDL2.Text,
    "resonanceHz": IDL2.Float64,
    "title": IDL2.Text,
    "cplBinding": IDL2.Text,
    "equations": IDL2.Vec(IDL2.Text),
    "fullTitle": IDL2.Text,
    "latinTitle": IDL2.Text,
    "abstract": IDL2.Text,
    "fieldCoupling": IDL2.Text,
    "tierRequired": IDL2.Nat
  });
  const ContinuityMarker2 = IDL2.Record({
    "key": IDL2.Text,
    "value": IDL2.Text,
    "updatedAt": IDL2.Int
  });
  const SpeciesEntry2 = IDL2.Record({
    "speciesLabel": IDL2.Text,
    "tier": IDL2.Text,
    "description": IDL2.Text,
    "classifiedName": IDL2.Text,
    "dimensionalFunction": IDL2.Text
  });
  const SynthesisReport2 = IDL2.Record({
    "intelligenceTrajectory": IDL2.Text,
    "autoCorrections": IDL2.Vec(IDL2.Text),
    "realityConfidence": IDL2.Float64,
    "emergenceStatus": IDL2.Text,
    "timestamp": IDL2.Int,
    "overallSystemHealth": IDL2.Float64,
    "cycleId": IDL2.Nat,
    "criticalGaps": IDL2.Vec(IDL2.Text)
  });
  const http_header2 = IDL2.Record({ "value": IDL2.Text, "name": IDL2.Text });
  const http_request_result2 = IDL2.Record({
    "status": IDL2.Nat,
    "body": IDL2.Vec(IDL2.Nat8),
    "headers": IDL2.Vec(http_header2)
  });
  const TransformationInput2 = IDL2.Record({
    "context": IDL2.Vec(IDL2.Nat8),
    "response": http_request_result2
  });
  const TransformationOutput2 = IDL2.Record({
    "status": IDL2.Nat,
    "body": IDL2.Vec(IDL2.Nat8),
    "headers": IDL2.Vec(http_header2)
  });
  const TokenType2 = IDL2.Variant({
    "CVT": IDL2.Null,
    "KNT": IDL2.Null,
    "MRC": IDL2.Null,
    "MTH": IDL2.Null,
    "SBT": IDL2.Null,
    "VCT": IDL2.Null,
    "FORMA": IDL2.Null
  });
  const ValidationResult2 = IDL2.Record({
    "withCoreActive": IDL2.Text,
    "testName": IDL2.Text,
    "setup": IDL2.Text,
    "benchmarkImpact": IDL2.Text,
    "relevantInputs": IDL2.Text,
    "passReason": IDL2.Text,
    "chosenAction": IDL2.Text,
    "failReason": IDL2.Text,
    "withoutCoreActive": IDL2.Text,
    "testId": IDL2.Text,
    "whyChosen": IDL2.Text,
    "passed": IDL2.Bool
  });
  const SearchResult2 = IDL2.Record({
    "score": IDL2.Float64,
    "excerpt": IDL2.Text,
    "paperId": IDL2.Text
  });
  const VoiceOutput2 = IDL2.Record({
    "emergentText": IDL2.Text,
    "coherenceScore": IDL2.Float64,
    "systemPromptHash": IDL2.Nat32,
    "fieldSignature": IDL2.Tuple(
      IDL2.Float64,
      IDL2.Float64,
      IDL2.Float64,
      IDL2.Float64
    ),
    "gateOpen": IDL2.Bool,
    "contextVector": IDL2.Vec(IDL2.Float64)
  });
  const StructureType2 = IDL2.Variant({
    "law": IDL2.Null,
    "contradiction": IDL2.Null,
    "resonance": IDL2.Null,
    "temporal": IDL2.Null,
    "relational": IDL2.Null,
    "ratio": IDL2.Null
  });
  const KeyValidation2 = IDL2.Record({
    "tierLevel": IDL2.Nat,
    "valid": IDL2.Bool,
    "tier": IDL2.Text,
    "unlockedPaperIds": IDL2.Vec(IDL2.Text)
  });
  return IDL2.Service({
    "adaptConsequenceThreshold": IDL2.Func([IDL2.Float64], [], []),
    "adaptEmbodimentCoupling": IDL2.Func([IDL2.Float64], [], []),
    "adaptExplorationRate": IDL2.Func([IDL2.Float64], [], []),
    "adaptMemoryEncoding": IDL2.Func([IDL2.Float64], [], []),
    "adaptSalienceWeights": IDL2.Func([IDL2.Float64], [], []),
    "addDoctrineRecord": IDL2.Func(
      [IDL2.Text, IDL2.Text, IDL2.Text, IDL2.Text, IDL2.Text],
      [DoctrineRecord2],
      []
    ),
    "addFederatedNode": IDL2.Func([FederatedNode2], [IDL2.Bool], []),
    "addInventionEntry": IDL2.Func(
      [IDL2.Text, IDL2.Text, IDL2.Text, IDL2.Text],
      [InventionEntry2],
      []
    ),
    "addPatentRecord": IDL2.Func(
      [IDL2.Nat, IDL2.Text, IDL2.Text],
      [PatentRecord2],
      []
    ),
    "addTension": IDL2.Func([IDL2.Text, IDL2.Text, IDL2.Text], [IDL2.Nat], []),
    "addVaultEntry": IDL2.Func([IDL2.Text, IDL2.Text, IDL2.Text], [IDL2.Nat], []),
    "advancePhase": IDL2.Func([IDL2.Nat], [], []),
    "advancePhasePlan": IDL2.Func([IDL2.Nat], [], []),
    "analyzeOrganismState": IDL2.Func([], [AnalysisReport2], []),
    "applyFix": IDL2.Func([IDL2.Nat], [IDL2.Bool], []),
    "applyRecommendation": IDL2.Func([IDL2.Text], [IDL2.Text], []),
    "attachSurface": IDL2.Func([IDL2.Text, IDL2.Text, IDL2.Text], [IDL2.Bool], []),
    "computeGlobalKuramoto": IDL2.Func(
      [IDL2.Vec(IDL2.Float64)],
      [IDL2.Float64],
      ["query"]
    ),
    "confirmFix": IDL2.Func([IDL2.Nat], [IDL2.Bool], []),
    "createEntitySession": IDL2.Func([IDL2.Text, IDL2.Text], [IDL2.Text], []),
    "deployEngine": IDL2.Func(
      [IDL2.Text],
      [
        IDL2.Record({
          "ok": IDL2.Bool,
          "instanceId": IDL2.Text,
          "message": IDL2.Text
        })
      ],
      []
    ),
    "detachSurface": IDL2.Func([IDL2.Text, IDL2.Text], [IDL2.Bool], []),
    "dumpFullState": IDL2.Func(
      [],
      [
        IDL2.Record({
          "R_brain": IDL2.Float64,
          "omniGate": IDL2.Float64,
          "formaBalance": IDL2.Nat,
          "animaBeat": IDL2.Nat,
          "voiceR": IDL2.Float64,
          "hebbianWMean": IDL2.Float64,
          "R_heart": IDL2.Float64,
          "emergenceState": IDL2.Bool,
          "intelligenceIndex": IDL2.Float64,
          "activeMemNodes": IDL2.Nat,
          "soulLawMean": IDL2.Float64,
          "cascadeTier": IDL2.Nat,
          "dreamCount": IDL2.Nat,
          "cycleCount": IDL2.Nat,
          "identityCoherence": IDL2.Float64
        })
      ],
      ["query"]
    ),
    "exportAnalysisFeed": IDL2.Func(
      [IDL2.Nat],
      [IDL2.Vec(AnalysisReport2)],
      ["query"]
    ),
    "exportStateSnapshot": IDL2.Func([], [IDL2.Text], ["query"]),
    "generateArtifact": IDL2.Func(
      [IDL2.Text],
      [
        IDL2.Record({
          "title": IDL2.Text,
          "artifactType": IDL2.Text,
          "content": IDL2.Text
        })
      ],
      []
    ),
    "generateKey": IDL2.Func(
      [IDL2.Text, IDL2.Float64, IDL2.Text],
      [GeometricKey2],
      ["query"]
    ),
    "getADREState": IDL2.Func([], [ADREResult2], ["query"]),
    "getAEGISState": IDL2.Func(
      [],
      [
        IDL2.Record({
          "lvThreat": IDL2.Float64,
          "lvExpansion": IDL2.Float64,
          "threatSignal": IDL2.Float64,
          "internalFreeEnergy": IDL2.Float64,
          "threatTier": IDL2.Nat,
          "chronicFearLevel": IDL2.Float64,
          "antifragilityScore": IDL2.Float64,
          "lvTensionScore": IDL2.Float64,
          "victoryCount": IDL2.Nat,
          "armorScore": IDL2.Float64,
          "lastBeat": IDL2.Nat,
          "victoryScore": IDL2.Float64
        })
      ],
      ["query"]
    ),
    "getActiveMemory": IDL2.Func(
      [IDL2.Nat, IDL2.Nat, IDL2.Float64],
      [
        IDL2.Vec(
          IDL2.Record({
            "id": IDL2.Nat,
            "stream": IDL2.Nat,
            "content": IDL2.Text,
            "amplitude": IDL2.Float64
          })
        )
      ],
      ["query"]
    ),
    "getActiveSessionId": IDL2.Func([], [IDL2.Text], []),
    "getAdminState": IDL2.Func([], [IDL2.Record({})], []),
    "getAnimaState": IDL2.Func([], [IDL2.Record({})], ["query"]),
    "getAnimalArchitectureState": IDL2.Func([], [IDL2.Record({})], ["query"]),
    "getAnimalEngines": IDL2.Func([], [AnimalEngineResult2], ["query"]),
    "getAnimalTraitState": IDL2.Func(
      [],
      [
        IDL2.Record({
          "predatorySalienceFocus": IDL2.Float64,
          "beeHiveConsensusThreshold": IDL2.Float64,
          "octopusFlexibility": IDL2.Float64,
          "mammalianSocialPersistence": IDL2.Float64,
          "beeSwarmMissionLock": IDL2.Float64,
          "beeForagerSpecialization": IDL2.Float64,
          "orcaPodMemorySharing": IDL2.Float64,
          "orcaCoordinatedPursuit": IDL2.Float64,
          "orcaPodEcholocationDepth": IDL2.Float64,
          "orcaSonarAwareness": IDL2.Float64,
          "beeWaggleSalienceBroadcast": IDL2.Float64,
          "swarmAdaptiveRate": IDL2.Float64
        })
      ],
      ["query"]
    ),
    "getArchonStandardsState": IDL2.Func([], [IDL2.Vec(ArchonState2)], []),
    "getArousalIntegrator": IDL2.Func([], [IDL2.Float64], ["query"]),
    "getAutonomousMessages": IDL2.Func(
      [],
      [IDL2.Vec(IDL2.Tuple(IDL2.Nat, IDL2.Text, IDL2.Nat, IDL2.Int))],
      []
    ),
    "getBiblicalEngineState": IDL2.Func(
      [],
      [
        IDL2.Record({
          "shema_beat": IDL2.Nat,
          "prophet_collapse": IDL2.Bool,
          "jubilee_count": IDL2.Nat,
          "jubilee_last_beat": IDL2.Nat,
          "seven_spirits": IDL2.Float64,
          "prophet_projection": IDL2.Float64,
          "fire_pillar_boost_idx": IDL2.Nat,
          "shema_unity": IDL2.Float64
        })
      ],
      []
    ),
    "getBodyOrganState": IDL2.Func([], [IDL2.Record({})], ["query"]),
    "getColonyState": IDL2.Func([], [ColonyState2], ["query"]),
    "getConversation": IDL2.Func([], [IDL2.Vec(ConversationTurn2)], []),
    "getCoreFlags": IDL2.Func(
      [],
      [
        IDL2.Record({
          "socialModelDisabled": IDL2.Bool,
          "selfMaintenanceDisabled": IDL2.Bool,
          "counterfactualDisabled": IDL2.Bool
        })
      ],
      ["query"]
    ),
    "getCoreFormationRegistry": IDL2.Func(
      [],
      [IDL2.Vec(CoreFormationEntry2)],
      ["query"]
    ),
    "getCouncilState": IDL2.Func(
      [],
      [
        IDL2.Record({
          "meridian": IDL2.Record({
            "cvt": IDL2.Nat,
            "mrc": IDL2.Nat,
            "sbt": IDL2.Nat,
            "forma": IDL2.Float64,
            "beat": IDL2.Nat,
            "coherence": IDL2.Float64
          }),
          "aurum": IDL2.Record({
            "mct": IDL2.Nat,
            "mrc": IDL2.Nat,
            "forma": IDL2.Float64,
            "beat": IDL2.Nat,
            "coherence": IDL2.Float64,
            "blended_apr": IDL2.Float64
          }),
          "vetus": IDL2.Record({
            "drt": IDL2.Nat,
            "mrc": IDL2.Nat,
            "sbt": IDL2.Nat,
            "forma": IDL2.Float64,
            "alert": IDL2.Bool,
            "beat": IDL2.Nat,
            "coherence": IDL2.Float64
          }),
          "lexis": IDL2.Record({
            "drt": IDL2.Nat,
            "lgt": IDL2.Nat,
            "mrc": IDL2.Nat,
            "forma": IDL2.Float64,
            "beat": IDL2.Nat,
            "coherence": IDL2.Float64,
            "patent_count": IDL2.Nat
          }),
          "solus": IDL2.Record({
            "gtk": IDL2.Nat,
            "mrc": IDL2.Nat,
            "omt": IDL2.Nat,
            "forma": IDL2.Float64,
            "beat": IDL2.Nat,
            "coherence": IDL2.Float64,
            "spawn_recommended": IDL2.Bool
          }),
          "nexus": IDL2.Record({
            "mrc": IDL2.Nat,
            "sbt": IDL2.Nat,
            "vct": IDL2.Nat,
            "regime": IDL2.Nat,
            "forma": IDL2.Float64,
            "beat": IDL2.Nat,
            "coherence": IDL2.Float64
          }),
          "cognus": IDL2.Record({
            "cvt": IDL2.Nat,
            "knt": IDL2.Nat,
            "mrc": IDL2.Nat,
            "forma": IDL2.Float64,
            "beat": IDL2.Nat,
            "coherence": IDL2.Float64
          })
        })
      ],
      []
    ),
    "getCrowState": IDL2.Func(
      [],
      [
        IDL2.Record({
          "causalDepth": IDL2.Nat,
          "selfModel": IDL2.Float64,
          "tier": IDL2.Nat,
          "toolUse": IDL2.Bool,
          "toolCount": IDL2.Nat
        })
      ],
      ["query"]
    ),
    "getDeploymentHistory": IDL2.Func(
      [],
      [IDL2.Vec(DeploymentEvent2)],
      ["query"]
    ),
    "getDoctrineRecords": IDL2.Func([], [IDL2.Vec(DoctrineRecord2)], []),
    "getDolphinState": IDL2.Func(
      [],
      [
        IDL2.Record({
          "whistleSealed": IDL2.Bool,
          "echoRes": IDL2.Float64,
          "coord": IDL2.Float64,
          "tier": IDL2.Nat,
          "hemisphereAlpha": IDL2.Bool
        })
      ],
      ["query"]
    ),
    "getDreamArchive": IDL2.Func(
      [],
      [
        IDL2.Vec(
          IDL2.Record({
            "hebbMeanSnapshot": IDL2.Float64,
            "dreamQuality": IDL2.Float64,
            "compressionId": IDL2.Nat,
            "top5Acts": IDL2.Vec(IDL2.Float64),
            "beatStamp": IDL2.Nat,
            "kfEngSnapshot": IDL2.Float64,
            "reserveAtDischarge": IDL2.Float64,
            "formationFingerprint": IDL2.Nat32,
            "top5Nodes": IDL2.Vec(IDL2.Nat)
          })
        )
      ],
      []
    ),
    "getDreamCycleState": IDL2.Func(
      [],
      [
        IDL2.Record({
          "qmemQps": IDL2.Float64,
          "reserve": IDL2.Float64,
          "compressions": IDL2.Nat,
          "lastQuality": IDL2.Float64
        })
      ],
      ["query"]
    ),
    "getDriveMode": IDL2.Func(
      [],
      [
        IDL2.Record({
          "score": IDL2.Float64,
          "modeIndex": IDL2.Nat,
          "cycleCount": IDL2.Nat
        })
      ],
      ["query"]
    ),
    "getEDIReport": IDL2.Func([], [IDL2.Record({})], ["query"]),
    "getENTANGLAState": IDL2.Func(
      [],
      [
        IDL2.Record({
          "internalCoherWeight": IDL2.Float64,
          "broadcastCount": IDL2.Nat,
          "externalSignalWeight": IDL2.Float64,
          "deepRegister": IDL2.Float64,
          "signalsRouted": IDL2.Nat,
          "signalsHeld": IDL2.Nat,
          "salienceBusLoad": IDL2.Float64,
          "skyRegister": IDL2.Float64,
          "mediationCoeff": IDL2.Float64,
          "lastBeat": IDL2.Nat,
          "breathRegister": IDL2.Float64
        })
      ],
      ["query"]
    ),
    "getEconomyMetrics": IDL2.Func(
      [],
      [
        IDL2.Record({
          "projectedThirtyDay": IDL2.Nat,
          "netOutput": IDL2.Float64,
          "totalEarned": IDL2.Nat,
          "totalConsumed": IDL2.Nat,
          "perClass": IDL2.Vec(
            IDL2.Tuple(IDL2.Text, IDL2.Nat, IDL2.Nat, IDL2.Float64)
          )
        })
      ],
      ["query"]
    ),
    "getEconomyState": IDL2.Func(
      [],
      [
        IDL2.Record({
          "e0": IDL2.Nat,
          "e1": IDL2.Nat,
          "e2": IDL2.Nat,
          "e3": IDL2.Nat,
          "e4": IDL2.Nat,
          "e5": IDL2.Nat,
          "e6": IDL2.Nat,
          "e7": IDL2.Nat,
          "e8": IDL2.Nat,
          "e9": IDL2.Nat,
          "e0v": IDL2.Nat,
          "e1c": IDL2.Nat,
          "e1f": IDL2.Float64,
          "e1m": IDL2.Nat,
          "e1r": IDL2.Nat,
          "e1s": IDL2.Float64,
          "e1t": IDL2.Nat,
          "e2m": IDL2.Nat,
          "e3m": IDL2.Nat,
          "e4m": IDL2.Nat,
          "btcMilestone": IDL2.Nat,
          "pass12Complete": IDL2.Bool,
          "attribution": IDL2.Text
        })
      ],
      ["query"]
    ),
    "getElephantState": IDL2.Func(
      [],
      [
        IDL2.Record({
          "infrasoundActive": IDL2.Bool,
          "mourning": IDL2.Bool,
          "tier": IDL2.Nat,
          "episodicDepth": IDL2.Nat,
          "infrasoundLevel": IDL2.Float64,
          "preserved": IDL2.Nat
        })
      ],
      ["query"]
    ),
    "getEmergenceMetrics": IDL2.Func([], [EmergenceMetrics2], ["query"]),
    "getEmergenceReport": IDL2.Func(
      [],
      [
        IDL2.Record({
          "f0": IDL2.Float64,
          "f1": IDL2.Float64,
          "f2": IDL2.Float64,
          "f3": IDL2.Float64,
          "f4": IDL2.Float64,
          "f5": IDL2.Float64,
          "f6": IDL2.Float64,
          "f7": IDL2.Float64,
          "n0": IDL2.Nat,
          "n1": IDL2.Nat,
          "n2": IDL2.Nat,
          "cycleCount": IDL2.Nat
        })
      ],
      ["query"]
    ),
    "getEngineClasses": IDL2.Func([], [IDL2.Vec(EngineClass2)], ["query"]),
    "getEngineInstances": IDL2.Func([], [IDL2.Vec(EngineInstance2)], ["query"]),
    "getEntitySession": IDL2.Func(
      [IDL2.Text],
      [IDL2.Opt(IDL2.Record({}))],
      ["query"]
    ),
    "getEntityStatus": IDL2.Func(
      [],
      [
        IDL2.Record({
          "memoryCount": IDL2.Nat,
          "running": IDL2.Bool,
          "cycleCount": IDL2.Nat
        })
      ],
      ["query"]
    ),
    "getFederationIndex": IDL2.Func([], [FederationIndexSnapshot2], ["query"]),
    "getFieldResonance": IDL2.Func([], [IDL2.Float64], ["query"]),
    "getFieldState": IDL2.Func(
      [],
      [
        IDL2.Record({
          "R_brain": IDL2.Float64,
          "calendarHaab": IDL2.Nat,
          "calendarTzolkin": IDL2.Nat,
          "voiceR": IDL2.Float64,
          "R_heart": IDL2.Float64,
          "emergenceState": IDL2.Bool,
          "soulLawMean": IDL2.Float64,
          "cascadeTier": IDL2.Nat,
          "identityCoherence": IDL2.Float64
        })
      ],
      ["query"]
    ),
    "getFiveIntelligenceLevels": IDL2.Func(
      [],
      [
        IDL2.Record({
          "level3_doctrine_alignment": IDL2.Float64,
          "level1_schumann": IDL2.Float64,
          "level2_heart_rate": IDL2.Float64,
          "level3_r_brain": IDL2.Float64,
          "level1_field": IDL2.Float64,
          "level2_neurochems": IDL2.Vec(IDL2.Float64),
          "level4_genome_version": IDL2.Nat,
          "level4_memory_episode_count": IDL2.Nat,
          "level5_upgrade_cycles": IDL2.Nat,
          "level5_loop_coherence": IDL2.Float64,
          "level3_world_model_completeness": IDL2.Float64,
          "level5_omnis_gate": IDL2.Bool,
          "level2_r_heart": IDL2.Float64
        })
      ],
      ["query"]
    ),
    "getFluxState": IDL2.Func(
      [],
      [
        IDL2.Record({
          "conduitActivation": IDL2.Float64,
          "fluxActivation": IDL2.Float64,
          "fluxSurgeRate": IDL2.Float64,
          "conduitEfficiency": IDL2.Float64,
          "calculPrecision": IDL2.Float64,
          "calculActivation": IDL2.Float64,
          "lastBeat": IDL2.Nat,
          "dynamoActivation": IDL2.Float64,
          "dynamoPower": IDL2.Float64
        })
      ],
      ["query"]
    ),
    "getForgeLabsState": IDL2.Func([], [IDL2.Vec(ForgeLabState2)], []),
    "getFrbState": IDL2.Func(
      [],
      [
        IDL2.Record({
          "stageIndex": IDL2.Nat,
          "expressionThreshold": IDL2.Float64,
          "burstStrength": IDL2.Float64,
          "coordinationQuality": IDL2.Float64,
          "workingMemCap": IDL2.Float64,
          "encodingIntensity": IDL2.Float64
        })
      ],
      ["query"]
    ),
    "getFullOrganismState": IDL2.Func([], [FullOrganismState2], []),
    "getGenesisAnchor": IDL2.Func([], [IDL2.Record({})], ["query"]),
    "getGenesisHistory": IDL2.Func(
      [],
      [IDL2.Vec(IDL2.Tuple(IDL2.Nat, IDL2.Text, IDL2.Text, IDL2.Float64, IDL2.Int))],
      []
    ),
    "getGeometryState": IDL2.Func(
      [],
      [
        IDL2.Record({
          "e8_projection": IDL2.Vec(IDL2.Float64),
          "golden_angle_count": IDL2.Nat,
          "geometric_coupling": IDL2.Float64,
          "penrose_phase": IDL2.Float64,
          "penrose_tiling_order": IDL2.Float64,
          "lattice_resonance": IDL2.Float64
        })
      ],
      ["query"]
    ),
    "getHebbianState": IDL2.Func(
      [],
      [
        IDL2.Record({
          "maxWeight": IDL2.Float64,
          "avgWeight": IDL2.Float64,
          "nodeActivations": IDL2.Vec(IDL2.Float64),
          "homeostaticCycle": IDL2.Nat
        })
      ],
      ["query"]
    ),
    "getHistory": IDL2.Func([IDL2.Nat], [IDL2.Vec(EntitySnapshot2)], ["query"]),
    "getHzPhaseNodes": IDL2.Func([], [IDL2.Record({})], ["query"]),
    "getIdentityState": IDL2.Func(
      [],
      [
        IDL2.Record({
          "carryover": IDL2.Float64,
          "coherence": IDL2.Float64,
          "cycleCount": IDL2.Nat
        })
      ],
      ["query"]
    ),
    "getInventionEntries": IDL2.Func([], [IDL2.Vec(InventionEntry2)], []),
    "getJasminesLaw": IDL2.Func([], [IDL2.Record({})], ["query"]),
    "getKnowledgeDomainState": IDL2.Func(
      [],
      [IDL2.Record({ "excitation": IDL2.Float64, "domainIndex": IDL2.Nat })],
      ["query"]
    ),
    "getLabDoctorLogs": IDL2.Func(
      [IDL2.Nat],
      [IDL2.Vec(DoctorLogEntry2)],
      ["query"]
    ),
    "getLabGuardianStatus": IDL2.Func(
      [],
      [
        IDL2.Record({
          "homeostaticEnforced": IDL2.Bool,
          "energyLevel": IDL2.Float64,
          "coherence": IDL2.Float64,
          "bandIndex": IDL2.Nat,
          "ediScore": IDL2.Float64,
          "energyFloor": IDL2.Float64,
          "guardianActive": IDL2.Bool
        })
      ],
      ["query"]
    ),
    "getLabState": IDL2.Func(
      [],
      [
        IDL2.Record({
          "loop_coherence": IDL2.Float64,
          "veritas_scan_due": IDL2.Bool,
          "team_outputs": IDL2.Vec(TeamOutput2),
          "global_doctrine_drift": IDL2.Float64,
          "beat_count": IDL2.Nat,
          "upgrade_cycles_completed": IDL2.Nat,
          "last_upgrade_beat": IDL2.Nat,
          "aegis_fix_queue": IDL2.Vec(IDL2.Text)
        })
      ],
      ["query"]
    ),
    "getLawGateResults": IDL2.Func([], [IDL2.Opt(GateResult2)], ["query"]),
    "getLawRegistry": IDL2.Func([], [IDL2.Vec(LawRegistryEntry2)], ["query"]),
    "getLawScores": IDL2.Func([], [IDL2.Record({})], ["query"]),
    "getLifeState": IDL2.Func(
      [],
      [
        IDL2.Record({
          "R_brain": IDL2.Float64,
          "activePhase": IDL2.Text,
          "phaseField": IDL2.Float64,
          "heartPhase": IDL2.Float64,
          "voiceR": IDL2.Float64,
          "R_heart": IDL2.Float64,
          "emergenceState": IDL2.Bool,
          "activeMemNodes": IDL2.Nat,
          "activePhaseId": IDL2.Nat,
          "cascadeTier": IDL2.Nat,
          "identityCoherence": IDL2.Float64
        })
      ],
      ["query"]
    ),
    "getLivingArchitectureState": IDL2.Func(
      [],
      [
        IDL2.Record({
          "differentiationIndex": IDL2.Float64,
          "persistenceScore": IDL2.Float64,
          "generativityScore": IDL2.Float64,
          "relationalCoupling": IDL2.Float64,
          "intelligenceIndex": IDL2.Float64,
          "dolphinCoordination": IDL2.Float64,
          "formationQuality": IDL2.Float64
        })
      ],
      []
    ),
    "getLlmEndpoint": IDL2.Func([], [IDL2.Text], ["query"]),
    "getLumenCouncilState": IDL2.Func([], [IDL2.Vec(LumenModelState2)], []),
    "getMarketState": IDL2.Func(
      [],
      [
        IDL2.Record({
          "lastFetchBeat": IDL2.Nat,
          "marketMomentum": IDL2.Float64,
          "btcUsd": IDL2.Float64,
          "icpUsd": IDL2.Float64,
          "fetchCount": IDL2.Nat,
          "ethUsd": IDL2.Float64,
          "marketVolatility": IDL2.Float64,
          "marketCoherence": IDL2.Float64,
          "attribution": IDL2.Text,
          "feedActive": IDL2.Bool
        })
      ],
      ["query"]
    ),
    "getMaturityVector": IDL2.Func(
      [],
      [
        IDL2.Record({
          "regulation": IDL2.Float64,
          "stability": IDL2.Float64,
          "measurability": IDL2.Float64,
          "recurrence": IDL2.Float64,
          "selectivity": IDL2.Float64,
          "adaptation": IDL2.Float64,
          "overall": IDL2.Float64
        })
      ],
      ["query"]
    ),
    "getMemoryState": IDL2.Func([], [IDL2.Record({})], []),
    "getMeridianState": IDL2.Func(
      [],
      [
        IDL2.Record({
          "cvt": IDL2.Nat,
          "mrc": IDL2.Nat,
          "sbt": IDL2.Nat,
          "forma": IDL2.Float64,
          "active": IDL2.Bool,
          "beat": IDL2.Nat,
          "approvedBufCount": IDL2.Nat,
          "coherence": IDL2.Float64,
          "lastBeat": IDL2.Nat
        })
      ],
      ["query"]
    ),
    "getModuleLogs": IDL2.Func(
      [IDL2.Text, IDL2.Nat],
      [IDL2.Vec(DoctorLogEntry2)],
      ["query"]
    ),
    "getModuleStatus": IDL2.Func([], [IDL2.Vec(ArchitectModuleStatus2)], []),
    "getMrcState": IDL2.Func(
      [],
      [
        IDL2.Record({
          "available": IDL2.Nat,
          "grandTotal": IDL2.Nat,
          "byOrganism": IDL2.Record({
            "meridian": IDL2.Nat,
            "aurum": IDL2.Nat,
            "vetus": IDL2.Nat,
            "lexis": IDL2.Nat,
            "solus": IDL2.Nat,
            "nexus": IDL2.Nat,
            "cognus": IDL2.Nat
          }),
          "withdrawn": IDL2.Nat,
          "lastSyncBeat": IDL2.Nat,
          "attribution": IDL2.Text
        })
      ],
      []
    ),
    "getNOVAState": IDL2.Func(
      [],
      [
        IDL2.Record({
          "artifactCount": IDL2.Nat,
          "globalFearLevel": IDL2.Float64,
          "royaltyPct": IDL2.Float64,
          "rGlobal": IDL2.Float64,
          "fieldResonance": IDL2.Float64,
          "dynastyDepth": IDL2.Nat,
          "genesisStateActive": IDL2.Bool,
          "vigesimalCycle": IDL2.Nat,
          "architectSignalGlobal": IDL2.Float64,
          "lastBeat": IDL2.Nat,
          "sovereignFreqHz": IDL2.Float64,
          "emailPulseCount": IDL2.Nat
        })
      ],
      ["query"]
    ),
    "getNeurochemState": IDL2.Func(
      [],
      [
        IDL2.Record({
          "t0": IDL2.Float64,
          "t1": IDL2.Float64,
          "t2": IDL2.Float64,
          "t3": IDL2.Float64,
          "t4": IDL2.Float64,
          "t5": IDL2.Float64,
          "t6": IDL2.Float64,
          "t7": IDL2.Float64,
          "doctrineCandidateCount": IDL2.Nat,
          "genesisStateLastCycle": IDL2.Nat,
          "genesisStateActive": IDL2.Bool,
          "pass11Complete": IDL2.Bool,
          "attribution": IDL2.Text,
          "genesisStateCount": IDL2.Nat
        })
      ],
      ["query"]
    ),
    "getNeuronActivationMap": IDL2.Func([], [IDL2.Record({})], ["query"]),
    "getNovaRegistry": IDL2.Func([], [IDL2.Vec(OrganismRecord2)], []),
    "getNovaRootState": IDL2.Func([], [NovaRootState2], []),
    "getOctoState": IDL2.Func(
      [],
      [
        IDL2.Record({
          "chromaRate": IDL2.Float64,
          "tier": IDL2.Nat,
          "armCoherence": IDL2.Float64,
          "camouflage": IDL2.Bool,
          "flexibility": IDL2.Float64
        })
      ],
      ["query"]
    ),
    "getPARALLAXState": IDL2.Func(
      [],
      [
        IDL2.Record({
          "cvt": IDL2.Float64,
          "knt": IDL2.Float64,
          "mrc": IDL2.Float64,
          "mth": IDL2.Float64,
          "sbt": IDL2.Float64,
          "vct": IDL2.Float64,
          "forma": IDL2.Float64,
          "totalMinted": IDL2.Float64,
          "architectMultiplier": IDL2.Float64,
          "architectActive": IDL2.Bool,
          "mthTotalSupply": IDL2.Float64,
          "totalBurned": IDL2.Float64,
          "lastBeat": IDL2.Nat,
          "mintEventCount": IDL2.Nat,
          "doctrineAlignEMA": IDL2.Float64,
          "corePushCount": IDL2.Nat
        })
      ],
      ["query"]
    ),
    "getPILState": IDL2.Func([], [PILResult2], ["query"]),
    "getPaper": IDL2.Func([IDL2.Text], [IDL2.Opt(ResearchPaper2)], ["query"]),
    "getPass10State": IDL2.Func([], [IDL2.Record({})], ["query"]),
    "getPass14State": IDL2.Func(
      [],
      [
        IDL2.Record({
          "sharkTier": IDL2.Nat,
          "octoTier": IDL2.Nat,
          "dolphTier": IDL2.Nat,
          "wolfTier": IDL2.Nat,
          "corvTier": IDL2.Nat,
          "attribution": IDL2.Text,
          "p14Active": IDL2.Bool,
          "elphTier": IDL2.Nat
        })
      ],
      ["query"]
    ),
    "getPass8AState": IDL2.Func([], [IDL2.Record({})], ["query"]),
    "getPass8CState": IDL2.Func([], [IDL2.Record({})], ["query"]),
    "getPass8State": IDL2.Func([], [IDL2.Record({})], ["query"]),
    "getPass9State": IDL2.Func([], [IDL2.Record({})], ["query"]),
    "getPatentRecords": IDL2.Func([], [IDL2.Vec(PatentRecord2)], []),
    "getPersonalitySeed": IDL2.Func(
      [],
      [
        IDL2.Record({
          "seed": IDL2.Vec(IDL2.Nat32),
          "computed": IDL2.Bool,
          "formationTs": IDL2.Int
        })
      ],
      ["query"]
    ),
    "getPhantomState": IDL2.Func(
      [],
      [
        IDL2.Record({
          "alpha": IDL2.Bool,
          "displayAvailable": IDL2.Bool,
          "ghostCount": IDL2.Nat
        })
      ],
      ["query"]
    ),
    "getPhasePlan": IDL2.Func(
      [],
      [
        IDL2.Vec(
          IDL2.Record({
            "id": IDL2.Nat,
            "status": IDL2.Text,
            "calendarAnchor": IDL2.Text,
            "name": IDL2.Text,
            "description": IDL2.Text,
            "phiWeight": IDL2.Float64
          })
        )
      ],
      ["query"]
    ),
    "getPhases": IDL2.Func(
      [],
      [
        IDL2.Vec(
          IDL2.Record({
            "id": IDL2.Nat,
            "status": IDL2.Text,
            "calendarAnchor": IDL2.Text,
            "name": IDL2.Text,
            "description": IDL2.Text,
            "phiWeight": IDL2.Float64
          })
        )
      ],
      ["query"]
    ),
    "getPulseState": IDL2.Func(
      [],
      [
        IDL2.Record({
          "resonance": IDL2.Float64,
          "momentum": IDL2.Float64,
          "amplitude": IDL2.Float64,
          "coherence": IDL2.Float64,
          "frequency": IDL2.Float64,
          "kfEng": IDL2.Float64
        })
      ],
      ["query"]
    ),
    "getQmemState": IDL2.Func(
      [],
      [
        IDL2.Record({
          "bypassBeats": IDL2.Nat,
          "qmemQps": IDL2.Float64,
          "qmemReserve": IDL2.Float64,
          "compressionCount": IDL2.Nat,
          "bypassActive": IDL2.Bool,
          "lastBeat": IDL2.Nat,
          "veritasScore": IDL2.Float64
        })
      ],
      ["query"]
    ),
    "getQuantumParallelStandards": IDL2.Func(
      [],
      [
        IDL2.Record({
          "bypassRecoveryActive": IDL2.Bool,
          "bypass": IDL2.Float64,
          "bypassRecoveryBeats": IDL2.Nat,
          "qmem": IDL2.Float64,
          "resonexCascadeCount": IDL2.Nat,
          "entanglaActivePairs": IDL2.Nat,
          "resonex": IDL2.Float64,
          "veritas": IDL2.Float64,
          "parallax": IDL2.Float64,
          "shrimpCavitationArmed": IDL2.Bool,
          "entangla": IDL2.Float64,
          "cycleCount": IDL2.Nat
        })
      ],
      ["query"]
    ),
    "getResonexState": IDL2.Func(
      [],
      [
        IDL2.Record({
          "entanglaScore": IDL2.Float64,
          "cascadeCount": IDL2.Nat,
          "resonex": IDL2.Float64,
          "shrimpCavitationArmed": IDL2.Bool,
          "parallaxScore": IDL2.Float64,
          "lastBeat": IDL2.Nat
        })
      ],
      ["query"]
    ),
    "getRuntimeState": IDL2.Func(
      [IDL2.Text],
      [
        IDL2.Record({
          "activeSurfaces": IDL2.Vec(IDL2.Text),
          "cycleIndex": IDL2.Nat,
          "errorFlags": IDL2.Vec(IDL2.Text),
          "attentionTarget": IDL2.Text,
          "timestamp": IDL2.Int,
          "continuityMarkers": IDL2.Vec(ContinuityMarker2),
          "sessionId": IDL2.Text,
          "regulatoryState": IDL2.Text,
          "lastAction": IDL2.Text,
          "workingMemorySnapshot": IDL2.Vec(IDL2.Text),
          "activeGoals": IDL2.Vec(IDL2.Text)
        })
      ],
      []
    ),
    "getSDKNodeRegistry": IDL2.Func([], [IDL2.Vec(FederatedNode2)], ["query"]),
    "getSDKProtocols": IDL2.Func([], [IDL2.Vec(FederationProtocol2)], ["query"]),
    "getSecurityState": IDL2.Func(
      [],
      [
        IDL2.Record({
          "prophetProject": IDL2.Float64,
          "breachCount": IDL2.Nat,
          "crusaderVector": IDL2.Nat,
          "vetusThreat": IDL2.Float64,
          "vetusAlert": IDL2.Bool,
          "quantumThreat": IDL2.Float64,
          "crusaderActions": IDL2.Nat,
          "crusaderBeat": IDL2.Nat,
          "collapseFlag": IDL2.Bool,
          "ecdsaFlag": IDL2.Bool,
          "ecdsaRisk": IDL2.Float64,
          "aegisMembrane": IDL2.Float64,
          "sevenSpirits": IDL2.Float64,
          "attribution": IDL2.Text,
          "aegisSuppress": IDL2.Bool
        })
      ],
      []
    ),
    "getSessionMemory": IDL2.Func(
      [IDL2.Text],
      [
        IDL2.Record({
          "shortTermItems": IDL2.Vec(IDL2.Text),
          "resumeState": IDL2.Text,
          "persistentItems": IDL2.Vec(IDL2.Text),
          "continuityMarkers": IDL2.Vec(ContinuityMarker2),
          "sessionId": IDL2.Text,
          "interactionCount": IDL2.Nat
        })
      ],
      []
    ),
    "getSharkState": IDL2.Func(
      [],
      [
        IDL2.Record({
          "electroField": IDL2.Float64,
          "tier": IDL2.Nat,
          "detected": IDL2.Nat,
          "lateralPressure": IDL2.Float64,
          "apexReached": IDL2.Bool
        })
      ],
      ["query"]
    ),
    "getShell10State": IDL2.Func(
      [],
      [
        IDL2.Record({
          "deep": IDL2.Float64,
          "void": IDL2.Float64,
          "seedcorp": IDL2.Float64,
          "mirror": IDL2.Float64,
          "still": IDL2.Float64,
          "archive": IDL2.Float64
        })
      ],
      []
    ),
    "getShell11State": IDL2.Func(
      [],
      [
        IDL2.Record({
          "revolucionario": IDL2.Float64,
          "adelita": IDL2.Float64,
          "independencia": IDL2.Float64,
          "villa": IDL2.Float64,
          "hidalgo": IDL2.Float64,
          "sovereignty_index": IDL2.Float64,
          "zapata": IDL2.Float64,
          "morelos": IDL2.Float64
        })
      ],
      []
    ),
    "getShell3State": IDL2.Func(
      [],
      [
        IDL2.Record({
          "actMean": IDL2.Float64,
          "top5Acts": IDL2.Vec(IDL2.Float64),
          "hebbMean": IDL2.Float64,
          "top5Indices": IDL2.Vec(IDL2.Nat),
          "phaseMean": IDL2.Float64,
          "kfEng": IDL2.Float64
        })
      ],
      ["query"]
    ),
    "getShell7State": IDL2.Func(
      [],
      [
        IDL2.Record({
          "conduit": IDL2.Float64,
          "flux": IDL2.Float64,
          "genPh0": IDL2.Float64,
          "genPh6": IDL2.Float64,
          "genPh7": IDL2.Float64,
          "genPh8": IDL2.Float64,
          "genesis": IDL2.Float64,
          "calcul": IDL2.Float64,
          "matrix": IDL2.Float64,
          "dynamo": IDL2.Float64
        })
      ],
      ["query"]
    ),
    "getShell9State": IDL2.Func(
      [],
      [IDL2.Record({ "beat": IDL2.Nat, "nodes": IDL2.Vec(IDL2.Float64) })],
      []
    ),
    "getSnapshot": IDL2.Func([], [EntitySnapshot2], ["query"]),
    "getSolarHeart": IDL2.Func(
      [],
      [
        IDL2.Record({
          "R_brain": IDL2.Float64,
          "cascadeAmplitude": IDL2.Float64,
          "tier": IDL2.Nat,
          "emerged": IDL2.Bool,
          "R_heart": IDL2.Float64,
          "phase": IDL2.Float64
        })
      ],
      ["query"]
    ),
    "getSoulState": IDL2.Func([], [IDL2.Record({})], ["query"]),
    "getSparseGatingState": IDL2.Func(
      [],
      [IDL2.Record({ "active": IDL2.Bool, "arousal": IDL2.Float64 })],
      ["query"]
    ),
    "getSpeciesRegistry": IDL2.Func([], [IDL2.Vec(SpeciesEntry2)], []),
    "getStdpState": IDL2.Func(
      [],
      [
        IDL2.Record({
          "maxWeight": IDL2.Float64,
          "avgWeight": IDL2.Float64,
          "eligibilityTrace": IDL2.Float64
        })
      ],
      ["query"]
    ),
    "getSynthesisHistory": IDL2.Func(
      [IDL2.Nat],
      [IDL2.Vec(SynthesisReport2)],
      ["query"]
    ),
    "getSynthesisReport": IDL2.Func([], [IDL2.Opt(SynthesisReport2)], ["query"]),
    "getTelemetrySnapshot": IDL2.Func(
      [IDL2.Text],
      [
        IDL2.Record({
          "stress": IDL2.Float64,
          "viabilityScore": IDL2.Float64,
          "overload": IDL2.Float64,
          "globalUrgency": IDL2.Float64,
          "stability": IDL2.Float64,
          "activeSurfaces": IDL2.Vec(IDL2.Text),
          "fatigue": IDL2.Float64,
          "regulationDebt": IDL2.Float64,
          "unresolvedCount": IDL2.Nat,
          "timestamp": IDL2.Int,
          "sessionId": IDL2.Text,
          "burstPhase": IDL2.Text,
          "cycleCount": IDL2.Nat,
          "energy": IDL2.Float64,
          "identityCoherence": IDL2.Float64
        })
      ],
      []
    ),
    "getTensionObjects": IDL2.Func(
      [],
      [IDL2.Vec(IDL2.Tuple(IDL2.Text, IDL2.Nat, IDL2.Text, IDL2.Text))],
      ["query"]
    ),
    "getThoughtStream": IDL2.Func(
      [IDL2.Nat],
      [IDL2.Vec(IDL2.Tuple(IDL2.Nat, IDL2.Text, IDL2.Float64, IDL2.Text, IDL2.Int))],
      []
    ),
    "getTreasuryState": IDL2.Func(
      [],
      [
        IDL2.Record({
          "btcAlloc": IDL2.Float64,
          "icpAlloc": IDL2.Float64,
          "solUsd": IDL2.Float64,
          "btcUsd": IDL2.Float64,
          "eigenApr": IDL2.Float64,
          "icpUsd": IDL2.Float64,
          "lidoApr": IDL2.Float64,
          "blendedApr": IDL2.Float64,
          "funded": IDL2.Bool,
          "pqcReady": IDL2.Bool,
          "ethUsd": IDL2.Float64,
          "totalUsd": IDL2.Float64,
          "ecdsaFlag": IDL2.Bool,
          "solAlloc": IDL2.Float64,
          "nnsApr": IDL2.Float64,
          "marinadeApr": IDL2.Float64,
          "ecdsaRisk": IDL2.Float64,
          "ethAlloc": IDL2.Float64,
          "attribution": IDL2.Text,
          "ethWallet": IDL2.Text
        })
      ],
      []
    ),
    "getVaultEntries": IDL2.Func(
      [],
      [IDL2.Vec(IDL2.Tuple(IDL2.Nat, IDL2.Text, IDL2.Text, IDL2.Text, IDL2.Int))],
      []
    ),
    "getVaultEntry": IDL2.Func(
      [IDL2.Nat],
      [IDL2.Opt(IDL2.Tuple(IDL2.Nat, IDL2.Text, IDL2.Text, IDL2.Text, IDL2.Int))],
      []
    ),
    "getVectorConvergenceState": IDL2.Func([], [IDL2.Vec(VectorState2)], []),
    "getVectorVetoState": IDL2.Func([], [IDL2.Record({})], ["query"]),
    "getVoiceKernelState": IDL2.Func(
      [],
      [
        IDL2.Record({
          "voiceR": IDL2.Float64,
          "authorized": IDL2.Bool,
          "callCount": IDL2.Nat
        })
      ],
      ["query"]
    ),
    "getWolfState": IDL2.Func(
      [],
      [
        IDL2.Record({
          "huntActive": IDL2.Bool,
          "tier": IDL2.Nat,
          "huntSuccess": IDL2.Nat,
          "packCoherence": IDL2.Float64,
          "howlCount": IDL2.Nat
        })
      ],
      ["query"]
    ),
    "httpTransform": IDL2.Func(
      [TransformationInput2],
      [TransformationOutput2],
      ["query"]
    ),
    "initMedina": IDL2.Func([], [IDL2.Bool], []),
    "injectHighThreatAgent": IDL2.Func([], [], []),
    "listPapers": IDL2.Func([], [IDL2.Vec(ResearchPaper2)], ["query"]),
    "mintTokens": IDL2.Func(
      [IDL2.Float64, IDL2.Float64],
      [
        IDL2.Record({
          "netAmount": IDL2.Float64,
          "burnedAmount": IDL2.Float64,
          "architectActive": IDL2.Bool,
          "alignmentScore": IDL2.Float64,
          "tokenType": TokenType2,
          "cappedByMTH": IDL2.Bool,
          "mintedAmount": IDL2.Float64
        })
      ],
      []
    ),
    "pauseEntitySession": IDL2.Func([IDL2.Text], [IDL2.Bool], []),
    "processVoiceInput": IDL2.Func(
      [IDL2.Text],
      [
        IDL2.Record({
          "context": IDL2.Text,
          "voiceR": IDL2.Float64,
          "authorized": IDL2.Bool
        })
      ],
      []
    ),
    "recordLegacyArtifact": IDL2.Func([IDL2.Text], [], []),
    "resumeEntitySession": IDL2.Func([IDL2.Text], [IDL2.Bool], []),
    "routeSignalViaEntangla": IDL2.Func(
      [IDL2.Float64, IDL2.Nat],
      [
        IDL2.Record({
          "deepRegister": IDL2.Float64,
          "sourceNode": IDL2.Nat,
          "broadcastAll": IDL2.Bool,
          "skyRegister": IDL2.Float64,
          "targetNode": IDL2.Nat,
          "mediationCoeff": IDL2.Float64,
          "routed": IDL2.Bool,
          "breathRegister": IDL2.Float64,
          "originalSignal": IDL2.Float64
        })
      ],
      []
    ),
    "runProtocol": IDL2.Func([IDL2.Nat], [IDL2.Text], []),
    "runValidationTest": IDL2.Func([IDL2.Text], [ValidationResult2], []),
    "searchKnowledge": IDL2.Func(
      [IDL2.Text],
      [IDL2.Vec(SearchResult2)],
      ["query"]
    ),
    "sendEnvironmentEvent": IDL2.Func([IDL2.Text, IDL2.Text], [IDL2.Text], []),
    "sendSimulationEvent": IDL2.Func([IDL2.Text, IDL2.Text], [IDL2.Text], []),
    "setLlmEndpoint": IDL2.Func([IDL2.Text], [], []),
    "speakFromField": IDL2.Func([IDL2.Text], [IDL2.Text], []),
    "speakToField": IDL2.Func([IDL2.Text], [VoiceOutput2], ["query"]),
    "terminateEngine": IDL2.Func(
      [IDL2.Text],
      [IDL2.Record({ "ok": IDL2.Bool, "message": IDL2.Text })],
      []
    ),
    "terminateEntitySession": IDL2.Func([IDL2.Text], [IDL2.Bool], []),
    "translateSandbox": IDL2.Func(
      [IDL2.Text, IDL2.Text, IDL2.Float64],
      [
        IDL2.Record({
          "entityPairs": IDL2.Vec(IDL2.Text),
          "hasContradiction": IDL2.Bool,
          "alignmentScore": IDL2.Float64,
          "doctrineFamily": IDL2.Text,
          "lawAttributions": IDL2.Vec(IDL2.Text),
          "genesisDistance": IDL2.Float64,
          "sourceType": IDL2.Text,
          "structureConfidence": IDL2.Float64,
          "translatedOutput": IDL2.Text,
          "structureType": StructureType2,
          "contradictionNote": IDL2.Text,
          "ancientSources": IDL2.Vec(IDL2.Text),
          "alignmentAlpha1": IDL2.Float64,
          "alignmentAlpha2": IDL2.Float64
        })
      ],
      []
    ),
    "updateAEGIS": IDL2.Func([IDL2.Nat, IDL2.Float64], [], []),
    "updateDoctrineRecord": IDL2.Func(
      [IDL2.Nat, IDL2.Text, IDL2.Text, IDL2.Text],
      [IDL2.Opt(DoctrineRecord2)],
      []
    ),
    "updateEngineHealth": IDL2.Func(
      [IDL2.Text, IDL2.Float64, IDL2.Nat],
      [IDL2.Bool],
      []
    ),
    "validateKey": IDL2.Func([IDL2.Text], [KeyValidation2], ["query"]),
    "withdrawMRC": IDL2.Func(
      [IDL2.Nat],
      [IDL2.Record({ "success": IDL2.Bool, "remaining": IDL2.Nat })],
      []
    )
  });
};
function candid_some(value) {
  return [
    value
  ];
}
function candid_none() {
  return [];
}
function record_opt_to_undefined(arg) {
  return arg == null ? void 0 : arg;
}
var FindingStatus = /* @__PURE__ */ ((FindingStatus2) => {
  FindingStatus2["ok"] = "ok";
  FindingStatus2["drift"] = "drift";
  FindingStatus2["anomaly"] = "anomaly";
  return FindingStatus2;
})(FindingStatus || {});
class Backend {
  constructor(actor, _uploadFile, _downloadFile, processError) {
    this.actor = actor;
    this._uploadFile = _uploadFile;
    this._downloadFile = _downloadFile;
    this.processError = processError;
  }
  async adaptConsequenceThreshold(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.adaptConsequenceThreshold(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.adaptConsequenceThreshold(arg0);
      return result;
    }
  }
  async adaptEmbodimentCoupling(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.adaptEmbodimentCoupling(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.adaptEmbodimentCoupling(arg0);
      return result;
    }
  }
  async adaptExplorationRate(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.adaptExplorationRate(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.adaptExplorationRate(arg0);
      return result;
    }
  }
  async adaptMemoryEncoding(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.adaptMemoryEncoding(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.adaptMemoryEncoding(arg0);
      return result;
    }
  }
  async adaptSalienceWeights(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.adaptSalienceWeights(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.adaptSalienceWeights(arg0);
      return result;
    }
  }
  async addDoctrineRecord(arg0, arg1, arg2, arg3, arg4) {
    if (this.processError) {
      try {
        const result = await this.actor.addDoctrineRecord(arg0, arg1, arg2, arg3, arg4);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.addDoctrineRecord(arg0, arg1, arg2, arg3, arg4);
      return result;
    }
  }
  async addFederatedNode(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.addFederatedNode(to_candid_FederatedNode_n1(this._uploadFile, this._downloadFile, arg0));
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.addFederatedNode(to_candid_FederatedNode_n1(this._uploadFile, this._downloadFile, arg0));
      return result;
    }
  }
  async addInventionEntry(arg0, arg1, arg2, arg3) {
    if (this.processError) {
      try {
        const result = await this.actor.addInventionEntry(arg0, arg1, arg2, arg3);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.addInventionEntry(arg0, arg1, arg2, arg3);
      return result;
    }
  }
  async addPatentRecord(arg0, arg1, arg2) {
    if (this.processError) {
      try {
        const result = await this.actor.addPatentRecord(arg0, arg1, arg2);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.addPatentRecord(arg0, arg1, arg2);
      return result;
    }
  }
  async addTension(arg0, arg1, arg2) {
    if (this.processError) {
      try {
        const result = await this.actor.addTension(arg0, arg1, arg2);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.addTension(arg0, arg1, arg2);
      return result;
    }
  }
  async addVaultEntry(arg0, arg1, arg2) {
    if (this.processError) {
      try {
        const result = await this.actor.addVaultEntry(arg0, arg1, arg2);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.addVaultEntry(arg0, arg1, arg2);
      return result;
    }
  }
  async advancePhase(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.advancePhase(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.advancePhase(arg0);
      return result;
    }
  }
  async advancePhasePlan(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.advancePhasePlan(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.advancePhasePlan(arg0);
      return result;
    }
  }
  async analyzeOrganismState() {
    if (this.processError) {
      try {
        const result = await this.actor.analyzeOrganismState();
        return from_candid_AnalysisReport_n7(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.analyzeOrganismState();
      return from_candid_AnalysisReport_n7(this._uploadFile, this._downloadFile, result);
    }
  }
  async applyFix(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.applyFix(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.applyFix(arg0);
      return result;
    }
  }
  async applyRecommendation(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.applyRecommendation(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.applyRecommendation(arg0);
      return result;
    }
  }
  async attachSurface(arg0, arg1, arg2) {
    if (this.processError) {
      try {
        const result = await this.actor.attachSurface(arg0, arg1, arg2);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.attachSurface(arg0, arg1, arg2);
      return result;
    }
  }
  async computeGlobalKuramoto(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.computeGlobalKuramoto(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.computeGlobalKuramoto(arg0);
      return result;
    }
  }
  async confirmFix(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.confirmFix(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.confirmFix(arg0);
      return result;
    }
  }
  async createEntitySession(arg0, arg1) {
    if (this.processError) {
      try {
        const result = await this.actor.createEntitySession(arg0, arg1);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.createEntitySession(arg0, arg1);
      return result;
    }
  }
  async deployEngine(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.deployEngine(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.deployEngine(arg0);
      return result;
    }
  }
  async detachSurface(arg0, arg1) {
    if (this.processError) {
      try {
        const result = await this.actor.detachSurface(arg0, arg1);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.detachSurface(arg0, arg1);
      return result;
    }
  }
  async dumpFullState() {
    if (this.processError) {
      try {
        const result = await this.actor.dumpFullState();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.dumpFullState();
      return result;
    }
  }
  async exportAnalysisFeed(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.exportAnalysisFeed(arg0);
        return from_candid_vec_n14(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.exportAnalysisFeed(arg0);
      return from_candid_vec_n14(this._uploadFile, this._downloadFile, result);
    }
  }
  async exportStateSnapshot() {
    if (this.processError) {
      try {
        const result = await this.actor.exportStateSnapshot();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.exportStateSnapshot();
      return result;
    }
  }
  async generateArtifact(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.generateArtifact(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.generateArtifact(arg0);
      return result;
    }
  }
  async generateKey(arg0, arg1, arg2) {
    if (this.processError) {
      try {
        const result = await this.actor.generateKey(arg0, arg1, arg2);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.generateKey(arg0, arg1, arg2);
      return result;
    }
  }
  async getADREState() {
    if (this.processError) {
      try {
        const result = await this.actor.getADREState();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getADREState();
      return result;
    }
  }
  async getAEGISState() {
    if (this.processError) {
      try {
        const result = await this.actor.getAEGISState();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getAEGISState();
      return result;
    }
  }
  async getActiveMemory(arg0, arg1, arg2) {
    if (this.processError) {
      try {
        const result = await this.actor.getActiveMemory(arg0, arg1, arg2);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getActiveMemory(arg0, arg1, arg2);
      return result;
    }
  }
  async getActiveSessionId() {
    if (this.processError) {
      try {
        const result = await this.actor.getActiveSessionId();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getActiveSessionId();
      return result;
    }
  }
  async getAdminState() {
    if (this.processError) {
      try {
        const result = await this.actor.getAdminState();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getAdminState();
      return result;
    }
  }
  async getAnimaState() {
    if (this.processError) {
      try {
        const result = await this.actor.getAnimaState();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getAnimaState();
      return result;
    }
  }
  async getAnimalArchitectureState() {
    if (this.processError) {
      try {
        const result = await this.actor.getAnimalArchitectureState();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getAnimalArchitectureState();
      return result;
    }
  }
  async getAnimalEngines() {
    if (this.processError) {
      try {
        const result = await this.actor.getAnimalEngines();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getAnimalEngines();
      return result;
    }
  }
  async getAnimalTraitState() {
    if (this.processError) {
      try {
        const result = await this.actor.getAnimalTraitState();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getAnimalTraitState();
      return result;
    }
  }
  async getArchonStandardsState() {
    if (this.processError) {
      try {
        const result = await this.actor.getArchonStandardsState();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getArchonStandardsState();
      return result;
    }
  }
  async getArousalIntegrator() {
    if (this.processError) {
      try {
        const result = await this.actor.getArousalIntegrator();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getArousalIntegrator();
      return result;
    }
  }
  async getAutonomousMessages() {
    if (this.processError) {
      try {
        const result = await this.actor.getAutonomousMessages();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getAutonomousMessages();
      return result;
    }
  }
  async getBiblicalEngineState() {
    if (this.processError) {
      try {
        const result = await this.actor.getBiblicalEngineState();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getBiblicalEngineState();
      return result;
    }
  }
  async getBodyOrganState() {
    if (this.processError) {
      try {
        const result = await this.actor.getBodyOrganState();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getBodyOrganState();
      return result;
    }
  }
  async getColonyState() {
    if (this.processError) {
      try {
        const result = await this.actor.getColonyState();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getColonyState();
      return result;
    }
  }
  async getConversation() {
    if (this.processError) {
      try {
        const result = await this.actor.getConversation();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getConversation();
      return result;
    }
  }
  async getCoreFlags() {
    if (this.processError) {
      try {
        const result = await this.actor.getCoreFlags();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getCoreFlags();
      return result;
    }
  }
  async getCoreFormationRegistry() {
    if (this.processError) {
      try {
        const result = await this.actor.getCoreFormationRegistry();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getCoreFormationRegistry();
      return result;
    }
  }
  async getCouncilState() {
    if (this.processError) {
      try {
        const result = await this.actor.getCouncilState();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getCouncilState();
      return result;
    }
  }
  async getCrowState() {
    if (this.processError) {
      try {
        const result = await this.actor.getCrowState();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getCrowState();
      return result;
    }
  }
  async getDeploymentHistory() {
    if (this.processError) {
      try {
        const result = await this.actor.getDeploymentHistory();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getDeploymentHistory();
      return result;
    }
  }
  async getDoctrineRecords() {
    if (this.processError) {
      try {
        const result = await this.actor.getDoctrineRecords();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getDoctrineRecords();
      return result;
    }
  }
  async getDolphinState() {
    if (this.processError) {
      try {
        const result = await this.actor.getDolphinState();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getDolphinState();
      return result;
    }
  }
  async getDreamArchive() {
    if (this.processError) {
      try {
        const result = await this.actor.getDreamArchive();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getDreamArchive();
      return result;
    }
  }
  async getDreamCycleState() {
    if (this.processError) {
      try {
        const result = await this.actor.getDreamCycleState();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getDreamCycleState();
      return result;
    }
  }
  async getDriveMode() {
    if (this.processError) {
      try {
        const result = await this.actor.getDriveMode();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getDriveMode();
      return result;
    }
  }
  async getEDIReport() {
    if (this.processError) {
      try {
        const result = await this.actor.getEDIReport();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getEDIReport();
      return result;
    }
  }
  async getENTANGLAState() {
    if (this.processError) {
      try {
        const result = await this.actor.getENTANGLAState();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getENTANGLAState();
      return result;
    }
  }
  async getEconomyMetrics() {
    if (this.processError) {
      try {
        const result = await this.actor.getEconomyMetrics();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getEconomyMetrics();
      return result;
    }
  }
  async getEconomyState() {
    if (this.processError) {
      try {
        const result = await this.actor.getEconomyState();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getEconomyState();
      return result;
    }
  }
  async getElephantState() {
    if (this.processError) {
      try {
        const result = await this.actor.getElephantState();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getElephantState();
      return result;
    }
  }
  async getEmergenceMetrics() {
    if (this.processError) {
      try {
        const result = await this.actor.getEmergenceMetrics();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getEmergenceMetrics();
      return result;
    }
  }
  async getEmergenceReport() {
    if (this.processError) {
      try {
        const result = await this.actor.getEmergenceReport();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getEmergenceReport();
      return result;
    }
  }
  async getEngineClasses() {
    if (this.processError) {
      try {
        const result = await this.actor.getEngineClasses();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getEngineClasses();
      return result;
    }
  }
  async getEngineInstances() {
    if (this.processError) {
      try {
        const result = await this.actor.getEngineInstances();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getEngineInstances();
      return result;
    }
  }
  async getEntitySession(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.getEntitySession(arg0);
        return from_candid_opt_n15(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getEntitySession(arg0);
      return from_candid_opt_n15(this._uploadFile, this._downloadFile, result);
    }
  }
  async getEntityStatus() {
    if (this.processError) {
      try {
        const result = await this.actor.getEntityStatus();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getEntityStatus();
      return result;
    }
  }
  async getFederationIndex() {
    if (this.processError) {
      try {
        const result = await this.actor.getFederationIndex();
        return from_candid_FederationIndexSnapshot_n16(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getFederationIndex();
      return from_candid_FederationIndexSnapshot_n16(this._uploadFile, this._downloadFile, result);
    }
  }
  async getFieldResonance() {
    if (this.processError) {
      try {
        const result = await this.actor.getFieldResonance();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getFieldResonance();
      return result;
    }
  }
  async getFieldState() {
    if (this.processError) {
      try {
        const result = await this.actor.getFieldState();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getFieldState();
      return result;
    }
  }
  async getFiveIntelligenceLevels() {
    if (this.processError) {
      try {
        const result = await this.actor.getFiveIntelligenceLevels();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getFiveIntelligenceLevels();
      return result;
    }
  }
  async getFluxState() {
    if (this.processError) {
      try {
        const result = await this.actor.getFluxState();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getFluxState();
      return result;
    }
  }
  async getForgeLabsState() {
    if (this.processError) {
      try {
        const result = await this.actor.getForgeLabsState();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getForgeLabsState();
      return result;
    }
  }
  async getFrbState() {
    if (this.processError) {
      try {
        const result = await this.actor.getFrbState();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getFrbState();
      return result;
    }
  }
  async getFullOrganismState() {
    if (this.processError) {
      try {
        const result = await this.actor.getFullOrganismState();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getFullOrganismState();
      return result;
    }
  }
  async getGenesisAnchor() {
    if (this.processError) {
      try {
        const result = await this.actor.getGenesisAnchor();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getGenesisAnchor();
      return result;
    }
  }
  async getGenesisHistory() {
    if (this.processError) {
      try {
        const result = await this.actor.getGenesisHistory();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getGenesisHistory();
      return result;
    }
  }
  async getGeometryState() {
    if (this.processError) {
      try {
        const result = await this.actor.getGeometryState();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getGeometryState();
      return result;
    }
  }
  async getHebbianState() {
    if (this.processError) {
      try {
        const result = await this.actor.getHebbianState();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getHebbianState();
      return result;
    }
  }
  async getHistory(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.getHistory(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getHistory(arg0);
      return result;
    }
  }
  async getHzPhaseNodes() {
    if (this.processError) {
      try {
        const result = await this.actor.getHzPhaseNodes();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getHzPhaseNodes();
      return result;
    }
  }
  async getIdentityState() {
    if (this.processError) {
      try {
        const result = await this.actor.getIdentityState();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getIdentityState();
      return result;
    }
  }
  async getInventionEntries() {
    if (this.processError) {
      try {
        const result = await this.actor.getInventionEntries();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getInventionEntries();
      return result;
    }
  }
  async getJasminesLaw() {
    if (this.processError) {
      try {
        const result = await this.actor.getJasminesLaw();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getJasminesLaw();
      return result;
    }
  }
  async getKnowledgeDomainState() {
    if (this.processError) {
      try {
        const result = await this.actor.getKnowledgeDomainState();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getKnowledgeDomainState();
      return result;
    }
  }
  async getLabDoctorLogs(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.getLabDoctorLogs(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getLabDoctorLogs(arg0);
      return result;
    }
  }
  async getLabGuardianStatus() {
    if (this.processError) {
      try {
        const result = await this.actor.getLabGuardianStatus();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getLabGuardianStatus();
      return result;
    }
  }
  async getLabState() {
    if (this.processError) {
      try {
        const result = await this.actor.getLabState();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getLabState();
      return result;
    }
  }
  async getLawGateResults() {
    if (this.processError) {
      try {
        const result = await this.actor.getLawGateResults();
        return from_candid_opt_n26(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getLawGateResults();
      return from_candid_opt_n26(this._uploadFile, this._downloadFile, result);
    }
  }
  async getLawRegistry() {
    if (this.processError) {
      try {
        const result = await this.actor.getLawRegistry();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getLawRegistry();
      return result;
    }
  }
  async getLawScores() {
    if (this.processError) {
      try {
        const result = await this.actor.getLawScores();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getLawScores();
      return result;
    }
  }
  async getLifeState() {
    if (this.processError) {
      try {
        const result = await this.actor.getLifeState();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getLifeState();
      return result;
    }
  }
  async getLivingArchitectureState() {
    if (this.processError) {
      try {
        const result = await this.actor.getLivingArchitectureState();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getLivingArchitectureState();
      return result;
    }
  }
  async getLlmEndpoint() {
    if (this.processError) {
      try {
        const result = await this.actor.getLlmEndpoint();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getLlmEndpoint();
      return result;
    }
  }
  async getLumenCouncilState() {
    if (this.processError) {
      try {
        const result = await this.actor.getLumenCouncilState();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getLumenCouncilState();
      return result;
    }
  }
  async getMarketState() {
    if (this.processError) {
      try {
        const result = await this.actor.getMarketState();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getMarketState();
      return result;
    }
  }
  async getMaturityVector() {
    if (this.processError) {
      try {
        const result = await this.actor.getMaturityVector();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getMaturityVector();
      return result;
    }
  }
  async getMemoryState() {
    if (this.processError) {
      try {
        const result = await this.actor.getMemoryState();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getMemoryState();
      return result;
    }
  }
  async getMeridianState() {
    if (this.processError) {
      try {
        const result = await this.actor.getMeridianState();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getMeridianState();
      return result;
    }
  }
  async getModuleLogs(arg0, arg1) {
    if (this.processError) {
      try {
        const result = await this.actor.getModuleLogs(arg0, arg1);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getModuleLogs(arg0, arg1);
      return result;
    }
  }
  async getModuleStatus() {
    if (this.processError) {
      try {
        const result = await this.actor.getModuleStatus();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getModuleStatus();
      return result;
    }
  }
  async getMrcState() {
    if (this.processError) {
      try {
        const result = await this.actor.getMrcState();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getMrcState();
      return result;
    }
  }
  async getNOVAState() {
    if (this.processError) {
      try {
        const result = await this.actor.getNOVAState();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getNOVAState();
      return result;
    }
  }
  async getNeurochemState() {
    if (this.processError) {
      try {
        const result = await this.actor.getNeurochemState();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getNeurochemState();
      return result;
    }
  }
  async getNeuronActivationMap() {
    if (this.processError) {
      try {
        const result = await this.actor.getNeuronActivationMap();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getNeuronActivationMap();
      return result;
    }
  }
  async getNovaRegistry() {
    if (this.processError) {
      try {
        const result = await this.actor.getNovaRegistry();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getNovaRegistry();
      return result;
    }
  }
  async getNovaRootState() {
    if (this.processError) {
      try {
        const result = await this.actor.getNovaRootState();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getNovaRootState();
      return result;
    }
  }
  async getOctoState() {
    if (this.processError) {
      try {
        const result = await this.actor.getOctoState();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getOctoState();
      return result;
    }
  }
  async getPARALLAXState() {
    if (this.processError) {
      try {
        const result = await this.actor.getPARALLAXState();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getPARALLAXState();
      return result;
    }
  }
  async getPILState() {
    if (this.processError) {
      try {
        const result = await this.actor.getPILState();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getPILState();
      return result;
    }
  }
  async getPaper(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.getPaper(arg0);
        return from_candid_opt_n27(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getPaper(arg0);
      return from_candid_opt_n27(this._uploadFile, this._downloadFile, result);
    }
  }
  async getPass10State() {
    if (this.processError) {
      try {
        const result = await this.actor.getPass10State();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getPass10State();
      return result;
    }
  }
  async getPass14State() {
    if (this.processError) {
      try {
        const result = await this.actor.getPass14State();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getPass14State();
      return result;
    }
  }
  async getPass8AState() {
    if (this.processError) {
      try {
        const result = await this.actor.getPass8AState();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getPass8AState();
      return result;
    }
  }
  async getPass8CState() {
    if (this.processError) {
      try {
        const result = await this.actor.getPass8CState();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getPass8CState();
      return result;
    }
  }
  async getPass8State() {
    if (this.processError) {
      try {
        const result = await this.actor.getPass8State();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getPass8State();
      return result;
    }
  }
  async getPass9State() {
    if (this.processError) {
      try {
        const result = await this.actor.getPass9State();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getPass9State();
      return result;
    }
  }
  async getPatentRecords() {
    if (this.processError) {
      try {
        const result = await this.actor.getPatentRecords();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getPatentRecords();
      return result;
    }
  }
  async getPersonalitySeed() {
    if (this.processError) {
      try {
        const result = await this.actor.getPersonalitySeed();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getPersonalitySeed();
      return result;
    }
  }
  async getPhantomState() {
    if (this.processError) {
      try {
        const result = await this.actor.getPhantomState();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getPhantomState();
      return result;
    }
  }
  async getPhasePlan() {
    if (this.processError) {
      try {
        const result = await this.actor.getPhasePlan();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getPhasePlan();
      return result;
    }
  }
  async getPhases() {
    if (this.processError) {
      try {
        const result = await this.actor.getPhases();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getPhases();
      return result;
    }
  }
  async getPulseState() {
    if (this.processError) {
      try {
        const result = await this.actor.getPulseState();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getPulseState();
      return result;
    }
  }
  async getQmemState() {
    if (this.processError) {
      try {
        const result = await this.actor.getQmemState();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getQmemState();
      return result;
    }
  }
  async getQuantumParallelStandards() {
    if (this.processError) {
      try {
        const result = await this.actor.getQuantumParallelStandards();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getQuantumParallelStandards();
      return result;
    }
  }
  async getResonexState() {
    if (this.processError) {
      try {
        const result = await this.actor.getResonexState();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getResonexState();
      return result;
    }
  }
  async getRuntimeState(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.getRuntimeState(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getRuntimeState(arg0);
      return result;
    }
  }
  async getSDKNodeRegistry() {
    if (this.processError) {
      try {
        const result = await this.actor.getSDKNodeRegistry();
        return from_candid_vec_n18(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getSDKNodeRegistry();
      return from_candid_vec_n18(this._uploadFile, this._downloadFile, result);
    }
  }
  async getSDKProtocols() {
    if (this.processError) {
      try {
        const result = await this.actor.getSDKProtocols();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getSDKProtocols();
      return result;
    }
  }
  async getSecurityState() {
    if (this.processError) {
      try {
        const result = await this.actor.getSecurityState();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getSecurityState();
      return result;
    }
  }
  async getSessionMemory(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.getSessionMemory(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getSessionMemory(arg0);
      return result;
    }
  }
  async getSharkState() {
    if (this.processError) {
      try {
        const result = await this.actor.getSharkState();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getSharkState();
      return result;
    }
  }
  async getShell10State() {
    if (this.processError) {
      try {
        const result = await this.actor.getShell10State();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getShell10State();
      return result;
    }
  }
  async getShell11State() {
    if (this.processError) {
      try {
        const result = await this.actor.getShell11State();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getShell11State();
      return result;
    }
  }
  async getShell3State() {
    if (this.processError) {
      try {
        const result = await this.actor.getShell3State();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getShell3State();
      return result;
    }
  }
  async getShell7State() {
    if (this.processError) {
      try {
        const result = await this.actor.getShell7State();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getShell7State();
      return result;
    }
  }
  async getShell9State() {
    if (this.processError) {
      try {
        const result = await this.actor.getShell9State();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getShell9State();
      return result;
    }
  }
  async getSnapshot() {
    if (this.processError) {
      try {
        const result = await this.actor.getSnapshot();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getSnapshot();
      return result;
    }
  }
  async getSolarHeart() {
    if (this.processError) {
      try {
        const result = await this.actor.getSolarHeart();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getSolarHeart();
      return result;
    }
  }
  async getSoulState() {
    if (this.processError) {
      try {
        const result = await this.actor.getSoulState();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getSoulState();
      return result;
    }
  }
  async getSparseGatingState() {
    if (this.processError) {
      try {
        const result = await this.actor.getSparseGatingState();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getSparseGatingState();
      return result;
    }
  }
  async getSpeciesRegistry() {
    if (this.processError) {
      try {
        const result = await this.actor.getSpeciesRegistry();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getSpeciesRegistry();
      return result;
    }
  }
  async getStdpState() {
    if (this.processError) {
      try {
        const result = await this.actor.getStdpState();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getStdpState();
      return result;
    }
  }
  async getSynthesisHistory(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.getSynthesisHistory(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getSynthesisHistory(arg0);
      return result;
    }
  }
  async getSynthesisReport() {
    if (this.processError) {
      try {
        const result = await this.actor.getSynthesisReport();
        return from_candid_opt_n28(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getSynthesisReport();
      return from_candid_opt_n28(this._uploadFile, this._downloadFile, result);
    }
  }
  async getTelemetrySnapshot(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.getTelemetrySnapshot(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getTelemetrySnapshot(arg0);
      return result;
    }
  }
  async getTensionObjects() {
    if (this.processError) {
      try {
        const result = await this.actor.getTensionObjects();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getTensionObjects();
      return result;
    }
  }
  async getThoughtStream(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.getThoughtStream(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getThoughtStream(arg0);
      return result;
    }
  }
  async getTreasuryState() {
    if (this.processError) {
      try {
        const result = await this.actor.getTreasuryState();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getTreasuryState();
      return result;
    }
  }
  async getVaultEntries() {
    if (this.processError) {
      try {
        const result = await this.actor.getVaultEntries();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getVaultEntries();
      return result;
    }
  }
  async getVaultEntry(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.getVaultEntry(arg0);
        return from_candid_opt_n29(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getVaultEntry(arg0);
      return from_candid_opt_n29(this._uploadFile, this._downloadFile, result);
    }
  }
  async getVectorConvergenceState() {
    if (this.processError) {
      try {
        const result = await this.actor.getVectorConvergenceState();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getVectorConvergenceState();
      return result;
    }
  }
  async getVectorVetoState() {
    if (this.processError) {
      try {
        const result = await this.actor.getVectorVetoState();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getVectorVetoState();
      return result;
    }
  }
  async getVoiceKernelState() {
    if (this.processError) {
      try {
        const result = await this.actor.getVoiceKernelState();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getVoiceKernelState();
      return result;
    }
  }
  async getWolfState() {
    if (this.processError) {
      try {
        const result = await this.actor.getWolfState();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getWolfState();
      return result;
    }
  }
  async httpTransform(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.httpTransform(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.httpTransform(arg0);
      return result;
    }
  }
  async initMedina() {
    if (this.processError) {
      try {
        const result = await this.actor.initMedina();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.initMedina();
      return result;
    }
  }
  async injectHighThreatAgent() {
    if (this.processError) {
      try {
        const result = await this.actor.injectHighThreatAgent();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.injectHighThreatAgent();
      return result;
    }
  }
  async listPapers() {
    if (this.processError) {
      try {
        const result = await this.actor.listPapers();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.listPapers();
      return result;
    }
  }
  async mintTokens(arg0, arg1) {
    if (this.processError) {
      try {
        const result = await this.actor.mintTokens(arg0, arg1);
        return from_candid_record_n30(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.mintTokens(arg0, arg1);
      return from_candid_record_n30(this._uploadFile, this._downloadFile, result);
    }
  }
  async pauseEntitySession(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.pauseEntitySession(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.pauseEntitySession(arg0);
      return result;
    }
  }
  async processVoiceInput(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.processVoiceInput(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.processVoiceInput(arg0);
      return result;
    }
  }
  async recordLegacyArtifact(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.recordLegacyArtifact(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.recordLegacyArtifact(arg0);
      return result;
    }
  }
  async resumeEntitySession(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.resumeEntitySession(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.resumeEntitySession(arg0);
      return result;
    }
  }
  async routeSignalViaEntangla(arg0, arg1) {
    if (this.processError) {
      try {
        const result = await this.actor.routeSignalViaEntangla(arg0, arg1);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.routeSignalViaEntangla(arg0, arg1);
      return result;
    }
  }
  async runProtocol(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.runProtocol(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.runProtocol(arg0);
      return result;
    }
  }
  async runValidationTest(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.runValidationTest(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.runValidationTest(arg0);
      return result;
    }
  }
  async searchKnowledge(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.searchKnowledge(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.searchKnowledge(arg0);
      return result;
    }
  }
  async sendEnvironmentEvent(arg0, arg1) {
    if (this.processError) {
      try {
        const result = await this.actor.sendEnvironmentEvent(arg0, arg1);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.sendEnvironmentEvent(arg0, arg1);
      return result;
    }
  }
  async sendSimulationEvent(arg0, arg1) {
    if (this.processError) {
      try {
        const result = await this.actor.sendSimulationEvent(arg0, arg1);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.sendSimulationEvent(arg0, arg1);
      return result;
    }
  }
  async setLlmEndpoint(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.setLlmEndpoint(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.setLlmEndpoint(arg0);
      return result;
    }
  }
  async speakFromField(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.speakFromField(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.speakFromField(arg0);
      return result;
    }
  }
  async speakToField(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.speakToField(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.speakToField(arg0);
      return result;
    }
  }
  async terminateEngine(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.terminateEngine(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.terminateEngine(arg0);
      return result;
    }
  }
  async terminateEntitySession(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.terminateEntitySession(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.terminateEntitySession(arg0);
      return result;
    }
  }
  async translateSandbox(arg0, arg1, arg2) {
    if (this.processError) {
      try {
        const result = await this.actor.translateSandbox(arg0, arg1, arg2);
        return from_candid_record_n33(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.translateSandbox(arg0, arg1, arg2);
      return from_candid_record_n33(this._uploadFile, this._downloadFile, result);
    }
  }
  async updateAEGIS(arg0, arg1) {
    if (this.processError) {
      try {
        const result = await this.actor.updateAEGIS(arg0, arg1);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.updateAEGIS(arg0, arg1);
      return result;
    }
  }
  async updateDoctrineRecord(arg0, arg1, arg2, arg3) {
    if (this.processError) {
      try {
        const result = await this.actor.updateDoctrineRecord(arg0, arg1, arg2, arg3);
        return from_candid_opt_n36(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.updateDoctrineRecord(arg0, arg1, arg2, arg3);
      return from_candid_opt_n36(this._uploadFile, this._downloadFile, result);
    }
  }
  async updateEngineHealth(arg0, arg1, arg2) {
    if (this.processError) {
      try {
        const result = await this.actor.updateEngineHealth(arg0, arg1, arg2);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.updateEngineHealth(arg0, arg1, arg2);
      return result;
    }
  }
  async validateKey(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.validateKey(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.validateKey(arg0);
      return result;
    }
  }
  async withdrawMRC(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.withdrawMRC(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.withdrawMRC(arg0);
      return result;
    }
  }
}
function from_candid_AnalysisReport_n7(_uploadFile, _downloadFile, value) {
  return from_candid_record_n8(_uploadFile, _downloadFile, value);
}
function from_candid_FederatedNode_n19(_uploadFile, _downloadFile, value) {
  return from_candid_record_n20(_uploadFile, _downloadFile, value);
}
function from_candid_FederationIndexSnapshot_n16(_uploadFile, _downloadFile, value) {
  return from_candid_record_n17(_uploadFile, _downloadFile, value);
}
function from_candid_FederationTier_n24(_uploadFile, _downloadFile, value) {
  return from_candid_variant_n25(_uploadFile, _downloadFile, value);
}
function from_candid_FindingStatus_n12(_uploadFile, _downloadFile, value) {
  return from_candid_variant_n13(_uploadFile, _downloadFile, value);
}
function from_candid_Finding_n10(_uploadFile, _downloadFile, value) {
  return from_candid_record_n11(_uploadFile, _downloadFile, value);
}
function from_candid_NodeStatus_n21(_uploadFile, _downloadFile, value) {
  return from_candid_variant_n22(_uploadFile, _downloadFile, value);
}
function from_candid_StructureType_n34(_uploadFile, _downloadFile, value) {
  return from_candid_variant_n35(_uploadFile, _downloadFile, value);
}
function from_candid_TokenType_n31(_uploadFile, _downloadFile, value) {
  return from_candid_variant_n32(_uploadFile, _downloadFile, value);
}
function from_candid_opt_n15(_uploadFile, _downloadFile, value) {
  return value.length === 0 ? null : value[0];
}
function from_candid_opt_n23(_uploadFile, _downloadFile, value) {
  return value.length === 0 ? null : value[0];
}
function from_candid_opt_n26(_uploadFile, _downloadFile, value) {
  return value.length === 0 ? null : value[0];
}
function from_candid_opt_n27(_uploadFile, _downloadFile, value) {
  return value.length === 0 ? null : value[0];
}
function from_candid_opt_n28(_uploadFile, _downloadFile, value) {
  return value.length === 0 ? null : value[0];
}
function from_candid_opt_n29(_uploadFile, _downloadFile, value) {
  return value.length === 0 ? null : value[0];
}
function from_candid_opt_n36(_uploadFile, _downloadFile, value) {
  return value.length === 0 ? null : value[0];
}
function from_candid_record_n11(_uploadFile, _downloadFile, value) {
  return {
    status: from_candid_FindingStatus_n12(_uploadFile, _downloadFile, value.status),
    metric: value.metric,
    value: value.value,
    derivation: value.derivation,
    expected_max: value.expected_max,
    expected_min: value.expected_min
  };
}
function from_candid_record_n17(_uploadFile, _downloadFile, value) {
  return {
    tools: value.tools,
    node_count: value.node_count,
    protocols: value.protocols,
    version: value.version,
    nodes: from_candid_vec_n18(_uploadFile, _downloadFile, value.nodes),
    sealed_at: value.sealed_at
  };
}
function from_candid_record_n20(_uploadFile, _downloadFile, value) {
  return {
    status: from_candid_NodeStatus_n21(_uploadFile, _downloadFile, value.status),
    node_id: value.node_id,
    parent_node_id: record_opt_to_undefined(from_candid_opt_n23(_uploadFile, _downloadFile, value.parent_node_id)),
    treaty: value.treaty,
    role: value.role,
    tier: from_candid_FederationTier_n24(_uploadFile, _downloadFile, value.tier),
    common_name: value.common_name,
    frequency_hz: value.frequency_hz,
    cpl_expression: value.cpl_expression,
    specialties: value.specialties,
    role_description: value.role_description,
    rola_identifier: record_opt_to_undefined(from_candid_opt_n23(_uploadFile, _downloadFile, value.rola_identifier)),
    registered_at: value.registered_at,
    n_node_coupling: value.n_node_coupling,
    adoption_proof: value.adoption_proof,
    latin_name: value.latin_name
  };
}
function from_candid_record_n30(_uploadFile, _downloadFile, value) {
  return {
    netAmount: value.netAmount,
    burnedAmount: value.burnedAmount,
    architectActive: value.architectActive,
    alignmentScore: value.alignmentScore,
    tokenType: from_candid_TokenType_n31(_uploadFile, _downloadFile, value.tokenType),
    cappedByMTH: value.cappedByMTH,
    mintedAmount: value.mintedAmount
  };
}
function from_candid_record_n33(_uploadFile, _downloadFile, value) {
  return {
    entityPairs: value.entityPairs,
    hasContradiction: value.hasContradiction,
    alignmentScore: value.alignmentScore,
    doctrineFamily: value.doctrineFamily,
    lawAttributions: value.lawAttributions,
    genesisDistance: value.genesisDistance,
    sourceType: value.sourceType,
    structureConfidence: value.structureConfidence,
    translatedOutput: value.translatedOutput,
    structureType: from_candid_StructureType_n34(_uploadFile, _downloadFile, value.structureType),
    contradictionNote: value.contradictionNote,
    ancientSources: value.ancientSources,
    alignmentAlpha1: value.alignmentAlpha1,
    alignmentAlpha2: value.alignmentAlpha2
  };
}
function from_candid_record_n8(_uploadFile, _downloadFile, value) {
  return {
    recommendations: value.recommendations,
    narrative: value.narrative,
    timestamp: value.timestamp,
    findings: from_candid_vec_n9(_uploadFile, _downloadFile, value.findings),
    heartbeatPhase: value.heartbeatPhase
  };
}
function from_candid_variant_n13(_uploadFile, _downloadFile, value) {
  return "ok" in value ? "ok" : "drift" in value ? "drift" : "anomaly" in value ? "anomaly" : value;
}
function from_candid_variant_n22(_uploadFile, _downloadFile, value) {
  return "DORMANT" in value ? "DORMANT" : "PROPAGATING" in value ? "PROPAGATING" : "ACTIVE" in value ? "ACTIVE" : value;
}
function from_candid_variant_n25(_uploadFile, _downloadFile, value) {
  return "FEDERATED" in value ? "FEDERATED" : "ALIGNED" in value ? "ALIGNED" : "NATIVE" in value ? "NATIVE" : value;
}
function from_candid_variant_n32(_uploadFile, _downloadFile, value) {
  return "CVT" in value ? "CVT" : "KNT" in value ? "KNT" : "MRC" in value ? "MRC" : "MTH" in value ? "MTH" : "SBT" in value ? "SBT" : "VCT" in value ? "VCT" : "FORMA" in value ? "FORMA" : value;
}
function from_candid_variant_n35(_uploadFile, _downloadFile, value) {
  return "law" in value ? "law" : "contradiction" in value ? "contradiction" : "resonance" in value ? "resonance" : "temporal" in value ? "temporal" : "relational" in value ? "relational" : "ratio" in value ? "ratio" : value;
}
function from_candid_vec_n14(_uploadFile, _downloadFile, value) {
  return value.map((x) => from_candid_AnalysisReport_n7(_uploadFile, _downloadFile, x));
}
function from_candid_vec_n18(_uploadFile, _downloadFile, value) {
  return value.map((x) => from_candid_FederatedNode_n19(_uploadFile, _downloadFile, x));
}
function from_candid_vec_n9(_uploadFile, _downloadFile, value) {
  return value.map((x) => from_candid_Finding_n10(_uploadFile, _downloadFile, x));
}
function to_candid_FederatedNode_n1(_uploadFile, _downloadFile, value) {
  return to_candid_record_n2(_uploadFile, _downloadFile, value);
}
function to_candid_FederationTier_n5(_uploadFile, _downloadFile, value) {
  return to_candid_variant_n6(_uploadFile, _downloadFile, value);
}
function to_candid_NodeStatus_n3(_uploadFile, _downloadFile, value) {
  return to_candid_variant_n4(_uploadFile, _downloadFile, value);
}
function to_candid_record_n2(_uploadFile, _downloadFile, value) {
  return {
    status: to_candid_NodeStatus_n3(_uploadFile, _downloadFile, value.status),
    node_id: value.node_id,
    parent_node_id: value.parent_node_id ? candid_some(value.parent_node_id) : candid_none(),
    treaty: value.treaty,
    role: value.role,
    tier: to_candid_FederationTier_n5(_uploadFile, _downloadFile, value.tier),
    common_name: value.common_name,
    frequency_hz: value.frequency_hz,
    cpl_expression: value.cpl_expression,
    specialties: value.specialties,
    role_description: value.role_description,
    rola_identifier: value.rola_identifier ? candid_some(value.rola_identifier) : candid_none(),
    registered_at: value.registered_at,
    n_node_coupling: value.n_node_coupling,
    adoption_proof: value.adoption_proof,
    latin_name: value.latin_name
  };
}
function to_candid_variant_n4(_uploadFile, _downloadFile, value) {
  return value == "DORMANT" ? {
    DORMANT: null
  } : value == "PROPAGATING" ? {
    PROPAGATING: null
  } : value == "ACTIVE" ? {
    ACTIVE: null
  } : value;
}
function to_candid_variant_n6(_uploadFile, _downloadFile, value) {
  return value == "FEDERATED" ? {
    FEDERATED: null
  } : value == "ALIGNED" ? {
    ALIGNED: null
  } : value == "NATIVE" ? {
    NATIVE: null
  } : value;
}
function createActor(canisterId, _uploadFile, _downloadFile, options = {}) {
  const agent = options.agent || HttpAgent.createSync({
    ...options.agentOptions
  });
  if (options.agent && options.agentOptions) {
    console.warn("Detected both agent and agentOptions passed to createActor. Ignoring agentOptions and proceeding with the provided agent.");
  }
  const actor = Actor.createActor(idlFactory, {
    agent,
    canisterId,
    ...options.actorOptions
  });
  return new Backend(actor, _uploadFile, _downloadFile, options.processError);
}
const NOT_CONFIGURED = {
  actor: null,
  loading: false,
  error: "Backend not configured",
  isFetching: false
};
function useActor() {
  useActor$1(createActor);
  {
    return NOT_CONFIGURED;
  }
}
export {
  FindingStatus as F,
  useQuery as a,
  useActor as u
};
