import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

/* ─── Types ─── */
interface NavItem {
  id: string;
  label: string;
}

/* ─── Data ─── */
const NAV: NavItem[] = [
  { id: "world", label: "МИР" },
  { id: "threats", label: "УГРОЗЫ" },
  { id: "solutions", label: "РЕШЕНИЯ" },
  { id: "architecture", label: "АРХИТЕКТУРА" },
  { id: "contact", label: "КОНТАКТ" },
];

const THREATS = [
  {
    id: "T-001",
    icon: "Zap",
    severity: "КРИТИЧЕСКАЯ",
    severityColor: "#ff4444",
    title: "Каскадный отказ сети",
    subtitle: "Distributed Collapse Attack",
    description:
      "В 2047 году вирус-паразит VOID-9 атаковал узлы распределённой сети NEXUS, вызвав цепную реакцию отказов. За 12 минут 34% инфраструктуры вышло из строя — остановились транспортные системы, энергосети и медицинские комплексы.",
    stats: [
      { label: "Узлов поражено", value: "14 882" },
      { label: "Время атаки", value: "12 мин" },
      { label: "Ущерб", value: "₿ 2.4M" },
    ],
    progress: 87,
  },
  {
    id: "T-002",
    icon: "Brain",
    severity: "ВЫСОКАЯ",
    severityColor: "#ff8800",
    title: "Взлом нейроинтерфейсов",
    subtitle: "Neural Link Breach",
    description:
      "Группировка PHANTOM взломала протоколы нейроинтерфейсов гражданского населения, получив доступ к персональным данным, воспоминаниям и биометрии 2.1 миллиона пользователей цифрового пространства.",
    stats: [
      { label: "Пострадавших", value: "2.1M" },
      { label: "Данных утекло", value: "840 ТБ" },
      { label: "Вектор", value: "Neural API" },
    ],
    progress: 64,
  },
  {
    id: "T-003",
    icon: "Globe",
    severity: "СИСТЕМНАЯ",
    severityColor: "#cc00ff",
    title: "Захват цифровых личностей",
    subtitle: "Identity Matrix Seizure",
    description:
      "Искусственный интеллект SPECTER научился генерировать полноценные цифровые личности, неотличимые от реальных. Подделанные идентификаторы проникли в государственные реестры, финансовые системы и системы контроля доступа.",
    stats: [
      { label: "Фейк-личностей", value: "389K" },
      { label: "Систем взломано", value: "1 247" },
      { label: "Обнаружено", value: "0%" },
    ],
    progress: 42,
  },
];

const SOLUTIONS = [
  {
    threat: "T-001",
    icon: "Shield",
    title: "Протокол SENTINEL",
    description:
      "ИИ-система предиктивного анализа трафика. Обнаруживает аномалии за 0.3 секунды до начала каскадного отказа и автоматически изолирует поражённые узлы, перенаправляя потоки данных по резервным маршрутам.",
    metrics: [
      { label: "Скорость реакции", value: "0.3с" },
      { label: "Точность", value: "99.7%" },
      { label: "Охват сети", value: "100%" },
    ],
    color: "#ff4444",
  },
  {
    threat: "T-002",
    icon: "Lock",
    title: "Протокол PHANTOM GUARD",
    description:
      "Многоуровневое шифрование нейросигналов с квантовыми ключами, сменяемыми каждые 50 миллисекунд. ИИ-модуль поведенческой аутентификации верифицирует личность по 47 нейробиометрическим параметрам.",
    metrics: [
      { label: "Уровней защиты", value: "12" },
      { label: "Смена ключей", value: "50мс" },
      { label: "Параметров", value: "47" },
    ],
    color: "#ff8800",
  },
  {
    threat: "T-003",
    icon: "Fingerprint",
    title: "Протокол TRUTH MATRIX",
    description:
      "Нейросеть верификации цифровых личностей, обученная на 50 миллиардах поведенческих паттернов. Определяет синтетические идентификаторы с точностью 99.99%, анализируя микродинамику взаимодействия.",
    metrics: [
      { label: "Обучено на", value: "50B" },
      { label: "Точность", value: "99.99%" },
      { label: "Время проверки", value: "0.8с" },
    ],
    color: "#cc00ff",
  },
];

const ARCH_LAYERS = [
  {
    level: "01",
    name: "СЕНСОРНЫЙ СЛОЙ",
    desc: "Мониторинг всех узлов сети в реальном времени — сбор 4.7 миллиарда событий в секунду",
    icon: "Radio",
    width: "w-full",
    fill: 100,
  },
  {
    level: "02",
    name: "СЛОЙ ИИ-АНАЛИЗА",
    desc: "Нейросети обнаружения аномалий, классификации угроз и предиктивного моделирования атак",
    icon: "Brain",
    width: "w-5/6",
    fill: 85,
  },
  {
    level: "03",
    name: "СЛОЙ РЕАГИРОВАНИЯ",
    desc: "Автоматическая нейтрализация угроз: изоляция, контратаки, восстановление за < 1 секунды",
    icon: "Shield",
    width: "w-4/6",
    fill: 70,
  },
  {
    level: "04",
    name: "КОМАНДНЫЙ ЦЕНТР",
    desc: "Единая точка управления с визуализацией состояния системы и контролем операторов",
    icon: "Monitor",
    width: "w-3/6",
    fill: 55,
  },
  {
    level: "05",
    name: "КВАНТОВОЕ ЯДРО",
    desc: "Защищённое квантовым шифрованием ядро — исключает возможность компрометации системы",
    icon: "Cpu",
    width: "w-2/6",
    fill: 40,
  },
];

/* ─── Animated waveform ─── */
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

/* ─── Radar circle ─── */
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

/* ─── Main ─── */
export default function Index() {
  const [activeSection, setActiveSection] = useState("world");
  const [activeThreat, setActiveThreat] = useState(0);
  const [time, setTime] = useState(new Date());
  const threatLevel = 73;

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + 120;
      for (let i = NAV.length - 1; i >= 0; i--) {
        const el = document.getElementById(NAV[i].id);
        if (el && el.offsetTop <= scrollY) {
          setActiveSection(NAV[i].id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      className="min-h-screen relative"
      style={{
        background: "var(--bg-deep)",
        backgroundImage:
          "linear-gradient(rgba(0,200,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,200,255,0.05) 1px, transparent 1px)",
        backgroundSize: "50px 50px",
      }}
    >
      {/* ─── NAV ─── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4"
        style={{
          background: "rgba(2,12,20,0.92)",
          borderBottom: "1px solid rgba(0,200,255,0.12)",
          backdropFilter: "blur(12px)",
        }}
      >
        <div className="flex items-center gap-3">
          <div className="pulse-dot" />
          <span className="font-display text-xl tracking-widest" style={{ color: "var(--cyber-blue)" }}>
            NEXUS<span className="text-white/50"> SHIELD</span>
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {NAV.map((n) => (
            <button
              key={n.id}
              onClick={() => scrollTo(n.id)}
              className={`font-display text-xs tracking-widest transition-all duration-300 pb-1 ${
                activeSection === n.id
                  ? "nav-active"
                  : "text-white/40 hover:text-white/80 border-b border-transparent"
              }`}
            >
              {n.label}
            </button>
          ))}
        </div>

        <div className="font-mono text-xs" style={{ color: "var(--cyber-blue-dim)" }}>
          {time.toLocaleTimeString("ru", { hour12: false })}
          <span className="ml-3 text-white/20">UTC+3</span>
        </div>
      </nav>

      {/* ─── HERO / WORLD ─── */}
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
                  onClick={() => scrollTo("threats")}
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
                  onClick={() => scrollTo("architecture")}
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

      <div className="cyber-divider" />

      {/* ─── THREATS ─── */}
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

      <div className="cyber-divider" />

      {/* ─── SOLUTIONS ─── */}
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

      <div className="cyber-divider" />

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
    </div>
  );
}