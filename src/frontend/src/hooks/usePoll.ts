/**
 * usePoll — Kernel-compressed polling hook with data/loading/error state.
 * Kernel Compression Protocol v1 — Mix→Bound→Integrate→Gate→Project→Reinject.
 *
 * Returns { data, loading, error, refetch } so surfaces can render reactively.
 * Uses recursive setTimeout — each tick waits for the previous async call to
 * complete before scheduling the next, preventing pile-up under slow canisters.
 *
 * intervalMs should always be a phi-derived constant from phi.ts.
 * Standard: PHI_SECOND_MS = 1618ms (Φ × 1000ms)
 */
import { useEffect, useRef, useState } from "react";

export interface PollResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function usePoll<T>(
  queryFn: () => Promise<T | null | undefined>,
  intervalMs: number,
  deps: unknown[] = [],
): PollResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Stable refs — changing these doesn't restart the poll chain
  const fnRef = useRef(queryFn);
  fnRef.current = queryFn;

  const intervalRef = useRef(intervalMs);
  intervalRef.current = intervalMs;

  // Signal ref — set to false on unmount or dep change to stop chain
  const aliveRef = useRef(false);

  // Expose imperative refetch via ref so the returned function is stable
  const triggerRef = useRef<() => void>(() => {});

  useEffect(() => {
    aliveRef.current = true;
    setLoading(true);

    let timer: ReturnType<typeof setTimeout> | null = null;

    const run = async () => {
      if (!aliveRef.current) return;
      try {
        const result = await fnRef.current();
        if (aliveRef.current) {
          // Treat undefined returns (e.g. `if (!actor) return;`) as null —
          // keeps data=null and loading=false instead of storing undefined.
          const resolved = result === undefined ? null : result;
          setData(resolved as T | null);
          setError(null);
          setLoading(false);
        }
      } catch (err) {
        if (aliveRef.current) {
          setError(err instanceof Error ? err.message : String(err));
          setLoading(false);
        }
      }
      if (aliveRef.current) {
        timer = setTimeout(run, intervalRef.current);
      }
    };

    triggerRef.current = () => {
      if (timer !== null) {
        clearTimeout(timer);
        timer = null;
      }
      setLoading(true);
      run();
    };

    // Immediate first fetch
    run();

    return () => {
      aliveRef.current = false;
      if (timer !== null) {
        clearTimeout(timer);
        timer = null;
      }
    };
    // intervalMs is captured via intervalRef.current — listed here so dep changes restart
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [/* intervalMs via ref */ ...deps]);

  return {
    data,
    loading,
    error,
    refetch: () => triggerRef.current(),
  };
}
