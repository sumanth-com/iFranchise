/**
 * Premium success tone (Web Audio API). Plays on form success.
 */

let sharedContext = null;

function getAudioContext() {
  if (typeof window === 'undefined') return null;
  const Ctx = window.AudioContext || window.webkitAudioContext;
  if (!Ctx) return null;
  if (!sharedContext) sharedContext = new Ctx();
  return sharedContext;
}

function playTone(ctx, { freq, start, duration, volume = 0.4, type = 'sine', destination }) {
  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, start);
  g.gain.setValueAtTime(0.0001, start);
  g.gain.exponentialRampToValueAtTime(volume, start + 0.025);
  g.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  osc.connect(g);
  g.connect(destination);
  osc.start(start);
  osc.stop(start + duration + 0.05);
}

/**
 * Layered chime + soft sparkle — professional “done” feel.
 */
export function playFormSuccessSound() {
  if (typeof window === 'undefined') return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    if (ctx.state === 'suspended') void ctx.resume();

    const t0 = ctx.currentTime;
    const master = ctx.createGain();
    master.connect(ctx.destination);
    master.gain.setValueAtTime(0.0001, t0);
    master.gain.exponentialRampToValueAtTime(0.16, t0 + 0.04);
    master.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.95);

    playTone(ctx, { freq: 392, start: t0, duration: 0.28, volume: 0.35, destination: master });
    playTone(ctx, { freq: 523.25, start: t0 + 0.06, duration: 0.32, volume: 0.45, destination: master });
    playTone(ctx, { freq: 659.25, start: t0 + 0.12, duration: 0.36, volume: 0.5, destination: master });
    playTone(ctx, { freq: 783.99, start: t0 + 0.18, duration: 0.4, volume: 0.42, destination: master });

    playTone(ctx, {
      freq: 1046.5,
      start: t0 + 0.22,
      duration: 0.22,
      volume: 0.18,
      type: 'triangle',
      destination: master,
    });

    playTone(ctx, {
      freq: 196,
      start: t0,
      duration: 0.15,
      volume: 0.12,
      type: 'sine',
      destination: master,
    });

    const sparkle = ctx.createOscillator();
    const sparkleGain = ctx.createGain();
    sparkle.type = 'sine';
    sparkle.frequency.setValueAtTime(880, t0 + 0.28);
    sparkle.frequency.exponentialRampToValueAtTime(1760, t0 + 0.42);
    sparkleGain.gain.setValueAtTime(0.0001, t0 + 0.28);
    sparkleGain.gain.exponentialRampToValueAtTime(0.08, t0 + 0.3);
    sparkleGain.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.5);
    sparkle.connect(sparkleGain);
    sparkleGain.connect(master);
    sparkle.start(t0 + 0.28);
    sparkle.stop(t0 + 0.55);
  } catch {
    /* silent */
  }
}
