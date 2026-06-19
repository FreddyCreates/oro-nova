/**
 * useVoice — Browser speech recognition + TTS for AUTO interface.
 * ElevenLabs slot wired, browser fallback active.
 */
import { useCallback, useEffect, useRef, useState } from "react";

const ELEVEN_LABS_API_KEY =
  (import.meta as any).env?.VITE_ELEVEN_LABS_API_KEY || "";

export interface UseVoiceReturn {
  isListening: boolean;
  transcript: string;
  startListening: () => void;
  stopListening: () => void;
  speak: (
    text: string,
    options?: { rate?: number; pitch?: number; volume?: number },
  ) => void;
  stopSpeaking: () => void;
  isSpeaking: boolean;
  voiceSupported: boolean;
  ttsSupported: boolean;
}

export function useVoice(): UseVoiceReturn {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);

  const recognitionRef = useRef<any>(null);
  const silenceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastTranscriptRef = useRef("");

  const SpeechRecognitionAPI =
    typeof window !== "undefined"
      ? (window as any).SpeechRecognition ||
        (window as any).webkitSpeechRecognition
      : null;

  const voiceSupported = !!SpeechRecognitionAPI;
  const ttsSupported =
    typeof window !== "undefined" && "speechSynthesis" in window;

  const clearSilenceTimer = useCallback(() => {
    if (silenceTimerRef.current) {
      clearTimeout(silenceTimerRef.current);
      silenceTimerRef.current = null;
    }
  }, []);

  const stopListening = useCallback(() => {
    clearSilenceTimer();
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {}
      recognitionRef.current = null;
    }
    setIsListening(false);
  }, [clearSilenceTimer]);

  const startListening = useCallback(() => {
    if (!voiceSupported) return;
    if (recognitionRef.current) {
      stopListening();
    }

    const recognition = new SpeechRecognitionAPI() as any;
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onresult = (event: any) => {
      let finalText = "";
      let interimText = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) {
          finalText += result[0].transcript;
        } else {
          interimText += result[0].transcript;
        }
      }
      const combined = (
        lastTranscriptRef.current +
        finalText +
        interimText
      ).trim();
      if (finalText) {
        lastTranscriptRef.current = lastTranscriptRef.current + finalText;
      }
      setTranscript(combined);

      // Reset silence timer on any transcript activity
      clearSilenceTimer();
      silenceTimerRef.current = setTimeout(() => {
        stopListening();
      }, 2500);
    };

    recognition.onerror = () => {
      stopListening();
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
    lastTranscriptRef.current = "";
    setTranscript("");

    try {
      recognition.start();
      setIsListening(true);
    } catch {
      setIsListening(false);
    }
  }, [voiceSupported, SpeechRecognitionAPI, stopListening, clearSilenceTimer]);

  const stopSpeaking = useCallback(() => {
    if (ttsSupported) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
  }, [ttsSupported]);

  const speak = useCallback(
    (
      text: string,
      options?: { rate?: number; pitch?: number; volume?: number },
    ) => {
      if (!ttsSupported) return;

      // ElevenLabs slot — if API key present, use ElevenLabs
      if (ELEVEN_LABS_API_KEY) {
        // Structure is wired; actual call would go here.
        // fetch('https://api.elevenlabs.io/v1/text-to-speech/...', {
        //   method: 'POST',
        //   headers: { 'xi-api-key': ELEVEN_LABS_API_KEY, 'Content-Type': 'application/json' },
        //   body: JSON.stringify({ text, model_id: 'eleven_monolingual_v1', voice_settings: { stability: 0.5, similarity_boost: 0.75 } })
        // })
        // For now fall through to browser TTS
      }

      // Browser TTS fallback
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);

      // Pick a neutral, authoritative voice
      const voices = window.speechSynthesis.getVoices();
      const preferred =
        voices.find((v) => v.name.includes("Daniel")) ||
        voices.find((v) => v.name.includes("Alex")) ||
        voices.find((v) => v.lang === "en-US" && !v.localService === false) ||
        voices.find((v) => v.lang === "en-US") ||
        voices[0];

      if (preferred) utterance.voice = preferred;

      utterance.rate = options?.rate ?? 0.95;
      utterance.pitch = options?.pitch ?? 0.9;
      utterance.volume = options?.volume ?? 1.0;

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
    },
    [ttsSupported],
  );

  // Load voices on mount (Chrome lazy-loads)
  useEffect(() => {
    if (ttsSupported) {
      window.speechSynthesis.getVoices();
      const handler = () => window.speechSynthesis.getVoices();
      window.speechSynthesis.addEventListener("voiceschanged", handler);
      return () =>
        window.speechSynthesis.removeEventListener("voiceschanged", handler);
    }
  }, [ttsSupported]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearSilenceTimer();
      stopListening();
      stopSpeaking();
    };
  }, [clearSilenceTimer, stopListening, stopSpeaking]);

  return {
    isListening,
    transcript,
    startListening,
    stopListening,
    speak,
    stopSpeaking,
    isSpeaking,
    voiceSupported,
    ttsSupported,
  };
}
