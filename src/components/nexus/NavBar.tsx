import { NAV } from "./data";

interface NavBarProps {
  activeSection: string;
  time: Date;
  onScrollTo: (id: string) => void;
}

export default function NavBar({ activeSection, time, onScrollTo }: NavBarProps) {
  return (
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
            onClick={() => onScrollTo(n.id)}
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
  );
}
