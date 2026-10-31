import { BUILT_LEVEL_COUNT, PATH_LEVELS, levelByNumber, type LevelDef } from './pairs';

const STORAGE_KEY = 'match-app-cleared';

export interface Progress {
  cleared: number[];
}

export interface ProgressSummary {
  readyLevel: number;
  clearedCount: number;
  builtCount: number;
}

export function emptyProgress(): Progress {
  return { cleared: [] };
}

export function loadProgress(): Progress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return emptyProgress();
    }
    const parsed = JSON.parse(raw) as { cleared?: unknown };
    if (!Array.isArray(parsed.cleared)) {
      return emptyProgress();
    }
    const cleared = parsed.cleared.filter((value): value is number => Number.isInteger(value) && value > 0);
    return { cleared: [...new Set(cleared)].sort((a, b) => a - b) };
  } catch {
    return emptyProgress();
  }
}

export function markCleared(levelNumber: number): Progress {
  const progress = loadProgress();
  if (!progress.cleared.includes(levelNumber)) {
    progress.cleared.push(levelNumber);
    progress.cleared.sort((a, b) => a - b);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // Storage can be unavailable in private browsing.
    }
  }
  return progress;
}

export function isUnlocked(level: LevelDef, progress: Progress): boolean {
  if (!level.built) {
    return false;
  }
  if (level.number === 1) {
    return true;
  }
  return progress.cleared.includes(level.number - 1);
}

export function readyLevelNumber(progress: Progress): number {
  const built = PATH_LEVELS.filter((level) => level.built);
  const next = built.find((level) => isUnlocked(level, progress) && !progress.cleared.includes(level.number));
  return next?.number ?? built[built.length - 1]?.number ?? 1;
}

export function describeProgress(progress: Progress): ProgressSummary {
  const clearedCount = PATH_LEVELS.filter((level) => level.built && progress.cleared.includes(level.number)).length;
  return {
    readyLevel: readyLevelNumber(progress),
    clearedCount,
    builtCount: BUILT_LEVEL_COUNT,
  };
}

export function lockedReason(level: LevelDef | undefined): string {
  if (!level?.built) {
    const number = level?.number;
    return number ? `Level ${number} is coming soon.` : 'That level is coming soon.';
  }
  return `Clear level ${level.number - 1} to open level ${level.number}.`;
}

export function isCleared(levelNumber: number, progress: Progress): boolean {
  return progress.cleared.includes(levelNumber);
}

export function levelOrUndefined(levelNumber: number): LevelDef | undefined {
  return levelByNumber(levelNumber);
}
