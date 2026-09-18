// Web Audio API Sound Engine for Jeshurun's Portfolio Studio
// Polyphonic Synthesizer + Oscilloscope Analyser + UI Micro-sounds

export const NOTE_FREQUENCIES: Record<string, number> = {
  // Octave 3
  "C3": 130.81, "C#3": 138.59, "Db3": 138.59, "D3": 146.83, "D#3": 155.56, "Eb3": 155.56,
  "E3": 164.81, "F3": 174.61, "F#3": 185.00, "Gb3": 185.00, "G3": 196.00, "G#3": 207.65, "Ab3": 207.65,
  "A3": 220.00, "A#3": 233.08, "Bb3": 233.08, "B3": 246.94,
  
  // Octave 4 (Middle C)
  "C4": 261.63, "C#4": 277.18, "Db4": 277.18, "D4": 293.66, "D#4": 311.13, "Eb4": 311.13,
  "E4": 329.63, "F4": 349.23, "F#4": 369.99, "Gb4": 369.99, "G4": 392.00, "G#4": 415.30, "Ab4": 415.30,
  "A4": 440.00, "A#4": 466.16, "Bb4": 466.16, "B4": 493.88,

  // Octave 5
  "C5": 523.25, "C#5": 554.37, "Db5": 554.37, "D5": 587.33, "D#5": 622.25, "Eb5": 622.25,
  "E5": 659.25, "F5": 698.46, "F#5": 739.99, "Gb5": 739.99, "G5": 783.99, "G#5": 830.61, "Ab5": 830.61,
  "A5": 880.00, "A#5": 932.33, "Bb5": 932.33, "B5": 987.77,

  // Octave 6
  "C6": 1046.50
};

class AudioEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private analyser: AnalyserNode | null = null;
  private isMuted: boolean = true; // Muted by default (opt-in audio)
  private activeVoices: Map<string, { osc: OscillatorNode; gain: GainNode }> = new Map();
  private listeners: Set<(muted: boolean) => void> = new Set();

  private init() {
    if (typeof window === "undefined") return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.analyser = this.ctx.createAnalyser();
      this.analyser.fftSize = 256;
      this.analyser.smoothingTimeConstant = 0.8;

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.35, this.ctx.currentTime);

      this.analyser.connect(this.masterGain);
      this.masterGain.connect(this.ctx.destination);
    }

    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }

    return this.ctx;
  }

  public toggleMute(): boolean {
    this.init();
    this.isMuted = !this.isMuted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.35, this.ctx.currentTime);
    }
    this.notifyListeners();
    if (!this.isMuted) {
      this.playChime();
    }
    return this.isMuted;
  }

  public setMute(muted: boolean) {
    this.init();
    this.isMuted = muted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.35, this.ctx.currentTime);
    }
    this.notifyListeners();
  }

  public getMuteState(): boolean {
    return this.isMuted;
  }

  public subscribeMute(callback: (muted: boolean) => void): () => void {
    this.listeners.add(callback);
    callback(this.isMuted);
    return () => this.listeners.delete(callback);
  }

  private notifyListeners() {
    this.listeners.forEach((cb) => cb(this.isMuted));
  }

  public startNote(note: string, type: OscillatorType = "sine") {
    const ctx = this.init();
    if (!ctx || !this.analyser) return;

    const freq = NOTE_FREQUENCIES[note] || 440;

    // Stop existing voice if any
    this.stopNote(note);

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    // Warm sub-harmonic overtone
    gain.gain.setValueAtTime(0.001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.4, ctx.currentTime + 0.04);

    osc.connect(gain);
    gain.connect(this.analyser);
    osc.start();

    this.activeVoices.set(note, { osc, gain });
  }

  public stopNote(note: string) {
    const voice = this.activeVoices.get(note);
    if (!voice || !this.ctx) return;

    const { osc, gain } = voice;
    const now = this.ctx.currentTime;
    
    // Smooth release
    gain.gain.setValueAtTime(gain.gain.value, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.25);
    
    setTimeout(() => {
      try {
        osc.stop();
        osc.disconnect();
      } catch {}
    }, 280);

    this.activeVoices.delete(note);
  }

  public playNote(note: string, duration = 0.5, type: OscillatorType = "sine") {
    this.startNote(note, type);
    setTimeout(() => {
      this.stopNote(note);
    }, duration * 1000);
  }

  public playChord(notes: string[], duration = 0.8) {
    notes.forEach((note, idx) => {
      setTimeout(() => {
        this.playNote(note, duration, "triangle");
      }, idx * 40); // Arpeggiated shimmer
    });
  }

  public playClickSound() {
    const ctx = this.init();
    if (!ctx || !this.analyser || this.isMuted) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const now = ctx.currentTime;

    osc.type = "sine";
    osc.frequency.setValueAtTime(880, now);
    osc.frequency.exponentialRampToValueAtTime(440, now + 0.04);

    gain.gain.setValueAtTime(0.1, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

    osc.connect(gain);
    gain.connect(this.analyser);
    osc.start(now);
    osc.stop(now + 0.045);
  }

  public playChime() {
    const ctx = this.init();
    if (!ctx || !this.analyser) return;

    const notes = ["C4", "G4", "C5"];
    notes.forEach((n, idx) => {
      setTimeout(() => {
        this.playNote(n, 0.4, "sine");
      }, idx * 100);
    });
  }

  public getAnalyserData(dataArray: Uint8Array): void {
    if (this.analyser) {
      this.analyser.getByteFrequencyData(dataArray as any);
    } else {
      dataArray.fill(0);
    }
  }

  public getWaveformData(dataArray: Uint8Array): void {
    if (this.analyser) {
      this.analyser.getByteTimeDomainData(dataArray as any);
    } else {
      dataArray.fill(128);
    }
  }
}

export const audioEngine = new AudioEngine();
