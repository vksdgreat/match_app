import type Phaser from 'phaser';

import { LEVEL_SEVEN, type PictureKind } from './pairs';

type JuicePicture = Extract<
  PictureKind,
  'appleJuice' | 'orangeJuice' | 'grapeJuice' | 'strawberryJuice' | 'lemonJuice'
>;
type Graphics = Phaser.GameObjects.Graphics;

export function paintJuices(draw: (picture: JuicePicture, paint: (graphics: Graphics) => void) => void): void {
  for (const pair of LEVEL_SEVEN) {
    const picture = pair.leftPicture;
    if (!picture || !isJuicePicture(picture)) {
      continue;
    }
    draw(picture, (graphics) => drawJuiceGlass(graphics, pair.color));
  }
}

function isJuicePicture(picture: PictureKind): picture is JuicePicture {
  return (
    picture === 'appleJuice' ||
    picture === 'orangeJuice' ||
    picture === 'grapeJuice' ||
    picture === 'strawberryJuice' ||
    picture === 'lemonJuice'
  );
}

function drawJuiceGlass(graphics: Graphics, juiceColor: number): void {
  graphics.fillStyle(0x80deea, 0.28);
  graphics.beginPath();
  graphics.moveTo(70, 62);
  graphics.lineTo(186, 62);
  graphics.lineTo(166, 218);
  graphics.lineTo(90, 218);
  graphics.closePath();
  graphics.fillPath();

  graphics.fillStyle(juiceColor, 1);
  graphics.beginPath();
  graphics.moveTo(80, 112);
  graphics.lineTo(176, 112);
  graphics.lineTo(164, 204);
  graphics.lineTo(92, 204);
  graphics.closePath();
  graphics.fillPath();

  graphics.lineStyle(7, 0xe1f5fe, 0.95);
  graphics.beginPath();
  graphics.moveTo(70, 62);
  graphics.lineTo(186, 62);
  graphics.lineTo(166, 218);
  graphics.lineTo(90, 218);
  graphics.closePath();
  graphics.strokePath();
  graphics.lineStyle(5, 0xffffff, 0.8);
  graphics.beginPath();
  graphics.moveTo(86, 75);
  graphics.lineTo(100, 186);
  graphics.strokePath();

  graphics.lineStyle(11, 0xfafafa, 1);
  graphics.beginPath();
  graphics.moveTo(126, 70);
  graphics.lineTo(146, 26);
  graphics.strokePath();
  graphics.lineStyle(5, juiceColor, 1);
  graphics.beginPath();
  graphics.moveTo(127, 68);
  graphics.lineTo(145, 28);
  graphics.strokePath();

  graphics.fillStyle(0xffffff, 0.25);
  graphics.fillEllipse(128, 112, 94, 12);
}
