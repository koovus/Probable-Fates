import React from "react";

const COLORS = {
  bg: "#0d1b2a",
  primary: "#29c4e0",
  accent: "#f5a623",
  text: "#c8d8e8",
  red: "#ef4444",
};

const getColor = (val: number) => {
  if (val > 60) return COLORS.primary;
  if (val > 30) return COLORS.accent;
  return COLORS.red;
};

const ResourceCard = ({
  icon,
  name,
  value,
  action,
}: {
  icon: string;
  name: string;
  value: number;
  action: string;
}) => {
  const color = getColor(value);

  return (
    <div className="border border-[#29c4e0]/30 bg-[#0d1b2a]/80 p-3 flex flex-col gap-2 relative overflow-hidden group hover:border-[#29c4e0]/60 transition-colors">
      <div className="flex justify-between items-center text-sm font-bold">
        <span className="flex items-center gap-2">
          <span>{icon}</span>
          <span style={{ color: COLORS.text }}>{name}</span>
        </span>
        <span style={{ color }}>{value}</span>
      </div>
      
      <div className="h-2 w-full bg-[#0d1b2a] border border-[#29c4e0]/20 rounded-sm overflow-hidden">
        <div 
          className="h-full transition-all duration-500" 
          style={{ width: `${value}%`, backgroundColor: color }}
        />
      </div>

      <button className="text-xs text-left mt-1 hover:text-white transition-colors uppercase tracking-wider font-bold" style={{ color: COLORS.primary }}>
        {action}
      </button>

      {/* Decorative scanline */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-[#29c4e0]/5 to-transparent -translate-y-full group-hover:animate-[scan_2s_ease-in-out_infinite] pointer-events-none" />
    </div>
  );
};

const StatBadge = ({ name, value }: { name: string; value: number }) => {
  const color = getColor(value);
  return (
    <div className="flex justify-between items-center text-xs py-1 border-b border-[#29c4e0]/10 last:border-0">
      <span style={{ color: COLORS.text }} className="opacity-70">{name}</span>
      <span style={{ color }} className="font-bold">[{value}]</span>
    </div>
  );
};

const DimStat = ({ name, value }: { name: string; value: number }) => (
  <div className="flex justify-between items-center text-[10px] py-1">
    <span style={{ color: COLORS.text }} className="opacity-50">{name}</span>
    <span style={{ color: COLORS.text }} className="opacity-70">{value}%</span>
  </div>
);

export function ControlRoom() {
  return (
    <div className="min-h-screen flex flex-col font-mono text-sm selection:bg-[#29c4e0]/30" style={{ backgroundColor: COLORS.bg, color: COLORS.text }}>
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&family=VT323&display=swap');
        .font-display { font-family: 'VT323', monospace; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        @keyframes pulse-banner {
          0%, 100% { background-color: rgba(245, 166, 35, 0.1); border-color: rgba(245, 166, 35, 0.5); }
          50% { background-color: rgba(41, 196, 224, 0.1); border-color: rgba(41, 196, 224, 0.5); }
        }
      `}} />

      {/* Top Bar */}
      <header className="border-b border-[#29c4e0]/30 px-6 py-4 flex justify-between items-center bg-[#0d1b2a] z-10 shrink-0">
        <div className="flex flex-col">
          <h1 className="font-display text-4xl tracking-widest leading-none drop-shadow-[0_0_8px_rgba(41,196,224,0.5)]" style={{ color: COLORS.primary }}>
            YEAR 2023.0
          </h1>
          <span className="text-[10px] uppercase opacity-50 tracking-widest">OpenAI Simulator: Probable Fates</span>
        </div>

        <div className="flex gap-4">
          <button className="px-4 py-2 border border-[#29c4e0]/30 hover:border-[#29c4e0] hover:bg-[#29c4e0]/10 transition-all font-bold tracking-wider flex items-center gap-2 text-sm" style={{ color: COLORS.primary }}>
            <span className="opacity-70">⏩</span> FW
          </button>
          <button className="px-4 py-2 border border-[#f5a623]/30 hover:border-[#f5a623] hover:bg-[#f5a623]/10 transition-all font-bold tracking-wider flex items-center gap-2 text-sm" style={{ color: COLORS.accent }}>
            <span className="opacity-70">💾</span> SAVE
          </button>
        </div>
      </header>

      {/* Milestone Banner */}
      <div className="w-full py-2 flex justify-center items-center border-b border-[#f5a623]/50 animate-[pulse-banner_3s_ease-in-out_infinite] shrink-0">
        <span className="font-display text-xl tracking-widest text-[#f5a623] drop-shadow-[0_0_5px_rgba(245,166,35,0.8)]">
          ⚠ INCOMING TRANSMISSION — MILESTONE 2023 ⚠
        </span>
      </div>

      {/* Main Two-Column Layout */}
      <main className="flex-1 flex overflow-hidden">
        {/* Left Sidebar (Hardware Panel) */}
        <aside className="w-[28%] min-w-[280px] border-r border-[#29c4e0]/20 flex flex-col shadow-[inset_-10px_0_20px_rgba(41,196,224,0.02)] relative bg-black/20 z-0">
          <div className="absolute top-0 right-0 w-[1px] h-full bg-gradient-to-b from-[#29c4e0]/0 via-[#29c4e0]/50 to-[#29c4e0]/0 opacity-50"></div>
          
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-6 custom-scrollbar">
            
            {/* Resources Stack */}
            <div className="flex flex-col gap-3">
              <div className="text-[10px] uppercase tracking-widest opacity-40 mb-1 border-b border-current pb-1 w-full" style={{ color: COLORS.text }}>Core Resources</div>
              <ResourceCard icon="💰" name="Funding" value={65} action="> RAISE CAPITAL _" />
              <ResourceCard icon="🖥️" name="Compute" value={45} action="> BUY GPUs _" />
              <ResourceCard icon="🧑‍💻" name="Talent" value={72} action="> RECRUIT _" />
              <ResourceCard icon="🛡️" name="Safety" value={38} action="> ALIGN MODELS _" />
            </div>

            {/* Stats Panel */}
            <div className="flex flex-col gap-4 bg-[#0d1b2a]/60 border border-[#29c4e0]/10 p-4 rounded-sm">
              <div className="text-[10px] uppercase tracking-widest opacity-40 mb-1 border-b border-current pb-1 w-full" style={{ color: COLORS.text }}>Vital Signs</div>
              
              <div className="flex flex-col">
                <StatBadge name="Hype" value={55} />
                <StatBadge name="Openness" value={30} />
              </div>

              <div className="mt-2 pt-3 border-t border-[#29c4e0]/10 flex flex-col gap-1">
                <DimStat name="Mission Drift" value={18} />
                <DimStat name="Board Tension" value={22} />
                <DimStat name="MS Leverage" value={40} />
                <DimStat name="Rival Threat" value={15} />
              </div>
            </div>

          </div>
        </aside>

        {/* Right Content (Decision Log) */}
        <section className="flex-1 flex flex-col overflow-hidden bg-black/10">
          <div className="px-8 py-6 border-b border-[#29c4e0]/10 bg-[#0d1b2a]/80 backdrop-blur-sm shrink-0 flex justify-between items-center">
            <h2 className="font-display text-2xl tracking-widest" style={{ color: COLORS.text }}>ACTIVITY_LOG</h2>
            <div className="text-xs opacity-50 animate-pulse">● LIVE FEED</div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-8 flex flex-col gap-8 custom-scrollbar">
            
            {/* Log Entries */}
            {[
              {
                year: "2020",
                title: "Full Microsoft Partnership — Exclusive Azure",
                desc: "The deal closes in 48 hours. Azure logos appear on everything.",
              },
              {
                year: "2018",
                title: "Staged Release — Researchers First",
                desc: "The press calls it 'too dangerous to release.' Incredible marketing.",
              },
              {
                year: "2015",
                title: "Nonprofit Now, Flexible Later",
                desc: "Pragmatism wins. The lawyers are already drafting amendment clauses.",
              }
            ].map((log, i) => (
              <div key={i} className="flex gap-6 group">
                <div className="w-16 shrink-0 pt-1 text-right">
                  <span className="font-display text-xl opacity-70 group-hover:opacity-100 transition-opacity drop-shadow-[0_0_5px_rgba(41,196,224,0)] group-hover:drop-shadow-[0_0_5px_rgba(41,196,224,0.5)]" style={{ color: COLORS.primary }}>
                    [{log.year}]
                  </span>
                </div>
                
                <div className="relative pl-6 border-l border-[#29c4e0]/20 group-hover:border-[#29c4e0]/60 transition-colors pb-4 flex flex-col gap-2">
                  <div className="absolute left-[-4px] top-[10px] w-2 h-2 rounded-full bg-[#0d1b2a] border border-[#29c4e0]/50 group-hover:bg-[#29c4e0] group-hover:shadow-[0_0_8px_#29c4e0] transition-all"></div>
                  
                  <h3 className="text-lg font-bold tracking-wide" style={{ color: COLORS.text }}>
                    {log.title}
                  </h3>
                  <p className="text-sm opacity-70 leading-relaxed max-w-2xl" style={{ color: COLORS.text }}>
                    {log.desc}
                  </p>
                </div>
              </div>
            ))}
            
            {/* End of Log fading indicator */}
            <div className="flex gap-6 opacity-30">
              <div className="w-16 shrink-0 text-right pt-1"><span className="font-display text-xl">[...]</span></div>
              <div className="pl-6 border-l border-[#29c4e0]/10 pb-8 flex flex-col gap-2">
                <span className="text-sm italic">Accessing archived records...</span>
              </div>
            </div>

          </div>
        </section>
      </main>

      {/* Terminal Footer */}
      <footer className="border-t border-[#29c4e0]/30 bg-black px-4 py-2 text-xs flex justify-between shrink-0 font-mono">
        <span style={{ color: COLORS.primary }} className="opacity-80">
          root@openai:~# System initialized. Welcome to the simulation.<span className="animate-pulse">_</span>
        </span>
        <span style={{ color: COLORS.accent }} className="opacity-80">
          {">"} GPT-4 training run underway — 1.2T tokens processed
        </span>
      </footer>

    </div>
  );
}
