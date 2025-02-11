import React, { useEffect, useRef, useState } from 'react';
import {
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
      console.log('calc');
      const { visibleItems } = computeMasonryLayout({
        containerTop: scrollView.scrollTop,
        containerHeight: scrollView.clientHeight,
        containerWidth: scrollView.clientWidth,
        breakpoints,
        items,
      });

      setVisibleItems(visibleItems);
    };

    calculateVisibleItems();

    const eventAbortController = new AbortController();
    scrollView.addEventListener('scroll', calculateVisibleItems, {
      signal: eventAbortController.signal,
    });

    // try to use ResizeObserver or fallback to window resize event
    if (scrollView && typeof ResizeObserver !== 'undefined') {
      scrollViewObserver = new ResizeObserver(calculateVisibleItems);
      scrollViewObserver.observe(scrollView);
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
      {visibleItems.map(({ itemIndex, style }) => {
        const item = items[itemIndex];

        return (
          <VirtualizedMasonryItem key={item.id} style={style}>
            {render(item)}
          </VirtualizedMasonryItem>
        );
      })}
      {BottomComponent}
    </VirtualizedMasonryScrollView>
  );
}
