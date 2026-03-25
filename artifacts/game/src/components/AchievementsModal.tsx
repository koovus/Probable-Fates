import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ACHIEVEMENTS } from '@/lib/content';
import { useGame } from '@/lib/engine';
import { TerminalButton } from './TerminalUI';

export function AchievementsModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const { state } = useGame();
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm"
        >
          <motion.div 
            initial={{ scale: 0.9, y: 20 }} 
            animate={{ scale: 1, y: 0 }} 
            exit={{ scale: 0.9, y: 20 }}
            className="bg-card border-2 border-accent p-6 max-w-4xl w-full max-h-[80vh] overflow-y-auto terminal-glow-amber scanlines"
          >
            <div className="flex justify-between items-center border-b-2 border-accent pb-4 mb-6">
              <h2 className="text-3xl text-accent font-display tracking-widest uppercase">Trophy Case</h2>
              <TerminalButton variant="secondary" onClick={onClose}>Close</TerminalButton>
            </div>
            
            <div className="mb-4 text-accent/80 font-mono">
              Unlocked: {state.savedAchievements.length} / {ACHIEVEMENTS.length}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {ACHIEVEMENTS.map(ach => {
                const unlocked = state.savedAchievements.includes(ach.id);
                return (
                  <div key={ach.id} className={`border p-4 flex gap-4 items-start ${unlocked ? 'border-accent bg-accent/10' : 'border-muted opacity-50'}`}>
                    <div className="text-4xl grayscale-0">{unlocked ? ach.icon : '❓'}</div>
                    <div>
                      <h4 className={`font-bold ${unlocked ? 'text-accent' : 'text-muted-foreground'}`}>{unlocked ? ach.title : 'Locked'}</h4>
                      <p className="text-xs text-foreground/70 mt-1">{ach.desc}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
