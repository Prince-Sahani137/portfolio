"use client";

import { useEffect, useRef } from "react";
import { fxEnabled } from "@/lib/fx-bus";
import { FX, loadCore, type FxName } from "@/lib/fx-registry";

type Crop = { x: number; y: number; w: number; h: number };

/**
 * A looping pixelfx effect drawn into its own small canvas, e.g. the campfire in the footer.
 * It only animates while on screen, and holds a still frame for people who prefer reduced motion.
 */
export function PixelSprite({
  effect,
  scale = 2,
  crop,
  className = "",
  onActivate,
}: {
  effect: FxName;
  scale?: number;
  /** Visible window in art pixels (defaults to the effect's whole frame). */
  crop: Crop;
  className?: string;
  onActivate?: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    let raf = 0;
    let disposed = false;
    let visible = false;
    let cleanup = () => {};

    (async () => {
      const [core, mod] = await Promise.all([loadCore(), FX[effect].load()]);
      if (disposed) return;
      const probe = core.createFx(mod, {});
      const [w, h] = probe.meta.size;
      const [ox, oy] = probe.meta.origin;
      const options: Record<string, unknown> = { x: ox, y: oy };
      if (FX[effect].palette) options.palette = FX[effect].palette;
      const fx = core.createFx(mod, options);
      const frame = core.createFrame(w, h);
      const image = ctx.createImageData(w, h);
      const still = !fxEnabled();
      let last = performance.now();

      const draw = () => {
        core.clearFrame(frame);
        fx.draw(frame);
        core.composite(frame, image.data, null);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.putImageData(image, -crop.x, -crop.y, crop.x, crop.y, crop.w, crop.h);
      };

      const tick = (now: number) => {
        const dt = Math.min(0.05, (now - last) / 1000);
        last = now;
        fx.update(dt);
        draw();
        raf = visible ? requestAnimationFrame(tick) : 0;
      };

      if (still) {
        for (let t = 0; t < 1.2; t += 1 / 30) fx.update(1 / 30);
        draw();
        return;
      }

      const observer = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting && !document.hidden;
        if (visible && raf === 0) {
          last = performance.now();
          raf = requestAnimationFrame(tick);
        }
      });
      observer.observe(canvas);
      const onVisibility = () => {
        visible = !document.hidden && canvas.getBoundingClientRect().bottom > 0;
        if (visible && raf === 0) {
          last = performance.now();
          raf = requestAnimationFrame(tick);
        }
      };
      document.addEventListener("visibilitychange", onVisibility);
      cleanup = () => {
        observer.disconnect();
        document.removeEventListener("visibilitychange", onVisibility);
      };
    })();

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      cleanup();
    };
  }, [effect, crop.x, crop.y, crop.w, crop.h]);

  return (
    <canvas
      ref={canvasRef}
      width={crop.w}
      height={crop.h}
      aria-hidden="true"
      onClick={onActivate}
      style={{ width: crop.w * scale, height: crop.h * scale }}
      className={`[image-rendering:pixelated] ${className}`}
    />
  );
}
