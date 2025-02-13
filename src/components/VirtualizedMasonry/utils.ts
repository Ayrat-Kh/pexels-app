import { Dimension, MasonryBreakpoint } from '@/types';
import { getAspectRatio } from '@/utils';
import { VisibleItem } from './types';

type ComputeMasonryLayoutParams<T extends Dimension> = {
  containerTop: number;
  containerHeight: number;
  containerWidth: number;
  items: T[];
  breakpoints: MasonryBreakpoint[];
  tolerance: number;
};

type ComputeMasonryLayoutResult = {
  visibleItems: VisibleItem[];
  totalHeight: number;
  columnCount: number;
};

/**
 * Computes items that should be rendered and their positions for a masonry
 * @param
 *  - containerTop - current container scroll position
 *  - containerHeight - container height
 *  - containerWidth - container width
 *  - breakpoints - array of breakpoints, will be sorted by width. Empty width means last and a fallback value
 *  - items - list of items
 * @returns
 *  - totalHeight - total container scroll height
 *  - information about items that should be rendered
 */
export const computeMasonryLayout = <T extends Dimension>({
  containerTop,
  containerHeight,
  containerWidth,
  breakpoints,
  items,
  tolerance,
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

  // keep the lowest column index to evenly fill columns
  let minHeightColumnIndex = 0;

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    // Which column the item belongs to
    // const columnIndex =  totalHeightByColumn.findIndex(c => c) i % columnCount;
    const aspect = getAspectRatio(item);

    const elementTop = totalHeightByColumn[minHeightColumnIndex];
    const elementHeight = elementWidth / aspect;
    const elementBottom = elementTop + elementHeight;

    // Check if item is within the visible area
    if (
      elementBottom >= containerTop - tolerance &&
      elementTop <= containerBottom + tolerance
    ) {
      result.push({
        itemIndex: i,
        style: {
          top: totalHeightByColumn[minHeightColumnIndex],
          left: (elementWidth + gap) * minHeightColumnIndex,
          width: elementWidth,
          height: elementHeight,
        },
      });
    }

    totalHeightByColumn[minHeightColumnIndex] += elementHeight + gap;

    let smallestHeight = Number.POSITIVE_INFINITY;
    totalHeightByColumn.forEach((columnHeight, index) => {
      if (columnHeight < smallestHeight) {
        minHeightColumnIndex = index;
        smallestHeight = columnHeight;
      }
    });
  }

  return {
    visibleItems: result,
    // - last gap
    totalHeight: Math.max.apply(null, totalHeightByColumn) - gap,
    columnCount,
  };
};
