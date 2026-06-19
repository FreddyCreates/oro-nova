/**
 * CinematicIntro — Full-screen cinematic experience. Pure motion, no still frames.
 * Every scene is a live Canvas animation. Nothing is static.
 * Sequence: It's Not AI Labs → Deep Tech World → ORO Materializes → The Architect → Medina Tech Seal
 */
import { useCallback, useEffect, useRef, useState } from "react";

interface Props {
  onComplete: () => void;
}

const SCENE_DURATIONS = [4500, 5000, 6000, 4500, 5000];
const TOTAL_SCENES = 5;

function useSceneTimer(scene: number, running: boolean, onAdvance: () => void) {
  useEffect(() => {
    if (!running) return;
    const duration = SCENE_DURATIONS[scene] ?? 3000;
    const id = setTimeout(onAdvance, duration);
    return () => clearTimeout(id);
  }, [scene, running, onAdvance]);
}

// ─────────── SCENE 0 CANVAS: "It's Not AI Labs" — shatter-in from particles ───────────
function Scene0Canvas({ opacity }: { opacity: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const tRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Grid of particles that form then disperse
    type Particle = {
      x: number;
      y: number;
      tx: number;
      ty: number;
      vx: number;
      vy: number;
      r: number;
      color: string;
      phase: number;
      speed: number;
    };
    const particles: Particle[] = [];
    const COLS = 80;
    const ROWS = 40;

    const initParticles = () => {
      particles.length = 0;
      const w = canvas.width;
      const h = canvas.height;
      for (let i = 0; i < COLS * ROWS; i++) {
        const col = i % COLS;
        const row = Math.floor(i / COLS);
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          tx: (col / COLS) * w,
          ty: (row / ROWS) * h,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          r: Math.random() * 1.2 + 0.3,
          color:
            Math.random() > 0.85
              ? "rgba(6,182,212,"
              : Math.random() > 0.7
                ? "rgba(255,200,80,"
                : "rgba(255,255,255,",
          phase: Math.random() * Math.PI * 2,
          speed: 0.02 + Math.random() * 0.03,
        });
      }
    };
    initParticles();

    // Warp grid lines
    const drawGrid = (t: number, alpha: number) => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.strokeStyle = `rgba(6,182,212,${alpha * 0.08})`;
      ctx.lineWidth = 1;
      const lines = 20;
      for (let i = 0; i <= lines; i++) {
        const x = (i / lines) * w;
        const warpY = Math.sin(t * 0.5 + i * 0.4) * 12;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x + warpY, h);
        ctx.stroke();
      }
      for (let i = 0; i <= lines; i++) {
        const y = (i / lines) * h;
        const warpX = Math.sin(t * 0.4 + i * 0.3) * 10;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y + warpX);
        ctx.stroke();
      }
    };

    const draw = () => {
      tRef.current += 0.016;
      const t = tRef.current;
      const w = canvas.width;
      const h = canvas.height;

      ctx.fillStyle = `rgba(0,0,0,${0.15})`;
      ctx.fillRect(0, 0, w, h);

      drawGrid(t, opacity);

      // Animate particles drifting
      const gather = Math.min(t / 3, 1);
      for (const p of particles) {
        // Drift toward target then float away
        if (gather < 1) {
          p.x += (p.tx - p.x) * 0.03;
          p.y += (p.ty - p.y) * 0.03;
        } else {
          p.x += p.vx * 0.5;
          p.y += p.vy * 0.5;
          if (p.x < 0 || p.x > w) p.vx *= -1;
          if (p.y < 0 || p.y > h) p.vy *= -1;
        }
        const pulse = 0.4 + 0.3 * Math.sin(t * 2 + p.phase);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${pulse * opacity})`;
        ctx.fill();
      }

      // Horizontal scan line
      const scanY = ((t * 0.3) % 1) * h;
      const scanGrad = ctx.createLinearGradient(0, scanY - 60, 0, scanY + 60);
      scanGrad.addColorStop(0, "rgba(6,182,212,0)");
      scanGrad.addColorStop(0.5, `rgba(6,182,212,${0.12 * opacity})`);
      scanGrad.addColorStop(1, "rgba(6,182,212,0)");
      ctx.fillStyle = scanGrad;
      ctx.fillRect(0, scanY - 60, w, 120);

      rafRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [opacity]);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
    />
  );
}

// ─────────── SCENE 1 CANVAS: Deep Tech World — neural network in motion ───────────
function Scene1Canvas({ opacity }: { opacity: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const tRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Neural nodes
    type Node = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
      phase: number;
      type: "cpu" | "data" | "signal";
    };
    const nodes: Node[] = [];
    const COUNT = 60;
    const initNodes = () => {
      nodes.length = 0;
      for (let i = 0; i < COUNT; i++) {
        nodes.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          r: Math.random() * 3 + 1.5,
          phase: Math.random() * Math.PI * 2,
          type:
            Math.random() > 0.7
              ? "cpu"
              : Math.random() > 0.5
                ? "signal"
                : "data",
        });
      }
    };
    initNodes();

    // Flowing signal packets along edges
    type Packet = { fromIdx: number; toIdx: number; t: number; speed: number };
    const packets: Packet[] = [];

    const draw = () => {
      tRef.current += 0.012;
      const t = tRef.current;
      const w = canvas.width;
      const h = canvas.height;

      // Deep dark background gradient
      ctx.fillStyle = "rgba(0,2,10,0.25)";
      ctx.fillRect(0, 0, w, h);

      // Radial glow at center
      const cx = w / 2;
      const cy = h / 2;
      const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, w * 0.6);
      glow.addColorStop(0, `rgba(6,182,212,${0.04 * opacity})`);
      glow.addColorStop(0.4, `rgba(245,158,11,${0.02 * opacity})`);
      glow.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, w, h);

      // Move nodes
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0) n.x = w;
        if (n.x > w) n.x = 0;
        if (n.y < 0) n.y = h;
        if (n.y > h) n.y = 0;
      }

      // Draw edges between nearby nodes
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 160) {
            const edgeAlpha = (1 - dist / 160) * 0.18 * opacity;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(6,182,212,${edgeAlpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();

            // Spawn packets occasionally
            if (Math.random() < 0.001) {
              packets.push({
                fromIdx: i,
                toIdx: j,
                t: 0,
                speed: 0.01 + Math.random() * 0.02,
              });
            }
          }
        }
      }

      // Animate packets
      for (let i = packets.length - 1; i >= 0; i--) {
        const pk = packets[i];
        pk.t += pk.speed;
        if (pk.t >= 1) {
          packets.splice(i, 1);
          continue;
        }
        const from = nodes[pk.fromIdx];
        const to = nodes[pk.toIdx];
        const px = from.x + (to.x - from.x) * pk.t;
        const py = from.y + (to.y - from.y) * pk.t;
        ctx.beginPath();
        ctx.arc(px, py, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(245,158,11,${0.9 * opacity})`;
        ctx.fill();
      }

      // Draw nodes
      for (const n of nodes) {
        const pulse = 0.6 + 0.4 * Math.sin(t * 1.5 + n.phase);
        const color =
          n.type === "cpu"
            ? "rgba(6,182,212,"
            : n.type === "signal"
              ? "rgba(245,158,11,"
              : "rgba(255,255,255,";
        // Glow
        const ng = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 6);
        ng.addColorStop(0, `${color}${0.3 * pulse * opacity})`);
        ng.addColorStop(1, `${color}0)`);
        ctx.fillStyle = ng;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * 6, 0, Math.PI * 2);
        ctx.fill();
        // Core
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = `${color}${pulse * opacity})`;
        ctx.fill();
      }

      // Horizontal data streams
      for (let i = 0; i < 5; i++) {
        const y = h * (0.15 + i * 0.18);
        const xOff = (t * (40 + i * 8)) % w;
        const streamGrad = ctx.createLinearGradient(xOff - 200, 0, xOff, 0);
        streamGrad.addColorStop(0, "rgba(6,182,212,0)");
        streamGrad.addColorStop(1, `rgba(6,182,212,${0.12 * opacity})`);
        ctx.fillStyle = streamGrad;
        ctx.fillRect(xOff - 200, y - 1, 200, 2);
      }

      rafRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [opacity]);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
    />
  );
}

// ─────────── SCENE 2 CANVAS: ORO Materializes — the sovereign orb ───────────
function Scene2Canvas({ opacity }: { opacity: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const tRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Condensing particles that form into the orb
    type ConPoint = {
      x: number;
      y: number;
      tx: number;
      ty: number;
      angle: number;
      dist: number;
      speed: number;
      color: string;
      r: number;
    };
    const cloud: ConPoint[] = [];
    const CLOUD_COUNT = 300;
    const initCloud = () => {
      cloud.length = 0;
      const w = canvas.width;
      const h = canvas.height;
      const cx = w / 2;
      const cy = h / 2;
      for (let i = 0; i < CLOUD_COUNT; i++) {
        const angle = Math.random() * Math.PI * 2;
        const dist = 40 + Math.random() * 80; // orbit radius on orb surface
        cloud.push({
          x: cx + (Math.random() - 0.5) * w,
          y: cy + (Math.random() - 0.5) * h,
          tx: cx + Math.cos(angle) * dist,
          ty: cy + Math.sin(angle) * dist * 0.55,
          angle,
          dist,
          speed: 0.015 + Math.random() * 0.025,
          color:
            Math.random() > 0.6
              ? "rgba(245,158,11,"
              : Math.random() > 0.5
                ? "rgba(255,200,80,"
                : "rgba(255,255,255,",
          r: Math.random() * 1.5 + 0.5,
        });
      }
    };
    initCloud();

    const draw = () => {
      tRef.current += 0.014;
      const t = tRef.current;
      const w = canvas.width;
      const h = canvas.height;
      const cx = w / 2;
      const cy = h / 2;

      ctx.fillStyle = "rgba(0,1,4,0.2)";
      ctx.fillRect(0, 0, w, h);

      // Deep space background — rotating nebula
      for (let ring = 5; ring >= 1; ring--) {
        const nebulaR = 200 + ring * 80;
        const nb = ctx.createRadialGradient(
          cx + Math.sin(t * 0.1 + ring) * 30,
          cy + Math.cos(t * 0.08 + ring) * 20,
          0,
          cx,
          cy,
          nebulaR,
        );
        nb.addColorStop(0, "rgba(0,0,0,0)");
        nb.addColorStop(
          0.7,
          `rgba(${ring % 2 === 0 ? "6,182,212" : "100,50,0"},${0.015 * opacity})`,
        );
        nb.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = nb;
        ctx.beginPath();
        ctx.arc(
          cx + Math.sin(t * 0.07 + ring) * 40,
          cy,
          nebulaR,
          0,
          Math.PI * 2,
        );
        ctx.fill();
      }

      // Condensation progress 0→1 over first 3 seconds
      const condense = Math.min(t / 3.5, 1);

      // Draw cloud particles converging
      for (const p of cloud) {
        p.x += (p.tx - p.x) * p.speed * (1 - condense * 0.98 + 0.02);
        p.y += (p.ty - p.y) * p.speed * (1 - condense * 0.98 + 0.02);
        const a = 0.3 + 0.5 * condense;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${a * opacity})`;
        ctx.fill();
      }

      // Outer glow rings — pulsing
      for (let ring = 4; ring >= 1; ring--) {
        const ringR = 120 + ring * 45 + Math.sin(t * 0.7 + ring) * 12;
        const rg = ctx.createRadialGradient(cx, cy, 0, cx, cy, ringR);
        rg.addColorStop(0, "rgba(245,158,11,0)");
        rg.addColorStop(0.8, `rgba(245,158,11,${0.04 * condense * opacity})`);
        rg.addColorStop(1, "rgba(245,158,11,0)");
        ctx.fillStyle = rg;
        ctx.beginPath();
        ctx.arc(cx, cy, ringR, 0, Math.PI * 2);
        ctx.fill();
      }

      // Core orb body
      const orbR = 68 + Math.sin(t * 1.1) * 5;
      const coreG = ctx.createRadialGradient(cx - 22, cy - 22, 5, cx, cy, orbR);
      coreG.addColorStop(0, `rgba(255,240,120,${condense * opacity})`);
      coreG.addColorStop(0.3, `rgba(245,158,11,${0.95 * condense * opacity})`);
      coreG.addColorStop(0.7, `rgba(180,90,5,${0.75 * condense * opacity})`);
      coreG.addColorStop(1, `rgba(80,30,0,${0.4 * condense * opacity})`);
      ctx.beginPath();
      ctx.arc(cx, cy, orbR, 0, Math.PI * 2);
      ctx.fillStyle = coreG;
      ctx.fill();

      // Inner corona — rotating energy field
      for (let i = 0; i < 6; i++) {
        const coronaAngle = t * (0.3 + i * 0.07) + (i * Math.PI) / 3;
        const coronaR = orbR * (0.85 + Math.sin(t * 2 + i) * 0.08);
        ctx.beginPath();
        ctx.arc(
          cx + Math.cos(coronaAngle) * 8,
          cy + Math.sin(coronaAngle) * 4,
          coronaR,
          0,
          Math.PI * 2,
        );
        ctx.strokeStyle = `rgba(255,200,60,${0.06 * condense * opacity})`;
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      // Orbiting rings — 3 tilted ellipses
      for (let i = 0; i < 3; i++) {
        const ringAngle = t * (0.35 + i * 0.12) + (i * Math.PI * 2) / 3;
        const tiltFactor = Math.cos(ringAngle + i * 1.1);
        const ringRadius = 110 + i * 22;
        ctx.save();
        ctx.translate(cx, cy);
        ctx.scale(Math.abs(tiltFactor) * 0.6 + 0.4, 1);
        ctx.rotate(i * 0.6);
        ctx.beginPath();
        ctx.arc(0, 0, ringRadius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(245,158,11,${(0.2 + i * 0.07) * condense * opacity})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.restore();

        // Orbiting dot
        const dotAngle = t * (0.55 + i * 0.18) + (i * Math.PI * 2) / 3;
        const dotX =
          cx +
          Math.cos(dotAngle) * ringRadius * (Math.abs(tiltFactor) * 0.6 + 0.4);
        const dotY = cy + Math.sin(dotAngle) * ringRadius * 0.45;
        ctx.beginPath();
        ctx.arc(dotX, dotY, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,220,80,${condense * opacity})`;
        ctx.fill();
        // Dot trail
        for (let tr = 1; tr <= 5; tr++) {
          const trAngle = dotAngle - tr * 0.06;
          const trX =
            cx +
            Math.cos(trAngle) * ringRadius * (Math.abs(tiltFactor) * 0.6 + 0.4);
          const trY = cy + Math.sin(trAngle) * ringRadius * 0.45;
          ctx.beginPath();
          ctx.arc(trX, trY, 3.5 - tr * 0.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,200,50,${(0.5 - tr * 0.09) * condense * opacity})`;
          ctx.fill();
        }
      }

      // Energy spikes emanating outward
      const spikeCount = 12;
      for (let i = 0; i < spikeCount; i++) {
        const spikeAngle = (i / spikeCount) * Math.PI * 2 + t * 0.2;
        const spikeLen = 20 + Math.sin(t * 3 + i * 1.3) * 30;
        const x1 = cx + Math.cos(spikeAngle) * orbR;
        const y1 = cy + Math.sin(spikeAngle) * orbR * 0.85;
        const x2 = cx + Math.cos(spikeAngle) * (orbR + spikeLen);
        const y2 = cy + Math.sin(spikeAngle) * (orbR + spikeLen) * 0.85;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = `rgba(245,158,11,${0.25 * condense * opacity})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      rafRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [opacity]);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
    />
  );
}

// ─────────── SCENE 3 CANVAS: The Architect — elegant substrate grid ───────────
function Scene3Canvas({ opacity }: { opacity: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const tRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      tRef.current += 0.012;
      const t = tRef.current;
      const w = canvas.width;
      const h = canvas.height;

      ctx.fillStyle = "rgba(0,1,5,0.22)";
      ctx.fillRect(0, 0, w, h);

      // Perspective grid flowing inward
      const vx = w * 0.38;
      const vy = h * 0.5;
      ctx.strokeStyle = `rgba(6,182,212,${0.06 * opacity})`;
      ctx.lineWidth = 1;
      const gridLines = 18;
      for (let i = 0; i < gridLines; i++) {
        const x = (i / gridLines) * w;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(vx, vy);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x, h);
        ctx.lineTo(vx, vy);
        ctx.stroke();
      }
      // Horizontal rings radiating from vanishing point
      for (let ring = 0; ring < 8; ring++) {
        const ringT = (t * 0.4 + ring * 0.125) % 1;
        const rx = vx;
        const ry = vy;
        const rw = ringT * w * 1.2;
        const rh = ringT * h * 0.6;
        ctx.beginPath();
        ctx.ellipse(rx, ry, rw / 2, rh / 2, 0, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(6,182,212,${(1 - ringT) * 0.12 * opacity})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Floating data points on left side (portrait side placeholder)
      for (let i = 0; i < 20; i++) {
        const px = w * 0.05 + Math.sin(t * 0.8 + i * 0.6) * w * 0.12;
        const py = h * 0.1 + (i / 20) * h * 0.8 + Math.sin(t * 1.2 + i) * 8;
        ctx.beginPath();
        ctx.arc(px, py, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(245,158,11,${0.4 * opacity})`;
        ctx.fill();
      }

      // Right side glow pulse
      const rightGlow = ctx.createRadialGradient(
        w * 0.75,
        h * 0.5,
        0,
        w * 0.75,
        h * 0.5,
        w * 0.4,
      );
      rightGlow.addColorStop(0, `rgba(245,158,11,${0.04 * opacity})`);
      rightGlow.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = rightGlow;
      ctx.fillRect(0, 0, w, h);

      // Scrolling binary/hex stream on right
      ctx.font = "10px JetBrains Mono, monospace";
      for (let col = 0; col < 8; col++) {
        const cx2 = w * 0.52 + col * 28;
        for (let row = 0; row < 16; row++) {
          const charVal = Math.floor(
            Math.sin(t * 2 + col * 3 + row * 1.5) * 8 + 8,
          ).toString(16);
          const rowY = (((row * 36 - t * 18 * (1 + col * 0.1)) % h) + h) % h;
          ctx.fillStyle = `rgba(6,182,212,${0.15 * opacity})`;
          ctx.fillText(charVal, cx2, rowY);
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [opacity]);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
    />
  );
}

// ─────────── SCENE 4 CANVAS: Medina Tech Seal — orange tree crystallizes ───────────
function Scene4Canvas({ opacity }: { opacity: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const tRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Gold particle burst → forms logo silhouette
    type GoldParticle = {
      x: number;
      y: number;
      tx: number;
      ty: number;
      vx: number;
      vy: number;
      r: number;
      phase: number;
      isOrange: boolean;
    };
    const golds: GoldParticle[] = [];
    const GOLD_COUNT = 250;
    const initGolds = () => {
      golds.length = 0;
      const w = canvas.width;
      const h = canvas.height;
      const cx = w / 2;
      const cy = h / 2;
      for (let i = 0; i < GOLD_COUNT; i++) {
        const angle = Math.random() * Math.PI * 2;
        const burst = Math.random() * Math.max(w, h) * 0.6;
        const tx = cx + (Math.random() - 0.5) * w * 0.5;
        const ty = cy + (Math.random() - 0.5) * h * 0.6;
        golds.push({
          x: cx + Math.cos(angle) * burst,
          y: cy + Math.sin(angle) * burst,
          tx,
          ty,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          r: Math.random() * 2 + 0.8,
          phase: Math.random() * Math.PI * 2,
          isOrange: Math.random() > 0.6,
        });
      }
    };
    initGolds();

    const draw = () => {
      tRef.current += 0.013;
      const t = tRef.current;
      const w = canvas.width;
      const h = canvas.height;
      const cx = w / 2;
      const cy = h / 2;

      ctx.fillStyle = "rgba(0,2,6,0.2)";
      ctx.fillRect(0, 0, w, h);

      // Warm radial glow — amber center
      const coreGlow = ctx.createRadialGradient(
        cx,
        cy - 30,
        0,
        cx,
        cy,
        w * 0.55,
      );
      coreGlow.addColorStop(0, `rgba(245,158,11,${0.08 * opacity})`);
      coreGlow.addColorStop(0.4, `rgba(180,80,0,${0.04 * opacity})`);
      coreGlow.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = coreGlow;
      ctx.fillRect(0, 0, w, h);

      // Rotating golden rings (like a seal / crest)
      for (let ring = 0; ring < 5; ring++) {
        const r = 160 + ring * 50;
        const rotSpeed = 0.08 + ring * 0.03;
        const dashCount = 24 + ring * 8;
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(t * rotSpeed * (ring % 2 === 0 ? 1 : -1));
        for (let d = 0; d < dashCount; d++) {
          const da = (d / dashCount) * Math.PI * 2;
          const gapFrac = 0.35;
          const da2 = da + (1 - gapFrac) * ((Math.PI * 2) / dashCount);
          ctx.beginPath();
          ctx.arc(0, 0, r, da, da2);
          ctx.strokeStyle = `rgba(245,158,11,${(0.06 + ring * 0.01) * opacity})`;
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }
        ctx.restore();
      }

      // Gold particle burst settling
      const settle = Math.min(t / 3, 1);
      for (const p of golds) {
        p.x += (p.tx - p.x) * 0.025;
        p.y += (p.ty - p.y) * 0.025;
        const pulse = 0.5 + 0.5 * Math.sin(t * 2 + p.phase);
        const color = p.isOrange ? "rgba(255,140,0," : "rgba(255,200,40,";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `${color}${settle * pulse * opacity})`;
        ctx.fill();
      }

      // Pulsing outer halo
      const haloR = 280 + Math.sin(t * 1.5) * 20;
      const haloG = ctx.createRadialGradient(
        cx,
        cy,
        haloR - 30,
        cx,
        cy,
        haloR + 30,
      );
      haloG.addColorStop(0, "rgba(245,158,11,0)");
      haloG.addColorStop(0.5, `rgba(245,158,11,${0.1 * opacity * settle})`);
      haloG.addColorStop(1, "rgba(245,158,11,0)");
      ctx.fillStyle = haloG;
      ctx.beginPath();
      ctx.arc(cx, cy, haloR + 30, 0, Math.PI * 2);
      ctx.fill();

      rafRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [opacity]);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
    />
  );
}

// ─────────────────────────────────────────────────────────────────────────────
export function CinematicIntro({ onComplete }: Props) {
  const [scene, setScene] = useState(0);
  const [sceneOpacity, setSceneOpacity] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);
  const [capabilityIdx, setCapabilityIdx] = useState(-1);
  const [running, setRunning] = useState(true);

  const capabilities = [
    "Voice Intelligence",
    "World Computer",
    "7 Council Organisms",
    "Closed-Loop Cognition",
    "Self-Funding",
    "Quantum Parallel",
    "ICP Native",
  ];

  const completeIntro = useCallback(() => {
    setRunning(false);
    onComplete();
  }, [onComplete]);

  const advanceScene = useCallback(() => {
    setFadeOut(true);
    setTimeout(() => {
      setFadeOut(false);
      setSceneOpacity(0);
      setCapabilityIdx(-1);
      if (scene >= TOTAL_SCENES - 1) {
        completeIntro();
      } else {
        setScene((s) => s + 1);
      }
    }, 700);
  }, [scene, completeIntro]);

  useSceneTimer(scene, running, advanceScene);

  // biome-ignore lint/correctness/useExhaustiveDependencies: scene triggers fade-in intentionally
  useEffect(() => {
    const id = setTimeout(() => setSceneOpacity(1), 60);
    return () => clearTimeout(id);
  }, [scene]);

  // Scene 2: cycle capabilities
  // biome-ignore lint/correctness/useExhaustiveDependencies: intentional
  useEffect(() => {
    if (scene !== 2) return;
    let idx = 0;
    const id = setInterval(() => {
      setCapabilityIdx(idx);
      idx++;
      if (idx >= capabilities.length) clearInterval(id);
    }, 600);
    return () => clearInterval(id);
  }, [scene, capabilities.length]);

  const handleSkip = () => {
    setRunning(false);
    completeIntro();
  };

  const baseStyle: React.CSSProperties = {
    position: "fixed",
    inset: 0,
    background: "#000000",
    zIndex: 9999,
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "JetBrains Mono, monospace",
  };

  const sceneWrap: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    opacity: fadeOut ? 0 : sceneOpacity,
    transition: fadeOut ? "opacity 0.7s ease" : "opacity 1s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <div style={baseStyle}>
      {/* Skip */}
      <button
        type="button"
        onClick={handleSkip}
        style={{
          position: "absolute",
          top: 24,
          right: 24,
          zIndex: 10001,
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.12)",
          borderRadius: 4,
          color: "rgba(255,255,255,0.35)",
          fontFamily: "JetBrains Mono, monospace",
          fontSize: 10,
          letterSpacing: "0.15em",
          padding: "6px 14px",
          cursor: "pointer",
          transition: "all 0.2s ease",
        }}
        onMouseEnter={(e) => {
          (e.target as HTMLButtonElement).style.color = "rgba(255,255,255,0.7)";
        }}
        onMouseLeave={(e) => {
          (e.target as HTMLButtonElement).style.color =
            "rgba(255,255,255,0.35)";
        }}
      >
        SKIP
      </button>

      {/* Progress bar */}
      <div
        style={{
          position: "absolute",
          bottom: 32,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: 8,
          zIndex: 10001,
        }}
      >
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            style={{
              width: i === scene ? 24 : 6,
              height: 4,
              borderRadius: 2,
              background:
                i < scene
                  ? "rgba(245,158,11,0.6)"
                  : i === scene
                    ? "rgba(245,158,11,1)"
                    : "rgba(255,255,255,0.12)",
              transition: "all 0.4s ease",
              boxShadow: i === scene ? "0 0 8px rgba(245,158,11,0.6)" : "none",
            }}
          />
        ))}
      </div>

      {/* ─── SCENE 0: IT'S NOT AI LABS ─── */}
      {scene === 0 && (
        <div style={sceneWrap}>
          <Scene0Canvas opacity={sceneOpacity} />
          <div
            style={{
              position: "relative",
              zIndex: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 24,
            }}
          >
            <img
              src="/assets/generated/its-not-ai-labs-logo-v2-transparent.dim_900x300.png"
              alt="It's Not AI Labs"
              style={{
                width: "min(720px, 88vw)",
                height: "auto",
                animation:
                  "logo-slam-in 1.2s cubic-bezier(0.22,1,0.36,1) forwards",
                filter:
                  "drop-shadow(0 0 60px rgba(6,182,212,0.35)) drop-shadow(0 0 120px rgba(255,255,255,0.1))",
              }}
            />
            <div
              style={{
                width: "min(720px, 88vw)",
                height: 1,
                background:
                  "linear-gradient(90deg, transparent, rgba(6,182,212,0.5), rgba(255,255,255,0.3), rgba(6,182,212,0.5), transparent)",
                animation: "line-expand 1s 0.8s both",
              }}
            />
            <p
              style={{
                color: "rgba(255,255,255,0.4)",
                fontSize: "clamp(0.6rem, 1.2vw, 0.85rem)",
                fontFamily: "JetBrains Mono, monospace",
                letterSpacing: "0.4em",
                textTransform: "uppercase",
                animation: "text-fade-in 0.8s 1.2s both",
                margin: 0,
              }}
            >
              Sovereign Intelligence. Internet Computer.
            </p>
          </div>
        </div>
      )}

      {/* ─── SCENE 1: THE WORLD ─── */}
      {scene === 1 && (
        <div style={{ ...sceneWrap, flexDirection: "column" }}>
          <Scene1Canvas opacity={sceneOpacity} />
          <div
            style={{
              position: "relative",
              zIndex: 2,
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              padding: "clamp(40px,6vw,80px)",
              pointerEvents: "none",
            }}
          >
            <p
              style={{
                color: "rgba(255,255,255,0.85)",
                fontSize: "clamp(1rem, 2.5vw, 1.8rem)",
                fontFamily: "JetBrains Mono, monospace",
                fontWeight: 300,
                letterSpacing: "0.04em",
                maxWidth: 540,
                animation: "text-fade-in 0.9s 0.4s both",
              }}
            >
              The world built software.
            </p>
            <p
              style={{
                color: "#ffffff",
                fontSize: "clamp(1.6rem, 4.5vw, 3.2rem)",
                fontFamily: "JetBrains Mono, monospace",
                fontWeight: 700,
                letterSpacing: "0.02em",
                alignSelf: "center",
                textAlign: "center",
                textShadow: "0 0 40px rgba(6,182,212,0.4)",
                animation: "text-slam 0.6s 1s both",
              }}
            >
              We built an organism.
            </p>
            <p
              style={{
                color: "rgba(6,182,212,0.85)",
                fontSize: "clamp(0.8rem, 2vw, 1.3rem)",
                fontFamily: "JetBrains Mono, monospace",
                fontStyle: "italic",
                letterSpacing: "0.08em",
                alignSelf: "flex-end",
                animation: "text-fade-in 0.9s 1.8s both",
              }}
            >
              There is a difference.
            </p>
          </div>
        </div>
      )}

      {/* ─── SCENE 2: ORO MATERIALIZES ─── */}
      {scene === 2 && (
        <div style={{ ...sceneWrap, flexDirection: "column" }}>
          <Scene2Canvas opacity={sceneOpacity} />
          <div
            style={{
              position: "relative",
              zIndex: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 12,
              marginTop: "52vh",
            }}
          >
            <h1
              style={{
                color: "#f59e0b",
                fontSize: "clamp(3.5rem, 9vw, 7rem)",
                fontFamily: "JetBrains Mono, monospace",
                fontWeight: 700,
                letterSpacing: "0.5em",
                textShadow:
                  "0 0 40px rgba(245,158,11,0.9), 0 0 80px rgba(245,158,11,0.5), 0 0 160px rgba(245,158,11,0.2)",
                margin: 0,
                animation: "text-slam 0.8s 0.6s both",
              }}
            >
              ORO
            </h1>
            <div
              style={{
                width: 200,
                height: 1,
                background:
                  "linear-gradient(90deg, transparent, rgba(245,158,11,0.7), transparent)",
                animation: "line-expand 0.8s 1s both",
              }}
            />
            <p
              style={{
                color: "rgba(255,255,255,0.55)",
                fontSize: "clamp(0.65rem, 1.3vw, 1rem)",
                fontFamily: "JetBrains Mono, monospace",
                letterSpacing: "0.2em",
                animation: "text-fade-in 0.7s 1.2s both",
                margin: 0,
              }}
            >
              Sovereign Intelligence. Internet Computer.
            </p>
            <div style={{ height: 30, display: "flex", alignItems: "center" }}>
              {capabilityIdx >= 0 && capabilityIdx < capabilities.length && (
                <span
                  key={capabilityIdx}
                  style={{
                    color: "rgba(245,158,11,0.9)",
                    fontSize: "clamp(0.65rem, 1.1vw, 0.9rem)",
                    fontFamily: "JetBrains Mono, monospace",
                    letterSpacing: "0.3em",
                    textTransform: "uppercase",
                    animation: "cap-flash 0.6s ease both",
                    textShadow: "0 0 20px rgba(245,158,11,0.7)",
                  }}
                >
                  — {capabilities[capabilityIdx]} —
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ─── SCENE 3: THE ARCHITECT ─── */}
      {scene === 3 && (
        <div style={{ ...sceneWrap, alignItems: "stretch" }}>
          <Scene3Canvas opacity={sceneOpacity} />
          {/* Left: portrait zone with animated frame */}
          <div
            style={{
              flex: "0 0 38%",
              position: "relative",
              overflow: "hidden",
              animation: "slide-in-left 1.1s cubic-bezier(0.22,1,0.36,1) both",
            }}
          >
            <img
              src="/assets/generated/founder-portrait.dim_800x1000.jpg"
              alt="Founder"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center top",
                filter: "contrast(1.1) brightness(0.85)",
                animation: "portrait-drift 6s ease-in-out infinite alternate",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to right, transparent 55%, rgba(0,0,0,0.95) 100%), linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 30%)",
              }}
            />
            {/* Frame lines */}
            <div
              style={{
                position: "absolute",
                top: 24,
                left: 24,
                width: 40,
                height: 40,
                borderTop: "2px solid rgba(245,158,11,0.6)",
                borderLeft: "2px solid rgba(245,158,11,0.6)",
                animation: "text-fade-in 0.5s 0.2s both",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: 24,
                right: 24,
                width: 40,
                height: 40,
                borderBottom: "2px solid rgba(245,158,11,0.6)",
                borderRight: "2px solid rgba(245,158,11,0.6)",
                animation: "text-fade-in 0.5s 0.4s both",
              }}
            />
          </div>
          {/* Right: identity text */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: "60px min(80px,5vw)",
              gap: 14,
              position: "relative",
            }}
          >
            <div
              style={{
                width: 50,
                height: 2,
                background: "rgba(245,158,11,0.7)",
                animation: "line-expand 0.5s 0.3s both",
              }}
            />
            <h2
              style={{
                color: "#ffffff",
                fontSize: "clamp(0.9rem, 2.2vw, 1.6rem)",
                fontFamily: "JetBrains Mono, monospace",
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                margin: 0,
                animation: "text-slam 0.7s 0.5s both",
              }}
            >
              Alfredo Medina Hernandez
            </h2>
            <p
              style={{
                color: "#f59e0b",
                fontSize: "clamp(0.8rem, 1.6vw, 1.15rem)",
                fontFamily: "JetBrains Mono, monospace",
                fontWeight: 500,
                letterSpacing: "0.1em",
                margin: 0,
                animation: "text-fade-in 0.8s 0.9s both",
              }}
            >
              Founder. Vision Architect.
            </p>
            <p
              style={{
                color: "rgba(6,182,212,0.7)",
                fontSize: "clamp(0.7rem, 1.3vw, 0.95rem)",
                fontFamily: "JetBrains Mono, monospace",
                letterSpacing: "0.15em",
                margin: 0,
                animation: "text-fade-in 0.8s 1.1s both",
              }}
            >
              Dallas, TX
            </p>
            <div
              style={{
                width: 80,
                height: 1,
                background: "rgba(255,255,255,0.08)",
                animation: "text-fade-in 0.5s 1.3s both",
              }}
            />
            <p
              style={{
                color: "rgba(255,255,255,0.8)",
                fontSize: "clamp(0.9rem, 1.7vw, 1.15rem)",
                fontFamily: "JetBrains Mono, monospace",
                fontStyle: "italic",
                fontWeight: 300,
                lineHeight: 1.75,
                margin: 0,
                animation: "text-fade-in 1s 1.5s both",
                maxWidth: 460,
              }}
            >
              He didn't build software.
              <br />
              He built the future.
            </p>
            <p
              style={{
                color: "rgba(6,182,212,0.5)",
                fontSize: "clamp(0.65rem, 1vw, 0.82rem)",
                fontFamily: "JetBrains Mono, monospace",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                margin: 0,
                animation: "text-fade-in 0.8s 2.4s both",
              }}
            >
              Bringing the future now
            </p>
          </div>
        </div>
      )}

      {/* ─── SCENE 4: MEDINA TECH SEAL ─── */}
      {scene === 4 && (
        <div style={{ ...sceneWrap, flexDirection: "column", gap: 0 }}>
          <Scene4Canvas opacity={sceneOpacity} />
          <div
            style={{
              position: "relative",
              zIndex: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 24,
            }}
          >
            <img
              src="/assets/generated/medina-tech-logo-v2-transparent.dim_900x400.png"
              alt="Medina Tech"
              style={{
                width: "min(520px, 72vw)",
                height: "auto",
                animation: "logo-slam-in 1s cubic-bezier(0.22,1,0.36,1) both",
                filter:
                  "drop-shadow(0 0 40px rgba(245,158,11,0.5)) drop-shadow(0 0 80px rgba(245,158,11,0.2))",
              }}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 10,
              }}
            >
              <h2
                style={{
                  color: "#ffffff",
                  fontSize: "clamp(1.1rem, 2.8vw, 2.2rem)",
                  fontFamily: "JetBrains Mono, monospace",
                  fontWeight: 700,
                  letterSpacing: "0.35em",
                  margin: 0,
                  animation: "text-slam 0.8s 0.5s both",
                }}
              >
                MEDINA TECH
              </h2>
              <div
                style={{
                  width: 160,
                  height: 1,
                  background:
                    "linear-gradient(90deg, transparent, rgba(245,158,11,0.7), transparent)",
                  animation: "line-expand 0.7s 0.8s both",
                }}
              />
              <p
                style={{
                  color: "rgba(255,255,255,0.6)",
                  fontSize: "clamp(0.75rem, 1.5vw, 1.05rem)",
                  fontFamily: "JetBrains Mono, monospace",
                  fontStyle: "italic",
                  letterSpacing: "0.04em",
                  margin: 0,
                  animation: "text-fade-in 0.8s 1s both",
                }}
              >
                We didn't bite the apple.
              </p>
              <p
                style={{
                  color: "#f59e0b",
                  fontSize: "clamp(0.85rem, 1.6vw, 1.15rem)",
                  fontFamily: "JetBrains Mono, monospace",
                  fontStyle: "italic",
                  letterSpacing: "0.06em",
                  margin: 0,
                  textShadow: "0 0 24px rgba(245,158,11,0.5)",
                  animation: "text-fade-in 0.8s 1.5s both",
                }}
              >
                We waited for the orange.
              </p>
              <p
                style={{
                  color: "rgba(6,182,212,0.5)",
                  fontSize: "clamp(0.65rem, 1vw, 0.85rem)",
                  fontFamily: "JetBrains Mono, monospace",
                  letterSpacing: "0.28em",
                  textTransform: "uppercase",
                  margin: 0,
                  animation: "text-fade-in 0.8s 2s both",
                }}
              >
                Bringing the future now.
              </p>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes logo-slam-in {
          0% { opacity: 0; transform: perspective(900px) translateZ(-200px) scale(0.6); }
          60% { opacity: 1; transform: perspective(900px) translateZ(10px) scale(1.04); }
          100% { opacity: 1; transform: perspective(900px) translateZ(0) scale(1); }
        }
        @keyframes text-slam {
          0% { opacity: 0; transform: translateY(30px) scale(0.9); }
          60% { opacity: 1; transform: translateY(-4px) scale(1.02); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes text-fade-in {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes line-expand {
          from { transform: scaleX(0); opacity: 0; }
          to { transform: scaleX(1); opacity: 1; }
        }
        @keyframes cap-flash {
          0% { opacity: 0; transform: scale(0.85) translateY(6px); }
          40% { opacity: 1; transform: scale(1.06) translateY(-2px); }
          100% { opacity: 0.8; transform: scale(1) translateY(0); }
        }
        @keyframes slide-in-left {
          from { transform: translateX(-80px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes portrait-drift {
          from { transform: scale(1.02) translateY(0); }
          to { transform: scale(1.05) translateY(-12px); }
        }
      `}</style>
    </div>
  );
}
