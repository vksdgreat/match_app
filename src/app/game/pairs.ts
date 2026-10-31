export type PictureKind =
  'apple' | 'orange' | 'sunflower' | 'flower' | 'grapes' | 'dog' | 'tiger' | 'cat' | 'elephant' | 'bunny';
export type ShapeKind = 'circle' | 'triangle' | 'square' | 'diamond' | 'star';
export type LeftStyle = 'circle' | 'word';
export type RightStyle = 'picture' | 'shape';

export interface MatchPair {
  id: string;
  color: number;
  colorName: string;
  rightName: string;
  picture?: PictureKind;
  shape?: ShapeKind;
}

export interface LevelDef {
  number: number;
  built: boolean;
  hint: string;
  leftHeading: string;
  rightHeading: string;
  leftStyle: LeftStyle;
  rightStyle: RightStyle;
  startHint: string;
  tapHint: string;
  missHint: string;
  glowHint: string;
  pairs: readonly MatchPair[];
}

export const LEVEL_ONE: readonly MatchPair[] = [
  { id: 'red', color: 0xe53935, colorName: 'Red', rightName: 'Apple', picture: 'apple' },
  { id: 'orange', color: 0xfb8c00, colorName: 'Orange', rightName: 'Orange', picture: 'orange' },
  { id: 'yellow', color: 0xfbc02d, colorName: 'Yellow', rightName: 'Sunflower', picture: 'sunflower' },
  { id: 'pink', color: 0xec407a, colorName: 'Pink', rightName: 'Flower', picture: 'flower' },
  { id: 'purple', color: 0x8e24aa, colorName: 'Purple', rightName: 'Grapes', picture: 'grapes' },
];

export const LEVEL_THREE: readonly MatchPair[] = [
  { id: 'red', color: 0xe53935, colorName: 'Red', rightName: 'Dog', picture: 'dog' },
  { id: 'orange', color: 0xfb8c00, colorName: 'Orange', rightName: 'Tiger', picture: 'tiger' },
  { id: 'yellow', color: 0xfbc02d, colorName: 'Yellow', rightName: 'Cat', picture: 'cat' },
  { id: 'pink', color: 0xec407a, colorName: 'Pink', rightName: 'Elephant', picture: 'elephant' },
  { id: 'purple', color: 0x8e24aa, colorName: 'Purple', rightName: 'Bunny', picture: 'bunny' },
];

export const LEVEL_TWO: readonly MatchPair[] = [
  { id: 'red', color: 0xd32f2f, colorName: 'Red', rightName: 'Circle', shape: 'circle' },
  { id: 'blue', color: 0x1565c0, colorName: 'Blue', rightName: 'Triangle', shape: 'triangle' },
  { id: 'green', color: 0x2e7d32, colorName: 'Green', rightName: 'Square', shape: 'square' },
  { id: 'orange', color: 0xef6c00, colorName: 'Orange', rightName: 'Diamond', shape: 'diamond' },
  { id: 'purple', color: 0x6a1b9a, colorName: 'Purple', rightName: 'Star', shape: 'star' },
];

const LEVEL_ONE_DEF: LevelDef = {
  number: 1,
  built: true,
  hint: 'Draw a line from each circle to the picture of the same color.',
  leftHeading: 'Colors',
  rightHeading: 'Pictures',
  leftStyle: 'circle',
  rightStyle: 'picture',
  startHint: 'Start from a colored circle.',
  tapHint: 'Now tap the picture with the same color.',
  missHint: 'Not a match. Look for the same color.',
  glowHint: 'See the glowing picture? It matches this color.',
  pairs: LEVEL_ONE,
};

const LEVEL_THREE_DEF: LevelDef = {
  number: 3,
  built: true,
  hint: 'Draw a line from each circle to the animal of the same color.',
  leftHeading: 'Colors',
  rightHeading: 'Animals',
  leftStyle: 'circle',
  rightStyle: 'picture',
  startHint: 'Start from a colored circle.',
  tapHint: 'Now tap the animal with the same color.',
  missHint: 'Not a match. Look for the same color.',
  glowHint: 'See the glowing animal? It matches this color.',
  pairs: LEVEL_THREE,
};

const LEVEL_TWO_DEF: LevelDef = {
  number: 2,
  built: true,
  hint: 'Draw a line from each color word to the shape of the same color.',
  leftHeading: 'Words',
  rightHeading: 'Shapes',
  leftStyle: 'word',
  rightStyle: 'shape',
  startHint: 'Start from a color word.',
  tapHint: 'Now tap the shape in this color.',
  missHint: 'Not a match. Find the shape in this color.',
  glowHint: 'See the glowing shape? It matches this word.',
  pairs: LEVEL_TWO,
};

export const PATH_LEVELS: readonly LevelDef[] = [
  LEVEL_ONE_DEF,
  LEVEL_TWO_DEF,
  LEVEL_THREE_DEF,
  ...[4, 5, 6, 7, 8].map((number) => futureLevel(number)),
];

export const BUILT_LEVEL_COUNT = PATH_LEVELS.filter((level) => level.built).length;

export function levelByNumber(levelNumber: number): LevelDef | undefined {
  return PATH_LEVELS.find((level) => level.number === levelNumber);
}

export function shuffle<T>(items: readonly T[]): T[] {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    const current = copy[index];
    const other = copy[swapIndex];
    if (current === undefined || other === undefined) {
      continue;
    }
    copy[index] = other;
    copy[swapIndex] = current;
  }
  return copy;
}

export function dealPairs(pairs: readonly MatchPair[]): { left: MatchPair[]; right: MatchPair[] } {
  const left = shuffle(pairs);
  let right = shuffle(pairs);
  let attempts = 0;
  while (sameOrder(left, right) && attempts < 8) {
    right = shuffle(pairs);
    attempts += 1;
  }
  if (sameOrder(left, right) && right.length > 1) {
    const [first, second, ...rest] = right;
    if (first && second) {
      right = [second, first, ...rest];
    }
  }
  return { left, right };
}

function futureLevel(number: number): LevelDef {
  return {
    number,
    built: false,
    hint: '',
    leftHeading: '',
    rightHeading: '',
    leftStyle: 'circle',
    rightStyle: 'picture',
    startHint: '',
    tapHint: '',
    missHint: '',
    glowHint: '',
    pairs: [],
  };
}

function sameOrder(left: readonly MatchPair[], right: readonly MatchPair[]): boolean {
  return left.every((pair, index) => pair.id === right[index]?.id);
}
