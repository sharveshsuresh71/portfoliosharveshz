export function BlackHole({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none relative aspect-square ${className}`} aria-hidden="true">
      {/* outer halo */}
      <div
        className="absolute inset-0 rounded-full blur-3xl opacity-60"
        style={{ background: "var(--gradient-disk)", animation: "spin-slow 34s linear infinite" }}
      />
      {/* accretion disk */}
      <div
        className="absolute inset-[8%] rounded-full blur-xl"
        style={{ background: "var(--gradient-disk)", animation: "spin-slow 18s linear infinite" }}
      />
      {/* thin bright ring */}
      <div
        className="absolute inset-[16%] rounded-full opacity-90 blur-[2px]"
        style={{
          background: "var(--gradient-disk)",
          animation: "spin-slow 9s linear infinite reverse",
          mask: "radial-gradient(circle, transparent 58%, #000 62%, #000 78%, transparent 82%)",
          WebkitMask:
            "radial-gradient(circle, transparent 58%, #000 62%, #000 78%, transparent 82%)",
        }}
      />
      {/* event horizon */}
      <div
        className="absolute inset-[26%] rounded-full"
        style={{
          background: "radial-gradient(circle at 50% 50%, #000 62%, oklch(0.08 0.015 275) 100%)",
          boxShadow: "0 0 90px 10px oklch(0.82 0.17 55 / 0.35), inset 0 0 60px 10px #000",
        }}
      />
      {/* lensing pulse */}
      <div
        className="absolute inset-[22%] rounded-full border border-primary/40"
        style={{ animation: "pulse-ring 4.5s ease-out infinite" }}
      />
    </div>
  );
}

export function Starfield() {
  const stars = Array.from({ length: 140 }, (_, i) => {
    const seed = (i * 9301 + 49297) % 233280;
    const r = seed / 233280;
    const r2 = ((i * 4517 + 7919) % 10007) / 10007;
    return {
      top: `${(r * 100).toFixed(2)}%`,
      left: `${(r2 * 100).toFixed(2)}%`,
      size: r2 > 0.92 ? 2.6 : r2 > 0.6 ? 1.6 : 1,
      delay: `${(r * 6).toFixed(2)}s`,
      dur: `${(3 + r2 * 5).toFixed(2)}s`,
    };
  });

  const shooting = [
    { top: "12%", left: "-10%", delay: "1.5s", dur: "7s" },
    { top: "38%", left: "-20%", delay: "5s", dur: "9s" },
    { top: "68%", left: "-15%", delay: "9s", dur: "8s" },
  ];

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      {/* deep space base — never pure black */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.18 0.04 268) 0%, oklch(0.14 0.03 265) 45%, oklch(0.16 0.035 285) 100%)",
        }}
      />

      {/* drifting aurora nebula clouds */}
      <div
        className="absolute -inset-1/4 opacity-70 blur-[90px]"
        style={{
          background:
            "radial-gradient(38% 40% at 22% 28%, oklch(0.55 0.15 285 / 0.5), transparent 70%), radial-gradient(34% 38% at 78% 22%, oklch(0.62 0.13 210 / 0.45), transparent 70%), radial-gradient(40% 42% at 62% 78%, oklch(0.6 0.12 195 / 0.32), transparent 70%)",
          animation: "aurora 26s ease-in-out infinite alternate",
        }}
      />
      <div
        className="absolute -inset-1/4 opacity-50 blur-[110px]"
        style={{
          background:
            "radial-gradient(36% 40% at 70% 40%, oklch(0.5 0.15 300 / 0.4), transparent 70%), radial-gradient(30% 34% at 18% 76%, oklch(0.55 0.14 220 / 0.4), transparent 70%)",
          animation: "aurora 34s ease-in-out -12s infinite alternate-reverse",
        }}
      />

      {/* perspective grid floor — adds real depth */}
      <div
        className="absolute inset-x-0 bottom-0 h-[46vh] opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(to right, oklch(0.8 0.12 205 / 0.5) 1px, transparent 1px), linear-gradient(to bottom, oklch(0.8 0.12 205 / 0.5) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          transform: "perspective(520px) rotateX(66deg)",
          transformOrigin: "bottom center",
          maskImage: "linear-gradient(to top, #000, transparent 78%)",
          WebkitMaskImage: "linear-gradient(to top, #000, transparent 78%)",
        }}
      />

      {/* faint horizon glow */}
      <div
        className="absolute inset-x-0 bottom-0 h-1/3"
        style={{
          background: "linear-gradient(to top, oklch(0.34 0.08 275 / 0.45), transparent 85%)",
        }}
      />

      {/* stars */}
      {stars.map((s, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-foreground"
          style={{
            top: s.top,
            left: s.left,
            width: s.size,
            height: s.size,
            animation: `twinkle ${s.dur} ease-in-out ${s.delay} infinite`,
          }}
        />
      ))}

      {/* shooting stars */}
      {shooting.map((s, i) => (
        <span
          key={`shoot-${i}`}
          className="absolute h-px w-40"
          style={{
            top: s.top,
            left: s.left,
            background:
              "linear-gradient(90deg, transparent, oklch(0.95 0.06 205 / 0.9), transparent)",
            animation: `shoot ${s.dur} linear ${s.delay} infinite`,
          }}
        />
      ))}

      {/* subtle vignette keeps text readable */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(125% 95% at 50% 40%, transparent 42%, oklch(0.1 0.025 268 / 0.7) 100%)",
        }}
      />
    </div>
  );
}

