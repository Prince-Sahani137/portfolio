"use client";

import { useEffect, useRef } from "react";
import { fxEnabled, type PlayDetail } from "@/lib/fx-bus";
import { FX, loadCore, type PixelCore, type PixelFxInstance } from "@/lib/fx-registry";

// One art pixel = SCALE screen pixels.
const SCALE = 3;

const IGNORE_CLICK =
  "a,button,input,textarea,select,summary,label,[role='dialog'],[data-no-fx]";

/**
 * A full-screen, click-through canvas that plays pixelfx effects on demand:
 * a spark where you click, confetti when you sign the guestbook, and whatever
 * you summon from the terminal. It sleeps (no animation loop) when nothing is playing.
 */
export function FxLayer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    let core: PixelCore | null = null;
    let frame: ReturnType<PixelCore["createFrame"]> | null = null;
    let image: ImageData | null = null;
    let active: PixelFxInstance[] = [];
    let raf = 0;
    let last = 0;
    let disposed = false;

    const resize = () => {
      canvas.width = Math.max(1, Math.ceil(window.innerWidth / SCALE));
      canvas.height = Math.max(1, Math.ceil(window.innerHeight / SCALE));
      image = ctx.createImageData(canvas.width, canvas.height);
      frame = core ? core.createFrame(canvas.width, canvas.height) : null;
    };

    const tick = (now: number) => {
      if (!core || !frame || !image) return;
      const dt = Math.min(0.05, (now - last) / 1000 || 0.016);
      last = now;
      core.clearFrame(frame);
      for (const fx of active) {
        fx.update(dt);
        fx.draw(frame);
      }
      active = active.filter((fx) => !fx.done());
      core.composite(frame, image.data, null);
      ctx.putImageData(image, 0, 0);
      if (active.length > 0) {
        raf = requestAnimationFrame(tick);
      } else {
        raf = 0;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };

    const start = () => {
      if (raf === 0) {
        last = performance.now();
        raf = requestAnimationFrame(tick);
      }
    };

    const play = async ({ name, x, y, palette }: PlayDetail) => {
      const entry = FX[name];
      if (!entry) return;
      const [loadedCore, mod] = await Promise.all([loadCore(), entry.load()]);
      if (disposed) return;
      if (!core) {
        core = loadedCore;
        resize();
      }
      if (!frame) return;
      const options: Record<string, unknown> = {
        x: x / SCALE,
        y: y / SCALE,
        seed: Math.floor(Math.random() * 1000),
      };
      const colors = palette ?? entry.palette;
      if (colors) options.palette = colors;
      if (name === "spark") options.aim = (Math.random() - 0.5) * 1.2;
      const fx = core.createFx(mod, options);
      // looping effects play for a few seconds, then fade out on their own
      if (fx.meta.loop) window.setTimeout(() => fx.stop(), 4200);
      active.push(fx);
      start();
    };

    const onPlay = (event: Event) => void play((event as CustomEvent<PlayDetail>).detail);

    const onClick = (event: MouseEvent) => {
      if (!fxEnabled() || event.button !== 0) return;
      const target = event.target as Element | null;
      if (target?.closest?.(IGNORE_CLICK)) return;
      void play({ name: "spark", x: event.clientX, y: event.clientY });
    };

    window.addEventListener("pixelfx:play", onPlay);
    window.addEventListener("resize", resize);
    document.addEventListener("click", onClick);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("pixelfx:play", onPlay);
      window.removeEventListener("resize", resize);
      document.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[70] h-dvh w-screen [image-rendering:pixelated]"
    />
  );
}
