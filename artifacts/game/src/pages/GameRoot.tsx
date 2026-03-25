import React, { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useGame } from '@/lib/engine';
import { 
  TitlePhase, 
  PersonaPhase, 
  PlayingPhase, 
  MilestonePhase, 
  EventModal, 
  GameOverPhase, 
  EndingPhase 
} from '@/components/GamePhases';
import { AchievementsModal } from '@/components/AchievementsModal';
import { TerminalButton } from '@/components/TerminalUI';
import { setMusicBuildLevel, toggleMute, isMuted } from '@/lib/music';

export function GameRoot() {
  const { state, dispatch } = useGame();
  const [achievementsOpen, setAchievementsOpen] = useState(false);
  const [musicMuted, setMusicMuted] = useState(false);

  // Idle tick every 4 seconds while playing
  useEffect(() => {
    if (state.phase !== 'playing') return;
    const interval = setInterval(() => {
      dispatch({ 
        type: 'IDLE_TICK', 
        payload: { 
          fundRoll: Math.random(), 
          computeRoll: Math.random(), 
          talentRoll: Math.random(), 
          eventRoll: Math.random() 
        }
      });
    }, 4000);
    return () => clearInterval(interval);
  }, [state.phase, dispatch]);

  // Music build level: advance a layer every 2 milestones cleared
  useEffect(() => {
    if (state.phase === 'playing' || state.phase === 'milestone') {
      const level = Math.min(4, Math.floor(state.milestoneIndex / 2) + 1);
      setMusicBuildLevel(level);
    }
    if (state.phase === 'ending') {
      setMusicBuildLevel(4);
    }
  }, [state.phase, state.milestoneIndex]);

  const handleMuteToggle = () => {
    const nowMuted = toggleMute();
    setMusicMuted(nowMuted);
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-mono relative">
      <AnimatePresence mode="wait">
        {state.phase === 'title' && <TitlePhase key="title" />}
        {state.phase === 'persona' && <PersonaPhase key="persona" />}
        {state.phase === 'playing' && <PlayingPhase key="playing" />}
        {state.phase === 'milestone' && <MilestonePhase key="milestone" />}
        {state.phase === 'gameover' && <GameOverPhase key="gameover" />}
        {state.phase === 'ending' && <EndingPhase key="ending" />}
      </AnimatePresence>

      <AnimatePresence>
        {state.activeEvent && <EventModal key="event" />}
      </AnimatePresence>

      <AchievementsModal isOpen={achievementsOpen} onClose={() => setAchievementsOpen(false)} />

      {/* Persistent top-right controls */}
      <div className="fixed top-3 right-3 z-[90] flex gap-2 items-center">
        {/* Music toggle — only shown once game has started */}
        {state.phase !== 'title' && (
          <button
            onClick={handleMuteToggle}
            title={musicMuted ? 'Unmute music' : 'Mute music'}
            className="flex items-center gap-1.5 px-3 py-1.5 border-2 border-primary bg-card text-primary font-mono text-xs uppercase tracking-widest hover:bg-primary hover:text-primary-foreground transition-all terminal-glow"
          >
            <span className="text-base leading-none">{musicMuted ? '🔇' : '🎵'}</span>
            <span>{musicMuted ? 'MUTED' : 'MUSIC'}</span>
          </button>
        )}
        {(state.phase === 'title' || state.phase === 'playing') && (
          <TerminalButton variant="ghost" onClick={() => setAchievementsOpen(true)}>
            🏆 ACHIEVEMENTS
          </TerminalButton>
        )}
      </div>
    </div>
  );
}
