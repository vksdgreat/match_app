export class Chime {
  private context?: AudioContext;

  play(kind: 'ok' | 'no' | 'win'): void {
    const audioWindow = window as Window & { webkitAudioContext?: typeof AudioContext };
    const AudioCtx = window.AudioContext ?? audioWindow.webkitAudioContext;
    if (!AudioCtx) {
      return;
    }

    try {
      this.context ??= new AudioCtx();
      if (this.context.state === 'suspended') {
        void this.context.resume();
      }

      const now = this.context.currentTime;
      const notes = kind === 'ok' ? [523, 659] : kind === 'win' ? [523, 659, 784, 1046] : [196, 165];
      notes.forEach((frequency, index) => {
        this.tone(frequency, now + index * (kind === 'win' ? 0.11 : 0.08), kind === 'no' ? 0.035 : 0.05);
      });
    } catch {
      // Audio is optional; a blocked context should not stop the puzzle.
    }
  }

  close(): void {
    void this.context?.close();
    this.context = undefined;
  }

  private tone(frequency: number, when: number, volume: number): void {
    const context = this.context;
    if (!context) {
      return;
    }

    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(frequency, when);
    gain.gain.setValueAtTime(0.0001, when);
    gain.gain.exponentialRampToValueAtTime(volume, when + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, when + 0.2);
    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start(when);
    oscillator.stop(when + 0.22);
  }
}
