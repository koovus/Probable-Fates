import React, { useEffect } from "react";

const vt323 = "@import url('https://fonts.googleapis.com/css2?family=VT323&display=swap');";

const data = {
  year: "2023.0",
  resources: [
    { id: "funding", name: "Funding", icon: "💰", value: 65, action: "> RAISE CAPITAL _" },
    { id: "compute", name: "Compute", icon: "🖥️", value: 45, action: "> BUY GPUs _" },
    { id: "talent", name: "Talent", icon: "🧑‍💻", value: 72, action: "> RECRUIT _" },
    { id: "safety", name: "Safety", icon: "🛡️", value: 38, action: "> ALIGN MODELS _" },
  ],
  stats: {
    hype: 55,
    openness: 30,
    drift: 18,
    board: 22,
    ms: 40,
    rival: 15,
  },
  logs: [
    { year: 2020, label: "Full Microsoft Partnership — Exclusive Azure", outcome: "The deal closes in 48 hours. Azure logos appear on everything." },
    { year: 2018, label: "Staged Release — Researchers First", outcome: "The press calls it 'too dangerous to release.' Incredible marketing." },
    { year: 2015, label: "Nonprofit Now, Flexible Later", outcome: "Pragmatism wins. The lawyers are already drafting amendment clauses." }
  ]
};

const getColor = (val: number) => {
  if (val > 60) return "#29c4e0"; // Cyan
  if (val > 30) return "#f5a623"; // Amber
  return "#ef4444"; // Red
};

export function CommandGrid() {
  return (
    <div className="min-h-screen bg-[#0d1b2a] text-[#c8d8e8] font-mono flex flex-col overflow-hidden selection:bg-[#29c4e0] selection:text-[#0d1b2a]">
      <style>{vt323}</style>
      
      {/* Top Bar */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-[#29c4e0]/20 bg-[#0d1b2a]/80 backdrop-blur z-10">
        <div className="flex items-baseline gap-4">
          <h1 
            className="text-4xl tracking-wider text-[#29c4e0] drop-shadow-[0_0_8px_rgba(41,196,224,0.5)]" 
            style={{ fontFamily: "'VT323', monospace" }}
          >
            YEAR {data.year}
          </h1>
          <span className="text-xs text-[#c8d8e8]/50 animate-pulse hidden sm:inline-block">
            ● SIMULATION ACTIVE
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-3 py-1 text-sm border border-[#c8d8e8]/30 hover:border-[#29c4e0] hover:text-[#29c4e0] hover:bg-[#29c4e0]/10 transition-colors">
            ⏩ FW
          </button>
          <button className="px-3 py-1 text-sm border border-[#c8d8e8]/30 hover:border-[#29c4e0] hover:text-[#29c4e0] hover:bg-[#29c4e0]/10 transition-colors">
            💾 SAVE
          </button>
        </div>
      </header>

      {/* Milestone Banner */}
      <div className="w-full bg-gradient-to-r from-[#f5a623]/20 via-[#29c4e0]/20 to-[#f5a623]/20 border-y border-[#f5a623]/50 py-1.5 flex justify-center items-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[#0d1b2a]/40" />
        <span className="relative z-10 text-[#f5a623] text-sm font-bold tracking-widest animate-pulse">
          ⚠ INCOMING TRANSMISSION — MILESTONE 2023 ⚠
        </span>
      </div>

      <main className="flex-1 flex flex-col p-6 gap-6 max-w-7xl mx-auto w-full">
        
        {/* Resource Grid (2x2) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1 min-h-[40vh]">
          {data.resources.map((res) => {
            const color = getColor(res.value);
            return (
              <div 
                key={res.id} 
                className="group relative flex flex-col bg-[#0a1420] border border-[#29c4e0]/20 p-5 overflow-hidden transition-all hover:border-[#29c4e0]/50"
              >
                {/* Background scanning line effect */}
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#29c4e0]/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-[scan_2s_ease-in-out_infinite]" />
                
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl text-[#c8d8e8] flex items-center gap-2">
                    <span>{res.icon}</span> {res.name}
                  </h2>
                  <span 
                    className="text-5xl drop-shadow-[0_0_12px_rgba(255,255,255,0.1)]" 
                    style={{ fontFamily: "'VT323', monospace", color }}
                  >
                    {res.value}
                  </span>
                </div>

                <div className="flex-1 flex flex-col justify-end gap-6">
                  {/* Progress Bar */}
                  <div className="relative h-2 w-full bg-[#0d1b2a] border border-[#29c4e0]/10 overflow-hidden">
                    <div 
                      className="absolute top-0 left-0 h-full transition-all duration-1000 ease-out"
                      style={{ 
                        width: `${res.value}%`, 
                        backgroundColor: color,
                        boxShadow: `0 0 10px ${color}80`
                      }}
                    />
                    {/* Grid lines over progress */}
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNCIgaGVpZ2h0PSI0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik00IDBMMCAwaDB2NEg0VjB6IiBmaWxsPSJub25lIiBzdHJva2U9IiMwZDFiMmEiIHN0cm9rZS1vcGFjaXR5PSIwLjUiLz48L3N2Zz4=')] opacity-30" />
                  </div>

                  {/* Action Button */}
                  <button 
                    className="w-full py-3 text-left px-4 bg-[#29c4e0]/5 border border-[#29c4e0]/20 text-[#29c4e0] hover:bg-[#29c4e0]/20 hover:border-[#29c4e0] transition-all font-bold tracking-wider relative group/btn"
                  >
                    <span className="relative z-10">{res.action}</span>
                    <div className="absolute inset-0 bg-[#29c4e0]/10 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-200" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Secondary Stats Row */}
        <div className="flex flex-wrap items-center gap-6 bg-[#0a1420] border border-[#c8d8e8]/10 p-4">
          <div className="flex gap-4">
            <StatBadge label="Hype" value={data.stats.hype} isBadge />
            <StatBadge label="Openness" value={data.stats.openness} isBadge />
          </div>
          
          <div className="h-6 w-px bg-[#c8d8e8]/20 hidden md:block" />
          
          <div className="flex gap-6 flex-wrap text-sm text-[#c8d8e8]/60">
            <DimStat label="Drift" value={data.stats.drift} />
            <DimStat label="Board" value={data.stats.board} />
            <DimStat label="MS" value={data.stats.ms} />
            <DimStat label="Rival" value={data.stats.rival} />
          </div>
        </div>

        {/* Decision Log Panel */}
        <div className="bg-[#0a1420] border border-[#c8d8e8]/10 flex flex-col h-48">
          <div className="px-4 py-2 border-b border-[#c8d8e8]/10 text-xs text-[#c8d8e8]/50 uppercase tracking-widest flex justify-between items-center">
            <span>Terminal // Decision Feed</span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#29c4e0] animate-pulse" />
              Live
            </span>
          </div>
          <div className="p-4 flex-1 overflow-y-auto space-y-3 font-mono text-sm scrollbar-thin scrollbar-thumb-[#29c4e0]/20 scrollbar-track-transparent">
            {data.logs.map((log, i) => (
              <div key={i} className="flex gap-3 items-start group">
                <span className="text-[#29c4e0] whitespace-nowrap opacity-70 group-hover:opacity-100 transition-opacity">
                  [{log.year}]
                </span>
                <div>
                  <div className="text-[#c8d8e8] font-bold">{log.label}</div>
                  <div className="text-[#c8d8e8]/60 mt-0.5">{log.outcome}</div>
                </div>
              </div>
            ))}
            <div className="text-[#29c4e0]/50 animate-pulse pt-2">_ awaiting input...</div>
          </div>
        </div>

      </main>

      {/* Terminal Footer */}
      <footer className="border-t border-[#29c4e0]/20 bg-[#060c14] p-2 px-4 text-xs flex justify-between items-center">
        <div className="text-[#c8d8e8]/70">
          <span className="text-[#f5a623]">root@openai:~#</span> System initialized. Welcome to the simulation.
        </div>
        <div className="text-[#29c4e0]/80 bg-[#29c4e0]/10 px-2 py-1 rounded-sm">
          Status: GPT-4 training run underway — 1.2T tokens processed
        </div>
      </footer>

      <style>{`
        @keyframes scan {
          0% { transform: translateY(0); }
          50% { transform: translateY(100px); }
          100% { transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

function StatBadge({ label, value, isBadge = false }: { label: string, value: number, isBadge?: boolean }) {
  const color = getColor(value);
  
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs uppercase text-[#c8d8e8]/60 tracking-wider">{label}</span>
      <span 
        className="px-2 py-0.5 text-xs font-bold font-mono"
        style={{ 
          backgroundColor: `${color}20`,
          color: color,
          border: `1px solid ${color}40`
        }}
      >
        {value}
      </span>
    </div>
  );
}

function DimStat({ label, value }: { label: string, value: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="uppercase">{label}:</span>
      <span className="text-[#c8d8e8]">{value}</span>
    </div>
  );
}
