import {
  LEVEL_EIGHT,
  LEVEL_ELEVEN,
  LEVEL_FIFTEEN,
  LEVEL_FIVE,
  LEVEL_FOUR,
  LEVEL_FOURTEEN,
  LEVEL_NINE,
  LEVEL_ONE,
  LEVEL_SEVEN,
  LEVEL_SIX,
  LEVEL_TEN,
  LEVEL_THIRTEEN,
  LEVEL_THREE,
  LEVEL_TWELVE,
  LEVEL_TWO,
  dealPairs,
  shuffle,
} from './pairs';

describe('match pairs', () => {
  it('gives every color a different picture', () => {
    const colors = new Set(LEVEL_ONE.map((pair) => pair.color));
    const pictures = new Set(LEVEL_ONE.map((pair) => pair.picture));

    expect(colors.size).toBe(LEVEL_ONE.length);
    expect(pictures.size).toBe(LEVEL_ONE.length);
  });

  it('shuffles into a new array', () => {
    const original = ['a', 'b', 'c'];
    const shuffled = shuffle(original);

    expect(shuffled).toHaveLength(original.length);
    expect([...shuffled].sort()).toEqual(['a', 'b', 'c']);
    expect(original).toEqual(['a', 'b', 'c']);
  });

  it('gives level 2 a color word and a different shape for each pair', () => {
    const words = LEVEL_TWO.map((pair) => pair.colorName.toUpperCase());
    const shapes = LEVEL_TWO.map((pair) => pair.shape);

    expect(words).toEqual(['RED', 'BLUE', 'GREEN', 'ORANGE', 'PURPLE']);
    expect(new Set(shapes).size).toBe(LEVEL_TWO.length);
    expect(new Set(LEVEL_TWO.map((pair) => pair.color)).size).toBe(LEVEL_TWO.length);
  });

  it('gives level 3 a color circle and a different animal for each pair', () => {
    const animals = LEVEL_THREE.map((pair) => pair.picture);

    expect(animals).toEqual(['dog', 'tiger', 'cat', 'elephant', 'bunny']);
    expect(new Set(LEVEL_THREE.map((pair) => pair.color)).size).toBe(LEVEL_THREE.length);
    expect(LEVEL_THREE.every((pair) => pair.colorName.length > 0 && pair.rightName.length > 0)).toBe(true);
  });

  it('gives level 4 a color circle and a different bird for each pair', () => {
    const birds = LEVEL_FOUR.map((pair) => pair.picture);

    expect(LEVEL_FOUR.map((pair) => pair.colorName)).toEqual(['Red', 'Blue', 'Green', 'Yellow', 'Purple']);
    expect(birds).toEqual(['cardinal', 'bluebird', 'parrot', 'duck', 'finch']);
    expect(new Set(LEVEL_FOUR.map((pair) => pair.color)).size).toBe(LEVEL_FOUR.length);
    expect(new Set(birds).size).toBe(LEVEL_FOUR.length);
    expect(LEVEL_FOUR.every((pair) => pair.colorName.length > 0 && pair.rightName.length > 0)).toBe(true);
  });

  it('gives level 5 a unique baby animal and grown-up animal for every pair', () => {
    expect(LEVEL_FIVE.map((pair) => pair.leftPicture)).toEqual(['chick', 'puppy', 'cub', 'calf', 'foal']);
    expect(LEVEL_FIVE.map((pair) => pair.picture)).toEqual(['chicken', 'dog', 'tiger', 'cow', 'horse']);
    expect(LEVEL_FIVE.map((pair) => pair.leftName)).toEqual(['Chick', 'Puppy', 'Cub', 'Calf', 'Foal']);
    expect(LEVEL_FIVE.map((pair) => pair.rightName)).toEqual(['Chicken', 'Dog', 'Tiger', 'Cow', 'Horse']);
    expect(new Set(LEVEL_FIVE.map((pair) => pair.id)).size).toBe(LEVEL_FIVE.length);
    expect(new Set(LEVEL_FIVE.map((pair) => pair.leftPicture)).size).toBe(LEVEL_FIVE.length);
    expect(new Set(LEVEL_FIVE.map((pair) => pair.picture)).size).toBe(LEVEL_FIVE.length);
  });

  it('gives level 6 a unique vehicle in the matching color for every square', () => {
    expect(LEVEL_SIX.map((pair) => pair.colorName)).toEqual(['Red', 'Blue', 'Green', 'Yellow', 'Purple']);
    expect(LEVEL_SIX.map((pair) => pair.picture)).toEqual(['bicycle', 'car', 'motorbike', 'plane', 'bus']);
    expect(LEVEL_SIX.map((pair) => pair.rightName)).toEqual(['Bicycle', 'Car', 'Motorbike', 'Plane', 'Bus']);
    expect(new Set(LEVEL_SIX.map((pair) => pair.color)).size).toBe(LEVEL_SIX.length);
    expect(new Set(LEVEL_SIX.map((pair) => pair.picture)).size).toBe(LEVEL_SIX.length);
  });

  it('gives level 7 a unique juice glass and matching fruit for every pair', () => {
    expect(LEVEL_SEVEN.map((pair) => pair.leftPicture)).toEqual([
      'appleJuice',
      'orangeJuice',
      'grapeJuice',
      'strawberryJuice',
      'lemonJuice',
    ]);
    expect(LEVEL_SEVEN.map((pair) => pair.picture)).toEqual(['apple', 'orange', 'grapes', 'strawberry', 'lemon']);
    expect(LEVEL_SEVEN.every((pair) => pair.leftName === undefined)).toBe(true);
    expect(new Set(LEVEL_SEVEN.map((pair) => pair.id)).size).toBe(LEVEL_SEVEN.length);
    expect(new Set(LEVEL_SEVEN.map((pair) => pair.leftPicture)).size).toBe(LEVEL_SEVEN.length);
    expect(new Set(LEVEL_SEVEN.map((pair) => pair.picture)).size).toBe(LEVEL_SEVEN.length);
  });

  it('gives level 8 colorful numbers and matching counted item groups', () => {
    expect(LEVEL_EIGHT.map((pair) => pair.leftName)).toEqual(['1', '2', '3', '4', '5']);
    expect(LEVEL_EIGHT.map((pair) => pair.quantity)).toEqual([1, 2, 3, 4, 5]);
    expect(LEVEL_EIGHT.map((pair) => pair.rightName)).toEqual(['Apple', 'Pencils', 'Mangoes', 'Flowers', 'Balls']);
    expect(new Set(LEVEL_EIGHT.map((pair) => pair.color)).size).toBe(LEVEL_EIGHT.length);
    expect(new Set(LEVEL_EIGHT.map((pair) => pair.picture)).size).toBe(LEVEL_EIGHT.length);
    expect(new Set(LEVEL_EIGHT.map((pair) => pair.id)).size).toBe(LEVEL_EIGHT.length);
  });

  it('gives level 9 a colored number and the polygon with that many sides', () => {
    expect(LEVEL_NINE.map((pair) => pair.leftName)).toEqual(['3', '4', '5', '6', '8']);
    expect(LEVEL_NINE.map((pair) => pair.shape)).toEqual(['triangle', 'square', 'pentagon', 'hexagon', 'octagon']);
    expect(LEVEL_NINE.map((pair) => pair.rightName)).toEqual(['Triangle', 'Square', 'Pentagon', 'Hexagon', 'Octagon']);
    expect(new Set(LEVEL_NINE.map((pair) => pair.color)).size).toBe(LEVEL_NINE.length);
    expect(LEVEL_NINE.every((pair) => pair.leftName !== undefined && pair.shape !== undefined)).toBe(true);
  });

  it('gives level 10 colored fruit words and hides the fruit names', () => {
    expect(LEVEL_TEN.map((pair) => pair.colorName)).toEqual(['Apple', 'Mango', 'Grapes', 'Lemon', 'Orange']);
    expect(LEVEL_TEN.map((pair) => pair.picture)).toEqual(['apple', 'mango', 'grapes', 'lemon', 'orange']);
    expect(new Set(LEVEL_TEN.map((pair) => pair.color)).size).toBe(LEVEL_TEN.length);
  });

  it('gives level 11 plain fruit words and level 12 plain vehicle words', () => {
    expect(LEVEL_ELEVEN.map((pair) => pair.colorName)).toEqual(['Apple', 'Mango', 'Grapes', 'Lemon', 'Orange']);
    expect(LEVEL_ELEVEN.map((pair) => pair.picture)).toEqual(['apple', 'mango', 'grapes', 'lemon', 'orange']);
    expect(LEVEL_TWELVE.map((pair) => pair.colorName)).toEqual(['Bike', 'Car', 'Bus', 'Plane', 'Boat']);
    expect(LEVEL_TWELVE.map((pair) => pair.picture)).toEqual(['bicycle', 'car', 'bus', 'plane', 'boat']);
  });

  it('gives level 13 larger star groups and level 14 sums within ten', () => {
    expect(LEVEL_THIRTEEN.map((pair) => pair.leftName)).toEqual(['6', '7', '8', '9', '10']);
    expect(LEVEL_THIRTEEN.map((pair) => pair.quantity)).toEqual([6, 7, 8, 9, 10]);
    expect(LEVEL_THIRTEEN.every((pair) => pair.picture === 'star' && pair.rightName === 'Stars')).toBe(true);
    expect(LEVEL_FOURTEEN.map((pair) => pair.leftName)).toEqual(['1+2', '2+2', '3+2', '4+3', '5+4']);
    expect(LEVEL_FOURTEEN.map((pair) => pair.quantity)).toEqual([3, 4, 5, 7, 9]);
    expect(LEVEL_FOURTEEN.every((pair) => pair.picture === 'ball' && (pair.quantity ?? 0) <= 10)).toBe(true);
  });

  it('gives level 15 country names and distinct flags', () => {
    expect(LEVEL_FIFTEEN.map((pair) => pair.colorName)).toEqual(['India', 'Japan', 'France', 'Brazil', 'Canada']);
    expect(LEVEL_FIFTEEN.map((pair) => pair.picture)).toEqual([
      'flagIndia',
      'flagJapan',
      'flagFrance',
      'flagBrazil',
      'flagCanada',
    ]);
    expect(new Set(LEVEL_FIFTEEN.map((pair) => pair.picture)).size).toBe(LEVEL_FIFTEEN.length);
  });

  it('deals both sides in different orders', () => {
    for (let attempt = 0; attempt < 25; attempt += 1) {
      const deal = dealPairs(LEVEL_ONE);
      const leftIds = deal.left.map((pair) => pair.id);
      const rightIds = deal.right.map((pair) => pair.id);

      expect(leftIds).toHaveLength(LEVEL_ONE.length);
      expect([...leftIds].sort()).toEqual([...rightIds].sort());
      expect(leftIds).not.toEqual(rightIds);
    }
  });
});
