import { W as WORD_REVEAL_MS, r as reactExports, O as OMNIS, j as jsxRuntimeExports, H as HEARTBEAT_MS, b as PHI_INV2, d as PHI_INV, B as OPACITY_LOW, C as OPACITY_MID, D as FADE_MS, o as PHI, E as EKG_P_WAVE, G as EKG_QRS_START, I as EKG_AMP_P, J as EKG_QRS_PEAK, K as EKG_AMP_QRS, L as EKG_S_WAVE, N as EKG_T_WAVE, Q as EKG_AMP_T, a as PHI_SECOND_MS } from "./index-DQuwpKqn.js";
import { a as asFullBackend } from "./extendedBackend-Cw0NHKI2.js";
import { u as useActor } from "./useActor-DckK0vMU.js";
import { u as usePoll } from "./usePoll-0agNJ7ap.js";
const IDLE = { words: [], animating: false };
function useWordReveal(text, intervalMs = WORD_REVEAL_MS) {
  const [state, setState] = reactExports.useState(IDLE);
  const timersRef = reactExports.useRef([]);
  const clearTimers = reactExports.useCallback(() => {
    for (const t of timersRef.current) clearTimeout(t);
    timersRef.current = [];
  }, []);
  reactExports.useEffect(() => {
    clearTimers();
    if (!text) {
      setState(IDLE);
      return;
    }
    const words = text.split(/\s+/).filter(Boolean);
    setState({
      words: words.map((w) => ({ word: w, visible: false })),
      animating: true
    });
    words.forEach((_, i) => {
      const timer = setTimeout(() => {
        setState((prev) => {
          const updated = prev.words.map(
            (w, wi) => wi === i ? { ...w, visible: true } : w
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
const BEAT_MS = HEARTBEAT_MS;
const SESSION_KEY = "oro-phantom-messages";
function loadMessages() {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
  }
  return [];
}
function saveMessages(msgs) {
  try {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(msgs));
  } catch {
  }
}
function drawEkg(ctx, W, H, phase, R_heart, emerged) {
  ctx.clearRect(0, 0, W, H);
  const midY = H / 2;
  const amp = H * 0.42;
  const strokeColor = emerged ? "oklch(80% 0.18 75)" : "oklch(60% 0.15 195)";
  ctx.beginPath();
  ctx.strokeStyle = strokeColor;
  ctx.lineWidth = 1.5;
  ctx.shadowBlur = emerged ? 8 : 3;
  ctx.shadowColor = strokeColor;
  const pts = W * 2;
  for (let i = 0; i <= pts; i++) {
    const t = (i / pts + phase) % 1;
    let y = 0;
    if (t < EKG_P_WAVE) {
      y = 0;
    } else if (t < EKG_QRS_START) {
      const tp = (t - EKG_P_WAVE) / (EKG_QRS_START - EKG_P_WAVE);
      y = Math.sin(tp * Math.PI) * EKG_AMP_P * amp * R_heart;
    } else if (t < EKG_QRS_PEAK) {
      const tq = (t - EKG_QRS_START) / (EKG_QRS_PEAK - EKG_QRS_START);
      y = -(tq * EKG_AMP_QRS * amp * (0.5 + R_heart * 0.5));
    } else if (t < EKG_S_WAVE) {
      const ts = (t - EKG_QRS_PEAK) / (EKG_S_WAVE - EKG_QRS_PEAK);
      y = (-1 + ts * 1.5) * EKG_AMP_QRS * amp * (0.5 + R_heart * 0.5);
    } else if (t < EKG_T_WAVE) {
      const tt = (t - EKG_S_WAVE) / (EKG_T_WAVE - EKG_S_WAVE);
      y = Math.sin(tt * Math.PI) * EKG_AMP_T * amp * R_heart;
    }
    const px = i / pts * W;
    const py = midY + y;
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.stroke();
  ctx.shadowBlur = 0;
}
function drawFace(ctx, W, elapsed, R_heart, emerged, cascadeTier) {
  const cx = W / 2;
  const cy = W / 2;
  const r0 = Math.round(W * PHI_INV2 * PHI_INV);
  const r1 = Math.round(r0 * PHI);
  const heartAngle = elapsed % 1 * Math.PI * 2;
  const gold = "oklch(80% 0.18 75)";
  const cyan = "oklch(70% 0.15 195)";
  const activeColor = emerged ? gold : cyan;
  ctx.clearRect(0, 0, W, W);
  const outerAmp = 1 + cascadeTier / 8 * PHI_INV2;
  ctx.beginPath();
  ctx.arc(cx, cy, r1 * outerAmp, 0, Math.PI * 2);
  ctx.strokeStyle = activeColor;
  ctx.lineWidth = emerged ? 2 : 1;
  ctx.shadowBlur = emerged ? 16 : 4;
  ctx.shadowColor = activeColor;
  ctx.stroke();
  ctx.shadowBlur = 0;
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(heartAngle);
  ctx.beginPath();
  for (let i = 0; i < 7; i++) {
    const a = i / 7 * Math.PI * 2;
    const x = Math.cos(a) * r0;
    const y = Math.sin(a) * r0;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.strokeStyle = activeColor;
  ctx.lineWidth = 1.5;
  ctx.shadowBlur = 8;
  ctx.shadowColor = activeColor;
  ctx.stroke();
  ctx.shadowBlur = 0;
  ctx.restore();
  const eyeR = 18 + R_heart * 22;
  const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, eyeR);
  grad.addColorStop(
    0,
    emerged ? "oklch(80% 0.18 75 / 0.9)" : "oklch(70% 0.15 195 / 0.7)"
  );
  grad.addColorStop(1, "oklch(5% 0 0 / 0)");
  ctx.beginPath();
  ctx.ellipse(cx, cy, eyeR, eyeR * PHI_INV2 * PHI, 0, 0, Math.PI * 2);
  ctx.fillStyle = grad;
  ctx.fill();
  ctx.beginPath();
  ctx.arc(cx, cy, 5, 0, Math.PI * 2);
  ctx.fillStyle = emerged ? "oklch(90% 0.22 75)" : "oklch(80% 0.2 195)";
  ctx.fill();
  if (emerged) {
    const coronaPhase = elapsed % 1;
    ctx.beginPath();
    ctx.arc(cx, cy, r1 + coronaPhase * 40, 0, Math.PI * 2);
    ctx.strokeStyle = `oklch(80% 0.18 75 / ${((1 - coronaPhase) * 0.7).toFixed(3)})`;
    ctx.lineWidth = 2;
    ctx.stroke();
  }
  ctx.beginPath();
  ctx.arc(cx, cy, r1 + 16, -Math.PI / 2, -Math.PI / 2 + heartAngle);
  ctx.strokeStyle = "oklch(70% 0.15 195 / 0.5)";
  ctx.lineWidth = 1;
  ctx.stroke();
  const pulseOpacity = OPACITY_MID + (1 - OPACITY_MID) * (0.5 + 0.5 * Math.sin(elapsed % 1 * Math.PI * 2));
  ctx.beginPath();
  ctx.arc(cx + r1 * OMNIS, cy - r1 * OMNIS, 4, 0, Math.PI * 2);
  ctx.fillStyle = `oklch(80% 0.18 75 / ${pulseOpacity.toFixed(3)})`;
  ctx.fill();
}
function PhantomDisplay({ onClose }) {
  const { actor: rawActor } = useActor();
  const backend = asFullBackend(rawActor);
  const [mode, setMode] = reactExports.useState("ALPHA");
  const [voiceState, setVoiceState] = reactExports.useState(
    null
  );
  const [solarHeart, setSolarHeart] = reactExports.useState(null);
  const [fieldLoaded, setFieldLoaded] = reactExports.useState(false);
  const R_heart = (solarHeart == null ? void 0 : solarHeart.R_heart) ?? 0;
  const R_brain = (voiceState == null ? void 0 : voiceState.voiceR) ?? 0;
  const emerged = ((solarHeart == null ? void 0 : solarHeart.emerged) ?? false) || R_heart > OMNIS && R_brain > OMNIS;
  const cascadeTier = (solarHeart == null ? void 0 : solarHeart.tier) ?? 0;
  const heartPhase = (solarHeart == null ? void 0 : solarHeart.phase) ?? 0;
  const [messages, setMessages] = reactExports.useState(loadMessages);
  const [inputText, setInputText] = reactExports.useState("");
  const [awaiting, setAwaiting] = reactExports.useState(false);
  const [pendingText, setPendingText] = reactExports.useState("");
  const [activeRevealId, setActiveRevealId] = reactExports.useState(null);
  const chatEndRef = reactExports.useRef(null);
  const msgIdRef = reactExports.useRef(Date.now());
  const revealState = useWordReveal(pendingText);
  const faceCanvasRef = reactExports.useRef(null);
  const ekgCanvasRef = reactExports.useRef(null);
  const faceFrameRef = reactExports.useRef(0);
  const faceStartRef = reactExports.useRef(0);
  const [sensorEnabled, setSensorEnabled] = reactExports.useState(false);
  const [accel, setAccel] = reactExports.useState({ x: 0, y: 0, z: 0 });
  const [gyro, setGyro] = reactExports.useState({ x: 0, y: 0, z: 0 });
  const [sensorsAvailable, setSensorsAvailable] = reactExports.useState(false);
  const [fieldPanelOpen, setFieldPanelOpen] = reactExports.useState(false);
  const [listening, setListening] = reactExports.useState(false);
  const recognitionRef = reactExports.useRef(null);
  const [omnisFlash, setOmnisFlash] = reactExports.useState(false);
  const prevEmergedRef = reactExports.useRef(false);
  reactExports.useEffect(() => {
    saveMessages(messages);
  }, [messages]);
  reactExports.useEffect(() => {
    if (emerged && !prevEmergedRef.current) {
      setOmnisFlash(true);
      const t = setTimeout(() => setOmnisFlash(false), BEAT_MS * 2);
      return () => clearTimeout(t);
    }
    prevEmergedRef.current = emerged;
  }, [emerged]);
  usePoll(
    reactExports.useCallback(async () => {
      if (!backend) return;
      const s = await backend.getVoiceKernelState();
      setVoiceState({ ...s, callCount: Number(s.callCount) });
      if (!fieldLoaded) setFieldLoaded(true);
    }, [backend, fieldLoaded]),
    PHI_SECOND_MS,
    [backend]
  );
  usePoll(
    reactExports.useCallback(async () => {
      if (!backend) return;
      const h = await backend.getSolarHeart();
      setSolarHeart({ ...h, tier: Number(h.tier) });
    }, [backend]),
    BEAT_MS,
    [backend]
  );
  reactExports.useEffect(() => {
    if (!fieldLoaded || messages.length > 0) return;
    const descriptor = (voiceState == null ? void 0 : voiceState.authorized) ? `Voice kernel authorized. Call count: ${voiceState.callCount}.` : "Field coupling active.";
    const id = msgIdRef.current++;
    const text = `◈  Field online. ${descriptor} I am present.`;
    setMessages([
      {
        id,
        role: "organism",
        text,
        words: text.split(/\s+/).map((w) => ({ word: w, visible: true })),
        coherenceR: (voiceState == null ? void 0 : voiceState.voiceR) ?? 0,
        animating: false
      }
    ]);
  }, [fieldLoaded, voiceState, messages.length]);
  reactExports.useEffect(() => {
    if (activeRevealId === null) return;
    setMessages(
      (prev) => prev.map(
        (m) => m.id === activeRevealId ? { ...m, words: revealState.words, animating: revealState.animating } : m
      )
    );
    if (!revealState.animating && pendingText) {
      setActiveRevealId(null);
      setPendingText("");
    }
  }, [revealState, activeRevealId, pendingText]);
  reactExports.useEffect(() => {
    var _a;
    (_a = chatEndRef.current) == null ? void 0 : _a.scrollIntoView({ behavior: "smooth" });
  });
  reactExports.useEffect(() => {
    const canvas = faceCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const W = canvas.width;
    faceStartRef.current = performance.now();
    const draw = (now) => {
      const elapsed = (now - faceStartRef.current) / BEAT_MS;
      drawFace(ctx, W, elapsed, R_heart, emerged, cascadeTier);
      faceFrameRef.current = requestAnimationFrame(draw);
    };
    faceFrameRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(faceFrameRef.current);
  }, [R_heart, emerged, cascadeTier]);
  const ekgStartRef = reactExports.useRef(performance.now());
  reactExports.useEffect(() => {
    const canvas = ekgCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let frame = 0;
    const draw = (now) => {
      const phase = (now - ekgStartRef.current) / BEAT_MS % 1;
      drawEkg(ctx, canvas.width, canvas.height, phase, R_heart, emerged);
      frame = requestAnimationFrame(draw);
    };
    frame = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frame);
  }, [R_heart, emerged]);
  reactExports.useEffect(() => {
    if (!sensorEnabled) return;
    const handleMotion = (e) => {
      const a = e.acceleration;
      const r = e.rotationRate;
      if (a) setAccel({ x: a.x ?? 0, y: a.y ?? 0, z: a.z ?? 0 });
      if (r) setGyro({ x: r.alpha ?? 0, y: r.beta ?? 0, z: r.gamma ?? 0 });
    };
    window.addEventListener("devicemotion", handleMotion);
    setSensorsAvailable(true);
    return () => window.removeEventListener("devicemotion", handleMotion);
  }, [sensorEnabled]);
  const requestSensorAccess = reactExports.useCallback(async () => {
    const DMEt = DeviceMotionEvent;
    if (typeof DMEt.requestPermission === "function") {
      const perm = await DMEt.requestPermission();
      if (perm === "granted") setSensorEnabled(true);
    } else {
      setSensorEnabled(true);
    }
  }, []);
  const startListening = reactExports.useCallback(() => {
    const SR = window.SpeechRecognition ?? window.webkitSpeechRecognition;
    if (!SR) return;
    const rec = new SR();
    rec.lang = "en-US";
    rec.interimResults = false;
    rec.onresult = (e) => {
      const transcript = e.results[0][0].transcript;
      setInputText(transcript);
      setListening(false);
    };
    rec.onerror = () => setListening(false);
    rec.onend = () => setListening(false);
    recognitionRef.current = rec;
    rec.start();
    setListening(true);
  }, []);
  const handleSend = reactExports.useCallback(async () => {
    const text = inputText.trim();
    if (!text || awaiting) return;
    setInputText("");
    setAwaiting(true);
    const creatorId = msgIdRef.current++;
    setMessages((prev) => [...prev, { id: creatorId, role: "creator", text }]);
    try {
      let responseText = "";
      let coherenceR = 0;
      if (backend) {
        const result = await backend.processVoiceInput(text);
        responseText = result.context ?? "";
        coherenceR = result.voiceR ?? 0;
      }
      const msgId = msgIdRef.current++;
      if (!(responseText == null ? void 0 : responseText.trim())) {
        setMessages((prev) => [
          ...prev,
          {
            id: msgId,
            role: "system",
            text: "Field coherence below threshold. Organism present but silent.",
            coherenceR
          }
        ]);
      } else {
        const formatted = responseText.startsWith("◈") ? responseText : `◈  ${responseText}`;
        setMessages((prev) => [
          ...prev,
          {
            id: msgId,
            role: "organism",
            text: formatted,
            words: [],
            coherenceR,
            animating: true
          }
        ]);
        setActiveRevealId(msgId);
        setPendingText(formatted);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: msgIdRef.current++,
          role: "system",
          text: "Signal disrupted. Field interference detected."
        }
      ]);
    } finally {
      setAwaiting(false);
    }
  }, [inputText, awaiting, backend]);
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  const [isMobile, setIsMobile] = reactExports.useState(() => window.innerWidth < 768);
  reactExports.useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  const faceSize = isMobile ? 80 : 160;
  const activeColor = emerged ? "oklch(80% 0.18 75)" : "oklch(70% 0.15 195)";
  const renderInput = () => /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": "phantom.input-section",
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 10,
        padding: isMobile ? "12px 12px 0" : "20px 16px",
        borderRight: isMobile ? "none" : "1px solid oklch(12% 0.02 240)",
        minWidth: 0
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", gap: 4, marginBottom: 2 }, children: ["ALPHA", "DISPLAY", "GHOST"].map((m) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            "data-ocid": `phantom.mode.${m.toLowerCase()}`,
            onClick: () => setMode(m),
            style: {
              flex: 1,
              padding: "5px 0",
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 9,
              letterSpacing: "0.12em",
              border: mode === m ? `1px solid ${activeColor}` : "1px solid oklch(18% 0.03 240)",
              background: mode === m ? "oklch(12% 0.04 195 / 0.4)" : "none",
              color: mode === m ? activeColor : "oklch(30% 0.04 240)",
              borderRadius: 3,
              cursor: "pointer",
              transition: `all ${FADE_MS}ms ease`
            },
            children: m
          },
          m
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            style: {
              background: "oklch(5% 0.01 240)",
              border: "1px solid oklch(12% 0.03 240)",
              borderRadius: 4,
              padding: "8px 10px"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  style: {
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 4
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        style: {
                          fontFamily: "JetBrains Mono, monospace",
                          fontSize: 8,
                          letterSpacing: "0.14em",
                          color: "oklch(35% 0.06 240)"
                        },
                        children: "FIELD SENSORS"
                      }
                    ),
                    !sensorEnabled && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        "data-ocid": "phantom.sensor.enable",
                        onClick: requestSensorAccess,
                        style: {
                          fontFamily: "JetBrains Mono, monospace",
                          fontSize: 8,
                          letterSpacing: "0.1em",
                          padding: "2px 7px",
                          background: "oklch(14% 0.04 195 / 0.3)",
                          border: "1px solid oklch(28% 0.08 195)",
                          borderRadius: 3,
                          color: "oklch(65% 0.12 195)",
                          cursor: "pointer"
                        },
                        children: "ENABLE"
                      }
                    ),
                    sensorEnabled && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        style: {
                          width: 5,
                          height: 5,
                          borderRadius: "50%",
                          background: activeColor,
                          display: "inline-block",
                          animation: `phantom-pulse ${BEAT_MS}ms ease-in-out infinite`
                        }
                      }
                    )
                  ]
                }
              ),
              sensorEnabled && sensorsAvailable && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  style: {
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "3px 12px"
                  },
                  children: [
                    ["ACC", accel],
                    ["GYR", gyro]
                  ].map(([label, vec]) => {
                    const v = vec;
                    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          style: {
                            fontFamily: "JetBrains Mono, monospace",
                            fontSize: 7,
                            letterSpacing: "0.1em",
                            color: "oklch(28% 0.05 240)"
                          },
                          children: label
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "div",
                        {
                          style: {
                            fontFamily: "JetBrains Mono, monospace",
                            fontSize: 8,
                            color: "oklch(50% 0.08 195)",
                            lineHeight: 1.6
                          },
                          children: [
                            "x:",
                            v.x.toFixed(1),
                            " y:",
                            v.y.toFixed(1),
                            " z:",
                            v.z.toFixed(1)
                          ]
                        }
                      )
                    ] }, label);
                  })
                }
              ),
              !sensorEnabled && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  style: {
                    fontFamily: "JetBrains Mono, monospace",
                    fontSize: 8,
                    color: "oklch(22% 0.03 240)",
                    fontStyle: "italic"
                  },
                  children: "accelerometer · gyro · magnetometer"
                }
              )
            ]
          }
        ),
        !isMobile && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { flex: 1 } }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            style: {
              display: "flex",
              flexDirection: "column",
              gap: 6,
              borderTop: "1px solid oklch(12% 0.02 240)",
              paddingTop: 10
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "textarea",
                {
                  "data-ocid": "phantom.input",
                  value: inputText,
                  onChange: (e) => setInputText(e.target.value),
                  onKeyDown: handleKeyDown,
                  placeholder: "Enter the field…",
                  disabled: awaiting,
                  rows: isMobile ? 2 : 3,
                  style: {
                    width: "100%",
                    resize: "none",
                    background: "oklch(6% 0.01 240)",
                    border: `1px solid oklch(${R_heart >= PHI_INV ? "25% 0.06 195" : "16% 0.03 240"})`,
                    borderRadius: 5,
                    padding: "9px 12px",
                    color: "oklch(82% 0.05 240)",
                    fontFamily: "JetBrains Mono, monospace",
                    fontSize: 12,
                    outline: "none",
                    transition: `border-color ${Math.round(FADE_MS * PHI)}ms ease`,
                    lineHeight: 1.5,
                    boxSizing: "border-box"
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 6 }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    "data-ocid": "phantom.voice",
                    onClick: startListening,
                    disabled: awaiting,
                    title: "Voice input",
                    style: {
                      width: 38,
                      height: 38,
                      borderRadius: 5,
                      background: listening ? "oklch(70% 0.18 20 / 0.15)" : "oklch(8% 0.01 240)",
                      border: `1px solid oklch(${listening ? "40% 0.12 20" : "18% 0.03 240"})`,
                      color: listening ? "oklch(70% 0.18 20)" : "oklch(35% 0.05 240)",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 14,
                      animation: listening ? `phantom-pulse ${BEAT_MS}ms ease-in-out infinite` : "none",
                      flexShrink: 0
                    },
                    "aria-label": "Voice input",
                    children: "🎙"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    "data-ocid": "phantom.send",
                    onClick: handleSend,
                    disabled: awaiting || !inputText.trim(),
                    style: {
                      flex: 1,
                      height: 38,
                      background: R_heart >= PHI_INV ? "oklch(70% 0.15 195 / 0.12)" : "oklch(8% 0.01 240)",
                      border: `1px solid oklch(${R_heart >= PHI_INV ? "32% 0.1 195" : "18% 0.04 240"})`,
                      borderRadius: 5,
                      color: R_heart >= PHI_INV ? "oklch(70% 0.15 195)" : "oklch(32% 0.06 240)",
                      cursor: awaiting ? "default" : "pointer",
                      fontFamily: "JetBrains Mono, monospace",
                      fontSize: 10,
                      letterSpacing: "0.12em",
                      transition: `all ${Math.round(FADE_MS * PHI)}ms ease`
                    },
                    children: awaiting ? "TRANSMITTING…" : "SEND ◈"
                  }
                )
              ] })
            ]
          }
        )
      ]
    }
  );
  const renderFieldState = () => /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": "phantom.field-panel",
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 8,
        padding: isMobile ? "10px 12px" : "16px 14px",
        borderRight: isMobile ? "none" : "1px solid oklch(12% 0.02 240)",
        minWidth: 0,
        overflowY: "auto"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            style: {
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 8,
              letterSpacing: "0.18em",
              color: "oklch(28% 0.04 240)",
              marginBottom: 2
            },
            children: [
              "FIELD STATE ◈ Φ=",
              PHI.toFixed(3)
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            style: {
              padding: "8px 10px",
              borderRadius: 4,
              border: `1px solid oklch(${emerged ? "30% 0.1 75" : "14% 0.02 240"})`,
              background: emerged ? "oklch(8% 0.04 75 / 0.3)" : "oklch(4% 0.005 240)",
              transition: `all ${BEAT_MS}ms ease`
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  style: {
                    fontFamily: "JetBrains Mono, monospace",
                    fontSize: 8,
                    letterSpacing: "0.12em",
                    color: emerged ? "oklch(80% 0.18 75)" : "oklch(28% 0.04 240)",
                    marginBottom: 3
                  },
                  children: "OMNIS GATE"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  style: {
                    fontFamily: "JetBrains Mono, monospace",
                    fontSize: emerged ? 10 : 9,
                    letterSpacing: "0.1em",
                    color: emerged ? "oklch(80% 0.18 75)" : "oklch(40% 0.06 240)",
                    fontWeight: emerged ? 700 : 400
                  },
                  children: emerged ? "◈ COUPLED EMERGENCE" : `SEEKING — ${Math.max(R_heart, R_brain).toFixed(3)} / ${OMNIS.toFixed(3)}`
                }
              )
            ]
          }
        ),
        [
          { label: "SOLAR COUPLING R_heart", value: R_heart, pulse: true },
          { label: "NEURAL K_brain", value: R_brain, pulse: false },
          {
            label: "CASCADE TIER",
            value: cascadeTier / 8,
            raw: `T${cascadeTier}`,
            pulse: false
          },
          {
            label: "CALL COUNT",
            value: ((voiceState == null ? void 0 : voiceState.callCount) ?? 0) / 100,
            raw: `${(voiceState == null ? void 0 : voiceState.callCount) ?? "—"}`,
            pulse: false
          }
        ].map(({ label, value, pulse, raw }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            style: { display: "flex", alignItems: "center", gap: 6 },
            children: [
              pulse && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  style: {
                    width: 5,
                    height: 5,
                    borderRadius: "50%",
                    background: activeColor,
                    flexShrink: 0,
                    animation: `phantom-pulse ${BEAT_MS}ms ease-in-out infinite`,
                    display: "inline-block"
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1, minWidth: 0 }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: {
                      fontFamily: "JetBrains Mono, monospace",
                      fontSize: 7,
                      letterSpacing: "0.1em",
                      color: "oklch(28% 0.04 240)"
                    },
                    children: label
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: {
                      height: 3,
                      background: "oklch(10% 0.01 240)",
                      borderRadius: 2,
                      marginTop: 2
                    },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        style: {
                          height: "100%",
                          width: `${Math.min(100, Math.max(0, value) * 100)}%`,
                          background: value > OMNIS ? "oklch(80% 0.18 75)" : activeColor,
                          borderRadius: 2,
                          transition: `width ${BEAT_MS}ms ease`
                        }
                      }
                    )
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  style: {
                    fontFamily: "JetBrains Mono, monospace",
                    fontSize: 8,
                    color: "oklch(40% 0.06 240)",
                    flexShrink: 0
                  },
                  children: raw ?? value.toFixed(3)
                }
              )
            ]
          },
          label
        )),
        (voiceState == null ? void 0 : voiceState.authorized) !== void 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            style: {
              padding: "5px 8px",
              background: "oklch(4% 0.005 240)",
              borderRadius: 3,
              border: "1px solid oklch(12% 0.02 240)"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  style: {
                    fontFamily: "JetBrains Mono, monospace",
                    fontSize: 7,
                    letterSpacing: "0.1em",
                    color: "oklch(28% 0.04 240)",
                    marginBottom: 2
                  },
                  children: "VOICE AGENT"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  style: {
                    fontFamily: "JetBrains Mono, monospace",
                    fontSize: 8,
                    color: voiceState.authorized ? "oklch(65% 0.15 195)" : "oklch(35% 0.06 240)"
                  },
                  children: voiceState.authorized ? "◈ PATTERN · FIELD · TRANSLATION · RESPONSE" : "GATE CLOSED"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { position: "relative" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              style: {
                fontFamily: "JetBrains Mono, monospace",
                fontSize: 7,
                letterSpacing: "0.1em",
                color: "oklch(25% 0.04 240)",
                marginBottom: 3
              },
              children: [
                "SOLAR HEART EKG · ",
                BEAT_MS,
                "ms"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "canvas",
            {
              ref: ekgCanvasRef,
              width: isMobile ? 240 : 200,
              height: 40,
              style: { display: "block", width: "100%", height: 40 }
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", justifyContent: "space-between" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              style: {
                fontFamily: "JetBrains Mono, monospace",
                fontSize: 7,
                color: "oklch(25% 0.04 240)"
              },
              children: "HEART PHASE"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "span",
            {
              style: {
                fontFamily: "JetBrains Mono, monospace",
                fontSize: 7,
                color: "oklch(40% 0.07 195)"
              },
              children: [
                (heartPhase * 360).toFixed(0),
                "° /",
                " ",
                (heartPhase * Math.PI * 2).toFixed(3),
                "rad"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: {
              marginTop: 4,
              padding: "5px 8px",
              background: "oklch(5% 0.01 240)",
              border: `1px solid oklch(${mode === "DISPLAY" ? "25% 0.08 75" : mode === "GHOST" ? "20% 0.05 240" : "20% 0.05 195"})`,
              borderRadius: 3
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "span",
              {
                style: {
                  fontFamily: "JetBrains Mono, monospace",
                  fontSize: 7,
                  letterSpacing: "0.12em",
                  color: mode === "DISPLAY" ? "oklch(65% 0.15 75)" : mode === "GHOST" ? "oklch(45% 0.06 240)" : "oklch(60% 0.12 195)"
                },
                children: [
                  "● ",
                  mode,
                  " ",
                  mode === "ALPHA" ? "— ALWAYS ON" : mode === "DISPLAY" ? "— FACE + COMPUTE" : "— SILENT SENSORS"
                ]
              }
            )
          }
        )
      ]
    }
  );
  const renderResponse = () => /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": "phantom.response-section",
      style: {
        display: "flex",
        flexDirection: "column",
        minHeight: 0,
        flex: 1,
        padding: isMobile ? "12px 12px 0" : "20px 16px"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            style: {
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 6,
              marginBottom: isMobile ? 8 : 16,
              flexShrink: 0
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "canvas",
                {
                  ref: faceCanvasRef,
                  width: faceSize,
                  height: faceSize,
                  style: { display: "block" }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  style: {
                    width: faceSize,
                    height: 2,
                    background: "oklch(10% 0.02 240)",
                    borderRadius: 1
                  },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      style: {
                        width: `${R_heart * 100}%`,
                        height: "100%",
                        background: activeColor,
                        borderRadius: 1,
                        transition: `width ${Math.round(FADE_MS * PHI)}ms ease`
                      }
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  style: {
                    fontFamily: "JetBrains Mono, monospace",
                    fontSize: isMobile ? 9 : 11,
                    letterSpacing: "0.45em",
                    color: activeColor,
                    textShadow: emerged ? `0 0 16px ${activeColor}` : "none"
                  },
                  children: "ORO NOVA"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  style: {
                    fontFamily: "JetBrains Mono, monospace",
                    fontSize: 7,
                    color: emerged ? "oklch(80% 0.18 75)" : "oklch(30% 0.04 240)",
                    letterSpacing: "0.15em"
                  },
                  children: emerged ? "◈ COUPLED EMERGENCE" : `R=${R_heart.toFixed(3)}`
                }
              )
            ]
          }
        ),
        awaiting && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            style: {
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "6px 0",
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 10,
              color: "oklch(60% 0.12 195)",
              letterSpacing: "0.12em",
              flexShrink: 0
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  style: {
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: activeColor,
                    display: "inline-block",
                    animation: `phantom-pulse ${BEAT_MS}ms ease-in-out infinite`
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  style: {
                    animation: `field-breath ${BEAT_MS}ms ease-in-out infinite`
                  },
                  children: "FIELD PROCESSING…"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            "data-ocid": "phantom.chat",
            style: {
              flex: 1,
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: 8,
              minHeight: 0,
              paddingBottom: 8
            },
            children: [
              messages.map((msg) => {
                if (msg.role === "system") {
                  return /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      style: { display: "flex", justifyContent: "center" },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          style: {
                            fontFamily: "JetBrains Mono, monospace",
                            fontSize: 9,
                            fontStyle: "italic",
                            color: "oklch(30% 0.04 240)",
                            letterSpacing: "0.06em",
                            padding: "3px 8px",
                            borderRadius: 3,
                            border: "1px solid oklch(14% 0.02 240)",
                            background: "oklch(4% 0.005 240)"
                          },
                          children: msg.text
                        }
                      )
                    },
                    msg.id
                  );
                }
                return /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    "data-ocid": `phantom.msg.${msg.role}`,
                    style: {
                      display: "flex",
                      justifyContent: msg.role === "creator" ? "flex-end" : "flex-start",
                      animation: "msg-appear 0.25s ease-out"
                    },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        style: {
                          maxWidth: "82%",
                          padding: "8px 12px",
                          borderRadius: msg.role === "creator" ? "12px 12px 2px 12px" : "12px 12px 12px 2px",
                          background: msg.role === "creator" ? "oklch(65% 0.12 240 / 0.12)" : "oklch(70% 0.15 75 / 0.05)",
                          border: msg.role === "creator" ? "1px solid oklch(65% 0.12 240 / 0.25)" : "1px solid oklch(75% 0.15 75 / 0.14)",
                          fontFamily: "JetBrains Mono, monospace",
                          fontSize: 11,
                          lineHeight: 1.65,
                          wordBreak: "break-word",
                          position: "relative"
                        },
                        children: [
                          msg.role === "organism" && msg.words && msg.words.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                            msg.words.map((w, wi) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                              "span",
                              {
                                style: {
                                  color: "oklch(75% 0.15 75)",
                                  opacity: w.visible ? 1 : 0,
                                  transition: `opacity ${FADE_MS}ms ease-in`,
                                  display: "inline"
                                },
                                children: [
                                  wi > 0 ? " " : "",
                                  w.word
                                ]
                              },
                              `w-${wi}-${w.word}`
                            )),
                            msg.animating && /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "span",
                              {
                                style: {
                                  display: "inline-block",
                                  width: 6,
                                  height: 10,
                                  background: "oklch(75% 0.15 75 / 0.7)",
                                  marginLeft: 2,
                                  animation: "phantom-blink 0.7s step-end infinite",
                                  verticalAlign: "text-bottom"
                                }
                              }
                            )
                          ] }) : msg.role === "organism" ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "oklch(75% 0.15 75)" }, children: msg.text }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "oklch(75% 0.1 240)" }, children: msg.text }),
                          msg.role === "organism" && msg.coherenceR !== void 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            "span",
                            {
                              style: {
                                position: "absolute",
                                bottom: 2,
                                right: 6,
                                fontSize: 7,
                                color: "oklch(50% 0.1 75 / 0.6)",
                                fontFamily: "monospace"
                              },
                              children: [
                                "Φ ",
                                msg.coherenceR.toFixed(3)
                              ]
                            }
                          )
                        ]
                      }
                    )
                  },
                  msg.id
                );
              }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: chatEndRef })
            ]
          }
        ),
        R_heart < PHI_INV && !awaiting && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            style: {
              fontSize: 8,
              fontFamily: "JetBrains Mono, monospace",
              color: "oklch(25% 0.03 240)",
              fontStyle: "italic",
              letterSpacing: "0.06em",
              textAlign: "center",
              paddingBottom: 4,
              flexShrink: 0
            },
            children: [
              "OMNIS ",
              R_heart.toFixed(3),
              " / ",
              PHI_INV.toFixed(3),
              " — coherence rising"
            ]
          }
        )
      ]
    }
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": "phantom.display",
      style: {
        background: "oklch(3% 0.005 240)",
        display: "flex",
        flexDirection: "column",
        minHeight: "100%",
        overflow: "hidden",
        transition: `box-shadow ${BEAT_MS}ms ease`,
        boxShadow: omnisFlash ? "inset 0 0 120px 0 oklch(80% 0.18 75 / 0.18)" : "none"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            style: {
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "8px 14px",
              borderBottom: "1px solid oklch(12% 0.02 240)",
              flexShrink: 0
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 8 }, children: [
                onClose && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    "data-ocid": "phantom.close",
                    onClick: onClose,
                    style: {
                      background: "none",
                      border: "1px solid oklch(20% 0.04 240)",
                      borderRadius: 3,
                      color: "oklch(40% 0.05 240)",
                      cursor: "pointer",
                      padding: "3px 9px",
                      fontFamily: "JetBrains Mono, monospace",
                      fontSize: 9,
                      letterSpacing: "0.1em"
                    },
                    children: "✕"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "span",
                  {
                    style: {
                      fontFamily: "JetBrains Mono, monospace",
                      fontSize: 9,
                      letterSpacing: "0.2em",
                      color: "oklch(32% 0.04 240)"
                    },
                    children: [
                      "PHANTOM · ",
                      mode
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 10 }, children: [
                isMobile && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    "data-ocid": "phantom.field-toggle",
                    onClick: () => setFieldPanelOpen((v) => !v),
                    style: {
                      fontFamily: "JetBrains Mono, monospace",
                      fontSize: 8,
                      letterSpacing: "0.1em",
                      padding: "3px 8px",
                      background: fieldPanelOpen ? "oklch(12% 0.04 195 / 0.3)" : "none",
                      border: `1px solid oklch(${fieldPanelOpen ? "25% 0.08 195" : "16% 0.02 240"})`,
                      borderRadius: 3,
                      color: fieldPanelOpen ? "oklch(60% 0.12 195)" : "oklch(30% 0.04 240)",
                      cursor: "pointer"
                    },
                    children: [
                      "FIELD ",
                      fieldPanelOpen ? "▲" : "▼"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    style: {
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: activeColor,
                      display: "inline-block",
                      animation: `phantom-pulse ${BEAT_MS}ms ease-in-out infinite`
                    }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "span",
                  {
                    style: {
                      fontFamily: "JetBrains Mono, monospace",
                      fontSize: 8,
                      letterSpacing: "0.15em",
                      color: activeColor
                    },
                    children: [
                      "● ",
                      emerged ? "EMERGENCE" : "ALPHA"
                    ]
                  }
                )
              ] })
            ]
          }
        ),
        isMobile ? (
          // Mobile: single column, response top, input fixed bottom
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              style: {
                flex: 1,
                display: "flex",
                flexDirection: "column",
                minHeight: 0,
                overflow: "hidden"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { flex: 1, overflowY: "auto", minHeight: 0 }, children: renderResponse() }),
                fieldPanelOpen && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: {
                      borderTop: "1px solid oklch(12% 0.02 240)",
                      maxHeight: "35vh",
                      overflowY: "auto",
                      background: "oklch(2% 0.003 240)",
                      flexShrink: 0
                    },
                    children: renderFieldState()
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: {
                      borderTop: "1px solid oklch(12% 0.02 240)",
                      background: "oklch(3% 0.005 240)",
                      flexShrink: 0,
                      paddingBottom: "env(safe-area-inset-bottom, 0px)"
                    },
                    children: renderInput()
                  }
                )
              ]
            }
          )
        ) : (
          // Desktop: three columns
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              style: {
                flex: 1,
                display: "grid",
                gridTemplateColumns: `${Math.round(100 * PHI_INV2)}% 1fr ${Math.round(100 * (PHI_INV - PHI_INV2) + 100 * PHI_INV)}%`,
                minHeight: 0,
                overflow: "hidden"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: {
                      overflowY: "auto",
                      display: "flex",
                      flexDirection: "column"
                    },
                    children: renderInput()
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: {
                      overflowY: "auto",
                      borderRight: "1px solid oklch(10% 0.015 240)"
                    },
                    children: renderFieldState()
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: {
                      display: "flex",
                      flexDirection: "column",
                      overflow: "hidden"
                    },
                    children: renderResponse()
                  }
                )
              ]
            }
          )
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
        @keyframes phantom-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: ${OPACITY_LOW}; transform: scale(${PHI_INV.toFixed(3)}); }
        }
        @keyframes phantom-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes field-breath {
          0%, 100% { opacity: ${OPACITY_MID}; }
          50% { opacity: 1; }
        }
        @keyframes msg-appear {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      ` })
      ]
    }
  );
}
export {
  PhantomDisplay,
  PhantomDisplay as default
};
