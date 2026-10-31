import { LEVEL_ONE, LEVEL_THREE, LEVEL_TWO, dealPairs, shuffle } from './pairs';

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
