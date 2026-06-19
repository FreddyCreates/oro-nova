/**
 * useActor — singleton actor wrapper for ORO NOVA backend calls.
 * Pre-binds createActor so all surfaces use the same ICP actor instance.
 *
 * Returns { actor, loading, error }
 *   actor     — backendInterface | null (null while initializing)
 *   loading   — true during actor creation / identity resolution
 *   isFetching — legacy alias for loading, used by existing poll callers
 *   error     — string | null (not surfaced by platform hook, always null)
 */
import { useActor as _useActor } from "@caffeineai/core-infrastructure";
import { createActor } from "../backend";
import type { backendInterface } from "../backend";

export interface UseActorResult {
  actor: backendInterface | null;
  loading: boolean;
  error: string | null;
  /** Legacy alias — same as loading. Used by existing poll hooks and surfaces. */
  isFetching: boolean;
}

const BACKEND_CONFIGURED = !!import.meta.env.CANISTER_ID_BACKEND;

const NOT_CONFIGURED: UseActorResult = {
  actor: null,
  loading: false,
  error: "Backend not configured",
  isFetching: false,
};

export function useActor(): UseActorResult {
  const raw = _useActor(createActor) as {
    actor: backendInterface | null;
    isFetching: boolean;
  };

  // When no canister ID is configured, return null actor immediately
  // without attempting ICP construction — prevents polling errors.
  if (!BACKEND_CONFIGURED) {
    return NOT_CONFIGURED;
  }

  return {
    actor: raw.actor,
    loading: raw.isFetching,
    error: null,
    isFetching: raw.isFetching,
  };
}
