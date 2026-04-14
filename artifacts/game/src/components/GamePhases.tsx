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
          v1.0 | All choices are fictional. All consequences are very much real (in this timeline).
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
    <div className="w-full max-w-5xl mx-auto p-3 sm:p-4 pb-6">
      {/* Header */}
      <div className="flex justify-between items-center border-b-2 border-primary/60 pb-3 mb-4">
        <div className="flex items-center gap-3">
          <div className="text-2xl sm:text-4xl font-display text-primary tracking-widest">
            YEAR {state.year.toFixed(1)}
          </div>
          <div className="hidden sm:block text-[10px] font-mono text-primary/40">
            TICK: ACTIVE | CD: {state.eventCooldown > 0 ? state.eventCooldown : 'READY'}
          </div>
        </div>
        <div className="flex gap-2">
          <TerminalButton variant="ghost" onClick={() => dispatch({ type: 'FAST_FORWARD' })} title="Skip to next milestone">⏩ FW</TerminalButton>
          <TerminalButton variant="ghost" onClick={handleSave}>
            {saveStatus === 'saved' ? '✅ SAVED' : '💾 SAVE'}
          </TerminalButton>
        </div>
      </div>

      {/* Milestone ready banner — inline, not a full-screen overlay */}
      {state.milestoneReady && (
        <motion.button
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={() => dispatch({ type: 'START_MILESTONE' })}
          className="w-full mb-4 py-3 bg-primary/15 border-2 border-primary text-primary font-display text-lg sm:text-xl tracking-widest uppercase hover:bg-primary hover:text-primary-foreground transition-all terminal-glow animate-pulse"
        >
          ⚠ INCOMING TRANSMISSION — MILESTONE {Math.floor(state.year)} ⚠
        </motion.button>
      )}

      {/* Secondary stats row */}
      <div className="flex flex-wrap gap-3 mb-4 p-3 border border-primary/20 bg-card/50">
        <StatBadge label="Hype" value={state.hype} />
        <StatBadge label="Openness" value={state.openness} />
        <div className="flex gap-3 ml-auto text-[10px] opacity-50 font-mono items-center uppercase flex-wrap">
          <span>Drift {Math.floor(state.missionDrift)}</span>
          <span>Board {Math.floor(state.boardTension)}</span>
          <span>MS {Math.floor(state.msInfluence)}</span>
          <span>Rival {Math.floor(state.rivalPressure)}</span>
        </div>
      </div>

      {/* Resource cards + log — 2-col on sm+ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        {/* Resources */}
        <div className="space-y-3">
          <h2 className="text-sm font-bold text-primary/60 uppercase tracking-widest">Resources</h2>
          <ResourceCard name="Funding" icon="💰" value={state.funding} clickLabel="Raise Capital" onClick={() => dispatch({ type: 'CLICK_RESOURCE', resource: 'funding', amount: Math.floor(Math.random()*3)+3 })} />
          <ResourceCard name="Compute" icon="🖥️" value={state.compute} clickLabel="Buy GPUs" onClick={() => dispatch({ type: 'CLICK_RESOURCE', resource: 'compute', amount: Math.floor(Math.random()*3)+2 })} />
          <ResourceCard name="Talent" icon="🧑‍💻" value={state.talent} clickLabel="Recruit" onClick={() => dispatch({ type: 'CLICK_RESOURCE', resource: 'talent', amount: Math.floor(Math.random()*3)+1 })} />
          <ResourceCard name="Safety" icon="🛡️" value={state.safety} clickLabel="Align Models" onClick={() => dispatch({ type: 'CLICK_RESOURCE', resource: 'safety', amount: Math.floor(Math.random()*2)+2 })} />
        </div>

        {/* Decision log */}
        <div className="flex flex-col">
          <h2 className="text-sm font-bold text-primary/60 uppercase tracking-widest mb-3">Decision Log</h2>
          <div className="border border-primary/20 p-3 bg-card/50 overflow-y-auto" style={{ maxHeight: '320px' }}>
            <div className="space-y-3 font-mono text-xs">
              {state.choiceHistory.slice().reverse().map((h, i) => (
                <div key={i} className="border-l-2 border-primary/30 pl-3">
                  <div className="text-primary/50">[{h.year}] {h.label}</div>
                  <div className="text-foreground/70 mt-0.5 leading-snug">{h.desc}</div>
                </div>
              ))}
              {state.choiceHistory.length === 0 && (
                <div className="text-muted-foreground italic">No decisions recorded yet.</div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Status bar */}
      <div className="border border-primary/20 p-2 sm:p-3 bg-card/50 flex items-center gap-2 font-mono text-xs">
        <span className="text-primary animate-pulse shrink-0">root@openai:~#</span>
        <span className="text-foreground/60 truncate">{state.latestIntel}</span>
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
    const delay = 13000;
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
