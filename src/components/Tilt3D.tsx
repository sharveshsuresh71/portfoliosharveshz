import { useRef, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  /** max rotation in degrees */
  max?: number;
  /** how far the content floats toward the viewer, px */
  lift?: number;
  glare?: boolean;
};

/**
 * Lightweight pointer-driven 3D tilt. Mutates the DOM directly (no re-renders)
 * and eases toward the target inside a single rAF loop.
 */
export function Tilt3D({ children, className = "", max = 9, lift = 22, glare = true }: Props) {
  const wrap = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const sheen = useRef<HTMLDivElement>(null);
  const raf = useRef<number | null>(null);
  const target = useRef({ x: 0, y: 0, on: 0 });
  const cur = useRef({ x: 0, y: 0, on: 0 });

  const loop = () => {
    const c = cur.current;
    const t = target.current;
    c.x += (t.x - c.x) * 0.12;
    c.y += (t.y - c.y) * 0.12;
    c.on += (t.on - c.on) * 0.12;

    if (inner.current) {
      inner.current.style.transform = `rotateX(${(-c.y * max).toFixed(3)}deg) rotateY(${(c.x * max).toFixed(3)}deg) translateZ(${(c.on * lift).toFixed(2)}px)`;
    }
    if (sheen.current) {
      sheen.current.style.opacity = (c.on * 0.5).toFixed(3);
      sheen.current.style.background = `radial-gradient(60% 60% at ${(50 + c.x * 40).toFixed(1)}% ${(50 - c.y * 40).toFixed(1)}%, color-mix(in oklab, var(--primary) 45%, transparent), transparent 70%)`;
    }

    const done =
      Math.abs(t.x - c.x) < 0.001 && Math.abs(t.y - c.y) < 0.001 && Math.abs(t.on - c.on) < 0.001;
    if (done) {
      raf.current = null;
      return;
    }
    raf.current = requestAnimationFrame(loop);
  };

  const kick = () => {
    if (raf.current == null) raf.current = requestAnimationFrame(loop);
  };

  return (
    <div
      ref={wrap}
      className={`[perspective:1100px] ${className}`}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        target.current.x = (e.clientX - r.left) / r.width - 0.5;
        target.current.y = (e.clientY - r.top) / r.height - 0.5;
        target.current.on = 1;
        kick();
      }}
      onPointerLeave={() => {
        target.current = { x: 0, y: 0, on: 0 };
        kick();
      }}
    >
      <div
        ref={inner}
        className="relative h-full [transform-style:preserve-3d] will-change-transform"
      >
        {glare && (
          <div
            ref={sheen}
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-[1] rounded-[inherit] opacity-0 blur-2xl"
          />
        )}
        {children}
      </div>
    </div>
  );
}
