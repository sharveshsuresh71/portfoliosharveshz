import { useEffect, useState } from "react";

const GREETINGS = [
  "வணக்கம்",
  "Hello",
  "नमस्ते",
  "こんにちは",
  "안녕하세요",
  "Hola",
  "Bonjour",
  "مرحبا",
  "Olá",
  "你好",
];

export function Preloader({ onDone }: { onDone: () => void }) {
  const [i, setI] = useState(0);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (i >= GREETINGS.length - 1) {
      const t = setTimeout(() => {
        setLeaving(true);
        setTimeout(onDone, 600);
      }, 320);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setI((v) => v + 1), i === 0 ? 420 : 190);
    return () => clearTimeout(t);
  }, [i, onDone]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center transition-opacity duration-500"
      style={{ background: "#000", opacity: leaving ? 0 : 1 }}
    >
      <p
        key={i}
        style={{ animation: "fade-in 0.18s ease-out" }}
        className="font-display text-sm font-medium tracking-[0.2em] text-white sm:text-base"
      >
        {GREETINGS[i]}
      </p>
    </div>
  );
}
