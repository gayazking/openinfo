import { useEffect, useRef } from "react";

/**
 * Tech background: grid + aurora glow blobs + particle network on canvas.
 *
 * Performance notes:
 * - Glows are pre-blurred radial gradients (no CSS `filter: blur()` — that
 *   re-renders a huge GPU texture every frame and is the #1 jank source).
 * - Aurora drift uses transform-only keyframes (compositor thread).
 * - Canvas renders at DPR 1 (a blurry-ish particle field doesn't need retina),
 *   pauses when the tab is hidden, and uses a desynchronized context.
 * - Respects prefers-reduced-motion.
 */
export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { desynchronized: true, alpha: true });
    if (!ctx) return;

    let raf = 0;
    let running = true;
    let width = 0;
    let height = 0;

    type P = { x: number; y: number; vx: number; vy: number };
    let particles: P[] = [];

    const mouse = { x: -9999, y: -9999 };
    const LINK_DIST = 110;
    const LINK_DIST_SQ = LINK_DIST * LINK_DIST;

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      // DPR 1 on purpose — half the pixels of retina, no visible difference
      // for 1.4px dots, and a much cheaper clearRect + stroke pass.
      canvas!.width = width;
      canvas!.height = height;
      canvas!.style.width = width + "px";
      canvas!.style.height = height + "px";

      const count = Math.min(70, Math.floor((width * height) / 24000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
      }));
    }

    function step() {
      if (!running) return;
      ctx!.clearRect(0, 0, width, height);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // gentle attraction to the cursor
        const dxm = mouse.x - p.x;
        const dym = mouse.y - p.y;
        if (dxm * dxm + dym * dym < 140 * 140) {
          p.x += dxm * 0.0015;
          p.y += dym * 0.0015;
        }
      }

      // Links — squared distances (no sqrt), alpha bucketed into 5 levels so
      // strokes batch into few style changes instead of one per segment.
      const buckets: number[][] = [[], [], [], [], []];
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < LINK_DIST_SQ) {
            const t = 1 - d2 / LINK_DIST_SQ;
            const bucket = Math.min(4, (t * 5) | 0);
            buckets[bucket].push(a.x, a.y, b.x, b.y);
          }
        }
      }
      ctx!.lineWidth = 0.6;
      for (let bi = 0; bi < 5; bi++) {
        const seg = buckets[bi];
        if (!seg.length) continue;
        ctx!.strokeStyle = `rgba(34, 211, 238, ${(0.08 + bi * 0.09).toFixed(2)})`;
        ctx!.beginPath();
        for (let k = 0; k < seg.length; k += 4) {
          ctx!.moveTo(seg[k], seg[k + 1]);
          ctx!.lineTo(seg[k + 2], seg[k + 3]);
        }
        ctx!.stroke();
      }

      ctx!.fillStyle = "rgba(168, 85, 247, 0.8)";
      ctx!.beginPath();
      for (const p of particles) {
        ctx!.moveTo(p.x + 1.4, p.y);
        ctx!.arc(p.x, p.y, 1.4, 0, Math.PI * 2);
      }
      ctx!.fill();

      raf = requestAnimationFrame(step);
    }

    function onMove(e: PointerEvent) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    }
    function onLeave() {
      mouse.x = -9999;
      mouse.y = -9999;
    }
    function onVisibility() {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!running) {
        running = true;
        raf = requestAnimationFrame(step);
      }
    }

    resize();
    step();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Base dark background */}
      <div className="absolute inset-0 bg-ink-900" />

      {/* Grid */}
      <div className="absolute inset-0 bg-grid-fade [background-size:46px_46px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />

      {/* Aurora glow blobs — radial gradients (pre-blurred, zero filter cost),
          drifting with transform-only animations on the compositor thread. */}
      <div
        className="absolute -top-40 -left-40 h-[50rem] w-[50rem] animate-aurora rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(34,211,238,0.14) 0%, rgba(34,211,238,0.05) 40%, transparent 65%)",
        }}
      />
      <div
        className="absolute top-1/4 -right-48 h-[46rem] w-[46rem] animate-aurora-2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(168,85,247,0.13) 0%, rgba(168,85,247,0.05) 40%, transparent 65%)",
        }}
      />
      <div
        className="absolute -bottom-40 left-1/4 h-[44rem] w-[44rem] animate-aurora-3 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(59,130,246,0.12) 0%, rgba(59,130,246,0.04) 40%, transparent 65%)",
        }}
      />

      {/* Particles */}
      <canvas ref={canvasRef} className="absolute inset-0 opacity-70" />

      {/* Vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ink-900" />
    </div>
  );
}
