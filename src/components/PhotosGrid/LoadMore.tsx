import { useCallback, useEffect, useRef } from 'react';
import { useFetchMorePhotos } from './hooks';
import { loadMoreMarginTolerance } from './constants';

type LoadMoreProps = {
  scrollView: HTMLElement | null;
};

export const LoadMore = ({ scrollView }: LoadMoreProps) => {
  const fetchMore = useFetchMorePhotos();

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
            console.log(entry);
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

  return <div ref={sentinelRef} />;
};
