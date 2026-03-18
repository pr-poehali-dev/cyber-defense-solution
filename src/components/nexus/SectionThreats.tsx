import { useState } from "react";
import Icon from "@/components/ui/icon";
import { THREATS } from "./data";

export default function SectionThreats() {
  const [activeThreat, setActiveThreat] = useState(0);

  return (
    <section id="threats" className="py-24 px-8 md:px-16">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <p className="font-mono text-xs tracking-widest mb-3" style={{ color: "var(--cyber-blue-dim)" }}>
            // КЛАССИФИКАЦИЯ УГРОЗ
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-white mb-4">
            ТРИ{" "}
            <span style={{ color: "var(--cyber-blue)", textShadow: "0 0 20px rgba(0,200,255,0.5)" }}>
              УГРОЗЫ
            </span>
          </h2>
          <p className="text-white/40 max-w-xl text-sm">
            Цифровой мир NEXUS столкнулся с тремя критическими атаками, угрожающими стабильности
            всей цивилизации.
          </p>
        </div>

        <div className="flex gap-2 mb-8 flex-wrap">
          {THREATS.map((t, i) => (
            <button
              key={t.id}
              onClick={() => setActiveThreat(i)}
              className="px-4 py-2 font-mono text-xs tracking-wider transition-all duration-300"
              style={{
                border: `1px solid ${activeThreat === i ? t.severityColor : "rgba(255,255,255,0.1)"}`,
                background: activeThreat === i ? `${t.severityColor}15` : "transparent",
                color: activeThreat === i ? t.severityColor : "rgba(255,255,255,0.35)",
              }}
            >
              {t.id} — {t.title.toUpperCase()}
            </button>
          ))}
        </div>

        {THREATS.map((threat, idx) =>
          idx !== activeThreat ? null : (
            <div key={threat.id} className="grid md:grid-cols-3 gap-6">
              <div
                className="md:col-span-2 p-8 relative"
                style={{
                  background: "var(--bg-card)",
                  border: `1px solid ${threat.severityColor}30`,
                }}
              >
                <div
                  className="absolute top-0 left-0 right-0 h-px"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${threat.severityColor}, transparent)`,
                  }}
                />
                <div className="flex items-start gap-4 mb-6">
                  <div
                    className="w-12 h-12 flex items-center justify-center flex-shrink-0"
                    style={{
                      background: `${threat.severityColor}15`,
                      border: `1px solid ${threat.severityColor}40`,
                    }}
                  >
                    <Icon name={threat.icon as string} size={24} style={{ color: threat.severityColor }} />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span
                        className="font-mono text-xs px-2 py-0.5 alert-pulse"
                        style={{
                          color: threat.severityColor,
                          border: `1px solid ${threat.severityColor}50`,
                        }}
                      >
                        {threat.severity}
                      </span>
                      <span className="font-mono text-xs text-white/25">{threat.id}</span>
                    </div>
                    <h3 className="font-display text-2xl text-white">{threat.title}</h3>
                    <p className="font-mono text-xs text-white/35">{threat.subtitle}</p>
                  </div>
                </div>
                <p className="text-white/55 leading-relaxed mb-6">{threat.description}</p>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-mono text-xs text-white/25">УРОВЕНЬ ОПАСНОСТИ</span>
                    <span className="font-mono text-xs" style={{ color: threat.severityColor }}>
                      {threat.progress}%
                    </span>
                  </div>
                  <div className="h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.05)" }}>
                    <div
                      className="h-full rounded-full transition-all duration-1000"
                      style={{
                        width: `${threat.progress}%`,
                        background: `linear-gradient(90deg, ${threat.severityColor}80, ${threat.severityColor})`,
                        boxShadow: `0 0 8px ${threat.severityColor}`,
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                {threat.stats.map((s, i) => (
                  <div key={i} className="cyber-card p-5 flex-1">
                    <div className="font-mono text-2xl font-bold mb-1" style={{ color: threat.severityColor }}>
                      {s.value}
                    </div>
                    <div className="text-white/35 text-xs">{s.label}</div>
                  </div>
                ))}
                <div className="cyber-card p-4">
                  <div className="text-white/25 font-mono text-xs mb-3">ДИНАМИКА АТАКИ</div>
                  <div className="flex items-end gap-1 h-16">
                    {Array.from({ length: 12 }, (_, i) => {
                      const h = [30, 45, 60, 40, 75, 55, 90, 65, 50, 80, 70, 85][i];
                      return (
                        <div
                          key={i}
                          className="flex-1 rounded-sm bar-animated"
                          style={{
                            height: `${h}%`,
                            background: `linear-gradient(to top, ${threat.severityColor}, ${threat.severityColor}40)`,
                            animationDelay: `${i * 0.05}s`,
                          }}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
}
