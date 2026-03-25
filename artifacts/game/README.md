# OpenAI Simulator: Probable Fates

> *Build (or break) the future of AI — one click and one irreversible decision at a time.*

A browser-based hybrid **idle-clicker + narrative text-adventure** game where you steer a thinly-veiled AI lab through real history from 2015 to 2026 and beyond. Every choice reshapes your stats, unlocks flags, and nudges you toward one of ten distinct endings.

---

## Gameplay

You manage four core resources by clicking — and watch them tick upward automatically as time passes:

| Resource | What it represents |
|---|---|
| 💰 Funding | Runway. Without it, you're dead. |
| 🖥️ Compute | Raw GPU power. Train bigger, faster. |
| 🧑‍💻 Talent | The team. Stars leave if morale tanks. |
| 🛡️ Safety | Alignment work. Ignore it at your peril. |

Two secondary stats — **Public Hype** and **Model Openness** — drift based on your decisions and random events.

Four hidden pressure gauges accumulate silently in the background: Mission Drift, Board Tension, Microsoft Influence, and Rival Pressure. You can see them, but you can't click them away.

---

## Structure

### Milestones (8 total)
At key years (2015 → 2026), a **narrative transmission** interrupts the idle loop. You're given the real historical context, then forced to choose. There's no neutral option. Each choice reshapes your stats and sets flags that affect later events and your ending.

| Year | Event |
|---|---|
| 2015 | The Founding — nonprofit or not? |
| 2018 | GPT-2 — release or lock it down? |
| 2020 | The Microsoft Deal |
| 2021 | DALL·E, Codex, ChatGPT |
| 2022 | The Governance Crisis |
| 2023 | GPT-4 & the AGI Question |
| 2024 | The OpenAI Civil War |
| 2026 | Endgame — what does the future look like? |

### Random Events (20+)
Between milestones, events fire based on your stats and flags. A Senate subpoena. A key researcher resigns. A rival drops a model. A board member leaks to the press. Each has multiple response options with real consequences.

### Endings (10)
Your final stats and flag history are evaluated at the endgame to land you in one of ten endings, ranging from:
- **AGI Achieved Responsibly** — the dream case
- **The OpenAI Civil War** — board takeover gone sideways
- **The Government Shutdown** — you flew too close to the sun
- **Musk Takeover** — he really did rename it xOpenAI
- **The Safety Utopia** — slow and steady, against all odds
- ...and five more

### Achievements (15)
Unlocked mid-run and at game-over based on specific stat thresholds, flag combinations, and play patterns — including a few that require very deliberate (or very chaotic) decision-making.

### Founder Personas (3)
Choose before you start. Your persona sets starting stat bonuses and shapes which paths are natural vs. painful:

- **🧠 Safety Maximalist** — Safety +15, Hype −5
- **🚀 Hustler CEO** — Funding +15, Hype +10, Safety −10
- **🌐 Open-Source Idealist** — Openness +20, Talent +10, Funding −10

### New Game+
After any ending you can carry a +20 stat bonus into your next run — pick whichever stat you most neglected.

---

## Soundtrack

A fully **generative ambient synthwave** score, synthesized live in your browser (no audio files). Built with Tone.js:

- **Key:** D minor, 72 BPM
- **Layer 1** (from the start) — warm detuned pad chords (Dm7 → Cmaj7 → Bbmaj7 → Am7) through 8-second reverb
- **Layer 2** (milestone 2) — slow sparse bass notes
- **Layer 3** (milestone 4) — pentatonic arpeggio with feedback delay + glassy shimmer overtones
- **Layer 4** (milestone 6) — occasional lead melody floating over everything

The music starts on your first click and builds in complexity as you progress. Use the **🎵 MUSIC** button in-game to mute.

---

## Tech Stack

| Layer | Tools |
|---|---|
| Framework | React 19 + Vite |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 (dark navy + cyan theme) |
| Animation | Framer Motion |
| Charts | Recharts (radar chart on end screen) |
| Music | Tone.js (Web Audio API) |
| State | `useReducer` + React Context |
| Persistence | `localStorage` (save/load anytime) |
| Fonts | JetBrains Mono, VT323 |

Fully client-side. No backend, no auth, no API calls. Works offline after first load.

---

## Running Locally

```bash
# Install dependencies
pnpm install

# Start the dev server
pnpm --filter @workspace/game run dev
```

Then open `http://localhost:5173` (or whatever port Vite assigns).

```bash
# Type-check
pnpm --filter @workspace/game run typecheck

# Production build
pnpm --filter @workspace/game run build
```

---

## Save Format

The game auto-saves to `localStorage` under the key `probable-fates-save`. You can also hit **💾 SAVE** at any time during gameplay. Achievements are stored separately under `probable-fates-achievements`.

---

## License

MIT. All historical events depicted are fictional interpretations for satirical/entertainment purposes. All consequences are very much real (in this timeline).
