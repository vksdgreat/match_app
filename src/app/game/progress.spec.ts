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
    expect(lockedReason(levelByNumber(4))).toBe('Level 4 is coming soon.');
    expect(describeProgress(progress)).toEqual({ readyLevel: 1, clearedCount: 0, builtCount: 3 });
  });

  it('unlocks level 2 after level 1 is cleared and keeps future levels locked', () => {
    markCleared(1);
    const progress = loadProgress();
    const levelTwo = levelByNumber(2);
    const levelThree = levelByNumber(3);

    expect(progress.cleared).toEqual([1]);
    expect(readyLevelNumber(progress)).toBe(2);
    expect(levelTwo && isUnlocked(levelTwo, progress)).toBe(true);
    expect(levelThree && isUnlocked(levelThree, progress)).toBe(false);
    expect(PATH_LEVELS.filter((level) => level.built).map((level) => level.number)).toEqual([1, 2, 3]);
  });

  it('unlocks level 3 after level 2 is cleared and keeps later levels locked', () => {
    markCleared(1);
    markCleared(2);
    const progress = loadProgress();
    const levelThree = levelByNumber(3);
    const levelFour = levelByNumber(4);

    expect(readyLevelNumber(progress)).toBe(3);
    expect(levelThree && isUnlocked(levelThree, progress)).toBe(true);
    expect(levelFour && isUnlocked(levelFour, progress)).toBe(false);
    expect(lockedReason(levelFour)).toBe('Level 4 is coming soon.');
  });

  it('keeps the last built level selected when every built level is cleared', () => {
    markCleared(1);
    markCleared(2);
    markCleared(3);
    markCleared(3);

    const progress = loadProgress();
    expect(progress.cleared).toEqual([1, 2, 3]);
    expect(readyLevelNumber(progress)).toBe(3);
    expect(describeProgress(progress).clearedCount).toBe(3);
  });
});
