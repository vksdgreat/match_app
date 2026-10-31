import type Phaser from 'phaser';

import type { PictureKind } from './pairs';

type CountedPicture = Extract<PictureKind, 'ball' | 'mango' | 'pencil'>;

export function paintCountedItems(
  draw: (picture: CountedPicture, paint: (graphics: Phaser.GameObjects.Graphics) => void) => void,
): void {
  draw('ball', drawBall);
  draw('mango', drawMango);
  draw('pencil', drawPencil);
}

function drawBall(graphics: Phaser.GameObjects.Graphics): void {
  graphics.fillStyle(0xd32f2f, 1);
  graphics.fillCircle(128, 130, 94);
  graphics.fillStyle(0xffca28, 1);
  graphics.fillEllipse(128, 132, 174, 62);
  graphics.fillStyle(0x29b6f6, 1);
  graphics.fillEllipse(128, 132, 54, 180);
  graphics.fillStyle(0xffffff, 0.72);
  graphics.fillEllipse(96, 92, 40, 20);
  graphics.lineStyle(8, 0x5d4037, 1);
  graphics.strokeCircle(128, 130, 94);
}

function drawMango(graphics: Phaser.GameObjects.Graphics): void {
  graphics.fillStyle(0x43a047, 1);
  graphics.fillEllipse(170, 56, 70, 32);
  graphics.fillStyle(0x2e7d32, 1);
  graphics.fillEllipse(164, 52, 34, 12);
  graphics.fillStyle(0x6d4c41, 1);
  graphics.fillRoundedRect(118, 38, 14, 38, 6);
  graphics.fillStyle(0xe65100, 1);
  graphics.fillEllipse(128, 148, 142, 174);
  graphics.fillStyle(0xffa726, 1);
  graphics.fillEllipse(122, 144, 126, 158);
  graphics.fillStyle(0xef5350, 0.82);
  graphics.fillEllipse(158, 118, 48, 82);
  graphics.fillStyle(0xffe0b2, 0.65);
  graphics.fillEllipse(96, 104, 24, 58);
}

function drawPencil(graphics: Phaser.GameObjects.Graphics): void {
  graphics.fillStyle(0xd84315, 1);
  graphics.fillRoundedRect(102, 27, 52, 42, 8);
  graphics.fillStyle(0xffca28, 1);
  graphics.fillRoundedRect(96, 54, 64, 144, 12);
  graphics.fillStyle(0xffe082, 1);
  graphics.fillRoundedRect(108, 61, 16, 126, 6);
  graphics.fillStyle(0xbcaaa4, 1);
  graphics.fillRect(96, 62, 64, 12);
  graphics.fillStyle(0x8d6e63, 1);
  graphics.fillTriangle(96, 190, 160, 190, 128, 238);
  graphics.fillStyle(0x263238, 1);
  graphics.fillTriangle(118, 220, 138, 220, 128, 238);
  graphics.lineStyle(5, 0x8d6e63, 1);
  graphics.strokeRoundedRect(96, 54, 64, 144, 12);
}
