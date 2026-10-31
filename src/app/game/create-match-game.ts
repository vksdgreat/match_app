import Phaser from 'phaser';

import { MapScene } from './map.scene';
import { MatchScene } from './match.scene';
import type { MatchHooks } from './match.types';

export interface MatchGameHandle {
  game: Phaser.Game;
  replay: () => void;
  startLevel: (levelNumber: number) => void;
  showMap: () => void;
}

export function createMatchGame(parent: HTMLElement, hooks: MatchHooks): MatchGameHandle {
  const map = new MapScene(hooks);
  const match = new MatchScene(hooks);
  const game = new Phaser.Game({
    type: Phaser.AUTO,
    parent,
    backgroundColor: '#fff8ef',
    banner: false,
    scale: {
      mode: Phaser.Scale.RESIZE,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      width: Math.max(parent.clientWidth, 320),
      height: Math.max(parent.clientHeight, 480),
    },
    audio: {
      noAudio: true,
    },
    render: {
      antialias: true,
      roundPixels: false,
    },
    scene: [map, match],
  });

  return {
    game,
    replay: () => match.replay(),
    startLevel: (levelNumber) => map.startLevel(levelNumber),
    showMap: () => {
      if (match.scene.isActive()) {
        match.returnToMap();
        return;
      }
      map.refreshMap();
    },
  };
}
