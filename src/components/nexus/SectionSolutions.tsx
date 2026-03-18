import Icon from "@/components/ui/icon";
import { SOLUTIONS, THREATS } from "./data";

interface SectionSolutionsProps {
  threatLevel: number;
}

function RadarCircle({ level }: { level: number }) {
  return (
    <div className="relative flex items-center justify-center w-36 h-36 flex-shrink-0">
      {[1, 2, 3].map((ring) => (
        <div
          key={ring}
          className="absolute rounded-full border"
          style={{
            width: `${ring * 44}px`,
            height: `${ring * 44}px`,
            borderColor: "rgba(0,200,255,0.2)",
            animation: `rotate-ring ${6 + ring * 3}s linear infinite ${ring % 2 === 0 ? "reverse" : ""}`,
          }}
        />
      ))}
      <div
        className="relative z-10 font-mono text-2xl font-bold"
        style={{ color: "var(--cyber-blue)", textShadow: "0 0 20px #00c8ff" }}
      >
        {level}%
      </div>
    </div>
  );
}

export default function SectionSolutions({ threatLevel }: SectionSolutionsProps) {
  return (
    <section id="solutions" className="py-24 px-8 md:px-16">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <p className="font-mono text-xs tracking-widest mb-3" style={{ color: "var(--cyber-blue-dim)" }}>
            // ПРОТОКОЛЫ ЗАЩИТЫ
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-white mb-4">
            КАК ИИ{" "}
            <span style={{ color: "var(--cyber-blue)", textShadow: "0 0 20px rgba(0,200,255,0.5)" }}>
              РЕШАЕТ
            </span>
          </h2>
          <p className="text-white/40 max-w-xl text-sm">
            Три специализированных ИИ-протокола, разработанных для нейтрализации каждой угрозы
            в реальном времени.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {SOLUTIONS.map((sol, i) => (
            <div
              key={i}
              className="p-6 relative transition-all duration-300 cursor-default"
              style={{
                background: "var(--bg-card)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = `${sol.color}40`;
                (e.currentTarget as HTMLElement).style.boxShadow = `0 0 30px ${sol.color}15`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.06)";
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
              <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{
                  background: `linear-gradient(90deg, transparent, ${sol.color}60, transparent)`,
                }}
              />
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-10 h-10 flex items-center justify-center"
                  style={{ background: `${sol.color}12`, border: `1px solid ${sol.color}30` }}
                >
                  <Icon name={sol.icon as string} size={20} style={{ color: sol.color }} />
                </div>
                <div>
                  <div className="font-mono text-xs text-white/25">{THREATS[i].id}</div>
                  <div className="font-display text-sm text-white tracking-wider">{sol.title}</div>
                </div>
              </div>
              <p className="text-white/45 text-sm leading-relaxed mb-6">{sol.description}</p>
              <div className="space-y-3 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                {sol.metrics.map((m, j) => (
                  <div key={j} className="flex justify-between items-center">
                    <span className="text-white/25 text-xs font-mono">{m.label}</span>
                    <span className="font-mono text-sm font-bold" style={{ color: sol.color }}>
                      {m.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* AI core */}
        <div
          className="mt-10 p-8 relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, rgba(0,200,255,0.06) 0%, transparent 100%)",
            border: "1px solid rgba(0,200,255,0.15)",
          }}
        >
          <div
            className="absolute top-0 left-0 right-0 h-px"
            style={{
              background: "linear-gradient(90deg, transparent, var(--cyber-blue), transparent)",
            }}
          />
          <div className="flex flex-col md:flex-row items-center gap-8">
            <RadarCircle level={threatLevel} />
            <div className="flex-1">
              <h3 className="font-display text-2xl text-white mb-3">
                ИИ-ЯДРО{" "}
                <span style={{ color: "var(--cyber-blue)" }}>OMNISIGHT</span>
              </h3>
              <p className="text-white/45 mb-5 text-sm leading-relaxed">
                Центральный ИИ анализирует 4.7 миллиарда событий в секунду, строит предиктивные
                модели атак и координирует работу всех протоколов защиты. Время реакции на новую
                угрозу — 0.3 секунды.
              </p>
              <div className="grid grid-cols-3 gap-6">
                {[
                  { label: "Событий/сек", val: "4.7B" },
                  { label: "Точность", val: "99.97%" },
                  { label: "Аптайм", val: "100%" },
                ].map((s, i) => (
                  <div key={i}>
                    <div
                      className="font-mono text-xl font-bold"
                      style={{ color: "var(--cyber-blue)" }}
                    >
                      {s.val}
                    </div>
                    <div className="text-white/30 text-xs mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
