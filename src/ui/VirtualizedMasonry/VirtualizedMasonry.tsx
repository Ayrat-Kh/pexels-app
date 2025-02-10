import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  VirtualizedMasonryContainer,
  VirtualizedMasonryItem,
  VirtualizedMasonryScrollView,
} from './VirtualizedMasonry.styles';
import { computeMasonryLayout } from './utils';
import { VisibleItem } from './types';
import { Dimension, MasonryBreakpoint } from '@/types';

type ItemBase = Dimension & { id: string | number };

type VirtualizedMasonryProps<T extends ItemBase> = {
  items: T[];
  breakpoints: MasonryBreakpoint[];
  render: (item: T) => React.ReactNode;
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
}: VirtualizedMasonryProps<T>) {
  if (!breakpoints.length) {
    throw new Error('At least 1 breakpoint should be provided');
  }

  const [visibleItems, setVisibleItems] = useState<VisibleItem[]>([]);
  const scrollViewRef = useRef<HTMLDivElement>(null);

  const totalHeight = useMemo(
    () => items.reduce((acc, item) => acc + item.height, 0),
    [items]
  );

  useEffect(() => {
    if (!scrollViewRef.current) {
      return;
    }
    const scrollView = scrollViewRef.current;
    let scrollViewObserver: ResizeObserver | undefined = undefined;

    // Function to calculate visible items
    const calculateVisibleItems = () => {
      setVisibleItems(
        computeMasonryLayout({
          containerTop: scrollView.scrollTop,
          containerHeight: scrollView.clientHeight,
          containerWidth: scrollView.clientWidth,
          breakpoints,
          items,
        })
      );
    };

    calculateVisibleItems();

    const eventAbortController = new AbortController();
    scrollView.addEventListener('scroll', calculateVisibleItems, {
      signal: eventAbortController.signal,
    });

    if (scrollView && typeof ResizeObserver !== 'undefined') {
      scrollViewObserver = new ResizeObserver(calculateVisibleItems);
      scrollViewObserver.observe(scrollView);
      scrollViewObserver.disconnect();
    } else {
      window.addEventListener('resize', calculateVisibleItems, {
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
          const item = items[itemIndex];

          return (
            <VirtualizedMasonryItem key={item.id} style={style}>
              {render(item)}
            </VirtualizedMasonryItem>
          );
        })}
      </VirtualizedMasonryContainer>
    </VirtualizedMasonryScrollView>
  );
}
