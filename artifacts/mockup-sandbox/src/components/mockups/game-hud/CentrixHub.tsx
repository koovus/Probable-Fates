import React from "react";

const C = {
  bg: "#0d1b2a",
  primary: "#29c4e0",
  accent: "#f5a623",
  text: "#c8d8e8",
  red: "#ef4444",
  bgCard: "#0a1420",
};

const getColor = (val: number) =>
  val > 60 ? C.primary : val > 30 ? C.accent : C.red;

const resources = [
  { id: "funding", name: "Funding", icon: "💰", value: 65, action: "> RAISE CAPITAL _" },
  { id: "compute", name: "Compute", icon: "🖥️", value: 45, action: "> BUY GPUs _" },
  { id: "talent", name: "Talent", icon: "🧑‍💻", value: 72, action: "> RECRUIT _" },
  { id: "safety", name: "Safety", icon: "🛡️", value: 38, action: "> ALIGN MODELS _" },
];

const logs = [
  { year: "2020", label: "Full Microsoft Partnership — Exclusive Azure", text: "The deal closes in 48 hours. Azure logos appear on everything." },
  { year: "2018", label: "Staged Release — Researchers First", text: "The press calls it 'too dangerous to release.' Incredible marketing." },
  { year: "2015", label: "Nonprofit Now, Flexible Later", text: "Pragmatism wins. The lawyers are already drafting amendment clauses." },
];

function ResourceCard({ icon, name, value, action }: { icon: string; name: string; value: number; action: string }) {
  const color = getColor(value);
  return (
    <div
      className="flex flex-col gap-2 p-3 border"
      style={{ backgroundColor: C.bgCard, borderColor: `${C.primary}30` }}
    >
      <div className="flex items-center justify-between text-sm">
        <span style={{ color: C.text }}>
          {icon} <span className="font-bold">{name}</span>
        </span>
        <span className="font-bold text-xl" style={{ fontFamily: "'VT323', monospace", color }}>
          {value}
        </span>
      </div>
      <div className="h-1.5 w-full overflow-hidden" style={{ background: "#060c14", border: `1px solid ${C.primary}20` }}>
        <div
          className="h-full transition-all duration-700"
          style={{ width: `${value}%`, backgroundColor: color, boxShadow: `0 0 6px ${color}80` }}
        />
      </div>
      <button
        className="text-xs text-left px-2 py-1.5 transition-colors uppercase tracking-wider font-bold"
        style={{ color: C.primary, background: `${C.primary}10`, border: `1px solid ${C.primary}30` }}
      >
        {action}
      </button>
    </div>
  );
}

export function CentrixHub() {
  return (
    <div
      className="min-h-screen flex flex-col font-mono text-sm overflow-hidden select-none"
      style={{ backgroundColor: C.bg, color: C.text }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&family=VT323&display=swap');
        .vt323 { font-family: 'VT323', monospace; }
        @keyframes pulse-glow {
          0%, 100% { text-shadow: 0 0 10px #29c4e080, 0 0 30px #29c4e040; }
          50% { text-shadow: 0 0 20px #29c4e0cc, 0 0 60px #29c4e070; }
        }
        @keyframes banner-pulse {
          0%, 100% { background-color: rgba(245,166,35,0.08); border-color: rgba(245,166,35,0.4); }
          50% { background-color: rgba(41,196,224,0.08); border-color: rgba(41,196,224,0.4); }
        }
        .year-glow { animation: pulse-glow 3s ease-in-out infinite; }
        .banner-anim { animation: banner-pulse 2.5s ease-in-out infinite; }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        .blink { animation: blink 1s step-end infinite; }
      `}</style>

      {/* ─── THREE-COLUMN CORE ─── */}
      <div className="flex flex-1 min-h-0" style={{ borderBottom: `1px solid ${C.primary}20` }}>

        {/* LEFT COLUMN — Funding + Compute */}
        <div
          className="flex flex-col gap-0"
          style={{ width: "25%", borderRight: `1px solid ${C.primary}20` }}
        >
          <div
            className="px-3 py-2 text-[10px] uppercase tracking-widest"
            style={{ color: `${C.text}50`, borderBottom: `1px solid ${C.primary}15` }}
          >
            Resources — Left
          </div>
          <div className="flex flex-col gap-3 p-3 flex-1">
            <ResourceCard {...resources[0]} />
            <ResourceCard {...resources[1]} />
          </div>
        </div>

        {/* CENTER COLUMN — Year as the hub */}
        <div
          className="flex flex-col items-center"
          style={{ flex: 1 }}
        >
          {/* Year hero */}
          <div
            className="flex flex-col items-center justify-center px-6 pt-8 pb-4 w-full"
            style={{ borderBottom: `1px solid ${C.primary}20` }}
          >
            <div
              className="text-[10px] uppercase tracking-widest mb-3"
              style={{ color: `${C.primary}80` }}
            >
              ● Simulation Active
            </div>

            <div
              className="vt323 year-glow text-center leading-none"
              style={{ fontSize: "5.5rem", color: C.primary, letterSpacing: "0.08em" }}
            >
              2023.0
            </div>

            <div
              className="vt323 text-center mt-1 tracking-widest"
              style={{ fontSize: "1.1rem", color: `${C.text}60` }}
            >
              YEAR
            </div>

            {/* Action buttons flanking */}
            <div className="flex gap-3 mt-5">
              <button
                className="px-5 py-2 text-sm font-bold uppercase tracking-wider transition-colors flex items-center gap-2"
                style={{ color: C.primary, border: `1px solid ${C.primary}40`, background: `${C.primary}08` }}
              >
                ⏩ FW
              </button>
              <button
                className="px-5 py-2 text-sm font-bold uppercase tracking-wider transition-colors flex items-center gap-2"
                style={{ color: C.accent, border: `1px solid ${C.accent}40`, background: `${C.accent}08` }}
              >
                💾 SAVE
              </button>
            </div>
          </div>

          {/* Milestone banner */}
          <div
            className="banner-anim w-full py-2 flex items-center justify-center"
            style={{ borderBottom: `1px solid ${C.accent}40` }}
          >
            <span className="vt323 tracking-widest text-xl" style={{ color: C.accent }}>
              ⚠ INCOMING TRANSMISSION — MILESTONE 2023 ⚠
            </span>
          </div>

          {/* Stats centered below year */}
          <div className="w-full px-6 py-4 flex flex-col gap-3">
            <div
              className="text-[10px] uppercase tracking-widest mb-1"
              style={{ color: `${C.text}50` }}
            >
              Vital Readings
            </div>

            {/* Hype + Openness as badge row */}
            <div className="flex gap-3 justify-center">
              {[{ label: "Hype", val: 55 }, { label: "Openness", val: 30 }].map(({ label, val }) => {
                const color = getColor(val);
                return (
                  <div
                    key={label}
                    className="flex-1 text-center py-2 px-3"
                    style={{
                      border: `1px solid ${color}50`,
                      background: `${color}10`,
                    }}
                  >
                    <div className="text-[10px] uppercase tracking-widest mb-1" style={{ color: `${C.text}60` }}>
                      {label}
                    </div>
                    <div className="vt323 text-2xl" style={{ color }}>{val}</div>
                  </div>
                );
              })}
            </div>

            {/* Dim stats 2-col grid */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs mt-1">
              {[
                { label: "Mission Drift", val: "18%" },
                { label: "Board Tension", val: "22%" },
                { label: "MS Leverage", val: "40%" },
                { label: "Rival Threat", val: "15%" },
              ].map(({ label, val }) => (
                <div key={label} className="flex justify-between items-center py-1" style={{ borderBottom: `1px solid ${C.primary}10` }}>
                  <span style={{ color: `${C.text}50` }}>{label}</span>
                  <span style={{ color: `${C.text}80` }}>{val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN — Talent + Safety */}
        <div
          className="flex flex-col gap-0"
          style={{ width: "25%", borderLeft: `1px solid ${C.primary}20` }}
        >
          <div
            className="px-3 py-2 text-[10px] uppercase tracking-widest"
            style={{ color: `${C.text}50`, borderBottom: `1px solid ${C.primary}15` }}
          >
            Resources — Right
          </div>
          <div className="flex flex-col gap-3 p-3 flex-1">
            <ResourceCard {...resources[2]} />
            <ResourceCard {...resources[3]} />
          </div>
        </div>

      </div>

      {/* ─── DECISION LOG ─── */}
      <div className="flex flex-col" style={{ height: "200px", borderBottom: `1px solid ${C.primary}20` }}>
        <div
          className="px-4 py-2 text-[10px] uppercase tracking-widest flex justify-between items-center shrink-0"
          style={{ borderBottom: `1px solid ${C.primary}15`, color: `${C.text}50` }}
        >
          <span>Decision Log</span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-1.5 h-1.5 rounded-full blink" style={{ background: C.primary }} />
            Live
          </span>
        </div>
        <div className="overflow-y-auto flex-1 px-4 py-3 flex flex-col gap-3">
          {logs.map((log, i) => (
            <div key={i} className="flex gap-3 items-start">
              <span className="vt323 text-lg shrink-0" style={{ color: C.accent }}>
                [{log.year}]
              </span>
              <div>
                <div className="font-bold text-xs" style={{ color: C.text }}>{log.label}</div>
                <div className="text-xs mt-0.5" style={{ color: `${C.text}60` }}>{log.text}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ─── TERMINAL FOOTER ─── */}
      <footer className="px-4 py-2 flex justify-between items-center text-xs shrink-0" style={{ background: "#060c14" }}>
        <span style={{ color: C.primary }}>
          <span style={{ color: C.accent }}>root@openai:~#</span> System initialized. Welcome to the simulation.<span className="blink">_</span>
        </span>
        <span style={{ color: `${C.text}50` }}>GPT-4 training run underway — 1.2T tokens processed</span>
      </footer>
    </div>
  );
}
