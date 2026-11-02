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
  | 'horse'
  | 'bicycle'
  | 'car'
  | 'motorbike'
  | 'plane'
  | 'bus'
  | 'strawberry'
  | 'lemon'
  | 'appleJuice'
  | 'orangeJuice'
  | 'grapeJuice'
  | 'strawberryJuice'
  | 'lemonJuice'
  | 'ball'
  | 'mango'
  | 'pencil';
export type ShapeKind = 'circle' | 'triangle' | 'square' | 'diamond' | 'star' | 'pentagon' | 'hexagon' | 'octagon';
export type LeftStyle = 'circle' | 'word' | 'picture' | 'square' | 'number';
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
  quantity?: number;
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

export const LEVEL_SIX: readonly MatchPair[] = [
  { id: 'bicycle', color: 0xe53935, colorName: 'Red', rightName: 'Bicycle', picture: 'bicycle' },
  { id: 'car', color: 0x1e88e5, colorName: 'Blue', rightName: 'Car', picture: 'car' },
  { id: 'motorbike', color: 0x43a047, colorName: 'Green', rightName: 'Motorbike', picture: 'motorbike' },
  { id: 'plane', color: 0xfbc02d, colorName: 'Yellow', rightName: 'Plane', picture: 'plane' },
  { id: 'bus', color: 0x8e24aa, colorName: 'Purple', rightName: 'Bus', picture: 'bus' },
];

export const LEVEL_SEVEN: readonly MatchPair[] = [
  {
    id: 'apple-juice',
    color: 0xe53935,
    colorName: 'Apple juice',
    leftName: 'Apple juice',
    leftPicture: 'appleJuice',
    rightName: 'Apple',
    picture: 'apple',
  },
  {
    id: 'orange-juice',
    color: 0xfb8c00,
    colorName: 'Orange juice',
    leftName: 'Orange juice',
    leftPicture: 'orangeJuice',
    rightName: 'Orange',
    picture: 'orange',
  },
  {
    id: 'grape-juice',
    color: 0x8e24aa,
    colorName: 'Grape juice',
    leftName: 'Grape juice',
    leftPicture: 'grapeJuice',
    rightName: 'Grapes',
    picture: 'grapes',
  },
  {
    id: 'strawberry-juice',
    color: 0xec407a,
    colorName: 'Strawberry juice',
    leftName: 'Strawberry juice',
    leftPicture: 'strawberryJuice',
    rightName: 'Strawberry',
    picture: 'strawberry',
  },
  {
    id: 'lemon-juice',
    color: 0xfbc02d,
    colorName: 'Lemon juice',
    leftName: 'Lemon juice',
    leftPicture: 'lemonJuice',
    rightName: 'Lemon',
    picture: 'lemon',
  },
];

export const LEVEL_EIGHT: readonly MatchPair[] = [
  {
    id: 'one-apple',
    color: 0xe53935,
    colorName: 'One',
    leftName: '1',
    rightName: '1 apple',
    picture: 'apple',
    quantity: 1,
  },
  {
    id: 'two-pencils',
    color: 0x1e88e5,
    colorName: 'Two',
    leftName: '2',
    rightName: '2 pencils',
    picture: 'pencil',
    quantity: 2,
  },
  {
    id: 'three-mangoes',
    color: 0x43a047,
    colorName: 'Three',
    leftName: '3',
    rightName: '3 mangoes',
    picture: 'mango',
    quantity: 3,
  },
  {
    id: 'four-flowers',
    color: 0xfb8c00,
    colorName: 'Four',
    leftName: '4',
    rightName: '4 flowers',
    picture: 'flower',
    quantity: 4,
  },
  {
    id: 'five-balls',
    color: 0x8e24aa,
    colorName: 'Five',
    leftName: '5',
    rightName: '5 balls',
    picture: 'ball',
    quantity: 5,
  },
];

export const LEVEL_NINE: readonly MatchPair[] = [
  { id: 'three', color: 0xe53935, colorName: 'Three', leftName: '3', rightName: 'Triangle', shape: 'triangle' },
  { id: 'four', color: 0x1e88e5, colorName: 'Four', leftName: '4', rightName: 'Square', shape: 'square' },
  { id: 'five', color: 0x43a047, colorName: 'Five', leftName: '5', rightName: 'Pentagon', shape: 'pentagon' },
  { id: 'six', color: 0xfb8c00, colorName: 'Six', leftName: '6', rightName: 'Hexagon', shape: 'hexagon' },
  { id: 'eight', color: 0x8e24aa, colorName: 'Eight', leftName: '8', rightName: 'Octagon', shape: 'octagon' },
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

const LEVEL_SIX_DEF: LevelDef = {
  number: 6,
  built: true,
  hint: 'Match each colored square to a vehicle of the same color.',
  leftHeading: 'Colors',
  rightHeading: 'Vehicles',
  leftStyle: 'square',
  rightStyle: 'picture',
  startHint: 'Start from a colored square.',
  tapHint: 'Now tap the vehicle in the same color.',
  missHint: 'Not a match. Look for a vehicle in the same color.',
  glowHint: 'See the glowing vehicle? It matches this color.',
  pairs: LEVEL_SIX,
};

const LEVEL_SEVEN_DEF: LevelDef = {
  number: 7,
  built: true,
  hint: 'Match each glass of juice to the fruit it comes from.',
  leftHeading: 'Juices',
  rightHeading: 'Fruits',
  leftStyle: 'picture',
  rightStyle: 'picture',
  startHint: 'Start from a glass of juice.',
  tapHint: 'Now tap the fruit that makes this juice.',
  missHint: 'Not a match. Look for the fruit this juice comes from.',
  glowHint: 'See the glowing fruit? It makes this juice.',
  pairs: LEVEL_SEVEN,
};

const LEVEL_EIGHT_DEF: LevelDef = {
  number: 8,
  built: true,
  hint: 'Match each colorful number to the group with the same number of items.',
  leftHeading: 'Numbers',
  rightHeading: 'Item groups',
  leftStyle: 'number',
  rightStyle: 'picture',
  startHint: 'Start from a number.',
  tapHint: 'Now tap the group with that many items.',
  missHint: 'Not a match. Count the items carefully.',
  glowHint: 'See the glowing group? Count its items.',
  pairs: LEVEL_EIGHT,
};

const LEVEL_NINE_DEF: LevelDef = {
  number: 9,
  built: true,
  hint: 'Draw a line from each number to the polygon with that many sides.',
  leftHeading: 'Numbers',
  rightHeading: 'Polygons',
  leftStyle: 'number',
  rightStyle: 'shape',
  startHint: 'Start from a number.',
  tapHint: 'Now tap the polygon with that many sides.',
  missHint: 'Not a match. Count the sides of the polygon.',
  glowHint: 'See the glowing polygon? Count its sides.',
  pairs: LEVEL_NINE,
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
  LEVEL_SIX_DEF,
  LEVEL_SEVEN_DEF,
  LEVEL_EIGHT_DEF,
  LEVEL_NINE_DEF,
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

function sameOrder(left: readonly MatchPair[], right: readonly MatchPair[]): boolean {
  return left.every((pair, index) => pair.id === right[index]?.id);
}
