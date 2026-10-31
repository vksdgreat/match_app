import { ImpactStyle, Haptics } from '@capacitor/haptics';
import Phaser from 'phaser';

import { LABEL_GAP, measureBoard, NUB_OFFSET, type BoardMetrics } from './board-layout';
import { Chime } from './chime';
import { MapScene } from './map.scene';
import type { MatchHooks } from './match.types';
import { PATH_LEVELS, dealPairs, levelByNumber, type LevelDef, type MatchPair, type ShapeKind } from './pairs';
import { createPictureTextures, textureKey } from './pictures';
import { markCleared } from './progress';

const FONT = '"Avenir Next", "Trebuchet MS", "Segoe UI", sans-serif';

interface MatchNode {
  pair: MatchPair;
  side: 'left' | 'right';
  container: Phaser.GameObjects.Container;
  radius: number;
  halfWidth: number;
  matched: boolean;
  misses: number;
}

interface Point {
  x: number;
  y: number;
}

export class MatchScene extends Phaser.Scene {
  private readonly chime = new Chime();
  private readonly links: { pairId: string; color: number }[] = [];
  private leftNodes: MatchNode[] = [];
  private rightNodes: MatchNode[] = [];
  private metrics?: BoardMetrics;
  private backdrop?: Phaser.GameObjects.Graphics;
  private linkGraphics?: Phaser.GameObjects.Graphics;
  private effects?: Phaser.GameObjects.Container;
  private colorsTitle?: Phaser.GameObjects.Text;
  private picturesTitle?: Phaser.GameObjects.Text;
  private selectionRing?: Phaser.GameObjects.Graphics;
  private hoverRing?: Phaser.GameObjects.Graphics;
  private selected?: MatchNode;
  private dragFrom?: MatchNode;
  private dragPoint?: Point;
  private dragging = false;
  private dragOrigin = { x: 0, y: 0 };
  private toldHowToTap = false;
  private motion = true;
  private level: LevelDef = PATH_LEVELS[0];

  constructor(private readonly hooks: MatchHooks) {
    super({ key: 'match', active: false });
  }

  init(data: { levelNumber?: number } = {}): void {
    this.level = levelByNumber(data.levelNumber ?? this.level.number) ?? PATH_LEVELS[0];
  }

  create(): void {
    this.motion = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.backdrop = this.add.graphics().setDepth(0);
    this.linkGraphics = this.add.graphics().setDepth(2);
    this.effects = this.add.container(0, 0).setDepth(8);
    createPictureTextures(this);
    const titleStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      fontFamily: FONT,
      fontSize: '18px',
      color: '#6d4c41',
      fontStyle: 'bold',
    };
    this.colorsTitle = this.add.text(0, 0, this.level.leftHeading, titleStyle).setOrigin(0.5).setDepth(6);
    this.picturesTitle = this.add.text(0, 0, this.level.rightHeading, titleStyle).setOrigin(0.5).setDepth(6);
    this.input.on('pointermove', this.onPointerMove);
    this.input.on('pointerup', this.onPointerUp);
    this.input.on('gameout', this.cancelDrag);
    this.scale.on('resize', this.layout);
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      this.scale.off('resize', this.layout);
      this.input.off('pointermove', this.onPointerMove);
      this.input.off('pointerup', this.onPointerUp);
      this.input.off('gameout', this.cancelDrag);
      this.chime.close();
    });
    this.hooks.onPlay({
      number: this.level.number,
      hint: this.level.hint,
      total: this.level.pairs.length,
    });
    this.replay();
  }

  returnToMap(): void {
    const map = this.scene.get('map');
    this.scene.wake('map');
    if (map instanceof MapScene) {
      map.refreshMap();
    }
    this.scene.stop();
  }

  replay(): void {
    this.tweens.killAll();
    this.effects?.removeAll(true);
    this.clearRings();
    this.selected = undefined;
    this.dragFrom = undefined;
    this.dragPoint = undefined;
    this.dragging = false;
    this.links.length = 0;
    this.destroyNodes();
    this.colorsTitle?.setText(this.level.leftHeading);
    this.picturesTitle?.setText(this.level.rightHeading);
    const deal = dealPairs(this.level.pairs);
    this.leftNodes = deal.left.map((pair) => this.createNode(pair, 'left'));
    this.rightNodes = deal.right.map((pair) => this.createNode(pair, 'right'));
    this.layout();
    this.emitProgress();
    this.hooks.onFeedback({ tone: 'neutral', text: '' });
  }

  private readonly layout = (): void => {
    const width = this.scale.width;
    const height = this.scale.height;
    const metrics = measureBoard(width, height, this.leftNodes.length);
    if (!metrics || !this.backdrop || !this.colorsTitle || !this.picturesTitle) {
      return;
    }

    this.metrics = metrics;
    this.paintBackdrop(width, height);
    this.colorsTitle.setPosition(metrics.leftX, metrics.headerY).setFontSize(metrics.labelSize + 2);
    this.picturesTitle.setPosition(metrics.rightX, metrics.headerY).setFontSize(metrics.labelSize + 2);
    this.clearRings();
    this.leftNodes.forEach((node, index) => {
      const y = metrics.ys[index] ?? metrics.headerY;
      node.container.setPosition(metrics.leftX, y);
      this.paintNode(node, metrics);
    });
    this.rightNodes.forEach((node, index) => {
      const y = metrics.ys[index] ?? metrics.headerY;
      node.container.setPosition(metrics.rightX, y);
      this.paintNode(node, metrics);
    });
    this.refreshSelection();
    this.drawLinks();
  };

  private readonly onPointerMove = (pointer: Phaser.Input.Pointer): void => {
    if (!this.dragFrom || !pointer.isDown) {
      return;
    }

    const distance = Phaser.Math.Distance.Between(this.dragOrigin.x, this.dragOrigin.y, pointer.x, pointer.y);
    if (!this.dragging && distance < 12) {
      return;
    }

    if (!this.dragging) {
      this.dragging = true;
      this.selected = undefined;
      this.refreshSelection();
    }

    this.dragPoint = { x: pointer.worldX, y: pointer.worldY };
    this.hover(this.hitRight(pointer.worldX, pointer.worldY));
    this.drawLinks();
  };

  private readonly onPointerUp = (pointer: Phaser.Input.Pointer): void => {
    const from = this.dragFrom;
    const wasDragging = this.dragging;
    this.dragFrom = undefined;
    this.dragPoint = undefined;
    this.dragging = false;
    this.hover(undefined);

    if (!from) {
      this.drawLinks();
      return;
    }

    if (wasDragging) {
      const target = this.hitRight(pointer.worldX, pointer.worldY);
      if (target) {
        this.tryMatch(from, target);
      }
      this.drawLinks();
      return;
    }

    this.selected = this.selected === from ? undefined : from;
    this.refreshSelection();
    if (this.selected && !this.toldHowToTap) {
      this.toldHowToTap = true;
      this.hooks.onFeedback({ tone: 'neutral', text: this.level.tapHint });
    }
    this.drawLinks();
  };

  private readonly cancelDrag = (): void => {
    if (!this.dragFrom) {
      return;
    }
    this.dragFrom = undefined;
    this.dragPoint = undefined;
    this.dragging = false;
    this.hover(undefined);
    this.drawLinks();
  };

  private createNode(pair: MatchPair, side: 'left' | 'right'): MatchNode {
    const container = this.add.container(0, 0).setDepth(4);
    const node: MatchNode = {
      pair,
      side,
      container,
      radius: 1,
      halfWidth: 1,
      matched: false,
      misses: 0,
    };
    container.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      this.onPointerDown(node, pointer);
    });
    return node;
  }

  private onPointerDown(node: MatchNode, pointer: Phaser.Input.Pointer): void {
    if (node.matched) {
      return;
    }

    if (node.side === 'right') {
      if (this.selected && !this.selected.matched) {
        this.tryMatch(this.selected, node);
      } else if (!this.dragging) {
        this.hooks.onFeedback({ tone: 'try', text: this.level.startHint });
      }
      return;
    }

    this.dragFrom = node;
    this.dragging = false;
    this.dragOrigin = { x: pointer.x, y: pointer.y };
  }

  private tryMatch(left: MatchNode, right: MatchNode): void {
    this.selected = undefined;
    this.clearRings();
    if (left.matched || right.matched) {
      return;
    }

    if (left.pair.id !== right.pair.id) {
      left.misses += 1;
      this.chime.play('no');
      this.showMiss(left, right);
      this.shake(right);
      if (left.misses >= 2) {
        const answer = this.rightNodes.find((node) => node.pair.id === left.pair.id);
        if (answer) {
          this.pulse(answer);
        }
        this.hooks.onFeedback({ tone: 'try', text: this.level.glowHint });
      } else {
        this.hooks.onFeedback({ tone: 'try', text: this.level.missHint });
      }
      return;
    }

    left.matched = true;
    right.matched = true;
    this.links.push({ pairId: left.pair.id, color: left.pair.color });
    if (this.metrics) {
      this.paintNode(left, this.metrics);
      this.paintNode(right, this.metrics);
    }
    this.drawLinks();
    this.pop(left);
    this.pop(right);
    this.sparkle(left, right);
    this.chime.play('ok');
    void buzz(ImpactStyle.Light);

    const complete = this.links.length === this.level.pairs.length;
    if (complete) {
      markCleared(this.level.number);
      this.chime.play('win');
      void buzz(ImpactStyle.Medium);
      this.celebrate();
    }
    this.emitProgress();
    if (!complete) {
      this.hooks.onFeedback({
        tone: 'good',
        text: `${left.pair.leftName ?? left.pair.colorName} matches the ${left.pair.rightName.toLowerCase()}!`,
      });
    }
  }

  private emitProgress(): void {
    const matched = this.links.length;
    const total = this.level.pairs.length;
    const complete = matched === total && total > 0;
    this.hooks.onProgress({
      matched,
      total,
      complete,
      status: complete ? 'Great job! You matched every pair.' : `Matched ${matched} of ${total}`,
    });
  }

  private paintNode(node: MatchNode, metrics: BoardMetrics): void {
    const { container } = node;
    container.removeAll(true);
    if (node.side === 'left' && this.level.leftStyle === 'word') {
      this.paintWord(container, node, metrics);
    } else if (node.side === 'left' && this.level.leftStyle === 'picture') {
      node.radius = metrics.cardSize / 2;
      node.halfWidth = metrics.cardSize / 2 + NUB_OFFSET;
      container.add(this.drawCard(node, metrics));
      container.add(this.makePicture(node, metrics.cardSize, node.pair.leftPicture ?? 'apple'));
      container.add(
        this.makeLabel(node.pair.leftName ?? node.pair.colorName, metrics.cardSize / 2 + LABEL_GAP, metrics.labelSize),
      );
    } else if (node.side === 'left') {
      node.radius = metrics.circleRadius;
      node.halfWidth = metrics.circleRadius + NUB_OFFSET;
      container.add(this.drawCircle(node, metrics));
      container.add(this.makeLabel(node.pair.colorName, metrics.circleRadius + LABEL_GAP, metrics.labelSize));
    } else {
      node.radius = metrics.cardSize / 2;
      node.halfWidth = metrics.cardSize / 2 + NUB_OFFSET;
      container.add(this.drawCard(node, metrics));
      if (this.level.rightStyle === 'shape') {
        container.add(this.drawShape(node, metrics.cardSize));
      } else {
        container.add(this.makePicture(node, metrics.cardSize));
      }
      container.add(this.makeLabel(node.pair.rightName, metrics.cardSize / 2 + LABEL_GAP, metrics.labelSize));
    }

    if (node.matched) {
      container.add(this.drawCheck(node));
      container.disableInteractive();
      return;
    }

    container.setInteractive(
      new Phaser.Geom.Circle(0, 0, Math.max(node.radius, node.halfWidth) + 12),
      Phaser.Geom.Circle.Contains,
    );
    if (container.input) {
      container.input.cursor = 'pointer';
    }
  }

  private paintWord(container: Phaser.GameObjects.Container, node: MatchNode, metrics: BoardMetrics): void {
    const plateWidth = metrics.circleRadius * 2.35;
    const plateHeight = metrics.circleRadius * 1.7;
    node.radius = plateHeight / 2;
    node.halfWidth = plateWidth / 2 + NUB_OFFSET;
    container.add(this.drawWordPlate(node, plateWidth, plateHeight));
    container.add(this.makeColoredWord(node.pair, plateWidth));
  }

  private drawWordPlate(node: MatchNode, width: number, height: number): Phaser.GameObjects.Graphics {
    const graphics = this.add.graphics();
    const left = -width / 2;
    const top = -height / 2;
    const corner = Math.min(16, height * 0.35);
    graphics.fillStyle(0xffffff, 1);
    graphics.fillRoundedRect(left, top, width, height, corner);
    graphics.lineStyle(5, node.pair.color, 1);
    graphics.strokeRoundedRect(left, top, width, height, corner);
    graphics.fillStyle(node.pair.color, 1);
    graphics.fillCircle(width / 2 + NUB_OFFSET, 0, 8);
    graphics.lineStyle(3, 0xffffff, 1);
    graphics.strokeCircle(width / 2 + NUB_OFFSET, 0, 8);
    return graphics;
  }

  private makeColoredWord(pair: MatchPair, plateWidth: number): Phaser.GameObjects.Text {
    const word = pair.colorName.toUpperCase();
    let fontSize = 28;
    const maxWidth = plateWidth - 14;
    while (word.length * fontSize * 0.62 > maxWidth && fontSize > 13) {
      fontSize -= 1;
    }
    return this.add
      .text(0, 0, word, {
        fontFamily: FONT,
        fontSize: `${fontSize}px`,
        color: hexColor(pair.color),
        fontStyle: 'bold',
      })
      .setOrigin(0.5);
  }

  private drawShape(node: MatchNode, cardSize: number): Phaser.GameObjects.Graphics {
    const graphics = this.add.graphics();
    const radius = cardSize * 0.3;
    const color = node.pair.color;
    graphics.fillStyle(color, 1);
    this.traceShape(graphics, node.pair.shape ?? 'circle', radius);
    graphics.fillPath();
    graphics.lineStyle(4, 0x000000, 0.18);
    this.traceShape(graphics, node.pair.shape ?? 'circle', radius);
    graphics.strokePath();
    return graphics;
  }

  private traceShape(graphics: Phaser.GameObjects.Graphics, shape: ShapeKind, radius: number): void {
    if (shape === 'circle') {
      graphics.beginPath();
      graphics.arc(0, -2, radius, 0, Math.PI * 2, false);
      graphics.closePath();
      return;
    }
    if (shape === 'square') {
      graphics.beginPath();
      graphics.moveTo(-radius, -radius - 2);
      graphics.lineTo(radius, -radius - 2);
      graphics.lineTo(radius, radius - 2);
      graphics.lineTo(-radius, radius - 2);
      graphics.closePath();
      return;
    }
    if (shape === 'triangle') {
      graphics.beginPath();
      graphics.moveTo(0, -radius - 6);
      graphics.lineTo(radius + 4, radius);
      graphics.lineTo(-radius - 4, radius);
      graphics.closePath();
      return;
    }
    if (shape === 'diamond') {
      graphics.beginPath();
      graphics.moveTo(0, -radius - 8);
      graphics.lineTo(radius + 2, -2);
      graphics.lineTo(0, radius + 6);
      graphics.lineTo(-radius - 2, -2);
      graphics.closePath();
      return;
    }
    graphics.beginPath();
    for (let point = 0; point < 10; point += 1) {
      const distance = point % 2 === 0 ? radius + 6 : radius * 0.48;
      const angle = -Math.PI / 2 + (point * Math.PI) / 5;
      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance - 2;
      if (point === 0) {
        graphics.moveTo(x, y);
      } else {
        graphics.lineTo(x, y);
      }
    }
    graphics.closePath();
  }

  private drawCircle(node: MatchNode, metrics: BoardMetrics): Phaser.GameObjects.Graphics {
    const radius = metrics.circleRadius;
    const graphics = this.add.graphics();
    graphics.fillStyle(0xffffff, 1);
    graphics.fillCircle(0, 0, radius + 4);
    graphics.fillStyle(node.pair.color, 1);
    graphics.fillCircle(0, 0, radius);
    graphics.fillStyle(0xffffff, 0.38);
    graphics.fillCircle(-radius * 0.32, -radius * 0.34, radius * 0.26);
    graphics.fillStyle(node.pair.color, 1);
    graphics.fillCircle(radius + NUB_OFFSET, 0, 8);
    graphics.lineStyle(3, 0xffffff, 1);
    graphics.strokeCircle(radius + NUB_OFFSET, 0, 8);
    return graphics;
  }

  private drawCard(node: MatchNode, metrics: BoardMetrics): Phaser.GameObjects.Graphics {
    const size = metrics.cardSize;
    const half = size / 2;
    const corner = Math.min(18, size * 0.22);
    const graphics = this.add.graphics();
    graphics.fillStyle(0xeadfd4, 0.55);
    graphics.fillRoundedRect(-half + 3, -half + 5, size, size, corner);
    graphics.fillStyle(0xffffff, 1);
    graphics.fillRoundedRect(-half, -half, size, size, corner);
    graphics.lineStyle(5, node.pair.color, 1);
    graphics.strokeRoundedRect(-half, -half, size, size, corner);
    graphics.fillStyle(node.pair.color, 1);
    graphics.fillCircle(-half - NUB_OFFSET, 0, 8);
    graphics.lineStyle(3, 0xffffff, 1);
    graphics.strokeCircle(-half - NUB_OFFSET, 0, 8);
    return graphics;
  }

  private makePicture(
    node: MatchNode,
    cardSize: number,
    pictureKind: NonNullable<MatchPair['picture']> = node.pair.picture ?? 'apple',
  ): Phaser.GameObjects.Image {
    const image = this.add.image(0, -2, textureKey(pictureKind));
    const pictureSize = cardSize * 0.86;
    image.setDisplaySize(pictureSize, pictureSize);
    return image;
  }

  private makeLabel(text: string, y: number, fontSize: number): Phaser.GameObjects.Text {
    return this.add
      .text(0, y, text, {
        fontFamily: FONT,
        fontSize: `${fontSize}px`,
        color: '#5d4037',
        fontStyle: 'bold',
      })
      .setOrigin(0.5, 0);
  }

  private drawCheck(node: MatchNode): Phaser.GameObjects.Graphics {
    const x = node.halfWidth - 14;
    const y = -node.radius + 6;
    const graphics = this.add.graphics();
    graphics.fillStyle(0x2e7d32, 1);
    graphics.fillCircle(x, y, 11);
    graphics.lineStyle(3, 0xffffff, 1);
    graphics.beginPath();
    graphics.moveTo(x - 6, y);
    graphics.lineTo(x - 2, y + 4);
    graphics.lineTo(x + 6, y - 5);
    graphics.strokePath();
    return graphics;
  }

  private refreshSelection(): void {
    this.selectionRing?.destroy();
    this.selectionRing = undefined;
    const selected = this.selected;
    if (!selected || selected.matched) {
      return;
    }

    const ring = this.add.graphics();
    const ringRadius = Math.max(selected.radius, selected.halfWidth * 0.72);
    ring.lineStyle(4, 0xffffff, 1);
    ring.strokeCircle(0, 0, ringRadius + 3);
    ring.lineStyle(4, 0x5d4037, 1);
    ring.strokeCircle(0, 0, ringRadius + 8);
    selected.container.add(ring);
    this.selectionRing = ring;
  }

  private hover(node: MatchNode | undefined): void {
    if (this.hoverRing?.parentContainer === node?.container) {
      return;
    }
    this.hoverRing?.destroy();
    this.hoverRing = undefined;
    if (!node || node.matched) {
      return;
    }

    const ring = this.add.graphics();
    const half = node.radius;
    const corner = Math.min(18, half * 0.44);
    ring.lineStyle(4, node.pair.color, 1);
    ring.strokeRoundedRect(-half - 3, -half - 3, half * 2 + 6, half * 2 + 6, corner);
    node.container.add(ring);
    this.hoverRing = ring;
  }

  private drawLinks(): void {
    const graphics = this.linkGraphics;
    if (!graphics) {
      return;
    }

    graphics.clear();
    for (const link of this.links) {
      const left = this.leftNodes.find((node) => node.pair.id === link.pairId);
      const right = this.rightNodes.find((node) => node.pair.id === link.pairId);
      if (!left || !right) {
        continue;
      }
      this.strokeLink(graphics, this.anchor(left), this.anchor(right), link.color, 1);
    }

    if (this.dragging && this.dragFrom && this.dragPoint) {
      this.strokeLink(graphics, this.anchor(this.dragFrom), this.dragPoint, this.dragFrom.pair.color, 0.9);
    }
  }

  private strokeLink(
    graphics: Phaser.GameObjects.Graphics,
    from: Point,
    to: Point,
    color: number,
    alpha: number,
  ): void {
    graphics.lineStyle(16, 0xffffff, alpha);
    graphics.beginPath();
    graphics.moveTo(from.x, from.y);
    graphics.lineTo(to.x, to.y);
    graphics.strokePath();
    graphics.lineStyle(8, color, alpha);
    graphics.beginPath();
    graphics.moveTo(from.x, from.y);
    graphics.lineTo(to.x, to.y);
    graphics.strokePath();
    graphics.fillStyle(color, alpha);
    graphics.fillCircle(from.x, from.y, 5);
    graphics.fillCircle(to.x, to.y, 5);
  }

  private anchor(node: MatchNode): Point {
    const direction = node.side === 'left' ? 1 : -1;
    return { x: node.container.x + direction * node.halfWidth, y: node.container.y };
  }

  private hitRight(x: number, y: number): MatchNode | undefined {
    let closest: MatchNode | undefined;
    let closestDistance = Number.POSITIVE_INFINITY;
    for (const node of this.rightNodes) {
      if (node.matched) {
        continue;
      }
      const distance = Phaser.Math.Distance.Between(x, y, node.container.x, node.container.y);
      if (distance <= node.radius + 30 && distance < closestDistance) {
        closest = node;
        closestDistance = distance;
      }
    }
    return closest;
  }

  private showMiss(left: MatchNode, right: MatchNode): void {
    const graphics = this.add.graphics();
    this.effects?.add(graphics);
    this.strokeLink(graphics, this.anchor(left), this.anchor(right), 0xc62828, 0.95);
    this.tweens.add({
      targets: graphics,
      alpha: 0,
      duration: this.motion ? 420 : 1,
      onComplete: () => graphics.destroy(),
    });
  }

  private shake(node: MatchNode): void {
    if (!this.motion) {
      return;
    }
    const baseX = node.container.x;
    this.tweens.add({
      targets: node.container,
      x: baseX + 8,
      duration: 45,
      yoyo: true,
      repeat: 3,
      onComplete: () => node.container.setX(baseX),
    });
  }

  private pop(node: MatchNode): void {
    if (!this.motion) {
      return;
    }
    this.tweens.add({
      targets: node.container,
      scale: 1.08,
      duration: 120,
      yoyo: true,
    });
  }

  private pulse(node: MatchNode): void {
    const glow = this.add.graphics();
    glow.lineStyle(6, node.pair.color, 0.95);
    glow.strokeCircle(0, 0, node.radius + 8);
    node.container.add(glow);
    this.tweens.add({
      targets: glow,
      alpha: 0.25,
      duration: this.motion ? 260 : 1,
      yoyo: true,
      repeat: this.motion ? 2 : 0,
      onComplete: () => glow.destroy(),
    });
  }

  private sparkle(left: MatchNode, right: MatchNode): void {
    const from = this.anchor(left);
    const to = this.anchor(right);
    const midX = (from.x + to.x) / 2;
    const midY = (from.y + to.y) / 2;
    for (let index = 0; index < 8; index += 1) {
      const dot = this.add.circle(midX, midY, 4, left.pair.color, 1);
      this.effects?.add(dot);
      const angle = (Math.PI * 2 * index) / 8;
      this.tweens.add({
        targets: dot,
        x: midX + Math.cos(angle) * 26,
        y: midY + Math.sin(angle) * 26,
        alpha: 0,
        duration: this.motion ? 380 : 1,
        onComplete: () => dot.destroy(),
      });
    }
  }

  private celebrate(): void {
    const width = this.scale.width;
    const height = this.scale.height;
    const colors = this.level.pairs.map((pair) => pair.color);
    for (let index = 0; index < 24; index += 1) {
      const color = colors[index % colors.length] ?? 0xfbc02d;
      const dot = this.add.circle(width / 2, height * 0.4, Phaser.Math.Between(4, 7), color, 1);
      this.effects?.add(dot);
      this.tweens.add({
        targets: dot,
        x: Phaser.Math.Between(16, Math.max(17, width - 16)),
        y: Phaser.Math.Between(16, Math.max(17, height - 16)),
        alpha: 0,
        duration: this.motion ? Phaser.Math.Between(500, 1000) : 1,
        ease: 'Cubic.easeOut',
        onComplete: () => dot.destroy(),
      });
    }
  }

  private paintBackdrop(width: number, height: number): void {
    const graphics = this.backdrop;
    if (!graphics) {
      return;
    }
    graphics.clear();
    if (width < 560) {
      return;
    }
    graphics.fillStyle(0xffe0b2, 0.35);
    graphics.fillCircle(28, 36, 28);
    graphics.fillStyle(0xb3e5fc, 0.28);
    graphics.fillCircle(width - 24, 40, 34);
    graphics.fillStyle(0xf8bbd0, 0.25);
    graphics.fillCircle(width - 30, height - 24, 30);
    graphics.fillStyle(0xc8e6c9, 0.3);
    graphics.fillCircle(26, height - 28, 24);
  }

  private clearRings(): void {
    this.selectionRing?.destroy();
    this.selectionRing = undefined;
    this.hoverRing?.destroy();
    this.hoverRing = undefined;
  }

  private destroyNodes(): void {
    for (const node of [...this.leftNodes, ...this.rightNodes]) {
      node.container.destroy();
    }
    this.leftNodes = [];
    this.rightNodes = [];
  }
}

function hexColor(color: number): string {
  return `#${color.toString(16).padStart(6, '0')}`;
}

async function buzz(style: ImpactStyle): Promise<void> {
  try {
    await Haptics.impact({ style });
  } catch {
    // Browsers and desktops have no haptic hardware.
  }
}
