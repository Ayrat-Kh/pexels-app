import React, {
  forwardRef,
  ReactElement,
  Ref,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import {
  VirtualizedMasonryContainer,
  VirtualizedMasonryItem,
  VirtualizedMasonryScrollView,
} from './VirtualizedMasonry.styles';
import { computeMasonryLayout } from './utils';
import { MasonryContainerData, VisibleItem } from './types';
import { Dimension, MasonryBreakpoint } from '@/types';
import { throttle } from '@/utils';

type ItemBase = Dimension & { id: string | number };

type VirtualizedMasonryProps<T extends ItemBase> = {
  optimisticHeight?: number;
  items: T[];
  breakpoints: MasonryBreakpoint[];
  render: (data: {
    data: T;
    container: MasonryContainerData;
  }) => React.ReactNode;
  BottomComponent?: React.ReactElement;
};

export type MasonryRef = {
  /**
   * Allows to scroll in masonry grid
   * @param position
   */
  scrollTo(position: number): void;
};

/**
 * Renders virtualized masonry.
 * All grid calculated and positioned in absolute coordinate system
 * @param
 *  breakpoints - list of responsive breakpoints
 *  items - all items that shall be rendered
 *  render - function for rendering a child item
 */
const UnforwardedVirtualizedMasonry = function VirtualizedMasonry<
  T extends ItemBase
>(
  {
    breakpoints,
    items,
    optimisticHeight,
    render,
    BottomComponent,
  }: VirtualizedMasonryProps<T>,
  ref: Ref<MasonryRef>
) {
  if (!breakpoints.length) {
    throw new Error('At least 1 breakpoint should be provided');
  }

  const [totalHeight, setTotalHeight] = useState(optimisticHeight ?? 0);
  const [visibleItems, setVisibleItems] = useState<VisibleItem[]>([]);
  const scrollViewRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!scrollViewRef.current) {
      return;
    }
    const scrollView = scrollViewRef.current;
    let scrollViewObserver: ResizeObserver | undefined = undefined;

    // Function to calculate visible items
    const computeVisibleItems = () => {
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

    computeVisibleItems();

    const throttled = throttle(computeVisibleItems, 50);

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

  useImperativeHandle(
    ref,
    () => {
      return {
        scrollTo(positionTop: number) {
          scrollViewRef.current?.scrollTo({
            top: positionTop,
            behavior: 'instant',
          });
        },
      };
    },
    []
  );

  return (
    <VirtualizedMasonryScrollView ref={scrollViewRef}>
      <VirtualizedMasonryContainer
        style={{
          height: `${totalHeight}px`,
        }}
      >
        {visibleItems.map(({ itemIndex, style }) => {
          const data = items[itemIndex];
          const scrollView = scrollViewRef.current!;

          return (
            <VirtualizedMasonryItem key={data.id} style={style}>
              {render({
                data,
                container: {
                  top: scrollView.scrollTop,
                  height: scrollView.scrollHeight,
                },
              })}
            </VirtualizedMasonryItem>
          );
        })}
      </VirtualizedMasonryContainer>
      {BottomComponent}
    </VirtualizedMasonryScrollView>
  );
};

// Masonry is Generic Component and we also need to pass ref argument
// and it's not possible to declare generic argument together with forwardRef function
// This is one way to resolve the issue
export const VirtualizedMasonry = forwardRef(UnforwardedVirtualizedMasonry) as <
  T extends ItemBase
>(
  p: VirtualizedMasonryProps<T> & { ref?: Ref<MasonryRef> }
) => ReactElement;
