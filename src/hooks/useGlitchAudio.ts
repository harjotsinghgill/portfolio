import { useCallback, useEffect, useRef, useState } from "react";

/* ---------------------------------------------------------------------------
   Ambient "glitch" audio engine — a sub-drone + airy pad with sparse,
   randomly scheduled noise/blip grains. Ported from the source design and
   wrapped so React only sees a boolean + toggle.
--------------------------------------------------------------------------- */
class GlitchEngine {
  private ac: AudioContext | null = null;
  private master: GainNode | null = null;
  private drones: OscillatorNode[] = [];
  private noiseBuf: AudioBuffer | null = null;
  private alive = false;
  private glitchTimer = 0;

  start() {
    const AC = window.AudioContext || (window as any).webkitAudioContext;
    if (!AC) return;
    const ac: AudioContext = new AC();
    this.ac = ac;
    if (ac.state === "suspended") ac.resume();

    const master = ac.createGain();
    master.gain.value = 0;
    master.connect(ac.destination);
    master.gain.linearRampToValueAtTime(0.6, ac.currentTime + 1.4);
    this.master = master;

    // Sub-drone with a slow tremolo.
    const drone = ac.createOscillator();
    drone.type = "sine";
    drone.frequency.value = 55;
    const dg = ac.createGain();
    dg.gain.value = 0.05;
    const dl = ac.createOscillator();
    dl.frequency.value = 0.06;
    const dlg = ac.createGain();
    dlg.gain.value = 0.025;
    dl.connect(dlg);
    dlg.connect(dg.gain);
    drone.connect(dg);
    dg.connect(master);
    drone.start();
    dl.start();

    // Airy upper pad, barely there.
    const pad = ac.createOscillator();
    pad.type = "triangle";
    pad.frequency.value = 174.61;
    const pg = ac.createGain();
    pg.gain.value = 0.012;
    pad.connect(pg);
    pg.connect(master);
    pad.start();
    this.drones = [drone, dl, pad];

    // Noise table for glitch grains.
    const nb = ac.createBuffer(1, ac.sampleRate * 0.4, ac.sampleRate);
    const nd = nb.getChannelData(0);
    for (let i = 0; i < nd.length; i++) nd[i] = Math.random() * 2 - 1;
    this.noiseBuf = nb;

    this.alive = true;
    this.scheduleGlitch();
  }

  private scheduleGlitch() {
    if (!this.alive || !this.ac) return;
    const gap = 100 + Math.random() * 640;
    this.glitchTimer = window.setTimeout(() => {
      this.glitch();
      this.scheduleGlitch();
    }, gap);
  }

  private glitch() {
    const ac = this.ac;
    if (!ac || !this.master) return;
    const t = ac.currentTime;
    const out = ac.createGain();
    out.gain.value = 0;
    if (ac.createStereoPanner) {
      const p = ac.createStereoPanner();
      p.pan.value = Math.random() * 2 - 1;
      out.connect(p);
      p.connect(this.master);
    } else {
      out.connect(this.master);
    }

    const dur = 0.014 + Math.random() * 0.06;
    if (Math.random() < 0.45) {
      // Pitched micro-blip.
      const o = ac.createOscillator();
      o.type = Math.random() < 0.5 ? "square" : "sine";
      const scale = [523.25, 587.33, 698.46, 783.99, 1046.5, 1318.5, 1567.98];
      o.frequency.value =
        scale[(Math.random() * scale.length) | 0] * (Math.random() < 0.25 ? 2 : 1);
      o.connect(out);
      o.start(t);
      o.stop(t + dur + 0.02);
    } else {
      // Band-passed noise grain — the glitchy texture.
      const src = ac.createBufferSource();
      src.buffer = this.noiseBuf;
      src.playbackRate.value = 0.4 + Math.random() * 2.2;
      const bp = ac.createBiquadFilter();
      bp.type = "bandpass";
      bp.frequency.value = 700 + Math.random() * 5200;
      bp.Q.value = 7 + Math.random() * 20;
      src.connect(bp);
      bp.connect(out);
      src.start(t);
      src.stop(t + dur);
    }

    const lvl = 0.04 + Math.random() * 0.11;
    out.gain.setValueAtTime(0, t);
    out.gain.linearRampToValueAtTime(lvl, t + 0.004);
    out.gain.exponentialRampToValueAtTime(0.0006, t + dur + 0.03);

    // Occasional quick stutter repeat.
    if (Math.random() < 0.16)
      window.setTimeout(() => {
        if (this.alive) this.glitch();
      }, 38 + Math.random() * 70);
  }

  stop() {
    this.alive = false;
    window.clearTimeout(this.glitchTimer);
    const ac = this.ac;
    try {
      if (this.master && ac)
        this.master.gain.linearRampToValueAtTime(0, ac.currentTime + 0.25);
      if (ac)
        this.drones.forEach((o) => {
          try {
            o.stop(ac.currentTime + 0.3);
          } catch {
            /* already stopped */
          }
        });
    } catch {
      /* context already closed */
    }
    window.setTimeout(() => {
      try {
        ac?.close();
      } catch {
        /* noop */
      }
    }, 450);
    this.ac = null;
    this.drones = [];
    this.master = null;
  }
}

export function useGlitchAudio(enabled: boolean) {
  const [soundOn, setSoundOn] = useState(false);
  const engine = useRef<GlitchEngine | null>(null);

  const toggle = useCallback(() => {
    if (!enabled) return;
    if (soundOn) {
      engine.current?.stop();
      engine.current = null;
      setSoundOn(false);
    } else {
      engine.current = new GlitchEngine();
      engine.current.start();
      setSoundOn(true);
    }
  }, [enabled, soundOn]);

  useEffect(() => () => engine.current?.stop(), []);

  return { soundOn, soundLabel: soundOn ? "ON" : "OFF", toggle };
}
