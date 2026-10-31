import type Phaser from 'phaser';

import { LEVEL_THREE, type PictureKind } from './pairs';

type Graphics = Phaser.GameObjects.Graphics;
type AnimalPicture = Extract<PictureKind, 'dog' | 'tiger' | 'cat' | 'elephant' | 'bunny'>;

const INK = 0x4e342e;
const CREAM = 0xfff8ee;

export function paintAnimals(draw: (picture: AnimalPicture, paint: (graphics: Graphics) => void) => void): void {
  draw('dog', (graphics) => drawDog(graphics, coat('red')));
  draw('tiger', (graphics) => drawTiger(graphics, coat('orange')));
  draw('cat', (graphics) => drawCat(graphics, coat('yellow')));
  draw('elephant', (graphics) => drawElephant(graphics, coat('pink')));
  draw('bunny', (graphics) => drawBunny(graphics, coat('purple')));
}

function coat(id: string): number {
  return LEVEL_THREE.find((pair) => pair.id === id)?.color ?? 0xffffff;
}

function drawDog(graphics: Graphics, color: number): void {
  const dark = shade(color, 0.72);
  shadow(graphics);
  blob(graphics, 198, 168, 16, color, dark);
  ellipse(graphics, 128, 182, 118, 78, dark);
  ellipse(graphics, 128, 176, 110, 70, color);
  ellipse(graphics, 78, 132, 36, 62, dark);
  ellipse(graphics, 178, 132, 36, 62, dark);
  ellipse(graphics, 76, 126, 28, 50, color);
  ellipse(graphics, 180, 126, 28, 50, color);
  circle(graphics, 128, 112, 50, dark);
  circle(graphics, 128, 108, 46, color);
  ellipse(graphics, 128, 136, 48, 34, CREAM);
  circle(graphics, 128, 128, 8, INK);
  ellipse(graphics, 128, 154, 16, 20, 0xf48fb1);
  eyes(graphics, 112, 102, 144, 102, 7);
  cheeks(graphics, 96, 124, 160, 124);
  circle(graphics, 104, 214, 14, CREAM);
  circle(graphics, 152, 214, 14, CREAM);
}

function drawCat(graphics: Graphics, color: number): void {
  const dark = shade(color, 0.72);
  shadow(graphics);
  for (const [x, y, radius] of [
    [64, 196, 14],
    [52, 174, 12],
    [56, 152, 11],
    [74, 136, 10],
  ] as const) {
    circle(graphics, x, y, radius, dark);
    circle(graphics, x - 1, y - 1, radius - 3, color);
  }
  ellipse(graphics, 132, 186, 108, 80, dark);
  ellipse(graphics, 132, 180, 100, 72, color);
  triangle(graphics, 96, 78, 68, 28, 124, 58, dark);
  triangle(graphics, 168, 78, 196, 28, 140, 58, dark);
  triangle(graphics, 98, 74, 78, 40, 118, 62, 0xf8bbd0);
  triangle(graphics, 166, 74, 186, 40, 146, 62, 0xf8bbd0);
  circle(graphics, 132, 116, 50, dark);
  circle(graphics, 132, 112, 46, color);
  eyes(graphics, 116, 108, 148, 108, 7);
  circle(graphics, 132, 126, 5, 0xf48fb1);
  whiskers(graphics, 132, 128);
  cheeks(graphics, 100, 126, 164, 126);
}

function drawTiger(graphics: Graphics, color: number): void {
  const dark = shade(color, 0.62);
  const stripe = shade(color, 0.45);
  shadow(graphics);
  ellipse(graphics, 128, 188, 124, 82, dark);
  ellipse(graphics, 128, 182, 116, 74, color);
  stripeMark(graphics, 96, 176, 112, 198, stripe);
  stripeMark(graphics, 128, 170, 128, 206, stripe);
  stripeMark(graphics, 160, 176, 144, 198, stripe);
  circle(graphics, 86, 78, 18, dark);
  circle(graphics, 170, 78, 18, dark);
  circle(graphics, 86, 76, 14, color);
  circle(graphics, 170, 76, 14, color);
  circle(graphics, 128, 118, 54, dark);
  circle(graphics, 128, 114, 50, color);
  stripeMark(graphics, 112, 78, 104, 96, stripe);
  stripeMark(graphics, 128, 72, 128, 94, stripe);
  stripeMark(graphics, 144, 78, 152, 96, stripe);
  ellipse(graphics, 128, 140, 46, 32, CREAM);
  eyes(graphics, 110, 108, 146, 108, 7);
  circle(graphics, 128, 128, 6, 0xe65100);
  cheeks(graphics, 92, 128, 164, 128);
}

function drawElephant(graphics: Graphics, color: number): void {
  const dark = shade(color, 0.72);
  const ear = shade(color, 1.12);
  shadow(graphics);
  ellipse(graphics, 128, 196, 128, 78, dark);
  ellipse(graphics, 128, 190, 120, 70, color);
  ellipse(graphics, 52, 128, 78, 96, dark);
  ellipse(graphics, 204, 128, 78, 96, dark);
  ellipse(graphics, 54, 124, 64, 82, ear);
  ellipse(graphics, 202, 124, 64, 82, ear);
  circle(graphics, 128, 118, 54, dark);
  circle(graphics, 128, 114, 50, color);
  for (const [x, y, radius] of [
    [128, 162, 16],
    [130, 180, 14],
    [138, 196, 12],
    [152, 204, 11],
  ] as const) {
    circle(graphics, x, y, radius + 2, dark);
    circle(graphics, x, y, radius, color);
  }
  circle(graphics, 108, 118, 8, CREAM);
  circle(graphics, 148, 118, 8, CREAM);
  eyes(graphics, 108, 118, 148, 118, 5);
  cheeks(graphics, 86, 136, 170, 136);
}

function drawBunny(graphics: Graphics, color: number): void {
  const dark = shade(color, 0.72);
  shadow(graphics);
  ellipse(graphics, 104, 62, 32, 86, dark);
  ellipse(graphics, 152, 62, 32, 86, dark);
  ellipse(graphics, 104, 64, 20, 64, 0xf8bbd0);
  ellipse(graphics, 152, 64, 20, 64, 0xf8bbd0);
  ellipse(graphics, 128, 190, 112, 80, dark);
  ellipse(graphics, 128, 184, 104, 72, color);
  circle(graphics, 190, 176, 18, CREAM);
  circle(graphics, 128, 126, 50, dark);
  circle(graphics, 128, 122, 46, color);
  eyes(graphics, 112, 116, 144, 116, 7);
  circle(graphics, 128, 134, 6, 0xf48fb1);
  cheeks(graphics, 96, 136, 160, 136);
  circle(graphics, 108, 214, 13, CREAM);
  circle(graphics, 150, 214, 13, CREAM);
}

function shadow(graphics: Graphics): void {
  graphics.fillStyle(0x33691e, 0.16);
  graphics.fillEllipse(128, 236, 150, 26);
}

function circle(graphics: Graphics, x: number, y: number, radius: number, color: number): void {
  graphics.fillStyle(color, 1);
  graphics.fillCircle(x, y, radius);
}

function ellipse(graphics: Graphics, x: number, y: number, width: number, height: number, color: number): void {
  graphics.fillStyle(color, 1);
  graphics.fillEllipse(x, y, width, height);
}

function blob(graphics: Graphics, x: number, y: number, radius: number, color: number, dark: number): void {
  circle(graphics, x, y + 2, radius + 3, dark);
  circle(graphics, x, y, radius, color);
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

function eyes(graphics: Graphics, x1: number, y1: number, x2: number, y2: number, radius: number): void {
  for (const [x, y] of [
    [x1, y1],
    [x2, y2],
  ] as const) {
    circle(graphics, x, y, radius + 3, 0xffffff);
    circle(graphics, x, y + 1, radius, INK);
    circle(graphics, x - 2, y - 2, radius * 0.35, 0xffffff);
  }
}

function cheeks(graphics: Graphics, x1: number, y1: number, x2: number, y2: number): void {
  graphics.fillStyle(0xff8a80, 0.4);
  graphics.fillCircle(x1, y1, 8);
  graphics.fillCircle(x2, y2, 8);
}

function whiskers(graphics: Graphics, x: number, y: number): void {
  graphics.lineStyle(3, INK, 0.7);
  for (const [fromX, toX, toY] of [
    [x - 8, x - 42, y - 6],
    [x - 8, x - 40, y + 6],
    [x + 8, x + 42, y - 6],
    [x + 8, x + 40, y + 6],
  ] as const) {
    graphics.beginPath();
    graphics.moveTo(fromX, y);
    graphics.lineTo(toX, toY);
    graphics.strokePath();
  }
}

function stripeMark(graphics: Graphics, x1: number, y1: number, x2: number, y2: number, color: number): void {
  graphics.lineStyle(8, color, 1);
  graphics.beginPath();
  graphics.moveTo(x1, y1);
  graphics.lineTo(x2, y2);
  graphics.strokePath();
}

function shade(color: number, factor: number): number {
  const channel = (shift: number) => Math.max(0, Math.min(255, Math.round(((color >> shift) & 255) * factor)));
  return (channel(16) << 16) | (channel(8) << 8) | channel(0);
}
