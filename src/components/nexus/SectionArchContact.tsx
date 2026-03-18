import Icon from "@/components/ui/icon";
import { ARCH_LAYERS } from "./data";

export default function SectionArchContact() {
  return (
    <>
      {/* ─── ARCHITECTURE ─── */}
      <section id="architecture" className="py-24 px-8 md:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <p className="font-mono text-xs tracking-widest mb-3" style={{ color: "var(--cyber-blue-dim)" }}>
              // СХЕМА СИСТЕМЫ
            </p>
            <h2
              className="font-display text-4xl md:text-5xl mb-4"
              style={{ color: "var(--cyber-blue)", textShadow: "0 0 20px rgba(0,200,255,0.5)" }}
            >
              АРХИТЕКТУРА
            </h2>
            <p className="text-white/40 max-w-xl text-sm">
              Пятиуровневая система защиты: от сенсоров периметра до квантово-защищённого ядра.
            </p>
          </div>

          <div className="flex flex-col items-center gap-3 mb-16">
            {ARCH_LAYERS.map((layer, i) => (
              <div
                key={layer.level}
                className={`${layer.width} p-5 relative transition-all duration-300 cursor-default`}
                style={{
                  background: `rgba(0,200,255,${0.03 + i * 0.015})`,
                  border: "1px solid rgba(0,200,255,0.12)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,200,255,0.4)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 0 20px rgba(0,200,255,0.2)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,200,255,0.12)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
              >
                <div className="flex items-center gap-4">
                  <span className="font-mono text-xs text-white/15 flex-shrink-0">{layer.level}</span>
                  <Icon
                    name={layer.icon as string}
                    size={16}
                    style={{ color: "var(--cyber-blue)", flexShrink: 0 }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-display text-sm text-white tracking-wider mb-0.5">
                      {layer.name}
                    </div>
                    <div className="text-white/30 text-xs truncate">{layer.desc}</div>
                  </div>
                  <div
                    className="h-1.5 w-20 rounded-full flex-shrink-0"
                    style={{ background: "rgba(0,200,255,0.08)" }}
                  >
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${layer.fill}%`,
                        background: "var(--cyber-blue)",
                        boxShadow: "0 0 6px var(--cyber-blue)",
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-4 gap-4">
            {[
              { label: "СКОРОСТЬ", val: "0.3с", icon: "Zap" },
              { label: "ШИФРОВАНИЕ", val: "Квантовое", icon: "Lock" },
              { label: "АПТАЙМ", val: "99.99%", icon: "Activity" },
              { label: "ПОКРЫТИЕ", val: "Глобальное", icon: "Globe" },
            ].map((spec, i) => (
              <div key={i} className="cyber-card p-5 text-center">
                <Icon
                  name={spec.icon as string}
                  size={20}
                  className="mx-auto mb-3"
                  style={{ color: "var(--cyber-blue)" }}
                />
                <div
                  className="font-mono text-lg font-bold mb-1"
                  style={{ color: "var(--cyber-blue)" }}
                >
                  {spec.val}
                </div>
                <div className="text-white/25 text-xs font-mono tracking-wider">{spec.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="cyber-divider" />

      {/* ─── CONTACT ─── */}
      <section id="contact" className="py-24 px-8 md:px-16">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12 text-center">
            <p className="font-mono text-xs tracking-widest mb-3" style={{ color: "var(--cyber-blue-dim)" }}>
              // УСТАНОВИТЬ СВЯЗЬ
            </p>
            <h2
              className="font-display text-4xl md:text-5xl mb-4"
              style={{ color: "var(--cyber-blue)", textShadow: "0 0 20px rgba(0,200,255,0.5)" }}
            >
              КОНТАКТ
            </h2>
            <p className="text-white/40 text-sm">
              Обнаружили угрозу? Сообщите в командный центр NEXUS SHIELD.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div
              className="p-8 relative"
              style={{ background: "var(--bg-card)", border: "1px solid rgba(0,200,255,0.12)" }}
            >
              <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{
                  background: "linear-gradient(90deg, transparent, var(--cyber-blue), transparent)",
                }}
              />
              <div className="space-y-5">
                <div>
                  <label className="font-mono text-xs text-white/30 block mb-2 tracking-wider">
                    ИДЕНТИФИКАТОР
                  </label>
                  <input
                    className="w-full px-4 py-3 font-mono text-sm text-white bg-transparent outline-none transition-all"
                    style={{ border: "1px solid rgba(0,200,255,0.15)", caretColor: "var(--cyber-blue)" }}
                    placeholder="NEXUS-ID или email"
                    onFocus={(e) =>
                      ((e.target as HTMLInputElement).style.borderColor = "var(--cyber-blue)")
                    }
                    onBlur={(e) =>
                      ((e.target as HTMLInputElement).style.borderColor = "rgba(0,200,255,0.15)")
                    }
                  />
                </div>
                <div>
                  <label className="font-mono text-xs text-white/30 block mb-2 tracking-wider">
                    КЛАССИФИКАЦИЯ
                  </label>
                  <select
                    className="w-full px-4 py-3 font-mono text-sm text-white/50 outline-none appearance-none cursor-pointer"
                    style={{ background: "var(--bg-card)", border: "1px solid rgba(0,200,255,0.15)" }}
                    onFocus={(e) =>
                      ((e.target as HTMLSelectElement).style.borderColor = "var(--cyber-blue)")
                    }
                    onBlur={(e) =>
                      ((e.target as HTMLSelectElement).style.borderColor = "rgba(0,200,255,0.15)")
                    }
                  >
                    <option value="">Выберите тип угрозы...</option>
                    <option>T-001 — Сетевая атака</option>
                    <option>T-002 — Взлом нейроинтерфейса</option>
                    <option>T-003 — Фейковая личность</option>
                    <option>Другое</option>
                  </select>
                </div>
                <div>
                  <label className="font-mono text-xs text-white/30 block mb-2 tracking-wider">
                    ОПИСАНИЕ ИНЦИДЕНТА
                  </label>
                  <textarea
                    className="w-full px-4 py-3 font-mono text-sm text-white bg-transparent outline-none resize-none transition-all"
                    style={{ border: "1px solid rgba(0,200,255,0.15)", caretColor: "var(--cyber-blue)" }}
                    rows={4}
                    placeholder="Опишите наблюдаемую аномалию..."
                    onFocus={(e) =>
                      ((e.target as HTMLTextAreaElement).style.borderColor = "var(--cyber-blue)")
                    }
                    onBlur={(e) =>
                      ((e.target as HTMLTextAreaElement).style.borderColor = "rgba(0,200,255,0.15)")
                    }
                  />
                </div>
                <button
                  className="w-full py-3 font-display tracking-widest text-sm transition-all duration-300"
                  style={{
                    background: "var(--cyber-blue)",
                    color: "var(--bg-deep)",
                    boxShadow: "0 0 20px rgba(0,200,255,0.2)",
                  }}
                  onMouseEnter={(e) =>
                    ((e.target as HTMLElement).style.boxShadow = "0 0 40px rgba(0,200,255,0.5)")
                  }
                  onMouseLeave={(e) =>
                    ((e.target as HTMLElement).style.boxShadow = "0 0 20px rgba(0,200,255,0.2)")
                  }
                >
                  ПЕРЕДАТЬ В КОМАНДНЫЙ ЦЕНТР
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {[
                {
                  icon: "Radio",
                  label: "ЭКСТРЕННАЯ ЛИНИЯ",
                  value: "+7 (800) NEXUS-01",
                  sub: "Доступна 24/7 для критических угроз",
                },
                {
                  icon: "Mail",
                  label: "ЗАЩИЩЁННЫЙ КАНАЛ",
                  value: "secure@nexus-shield.net",
                  sub: "Квантовое шифрование E2E",
                },
                {
                  icon: "MapPin",
                  label: "КОМАНДНЫЙ ЦЕНТР",
                  value: "NEXUS Tower, Сектор 7",
                  sub: "Цифровой мир, Слой 2",
                },
                {
                  icon: "Clock",
                  label: "ВРЕМЯ РЕАКЦИИ",
                  value: "< 0.3 секунды",
                  sub: "Автоматическое реагирование ИИ",
                },
              ].map((c, i) => (
                <div key={i} className="cyber-card p-5 flex items-start gap-4">
                  <div
                    className="w-9 h-9 flex items-center justify-center flex-shrink-0"
                    style={{
                      background: "rgba(0,200,255,0.08)",
                      border: "1px solid rgba(0,200,255,0.2)",
                    }}
                  >
                    <Icon name={c.icon as string} size={16} style={{ color: "var(--cyber-blue)" }} />
                  </div>
                  <div>
                    <div className="font-mono text-xs text-white/25 mb-0.5 tracking-wider">
                      {c.label}
                    </div>
                    <div className="font-display text-sm text-white">{c.value}</div>
                    <div className="text-white/25 text-xs mt-0.5">{c.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer
        className="py-8 px-8 text-center"
        style={{ borderTop: "1px solid rgba(0,200,255,0.08)" }}
      >
        <div className="flex items-center justify-center gap-3 mb-3">
          <div className="pulse-dot" />
          <span
            className="font-display tracking-widest text-sm"
            style={{ color: "var(--cyber-blue)" }}
          >
            NEXUS SHIELD
          </span>
          <div className="pulse-dot" />
        </div>
        <p className="font-mono text-xs text-white/15">
          © 2049 NEXUS SHIELD CORPORATION — СИСТЕМА ЗАЩИТЫ ЦИФРОВОГО МИРА
        </p>
        <p className="font-mono text-xs text-white/10 mt-1">
          СТАТУС:{" "}
          <span style={{ color: "var(--cyber-blue)", opacity: 0.5 }}>
            ВСЕ СИСТЕМЫ В НОРМЕ
          </span>
        </p>
      </footer>
    </>
  );
}
