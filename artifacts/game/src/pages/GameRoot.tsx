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

export function GameRoot() {
  const { state, dispatch } = useGame();
  const [achievementsOpen, setAchievementsOpen] = useState(false);

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

  return (
    <div className="min-h-screen bg-background text-foreground font-mono relative overflow-hidden">
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

      {/* Global persistent controls */}
      {(state.phase === 'title' || state.phase === 'playing') && (
        <div className="fixed top-4 right-4 z-[90]">
          <TerminalButton variant="ghost" onClick={() => setAchievementsOpen(true)}>
            🏆 ACHIEVEMENTS
          </TerminalButton>
        </div>
      )}
    </div>
  );
}
