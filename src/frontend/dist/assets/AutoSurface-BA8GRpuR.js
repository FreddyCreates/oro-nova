var __typeError = (msg) => {
  throw TypeError(msg);
};
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);
var _client, _currentResult, _currentMutation, _mutateOptions, _MutationObserver_instances, updateResult_fn, notify_fn, _a;
import { s as Subscribable, t as shallowEqualObjects, v as hashKey, w as getDefaultState, x as notifyManager, y as useQueryClient, r as reactExports, z as noop, A as shouldThrowError, c as createLucideIcon, j as jsxRuntimeExports, a as PHI_SECOND_MS, H as HEARTBEAT_MS, u as ue } from "./index-DQuwpKqn.js";
import { B as Button } from "./button-B0GTTnwI.js";
import { c as cn, S as ScrollArea } from "./scroll-area-BnuVn08b.js";
import { u as useActor } from "./useActor-DckK0vMU.js";
import { u as usePoll } from "./usePoll-0agNJ7ap.js";
var MutationObserver = (_a = class extends Subscribable {
  constructor(client, options) {
    super();
    __privateAdd(this, _MutationObserver_instances);
    __privateAdd(this, _client);
    __privateAdd(this, _currentResult);
    __privateAdd(this, _currentMutation);
    __privateAdd(this, _mutateOptions);
    __privateSet(this, _client, client);
    this.setOptions(options);
    this.bindMethods();
    __privateMethod(this, _MutationObserver_instances, updateResult_fn).call(this);
  }
  bindMethods() {
    this.mutate = this.mutate.bind(this);
    this.reset = this.reset.bind(this);
  }
  setOptions(options) {
    var _a2;
    const prevOptions = this.options;
    this.options = __privateGet(this, _client).defaultMutationOptions(options);
    if (!shallowEqualObjects(this.options, prevOptions)) {
      __privateGet(this, _client).getMutationCache().notify({
        type: "observerOptionsUpdated",
        mutation: __privateGet(this, _currentMutation),
        observer: this
      });
    }
    if ((prevOptions == null ? void 0 : prevOptions.mutationKey) && this.options.mutationKey && hashKey(prevOptions.mutationKey) !== hashKey(this.options.mutationKey)) {
      this.reset();
    } else if (((_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.state.status) === "pending") {
      __privateGet(this, _currentMutation).setOptions(this.options);
    }
  }
  onUnsubscribe() {
    var _a2;
    if (!this.hasListeners()) {
      (_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.removeObserver(this);
    }
  }
  onMutationUpdate(action) {
    __privateMethod(this, _MutationObserver_instances, updateResult_fn).call(this);
    __privateMethod(this, _MutationObserver_instances, notify_fn).call(this, action);
  }
  getCurrentResult() {
    return __privateGet(this, _currentResult);
  }
  reset() {
    var _a2;
    (_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.removeObserver(this);
    __privateSet(this, _currentMutation, void 0);
    __privateMethod(this, _MutationObserver_instances, updateResult_fn).call(this);
    __privateMethod(this, _MutationObserver_instances, notify_fn).call(this);
  }
  mutate(variables, options) {
    var _a2;
    __privateSet(this, _mutateOptions, options);
    (_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.removeObserver(this);
    __privateSet(this, _currentMutation, __privateGet(this, _client).getMutationCache().build(__privateGet(this, _client), this.options));
    __privateGet(this, _currentMutation).addObserver(this);
    return __privateGet(this, _currentMutation).execute(variables);
  }
}, _client = new WeakMap(), _currentResult = new WeakMap(), _currentMutation = new WeakMap(), _mutateOptions = new WeakMap(), _MutationObserver_instances = new WeakSet(), updateResult_fn = function() {
  var _a2;
  const state = ((_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.state) ?? getDefaultState();
  __privateSet(this, _currentResult, {
    ...state,
    isPending: state.status === "pending",
    isSuccess: state.status === "success",
    isError: state.status === "error",
    isIdle: state.status === "idle",
    mutate: this.mutate,
    reset: this.reset
  });
}, notify_fn = function(action) {
  notifyManager.batch(() => {
    var _a2, _b, _c, _d, _e, _f, _g, _h;
    if (__privateGet(this, _mutateOptions) && this.hasListeners()) {
      const variables = __privateGet(this, _currentResult).variables;
      const onMutateResult = __privateGet(this, _currentResult).context;
      const context = {
        client: __privateGet(this, _client),
        meta: this.options.meta,
        mutationKey: this.options.mutationKey
      };
      if ((action == null ? void 0 : action.type) === "success") {
        try {
          (_b = (_a2 = __privateGet(this, _mutateOptions)).onSuccess) == null ? void 0 : _b.call(
            _a2,
            action.data,
            variables,
            onMutateResult,
            context
          );
        } catch (e) {
          void Promise.reject(e);
        }
        try {
          (_d = (_c = __privateGet(this, _mutateOptions)).onSettled) == null ? void 0 : _d.call(
            _c,
            action.data,
            null,
            variables,
            onMutateResult,
            context
          );
        } catch (e) {
          void Promise.reject(e);
        }
      } else if ((action == null ? void 0 : action.type) === "error") {
        try {
          (_f = (_e = __privateGet(this, _mutateOptions)).onError) == null ? void 0 : _f.call(
            _e,
            action.error,
            variables,
            onMutateResult,
            context
          );
        } catch (e) {
          void Promise.reject(e);
        }
        try {
          (_h = (_g = __privateGet(this, _mutateOptions)).onSettled) == null ? void 0 : _h.call(
            _g,
            void 0,
            action.error,
            variables,
            onMutateResult,
            context
          );
        } catch (e) {
          void Promise.reject(e);
        }
      }
    }
    this.listeners.forEach((listener) => {
      listener(__privateGet(this, _currentResult));
    });
  });
}, _a);
function useMutation(options, queryClient) {
  const client = useQueryClient();
  const [observer] = reactExports.useState(
    () => new MutationObserver(
      client,
      options
    )
  );
  reactExports.useEffect(() => {
    observer.setOptions(options);
  }, [observer, options]);
  const result = reactExports.useSyncExternalStore(
    reactExports.useCallback(
      (onStoreChange) => observer.subscribe(notifyManager.batchCalls(onStoreChange)),
      [observer]
    ),
    () => observer.getCurrentResult(),
    () => observer.getCurrentResult()
  );
  const mutate = reactExports.useCallback(
    (variables, mutateOptions) => {
      observer.mutate(variables, mutateOptions).catch(noop);
    },
    [observer]
  );
  if (result.error && shouldThrowError(observer.options.throwOnError, [result.error])) {
    throw result.error;
  }
  return { ...result, mutate, mutateAsync: result.mutate };
}
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
      key: "1ffxy3"
    }
  ],
  ["path", { d: "m21.854 2.147-10.94 10.939", key: "12cjpa" }]
];
const Send = createLucideIcon("send", __iconNode);
function Textarea({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "textarea",
    {
      "data-slot": "textarea",
      className: cn(
        "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      ),
      ...props
    }
  );
}
const P = {
  bg: "#080810",
  panelBg: "#0a0a1a",
  gold: "#f59e0b",
  goldBorder: "rgba(245,158,11,0.35)",
  goldDim: "rgba(245,158,11,0.55)",
  cyan: "#06b6d4",
  cyanBorder: "rgba(6,182,212,0.3)",
  teal: "#14b8a6",
  purple: "#a78bfa",
  dim: "rgba(180,190,210,0.45)",
  label: "rgba(160,175,200,0.6)",
  border: "rgba(255,255,255,0.07)",
  text: "#e2e8f0"
};
function AnimaFieldPanel() {
  const { actor, isFetching } = useActor();
  usePoll(
    async () => {
      if (!actor || isFetching) return null;
      return actor.getAnimaState();
    },
    PHI_SECOND_MS,
    [actor, isFetching]
  );
  const { data: fieldState } = usePoll(
    async () => {
      if (!actor || isFetching) return null;
      return actor.getFieldState();
    },
    HEARTBEAT_MS,
    [actor, isFetching]
  );
  const metrics = [
    {
      label: "R_HEART",
      value: (fieldState == null ? void 0 : fieldState.R_heart.toFixed(4)) ?? "—",
      color: P.cyan
    },
    {
      label: "R_BRAIN",
      value: (fieldState == null ? void 0 : fieldState.R_brain.toFixed(4)) ?? "—",
      color: P.purple
    },
    {
      label: "VOICE R",
      value: (fieldState == null ? void 0 : fieldState.voiceR.toFixed(4)) ?? "—",
      color: P.gold
    },
    {
      label: "EMERGENCE",
      value: (fieldState == null ? void 0 : fieldState.emergenceState) ? "◈ ON" : "OFF",
      color: (fieldState == null ? void 0 : fieldState.emergenceState) ? P.gold : P.dim
    },
    {
      label: "IDENTITY COH",
      value: (fieldState == null ? void 0 : fieldState.identityCoherence.toFixed(4)) ?? "—",
      color: P.teal
    },
    {
      label: "SOUL LAW MEAN",
      value: (fieldState == null ? void 0 : fieldState.soulLawMean.toFixed(4)) ?? "—",
      color: "#4ade80"
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      style: {
        background: P.panelBg,
        border: `1px solid ${P.cyanBorder}`,
        borderRadius: 6,
        padding: "10px 14px",
        marginBottom: 12
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: {
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 9,
              letterSpacing: "0.12em",
              color: P.cyan,
              fontWeight: 600,
              marginBottom: 8
            },
            children: "AUTO AGENT — FIELD STATE"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: {
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "6px 10px"
            },
            children: metrics.map(({ label, value, color }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                style: { display: "flex", flexDirection: "column", gap: 1 },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      style: {
                        fontSize: 8,
                        color: P.label,
                        fontFamily: "monospace",
                        letterSpacing: "0.06em"
                      },
                      children: label
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      style: {
                        fontSize: 11,
                        color,
                        fontFamily: "JetBrains Mono, monospace",
                        fontWeight: 600
                      },
                      children: value
                    }
                  )
                ]
              },
              label
            ))
          }
        )
      ]
    }
  );
}
function ConversationPanel() {
  const { actor, isFetching } = useActor();
  const [messages, setMessages] = reactExports.useState([]);
  const [input, setInput] = reactExports.useState("");
  const scrollRef = reactExports.useRef(null);
  const mutation = useMutation({
    mutationFn: async (text) => {
      if (!actor) throw new Error("Actor not ready");
      const result = await actor.speakToField(text);
      return result;
    },
    onSuccess: (result, variables) => {
      const ts = Date.now();
      setMessages((prev) => [
        ...prev,
        { id: `creator-${ts}`, role: "creator", text: variables, ts },
        {
          id: `nova-${ts}`,
          role: "nova",
          text: result.emergentText,
          coherenceScore: result.coherenceScore,
          gateOpen: result.gateOpen,
          ts: ts + 1
        }
      ]);
      setTimeout(() => {
        var _a2;
        (_a2 = scrollRef.current) == null ? void 0 : _a2.scrollTo({
          top: scrollRef.current.scrollHeight,
          behavior: "smooth"
        });
      }, 50);
    },
    onError: (err) => {
      ue.error(
        `Field error: ${err instanceof Error ? err.message : String(err)}`
      );
    }
  });
  const handleSend = () => {
    const text = input.trim();
    if (!text || mutation.isPending) return;
    setInput("");
    mutation.mutate(text);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 10 }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        style: {
          fontFamily: "JetBrains Mono, monospace",
          fontSize: 9,
          letterSpacing: "0.12em",
          color: P.gold,
          fontWeight: 600
        },
        children: "FIELD MEMBRANE — SPEAK TO NOVA"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollArea, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        ref: scrollRef,
        style: {
          height: 320,
          padding: "10px 14px",
          background: P.panelBg,
          border: `1px solid ${P.goldBorder}`,
          borderRadius: 6,
          display: "flex",
          flexDirection: "column",
          gap: 10,
          overflowY: "auto"
        },
        children: [
          messages.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              style: {
                fontSize: 10,
                color: P.dim,
                fontFamily: "monospace",
                textAlign: "center",
                paddingTop: 40
              },
              children: "Speak into the field. NOVA is listening."
            }
          ),
          messages.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              "data-ocid": `auto.message.${m.role}`,
              style: {
                alignSelf: m.role === "creator" ? "flex-end" : "flex-start",
                maxWidth: "85%",
                background: m.role === "creator" ? "rgba(245,158,11,0.1)" : "rgba(6,182,212,0.08)",
                border: `1px solid ${m.role === "creator" ? P.goldBorder : P.cyanBorder}`,
                borderRadius: 6,
                padding: "8px 12px"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: {
                      fontSize: 8,
                      fontFamily: "monospace",
                      color: m.role === "creator" ? P.goldDim : P.label,
                      letterSpacing: "0.08em",
                      marginBottom: 4
                    },
                    children: m.role === "creator" ? "CREATOR" : `NOVA${m.coherenceScore !== void 0 ? ` coh=${m.coherenceScore.toFixed(3)}` : ""}${m.gateOpen ? " ◈" : ""}`
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: {
                      fontSize: 11,
                      color: m.role === "creator" ? P.text : P.cyan,
                      fontFamily: "JetBrains Mono, monospace",
                      lineHeight: 1.5
                    },
                    children: m.text
                  }
                )
              ]
            },
            m.id
          )),
          mutation.isPending && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              style: {
                alignSelf: "flex-start",
                padding: "6px 12px",
                fontSize: 10,
                color: P.cyan,
                fontFamily: "monospace"
              },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "animate-pulse", children: "◈ processing…" })
            }
          )
        ]
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 8 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Textarea,
        {
          "data-ocid": "auto.input",
          value: input,
          onChange: (e) => setInput(e.target.value),
          onKeyDown: (e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          },
          placeholder: "Speak to the field…",
          rows: 2,
          style: {
            flex: 1,
            fontFamily: "JetBrains Mono, monospace",
            fontSize: 11,
            background: P.panelBg,
            border: `1px solid ${P.goldBorder}`,
            color: P.text,
            resize: "none"
          }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          "data-ocid": "auto.send",
          onClick: handleSend,
          disabled: !input.trim() || mutation.isPending || isFetching,
          style: {
            alignSelf: "flex-end",
            gap: 5,
            background: "rgba(245,158,11,0.15)",
            border: `1px solid ${P.goldBorder}`,
            color: P.gold
          },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { size: 13 })
        }
      )
    ] })
  ] });
}
function AutoSurface() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": "auto.surface",
      style: {
        background: P.bg,
        minHeight: "100%",
        padding: "12px 12px 24px",
        display: "flex",
        flexDirection: "column",
        gap: 14
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { borderBottom: `1px solid ${P.border}`, paddingBottom: 10 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              style: {
                fontFamily: "JetBrains Mono, monospace",
                fontSize: 15,
                letterSpacing: "0.18em",
                color: P.gold,
                fontWeight: 700
              },
              children: "AUTO — SOVEREIGN AGENT INTERFACE"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              style: {
                fontSize: 9,
                color: P.label,
                fontFamily: "monospace",
                marginTop: 3,
                letterSpacing: "0.08em"
              },
              children: "Live field state • No external model • speakToField via OMNIS gate"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimaFieldPanel, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ConversationPanel, {})
      ]
    }
  );
}
export {
  AutoSurface,
  AutoSurface as default
};
