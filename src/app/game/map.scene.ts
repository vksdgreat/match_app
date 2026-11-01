import Phaser from 'phaser';

import type { MatchHooks } from './match.types';
import { PATH_LEVELS } from './pairs';
import { isCleared, isUnlocked, loadProgress, lockedReason, readyLevelNumber, describeProgress } from './progress';

const FONT = '"Avenir Next", "Trebuchet MS", "Segoe UI", sans-serif';
const OPEN_COLORS = [0x42a5f5, 0x7e57c2, 0xec407a, 0xffa726, 0x66bb6a, 0x26c6da, 0x8d6e63, 0x5c6bc0, 0xef5350];

interface TrailSample {
  x: number;
  y: number;
  nx: number;
  ny: number;
}

export class MapScene extends Phaser.Scene {
  private backdrop?: Phaser.GameObjects.Graphics;
  private path?: Phaser.GameObjects.Graphics;
  private nodes: Phaser.GameObjects.Container[] = [];
  private motion = true;

  constructor(private readonly hooks: MatchHooks) {
    super({ key: 'map' });
  }

  create(): void {
    this.motion = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.backdrop = this.add.graphics().setDepth(0);
    this.path = this.add.graphics().setDepth(1);
    this.scale.on('resize', this.redraw);
    this.events.on(Phaser.Scenes.Events.WAKE, this.onWake);
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      this.scale.off('resize', this.redraw);
      this.events.off(Phaser.Scenes.Events.WAKE, this.onWake);
    });
    this.refreshMap();
  }

  refreshMap(): void {
    this.redraw();
    this.hooks.onMap(describeProgress(loadProgress()));
  }

  startLevel(levelNumber: number): void {
    const level = PATH_LEVELS.find((entry) => entry.number === levelNumber);
    const progress = loadProgress();
    if (!level || !isUnlocked(level, progress)) {
      this.hooks.onFeedback({ tone: 'try', text: lockedReason(level) });
      return;
    }

    this.scene.launch('match', { levelNumber });
    if (this.scene.isActive()) {
      this.scene.sleep();
    }
  }

  private readonly onWake = (): void => {
    this.refreshMap();
  };

  private readonly redraw = (): void => {
    const width = this.scale.width;
    const height = this.scale.height;
    if (!this.backdrop || !this.path || width < 160 || height < 160) {
      return;
    }

    this.paintBackdrop(width, height);
    const points = PATH_LEVELS.map((_, index) => this.nodePoint(index, width, height));
    const pathHalf = Math.min(40, Math.max(26, width * 0.07));
    this.paintPath(points, pathHalf);
    this.destroyNodes();
    const progress = loadProgress();
    const ready = readyLevelNumber(progress);
    const nodeSize = Math.max(18, Math.min(30, pathHalf * 0.72));

    PATH_LEVELS.forEach((level, index) => {
      const point = points[index];
      if (!point) {
        return;
      }
      const cleared = isCleared(level.number, progress);
      const current = level.number === ready;
      const locked = !isUnlocked(level, progress);
      const container = this.add.container(point.x, point.y).setDepth(current ? 6 : 4);
      const color = locked ? 0xb7c3cc : current ? 0xffb300 : (OPEN_COLORS[index % OPEN_COLORS.length] ?? 0x42a5f5);
      const radius = nodeSize + (current ? 4 : 0);
      if (current) {
        const glow = this.drawGlow(radius);
        container.add(glow);
        if (this.motion) {
          this.tweens.add({
            targets: glow,
            alpha: 0.4,
            duration: 700,
            yoyo: true,
            repeat: -1,
          });
        }
      }
      container.add(this.drawBadge(radius, color, locked));
      container.add(this.makeNumber(level.number, radius, locked));
      if (locked) {
        container.add(this.drawLock(radius));
      }
      if (cleared) {
        container.add(this.drawStars(radius));
      }
      if (current) {
        const side = point.x >= width / 2 ? 1 : -1;
        container.add(this.makeNowLabel(radius, side));
      }

      const hit = nodeSize + 18;
      container.setInteractive(new Phaser.Geom.Circle(0, 0, hit), Phaser.Geom.Circle.Contains);
      if (container.input) {
        container.input.cursor = locked ? 'default' : 'pointer';
      }
      container.on('pointerdown', () => this.startLevel(level.number));
      this.nodes.push(container);
    });
  };

  private nodePoint(index: number, width: number, height: number): { x: number; y: number } {
    const count = PATH_LEVELS.length;
    const pathHalf = Math.min(40, Math.max(26, width * 0.07));
    const top = pathHalf + 34;
    const bottom = height - (pathHalf + 56);
    const t = count === 1 ? 0.5 : index / (count - 1);
    const y = bottom - t * (bottom - top);
    const amplitude = Math.min(118, width * 0.3);
    const x = width / 2 + Math.sin(t * Math.PI * 2) * amplitude;
    return { x, y };
  }

  private paintBackdrop(width: number, height: number): void {
    const graphics = this.backdrop;
    if (!graphics) {
      return;
    }
    graphics.clear();
    graphics.fillStyle(0x62b347, 1);
    graphics.fillRect(0, 0, width, height);
    graphics.fillStyle(0x4f9a38, 0.45);
    graphics.fillCircle(width * 0.12, height * 0.18, width * 0.22);
    graphics.fillCircle(width * 0.9, height * 0.72, width * 0.2);
    graphics.fillStyle(0x8ed46a, 0.35);
    graphics.fillCircle(width * 0.2, height * 0.78, width * 0.16);
    graphics.fillCircle(width * 0.82, height * 0.16, width * 0.14);
    for (let patch = 0; patch < 16; patch += 1) {
      const x = (((patch * 173 + 40) % 1000) / 1000) * width;
      const y = (((patch * 97 + 25) % 1000) / 1000) * height;
      graphics.fillStyle(patch % 2 === 0 ? 0x7dce5b : 0x4c9636, 0.28);
      graphics.fillCircle(x, y, 16 + (patch % 4) * 10);
    }
  }

  private paintPath(points: { x: number; y: number }[], pathHalf: number): void {
    const graphics = this.path;
    if (!graphics || points.length < 2) {
      return;
    }
    graphics.clear();
    const samples = this.trailSamples(points);
    this.fillRibbon(graphics, samples, pathHalf + 18, 0x3d8c32, 1, 0, 0, 2.6);
    this.fillRibbon(graphics, samples, pathHalf + 9, 0x8ed86a, 1, 0, 0, 1.8);
    this.fillRibbon(graphics, samples, pathHalf + 6, 0x3d6b32, 0.28, 3, 6, 1.5);
    this.fillRibbon(graphics, samples, pathHalf + 3, 0x5c3a1e, 1, 0, 0, 2.4);
    this.fillRibbon(graphics, samples, pathHalf * 0.78, 0x8d5a32, 1, 0, 0, 1.4);
    this.fillRibbon(graphics, samples, pathHalf * 0.34, 0xd7b07a, 1, 0, 0, 0.6);
    this.paintSoil(graphics, samples, pathHalf);
    this.paintGrassEdge(graphics, samples, pathHalf);
    this.paintMeadow(graphics, samples, pathHalf);
  }

  private trailSamples(points: { x: number; y: number }[]): TrailSample[] {
    const steps = 88;
    const raw = Array.from({ length: steps + 1 }, (_, step) => this.pointAlong(points, step / steps));
    return raw.map((point, index) => {
      const previous = raw[Math.max(0, index - 1)] ?? point;
      const next = raw[Math.min(raw.length - 1, index + 1)] ?? point;
      const dx = next.x - previous.x;
      const dy = next.y - previous.y;
      const length = Math.hypot(dx, dy) || 1;
      return { x: point.x, y: point.y, nx: -dy / length, ny: dx / length };
    });
  }

  private fillRibbon(
    graphics: Phaser.GameObjects.Graphics,
    samples: TrailSample[],
    half: number,
    color: number,
    alpha: number,
    offsetX: number,
    offsetY: number,
    jitter: number,
  ): void {
    const first = samples[0];
    const last = samples[samples.length - 1];
    if (!first || !last) {
      return;
    }
    const widthAt = (index: number) => half + Math.sin(index * 0.9) * jitter;
    graphics.fillStyle(color, alpha);
    graphics.beginPath();
    samples.forEach((sample, index) => {
      const span = widthAt(index);
      const x = sample.x + sample.nx * span + offsetX;
      const y = sample.y + sample.ny * span + offsetY;
      if (index === 0) {
        graphics.moveTo(x, y);
      } else {
        graphics.lineTo(x, y);
      }
    });
    for (let index = samples.length - 1; index >= 0; index -= 1) {
      const sample = samples[index];
      if (!sample) {
        continue;
      }
      const span = widthAt(index);
      graphics.lineTo(sample.x - sample.nx * span + offsetX, sample.y - sample.ny * span + offsetY);
    }
    graphics.closePath();
    graphics.fillPath();
    graphics.fillCircle(first.x + offsetX, first.y + offsetY, widthAt(0));
    graphics.fillCircle(last.x + offsetX, last.y + offsetY, widthAt(samples.length - 1));
  }

  private paintSoil(graphics: Phaser.GameObjects.Graphics, samples: TrailSample[], pathHalf: number): void {
    samples.forEach((sample, index) => {
      if (index % 4 !== 0) {
        return;
      }
      const side = index % 8 === 0 ? 1 : -1;
      const speck = index % 8 === 0 ? 0x6d4c41 : 0xbcaaa4;
      graphics.fillStyle(speck, index % 8 === 0 ? 0.55 : 0.7);
      graphics.fillCircle(
        sample.x + sample.nx * side * pathHalf * 0.42,
        sample.y + sample.ny * side * pathHalf * 0.42,
        index % 8 === 0 ? 2.4 : 1.6,
      );
    });
  }

  private paintGrassEdge(graphics: Phaser.GameObjects.Graphics, samples: TrailSample[], pathHalf: number): void {
    samples.forEach((sample, index) => {
      if (index % 2 !== 0) {
        return;
      }
      for (const side of [-1, 1]) {
        const baseX = sample.x + sample.nx * side * (pathHalf + 2);
        const baseY = sample.y + sample.ny * side * (pathHalf + 2);
        const lean = Math.atan2(sample.ny * side - 1.15, sample.nx * side);
        const length = 16 + (index % 5) * 2;
        this.drawBlade(graphics, baseX, baseY, lean - 0.42, length, 0x2e7d32);
        this.drawBlade(graphics, baseX, baseY, lean, length + 7, index % 4 === 0 ? 0x1b5e20 : 0x43a047);
        this.drawBlade(graphics, baseX, baseY, lean + 0.42, length - 2, 0x7cb342);
      }
    });
  }

  private paintMeadow(graphics: Phaser.GameObjects.Graphics, samples: TrailSample[], pathHalf: number): void {
    const width = this.scale.width;
    const height = this.scale.height;
    for (let spot = 0; spot < 18; spot += 1) {
      const x = (((spot * 211 + 60) % 1000) / 1000) * width;
      const y = (((spot * 149 + 30) % 1000) / 1000) * height;
      if (this.nearTrail(samples, x, y, pathHalf + 36)) {
        continue;
      }
      if (spot % 3 === 0) {
        this.drawFlower(graphics, x, y, spot);
      } else {
        this.drawBlade(graphics, x, y, -Math.PI / 2 - 0.4, 12, 0x2e7d32);
        this.drawBlade(graphics, x, y, -Math.PI / 2, 16, 0x43a047);
        this.drawBlade(graphics, x, y, -Math.PI / 2 + 0.4, 11, 0x66bb6a);
      }
    }
  }

  private nearTrail(samples: TrailSample[], x: number, y: number, reach: number): boolean {
    const reachSq = reach * reach;
    return samples.some((sample) => {
      const dx = sample.x - x;
      const dy = sample.y - y;
      return dx * dx + dy * dy < reachSq;
    });
  }

  private drawBlade(
    graphics: Phaser.GameObjects.Graphics,
    x: number,
    y: number,
    angle: number,
    length: number,
    color: number,
  ): void {
    const tipX = x + Math.cos(angle) * length;
    const tipY = y + Math.sin(angle) * length;
    const px = Math.cos(angle + Math.PI / 2) * 3.2;
    const py = Math.sin(angle + Math.PI / 2) * 3.2;
    graphics.fillStyle(color, 1);
    graphics.beginPath();
    graphics.moveTo(x - px, y - py);
    graphics.lineTo(tipX, tipY);
    graphics.lineTo(x + px, y + py);
    graphics.closePath();
    graphics.fillPath();
  }

  private drawFlower(graphics: Phaser.GameObjects.Graphics, x: number, y: number, spot: number): void {
    const petal = spot % 2 === 0 ? 0xfff59d : 0xf48fb1;
    for (let arm = 0; arm < 5; arm += 1) {
      const angle = -Math.PI / 2 + (arm * Math.PI * 2) / 5;
      graphics.fillStyle(petal, 1);
      graphics.fillCircle(x + Math.cos(angle) * 5, y + Math.sin(angle) * 5, 3.2);
    }
    graphics.fillStyle(0xffca28, 1);
    graphics.fillCircle(x, y, 2.6);
  }

  private pointAlong(points: { x: number; y: number }[], t: number): { x: number; y: number } {
    const scaled = t * (points.length - 1);
    const index = Math.min(points.length - 2, Math.floor(scaled));
    const local = scaled - index;
    const from = points[index];
    const to = points[index + 1];
    if (!from || !to) {
      return points[0] ?? { x: 0, y: 0 };
    }
    return { x: from.x + (to.x - from.x) * local, y: from.y + (to.y - from.y) * local };
  }

  private drawBadge(radius: number, color: number, locked: boolean): Phaser.GameObjects.Graphics {
    const graphics = this.add.graphics();
    const rim = shade(color, locked ? 0.72 : 0.62);
    const body = shade(color, locked ? 0.92 : 1);
    const lift = shade(color, locked ? 1.08 : 1.28);
    graphics.fillStyle(0x2e4a22, 0.28);
    graphics.fillEllipse(1, radius * 0.78, radius * 1.85, radius * 0.62);
    graphics.fillStyle(rim, 1);
    graphics.fillCircle(0, 1, radius);
    graphics.fillStyle(body, 1);
    graphics.fillCircle(0, 0, radius * 0.86);
    graphics.fillStyle(lift, locked ? 0.35 : 0.55);
    graphics.fillCircle(-radius * 0.08, -radius * 0.12, radius * 0.62);
    graphics.fillStyle(0xffffff, locked ? 0.38 : 0.78);
    graphics.fillEllipse(-radius * 0.16, -radius * 0.32, radius * 0.72, radius * 0.4);
    graphics.fillStyle(0xffffff, locked ? 0.55 : 0.95);
    graphics.fillCircle(-radius * 0.22, -radius * 0.38, radius * 0.13);
    graphics.fillStyle(0xffffff, locked ? 0.12 : 0.28);
    graphics.fillEllipse(radius * 0.12, radius * 0.36, radius * 0.46, radius * 0.18);
    graphics.lineStyle(2, 0xffffff, locked ? 0.4 : 0.9);
    graphics.strokeCircle(0, 0, radius * 0.9);
    return graphics;
  }

  private drawGlow(radius: number): Phaser.GameObjects.Graphics {
    const graphics = this.add.graphics();
    graphics.fillStyle(0xfff3c4, 0.7);
    graphics.fillCircle(0, 0, radius + 12);
    graphics.lineStyle(3, 0xfff8e1, 0.95);
    graphics.strokeCircle(0, 0, radius + 7);
    graphics.lineStyle(3, 0xef6c00, 0.95);
    graphics.strokeCircle(0, 0, radius + 12);
    return graphics;
  }

  private makeNumber(levelNumber: number, size: number, locked: boolean): Phaser.GameObjects.Text {
    return this.add
      .text(0, locked ? -size * 0.16 : 1, String(levelNumber), {
        fontFamily: FONT,
        fontSize: `${Math.round(size * 0.9)}px`,
        color: locked ? '#455a64' : '#ffffff',
        fontStyle: 'bold',
      })
      .setOrigin(0.5)
      .setShadow(0, 1, locked ? 'transparent' : 'rgba(0,0,0,0.35)', 0);
  }

  private makeNowLabel(size: number, side: number): Phaser.GameObjects.Container {
    const label = this.add.container(side * (size + 34), 0);
    const background = this.add.graphics();
    background.fillStyle(0xffffff, 0.95);
    background.fillRoundedRect(-24, -12, 48, 22, 11);
    background.lineStyle(2, 0xffb74d, 1);
    background.strokeRoundedRect(-24, -12, 48, 22, 11);
    const text = this.add
      .text(0, 0, 'Now', {
        fontFamily: FONT,
        fontSize: '13px',
        color: '#e65100',
        fontStyle: 'bold',
      })
      .setOrigin(0.5);
    label.add([background, text]);
    return label;
  }

  private drawStars(size: number): Phaser.GameObjects.Graphics {
    const graphics = this.add.graphics();
    for (let star = 0; star < 3; star += 1) {
      const x = (star - 1) * 13;
      const y = size + 13;
      this.fillStar(graphics, x, y + 1, 6.5, 3, 0xf9a825);
      this.fillStar(graphics, x, y, 6.5, 3, 0xffe082);
      graphics.fillStyle(0xffffff, 0.9);
      graphics.fillCircle(x - 1, y - 1, 1.3);
    }
    return graphics;
  }

  private drawLock(size: number): Phaser.GameObjects.Graphics {
    const graphics = this.add.graphics();
    const y = size * 0.34;
    graphics.lineStyle(2, 0x455a64, 1);
    graphics.strokeCircle(0, y - 5, 4);
    graphics.fillStyle(0x546e7a, 1);
    graphics.fillRoundedRect(-5, y - 2, 10, 8, 2);
    graphics.fillStyle(0xffffff, 0.45);
    graphics.fillCircle(-1.5, y - 6, 1.2);
    return graphics;
  }

  private fillStar(
    graphics: Phaser.GameObjects.Graphics,
    x: number,
    y: number,
    outer: number,
    inner: number,
    color: number,
  ): void {
    graphics.fillStyle(color, 1);
    graphics.beginPath();
    for (let point = 0; point < 10; point += 1) {
      const radius = point % 2 === 0 ? outer : inner;
      const angle = -Math.PI / 2 + (point * Math.PI) / 5;
      const px = x + Math.cos(angle) * radius;
      const py = y + Math.sin(angle) * radius;
      if (point === 0) {
        graphics.moveTo(px, py);
      } else {
        graphics.lineTo(px, py);
      }
    }
    graphics.closePath();
    graphics.fillPath();
  }

  private destroyNodes(): void {
    for (const node of this.nodes) {
      this.tweens.killTweensOf(node.list);
      node.destroy();
    }
    this.nodes = [];
  }
}

function shade(color: number, factor: number): number {
  const channel = (shift: number) => Math.max(0, Math.min(255, Math.round(((color >> shift) & 255) * factor)));
  return (channel(16) << 16) | (channel(8) << 8) | channel(0);
}
