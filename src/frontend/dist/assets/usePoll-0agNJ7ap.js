import { r as reactExports } from "./index-DQuwpKqn.js";
function usePoll(queryFn, intervalMs, deps = []) {
  const [data, setData] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(true);
  const [error, setError] = reactExports.useState(null);
  const fnRef = reactExports.useRef(queryFn);
  fnRef.current = queryFn;
  const intervalRef = reactExports.useRef(intervalMs);
  intervalRef.current = intervalMs;
  const aliveRef = reactExports.useRef(false);
  const triggerRef = reactExports.useRef(() => {
  });
  reactExports.useEffect(() => {
    aliveRef.current = true;
    setLoading(true);
    let timer = null;
    const run = async () => {
      if (!aliveRef.current) return;
      try {
        const result = await fnRef.current();
        if (aliveRef.current) {
          const resolved = result === void 0 ? null : result;
          setData(resolved);
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
    run();
    return () => {
      aliveRef.current = false;
      if (timer !== null) {
        clearTimeout(timer);
        timer = null;
      }
    };
  }, [
    /* intervalMs via ref */
    ...deps
  ]);
  return {
    data,
    loading,
    error,
    refetch: () => triggerRef.current()
  };
}
export {
  usePoll as u
};
