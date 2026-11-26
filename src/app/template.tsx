"use client";

import { useEffect, useRef } from "react";

/**
 * Re-mounts on every navigation, which gives us two things:
 *  1. a short enter transition between pages
 *  2. scroll-reveal: the top-level blocks of each page (`main > *`) and anything marked
 *     `data-reveal` fade up as they enter the viewport.
 * The hidden starting state lives in CSS under `html.rv`, which a tiny inline script in the
 * layout only sets when the visitor has not asked for reduced motion.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    document.documentElement.dataset.rvReady = "1";
    if (!root) return;

    const targets = Array.from(
      root.querySelectorAll<HTMLElement>("main > *, [data-reveal]"),
    );

    const observer = new IntersectionObserver(
      (entries) => {
        let order = 0;
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          el.style.setProperty("--reveal-delay", `${Math.min(order, 5) * 70}ms`);
          el.classList.add("is-revealed");
          observer.unobserve(el);
          order += 1;
        }
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.06 },
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="page-shell">
      {children}
    </div>
  );
}
