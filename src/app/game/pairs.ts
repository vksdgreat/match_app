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
  | 'pencil'
  | 'star'
  | 'boat'
  | 'flagIndia'
  | 'flagJapan'
  | 'flagFrance'
  | 'flagBrazil'
  | 'flagCanada';
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
  plainWords?: boolean;
  hideRightLabel?: boolean;
  colorHint?: boolean;
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
    leftPicture: 'appleJuice',
    rightName: 'Apple',
    picture: 'apple',
  },
  {
    id: 'orange-juice',
    color: 0xfb8c00,
    colorName: 'Orange juice',
    leftPicture: 'orangeJuice',
    rightName: 'Orange',
    picture: 'orange',
  },
  {
    id: 'grape-juice',
    color: 0x8e24aa,
    colorName: 'Grape juice',
    leftPicture: 'grapeJuice',
    rightName: 'Grapes',
    picture: 'grapes',
  },
  {
    id: 'strawberry-juice',
    color: 0xec407a,
    colorName: 'Strawberry juice',
    leftPicture: 'strawberryJuice',
    rightName: 'Strawberry',
    picture: 'strawberry',
  },
  {
    id: 'lemon-juice',
    color: 0xfbc02d,
    colorName: 'Lemon juice',
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
    rightName: 'Apple',
    picture: 'apple',
    quantity: 1,
  },
  {
    id: 'two-pencils',
    color: 0x1e88e5,
    colorName: 'Two',
    leftName: '2',
    rightName: 'Pencils',
    picture: 'pencil',
    quantity: 2,
  },
  {
    id: 'three-mangoes',
    color: 0x43a047,
    colorName: 'Three',
    leftName: '3',
    rightName: 'Mangoes',
    picture: 'mango',
    quantity: 3,
  },
  {
    id: 'four-flowers',
    color: 0xfb8c00,
    colorName: 'Four',
    leftName: '4',
    rightName: 'Flowers',
    picture: 'flower',
    quantity: 4,
  },
  {
    id: 'five-balls',
    color: 0x8e24aa,
    colorName: 'Five',
    leftName: '5',
    rightName: 'Balls',
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

export const LEVEL_TEN: readonly MatchPair[] = [
  { id: 'word-apple', color: 0xe53935, colorName: 'Apple', rightName: 'Apple', picture: 'apple' },
  { id: 'word-mango', color: 0xef6c00, colorName: 'Mango', rightName: 'Mango', picture: 'mango' },
  { id: 'word-grapes', color: 0x8e24aa, colorName: 'Grapes', rightName: 'Grapes', picture: 'grapes' },
  { id: 'word-lemon', color: 0xf9a825, colorName: 'Lemon', rightName: 'Lemon', picture: 'lemon' },
  { id: 'word-orange', color: 0xfb8c00, colorName: 'Orange', rightName: 'Orange', picture: 'orange' },
];

export const LEVEL_ELEVEN: readonly MatchPair[] = [
  { id: 'read-apple', color: 0xe53935, colorName: 'Apple', rightName: 'apple', picture: 'apple' },
  { id: 'read-mango', color: 0xef6c00, colorName: 'Mango', rightName: 'mango', picture: 'mango' },
  { id: 'read-grapes', color: 0x8e24aa, colorName: 'Grapes', rightName: 'grapes', picture: 'grapes' },
  { id: 'read-lemon', color: 0xf9a825, colorName: 'Lemon', rightName: 'lemon', picture: 'lemon' },
  { id: 'read-orange', color: 0xfb8c00, colorName: 'Orange', rightName: 'orange', picture: 'orange' },
];

export const LEVEL_TWELVE: readonly MatchPair[] = [
  { id: 'word-bike', color: 0xe53935, colorName: 'Bike', rightName: 'bike', picture: 'bicycle' },
  { id: 'word-car', color: 0x1e88e5, colorName: 'Car', rightName: 'car', picture: 'car' },
  { id: 'word-bus', color: 0x43a047, colorName: 'Bus', rightName: 'bus', picture: 'bus' },
  { id: 'word-plane', color: 0x8e24aa, colorName: 'Plane', rightName: 'plane', picture: 'plane' },
  { id: 'word-boat', color: 0x00897b, colorName: 'Boat', rightName: 'boat', picture: 'boat' },
];

export const LEVEL_THIRTEEN: readonly MatchPair[] = [
  { id: 'stars-6', color: 0xe53935, colorName: 'Six', leftName: '6', rightName: 'Stars', picture: 'star', quantity: 6 },
  {
    id: 'stars-7',
    color: 0x1e88e5,
    colorName: 'Seven',
    leftName: '7',
    rightName: 'Stars',
    picture: 'star',
    quantity: 7,
  },
  {
    id: 'stars-8',
    color: 0x43a047,
    colorName: 'Eight',
    leftName: '8',
    rightName: 'Stars',
    picture: 'star',
    quantity: 8,
  },
  {
    id: 'stars-9',
    color: 0xfb8c00,
    colorName: 'Nine',
    leftName: '9',
    rightName: 'Stars',
    picture: 'star',
    quantity: 9,
  },
  {
    id: 'stars-10',
    color: 0x8e24aa,
    colorName: 'Ten',
    leftName: '10',
    rightName: 'Stars',
    picture: 'star',
    quantity: 10,
  },
];

export const LEVEL_FOURTEEN: readonly MatchPair[] = [
  {
    id: 'sum-3',
    color: 0xe53935,
    colorName: 'Three',
    leftName: '1+2',
    rightName: 'Balls',
    picture: 'ball',
    quantity: 3,
  },
  {
    id: 'sum-4',
    color: 0x1e88e5,
    colorName: 'Four',
    leftName: '2+2',
    rightName: 'Balls',
    picture: 'ball',
    quantity: 4,
  },
  {
    id: 'sum-5',
    color: 0x43a047,
    colorName: 'Five',
    leftName: '3+2',
    rightName: 'Balls',
    picture: 'ball',
    quantity: 5,
  },
  {
    id: 'sum-7',
    color: 0xfb8c00,
    colorName: 'Seven',
    leftName: '4+3',
    rightName: 'Balls',
    picture: 'ball',
    quantity: 7,
  },
  {
    id: 'sum-9',
    color: 0x8e24aa,
    colorName: 'Nine',
    leftName: '5+4',
    rightName: 'Balls',
    picture: 'ball',
    quantity: 9,
  },
];

export const LEVEL_FIFTEEN: readonly MatchPair[] = [
  { id: 'india', color: 0xff9933, colorName: 'India', rightName: 'India flag', picture: 'flagIndia' },
  { id: 'japan', color: 0xd32f2f, colorName: 'Japan', rightName: 'Japan flag', picture: 'flagJapan' },
  { id: 'france', color: 0x1565c0, colorName: 'France', rightName: 'France flag', picture: 'flagFrance' },
  { id: 'brazil', color: 0x2e7d32, colorName: 'Brazil', rightName: 'Brazil flag', picture: 'flagBrazil' },
  { id: 'canada', color: 0xc62828, colorName: 'Canada', rightName: 'Canada flag', picture: 'flagCanada' },
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
  hint: 'Match each juice to the fruit of the same color.',
  leftHeading: 'Juices',
  rightHeading: 'Fruits',
  leftStyle: 'picture',
  rightStyle: 'picture',
  startHint: 'Start from a glass of juice.',
  tapHint: 'Now tap the fruit with the same color.',
  missHint: 'Not a match. Look for the fruit in this color.',
  glowHint: 'See the glowing fruit? It matches this juice color.',
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

const LEVEL_TEN_DEF: LevelDef = {
  number: 10,
  built: true,
  hint: 'Match each colored fruit word to the fruit of that color.',
  leftHeading: 'Fruit words',
  rightHeading: 'Fruits',
  leftStyle: 'word',
  rightStyle: 'picture',
  hideRightLabel: true,
  startHint: 'Start from a fruit word.',
  tapHint: 'Now tap the fruit of this color.',
  missHint: 'Not a match. Look for the fruit of this color.',
  glowHint: 'See the glowing fruit? It matches this word.',
  pairs: LEVEL_TEN,
};

const LEVEL_ELEVEN_DEF: LevelDef = {
  number: 11,
  built: true,
  hint: 'Read each fruit word and match it to the fruit.',
  leftHeading: 'Fruit words',
  rightHeading: 'Fruits',
  leftStyle: 'word',
  rightStyle: 'picture',
  plainWords: true,
  hideRightLabel: true,
  colorHint: false,
  startHint: 'Start from a fruit word.',
  tapHint: 'Now tap the fruit this word names.',
  missHint: 'Not a match. Read the word again.',
  glowHint: 'See the glowing fruit? It matches this word.',
  pairs: LEVEL_ELEVEN,
};

const LEVEL_TWELVE_DEF: LevelDef = {
  number: 12,
  built: true,
  hint: 'Read each vehicle word and match it to the vehicle.',
  leftHeading: 'Vehicle words',
  rightHeading: 'Vehicles',
  leftStyle: 'word',
  rightStyle: 'picture',
  plainWords: true,
  hideRightLabel: true,
  colorHint: false,
  startHint: 'Start from a vehicle word.',
  tapHint: 'Now tap the vehicle this word names.',
  missHint: 'Not a match. Read the word again.',
  glowHint: 'See the glowing vehicle? It matches this word.',
  pairs: LEVEL_TWELVE,
};

const LEVEL_THIRTEEN_DEF: LevelDef = {
  number: 13,
  built: true,
  hint: 'Match each number to the group with that many stars.',
  leftHeading: 'Numbers',
  rightHeading: 'Stars',
  leftStyle: 'number',
  rightStyle: 'picture',
  colorHint: false,
  startHint: 'Start from a number.',
  tapHint: 'Now tap the group with that many stars.',
  missHint: 'Not a match. Count the stars carefully.',
  glowHint: 'See the glowing group? Count its stars.',
  pairs: LEVEL_THIRTEEN,
};

const LEVEL_FOURTEEN_DEF: LevelDef = {
  number: 14,
  built: true,
  hint: 'Match each sum to the group with that many balls.',
  leftHeading: 'Sums',
  rightHeading: 'Balls',
  leftStyle: 'number',
  rightStyle: 'picture',
  colorHint: false,
  startHint: 'Start from a sum.',
  tapHint: 'Now tap the group with that many balls.',
  missHint: 'Not a match. Add the numbers, then count the balls.',
  glowHint: 'See the glowing group? Count its balls.',
  pairs: LEVEL_FOURTEEN,
};

const LEVEL_FIFTEEN_DEF: LevelDef = {
  number: 15,
  built: true,
  hint: 'Match each country name to its flag.',
  leftHeading: 'Countries',
  rightHeading: 'Flags',
  leftStyle: 'word',
  rightStyle: 'picture',
  plainWords: true,
  hideRightLabel: true,
  colorHint: false,
  startHint: 'Start from a country name.',
  tapHint: 'Now tap the flag of that country.',
  missHint: 'Not a match. Look for that country’s flag.',
  glowHint: 'See the glowing flag? It belongs to this country.',
  pairs: LEVEL_FIFTEEN,
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
  LEVEL_TEN_DEF,
  LEVEL_ELEVEN_DEF,
  LEVEL_TWELVE_DEF,
  LEVEL_THIRTEEN_DEF,
  LEVEL_FOURTEEN_DEF,
  LEVEL_FIFTEEN_DEF,
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
