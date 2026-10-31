export const LEVEL_STAR_THRESHOLDS_SECONDS = {
  threeStars: 20,
  twoStars: 30,
} as const;

export function starsForElapsedTime(elapsedMilliseconds: number): number {
  const elapsedSeconds = Math.max(0, elapsedMilliseconds) / 1000;
  if (elapsedSeconds <= LEVEL_STAR_THRESHOLDS_SECONDS.threeStars) {
    return 3;
  }
  if (elapsedSeconds <= LEVEL_STAR_THRESHOLDS_SECONDS.twoStars) {
    return 2;
  }
  return 1;
}

export function formatElapsedTime(elapsedMilliseconds: number): string {
  const totalSeconds = Math.floor(Math.max(0, elapsedMilliseconds) / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}
