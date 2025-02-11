import React, { useEffect, useRef, useState } from 'react';
import {
  VirtualizedMasonryContainer,
  VirtualizedMasonryItem,
  VirtualizedMasonryScrollView,
} from './VirtualizedMasonry.styles';
import { computeMasonryLayout } from './utils';
import { VisibleItem } from './types';
import { Dimension, MasonryBreakpoint } from '@/types';
import { throttle } from '@/utils';

type ItemBase = Dimension & { id: string | number };

type VirtualizedMasonryProps<T extends ItemBase> = {
  items: T[];
  breakpoints: MasonryBreakpoint[];
  render: (data: { data: T }) => React.ReactNode;
  BottomComponent?: React.ReactElement;
};

/**
 * Renders virtualized masonry.
 * All grid calculated and positioned in absolute coordinate system
 * @param
 *  breakpoints - list of responsive breakpoints
 *  items - all items that shall be rendered
 *  render - function for rendering a child item
 */
export function VirtualizedMasonry<T extends ItemBase>({
  breakpoints,
  items,
  render,
  BottomComponent,
}: VirtualizedMasonryProps<T>) {
  if (!breakpoints.length) {
    throw new Error('At least 1 breakpoint should be provided');
  }

  const [totalHeight, setTotalHeight] = useState(0);
  const [visibleItems, setVisibleItems] = useState<VisibleItem[]>([]);
  const scrollViewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scrollViewRef.current) {
      return;
    }
    const scrollView = scrollViewRef.current;
    let scrollViewObserver: ResizeObserver | undefined = undefined;

    // Function to calculate visible items
    const calculateVisibleItems = () => {
      const { visibleItems, totalHeight } = computeMasonryLayout({
        containerTop: scrollView.scrollTop,
        containerHeight: scrollView.clientHeight,
        containerWidth: scrollView.clientWidth,
        breakpoints,
        items,
      });

      setVisibleItems(visibleItems);
      setTotalHeight(totalHeight);
    };

    const throttled = throttle(calculateVisibleItems, 50);

    const eventAbortController = new AbortController();
    scrollView.addEventListener('scroll', throttled, {
      signal: eventAbortController.signal,
    });

    // try to use ResizeObserver or fallback to window resize event
    if (scrollView && typeof ResizeObserver !== 'undefined') {
      scrollViewObserver = new ResizeObserver(throttled);
      scrollViewObserver.observe(scrollView);
    } else {
      window.addEventListener('resize', throttled, {
        signal: eventAbortController.signal,
      });
    }

    return () => {
      eventAbortController.abort();
      scrollViewObserver?.disconnect();
    };
  }, [breakpoints, items]);

  return (
    <VirtualizedMasonryScrollView ref={scrollViewRef}>
      <VirtualizedMasonryContainer
        style={{
          height: `${totalHeight}px`,
        }}
      >
        {visibleItems.map(({ itemIndex, style }) => {
          const data = items[itemIndex];

          return (
            <VirtualizedMasonryItem key={data.id} style={style}>
              {render({ data })}
            </VirtualizedMasonryItem>
          );
        })}
      </VirtualizedMasonryContainer>
      {BottomComponent}
    </VirtualizedMasonryScrollView>
  );
}
