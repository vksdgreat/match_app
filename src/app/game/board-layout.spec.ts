import { LABEL_GAP, measureBoard, NUB_OFFSET } from './board-layout';

describe('measureBoard', () => {
  it('keeps circles, pictures, and labels inside a phone-sized board', () => {
    const metrics = measureBoard(390, 640, 5);

    expect(metrics).toBeDefined();
    if (!metrics) {
      return;
    }

    const leftNub = metrics.leftX + metrics.circleRadius + NUB_OFFSET;
    const rightNub = metrics.rightX - metrics.cardSize / 2 - NUB_OFFSET;
    const lastY = metrics.ys[metrics.ys.length - 1] ?? 0;

    expect(rightNub - leftNub).toBeGreaterThan(24);
    expect(metrics.ys[0]).toBeGreaterThan(metrics.headerY + metrics.cardSize / 2);
    expect(lastY + metrics.cardSize / 2 + LABEL_GAP + metrics.labelSize + 8).toBeLessThanOrEqual(640);
    expect(metrics.ys).toEqual([...metrics.ys].sort((a, b) => a - b));
  });

  it('keeps the two columns together on a wide screen', () => {
    const metrics = measureBoard(1200, 700, 5);

    expect(metrics).toBeDefined();
    if (!metrics) {
      return;
    }

    const leftNub = metrics.leftX + metrics.circleRadius + NUB_OFFSET;
    const rightNub = metrics.rightX - metrics.cardSize / 2 - NUB_OFFSET;

    expect(metrics.leftX).toBeGreaterThan(250);
    expect(metrics.rightX).toBeLessThan(950);
    expect(rightNub - leftNub).toBeGreaterThan(24);
    expect(rightNub - leftNub).toBeLessThan(260);
  });

  it('still leaves a gap for the line on a narrow screen', () => {
    const metrics = measureBoard(320, 520, 5);

    expect(metrics).toBeDefined();
    if (!metrics) {
      return;
    }

    const leftNub = metrics.leftX + metrics.circleRadius + NUB_OFFSET;
    const rightNub = metrics.rightX - metrics.cardSize / 2 - NUB_OFFSET;

    expect(rightNub).toBeGreaterThan(leftNub + 20);
  });
});
