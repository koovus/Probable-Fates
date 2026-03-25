import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useGame, serializeState, deserializeState, evaluateEnding } from '@/lib/engine';
import { TerminalButton, ResourceCard, StatBadge } from './TerminalUI';
import { MILESTONES, EVENTS, Choice, StatKey } from '@/lib/content';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

export function TitlePhase() {
  const { dispatch } = useGame();
  const hasSave = !!localStorage.getItem('probable-fates-save');

  const load = () => {
    const data = localStorage.getItem('probable-fates-save');
    if (data) {
      dispatch({ type: 'LOAD_GAME', payload: deserializeState(data) });
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-4">
      <div 
        className="absolute inset-0 z-0 opacity-20 bg-cover bg-center" 
        style={{ backgroundImage: `url(${import.meta.env.BASE_URL}images/hero-bg.png)` }} 
      />
      <div className="z-10 text-center max-w-3xl border-2 border-primary bg-black/60 p-12 backdrop-blur-sm terminal-glow">
        <h1 className="text-5xl md:text-7xl font-display text-primary glitch-text mb-4">OpenAI Simulator</h1>
        <h2 className="text-2xl text-primary/80 font-mono mb-8 uppercase tracking-widest border-b border-primary/30 pb-4">Probable Fates</h2>
        <p className="text-foreground/80 mb-12">Build (or break) the future of AI — one click and one irreversible decision at a time.</p>
        
        <div className="flex flex-col gap-4 max-w-xs mx-auto">
          <TerminalButton onClick={() => dispatch({ type: 'SET_PHASE', payload: 'persona' })}>New Game</TerminalButton>
          {hasSave && <TerminalButton onClick={load} variant="secondary">Continue Save</TerminalButton>}
        </div>
        
        <p className="mt-12 text-xs text-primary/50 font-mono opacity-70">
          v1.0 | All choices are fictional. All consequences are very much real (in this timeline).
        </p>
      </div>
    </div>
  );
}

export function PersonaPhase() {
  const { dispatch } = useGame();
  
  const personas = [
    { id: 'safety', icon: '🧠', title: 'Safety Maximalist', bonus: 'Safety +15, Hype -5', desc: "You genuinely believe AGI could end civilization. Not in a fun way. You read every alignment paper and lose sleep nightly. Your investors think you're paranoid. You think they're reckless. You're both right." },
    { id: 'hustler', icon: '🚀', title: 'Hustler CEO', bonus: 'Funding +15, Hype +10, Safety -10', desc: "Move fast, break things, launch first, apologize later. You have a 5-year plan, a 10-year plan, and absolutely no work-life balance. CNBC once called you 'visionary.' Your safety team calls you 'a liability.'" },
    { id: 'opensrc', icon: '🌐', title: 'Open-Source Idealist', bonus: 'Openness +20, Talent +10, Funding -10', desc: "Information wants to be free. Weights want to be free. Your mortgage payment also wants to be free, but that's a problem for future you. You believe in democratizing AI even if it democratizes catastrophe." }
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h2 className="text-4xl text-primary mb-12 font-display uppercase tracking-widest text-center">Select Founder Persona</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full">
        {personas.map(p => (
          <div key={p.id} className="border border-primary/50 p-6 bg-card hover:bg-primary/5 hover:border-primary transition-all cursor-pointer group flex flex-col h-full" onClick={() => dispatch({ type: 'SET_PERSONA', payload: p.id as any })}>
            <div className="text-6xl mb-4 grayscale group-hover:grayscale-0 transition-all">{p.icon}</div>
            <h3 className="text-2xl font-bold text-primary mb-2 uppercase">{p.title}</h3>
            <div className="text-xs text-accent font-mono bg-accent/10 p-2 mb-4">BONUS: {p.bonus}</div>
            <p className="text-sm text-foreground/80 flex-grow leading-relaxed">{p.desc}</p>
            <div className="mt-6 text-primary/50 group-hover:text-primary transition-colors text-sm text-center">
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

  const handleSave = () => {
    localStorage.setItem('probable-fates-save', serializeState(state));
    dispatch({ type: 'IDLE_TICK', payload: { fundRoll: 0, computeRoll: 0, talentRoll: 0, eventRoll: 0 }}); // dummy tick to force re-render, though not strictly needed
    alert("Simulation saved to local storage.");
  };

  return (
    <div className="flex flex-col h-screen p-4 max-w-7xl mx-auto w-full">
      <div className="flex justify-between items-center border-b-2 border-primary pb-4 mb-6">
        <div className="flex items-center gap-4">
          <div className="text-3xl md:text-5xl font-display text-primary tracking-widest">
            YEAR {state.year.toFixed(1)}
          </div>
          <div className="hidden md:block text-xs font-mono text-primary/50 mt-2">
            IDLE_TICKS: ACTIVE | COOLDOWN: {state.eventCooldown > 0 ? state.eventCooldown : 'READY'}
          </div>
        </div>
        <div className="flex gap-2">
          <TerminalButton variant="ghost" onClick={() => dispatch({ type: 'FAST_FORWARD'})} title="Skip to next milestone">⏩ FW</TerminalButton>
          <TerminalButton variant="ghost" onClick={handleSave}>💾 SAVE</TerminalButton>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
        <div className="col-span-1 border border-primary/30 p-4 bg-black/50 flex flex-col gap-4 overflow-y-auto">
          <h2 className="text-xl font-bold text-primary uppercase border-b border-primary/30 pb-2">Resource Allocation</h2>
          <ResourceCard name="Funding" icon="💰" value={state.funding} clickLabel="Raise Capital" onClick={() => dispatch({ type: 'CLICK_RESOURCE', resource: 'funding', amount: Math.floor(Math.random()*3)+3 })} />
          <ResourceCard name="Compute" icon="🖥️" value={state.compute} clickLabel="Buy GPUs" onClick={() => dispatch({ type: 'CLICK_RESOURCE', resource: 'compute', amount: Math.floor(Math.random()*3)+2 })} />
          <ResourceCard name="Talent" icon="🧑‍💻" value={state.talent} clickLabel="Recruit" onClick={() => dispatch({ type: 'CLICK_RESOURCE', resource: 'talent', amount: Math.floor(Math.random()*3)+1 })} />
          <ResourceCard name="Safety" icon="🛡️" value={state.safety} clickLabel="Align Models" onClick={() => dispatch({ type: 'CLICK_RESOURCE', resource: 'safety', amount: Math.floor(Math.random()*2)+2 })} />
        </div>

        <div className="col-span-1 lg:col-span-2 border border-primary/30 p-4 bg-black/50 flex flex-col relative overflow-hidden">
          <div className="flex flex-wrap gap-4 mb-6 border-b border-primary/30 pb-4">
            <StatBadge label="Public Hype" value={state.hype} />
            <StatBadge label="Model Openness" value={state.openness} />
            
            <div className="flex gap-4 ml-auto text-[10px] opacity-40 font-mono items-center uppercase">
               <span>Drift: {Math.floor(state.missionDrift)}</span>
               <span>Board: {Math.floor(state.boardTension)}</span>
               <span>MS_Inf: {Math.floor(state.msInfluence)}</span>
               <span>Rival: {Math.floor(state.rivalPressure)}</span>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto pr-2 mb-4 border border-primary/20 p-4">
            <h3 className="text-primary/70 uppercase text-xs mb-4">Historical Telemetry Log</h3>
            <div className="space-y-4 font-mono text-sm">
              {state.choiceHistory.slice().reverse().map((h, i) => (
                <div key={i} className="border-l-2 border-primary/30 pl-3">
                  <div className="text-primary/50 text-xs">[{h.year}] {h.label}</div>
                  <div className="text-foreground/80">{h.desc}</div>
                </div>
              ))}
              {state.choiceHistory.length === 0 && <div className="text-muted-foreground italic">No major structural decisions recorded yet.</div>}
            </div>
          </div>

          {state.milestoneReady && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-10 p-4"
            >
              <button 
                onClick={() => dispatch({ type: 'START_MILESTONE' })}
                className="w-full max-w-md h-32 bg-primary/20 border-2 border-primary text-primary font-display text-2xl tracking-widest uppercase hover:bg-primary hover:text-primary-foreground transition-all terminal-glow animate-pulse"
              >
                ⚠️ INCOMING TRANSMISSION<br/><span className="text-lg opacity-80">MILESTONE EVENT {Math.floor(state.year)}</span>
              </button>
            </motion.div>
          )}
        </div>
      </div>

      <div className="mt-4 border border-primary/30 p-3 h-20 bg-black flex items-center font-mono text-sm terminal-glow">
        <span className="text-primary mr-2 animate-pulse">root@openai:~#</span> 
        <span className="text-foreground/80">{state.latestIntel}</span>
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
      className="fixed inset-0 z-[200] bg-background flex flex-col p-4 md:p-12 overflow-y-auto scanlines"
    >
      <div className="max-w-4xl w-full mx-auto">
        <h2 className="text-primary text-2xl font-mono mb-2 border-b border-primary/30 pb-2 uppercase">CLASSIFIED BRIEFING // {milestone.year}</h2>
        <h1 className="text-4xl md:text-6xl font-display text-foreground mb-8 glitch-text">{milestone.title}</h1>
        
        {!outcome ? (
          <>
            <div className="text-lg md:text-xl text-foreground/90 leading-relaxed mb-12 whitespace-pre-wrap font-mono">
              {milestone.narrative}
            </div>
            <div className="grid grid-cols-1 gap-4">
              {milestone.choices.map((c, i) => (
                <button 
                  key={i}
                  onClick={() => handleChoice(c)}
                  className="text-left border border-primary/50 p-4 hover:bg-primary/10 hover:border-primary transition-all group terminal-glow"
                >
                  <div className="font-bold text-primary text-xl mb-2 group-hover:translate-x-2 transition-transform">
                    {c.label}
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs font-mono">
                    {Object.entries(c.deltas).map(([k, v]) => (
                      <span key={k} className={Number(v) > 0 ? 'text-green-400' : 'text-red-400'}>
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
            className="flex flex-col items-center justify-center py-20 text-center border-2 border-primary bg-primary/5 p-8 terminal-glow"
          >
            <div className="text-2xl font-mono text-primary mb-6">OUTCOME RECORDED</div>
            <p className="text-xl text-foreground">{outcome}</p>
            <div className="mt-12 text-primary/50 animate-pulse text-sm font-mono">Resuming simulation parameters...</div>
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

  const handleChoice = (c: Choice) => {
    setOutcome(c.outcome);
    setTimeout(() => {
      dispatch({ type: 'RESOLVE_EVENT', payload: { choice: c } });
    }, 2500);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[150] bg-black/80 flex items-center justify-center p-4 backdrop-blur-md"
    >
      <div className="bg-background border-2 border-accent p-6 max-w-xl w-full terminal-glow-amber scanlines">
        <h2 className="text-2xl font-bold mb-4 text-accent glitch-text">{event.headline}</h2>
        
        {!outcome ? (
          <>
            <p className="mb-6 text-foreground/90 font-mono">{event.body}</p>
            <div className="flex flex-col gap-3">
              {event.choices.map((c, i) => (
                <button 
                  key={i} onClick={() => handleChoice(c)}
                  className="text-left border border-accent/50 p-3 hover:bg-accent/10 transition-colors group"
                >
                  <div className="text-accent font-bold group-hover:translate-x-1 transition-transform">{c.label}</div>
                  <div className="text-xs opacity-70 mt-1">
                    {Object.entries(c.deltas).map(([k,v]) => `${Number(v)>0?'+':''}${v} ${k}`).join(' | ')}
                  </div>
                </button>
              ))}
            </div>
          </>
        ) : (
          <div className="py-8 text-center text-accent font-mono text-lg">
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
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-background scanlines">
      <div className="max-w-2xl text-center border-2 border-destructive p-12 bg-destructive/5 terminal-glow" style={{ boxShadow: '0 0 20px rgba(255,0,0,0.3)'}}>
        <h1 className="text-5xl font-display text-destructive mb-6 glitch-text">SIMULATION TERMINATED</h1>
        <p className="text-xl text-foreground/80 mb-8 font-mono">{state.gameOverReason}</p>
        
        <div className="grid grid-cols-2 gap-4 mb-12 text-sm font-mono opacity-60">
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
    dispatch({ type: 'CLAIM_NEW_GAME_PLUS', payload: { stat, amount: 20 }});
  };

  return (
    <div className="min-h-screen p-4 md:p-8 overflow-y-auto scanlines">
      <div className="max-w-5xl mx-auto flex flex-col items-center">
        <h2 className="text-primary text-xl font-mono mb-4 uppercase tracking-widest">FINAL TELEMETRY RENDERED</h2>
        <h1 className="text-5xl md:text-6xl font-display text-foreground mb-6 text-center glitch-text">{ending?.title}</h1>
        <p className="text-lg text-foreground/80 mb-12 text-center max-w-3xl whitespace-pre-wrap font-mono leading-relaxed">
          {ending?.desc}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full mb-12">
          <div className="border border-primary/50 p-6 bg-card terminal-glow">
            <h3 className="text-2xl text-primary font-display mb-4 border-b border-primary/30 pb-2">Your Timeline</h3>
            <ul className="space-y-4 text-sm font-mono max-h-[400px] overflow-y-auto pr-2">
              {state.choiceHistory.map((h, i) => (
                <li key={i} className="flex flex-col">
                  <span className="text-accent">[{h.year}] {h.label}</span>
                  <span className="opacity-70 mt-1">{h.desc}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="border border-primary/50 p-6 bg-card terminal-glow flex flex-col items-center">
            <h3 className="text-2xl text-primary font-display mb-4 border-b border-primary/30 pb-2 w-full">Final Stat Matrix</h3>
            <div className="w-full h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                  <PolarGrid stroke="#00ff00" opacity={0.3} />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#00ff00', fontSize: 12, fontFamily: 'monospace' }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar name="You" dataKey="A" stroke="#00ff00" fill="#00ff00" fillOpacity={0.3} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {!showNGP ? (
          <TerminalButton onClick={() => setShowNGP(true)} className="text-xl px-8 py-4">Play Again (New Game+)</TerminalButton>
        ) : (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="border border-accent p-6 bg-card text-center terminal-glow-amber">
            <h3 className="text-accent text-xl mb-4 font-mono">Select Legacy Bonus for Next Run (+20)</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {['funding', 'compute', 'talent', 'safety', 'openness'].map(s => (
                <TerminalButton key={s} variant="secondary" onClick={() => handleNGP(s as StatKey)} className="uppercase">{s}</TerminalButton>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
