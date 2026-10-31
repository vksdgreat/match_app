export const NUB_OFFSET = 12;
export const LABEL_GAP = 6;

export interface BoardMetrics {
  headerY: number;
  leftX: number;
  rightX: number;
  circleRadius: number;
  cardSize: number;
  labelSize: number;
  ys: number[];
}

export function measureBoard(width: number, height: number, count: number): BoardMetrics | undefined {
  if (width < 160 || height < 160 || count < 1) {
    return undefined;
  }

  const playWidth = Math.min(width, 460);
  const offsetX = (width - playWidth) / 2;
  const headerHeight = Math.round(Math.min(42, Math.max(28, height * 0.06)));
  const labelSize = Math.round(Math.min(18, Math.max(12, playWidth * 0.04)));
  const margin = 12;
  const minGap = Math.max(32, Math.min(72, playWidth * 0.12));
  const bottomPad = 14;
  const slot = (height - headerHeight - bottomPad) / count;
  const labelBlock = labelSize + 8;
  const fitRadius = (slot - LABEL_GAP - labelBlock - 4) / 2.2;
  const radiusByWidth = (playWidth - margin * 2 - NUB_OFFSET * 2 - minGap) / 4.3;
  const circleRadius = Math.min(40, Math.max(14, Math.min(fitRadius, radiusByWidth)));
  const cardSize = Math.min(100, circleRadius * 2.2);
  const leftX = offsetX + margin + circleRadius;
  const rightX = offsetX + playWidth - margin - cardSize / 2;
  const shapeHalf = cardSize / 2;
  const blockHeight = shapeHalf * 2 + LABEL_GAP + labelBlock;
  const ys: number[] = [];

  for (let index = 0; index < count; index += 1) {
    const slotTop = headerHeight + slot * index;
    const slack = Math.max(0, slot - blockHeight);
    ys.push(slotTop + slack / 2 + shapeHalf);
  }

  return { headerY: headerHeight / 2, leftX, rightX, circleRadius, cardSize, labelSize, ys };
}
