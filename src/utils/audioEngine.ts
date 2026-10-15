/**
 * Web Audio API procedural game music synthesizer & sound effects engine.
 * No external audio files required - zero broken links, instant playback.
 */

class AudioEngine {
  private ctx: AudioContext | null = null;
  private isPlayingMusic = false;
  private musicVolume = 0.25;
  private sfxVolume = 0.35;
  private isMuted = false;
  private currentTrack: 'arcade' | 'lofi' = 'arcade';
  private timerId: number | null = null;
  private step = 0;

  // Track notes (frequencies in Hz)
  private readonly ARCADE_MELODY = [
    261.63, 329.63, 392.00, 523.25, 392.00, 329.63, 293.66, 349.23,
    440.00, 587.33, 440.00, 349.23, 329.63, 392.00, 493.88, 659.25,
    523.25, 392.00, 329.63, 261.63, 349.23, 440.00, 523.25, 698.46,
    659.25, 523.25, 392.00, 329.63, 293.66, 392.00, 329.63, 261.63
  ];

  private readonly ARCADE_BASS = [
    130.81, 130.81, 130.81, 130.81, 146.83, 146.83, 146.83, 146.83,
    164.81, 164.81, 164.81, 164.81, 130.81, 130.81, 174.61, 174.61,
    130.81, 130.81, 130.81, 130.81, 174.61, 174.61, 174.61, 174.61,
    164.81, 164.81, 164.81, 164.81, 146.83, 146.83, 130.81, 130.81
  ];

  private readonly LOFI_CHORDS = [
    [261.63, 329.63, 392.00, 493.88], // Cmaj7
    [220.00, 261.63, 329.63, 392.00], // Am7
    [174.61, 220.00, 261.63, 329.63], // Fmaj7
    [196.00, 246.94, 293.66, 349.23], // G7
  ];

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public getContextState(): string {
    return this.ctx ? this.ctx.state : 'uninitialized';
  }

  public toggleMusic(): boolean {
    if (this.isPlayingMusic) {
      this.stopMusic();
      return false;
    } else {
      this.startMusic();
      return true;
    }
  }

  public startMusic(track: 'arcade' | 'lofi' = this.currentTrack) {
    this.initContext();
    if (!this.ctx) return;
    this.currentTrack = track;
    this.isPlayingMusic = true;
    this.step = 0;

    if (this.timerId !== null) {
      window.clearInterval(this.timerId);
    }

    const interval = this.currentTrack === 'arcade' ? 140 : 280;
    this.timerId = window.setInterval(() => {
      this.tick();
    }, interval);
  }

  public stopMusic() {
    this.isPlayingMusic = false;
    if (this.timerId !== null) {
      window.clearInterval(this.timerId);
      this.timerId = null;
    }
  }

  public setTrack(track: 'arcade' | 'lofi') {
    this.currentTrack = track;
    if (this.isPlayingMusic) {
      this.stopMusic();
      this.startMusic(track);
    }
  }

  public getCurrentTrack(): 'arcade' | 'lofi' {
    return this.currentTrack;
  }

  public getIsPlaying(): boolean {
    return this.isPlayingMusic;
  }

  public setMusicVolume(val: number) {
    this.musicVolume = Math.max(0, Math.min(1, val));
  }

  public getMusicVolume(): number {
    return this.musicVolume;
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    return this.isMuted;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  private tick() {
    if (!this.ctx || this.isMuted || !this.isPlayingMusic) return;

    const now = this.ctx.currentTime;
    const vol = this.musicVolume * 0.4;

    if (this.currentTrack === 'arcade') {
      // Melody note
      const melodyFreq = this.ARCADE_MELODY[this.step % this.ARCADE_MELODY.length];
      if (melodyFreq) {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(melodyFreq, now);

        gain.gain.setValueAtTime(vol * 0.35, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.13);
      }

      // Bass note every other step
      if (this.step % 2 === 0) {
        const bassFreq = this.ARCADE_BASS[(this.step / 2) % this.ARCADE_BASS.length];
        const bassOsc = this.ctx.createOscillator();
        const bassGain = this.ctx.createGain();
        bassOsc.type = 'triangle';
        bassOsc.frequency.setValueAtTime(bassFreq, now);

        bassGain.gain.setValueAtTime(vol * 0.45, now);
        bassGain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

        bassOsc.connect(bassGain);
        bassGain.connect(this.ctx.destination);
        bassOsc.start(now);
        bassOsc.stop(now + 0.24);
      }

      // Snare / Hat pulse
      if (this.step % 4 === 2) {
        this.playNoisePercussion(now, 0.04, vol * 0.2);
      } else if (this.step % 4 === 0) {
        this.playKickPulse(now, vol * 0.3);
      }

    } else {
      // LOFI Ambient chill chords
      if (this.step % 8 === 0) {
        const chordIndex = Math.floor(this.step / 8) % this.LOFI_CHORDS.length;
        const freqs = this.LOFI_CHORDS[chordIndex];
        freqs.forEach((f) => {
          if (!this.ctx) return;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          const filter = this.ctx.createBiquadFilter();

          osc.type = 'sine';
          osc.frequency.setValueAtTime(f, now);

          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(600, now);

          gain.gain.setValueAtTime(vol * 0.2, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 1.8);

          osc.connect(filter);
          filter.connect(gain);
          gain.connect(this.ctx.destination);

          osc.start(now);
          osc.stop(now + 1.9);
        });
      }

      if (this.step % 4 === 0) {
        this.playKickPulse(now, vol * 0.25);
      } else if (this.step % 4 === 2) {
        this.playNoisePercussion(now, 0.06, vol * 0.15);
      }
    }

    this.step++;
  }

  private playKickPulse(time: number, gainLevel: number) {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.frequency.setValueAtTime(120, time);
    osc.frequency.exponentialRampToValueAtTime(30, time + 0.08);

    gain.gain.setValueAtTime(gainLevel, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.09);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(time);
    osc.stop(time + 0.1);
  }

  private playNoisePercussion(time: number, duration: number, gainLevel: number) {
    if (!this.ctx) return;
    const bufferSize = this.ctx.sampleRate * duration;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(1800, time);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(gainLevel, time);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

    whiteNoise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    whiteNoise.start(time);
  }

  // SOUND EFFECTS
  public playCorrect() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6 arpeggio
    notes.forEach((freq, idx) => {
      if (!this.ctx) return;
      const t = this.ctx.currentTime + idx * 0.06;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, t);

      gain.gain.setValueAtTime(this.sfxVolume * 0.6, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.18);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + 0.2);
    });
  }

  public playIncorrect() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(180, t);
    osc.frequency.linearRampToValueAtTime(110, t + 0.25);

    gain.gain.setValueAtTime(this.sfxVolume * 0.5, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.28);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(t);
    osc.stop(t + 0.3);
  }

  public playStreak() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const notes = [587.33, 739.99, 880.00, 1174.66];
    notes.forEach((freq, idx) => {
      if (!this.ctx) return;
      const t = this.ctx.currentTime + idx * 0.05;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, t);

      gain.gain.setValueAtTime(this.sfxVolume * 0.7, t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.22);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + 0.25);
    });
  }

  public playVictory() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const chords = [
      { notes: [261.63, 329.63, 392.00], delay: 0 },
      { notes: [293.66, 349.23, 440.00], delay: 0.15 },
      { notes: [329.63, 392.00, 493.88], delay: 0.3 },
      { notes: [523.25, 659.25, 783.99, 1046.50], delay: 0.45 }
    ];

    chords.forEach(({ notes, delay }) => {
      if (!this.ctx) return;
      const t = this.ctx.currentTime + delay;
      notes.forEach((freq) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, t);

        gain.gain.setValueAtTime(this.sfxVolume * 0.4, t);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.4);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(t);
        osc.stop(t + 0.45);
      });
    });
  }

  public playClick() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, t);
    osc.frequency.exponentialRampToValueAtTime(400, t + 0.03);

    gain.gain.setValueAtTime(this.sfxVolume * 0.25, t);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.04);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(t);
    osc.stop(t + 0.05);
  }

  // Browser Text to Speech helper
  public speak(text: string, onEnd?: () => void) {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.88; // Slightly gentle pace for A2 adult learners
    utterance.pitch = 1.0;

    if (onEnd) {
      utterance.onend = onEnd;
      utterance.onerror = onEnd;
    }

    window.speechSynthesis.speak(utterance);
  }

  public stopSpeaking() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }
}

export const audioEngine = new AudioEngine();
