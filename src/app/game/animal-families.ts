import type Phaser from 'phaser';

import type { PictureKind } from './pairs';

type Graphics = Phaser.GameObjects.Graphics;
type FamilyPicture = Extract<PictureKind, 'chick' | 'puppy' | 'cub' | 'calf' | 'foal' | 'chicken' | 'cow' | 'horse'>;
type MammalPicture = Extract<FamilyPicture, 'puppy' | 'cub' | 'calf' | 'foal' | 'cow' | 'horse'>;

const INK = 0x4e342e;
const CREAM = 0xfff8ee;

export function paintAnimalFamilies(draw: (picture: FamilyPicture, paint: (graphics: Graphics) => void) => void): void {
  draw('chick', (graphics) => drawChicken(graphics, true));
  draw('chicken', (graphics) => drawChicken(graphics, false));
  draw('puppy', (graphics) => drawMammal(graphics, 'puppy', true));
  draw('cub', (graphics) => drawMammal(graphics, 'cub', true));
  draw('calf', (graphics) => drawMammal(graphics, 'calf', true));
  draw('foal', (graphics) => drawMammal(graphics, 'foal', true));
  draw('cow', (graphics) => drawMammal(graphics, 'cow', false));
  draw('horse', (graphics) => drawMammal(graphics, 'horse', false));
}

function drawChicken(graphics: Graphics, baby: boolean): void {
  const yellow = baby ? 0xffd54f : 0xf9a825;
  const dark = 0xe9a11b;
  shadow(graphics);
  ellipse(graphics, 128, baby ? 166 : 170, baby ? 116 : 138, baby ? 108 : 112, dark);
  ellipse(graphics, 128, baby ? 160 : 164, baby ? 108 : 130, baby ? 100 : 104, yellow);
  if (!baby) {
    triangle(graphics, 78, 162, 34, 138, 64, 190, 0xd84315);
    triangle(graphics, 178, 162, 222, 138, 192, 190, 0xd84315);
  } else {
    ellipse(graphics, 78, 164, 40, 54, 0xffecb3);
    ellipse(graphics, 178, 164, 40, 54, 0xffecb3);
  }
  circle(graphics, 128, 104, baby ? 51 : 45, dark);
  circle(graphics, 128, 100, baby ? 47 : 41, yellow);
  if (baby) {
    ellipse(graphics, 128, 48, 34, 18, 0xff7043);
  } else {
    for (const [x, y, radius] of [
      [104, 60, 12],
      [128, 48, 15],
      [152, 60, 12],
    ] as const) {
      circle(graphics, x, y, radius, 0xe53935);
    }
    ellipse(graphics, 128, 136, 56, 32, CREAM);
  }
  triangle(graphics, 128, 112, 160, 126, 128, 140, 0xf57c00);
  eyes(graphics, 112, 96, 144, 96, baby ? 7 : 6);
  graphics.lineStyle(baby ? 5 : 7, 0x8d5a32, 1);
  graphics.beginPath();
  graphics.moveTo(112, 210);
  graphics.lineTo(108, 224);
  graphics.moveTo(144, 210);
  graphics.lineTo(148, 224);
  graphics.strokePath();
  triangle(graphics, 108, 220, 94, 226, 112, 226, 0x8d5a32);
  triangle(graphics, 148, 220, 164, 226, 144, 226, 0x8d5a32);
}

function drawMammal(graphics: Graphics, kind: MammalPicture, baby: boolean): void {
  const palette = mammalPalette(kind);
  const bodyY = baby ? 180 : 184;
  const bodyWidth = baby ? 108 : 132;
  const bodyHeight = baby ? 78 : 86;
  const headRadius = baby ? 48 : 42;
  shadow(graphics);
  ellipse(graphics, 128, bodyY, bodyWidth + 8, bodyHeight + 8, palette.dark);
  ellipse(graphics, 128, bodyY - 5, bodyWidth, bodyHeight, palette.body);

  if (kind === 'puppy') {
    ellipse(graphics, 78, 112, 34, 66, palette.dark);
    ellipse(graphics, 178, 112, 34, 66, palette.dark);
    ellipse(graphics, 78, 108, 26, 56, palette.body);
    ellipse(graphics, 178, 108, 26, 56, palette.body);
  } else if (kind === 'cub') {
    circle(graphics, 88, 76, 19, palette.dark);
    circle(graphics, 168, 76, 19, palette.dark);
    circle(graphics, 88, 76, 12, palette.body);
    circle(graphics, 168, 76, 12, palette.body);
    stripe(graphics, 102, 166, 112, 190);
    stripe(graphics, 128, 164, 128, 194);
    stripe(graphics, 154, 166, 144, 190);
  } else if (kind === 'calf' || kind === 'cow') {
    ellipse(graphics, 64, 110, 50, 30, palette.body);
    ellipse(graphics, 192, 110, 50, 30, palette.body);
    triangle(graphics, 98, 80, 90, 54, 116, 74, palette.dark);
    triangle(graphics, 158, 74, 166, 54, 174, 82, palette.dark);
    ellipse(graphics, 64, 110, 20, 12, 0xf8bbd0);
    ellipse(graphics, 192, 110, 20, 12, 0xf8bbd0);
  } else {
    triangle(graphics, 92, 82, 88, 30, 122, 74, palette.dark);
    triangle(graphics, 164, 74, 178, 30, 172, 88, palette.dark);
    ellipse(graphics, 128, 92, 70, 24, palette.dark);
  }

  if (kind === 'cow' || kind === 'calf') {
    circle(graphics, 94, 174, 16, 0x263238);
    circle(graphics, 166, 190, 13, 0x263238);
  }

  circle(graphics, 128, 112, headRadius + 4, palette.dark);
  circle(graphics, 128, 108, headRadius, palette.head);

  if (kind === 'cub') {
    stripe(graphics, 110, 74, 104, 96);
    stripe(graphics, 128, 68, 128, 92);
    stripe(graphics, 146, 74, 152, 96);
  } else if (kind === 'cow' || kind === 'calf') {
    circle(graphics, 100, 100, 11, 0x263238);
    circle(graphics, 154, 122, 9, 0x263238);
    triangle(graphics, 98, 72, 92, 54, 110, 68, 0xfff8e1);
    triangle(graphics, 158, 68, 166, 54, 170, 76, 0xfff8e1);
  } else if (kind === 'horse' || kind === 'foal') {
    ellipse(graphics, 106, 92, 25, 62, palette.dark);
    ellipse(graphics, 132, 86, 23, 58, palette.dark);
    ellipse(graphics, 154, 92, 21, 48, palette.dark);
  }

  if (kind === 'cow' || kind === 'calf' || kind === 'horse' || kind === 'foal') {
    ellipse(graphics, 128, 140, 52, 34, kind === 'cow' || kind === 'calf' ? 0xffcdd2 : CREAM);
    eyes(graphics, 110, 108, 146, 108, 6);
    circle(graphics, 128, 136, 5, INK);
  } else {
    ellipse(graphics, 128, 138, 46, 30, CREAM);
    eyes(graphics, 110, 104, 146, 104, 7);
    circle(graphics, 128, 130, 7, INK);
  }
  cheeks(graphics, 96, 130, 160, 130);

  if (baby) {
    circle(graphics, 128, 218, 9, CREAM);
  }
}

function mammalPalette(kind: MammalPicture): { body: number; dark: number; head: number } {
  switch (kind) {
    case 'puppy':
      return { body: 0xc98b52, dark: 0x88552f, head: 0xd9a36c };
    case 'cub':
      return { body: 0xe98a28, dark: 0x8d4a20, head: 0xf29a35 };
    case 'calf':
    case 'cow':
      return { body: 0xf4f0e5, dark: 0x7f8c8d, head: 0xf7f3e8 };
    case 'foal':
      return { body: 0x9a6038, dark: 0x59351f, head: 0xb77948 };
    case 'horse':
      return { body: 0x86502f, dark: 0x4e342e, head: 0xa2643a };
  }
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

function stripe(graphics: Graphics, x1: number, y1: number, x2: number, y2: number): void {
  graphics.lineStyle(7, 0x4e342e, 1);
  graphics.beginPath();
  graphics.moveTo(x1, y1);
  graphics.lineTo(x2, y2);
  graphics.strokePath();
}
