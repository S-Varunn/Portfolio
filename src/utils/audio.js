import landingPageAudio from '../assets/landing-page.mp3';
import shipSailingAudio from '../assets/shipsailing-theme.mp3';
import raftelAudio from '../assets/raftel.mp3';

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.currentTrack = 'landing'; // 'landing' | 'sailing' | 'raftel'
    this.landingBgm = null;
    this.sailingBgm = null;
    this.raftelBgm = null;
    this.initializedMusic = false;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  initBackgroundMusic() {
    if (typeof window === 'undefined' || this.initializedMusic) return;

    try {
      this.landingBgm = new Audio(landingPageAudio);
      this.landingBgm.loop = true;
      this.landingBgm.volume = 0.4;
      this.landingBgm.autoplay = true;

      this.sailingBgm = new Audio(shipSailingAudio);
      this.sailingBgm.loop = true;
      this.sailingBgm.volume = 0.4;
      this.sailingBgm.autoplay = true;

      this.raftelBgm = new Audio(raftelAudio);
      this.raftelBgm.volume = 0.5;
      this.raftelBgm.autoplay = true;

      // When raftel.mp3 ends, loop back to 28 seconds
      this.raftelBgm.onended = () => {
        if (!this.isMuted && this.currentTrack === 'raftel') {
          this.raftelBgm.currentTime = 28;
          this.raftelBgm.play().catch(() => {});
        }
      };

      this.initializedMusic = true;
    } catch {
      // Audio initialization fallback
    }
  }

  stopAllBgm() {
    if (this.landingBgm) {
      this.landingBgm.pause();
      this.landingBgm.currentTime = 0;
    }
    if (this.sailingBgm) {
      this.sailingBgm.pause();
      this.sailingBgm.currentTime = 0;
    }
    if (this.raftelBgm) {
      this.raftelBgm.pause();
      this.raftelBgm.currentTime = 28;
    }
  }

  playLandingBgm() {
    this.initBackgroundMusic();
    if (this.currentTrack === 'landing' && this.landingBgm && !this.landingBgm.paused && !this.landingBgm.muted) {
      return;
    }
    this.stopAllBgm();
    this.currentTrack = 'landing';

    if (!this.isMuted && this.landingBgm) {
      this.landingBgm.muted = false;
      const playPromise = this.landingBgm.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // If browser blocked unmuted autoplay, play muted first so playback stream starts, then unmute
          if (this.landingBgm) {
            this.landingBgm.muted = true;
            this.landingBgm.play().then(() => {
              setTimeout(() => {
                if (this.landingBgm) this.landingBgm.muted = false;
              }, 100);
            }).catch(() => {});
          }
        });
      }
    }
  }

  playSailingBgm() {
    this.initBackgroundMusic();
    if (this.currentTrack === 'sailing' && this.sailingBgm && !this.sailingBgm.paused && !this.sailingBgm.muted) {
      return;
    }
    this.stopAllBgm();
    this.currentTrack = 'sailing';

    if (!this.isMuted && this.sailingBgm) {
      this.sailingBgm.muted = false;
      this.sailingBgm.play().catch(() => {});
    }
  }

  playRaftelBgm() {
    this.initBackgroundMusic();
    if (this.currentTrack === 'raftel' && this.raftelBgm && !this.raftelBgm.paused && !this.raftelBgm.muted) {
      return;
    }
    this.stopAllBgm();
    this.currentTrack = 'raftel';

    if (!this.isMuted && this.raftelBgm) {
      this.raftelBgm.muted = false;
      try {
        this.raftelBgm.currentTime = 28;
      } catch {
        // Handle metadata loading delay
      }
      this.raftelBgm.play().catch(() => {});
    }
  }

  handleUserGesture() {
    this.init();
    this.initBackgroundMusic();
    if (!this.isMuted) {
      if (this.landingBgm) this.landingBgm.muted = false;
      if (this.sailingBgm) this.sailingBgm.muted = false;
      if (this.raftelBgm) this.raftelBgm.muted = false;

      if (this.currentTrack === 'landing') {
        if (this.sailingBgm) this.sailingBgm.pause();
        if (this.raftelBgm) this.raftelBgm.pause();
        if (this.landingBgm && (this.landingBgm.paused || this.landingBgm.muted)) {
          this.landingBgm.muted = false;
          this.landingBgm.play().catch(() => {});
        }
      } else if (this.currentTrack === 'sailing') {
        if (this.landingBgm) this.landingBgm.pause();
        if (this.raftelBgm) this.raftelBgm.pause();
        if (this.sailingBgm && (this.sailingBgm.paused || this.sailingBgm.muted)) {
          this.sailingBgm.muted = false;
          this.sailingBgm.play().catch(() => {});
        }
      } else if (this.currentTrack === 'raftel') {
        if (this.landingBgm) this.landingBgm.pause();
        if (this.sailingBgm) this.sailingBgm.pause();
        if (this.raftelBgm && (this.raftelBgm.paused || this.raftelBgm.muted)) {
          this.raftelBgm.muted = false;
          if (this.raftelBgm.currentTime < 28) {
            this.raftelBgm.currentTime = 28;
          }
          this.raftelBgm.play().catch(() => {});
        }
      }
    }
  }

  // Play crisp click sound for Log Pose / Buttons
  playClick() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    } catch {
      // Ignore audio context errors
    }
  }

  // Play Thousand Sunny Ship Bell / Chime on island arrival
  playShipBell() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const frequencies = [523.25, 659.25, 783.99]; // C5, E5, G5 major triad
      frequencies.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.08);

        gain.gain.setValueAtTime(0.2, this.ctx.currentTime + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + idx * 0.08 + 1.2);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(this.ctx.currentTime + idx * 0.08);
        osc.stop(this.ctx.currentTime + idx * 0.08 + 1.2);
      });
    } catch {
      // Ignore audio errors
    }
  }

  // Play Raftel Treasure Fanfare
  playFanfare() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const notes = [440, 554.37, 659.25, 880]; // A4, C#5, E5, A5
      notes.forEach((freq, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + i * 0.12);

        gain.gain.setValueAtTime(0.25, this.ctx.currentTime + i * 0.12);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + i * 0.12 + 0.6);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(this.ctx.currentTime + i * 0.12);
        osc.stop(this.ctx.currentTime + i * 0.12 + 0.6);
      });
    } catch {
      // Ignore audio errors
    }
  }

  // Toggle Mute
  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      if (this.landingBgm) this.landingBgm.pause();
      if (this.sailingBgm) this.sailingBgm.pause();
      if (this.raftelBgm) this.raftelBgm.pause();
    } else {
      if (this.currentTrack === 'landing') {
        this.playLandingBgm();
      } else if (this.currentTrack === 'sailing') {
        this.playSailingBgm();
      } else if (this.currentTrack === 'raftel') {
        if (this.raftelBgm) {
          if (this.raftelBgm.currentTime < 28) {
            this.raftelBgm.currentTime = 28;
          }
          this.raftelBgm.play().catch(() => {});
        }
      }
    }
    return this.isMuted;
  }
}

export const soundEngine = new SoundEngine();
