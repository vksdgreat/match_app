import type Phaser from 'phaser';

import { paintAnimalFamilies } from './animal-families';
import { paintAnimals } from './animals';
import { paintBirds } from './birds';
import { LEVEL_ONE, type PictureKind } from './pairs';

const SIZE = 256;

const INK = 0x5d4037;
const LEAF = 0x43a047;
const LEAF_DARK = 0x2e7d32;
const STEM = 0x6d4c41;

export function createPictureTextures(scene: Phaser.Scene): void {
  if (!scene.textures.exists(textureKey('apple'))) {
    drawTexture(scene, 'apple', drawApple);
    drawTexture(scene, 'orange', drawOrange);
    drawTexture(scene, 'sunflower', drawSunflower);
    drawTexture(scene, 'flower', drawFlower);
    drawTexture(scene, 'grapes', drawGrapes);
  }

  if (!scene.textures.exists(textureKey('dog'))) {
    paintAnimals((picture, paint) => drawTexture(scene, picture, paint));
  }

  if (!scene.textures.exists(textureKey('cardinal'))) {
    paintBirds((picture, paint) => drawTexture(scene, picture, paint));
  }

  if (!scene.textures.exists(textureKey('chick'))) {
    paintAnimalFamilies((picture, paint) => drawTexture(scene, picture, paint));
  }
}

export function textureKey(picture: PictureKind): string {
  return `pic-${picture}`;
}

function pairColor(id: string): number {
  return LEVEL_ONE.find((pair) => pair.id === id)?.color ?? 0xffffff;
}

function drawTexture(
  scene: Phaser.Scene,
  picture: PictureKind,
  draw: (graphics: Phaser.GameObjects.Graphics) => void,
): void {
  const graphics = scene.make.graphics({ x: 0, y: 0 }, false);
  draw(graphics);
  graphics.generateTexture(textureKey(picture), SIZE, SIZE);
  graphics.destroy();
}

function face(graphics: Phaser.GameObjects.Graphics, x: number, y: number, scale: number, eye = INK): void {
  graphics.fillStyle(eye, 1);
  graphics.fillCircle(x - 16 * scale, y - 2 * scale, 6.5 * scale);
  graphics.fillCircle(x + 16 * scale, y - 2 * scale, 6.5 * scale);
  if (eye !== INK) {
    graphics.fillStyle(INK, 1);
    graphics.fillCircle(x - 16 * scale, y - 2 * scale, 3 * scale);
    graphics.fillCircle(x + 16 * scale, y - 2 * scale, 3 * scale);
  }
  graphics.fillStyle(0xffffff, 0.9);
  graphics.fillCircle(x - 18 * scale, y - 5 * scale, 2.1 * scale);
  graphics.fillCircle(x + 14 * scale, y - 5 * scale, 2.1 * scale);
  graphics.lineStyle(Math.max(3, 5 * scale), INK, 1);
  graphics.beginPath();
  graphics.arc(x, y + 10 * scale, 14 * scale, Math.PI * 0.15, Math.PI * 0.85, false);
  graphics.strokePath();
}

function drawApple(graphics: Phaser.GameObjects.Graphics): void {
  graphics.fillStyle(STEM, 1);
  graphics.fillRoundedRect(120, 28, 16, 48, 6);
  graphics.fillStyle(LEAF, 1);
  graphics.fillEllipse(168, 58, 58, 28);
  graphics.fillStyle(LEAF_DARK, 1);
  graphics.fillEllipse(162, 52, 24, 12);
  graphics.fillStyle(0xb71c1c, 1);
  graphics.fillCircle(128, 150, 86);
  graphics.fillStyle(pairColor('red'), 1);
  graphics.fillCircle(128, 146, 80);
  graphics.fillStyle(0xffcdd2, 0.95);
  graphics.fillEllipse(96, 112, 34, 20);
  face(graphics, 128, 150, 1);
}

function drawOrange(graphics: Phaser.GameObjects.Graphics): void {
  graphics.fillStyle(0xef6c00, 1);
  graphics.fillCircle(128, 146, 90);
  graphics.fillStyle(pairColor('orange'), 1);
  graphics.fillCircle(128, 142, 84);
  graphics.fillStyle(0xf57c00, 0.45);
  for (const [x, y] of [
    [86, 120],
    [168, 126],
    [108, 186],
    [160, 184],
    [128, 100],
  ] as const) {
    graphics.fillCircle(x, y, 9);
  }
  graphics.fillStyle(LEAF, 1);
  graphics.fillEllipse(168, 62, 52, 26);
  graphics.fillStyle(0xfff3e0, 1);
  graphics.fillCircle(128, 64, 9);
  face(graphics, 128, 150, 1);
}

function drawSunflower(graphics: Phaser.GameObjects.Graphics): void {
  graphics.fillStyle(LEAF, 1);
  graphics.fillRoundedRect(120, 176, 16, 62, 8);
  graphics.fillEllipse(176, 206, 52, 24);
  const centerX = 128;
  const centerY = 112;
  for (let petal = 0; petal < 12; petal += 1) {
    const angle = (Math.PI * 2 * petal) / 12;
    graphics.fillStyle(petal % 2 === 0 ? pairColor('yellow') : 0xffa000, 1);
    graphics.fillCircle(centerX + Math.cos(angle) * 52, centerY + Math.sin(angle) * 52, 26);
  }
  graphics.fillStyle(0x6d4c41, 1);
  graphics.fillCircle(centerX, centerY, 40);
  graphics.fillStyle(0x8d6e63, 1);
  graphics.fillCircle(centerX - 10, centerY - 10, 12);
  face(graphics, centerX, centerY + 2, 0.72, 0xfff8e1);
}

function drawFlower(graphics: Phaser.GameObjects.Graphics): void {
  graphics.fillStyle(LEAF, 1);
  graphics.fillRoundedRect(120, 168, 14, 70, 7);
  graphics.fillEllipse(86, 198, 48, 22);
  const centerX = 128;
  const centerY = 108;
  for (let petal = 0; petal < 6; petal += 1) {
    const angle = (Math.PI * 2 * petal) / 6 - Math.PI / 2;
    graphics.fillStyle(petal % 2 === 0 ? pairColor('pink') : 0xf48fb1, 1);
    graphics.fillCircle(centerX + Math.cos(angle) * 46, centerY + Math.sin(angle) * 46, 32);
  }
  graphics.fillStyle(0xffee58, 1);
  graphics.fillCircle(centerX, centerY, 30);
  graphics.fillStyle(0xfdd835, 1);
  graphics.fillCircle(centerX - 8, centerY - 8, 10);
  face(graphics, centerX, centerY + 2, 0.62);
}

function drawGrapes(graphics: Phaser.GameObjects.Graphics): void {
  graphics.fillStyle(LEAF, 1);
  graphics.fillEllipse(162, 46, 64, 30);
  graphics.fillStyle(LEAF_DARK, 1);
  graphics.fillEllipse(156, 40, 26, 12);
  graphics.fillStyle(STEM, 1);
  graphics.fillRoundedRect(122, 36, 12, 28, 4);
  const grapes = [
    [128, 78],
    [96, 104],
    [156, 104],
    [128, 112],
    [104, 140],
    [150, 140],
    [128, 168],
  ] as const;
  for (const [x, y] of grapes) {
    graphics.fillStyle(0x6a1b9a, 1);
    graphics.fillCircle(x, y, 28);
    graphics.fillStyle(pairColor('purple'), 1);
    graphics.fillCircle(x - 1, y - 1, 24);
    graphics.fillStyle(0xce93d8, 0.85);
    graphics.fillCircle(x - 8, y - 8, 7);
  }
  face(graphics, 128, 114, 0.55, 0xf3e5f5);
}
