import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { useCallback } from 'react';

type LoadMoreProps = {
  loadMore: VoidFunction;
  rootMargin?: string;
};

export const LoadMore = ({ loadMore, rootMargin = '0px' }: LoadMoreProps) => {
  const { observe, unobserve } = useIntersectionObserver(rootMargin);

  const sentinelRef = useCallback(
    (node: HTMLSpanElement | null) => {
      unobserve();

      if (node) {
        observe(node, ({ isIntersecting }) => {
          if (isIntersecting) {
            loadMore();
          }
        });
      }
    },
    [loadMore, observe, unobserve]
  );

  return <div ref={sentinelRef} />;
};
