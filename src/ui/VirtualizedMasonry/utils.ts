import { Dimension, MasonryBreakpoint } from '@/types';
import { getAspectRatio } from '@/utils';
import { VisibleItem } from './types';

type ComputeMasonryLayoutParams<T extends Dimension> = {
  containerTop: number;
  containerHeight: number;
  containerWidth: number;
  items: T[];
  breakpoints: MasonryBreakpoint[];
};

type ComputeMasonryLayoutResult = {
  visibleItems: VisibleItem[];
  totalHeight: number;
};

/**
 * Computes items that should be rendered and their positions for a masonry
 * @param
 * @returns
 */
export const computeMasonryLayout = <T extends Dimension>({
  containerTop,
  containerHeight,
  containerWidth,
  breakpoints,
  items,
}: ComputeMasonryLayoutParams<T>): ComputeMasonryLayoutResult => {
  const result: VisibleItem[] = [];

  // sort breakpoints by their break and get the most applicable
  // if not found take the latest with no breakpoint
  const { columnCount, gap } =
    breakpoints
      .sort((a, b) => {
        if (!a.break) return 0;
        if (!b.break) return -1;
        return a.break - b.break;
      })
      .find((x) => !x.break || x.break > containerWidth) ??
    breakpoints.slice(-1)[0];
  const totalHeightByColumn = new Array(columnCount).fill(0);
  const containerBottom = containerTop + containerHeight;

  // cal elementWidth by dividing available width to columns count and minus gap size
  const elementWidth = Math.floor(
    (containerWidth - (columnCount - 1) * gap) / columnCount
  );

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    // Which column the item belongs to
    const columnIndex = i % columnCount;
    const aspect = getAspectRatio(item);

    const elementTop = totalHeightByColumn[columnIndex];
    const elementHeight = elementWidth / aspect;
    const elementBottom = elementTop + elementHeight;

    // Check if item is within the visible area
    if (elementBottom >= containerTop && elementTop <= containerBottom) {
      result.push({
        itemIndex: i,
        style: {
          top: totalHeightByColumn[columnIndex],
          left: (elementWidth + gap) * columnIndex,
          width: elementWidth,
          height: elementHeight,
        },
      });
    }

    totalHeightByColumn[columnIndex] += elementHeight + gap;
  }

  return {
    visibleItems: result,
    totalHeight: Math.max.apply(null, totalHeightByColumn),
  };
};
