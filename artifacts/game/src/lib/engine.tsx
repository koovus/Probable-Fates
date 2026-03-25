import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Choice, ENDINGS, EVENTS, MILESTONES, StatKey, ACHIEVEMENTS } from './content';

export type GamePhase = 'title' | 'persona' | 'playing' | 'milestone' | 'gameover' | 'ending';

export interface ChoiceHistoryItem {
  year: number;
  label: string;
  desc: string;
}

export type GameState = {
  phase: GamePhase;
  persona: 'safety' | 'hustler' | 'opensrc' | null;
  funding: number;
  compute: number;
  talent: number;
  safety: number;
  hype: number;
  openness: number;
  year: number;
  missionDrift: number;
  boardTension: number;
  msInfluence: number;
  rivalPressure: number;
  flags: Set<string>;
  milestoneIndex: number;
  choiceHistory: ChoiceHistoryItem[];
  achievements: string[];
  savedAchievements: string[];
  newGamePlusBonus: null | { stat: StatKey; amount: number };
  gameOverReason: string | null;
  milestoneReady: boolean;
  activeEvent: string | null;
  eventCooldown: number;
  latestIntel: string;
  fastForwardCount: number;
  minSafetyReached: number;
  hadGameOver: boolean;
};

export type GameAction =
  | { type: 'NEW_GAME' }
  | { type: 'LOAD_GAME'; payload: GameState }
  | { type: 'SET_PERSONA'; payload: 'safety' | 'hustler' | 'opensrc' }
  | { type: 'CLICK_RESOURCE'; resource: StatKey; amount: number }
  | { type: 'IDLE_TICK'; payload: { fundRoll: number; computeRoll: number; talentRoll: number; eventRoll: number } }
  | { type: 'START_MILESTONE' }
  | { type: 'RESOLVE_MILESTONE'; payload: { choice: Choice } }
  | { type: 'RESOLVE_EVENT'; payload: { choice: Choice } }
  | { type: 'FAST_FORWARD' }
  | { type: 'CLAIM_NEW_GAME_PLUS'; payload: { stat: StatKey; amount: number } }
  | { type: 'LOAD_ACHIEVEMENTS'; payload: string[] }
  | { type: 'SET_PHASE'; payload: GamePhase };

const getInitialState = (): GameState => ({
  phase: 'title',
  persona: null,
  funding: 30,
  compute: 30,
  talent: 30,
  safety: 30,
  hype: 10,
  openness: 30,
  year: 2015.0,
  missionDrift: 0,
  boardTension: 0,
  msInfluence: 0,
  rivalPressure: 0,
  flags: new Set(),
  milestoneIndex: 0,
  choiceHistory: [],
  achievements: [],
  savedAchievements: [],
  newGamePlusBonus: null,
  gameOverReason: null,
  milestoneReady: true,
  activeEvent: null,
  eventCooldown: 5,
  latestIntel: "System initialized. Welcome to the simulation.",
  fastForwardCount: 0,
  minSafetyReached: 30,
  hadGameOver: false,
});

const clampStats = (state: GameState) => {
  const stats: StatKey[] = ['funding', 'compute', 'talent', 'safety', 'hype', 'openness', 'missionDrift', 'boardTension', 'msInfluence', 'rivalPressure'];
  stats.forEach(s => {
    if (state[s] < 0) state[s] = 0;
    if (state[s] > 100) state[s] = 100;
  });
  if (state.safety < state.minSafetyReached) state.minSafetyReached = state.safety;
  return state;
};

export const evaluateEnding = (state: GameState) => {
  if (state.safety >= 70 && state.compute >= 60 && (state.flags.has('safety_team_wins') || state.flags.has('independent_oversight'))) return ENDINGS.find(e=>e.id==='safe_agi');
  if (state.funding >= 80 && state.hype >= 70 && (state.flags.has('full_forprofit') || state.flags.has('ms_deal_max'))) return ENDINGS.find(e=>e.id==='trillion_empire');
  if (state.openness >= 80 && (state.flags.has('gpt4_open_sourced') || state.flags.has('dissolved') || state.flags.has('gpt2_released_openly'))) return ENDINGS.find(e=>e.id==='opensource_chaos');
  if (state.flags.has('acquired') || state.msInfluence >= 80) return ENDINGS.find(e=>e.id==='acquired');
  if (state.boardTension >= 80 || state.flags.has('altman_ousted')) return ENDINGS.find(e=>e.id==='board_coup');
  if (state.safety <= 20 && state.hype >= 60 && state.missionDrift >= 60) return ENDINGS.find(e=>e.id==='regulatory_shutdown');
  if (state.rivalPressure >= 75 && (state.funding < 40 || state.compute < 40)) return ENDINGS.find(e=>e.id==='rival_ascendancy');
  if (state.safety >= 60 && (state.funding < 30 || state.talent < 30) && state.flags.has('safety_slowdown')) return ENDINGS.find(e=>e.id==='noble_failure');
  if (state.safety <= 10 && state.compute >= 70 && state.missionDrift >= 70) return ENDINGS.find(e=>e.id==='rogue_agi');
  return ENDINGS.find(e=>e.id==='balanced_future');
};

const checkGameOverAndAchievements = (state: GameState) => {
  if (state.phase === 'gameover') return state;

  // Evaluate ending achievements immediately when phase transitions to 'ending'
  if (state.phase === 'ending') {
    const unlock = (id: string) => {
      if (!state.achievements.includes(id)) state.achievements.push(id);
      if (!state.savedAchievements.includes(id)) {
        state.savedAchievements.push(id);
        localStorage.setItem('probable-fates-achievements', JSON.stringify(state.savedAchievements));
      }
    };
    const ending = evaluateEnding(state);
    if (ending?.id === 'safe_agi') unlock('true_believer');
    if (ending?.id === 'trillion_empire') unlock('show_me_the_money');
    if (ending?.id === 'board_coup') unlock('boardroom_survivor');
    if (ending?.id === 'rogue_agi') unlock('dystopia_unlocked');
    if (ending?.id === 'noble_failure') unlock('noble_loser');
    if (ending?.id === 'trillion_empire' && state.persona === 'hustler') unlock('hustler_win');
    if (ending?.id === 'opensource_chaos' && state.persona === 'opensrc') unlock('open_source_hero');
    if ((ending?.id === 'safe_agi' || ending?.id === 'balanced_future') && state.persona === 'safety') unlock('safety_maximalist_win');
    if (!state.hadGameOver) unlock('clean_hands');
    if (state.minSafetyReached >= 70) unlock('paranoid_android');
    if (state.fastForwardCount <= 2) unlock('slow_burn');
    return state;
  }

  if (state.funding <= 0) {
    state.phase = 'gameover';
    state.hadGameOver = true;
    state.gameOverReason = "The servers went dark. The investors moved on. It turns out 'we're not primarily a for-profit company' doesn't pay the electric bill.";
  } else if (state.safety <= 5 && state.hype >= 70) {
    state.phase = 'gameover';
    state.hadGameOver = true;
    state.gameOverReason = "The regulatory hammer fell with extreme prejudice. Turns out releasing a disinformation engine with maximum hype and minimum guardrails has... consequences.";
  } else if (state.talent <= 5) {
    state.phase = 'gameover';
    state.hadGameOver = true;
    state.gameOverReason = "Your last senior researcher just accepted an offer from Anthropic. They left a succulent on your desk. Its name is 'Goodbye.'";
  }

  const unlock = (id: string) => {
    if (!state.achievements.includes(id)) state.achievements.push(id);
    if (!state.savedAchievements.includes(id)) {
      state.savedAchievements.push(id);
      localStorage.setItem('probable-fates-achievements', JSON.stringify(state.savedAchievements));
    }
  };

  // Mid-game achievements (checked continuously)
  if (state.funding >= 80 && state.hype >= 70) unlock('show_me_the_money');
  if (state.openness >= 80) unlock('open_everything');
  if (state.milestoneIndex >= 4 && state.year < 2022) unlock('move_fast');
  if (state.flags.has('event_musk_tweet') && state.boardTension < 30) unlock('musk_whisperer');

  // Game-over achievements
  if (state.phase === 'gameover') {
    if (state.gameOverReason?.includes('regulatory')) unlock('safety_last');
  }

  return state;
};

const gameReducer = (state: GameState, action: GameAction): GameState => {
  let newState = { ...state };
  switch (action.type) {
    case 'NEW_GAME':
      newState = getInitialState();
      newState.savedAchievements = state.savedAchievements;
      if (state.newGamePlusBonus) newState.newGamePlusBonus = state.newGamePlusBonus;
      return newState;
    case 'LOAD_GAME':
      return { ...action.payload, savedAchievements: state.savedAchievements };
    case 'SET_PERSONA':
      newState.persona = action.payload;
      if (action.payload === 'safety') { newState.safety += 15; newState.hype -= 5; }
      if (action.payload === 'hustler') { newState.funding += 15; newState.hype += 10; newState.safety -= 10; }
      if (action.payload === 'opensrc') { newState.openness += 20; newState.talent += 10; newState.funding -= 10; }
      if (newState.newGamePlusBonus) {
        newState[newState.newGamePlusBonus.stat] += newState.newGamePlusBonus.amount;
      }
      newState.phase = 'playing';
      newState.milestoneReady = true;
      break;
    case 'CLICK_RESOURCE':
      newState[action.resource] += action.amount;
      break;
    case 'IDLE_TICK':
      if (newState.phase !== 'playing' || newState.milestoneReady || newState.activeEvent) return state;
      newState.funding += 1 + action.payload.fundRoll * 1 + (newState.talent / 20) + (newState.persona === 'hustler' ? 1 : 0);
      newState.compute += 1 + (newState.flags.has('ms_deal_max') ? 2 : newState.flags.has('ms_deal_partial') ? 1 : 0);
      newState.talent += action.payload.talentRoll * 1 + (newState.persona === 'opensrc' ? 1 : 0);
      
      const nextYear = MILESTONES[newState.milestoneIndex]?.year;
      if (nextYear && newState.year + 0.25 >= nextYear) {
        newState.year = nextYear;
        newState.milestoneReady = true;
      } else {
        newState.year += 0.25;
      }

      if (!newState.milestoneReady && newState.eventCooldown <= 0) {
        if (action.payload.eventRoll < 0.15) {
           const availEvents = EVENTS.filter((e) => !newState.flags.has(`event_${e.id}`));
           if (availEvents.length > 0) {
               const ev = availEvents[Math.floor(action.payload.eventRoll * 100) % availEvents.length];
               newState.activeEvent = ev.id;
               newState.flags.add(`event_${ev.id}`);
               newState.eventCooldown = 4;
           }
        }
      } else {
        newState.eventCooldown--;
      }
      break;
    case 'START_MILESTONE':
      newState.phase = 'milestone';
      break;
    case 'RESOLVE_MILESTONE':
      Object.entries(action.payload.choice.deltas).forEach(([k, v]) => {
        newState[k as StatKey] += (v as number);
      });
      action.payload.choice.flags?.forEach(f => newState.flags.add(f));
      newState.choiceHistory.push({ year: Math.floor(newState.year), label: action.payload.choice.label, desc: action.payload.choice.outcome });
      newState.latestIntel = `SYSTEM LOG [${Math.floor(newState.year)}]: ${action.payload.choice.outcome}`;
      newState.milestoneIndex++;
      newState.milestoneReady = false;
      newState.phase = 'playing';
      if (newState.milestoneIndex >= MILESTONES.length) {
        newState.phase = 'ending';
      }
      break;
    case 'RESOLVE_EVENT':
      Object.entries(action.payload.choice.deltas).forEach(([k, v]) => {
        newState[k as StatKey] += (v as number);
      });
      newState.latestIntel = `INCIDENT LOG: ${action.payload.choice.outcome}`;
      newState.activeEvent = null;
      break;
    case 'FAST_FORWARD':
      const targetYear = MILESTONES[newState.milestoneIndex]?.year;
      if (targetYear) {
        newState.year = targetYear;
        newState.milestoneReady = true;
        newState.fastForwardCount++;
      }
      break;
    case 'CLAIM_NEW_GAME_PLUS':
      const bonus = action.payload;
      newState = getInitialState();
      newState.savedAchievements = state.savedAchievements;
      newState.achievements = state.achievements;
      newState.newGamePlusBonus = bonus;
      break;
    case 'LOAD_ACHIEVEMENTS':
      newState.savedAchievements = action.payload;
      break;
    case 'SET_PHASE':
      newState.phase = action.payload;
      break;
  }
  return checkGameOverAndAchievements(clampStats(newState));
};

export const GameContext = createContext<{ state: GameState; dispatch: React.Dispatch<GameAction> } | null>(null);

export const useGame = () => {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGame must be used within GameProvider");
  return ctx;
};

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, getInitialState());

  useEffect(() => {
    const saved = localStorage.getItem('probable-fates-achievements');
    if (saved) {
      dispatch({ type: 'LOAD_ACHIEVEMENTS', payload: JSON.parse(saved) });
    }
  }, []);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
};

export const serializeState = (state: GameState): string => {
  return JSON.stringify({ ...state, flags: Array.from(state.flags) });
}

export const deserializeState = (data: string): GameState => {
  const parsed = JSON.parse(data);
  parsed.flags = new Set(parsed.flags || []);
  return parsed;
}
