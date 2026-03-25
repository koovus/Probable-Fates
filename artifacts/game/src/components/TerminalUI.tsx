import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export function TerminalButton({ 
  onClick, children, className, disabled, variant = 'primary' 
}: { 
  onClick?: () => void, children: React.ReactNode, className?: string, disabled?: boolean, variant?: 'primary'|'secondary'|'danger'|'ghost' 
}) {
  const base = "relative px-4 py-2 font-mono uppercase tracking-wider font-bold transition-all active:scale-95 group";
  const variants = {
    primary: "border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground terminal-glow",
    secondary: "border-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground terminal-glow-amber",
    danger: "border-2 border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground",
    ghost: "text-primary/70 hover:text-primary hover:bg-primary/10"
  };

  return (
    <button 
      onClick={onClick} 
      disabled={disabled}
      className={cn(base, variants[variant], disabled && "opacity-50 cursor-not-allowed", className)}
    >
      <span className="opacity-0 group-hover:opacity-100 transition-opacity mr-2">&gt;</span>
      {children}
      <span className="opacity-0 group-hover:opacity-100 transition-opacity ml-2 animate-pulse">_</span>
    </button>
  );
}

export function ResourceCard({ 
  name, icon, value, onClick, clickLabel 
}: { 
  name: string, icon: string, value: number, onClick: () => void, clickLabel: string 
}) {
  const color = value > 60 ? 'bg-primary' : value > 30 ? 'bg-accent' : 'bg-destructive';
  
  return (
    <div className="border border-primary/30 p-4 bg-card relative overflow-hidden group hover:border-primary transition-colors terminal-glow">
       <div className="flex justify-between items-center mb-2">
         <span className="font-bold text-lg text-primary flex items-center gap-2">
            <span>{icon}</span> {name}
         </span>
         <span className="font-mono text-xl text-primary">{Math.floor(value)}</span>
       </div>
       <div className="h-4 bg-black/50 border border-primary/30 w-full mb-4 relative">
          <motion.div 
            className={cn("h-full absolute left-0 top-0 transition-all", color)} 
            initial={{ width: 0 }}
            animate={{ width: `${value}%` }}
            transition={{ type: 'spring', bounce: 0, duration: 0.5 }}
          />
       </div>
       <button 
         onClick={onClick}
         className="w-full py-2 bg-primary/10 hover:bg-primary/20 border border-primary/50 text-primary font-mono text-sm uppercase tracking-wider transition-all active:scale-95"
       >
         &gt; {clickLabel} _
       </button>
    </div>
  )
}

export function StatBadge({ label, value }: { label: string, value: number }) {
  const colorText = value > 60 ? 'text-primary' : value > 30 ? 'text-accent' : 'text-destructive';
  return (
    <div className="flex flex-col border border-primary/30 px-3 py-1 bg-black/30 terminal-glow">
      <span className="text-[10px] uppercase text-primary/70">{label}</span>
      <span className={cn("font-bold font-mono text-lg", colorText)}>{Math.floor(value)}</span>
    </div>
  )
}
