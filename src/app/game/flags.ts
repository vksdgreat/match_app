import type Phaser from 'phaser';

import type { PictureKind } from './pairs';

type Graphics = Phaser.GameObjects.Graphics;
type FlagPicture = Extract<PictureKind, 'flagIndia' | 'flagJapan' | 'flagFrance' | 'flagBrazil' | 'flagCanada'>;

const INK = 0x5d4037;

export function paintFlags(draw: (picture: FlagPicture, paint: (graphics: Graphics) => void) => void): void {
  draw('flagIndia', drawIndia);
  draw('flagJapan', drawJapan);
  draw('flagFrance', drawFrance);
  draw('flagBrazil', drawBrazil);
  draw('flagCanada', drawCanada);
}

function drawIndia(graphics: Graphics): void {
  const band = 148 / 3;
  stripe(graphics, 0xff9933, 0, band);
  stripe(graphics, 0xffffff, band, band);
  stripe(graphics, 0x138808, band * 2, band);
  const cx = 128;
  const cy = 54 + 74;
  graphics.lineStyle(4, 0x000080, 1);
  graphics.strokeCircle(cx, cy, 18);
  for (let spoke = 0; spoke < 8; spoke += 1) {
    const angle = (spoke * Math.PI) / 8;
    graphics.lineBetween(
      cx + Math.cos(angle) * 4,
      cy + Math.sin(angle) * 4,
      cx + Math.cos(angle) * 17,
      cy + Math.sin(angle) * 17,
    );
  }
  graphics.fillStyle(0x000080, 1);
  graphics.fillCircle(cx, cy, 3);
  frame(graphics);
}

function drawJapan(graphics: Graphics): void {
  graphics.fillStyle(0xffffff, 1);
  graphics.fillRect(28, 54, 200, 148);
  graphics.fillStyle(0xd32f2f, 1);
  graphics.fillCircle(128, 128, 36);
  frame(graphics);
}

function drawFrance(graphics: Graphics): void {
  const width = 200 / 3;
  column(graphics, 0x1565c0, 0, width);
  column(graphics, 0xffffff, width, width);
  column(graphics, 0xd32f2f, width * 2, width);
  frame(graphics);
}

function drawBrazil(graphics: Graphics): void {
  graphics.fillStyle(0x2e7d32, 1);
  graphics.fillRect(28, 54, 200, 148);
  graphics.fillStyle(0xfdd835, 1);
  graphics.beginPath();
  graphics.moveTo(128, 72);
  graphics.lineTo(206, 128);
  graphics.lineTo(128, 184);
  graphics.lineTo(50, 128);
  graphics.closePath();
  graphics.fillPath();
  graphics.fillStyle(0x1565c0, 1);
  graphics.fillCircle(128, 128, 28);
  frame(graphics);
}

function drawCanada(graphics: Graphics): void {
  column(graphics, 0xc62828, 0, 56);
  column(graphics, 0xffffff, 56, 88);
  column(graphics, 0xc62828, 144, 56);
  graphics.fillStyle(0xc62828, 1);
  graphics.beginPath();
  graphics.moveTo(128, 78);
  graphics.lineTo(138, 104);
  graphics.lineTo(164, 104);
  graphics.lineTo(142, 120);
  graphics.lineTo(150, 148);
  graphics.lineTo(128, 132);
  graphics.lineTo(106, 148);
  graphics.lineTo(114, 120);
  graphics.lineTo(92, 104);
  graphics.lineTo(118, 104);
  graphics.closePath();
  graphics.fillPath();
  frame(graphics);
}

function stripe(graphics: Graphics, color: number, top: number, height: number): void {
  graphics.fillStyle(color, 1);
  graphics.fillRect(28, 54 + top, 200, height + 0.5);
}

function column(graphics: Graphics, color: number, left: number, width: number): void {
  graphics.fillStyle(color, 1);
  graphics.fillRect(28 + left, 54, width + 0.5, 148);
}

function frame(graphics: Graphics): void {
  graphics.lineStyle(8, INK, 1);
  graphics.strokeRect(28, 54, 200, 148);
}
