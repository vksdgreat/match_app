export type PictureKind =
  | 'apple'
  | 'orange'
  | 'sunflower'
  | 'flower'
  | 'grapes'
  | 'dog'
  | 'tiger'
  | 'cat'
  | 'elephant'
  | 'bunny'
  | 'cardinal'
  | 'bluebird'
  | 'parrot'
  | 'duck'
  | 'finch'
  | 'chick'
  | 'puppy'
  | 'cub'
  | 'calf'
  | 'foal'
  | 'chicken'
  | 'cow'
  | 'horse';
export type ShapeKind = 'circle' | 'triangle' | 'square' | 'diamond' | 'star';
export type LeftStyle = 'circle' | 'word' | 'picture';
export type RightStyle = 'picture' | 'shape';

export interface MatchPair {
  id: string;
  color: number;
  colorName: string;
  rightName: string;
  picture?: PictureKind;
  leftPicture?: PictureKind;
  leftName?: string;
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

export const LEVEL_FOUR: readonly MatchPair[] = [
  { id: 'red', color: 0xe53935, colorName: 'Red', rightName: 'Cardinal', picture: 'cardinal' },
  { id: 'blue', color: 0x1e88e5, colorName: 'Blue', rightName: 'Bluebird', picture: 'bluebird' },
  { id: 'green', color: 0x43a047, colorName: 'Green', rightName: 'Parrot', picture: 'parrot' },
  { id: 'yellow', color: 0xfbc02d, colorName: 'Yellow', rightName: 'Duck', picture: 'duck' },
  { id: 'purple', color: 0x8e24aa, colorName: 'Purple', rightName: 'Finch', picture: 'finch' },
];

export const LEVEL_FIVE: readonly MatchPair[] = [
  {
    id: 'chicken',
    color: 0xfbc02d,
    colorName: 'Chick',
    leftName: 'Chick',
    leftPicture: 'chick',
    rightName: 'Chicken',
    picture: 'chicken',
  },
  {
    id: 'dog',
    color: 0x8d6e63,
    colorName: 'Puppy',
    leftName: 'Puppy',
    leftPicture: 'puppy',
    rightName: 'Dog',
    picture: 'dog',
  },
  {
    id: 'tiger',
    color: 0xef6c00,
    colorName: 'Cub',
    leftName: 'Cub',
    leftPicture: 'cub',
    rightName: 'Tiger',
    picture: 'tiger',
  },
  {
    id: 'cow',
    color: 0x78909c,
    colorName: 'Calf',
    leftName: 'Calf',
    leftPicture: 'calf',
    rightName: 'Cow',
    picture: 'cow',
  },
  {
    id: 'horse',
    color: 0x6d4c41,
    colorName: 'Foal',
    leftName: 'Foal',
    leftPicture: 'foal',
    rightName: 'Horse',
    picture: 'horse',
  },
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

const LEVEL_FOUR_DEF: LevelDef = {
  number: 4,
  built: true,
  hint: 'Draw a line from each colored circle to the bird of the same color.',
  leftHeading: 'Colors',
  rightHeading: 'Birds',
  leftStyle: 'circle',
  rightStyle: 'picture',
  startHint: 'Start from a colored circle.',
  tapHint: 'Now tap the bird with the same color.',
  missHint: 'Not a match. Look for a bird with the same color.',
  glowHint: 'See the glowing bird? It matches this color.',
  pairs: LEVEL_FOUR,
};

const LEVEL_FIVE_DEF: LevelDef = {
  number: 5,
  built: true,
  hint: 'Match each baby animal to its grown-up.',
  leftHeading: 'Baby animals',
  rightHeading: 'Grown-up animals',
  leftStyle: 'picture',
  rightStyle: 'picture',
  startHint: 'Start from a baby animal.',
  tapHint: 'Now tap the grown-up animal that it will become.',
  missHint: 'Not a match. Look for the baby’s grown-up animal.',
  glowHint: 'See the glowing grown-up? It matches this baby animal.',
  pairs: LEVEL_FIVE,
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
  LEVEL_FOUR_DEF,
  LEVEL_FIVE_DEF,
  ...[6, 7, 8].map((number) => futureLevel(number)),
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
