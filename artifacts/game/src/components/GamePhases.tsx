import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useGame, serializeState, deserializeState, evaluateEnding } from '@/lib/engine';
import { TerminalButton, ResourceCard, StatBadge } from './TerminalUI';
import { MILESTONES, EVENTS, Choice, StatKey } from '@/lib/content';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { startMusic } from '@/lib/music';

export function TitlePhase() {
  const { dispatch } = useGame();
  const hasSave = !!localStorage.getItem('probable-fates-save');

  const load = () => {
    const data = localStorage.getItem('probable-fates-save');
    if (data) {
      const loaded = deserializeState(data);
      if (loaded) {
        dispatch({ type: 'LOAD_GAME', payload: loaded });
      } else {
        localStorage.removeItem('probable-fates-save');
      }
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-6">
      <div 
        className="absolute inset-0 z-0 opacity-10"
        style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(30,180,220,0.04) 2px, rgba(30,180,220,0.04) 4px), repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(30,180,220,0.02) 2px, rgba(30,180,220,0.02) 4px)' }}
      />
      <div className="z-10 text-center w-full max-w-2xl border-2 border-primary bg-card/80 p-8 sm:p-12 backdrop-blur-sm terminal-glow">
        <h1 className="text-5xl sm:text-7xl font-display text-primary glitch-text mb-3">OpenAI Simulator</h1>
        <h2 className="text-xl text-primary/70 font-mono mb-6 uppercase tracking-widest border-b border-primary/20 pb-4">Probable Fates</h2>
        <p className="text-foreground/70 mb-10 text-sm sm:text-base leading-relaxed">
          Build (or break) the future of AI — one click and one irreversible decision at a time.
        </p>
        
        <div className="flex flex-col gap-3 max-w-xs mx-auto">
          <TerminalButton onClick={() => { startMusic(); dispatch({ type: 'SET_PHASE', payload: 'persona' }); }}>New Game</TerminalButton>
          {hasSave && <TerminalButton onClick={() => { startMusic(); load(); }} variant="secondary">Continue Save</TerminalButton>}
        </div>
        
        <p className="mt-8 text-xs text-primary/40 font-mono">
          v1.0 | All choices are fictional. All consequences are very much real (in this timeline) -- MOAI OHIO @ 2026.
        </p>
      </div>
    </div>
  );
}

export function PersonaPhase() {
  const { dispatch } = useGame();
  
  const personas: { id: 'safety' | 'hustler' | 'opensrc'; icon: string; title: string; bonus: string; desc: string }[] = [
    { id: 'safety', icon: '🧠', title: 'Safety Maximalist', bonus: 'Safety +15, Hype -5', desc: "You genuinely believe AGI could end civilization. Not in a fun way. You read every alignment paper and lose sleep nightly. Your investors think you're paranoid. You think they're reckless. You're both right." },
    { id: 'hustler', icon: '🚀', title: 'Hustler CEO', bonus: 'Funding +15, Hype +10, Safety -10', desc: "Move fast, break things, launch first, apologize later. You have a 5-year plan, a 10-year plan, and absolutely no work-life balance. CNBC once called you 'visionary.' Your safety team calls you 'a liability.'" },
    { id: 'opensrc', icon: '🌐', title: 'Open-Source Idealist', bonus: 'Openness +20, Talent +10, Funding -10', desc: "Information wants to be free. Weights want to be free. Your mortgage payment also wants to be free, but that's a problem for future you. You believe in democratizing AI even if it democratizes catastrophe." }
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 py-8">
      <h2 className="text-3xl sm:text-4xl text-primary mb-8 font-display uppercase tracking-widest text-center">
        Select Founder Persona
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl w-full">
        {personas.map(p => (
          <div
            key={p.id}
            className="border border-primary/40 p-5 bg-card hover:bg-primary/5 hover:border-primary transition-all cursor-pointer group flex flex-col terminal-glow"
            onClick={() => dispatch({ type: 'SET_PERSONA', payload: p.id })}
          >
            <div className="text-5xl mb-3 grayscale group-hover:grayscale-0 transition-all">{p.icon}</div>
            <h3 className="text-xl font-bold text-primary mb-2 uppercase">{p.title}</h3>
            <div className="text-xs text-accent font-mono bg-accent/10 px-2 py-1 mb-3">BONUS: {p.bonus}</div>
            <p className="text-xs text-foreground/70 flex-grow leading-relaxed">{p.desc}</p>
            <div className="mt-4 text-primary/40 group-hover:text-primary transition-colors text-xs text-center">
              [ INITIALIZE_PROFILE ]
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function PlayingPhase() {
  const { state, dispatch } = useGame();
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saved'>('idle');

  const handleSave = () => {
    localStorage.setItem('probable-fates-save', serializeState(state));
    setSaveStatus('saved');
    setTimeout(() => setSaveStatus('idle'), 2000);
  };

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col pb-4" style={{ minHeight: '100vh' }}>
      <style>{`
        @keyframes year-glow {
          0%, 100% { text-shadow: 0 0 10px rgba(41,196,224,0.5), 0 0 30px rgba(41,196,224,0.2); }
          50% { text-shadow: 0 0 22px rgba(41,196,224,0.95), 0 0 60px rgba(41,196,224,0.5); }
        }
        .year-pulse { animation: year-glow 3s ease-in-out infinite; }
      `}</style>

      {/* THREE-COLUMN CORE */}
      <div className="flex flex-1 border border-primary/20 mt-3 sm:mt-4">

        {/* LEFT COLUMN — Funding + Compute */}
        <div className="flex flex-col border-r border-primary/20" style={{ width: '25%' }}>
          <div className="px-3 py-2 text-[10px] uppercase tracking-widest text-primary/40 border-b border-primary/15 font-mono">
            Resources
          </div>
          <div className="flex flex-col gap-3 p-3 flex-1">
            <ResourceCard
              name="Funding" icon="💰" value={state.funding} clickLabel="Raise Capital"
              onClick={() => dispatch({ type: 'CLICK_RESOURCE', resource: 'funding', amount: Math.floor(Math.random() * 3) + 3 })}
            />
            <ResourceCard
              name="Compute" icon="🖥️" value={state.compute} clickLabel="Buy GPUs"
              onClick={() => dispatch({ type: 'CLICK_RESOURCE', resource: 'compute', amount: Math.floor(Math.random() * 3) + 2 })}
            />
          </div>
        </div>

        {/* CENTER COLUMN — Year as hub */}
        <div className="flex flex-col items-center flex-1 min-w-0">

          {/* Year hero */}
          <div className="flex flex-col items-center justify-center px-4 pt-6 pb-4 w-full border-b border-primary/20">
            <div className="text-[10px] uppercase tracking-widest text-primary/50 font-mono mb-3">
              ● Simulation Active
            </div>
            <div
              className="font-display year-pulse text-center leading-none text-primary"
              style={{ fontSize: 'clamp(3.5rem, 8vw, 5.5rem)', letterSpacing: '0.06em' }}
            >
              {state.year.toFixed(1)}
            </div>
            <div className="font-display text-center mt-1 tracking-widest text-primary/40 text-base">
              YEAR
            </div>

            {/* Action buttons */}
            <div className="flex gap-3 mt-5">
              <TerminalButton variant="ghost" onClick={() => dispatch({ type: 'FAST_FORWARD' })} title="Skip to next milestone">
                ⏩ FW
              </TerminalButton>
              <TerminalButton variant="ghost" onClick={handleSave}>
                {saveStatus === 'saved' ? '✅ SAVED' : '💾 SAVE'}
              </TerminalButton>
            </div>
          </div>

          {/* Milestone banner */}
          {state.milestoneReady && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={() => dispatch({ type: 'START_MILESTONE' })}
              className="w-full py-2 bg-accent/15 border-b-2 border-accent text-accent font-display text-base sm:text-lg tracking-widest uppercase hover:bg-accent hover:text-accent-foreground transition-all terminal-glow-amber animate-pulse"
            >
              ⚠ INCOMING TRANSMISSION — MILESTONE {Math.floor(state.year)} ⚠
            </motion.button>
          )}

          {/* Vital readings */}
          <div className="w-full px-4 py-4 flex flex-col gap-3">
            <div className="text-[10px] uppercase tracking-widest text-primary/40 font-mono">Vital Readings</div>

            {/* Hype + Openness */}
            <div className="flex gap-3">
              <div className="flex-1"><StatBadge label="Hype" value={state.hype} /></div>
              <div className="flex-1"><StatBadge label="Openness" value={state.openness} /></div>
            </div>

            {/* Dim stats 2-col */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-0 text-xs font-mono mt-1">
              {([
                ['Mission Drift', state.missionDrift],
                ['Board Tension', state.boardTension],
                ['MS Leverage',   state.msInfluence],
                ['Rival Threat',  state.rivalPressure],
              ] as [string, number][]).map(([label, val]) => (
                <div key={label} className="flex justify-between items-center py-1 border-b border-primary/10">
                  <span className="text-primary/40 truncate pr-1">{label}</span>
                  <span className="text-primary/60 shrink-0">{Math.floor(val)}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN — Talent + Safety */}
        <div className="flex flex-col border-l border-primary/20" style={{ width: '25%' }}>
          <div className="px-3 py-2 text-[10px] uppercase tracking-widest text-primary/40 border-b border-primary/15 font-mono">
            Resources
          </div>
          <div className="flex flex-col gap-3 p-3 flex-1">
            <ResourceCard
              name="Talent" icon="🧑‍💻" value={state.talent} clickLabel="Recruit"
              onClick={() => dispatch({ type: 'CLICK_RESOURCE', resource: 'talent', amount: Math.floor(Math.random() * 3) + 1 })}
            />
            <ResourceCard
              name="Safety" icon="🛡️" value={state.safety} clickLabel="Align Models"
              onClick={() => dispatch({ type: 'CLICK_RESOURCE', resource: 'safety', amount: Math.floor(Math.random() * 2) + 2 })}
            />
          </div>
        </div>

      </div>

      {/* DECISION LOG */}
      <div className="border-x border-b border-primary/20 flex flex-col" style={{ height: '200px' }}>
        <div className="px-4 py-2 text-[10px] uppercase tracking-widest text-primary/40 border-b border-primary/15 flex justify-between items-center shrink-0 font-mono">
          <span>Decision Log</span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-1.5 h-1.5 rounded-full animate-pulse bg-primary" />
            Live
          </span>
        </div>
        <div className="overflow-y-auto flex-1 px-4 py-3 space-y-3 font-mono text-xs">
          {state.choiceHistory.length === 0 ? (
            <div className="text-primary/30 italic">No decisions recorded yet.</div>
          ) : (
            state.choiceHistory.slice().reverse().map((h, i) => (
              <div key={i} className="flex gap-3 items-start">
                <span className="font-display text-lg text-accent shrink-0">[{h.year}]</span>
                <div>
                  <div className="font-bold text-foreground/80">{h.label}</div>
                  <div className="text-foreground/50 mt-0.5 leading-snug">{h.desc}</div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* TERMINAL STATUS BAR */}
      <div className="border-x border-b border-primary/20 px-4 py-2 flex justify-between items-center text-xs font-mono bg-black/40">
        <span className="truncate">
          <span className="text-accent">root@openai:~#</span>
          <span className="text-primary/60 ml-2">{state.latestIntel}</span>
          <span className="text-primary animate-pulse">_</span>
        </span>
        <span className="text-primary/30 hidden sm:inline shrink-0 ml-3">
          TICK: ACTIVE | CD: {state.eventCooldown > 0 ? state.eventCooldown : 'READY'}
        </span>
      </div>
    </div>
  );
}

export function MilestonePhase() {
  const { state, dispatch } = useGame();
  const milestone = MILESTONES[state.milestoneIndex];
  const [outcome, setOutcome] = useState<string | null>(null);

  if (!milestone) return null;

  const handleChoice = (c: Choice) => {
    setOutcome(c.outcome);
    setTimeout(() => {
      dispatch({ type: 'RESOLVE_MILESTONE', payload: { choice: c } });
    }, 3000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="min-h-screen bg-background p-4 sm:p-8 overflow-y-auto scanlines"
    >
      <div className="max-w-3xl w-full mx-auto">
        <h2 className="text-primary text-xs sm:text-sm font-mono mb-2 border-b border-primary/20 pb-2 uppercase">
          CLASSIFIED BRIEFING // {milestone.year}
        </h2>
        <h1 className="text-3xl sm:text-5xl font-display text-foreground mb-6 glitch-text">{milestone.title}</h1>
        
        {!outcome ? (
          <>
            <div className="text-sm sm:text-base text-foreground/80 leading-relaxed mb-8 whitespace-pre-wrap font-mono border-l-2 border-primary/30 pl-4">
              {milestone.narrative}
            </div>
            <div className="grid grid-cols-1 gap-3">
              {milestone.choices.map((c, i) => (
                <button 
                  key={i}
                  onClick={() => handleChoice(c)}
                  className="text-left border border-primary/40 p-4 hover:bg-primary/10 hover:border-primary transition-all group"
                >
                  <div className="font-bold text-primary text-base sm:text-lg mb-2 group-hover:translate-x-1 transition-transform">
                    {c.label}
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs font-mono">
                    {Object.entries(c.deltas).map(([k, v]) => (
                      <span key={k} className={Number(v) > 0 ? 'text-emerald-400' : 'text-red-400'}>
                        {Number(v) > 0 ? '+' : ''}{v} {k}
                      </span>
                    ))}
                  </div>
                </button>
              ))}
            </div>
          </>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-16 text-center border-2 border-primary bg-primary/5 p-8 terminal-glow"
          >
            <div className="text-xl font-mono text-primary mb-4">OUTCOME RECORDED</div>
            <p className="text-base text-foreground/80">{outcome}</p>
            <div className="mt-8 text-primary/40 animate-pulse text-xs font-mono">Resuming simulation...</div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

export function EventModal() {
  const { state, dispatch } = useGame();
  const event = EVENTS.find(e => e.id === state.activeEvent);
  const [outcome, setOutcome] = useState<string | null>(null);

  if (!event) return null;

  const theme = event.theme ?? 'standard';

  const handleChoice = (c: Choice) => {
    setOutcome(c.outcome);
    const delay = 6000;
    setTimeout(() => {
      dispatch({ type: 'RESOLVE_EVENT', payload: { choice: c } });
    }, delay);
  };

  const styles = {
    gossip: {
      border: 'border-emerald-400',
      heading: 'text-emerald-400',
      body: 'text-emerald-300/80',
      btn: 'border-emerald-400/40 hover:bg-emerald-400/10 text-emerald-400',
      glow: 'shadow-[0_0_16px_rgba(52,211,153,0.25)]',
      tag: '📡 GOSSIP INTEL',
      tagColor: 'text-emerald-400/60',
      outcome: 'text-emerald-400',
    },
    paranoia: {
      border: 'border-red-400',
      heading: 'text-red-400',
      body: 'text-red-300/80',
      btn: 'border-red-400/40 hover:bg-red-400/10 text-red-400',
      glow: 'shadow-[0_0_16px_rgba(248,113,113,0.25)]',
      tag: '⚠️ THREAT ASSESSMENT',
      tagColor: 'text-red-400/60',
      outcome: 'text-red-400',
    },
    standard: {
      border: 'border-accent',
      heading: 'text-accent',
      body: 'text-foreground/80',
      btn: 'border-accent/40 hover:bg-accent/10 text-accent',
      glow: 'terminal-glow-amber',
      tag: '📋 INCIDENT REPORT',
      tagColor: 'text-accent/60',
      outcome: 'text-accent',
    },
  }[theme];

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[150] bg-background/90 flex items-center justify-center p-4 backdrop-blur-sm"
    >
      <div className={`bg-card border-2 ${styles.border} p-5 max-w-lg w-full ${styles.glow}`}>
        <div className={`text-[10px] font-mono uppercase tracking-widest mb-2 ${styles.tagColor}`}>{styles.tag}</div>
        <h2 className={`text-xl sm:text-2xl font-bold mb-3 ${styles.heading} glitch-text`}>{event.headline}</h2>
        
        {!outcome ? (
          <>
            <p className={`mb-5 font-mono text-sm leading-relaxed ${styles.body}`}>{event.body}</p>
            <div className="flex flex-col gap-2">
              {event.choices.map((c, i) => (
                <button 
                  key={i} onClick={() => handleChoice(c)}
                  className={`text-left border p-3 transition-colors group ${styles.btn}`}
                >
                  <div className="font-bold text-sm group-hover:translate-x-1 transition-transform">{c.label}</div>
                  <div className="text-xs opacity-60 mt-1 font-mono">
                    {Object.entries(c.deltas).map(([k,v]) => `${Number(v)>0?'+':''}${v} ${k}`).join(' · ')}
                  </div>
                </button>
              ))}
            </div>
          </>
        ) : (
          <div className={`py-8 text-center font-mono text-sm ${styles.outcome}`}>
            <p>{outcome}</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export function GameOverPhase() {
  const { state, dispatch } = useGame();
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-background">
      <div className="max-w-lg w-full text-center border-2 border-destructive p-8 bg-destructive/5"
        style={{ boxShadow: '0 0 20px rgba(220,50,50,0.2)'}}>
        <h1 className="text-4xl sm:text-5xl font-display text-destructive mb-4 glitch-text">SIMULATION TERMINATED</h1>
        <p className="text-base text-foreground/70 mb-8 font-mono leading-relaxed">{state.gameOverReason}</p>
        
        <div className="grid grid-cols-2 gap-3 mb-8 text-xs font-mono text-foreground/50 border border-destructive/20 p-3">
          <div>Final Year: {Math.floor(state.year)}</div>
          <div>Funding: {Math.floor(state.funding)}</div>
          <div>Safety: {Math.floor(state.safety)}</div>
          <div>Talent: {Math.floor(state.talent)}</div>
        </div>

        <TerminalButton variant="danger" onClick={() => dispatch({ type: 'NEW_GAME' })}>Reboot Simulation</TerminalButton>
      </div>
    </div>
  );
}

export function EndingPhase() {
  const { state, dispatch } = useGame();
  const ending = evaluateEnding(state);
  const [showNGP, setShowNGP] = useState(false);

  const radarData = [
    { subject: 'Funding', A: state.funding, fullMark: 100 },
    { subject: 'Compute', A: state.compute, fullMark: 100 },
    { subject: 'Talent', A: state.talent, fullMark: 100 },
    { subject: 'Safety', A: state.safety, fullMark: 100 },
    { subject: 'Hype', A: state.hype, fullMark: 100 },
    { subject: 'Openness', A: state.openness, fullMark: 100 },
  ];

  const handleNGP = (stat: StatKey) => {
    dispatch({ type: 'CLAIM_NEW_GAME_PLUS', payload: { stat, amount: 20 } });
  };

  return (
    <div className="min-h-screen p-4 sm:p-8 overflow-y-auto">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        <h2 className="text-primary text-xs font-mono mb-3 uppercase tracking-widest">FINAL TELEMETRY RENDERED</h2>
        <h1 className="text-4xl sm:text-5xl font-display text-foreground mb-4 text-center glitch-text">{ending?.title}</h1>
        <p className="text-sm sm:text-base text-foreground/70 mb-10 text-center max-w-2xl whitespace-pre-wrap font-mono leading-relaxed">
          {ending?.desc}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full mb-8">
          <div className="border border-primary/40 p-5 bg-card terminal-glow">
            <h3 className="text-xl text-primary font-display mb-3 border-b border-primary/20 pb-2">Your Timeline</h3>
            <ul className="space-y-3 text-xs font-mono max-h-72 overflow-y-auto pr-1">
              {state.choiceHistory.map((h, i) => (
                <li key={i} className="flex flex-col border-l-2 border-primary/20 pl-2">
                  <span className="text-accent">[{h.year}] {h.label}</span>
                  <span className="opacity-60 mt-0.5 leading-snug">{h.desc}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="border border-primary/40 p-5 bg-card terminal-glow flex flex-col items-center">
            <h3 className="text-xl text-primary font-display mb-3 border-b border-primary/20 pb-2 w-full">Final Stats</h3>
            <div className="w-full h-56">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                  <PolarGrid stroke="hsl(199 89% 55% / 0.3)" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: 'hsl(199 89% 55%)', fontSize: 11, fontFamily: 'monospace' }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar name="You" dataKey="A" stroke="hsl(199 89% 55%)" fill="hsl(199 89% 55%)" fillOpacity={0.25} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {!showNGP ? (
          <TerminalButton onClick={() => setShowNGP(true)} className="text-base px-6 py-3">Play Again (New Game+)</TerminalButton>
        ) : (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="border border-accent p-5 bg-card text-center terminal-glow-amber w-full max-w-md">
            <h3 className="text-accent text-base mb-4 font-mono">Select Legacy Bonus for Next Run (+20)</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {(['funding', 'compute', 'talent', 'safety', 'openness'] as StatKey[]).map(s => (
                <TerminalButton key={s} variant="secondary" onClick={() => handleNGP(s)} className="uppercase text-xs">{s}</TerminalButton>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
