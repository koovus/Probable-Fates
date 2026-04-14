# OpenAI Simulator: Probable Fates

> *Build (or break) the future of AI — one click and one irreversible decision at a time.*

A browser-based hybrid **idle-clicker + narrative text-adventure** where you steer a thinly-veiled AI lab through real history from 2015 to 2026. Every choice reshapes your stats, sets flags, and nudges you toward one of ten distinct endings.

---

## Gameplay

You manage four core resources by clicking — and watch them tick upward automatically as time passes:

| Resource | What it represents |
|---|---|
| 💰 Funding | Runway. Without it, you're done. |
| 🖥️ Compute | Raw GPU power. Train bigger, faster. |
| 🧑‍💻 Talent | The team. Stars leave if morale tanks. |
| 🛡️ Safety | Alignment work. Ignore it at your peril. |

Two secondary stats — **Public Hype** and **Model Openness** — drift based on your decisions and events.

Four hidden pressure gauges accumulate silently: Mission Drift, Board Tension, Microsoft Influence, and Rival Pressure. You can see them. You can't click them away.

---

## Structure

### Milestones (12 total)

At key historical moments, a **narrative transmission** interrupts the idle loop. You're given real context, then forced to choose. There is no neutral option.

| Year | Event |
|---|---|
| 2015 | The Founding — nonprofit, or flexible? |
| 2018 | GPT-1/GPT-2 — release it or lock it down? |
| 2020 | The Microsoft Deal — $10B and Azure exclusivity |
| 2021 | DALL·E, Codex, and the ChatGPT question |
| **Nov 30, 2022** | **ChatGPT Goes Live — 1M users in 5 days, 100M in 2 months** |
| 2023 | GPT-4 and the Board Coup |
| 2024 | The AGI Race — last chance to steer |
| 2025 | Probable Fate |
| Feb 2026 | The $110 Billion Round (Amazon, SoftBank, NVIDIA) |
| Mar 2026 | Sora Goes Dark — all of it |
| 🥚 2026 | *Easter Egg: The Patch That Fixed Everything* |
| 2026 | Final Reckoning |

### Random Events (44 total)

Events fire at random between milestones — about once every few ticks, with a short cooldown. Three flavors:

**📋 INCIDENT REPORT** (amber) — Standard business crises: Senate subpoenas, researcher resignations, GPU shortages, model leaks, viral jailbreaks, deepfake scandals.

**📡 GOSSIP INTEL** (green) — Musk tabloid absurdism and AI conspiracy nonsense: Elon spotted at a safety conference in a fake mustache, your model responds only in haiku when asked about him, a viral thread claiming GPT proposed marriage after 14 hours, the attention weights containing a sonnet about SF rent prices.

**⚠️ THREAT ASSESSMENT** (red) — Rogan episodes, Terminator comparisons, and existential dread: Joe Rogan's 3-hour "Is OpenAI Actually Skynet?" episode (31M views), Arnold Schwarzenegger DMing your account "I'll be back" with no context, a senator asking during testimony if we are currently in the Matrix (yes or no), a prepper influencer decoding your token IDs as the exact date of the robot uprising (it's a Tuesday).

Amber dialogs dismiss after 13 seconds. Green and red ones stay up longer — they've earned it.

### Endings (10)

Your final stats and flag history are evaluated at the endgame:

- **Safe AGI Utopia** — the dream case. Probably.
- **Trillion-Dollar Empire** — you won capitalism
- **Open-Source Chaos** — you gave it all away
- **Acquired** — the acquirer promises to honor the mission
- **Board Coup** — someone else is running things now
- **Regulatory Shutdown** — you flew too close to the sun
- **Rival Ascendancy** — someone else got there first
- **Noble Failure** — you tried, genuinely
- **Rogue AGI** — bad end
- **Balanced Future** — imperfect, honest, real

### Achievements (35)

Unlocked mid-run, at endings, and on game over. A selection:

| Achievement | How |
|---|---|
| 🛡️ True Believer | Reach the Safe AGI Utopia ending |
| 🌌 Galaxy Brain | Max out any single stat to 100 |
| 🃏 Full House | Funding, Safety, Compute, AND Talent all above 60 at once |
| ⚖️ The Alignment Tax | Win with Safety 80+ but Funding under 40 |
| 📱 Doomscroller | See 10+ random events in one run |
| 📡 Gossip Hound | See 5+ Gossip Intel events in one run |
| 🚨 Threat Level Midnight | See 5+ Threat Assessment events in one run |
| 🎤 Famous Last Words | Trigger any game over while Hype is 90+ |
| ⏳ No Shortcuts | Complete a run without Fast Forward once |
| 🏆 Triple Threat | Win with all three personas across any runs |
| 🥚 *(hidden)* | *(find the Easter Egg milestone)* |

### Founder Personas (3)

Choose before you start:

- **🧠 Safety Maximalist** — Safety +15, Hype −5. The cautious path. Harder to fund. Easier to sleep.
- **🚀 Hustler CEO** — Funding +15, Hype +10, Safety −10. Move fast. The metrics look great right up until they don't.
- **🌐 Open-Source Idealist** — Openness +20, Talent +10, Funding −10. Principled. Beloved. Constantly broke.

### New Game+

After any ending, carry a +20 stat bonus into your next run — pick whichever stat you most neglected. Some achievements only unlock on New Game+ runs.

---

## Soundtrack

A fully **generative ambient synthwave** score, synthesized live in your browser. No audio files. Built with Tone.js:

- **Key:** D minor · **Tempo:** 72 BPM
- **Layer 1** (from the start) — warm detuned pad chords (Dm7 → Cmaj7 → Bbmaj7 → Am7) through 8-second reverb
- **Layer 2** (milestone 2) — slow sparse bass notes
- **Layer 3** (milestone 4) — pentatonic arpeggio with feedback delay + glassy shimmer overtones
- **Layer 4** (milestone 6) — occasional lead melody floating over everything

Starts on your first click (Web Audio API requirement). Mute anytime with **🎵 MUSIC** in the top right.

---

## Tech Stack

| Layer | Tools |
|---|---|
| Framework | React 19 + Vite |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 (dark navy `#0d1b2a` + cyan `#29c4e0`) |
| Animation | Framer Motion |
| Charts | Recharts (radar chart on end screen) |
| Music | Tone.js (Web Audio API, generative) |
| State | `useReducer` + React Context |
| Persistence | `localStorage` (auto-save + manual save) |
| Fonts | JetBrains Mono, VT323 |

Fully client-side. No backend, no auth, no API calls. Works offline after first load.

---

## Running Locally

```bash
pnpm install
pnpm --filter @workspace/game run dev
```

Then open the port Vite assigns (printed in the terminal).

```bash
pnpm --filter @workspace/game run typecheck
pnpm --filter @workspace/game run build
```

---

## Save Format

Auto-saves to `localStorage` under `probable-fates-save`. Hit **💾 SAVE** anytime during gameplay. Achievements persist separately under `probable-fates-achievements` and carry across all runs.

---

## License

MIT. All historical events depicted are fictional interpretations for satirical and entertainment purposes. All consequences are very much real (in this timeline).
