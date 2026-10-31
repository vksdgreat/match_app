import type { AfterViewInit, ElementRef, OnDestroy } from '@angular/core';
import { Component, ViewChild, signal } from '@angular/core';
import { IonButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular';

import type { FeedbackTone, MapInfo, MatchFeedback, MatchProgress, PlayInfo } from '../game/match.types';
import { describeProgress, loadProgress } from '../game/progress';

interface RunningGame {
  replay: () => void;
  destroy: () => void;
  refresh: () => void;
  startLevel: (levelNumber: number) => void;
  showMap: () => void;
}

const initialProgress = describeProgress(loadProgress());

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar],
})
export class HomePage implements AfterViewInit, OnDestroy {
  @ViewChild('gameHost')
  private gameHost?: ElementRef<HTMLDivElement>;

  readonly screen = signal<'map' | 'play'>('map');
  readonly readyLevel = signal(initialProgress.readyLevel);
  readonly clearedCount = signal(initialProgress.clearedCount);
  readonly builtCount = signal(initialProgress.builtCount);
  readonly levelNumber = signal(initialProgress.readyLevel);
  readonly hint = signal('');
  readonly dotIndexes = signal<number[]>([]);
  readonly statusText = signal('');
  readonly feedback = signal('');
  readonly feedbackTone = signal<FeedbackTone>('neutral');
  readonly matched = signal(0);
  readonly complete = signal(false);
  readonly supported = signal(true);
  readonly booted = signal(false);

  private handle?: RunningGame;
  private resizeObserver?: ResizeObserver;
  private feedbackTimer = 0;
  private alive = true;

  ngAfterViewInit(): void {
    void this.startGame();
  }

  ngOnDestroy(): void {
    this.alive = false;
    window.clearTimeout(this.feedbackTimer);
    this.resizeObserver?.disconnect();
    this.handle?.destroy();
    this.handle = undefined;
  }

  playLevel(): void {
    this.handle?.startLevel(this.readyLevel());
  }

  playAgain(): void {
    this.complete.set(false);
    this.feedback.set('');
    this.handle?.replay();
  }

  backToPath(): void {
    this.complete.set(false);
    this.feedback.set('');
    this.handle?.showMap();
  }

  private async startGame(): Promise<void> {
    const parent = this.gameHost?.nativeElement;
    if (!parent || !this.canDraw()) {
      this.supported.set(false);
      return;
    }

    try {
      const { createMatchGame } = await import('../game/create-match-game');
      if (!this.alive) {
        return;
      }

      const started = createMatchGame(parent, {
        onProgress: (progress) => this.showProgress(progress),
        onFeedback: (feedback) => this.showFeedback(feedback),
        onPlay: (info) => this.showPlay(info),
        onMap: (info) => this.showPath(info),
      });
      this.handle = {
        replay: started.replay,
        destroy: () => started.game.destroy(true),
        refresh: () => started.game.scale.refresh(),
        startLevel: started.startLevel,
        showMap: started.showMap,
      };
      this.booted.set(true);
      this.resizeObserver = new ResizeObserver(() => this.handle?.refresh());
      this.resizeObserver.observe(parent);
      this.handle.refresh();
      requestAnimationFrame(() => this.handle?.refresh());
    } catch {
      this.supported.set(false);
    }
  }

  private canDraw(): boolean {
    const probe = document.createElement('canvas');
    return Boolean(probe.getContext('2d') || probe.getContext('webgl'));
  }

  private showPath(info: MapInfo): void {
    if (!this.alive) {
      return;
    }
    this.screen.set('map');
    this.readyLevel.set(info.readyLevel);
    this.clearedCount.set(info.clearedCount);
    this.builtCount.set(info.builtCount);
    this.complete.set(false);
  }

  private showPlay(info: PlayInfo): void {
    if (!this.alive) {
      return;
    }
    this.screen.set('play');
    this.levelNumber.set(info.number);
    this.hint.set(info.hint);
    this.dotIndexes.set(Array.from({ length: info.total }, (_, index) => index));
    this.matched.set(0);
    this.complete.set(false);
    this.feedback.set('');
    this.statusText.set(`Matched 0 of ${info.total}`);
  }

  private showProgress(progress: MatchProgress): void {
    if (!this.alive) {
      return;
    }
    this.matched.set(progress.matched);
    this.complete.set(progress.complete);
    this.statusText.set(progress.status);
    if (progress.complete) {
      window.clearTimeout(this.feedbackTimer);
      this.feedback.set('');
    }
  }

  private showFeedback(feedback: MatchFeedback): void {
    if (!this.alive) {
      return;
    }
    window.clearTimeout(this.feedbackTimer);
    this.feedback.set(feedback.text);
    this.feedbackTone.set(feedback.tone);
    if (!feedback.text) {
      return;
    }
    this.feedbackTimer = window.setTimeout(
      () => {
        this.feedback.set('');
      },
      feedback.tone === 'neutral' ? 2200 : 1400,
    );
  }
}
