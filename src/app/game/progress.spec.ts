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
    expect(describeProgress(progress)).toEqual({ readyLevel: 1, clearedCount: 0, builtCount: 15 });
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
    expect(PATH_LEVELS.filter((level) => level.built).map((level) => level.number)).toEqual([
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
    ]);
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
    const levelEight = levelByNumber(8);
    const levelNine = levelByNumber(9);

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
    markCleared(7);
    const afterLevelSeven = loadProgress();
    expect(readyLevelNumber(afterLevelSeven)).toBe(8);
    expect(levelEight && isUnlocked(levelEight, afterLevelSeven)).toBe(true);
    expect(levelNine && isUnlocked(levelNine, afterLevelSeven)).toBe(false);
    markCleared(8);
    const afterLevelEight = loadProgress();
    expect(readyLevelNumber(afterLevelEight)).toBe(9);
    expect(levelNine && isUnlocked(levelNine, afterLevelEight)).toBe(true);
  });

  it('keeps the last built level selected when every built level is cleared', () => {
    markCleared(1);
    markCleared(2);
    markCleared(3);
    markCleared(4);
    markCleared(5);
    markCleared(6);
    markCleared(7);
    for (let level = 8; level <= 15; level += 1) {
      markCleared(level);
    }

    const progress = loadProgress();
    expect(progress.cleared).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);
    expect(readyLevelNumber(progress)).toBe(15);
    expect(describeProgress(progress).clearedCount).toBe(15);
    const levelFifteen = levelByNumber(15);
    expect(levelFifteen && isUnlocked(levelFifteen, progress)).toBe(true);
  });

  it('keeps level 15 locked until level 14 is cleared', () => {
    for (let level = 1; level <= 13; level += 1) {
      markCleared(level);
    }
    const before = loadProgress();
    const levelFifteen = levelByNumber(15);
    expect(readyLevelNumber(before)).toBe(14);
    expect(levelFifteen && isUnlocked(levelFifteen, before)).toBe(false);
    expect(lockedReason(levelFifteen)).toBe('Clear level 14 to open level 15.');

    markCleared(14);
    const after = loadProgress();
    expect(readyLevelNumber(after)).toBe(15);
    expect(levelFifteen && isUnlocked(levelFifteen, after)).toBe(true);
  });
});
