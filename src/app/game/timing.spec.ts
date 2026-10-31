import { formatElapsedTime, LEVEL_STAR_THRESHOLDS_SECONDS, starsForElapsedTime } from './timing';

describe('level timer', () => {
  it('formats elapsed time as mm:ss', () => {
    expect(formatElapsedTime(0)).toBe('00:00');
    expect(formatElapsedTime(9_000)).toBe('00:09');
    expect(formatElapsedTime(61_000)).toBe('01:01');
  });

  it('awards stars based on the configured time thresholds', () => {
    expect(LEVEL_STAR_THRESHOLDS_SECONDS).toEqual({ threeStars: 20, twoStars: 30 });
    expect(starsForElapsedTime(20_000)).toBe(3);
    expect(starsForElapsedTime(20_001)).toBe(2);
    expect(starsForElapsedTime(30_000)).toBe(2);
    expect(starsForElapsedTime(30_001)).toBe(1);
  });
});
