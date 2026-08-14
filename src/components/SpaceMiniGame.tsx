import { useEffect, useRef, useState } from "react";

type Point = { x: number; y: number; vx: number; vy: number; r: number };

type Asteroid = Point & { spin: number; angle: number };

type Bullet = Point & { life: number };

export function SpaceMiniGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const keys = useRef<Record<string, boolean>>({});
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(() => {
    if (typeof window === "undefined") return 0;
    return Number(window.localStorage.getItem("void-runner-best") || 0);
  });
  const [lives, setLives] = useState(3);
  const [playing, setPlaying] = useState(false);
  const state = useRef({ score: 0, lives: 3, running: false, ship: { x: 0, y: 0 }, asteroids: [] as Asteroid[], bullets: [] as Bullet[], stars: [] as Point[], last: 0, spawn: 0 });

  const startGame = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    state.current = {
      score: 0,
      lives: 3,
      running: true,
      ship: { x: w * 0.2, y: h * 0.5 },
      asteroids: [],
      bullets: [],
      stars: Array.from({ length: 100 }, () => ({ x: Math.random() * w, y: Math.random() * h, vx: -(20 + Math.random() * 55), vy: 0, r: Math.random() * 1.8 + 0.3 })),
      last: performance.now(),
      spawn: 0,
    };
    setScore(0);
    setLives(3);
    setPlaying(true);
  };

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      keys.current[e.key.toLowerCase()] = true;
      if (["arrowup", "arrowdown", "arrowleft", "arrowright", " "].includes(e.key.toLowerCase())) e.preventDefault();
    };
    const up = (e: KeyboardEvent) => { keys.current[e.key.toLowerCase()] = false; };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => { window.removeEventListener("keydown", down); window.removeEventListener("keyup", up); };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(canvas.clientWidth * dpr);
      canvas.height = Math.floor(canvas.clientHeight * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const loop = (now: number) => {
      const s = state.current;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      const dt = Math.min((now - s.last) / 1000, 0.033);
      s.last = now;

      const bg = ctx.createLinearGradient(0, 0, w, h);
      bg.addColorStop(0, "#02030d");
      bg.addColorStop(0.55, "#080525");
      bg.addColorStop(1, "#02010a");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      for (const star of s.stars) {
        star.x += star.vx * dt;
        if (star.x < -5) { star.x = w + 5; star.y = Math.random() * h; }
        ctx.globalAlpha = 0.35 + star.r / 3;
        ctx.fillStyle = "#b9c8ff";
        ctx.beginPath(); ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2); ctx.fill();
      }
      ctx.globalAlpha = 1;

      if (s.running) {
        const speed = 290;
        if (keys.current.w || keys.current.arrowup) s.ship.y -= speed * dt;
        if (keys.current.s || keys.current.arrowdown) s.ship.y += speed * dt;
        if (keys.current.a || keys.current.arrowleft) s.ship.x -= speed * dt;
        if (keys.current.d || keys.current.arrowright) s.ship.x += speed * dt;
        s.ship.x = Math.max(26, Math.min(w - 26, s.ship.x));
        s.ship.y = Math.max(26, Math.min(h - 26, s.ship.y));

        if (keys.current[" "]) {
          const lastBullet = s.bullets[s.bullets.length - 1];
          if (!lastBullet || lastBullet.life < now - 130) s.bullets.push({ x: s.ship.x + 22, y: s.ship.y, vx: 620, vy: 0, r: 3, life: now });
        }

        s.spawn -= dt;
        if (s.spawn <= 0) {
          const r = 12 + Math.random() * 22;
          s.asteroids.push({ x: w + r, y: 30 + Math.random() * (h - 60), vx: -(120 + Math.random() * 150), vy: (Math.random() - 0.5) * 45, r, spin: (Math.random() - 0.5) * 2, angle: Math.random() * 6.28 });
          s.spawn = Math.max(0.25, 0.8 - s.score * 0.003);
        }

        s.bullets = s.bullets.filter((b) => {
          b.x += b.vx * dt; b.y += b.vy * dt;
          return b.x < w + 20;
        });
        s.asteroids.forEach((a) => { a.x += a.vx * dt; a.y += a.vy * dt; a.angle += a.spin * dt; });

        for (let i = s.asteroids.length - 1; i >= 0; i--) {
          const a = s.asteroids[i];
          let destroyed = false;
          for (let j = s.bullets.length - 1; j >= 0; j--) {
            const b = s.bullets[j];
            if (Math.hypot(a.x - b.x, a.y - b.y) < a.r + b.r) {
              s.asteroids.splice(i, 1); s.bullets.splice(j, 1); s.score += 10; destroyed = true; break;
            }
          }
          if (destroyed) continue;
          if (Math.hypot(a.x - s.ship.x, a.y - s.ship.y) < a.r + 17) {
            s.asteroids.splice(i, 1); s.lives -= 1;
            if (s.lives <= 0) {
              s.running = false;
              const nextBest = Math.max(best, s.score);
              setBest(nextBest);
              window.localStorage.setItem("void-runner-best", String(nextBest));
            }
          } else if (a.x < -a.r) s.asteroids.splice(i, 1);
        }
        setScore(s.score);
        setLives(s.lives);
      }

      // Ship
      ctx.save();
      ctx.translate(s.ship.x, s.ship.y);
      ctx.shadowBlur = 22; ctx.shadowColor = "#9b6cff";
      ctx.fillStyle = "#e9e6ff";
      ctx.beginPath(); ctx.moveTo(23, 0); ctx.lineTo(-15, -13); ctx.lineTo(-7, 0); ctx.lineTo(-15, 13); ctx.closePath(); ctx.fill();
      ctx.fillStyle = "#8d5cff"; ctx.beginPath(); ctx.moveTo(-12, -5); ctx.lineTo(-28, 0); ctx.lineTo(-12, 5); ctx.closePath(); ctx.fill();
      ctx.restore();

      for (const b of s.bullets) { ctx.shadowBlur = 14; ctx.shadowColor = "#62d7ff"; ctx.fillStyle = "#b8f0ff"; ctx.beginPath(); ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2); ctx.fill(); }
      ctx.shadowBlur = 0;
      for (const a of s.asteroids) {
        ctx.save(); ctx.translate(a.x, a.y); ctx.rotate(a.angle); ctx.strokeStyle = "#9d91c8"; ctx.lineWidth = 2; ctx.fillStyle = "#17142c";
        ctx.beginPath(); for (let k = 0; k < 8; k++) { const ang = k * Math.PI / 4; const rr = a.r * (0.75 + ((k * 37) % 23) / 100); const x = Math.cos(ang) * rr; const y = Math.sin(ang) * rr; k ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.restore();
      }

      if (!s.running) {
        ctx.fillStyle = "rgba(1,1,10,.62)"; ctx.fillRect(0, 0, w, h);
        ctx.textAlign = "center"; ctx.fillStyle = "#fff"; ctx.font = "700 28px system-ui";
        ctx.fillText(playing ? "MISSION OVER" : "VOID RUNNER", w / 2, h / 2 - 16);
        ctx.font = "14px system-ui"; ctx.fillStyle = "#b9b2d9";
        ctx.fillText(playing ? `Score ${s.score} • Best ${best}` : "Pilot the ship and survive the asteroid field", w / 2, h / 2 + 14);
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, [best, playing]);

  return (
    <section className="mx-auto max-w-6xl px-6 py-28" aria-label="Void Runner mini game">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-mono text-[11px] tracking-[0.28em] text-primary uppercase">Interactive Space Lab</p>
          <h2 className="mt-3 text-4xl font-semibold sm:text-5xl">VOID RUNNER</h2>
          <p className="mt-3 max-w-xl text-muted-foreground">A tiny playable space game. Dodge asteroids, shoot through the void, and beat your high score.</p>
        </div>
        <div className="flex gap-2 font-mono text-xs tracking-wider uppercase">
          <span className="rounded-full border border-border/70 bg-background/50 px-3 py-2">Score {score}</span>
          <span className="rounded-full border border-border/70 bg-background/50 px-3 py-2">Best {best}</span>
          <span className="rounded-full border border-border/70 bg-background/50 px-3 py-2">Lives {"❤".repeat(Math.max(0, lives))}</span>
        </div>
      </div>
      <div className="overflow-hidden rounded-[2rem] border border-primary/20 bg-black/30 shadow-[0_0_90px_rgba(110,80,255,.12)]">
        <canvas ref={canvasRef} className="block h-[430px] w-full sm:h-[520px]" />
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 bg-background/50 px-5 py-4 backdrop-blur-xl">
          <span className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">WASD / Arrow Keys · Space to Fire</span>
          <button onClick={startGame} className="rounded-full border border-primary/60 bg-primary/10 px-5 py-2 font-mono text-[11px] tracking-widest text-primary uppercase transition hover:bg-primary/20">{playing ? "Play Again" : "Start Mission"}</button>
        </div>
      </div>
    </section>
  );
}
