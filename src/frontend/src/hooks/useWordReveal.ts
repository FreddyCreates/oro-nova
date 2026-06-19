/**
 * useWordReveal — Φ-paced word-by-word text reveal hook.
 * Kernel Compression Protocol v1 — timing from phi.ts WORD_REVEAL_MS.
 *
 * Each word becomes visible at WORD_REVEAL_MS intervals (= HEARTBEAT_MS × Φ⁻¹ ≈ 540ms).
 * Returns a list of { word, visible } tokens and an `animating` flag.
 */
import { useCallback, useEffect, useRef, useState } from "react";
import { WORD_REVEAL_MS } from "../constants/phi";

export interface WordToken {
  word: string;
  visible: boolean;
}

export interface WordRevealState {
  words: WordToken[];
  animating: boolean;
}

const IDLE: WordRevealState = { words: [], animating: false };

/**
 * @param text       Full text to reveal word by word. Pass empty string to reset.
 * @param intervalMs Override reveal interval (defaults to WORD_REVEAL_MS ≈ 540ms).
 * @returns WordRevealState — update on each word becoming visible.
 */
export function useWordReveal(
  text: string,
  intervalMs = WORD_REVEAL_MS,
): WordRevealState {
  const [state, setState] = useState<WordRevealState>(IDLE);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = useCallback(() => {
    for (const t of timersRef.current) clearTimeout(t);
    timersRef.current = [];
  }, []);

  useEffect(() => {
    clearTimers();
    if (!text) {
      setState(IDLE);
      return;
    }
    const words = text.split(/\s+/).filter(Boolean);
    setState({
      words: words.map((w) => ({ word: w, visible: false })),
      animating: true,
    });
    words.forEach((_, i) => {
      const timer = setTimeout(() => {
        setState((prev) => {
          const updated = prev.words.map((w, wi) =>
            wi === i ? { ...w, visible: true } : w,
          );
          return { words: updated, animating: i !== words.length - 1 };
        });
      }, i * intervalMs);
      timersRef.current.push(timer);
    });
    return clearTimers;
  }, [text, intervalMs, clearTimers]);

  return state;
}
