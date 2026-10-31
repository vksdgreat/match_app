import { PATH_LEVELS, levelByNumber } from './pairs';
import {
  describeProgress,
  emptyProgress,
  isUnlocked,
  loadProgress,
  lockedReason,
  markCleared,
  readyLevelNumber,
} from './progress';

describe('level progress', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('starts on level 1 with later levels locked', () => {
    const progress = emptyProgress();
    const levelTwo = levelByNumber(2);
    const levelThree = levelByNumber(3);

    expect(readyLevelNumber(progress)).toBe(1);
    expect(levelTwo && isUnlocked(levelTwo, progress)).toBe(false);
    expect(levelThree && isUnlocked(levelThree, progress)).toBe(false);
    expect(lockedReason(levelTwo)).toBe('Clear level 1 to open level 2.');
    expect(lockedReason(levelThree)).toBe('Clear level 2 to open level 3.');
    expect(lockedReason(levelByNumber(5))).toBe('Clear level 4 to open level 5.');
    expect(lockedReason(levelByNumber(6))).toBe('Clear level 5 to open level 6.');
    expect(describeProgress(progress)).toEqual({ readyLevel: 1, clearedCount: 0, builtCount: 7 });
  });

  it('unlocks level 2 after level 1 is cleared and keeps later levels locked', () => {
    markCleared(1);
    const progress = loadProgress();
    const levelTwo = levelByNumber(2);
    const levelThree = levelByNumber(3);

    expect(progress.cleared).toEqual([1]);
    expect(readyLevelNumber(progress)).toBe(2);
    expect(levelTwo && isUnlocked(levelTwo, progress)).toBe(true);
    expect(levelThree && isUnlocked(levelThree, progress)).toBe(false);
    expect(PATH_LEVELS.filter((level) => level.built).map((level) => level.number)).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });

  it('unlocks each new level after the previous level is cleared', () => {
    markCleared(1);
    markCleared(2);
    const progress = loadProgress();
    const levelThree = levelByNumber(3);
    const levelFour = levelByNumber(4);
    const levelFive = levelByNumber(5);
    const levelSix = levelByNumber(6);
    const levelSeven = levelByNumber(7);

    expect(readyLevelNumber(progress)).toBe(3);
    expect(levelThree && isUnlocked(levelThree, progress)).toBe(true);
    expect(levelFour && isUnlocked(levelFour, progress)).toBe(false);
    expect(levelFive && isUnlocked(levelFive, progress)).toBe(false);
    expect(lockedReason(levelFive)).toBe('Clear level 4 to open level 5.');
    markCleared(3);
    const afterLevelThree = loadProgress();
    expect(readyLevelNumber(afterLevelThree)).toBe(4);
    expect(levelFour && isUnlocked(levelFour, afterLevelThree)).toBe(true);
    markCleared(4);
    const afterLevelFour = loadProgress();
    expect(readyLevelNumber(afterLevelFour)).toBe(5);
    expect(levelFive && isUnlocked(levelFive, afterLevelFour)).toBe(true);
    markCleared(5);
    const afterLevelFive = loadProgress();
    expect(readyLevelNumber(afterLevelFive)).toBe(6);
    expect(levelSix && isUnlocked(levelSix, afterLevelFive)).toBe(true);
    markCleared(6);
    const afterLevelSix = loadProgress();
    expect(readyLevelNumber(afterLevelSix)).toBe(7);
    expect(levelSeven && isUnlocked(levelSeven, afterLevelSix)).toBe(true);
  });

  it('keeps the last built level selected when every built level is cleared', () => {
    markCleared(1);
    markCleared(2);
    markCleared(3);
    markCleared(4);
    markCleared(5);
    markCleared(6);
    markCleared(7);
    markCleared(7);

    const progress = loadProgress();
    expect(progress.cleared).toEqual([1, 2, 3, 4, 5, 6, 7]);
    expect(readyLevelNumber(progress)).toBe(7);
    expect(describeProgress(progress).clearedCount).toBe(7);
  });
});
