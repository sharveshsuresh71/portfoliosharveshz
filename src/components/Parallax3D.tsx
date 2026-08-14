import { useEffect, useRef } from "react";

type Props = {
  src: string;
  alt: string;
  /** classes for the <img> itself */
  imgClassName?: string;
  /** classes for the positioning wrapper */
  className?: string;
  /** tilt strength in degrees */
  strength?: number;
};

/**
 * Wraps an image in a 3D perspective layer whose tilt/drift follows the
 * section's scroll progress, with the pointer adding a subtle offset.
 *
 * Motion is smoothed in a single requestAnimationFrame loop: scroll and
 * pointer events only record a target, and the loop eases the rendered
 * transform toward it (and parks itself when it settles), so scrolling
 * never triggers per-event React renders or layout thrash.
 */
export function Parallax3D({ src, alt, imgClassName = "", className = "", strength = 10 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const el = ref.current;
    const img = imgRef.current;
    if (!el || !img) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const pointer = { dx: 0, dy: 0 };
    const target = { rx: 0, ry: 0, tz: 0, px: 0, py: 0 };
    const current = { rx: 0, ry: 0, tz: 0, px: 0, py: 0 };

    let rect = el.getBoundingClientRect();
    let rectDirty = true;
    let visible = true;
    let frame = 0;
    let running = false;

    // Only recompute geometry when it can actually have changed.
    const measure = () => {
      rect = el.getBoundingClientRect();
      rectDirty = false;
    };

    const computeTarget = () => {
      if (rectDirty) measure();
      const top = rect.top;
      const height = rect.height;
      if (top + height < -200 || top > window.innerHeight + 200) return;
      const cy = top + height / 2;
      const progress = Math.max(
        -1,
        Math.min(1, (window.innerHeight / 2 - cy) / ((window.innerHeight + height) / 2)),
      );
      target.rx = progress * strength - pointer.dy * strength * 0.35;
      target.ry = pointer.dx * strength * 0.5;
      target.tz = 60 - Math.abs(progress) * 60;
      target.px = pointer.dx * strength * 0.8;
      target.py = -progress * strength * 3 + pointer.dy * strength * 0.4;
    };

    const EASE = 0.12;
    const tick = () => {
      computeTarget();
      let moving = false;
      for (const k of ["rx", "ry", "tz", "px", "py"] as const) {
        const diff = target[k] - current[k];
        if (Math.abs(diff) > 0.01) {
          current[k] += diff * EASE;
          moving = true;
        } else {
          current[k] = target[k];
        }
      }
      img.style.transform =
        `rotateX(${current.rx.toFixed(3)}deg) rotateY(${current.ry.toFixed(3)}deg) ` +
        `translate3d(${current.px.toFixed(2)}px, ${current.py.toFixed(2)}px, ${current.tz.toFixed(2)}px) scale(1.08)`;

      if (moving && visible) {
        frame = requestAnimationFrame(tick);
      } else {
        running = false;
      }
    };

    const start = () => {
      if (running || !visible) return;
      running = true;
      frame = requestAnimationFrame(tick);
    };

    // Scroll/resize handlers do no layout work — they just invalidate + wake the loop.
    const onScroll = () => {
      rectDirty = true;
      start();
    };
    const onResize = () => {
      rectDirty = true;
      start();
    };
    const onMove = (e: PointerEvent) => {
      pointer.dx = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
      pointer.dy = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
      start();
    };

    // Pause entirely when the section is off-screen.
    const io = new IntersectionObserver(
      (entries) => {
        visible = entries.some((e) => e.isIntersecting);

        rectDirty = true;
        if (visible) start();
      },
      { rootMargin: "200px" },
    );
    io.observe(el);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    window.addEventListener("pointermove", onMove, { passive: true });
    start();

    return () => {
      cancelAnimationFrame(frame);
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onMove);
    };
  }, [strength]);

  return (
    <div
      ref={ref}
      aria-hidden
      className={`pointer-events-none [perspective:1200px] ${className}`}
      style={{ transformStyle: "preserve-3d" }}
    >
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        loading="lazy"
        className={`size-full will-change-transform ${imgClassName}`}
        style={{ transform: "scale(1.08)", backfaceVisibility: "hidden" }}
      />
    </div>
  );
}
