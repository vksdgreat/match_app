import type Phaser from 'phaser';

import { LEVEL_FOUR, type PictureKind } from './pairs';

type Graphics = Phaser.GameObjects.Graphics;
type BirdPicture = Extract<PictureKind, 'cardinal' | 'bluebird' | 'parrot' | 'duck' | 'finch'>;

interface BirdStyle {
  color: number;
  beak: number;
  wing: number;
  crest: boolean;
  longTail: boolean;
}

const INK = 0x4e342e;
const CREAM = 0xfff8ee;

const STYLES: Record<BirdPicture, BirdStyle> = {
  cardinal: { color: birdColor('red'), beak: 0xffa000, wing: 0xc62828, crest: true, longTail: false },
  bluebird: { color: birdColor('blue'), beak: 0xffa000, wing: 0x1565c0, crest: false, longTail: false },
  parrot: { color: birdColor('green'), beak: 0xff8f00, wing: 0x2e7d32, crest: true, longTail: true },
  duck: { color: birdColor('yellow'), beak: 0xf57c00, wing: 0xffa000, crest: false, longTail: false },
  finch: { color: birdColor('purple'), beak: 0xffb300, wing: 0x6a1b9a, crest: false, longTail: true },
};

export function paintBirds(draw: (picture: BirdPicture, paint: (graphics: Graphics) => void) => void): void {
  for (const [picture, style] of Object.entries(STYLES) as [BirdPicture, BirdStyle][]) {
    draw(picture, (graphics) => drawBird(graphics, style));
  }
}

function birdColor(id: string): number {
  return LEVEL_FOUR.find((pair) => pair.id === id)?.color ?? 0xffffff;
}

function drawBird(graphics: Graphics, style: BirdStyle): void {
  const dark = shade(style.color, 0.72);
  graphics.fillStyle(0x33691e, 0.16);
  graphics.fillEllipse(128, 226, 146, 22);

  if (style.longTail) {
    triangle(graphics, 72, 150, 22, 126, 54, 178, dark);
    triangle(graphics, 78, 156, 34, 184, 60, 190, style.color);
  } else {
    triangle(graphics, 78, 142, 38, 118, 52, 168, dark);
    triangle(graphics, 75, 144, 48, 130, 58, 160, style.color);
  }

  ellipse(graphics, 126, 158, 132, 92, dark);
  ellipse(graphics, 124, 152, 124, 84, style.color);
  ellipse(graphics, 112, 166, 72, 50, style.wing);
  ellipse(graphics, 114, 160, 62, 40, style.color);
  ellipse(graphics, 148, 174, 54, 40, CREAM);

  if (style.crest) {
    triangle(graphics, 144, 64, 158, 20, 170, 72, style.color);
    triangle(graphics, 150, 68, 174, 34, 174, 78, dark);
  }

  circle(graphics, 158, 94, 40, dark);
  circle(graphics, 156, 90, 36, style.color);
  if (style.crest) {
    circle(graphics, 138, 64, 13, style.color);
    circle(graphics, 150, 54, 11, style.color);
    circle(graphics, 160, 52, 9, style.color);
  }

  triangle(graphics, 186, 88, 232, 100, 186, 112, style.beak);
  triangle(graphics, 188, 100, 226, 102, 190, 108, shade(style.beak, 0.78));
  circle(graphics, 169, 84, 11, 0xffffff);
  circle(graphics, 172, 85, 6, INK);
  circle(graphics, 170, 82, 2, 0xffffff);
  ellipse(graphics, 146, 124, 48, 22, CREAM);

  graphics.lineStyle(7, 0x8d5a32, 1);
  graphics.beginPath();
  graphics.moveTo(112, 194);
  graphics.lineTo(108, 214);
  graphics.moveTo(148, 194);
  graphics.lineTo(152, 214);
  graphics.strokePath();
  graphics.lineStyle(5, 0x8d5a32, 1);
  graphics.beginPath();
  graphics.moveTo(108, 214);
  graphics.lineTo(98, 218);
  graphics.moveTo(108, 214);
  graphics.lineTo(116, 218);
  graphics.moveTo(152, 214);
  graphics.lineTo(142, 218);
  graphics.moveTo(152, 214);
  graphics.lineTo(160, 218);
  graphics.strokePath();
}

function circle(graphics: Graphics, x: number, y: number, radius: number, color: number): void {
  graphics.fillStyle(color, 1);
  graphics.fillCircle(x, y, radius);
}

function ellipse(graphics: Graphics, x: number, y: number, width: number, height: number, color: number): void {
  graphics.fillStyle(color, 1);
  graphics.fillEllipse(x, y, width, height);
}

function triangle(
  graphics: Graphics,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  x3: number,
  y3: number,
  color: number,
): void {
  graphics.fillStyle(color, 1);
  graphics.beginPath();
  graphics.moveTo(x1, y1);
  graphics.lineTo(x2, y2);
  graphics.lineTo(x3, y3);
  graphics.closePath();
  graphics.fillPath();
}

function shade(color: number, factor: number): number {
  const channel = (shift: number) => Math.max(0, Math.min(255, Math.round(((color >> shift) & 255) * factor)));
  return (channel(16) << 16) | (channel(8) << 8) | channel(0);
}
