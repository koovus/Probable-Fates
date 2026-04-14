import React from "react";

export function Cockpit() {
  const getProgressColor = (value: number) => {
    if (value > 60) return "bg-[#29c4e0]"; // cyan
    if (value > 30) return "bg-[#f5a623]"; // amber
    return "bg-[#ef4444]"; // red
  };

  const getTextColor = (value: number) => {
    if (value > 60) return "text-[#29c4e0]"; // cyan
    if (value > 30) return "text-[#f5a623]"; // amber
    return "text-[#ef4444]"; // red
  };

  const resources = [
    { name: "Funding", icon: "💰", value: 65, action: "> RAISE CAPITAL _" },
    { name: "Compute", icon: "🖥️", value: 45, action: "> BUY GPUs _" },
    { name: "Talent", icon: "🧑‍💻", value: 72, action: "> RECRUIT _" },
    { name: "Safety", icon: "🛡️", value: 38, action: "> ALIGN MODELS _" },
  ];

  const logEntries = [
    {
      year: "2020",
      label: "Full Microsoft Partnership — Exclusive Azure",
      text: "The deal closes in 48 hours. Azure logos appear on everything.",
    },
    {
      year: "2018",
      label: "Staged Release — Researchers First",
      text: "The press calls it 'too dangerous to release.' Incredible marketing.",
    },
    {
      year: "2015",
      label: "Nonprofit Now, Flexible Later",
      text: "Pragmatism wins. The lawyers are already drafting amendment clauses.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0d1b2a] text-[#c8d8e8] font-mono p-4 flex flex-col overflow-hidden selection:bg-[#29c4e0] selection:text-[#0d1b2a]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&family=VT323&display=swap');
        .font-display { font-family: 'VT323', monospace; }
        .font-body { font-family: 'JetBrains Mono', monospace; }
        .scanlines {
          position: relative;
        }
        .scanlines::before {
          content: " ";
          display: block;
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
          background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06));
          z-index: 20;
          background-size: 100% 2px, 3px 100%;
          pointer-events: none;
        }
      `}</style>

      <div className="scanlines absolute inset-0 pointer-events-none mix-blend-overlay"></div>

      {/* HEADER */}
      <header className="flex justify-between items-start mb-4 relative z-10 border-b border-[#29c4e0]/30 pb-4">
        <div>
          <h1 className="font-display text-5xl text-[#29c4e0] tracking-widest drop-shadow-[0_0_8px_rgba(41,196,224,0.5)]">
            YEAR 2023.0
          </h1>
          <p className="text-xs text-[#29c4e0]/70 mt-1 uppercase tracking-widest">
            OpenAI Simulator: Probable Fates
          </p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 border border-[#c8d8e8]/30 hover:border-[#29c4e0] hover:text-[#29c4e0] transition-colors text-sm flex items-center gap-2">
            <span>⏩</span> FW
          </button>
          <button className="px-4 py-2 border border-[#c8d8e8]/30 hover:border-[#f5a623] hover:text-[#f5a623] transition-colors text-sm flex items-center gap-2">
            <span>💾</span> SAVE
          </button>
        </div>
      </header>

      {/* HORIZONTAL RESOURCE BAR */}
      <div className="grid grid-cols-4 gap-4 mb-4 relative z-10">
        {resources.map((r) => (
          <div key={r.name} className="border border-[#c8d8e8]/20 bg-[#0d1b2a]/80 p-3 flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-[#c8d8e8]/70 flex items-center gap-2">
                {r.icon} {r.name}
              </span>
              <span className={`font-display text-3xl ${getTextColor(r.value)} drop-shadow-[0_0_5px_currentColor]`}>
                {r.value}
              </span>
            </div>
            
            <div className="h-1.5 w-full bg-[#0d1b2a] border border-[#c8d8e8]/20 relative overflow-hidden">
              <div 
                className={`absolute top-0 left-0 bottom-0 ${getProgressColor(r.value)} transition-all duration-500`} 
                style={{ width: `${r.value}%` }}
              />
            </div>

            <button className="w-full text-left text-xs py-1.5 px-2 bg-[#29c4e0]/10 hover:bg-[#29c4e0]/20 text-[#29c4e0] border border-[#29c4e0]/30 transition-colors uppercase tracking-wider">
              {r.action}
            </button>
          </div>
        ))}
      </div>

      {/* MILESTONE BANNER */}
      <div className="w-full bg-[#f5a623]/20 border border-[#f5a623] text-[#f5a623] py-2 px-4 mb-6 relative z-10 flex items-center justify-center animate-pulse">
        <span className="font-display text-2xl tracking-widest">⚠ INCOMING TRANSMISSION — MILESTONE 2023 ⚠</span>
      </div>

      {/* MAIN AREA */}
      <div className="flex-1 flex gap-6 relative z-10 min-h-0">
        
        {/* LEFT: DECISION LOG */}
        <div className="w-[65%] flex flex-col">
          <h2 className="text-[#29c4e0] text-sm mb-3 uppercase tracking-widest border-b border-[#29c4e0]/30 pb-2">
            System Log // Historical Directives
          </h2>
          <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
            {logEntries.map((log, i) => (
              <div key={i} className="border-l-2 border-[#29c4e0]/50 pl-4 py-1">
                <div className="flex items-baseline gap-3 mb-1">
                  <span className="text-[#f5a623] font-display text-xl">[{log.year}]</span>
                  <span className="text-[#c8d8e8] font-bold">{log.label}</span>
                </div>
                <p className="text-[#c8d8e8]/70 text-sm leading-relaxed">
                  {log.text}
                </p>
              </div>
            ))}
            <div className="border-l-2 border-[#c8d8e8]/20 pl-4 py-1 opacity-50">
              <div className="flex items-baseline gap-3 mb-1">
                <span className="text-[#c8d8e8] font-display text-xl">[2015]</span>
                <span className="text-[#c8d8e8] font-bold">Project Initialization</span>
              </div>
              <p className="text-[#c8d8e8]/70 text-sm">A new entity is formed in San Francisco.</p>
            </div>
          </div>
        </div>

        {/* RIGHT: SECONDARY STATS */}
        <div className="w-[35%] flex flex-col gap-6">
          
          <div className="border border-[#c8d8e8]/20 p-4">
            <h2 className="text-[#c8d8e8]/50 text-xs mb-4 uppercase tracking-widest">Public Perception</h2>
            <div className="flex gap-4 mb-4">
              <div className="flex-1 border border-[#f5a623]/50 bg-[#f5a623]/10 p-2 text-center">
                <div className="text-[10px] text-[#f5a623] uppercase mb-1">Hype</div>
                <div className="font-display text-2xl text-[#f5a623]">55</div>
              </div>
              <div className="flex-1 border border-[#ef4444]/50 bg-[#ef4444]/10 p-2 text-center">
                <div className="text-[10px] text-[#ef4444] uppercase mb-1">Openness</div>
                <div className="font-display text-2xl text-[#ef4444]">30</div>
              </div>
            </div>
            
            <h2 className="text-[#c8d8e8]/50 text-xs mb-3 uppercase tracking-widest mt-6">Internal Metrics</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center text-[#c8d8e8]/70">
                <span>Drift</span>
                <span className="font-mono text-[#c8d8e8]">18%</span>
              </div>
              <div className="flex justify-between items-center text-[#c8d8e8]/70">
                <span>Board Align</span>
                <span className="font-mono text-[#c8d8e8]">22%</span>
              </div>
              <div className="flex justify-between items-center text-[#c8d8e8]/70">
                <span>MS Influence</span>
                <span className="font-mono text-[#c8d8e8]">40%</span>
              </div>
              <div className="flex justify-between items-center text-[#c8d8e8]/70">
                <span>Rival Proc.</span>
                <span className="font-mono text-[#c8d8e8]">15%</span>
              </div>
            </div>
          </div>

          <div className="border border-[#29c4e0]/30 p-4 bg-[#29c4e0]/5">
            <div className="text-[#29c4e0] text-xs uppercase mb-2 animate-pulse">Current Operation</div>
            <div className="text-sm">GPT-4 training run underway — 1.2T tokens processed</div>
            <div className="mt-3 h-1 w-full bg-[#0d1b2a] border border-[#29c4e0]/30 overflow-hidden">
              <div className="h-full bg-[#29c4e0] w-[60%]"></div>
            </div>
          </div>

        </div>

      </div>

      {/* BOTTOM: TERMINAL FOOTER */}
      <footer className="mt-6 pt-3 border-t border-[#c8d8e8]/20 relative z-10">
        <div className="text-[#29c4e0] text-xs flex items-center gap-2">
          <span className="animate-pulse">_</span>
          <span>root@openai:~# System initialized. Welcome to the simulation.</span>
        </div>
      </footer>

    </div>
  );
}
