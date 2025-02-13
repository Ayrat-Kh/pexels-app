import { useCallback, useEffect, useRef } from 'react';
import { useFetchMorePhotos } from './hooks';
import { loadMoreMarginTolerance } from './constants';
import { MasonryBottomComponentProps } from '../VirtualizedMasonry';
import { LoadingMore } from './LoadMore.styles';

/**
 * Component for detection end of list and firing next fetch event
 */
export const LoadMore = ({ scrollView }: MasonryBottomComponentProps) => {
  const { fetchMore, isFetching } = useFetchMorePhotos();

  const observerRef = useRef<IntersectionObserver | null>(null);
  const sentinelRef = useCallback(
    (element: HTMLDivElement | null) => {
      observerRef.current?.disconnect();

      if (!element) {
        return;
      }

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              fetchMore();
            }
          });
        },
        { rootMargin: loadMoreMarginTolerance, root: scrollView }
      );

      observer.observe(element);

      observerRef.current = observer;

      return () => {
        observerRef.current?.disconnect();
      };
    },
    [fetchMore, scrollView]
  );

  useEffect(() => {
    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  return <LoadingMore $isLoading={isFetching} ref={sentinelRef} />;
};
