import * as Tone from 'tone';

// D minor scale — melancholic and fitting for an AI lab saga
const D_MINOR_NOTES = ['D2', 'F2', 'A2', 'C3', 'D3', 'F3', 'G3', 'A3', 'C4', 'D4', 'F4', 'A4'];
const D_MINOR_PENTA  = ['D3', 'F3', 'G3', 'A3', 'C4', 'D4', 'F4'];
const PAD_CHORDS = [
  ['D3', 'F3', 'A3', 'C4'],   // Dm7
  ['C3', 'E3', 'G3', 'B3'],   // Cmaj7
  ['Bb2', 'D3', 'F3', 'A3'],  // Bbmaj7
  ['A2', 'C3', 'E3', 'G3'],   // Am7
];

let started = false;
let muted = false;
let buildLevel = 0;  // 0–4: how many layers are active

// ── Instruments ────────────────────────────────────────────────
let reverb: Tone.Reverb;
let delay: Tone.FeedbackDelay;
let chorus: Tone.Chorus;
let masterVol: Tone.Volume;

let padSynth: Tone.PolySynth;
let bassSynth: Tone.MonoSynth;
let arpeggioSynth: Tone.MonoSynth;
let leadSynth: Tone.MonoSynth;
let shimmers: Tone.PolySynth;

let padLoop: Tone.Pattern<string[]>;
let bassLoop: Tone.Sequence;
let arpeggioLoop: Tone.Pattern<string>;
let leadLoop: Tone.Pattern<string>;
let shimmerLoop: Tone.Pattern<string[]>;

function buildChain() {
  masterVol = new Tone.Volume(-6).toDestination();

  reverb = new Tone.Reverb({ decay: 8, wet: 0.65, preDelay: 0.08 }).connect(masterVol);
  delay  = new Tone.FeedbackDelay({ delayTime: '8n', feedback: 0.35, wet: 0.25 }).connect(reverb);
  chorus = new Tone.Chorus({ frequency: 0.4, delayTime: 3.5, depth: 0.7, wet: 0.5 }).connect(reverb);

  // ── Pad — warm detuned strings feel ─────────────────────────
  padSynth = new Tone.PolySynth(Tone.Synth, {
    oscillator: { type: 'fatsawtooth', count: 3, spread: 20 },
    envelope: { attack: 3.5, decay: 1, sustain: 0.8, release: 5 },
    volume: -16,
  }).connect(chorus);

  // ── Bass — slow, deep ────────────────────────────────────────
  bassSynth = new Tone.MonoSynth({
    oscillator: { type: 'triangle' },
    envelope: { attack: 0.8, decay: 0.5, sustain: 0.7, release: 3 },
    filterEnvelope: { attack: 0.8, decay: 0.3, sustain: 0.5, release: 2, baseFrequency: 80, octaves: 2 },
    volume: -18,
  }).connect(reverb);

  // ── Arpeggio — plucky, delayed ───────────────────────────────
  arpeggioSynth = new Tone.MonoSynth({
    oscillator: { type: 'sine' },
    envelope: { attack: 0.02, decay: 0.8, sustain: 0.1, release: 1.5 },
    volume: -22,
  }).connect(delay);

  // ── Lead — occasional melody notes ──────────────────────────
  leadSynth = new Tone.MonoSynth({
    oscillator: { type: 'fatsquare', count: 2, spread: 10 } as any,
    envelope: { attack: 0.4, decay: 1.5, sustain: 0.3, release: 3 },
    volume: -26,
  }).connect(delay);

  // ── Shimmer — high glassy overtones ─────────────────────────
  shimmers = new Tone.PolySynth(Tone.Synth, {
    oscillator: { type: 'sine' },
    envelope: { attack: 2, decay: 2, sustain: 0.5, release: 4 },
    volume: -30,
  }).connect(reverb);
}

function buildLoops() {
  let padIndex = 0;

  padLoop = new Tone.Pattern(
    (time, chord) => {
      if (buildLevel < 1) return;
      padSynth.triggerAttackRelease(chord, '2n', time);
    },
    PAD_CHORDS,
    'upDown',
  );
  padLoop.interval = '2m';

  const bassNotes = ['D2', null, null, 'A2', null, null, 'Bb2', null, null, 'C2', null, null];
  bassLoop = new Tone.Sequence(
    (time, note) => {
      if (buildLevel < 2 || !note) return;
      bassSynth.triggerAttackRelease(note, '4n', time);
    },
    bassNotes,
    '8n',
  );

  arpeggioLoop = new Tone.Pattern(
    (time, note) => {
      if (buildLevel < 3) return;
      arpeggioSynth.triggerAttackRelease(note, '16n', time);
    },
    D_MINOR_PENTA,
    'randomWalk',
  );
  arpeggioLoop.interval = '8n';

  const leadNotes = ['D4', null, null, null, 'F4', null, null, null, 'A4', null, null, null, 'G4', null, null, null];
  leadLoop = new Tone.Pattern(
    (time, note) => {
      if (buildLevel < 4 || !note) return;
      leadSynth.triggerAttackRelease(note as string, '4n', time);
    },
    leadNotes as string[],
    'up',
  );
  leadLoop.interval = '4n';

  shimmerLoop = new Tone.Pattern(
    (time, chord) => {
      if (buildLevel < 3) return;
      const shifted = chord.map(n => {
        const oct = parseInt(n.slice(-1));
        return n.slice(0, -1) + (oct + 1);
      });
      shimmers.triggerAttackRelease(shifted, '1m', time);
    },
    PAD_CHORDS,
    'random',
  );
  shimmerLoop.interval = '4m';
}

async function startEngine() {
  if (started) return;
  started = true;

  await Tone.start();
  Tone.getTransport().bpm.value = 72;
  Tone.getTransport().timeSignature = 4;

  buildChain();
  buildLoops();

  padLoop.start(0);
  bassLoop.start(0);
  arpeggioLoop.start(0);
  leadLoop.start(0);
  shimmerLoop.start(0);

  Tone.getTransport().start();
}

// ── Public API ────────────────────────────────────────────────

export async function startMusic() {
  if (muted) return;
  await startEngine();
  if (buildLevel === 0) {
    buildLevel = 1;  // kick off the first layer immediately
  }
}

export function setMusicBuildLevel(level: number) {
  buildLevel = Math.min(4, Math.max(0, level));
}

export function incrementBuild() {
  setMusicBuildLevel(buildLevel + 1);
}

export function isMuted() {
  return muted;
}

export function toggleMute(): boolean {
  muted = !muted;
  if (masterVol) {
    masterVol.mute = muted;
  }
  return muted;
}

export function stopMusic() {
  Tone.getTransport().stop();
  padLoop?.stop();
  bassLoop?.stop();
  arpeggioLoop?.stop();
  leadLoop?.stop();
  shimmerLoop?.stop();
  started = false;
  buildLevel = 0;
}
