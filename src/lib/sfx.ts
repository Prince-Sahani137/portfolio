"use client";

/**
 * Tiny interface-sound engine.
 *
 * One click sample is played at different rates / filters for every UI sound,
 * while hovering a stack chip plays a note from a pentatonic scale. The whole
 * thing is off the main thread, needs no assets beyond the single wav, and
 * stays silent until the visitor actually interacts with the page.
 */

const CLICK_SOUND = "/sounds/ui/click.wav";
const MASTER_GAIN = 0.3;
const MAX_GAIN = 0.14;
const MUTE_KEY = "sfx-muted";

const NOTES = [
  523.25, 587.33, 659.25, 783.99, 880, 1046.5, 1174.66, 1318.51, 1567.98, 1760,
];

type SoundConfig = {
  rate: number;
  gain: number;
  lowpass?: number;
  spread?: number;
  gap?: number;
};

const SOUNDS = {
  hover: { rate: 1.3, gain: 0.14 },
  expand: { rate: 1.3, gain: 0.09 },
  tick: { rate: 1.05, gain: 0.1, lowpass: 2600, spread: 0.06, gap: 90 },
  whisper: { rate: 1.1, gain: 0.045, lowpass: 2200, spread: 0.06, gap: 90 },
  soft: { rate: 1, gain: 0.12, lowpass: 3200 },
  tap: { rate: 0.94, gain: 0.14, lowpass: 3200 },
  toggle: { rate: 0.85, gain: 0.14 },
  snap: { rate: 1.15, gain: 0.14, lowpass: 3600 },
  open: { rate: 0.75, gain: 0.14, lowpass: 3200 },
  pop: { rate: 1.2, gain: 0.42 },
} satisfies Record<string, SoundConfig>;

export type SoundName = keyof typeof SOUNDS;

export const SFX_NAMES = Object.keys(SOUNDS) as SoundName[];

let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let clickBuffer: AudioBuffer | null = null;
let clickLoading: Promise<void> | null = null;
let mutedState: boolean | null = null;

const lastPlayed = new Map<string, number>();
const listeners = new Set<() => void>();

function readMuted(): boolean {
  if (mutedState === null) {
    try {
      mutedState = window.localStorage.getItem(MUTE_KEY) === "1";
    } catch {
      mutedState = false;
    }
  }
  return mutedState;
}

export function isMuted(): boolean {
  if (typeof window === "undefined") return false;
  return readMuted();
}

export function setMuted(next: boolean) {
  mutedState = next;
  try {
    if (next) window.localStorage.setItem(MUTE_KEY, "1");
    else window.localStorage.removeItem(MUTE_KEY);
  } catch {
    /* storage can be blocked */
  }
  listeners.forEach((listener) => listener());
}

export function subscribeMuted(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function ensure(): AudioContext | null {
  if (typeof window === "undefined") return null;

  if (!ctx) {
    const Ctor =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!Ctor) return null;

    ctx = new Ctor();
    master = ctx.createGain();
    master.gain.value = MASTER_GAIN;
    master.connect(ctx.destination);
  }

  if (ctx.state === "suspended") void ctx.resume();

  if (!clickBuffer && !clickLoading) {
    const audio = ctx;
    clickLoading = fetch(CLICK_SOUND)
      .then((response) => response.arrayBuffer())
      .then((data) => audio.decodeAudioData(data))
      .then((buffer) => {
        clickBuffer = buffer;
      })
      .catch(() => {
        clickLoading = null;
      });
  }

  return ctx;
}

export function unlock() {
  ensure();
}

function throttle(key: string, gap: number): boolean {
  const now = performance.now();
  if (now - (lastPlayed.get(key) ?? -Infinity) < gap) return false;
  lastPlayed.set(key, now);
  return true;
}

function playClick(config: SoundConfig) {
  if (!ctx || !master || !clickBuffer) return;

  const source = ctx.createBufferSource();
  source.buffer = clickBuffer;

  const spread = config.spread ?? 0.03;
  source.playbackRate.value =
    config.rate * (1 - spread + Math.random() * spread * 2);

  const gain = ctx.createGain();
  gain.gain.value = Math.min(config.gain, MAX_GAIN);

  if (config.lowpass) {
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = config.lowpass;
    source.connect(filter).connect(gain).connect(master);
  } else {
    source.connect(gain).connect(master);
  }

  source.start();
}

function playTone(
  frequency: number,
  { gain, decay, glideTo }: { gain: number; decay: number; glideTo?: number },
) {
  if (!ctx || !master) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  osc.type = "sine";
  osc.frequency.setValueAtTime(frequency, now);
  if (glideTo) {
    osc.frequency.exponentialRampToValueAtTime(glideTo, now + 0.5 * decay);
  }

  const envelope = ctx.createGain();
  envelope.gain.setValueAtTime(1e-4, now);
  envelope.gain.exponentialRampToValueAtTime(
    Math.min(gain, 0.89 * MAX_GAIN),
    now + 0.008,
  );
  envelope.gain.exponentialRampToValueAtTime(1e-4, now + decay);

  osc.connect(envelope).connect(master);
  osc.start(now);
  osc.stop(now + decay + 0.02);
}

export function playNote(index: number) {
  if (readMuted()) return;
  if (!ensure()) return;
  if (!throttle("note", 60)) return;

  const note = NOTES[((index % NOTES.length) + NOTES.length) % NOTES.length];
  playTone(note, { gain: 0.1, decay: 0.32 });
}

export function play(name: SoundName) {
  if (readMuted()) return;
  if (!ensure()) return;

  if (name === "pop") {
    if (!throttle("pop", 70)) return;
    playTone(392, { gain: 0.12, decay: 0.2, glideTo: 587.33 });
    return;
  }

  const config = SOUNDS[name] as SoundConfig;
  if (!throttle(name, config.gap ?? 70)) return;

  if (clickBuffer) {
    playClick(config);
    return;
  }

  if (clickLoading) {
    const startedAt = performance.now();
    void clickLoading.then(() => {
      if (performance.now() - startedAt < 250) playClick(config);
    });
  }
}
