import { useState, useEffect } from "react";
import { NAV } from "@/components/nexus/data";
import NavBar from "@/components/nexus/NavBar";
import SectionWorld from "@/components/nexus/SectionWorld";
import SectionThreats from "@/components/nexus/SectionThreats";
import SectionSolutions from "@/components/nexus/SectionSolutions";
import SectionArchContact from "@/components/nexus/SectionArchContact";

export default function Index() {
  const [activeSection, setActiveSection] = useState("world");
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
      <NavBar activeSection={activeSection} time={time} onScrollTo={scrollTo} />

      <SectionWorld threatLevel={threatLevel} onScrollTo={scrollTo} />

      <div className="cyber-divider" />

      <SectionThreats />

      <div className="cyber-divider" />

      <SectionSolutions threatLevel={threatLevel} />

      <div className="cyber-divider" />

      <SectionArchContact />
    </div>
  );
}
