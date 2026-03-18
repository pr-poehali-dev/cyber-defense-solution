import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

interface SectionWorldProps {
  threatLevel: number;
  onScrollTo: (id: string) => void;
}

function Waveform() {
  const [points, setPoints] = useState<number[]>(
    Array.from({ length: 40 }, () => Math.random() * 40 + 10)
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setPoints((prev) => {
        const next = [...prev.slice(1)];
        next.push(Math.random() * 40 + 10);
        return next;
      });
    }, 150);
    return () => clearInterval(timer);
  }, []);

  const w = 300;
  const h = 60;
  const step = w / (points.length - 1);
  const path = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${i * step} ${h - p}`)
    .join(" ");

  return (
    <svg width="100%" height={h} viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
      <defs>
        <linearGradient id="waveGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#00c8ff" stopOpacity="0.2" />
          <stop offset="50%" stopColor="#00c8ff" stopOpacity="1" />
          <stop offset="100%" stopColor="#00c8ff" stopOpacity="0.2" />
        </linearGradient>
      </defs>
      <path d={path} fill="none" stroke="url(#waveGrad)" strokeWidth="2" />
    </svg>
  );
}

export default function SectionWorld({ threatLevel, onScrollTo }: SectionWorldProps) {
  return (
    <section id="world" className="min-h-screen flex flex-col justify-center px-8 md:px-16 pt-24 pb-16">
      <div className="max-w-6xl mx-auto w-full">
        <div
          className="inline-flex items-center gap-3 px-4 py-2 mb-8 rounded-sm"
          style={{ border: "1px solid rgba(0,200,255,0.2)", background: "rgba(0,200,255,0.05)" }}
        >
          <div className="pulse-dot" />
          <span className="font-mono text-xs" style={{ color: "var(--cyber-blue)" }}>
            СИСТЕМА АКТИВНА
          </span>
          <span className="font-mono text-xs text-white/20">|</span>
          <span className="font-mono text-xs text-white/40">УГРОЗА: </span>
          <span className="font-mono text-xs" style={{ color: "#ff8800" }}>
            {threatLevel}% УМЕРЕННАЯ
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="font-mono text-xs tracking-widest mb-4" style={{ color: "var(--cyber-blue-dim)" }}>
              // ЦИФРОВОЙ МИР 2049 — NEXUS
            </p>
            <h1
              className="font-display text-5xl md:text-7xl font-bold leading-none mb-6"
              style={{ color: "var(--cyber-blue)", textShadow: "0 0 30px rgba(0,200,255,0.4)" }}
            >
              МИР ЗА
              <br />
              <span className="text-white">ГРАНЬЮ</span>
              <br />
              КРЕМНИЯ
            </h1>
            <p className="text-white/55 text-lg leading-relaxed mb-8 max-w-md">
              Год 2049. Человечество живёт в двух измерениях — физическом и цифровом. NEXUS —
              глобальная сеть, объединяющая 8.7 миллиарда сознаний. И она под угрозой.
            </p>
            <div className="flex gap-4 flex-wrap">
              <button
                onClick={() => onScrollTo("threats")}
                className="px-6 py-3 font-display tracking-widest text-sm transition-all duration-300"
                style={{
                  background: "var(--cyber-blue)",
                  color: "var(--bg-deep)",
                  boxShadow: "0 0 20px rgba(0,200,255,0.3)",
                }}
              >
                ИЗУЧИТЬ УГРОЗЫ
              </button>
              <button
                onClick={() => onScrollTo("architecture")}
                className="px-6 py-3 font-display tracking-widest text-sm border transition-all duration-300"
                style={{
                  borderColor: "rgba(0,200,255,0.3)",
                  color: "rgba(0,200,255,0.7)",
                }}
              >
                АРХИТЕКТУРА
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Пользователей NEXUS", short: "8.7B" },
              { label: "Событий в секунду", short: "4.7B" },
              { label: "Активных угроз", short: "12K+" },
              { label: "Защита системы", short: "99.97%" },
            ].map((s, i) => (
              <div key={i} className="cyber-card p-5">
                <div
                  className="font-mono text-2xl md:text-3xl font-bold mb-1"
                  style={{ color: "var(--cyber-blue)", textShadow: "0 0 15px rgba(0,200,255,0.4)" }}
                >
                  {s.short}
                </div>
                <div className="text-white/40 text-xs">{s.label}</div>
                <div className="mt-3 h-px bg-gradient-to-r from-cyan-500/30 to-transparent" />
              </div>
            ))}

            <div className="cyber-card p-4 col-span-2">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-xs text-white/30">
                  АКТИВНОСТЬ УГРОЗ — РЕАЛЬНОЕ ВРЕМЯ
                </span>
                <div className="flex items-center gap-2">
                  <div className="pulse-dot" style={{ width: 6, height: 6 }} />
                  <span className="font-mono text-xs" style={{ color: "var(--cyber-blue)" }}>
                    LIVE
                  </span>
                </div>
              </div>
              <Waveform />
            </div>
          </div>
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-6">
          {[
            {
              icon: "Layers",
              title: "СТРУКТУРА NEXUS",
              text: "Три уровня: физическая инфраструктура (квантовые серверы), сетевой слой (протоколы передачи сознания) и интерфейсный уровень (нейроинтерфейсы граждан).",
            },
            {
              icon: "Users",
              title: "ЦИФРОВЫЕ ГРАЖДАНЕ",
              text: "Каждый житель имеет криптографический цифровой паспорт. Половина населения проводит более 6 часов в сутки в полном погружении в цифровую реальность.",
            },
            {
              icon: "Activity",
              title: "ЭКОНОМИКА NEXUS",
              text: "87% мировой экономики переведено в цифровую форму. Цифровые активы, нейро-транзакции и виртуальная собственность составляют основу финансовой системы.",
            },
          ].map((card, i) => (
            <div key={i} className="cyber-card p-6">
              <div
                className="w-10 h-10 flex items-center justify-center mb-4"
                style={{ background: "rgba(0,200,255,0.08)", border: "1px solid rgba(0,200,255,0.2)" }}
              >
                <Icon name={card.icon as string} size={20} style={{ color: "var(--cyber-blue)" }} />
              </div>
              <h3 className="font-display text-sm tracking-widest text-white mb-3">{card.title}</h3>
              <p className="text-white/45 text-sm leading-relaxed">{card.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
