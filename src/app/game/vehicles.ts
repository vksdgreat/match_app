import type Phaser from 'phaser';

import { LEVEL_SIX, type PictureKind } from './pairs';

type Graphics = Phaser.GameObjects.Graphics;
type VehiclePicture = Extract<PictureKind, 'bicycle' | 'car' | 'motorbike' | 'plane' | 'bus'>;

const TIRE = 0x37474f;
const METAL = 0xb0bec5;
const GLASS = 0xb3e5fc;

export function paintVehicles(draw: (picture: VehiclePicture, paint: (graphics: Graphics) => void) => void): void {
  for (const pair of LEVEL_SIX) {
    const picture = pair.picture;
    if (!picture || !isVehiclePicture(picture)) {
      continue;
    }
    draw(picture, (graphics) => drawVehicle(graphics, picture, pair.color));
  }
}

function isVehiclePicture(picture: PictureKind): picture is VehiclePicture {
  return (
    picture === 'bicycle' || picture === 'car' || picture === 'motorbike' || picture === 'plane' || picture === 'bus'
  );
}

function drawVehicle(graphics: Graphics, picture: VehiclePicture, color: number): void {
  shadow(graphics);
  if (picture === 'bicycle') {
    drawBicycle(graphics, color);
  } else if (picture === 'car') {
    drawCar(graphics, color);
  } else if (picture === 'motorbike') {
    drawMotorbike(graphics, color);
  } else if (picture === 'plane') {
    drawPlane(graphics, color);
  } else {
    drawBus(graphics, color);
  }
}

function drawBicycle(graphics: Graphics, color: number): void {
  wheel(graphics, 64, 188, 31);
  wheel(graphics, 192, 188, 31);
  line(graphics, 64, 188, 106, 128, color, 12);
  line(graphics, 106, 128, 132, 188, color, 12);
  line(graphics, 132, 188, 64, 188, color, 12);
  line(graphics, 132, 188, 178, 126, color, 12);
  line(graphics, 178, 126, 192, 188, color, 12);
  line(graphics, 106, 128, 178, 126, color, 12);
  line(graphics, 98, 116, 120, 116, METAL, 9);
  line(graphics, 172, 124, 190, 110, METAL, 8);
  line(graphics, 190, 110, 202, 112, METAL, 7);
  line(graphics, 128, 188, 138, 202, TIRE, 6);
  circle(graphics, 136, 204, 7, METAL);
  line(graphics, 64, 188, 64, 157, METAL, 4);
  line(graphics, 192, 188, 192, 157, METAL, 4);
}

function drawCar(graphics: Graphics, color: number): void {
  roundedBox(graphics, 38, 132, 180, 62, color, 18);
  polygon(
    graphics,
    [
      [70, 132],
      [94, 90],
      [164, 90],
      [194, 132],
    ],
    color,
  );
  polygon(
    graphics,
    [
      [102, 99],
      [96, 124],
      [128, 124],
      [128, 99],
    ],
    GLASS,
  );
  polygon(
    graphics,
    [
      [138, 99],
      [138, 124],
      [180, 124],
      [162, 99],
    ],
    GLASS,
  );
  roundedBox(graphics, 46, 148, 18, 12, 0xfff59d, 5);
  roundedBox(graphics, 192, 148, 18, 12, 0xff8a65, 5);
  wheel(graphics, 78, 192, 23);
  wheel(graphics, 178, 192, 23);
  line(graphics, 70, 168, 188, 168, shade(color, 0.72), 5);
}

function drawMotorbike(graphics: Graphics, color: number): void {
  wheel(graphics, 64, 188, 25);
  wheel(graphics, 194, 188, 25);
  line(graphics, 64, 188, 108, 146, METAL, 9);
  line(graphics, 108, 146, 150, 188, color, 13);
  line(graphics, 150, 188, 64, 188, color, 13);
  line(graphics, 150, 188, 176, 142, METAL, 9);
  line(graphics, 176, 142, 194, 188, METAL, 9);
  ellipse(graphics, 129, 157, 56, 38, color);
  roundedBox(graphics, 98, 130, 58, 12, TIRE, 6);
  line(graphics, 174, 143, 184, 116, METAL, 7);
  line(graphics, 184, 116, 204, 116, METAL, 7);
  line(graphics, 106, 145, 94, 116, METAL, 7);
  line(graphics, 94, 116, 82, 116, METAL, 7);
  circle(graphics, 125, 172, 7, 0xffca28);
}

function drawPlane(graphics: Graphics, color: number): void {
  ellipse(graphics, 132, 132, 172, 48, color);
  polygon(
    graphics,
    [
      [112, 132],
      [70, 72],
      [116, 96],
      [144, 132],
    ],
    shade(color, 0.82),
  );
  polygon(
    graphics,
    [
      [132, 134],
      [82, 196],
      [128, 174],
      [157, 134],
    ],
    color,
  );
  polygon(
    graphics,
    [
      [50, 132],
      [30, 104],
      [78, 120],
      [92, 136],
    ],
    shade(color, 0.78),
  );
  polygon(
    graphics,
    [
      [50, 132],
      [30, 158],
      [78, 144],
      [92, 128],
    ],
    color,
  );
  circle(graphics, 200, 132, 24, METAL);
  circle(graphics, 200, 132, 17, 0x78909c);
  for (const x of [112, 140, 168]) {
    circle(graphics, x, 125, 7, GLASS);
  }
}

function drawBus(graphics: Graphics, color: number): void {
  roundedBox(graphics, 42, 72, 174, 128, color, 24);
  roundedBox(graphics, 56, 90, 146, 50, GLASS, 12);
  for (const x of [68, 104, 140, 176]) {
    line(graphics, x, 94, x, 136, shade(color, 0.75), 4);
  }
  roundedBox(graphics, 56, 150, 112, 29, shade(color, 0.82), 8);
  roundedBox(graphics, 176, 150, 25, 30, 0xfff59d, 6);
  wheel(graphics, 82, 200, 21);
  wheel(graphics, 178, 200, 21);
}

function wheel(graphics: Graphics, x: number, y: number, radius: number): void {
  circle(graphics, x, y, radius + 5, TIRE);
  circle(graphics, x, y, radius * 0.58, METAL);
  circle(graphics, x, y, radius * 0.24, 0x546e7a);
}

function shadow(graphics: Graphics): void {
  ellipse(graphics, 128, 224, 172, 22, 0x263238, 0.16);
}

function circle(graphics: Graphics, x: number, y: number, radius: number, color: number): void {
  graphics.fillStyle(color, 1);
  graphics.fillCircle(x, y, radius);
}

function ellipse(
  graphics: Graphics,
  x: number,
  y: number,
  width: number,
  height: number,
  color: number,
  alpha = 1,
): void {
  graphics.fillStyle(color, alpha);
  graphics.fillEllipse(x, y, width, height);
}

function roundedBox(
  graphics: Graphics,
  x: number,
  y: number,
  width: number,
  height: number,
  color: number,
  radius: number,
): void {
  graphics.fillStyle(color, 1);
  graphics.fillRoundedRect(x, y, width, height, radius);
}

function polygon(graphics: Graphics, points: readonly (readonly [number, number])[], color: number): void {
  const first = points[0];
  if (!first) {
    return;
  }
  graphics.fillStyle(color, 1);
  graphics.beginPath();
  graphics.moveTo(first[0], first[1]);
  for (const [x, y] of points.slice(1)) {
    graphics.lineTo(x, y);
  }
  graphics.closePath();
  graphics.fillPath();
}

function line(graphics: Graphics, x1: number, y1: number, x2: number, y2: number, color: number, width: number): void {
  graphics.lineStyle(width, color, 1);
  graphics.beginPath();
  graphics.moveTo(x1, y1);
  graphics.lineTo(x2, y2);
  graphics.strokePath();
}

function shade(color: number, factor: number): number {
  const channel = (shift: number) => Math.round(((color >> shift) & 255) * factor);
  return (channel(16) << 16) | (channel(8) << 8) | channel(0);
}
