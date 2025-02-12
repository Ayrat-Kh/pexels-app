import { useCallback, useEffect, useRef } from 'react';
import { breakpoints } from '@/global/constants';
import { useFetchPhotos } from '@/hooks/api/useFetchPhotos';
import { VirtualizedMasonry, MasonryRef } from '../VirtualizedMasonry';
import { LoadMore } from '../LoadMore';
import { PhotosGridItem } from './PhotosGridItem';
import { useOptimisticScrollValue } from './hooks.';

export const PhotosGrid = () => {
  const masonryRef = useRef<MasonryRef>(null);
  const { data, isLoading, fetchNextPage, hasNextPage } = useFetchPhotos();

  const { optimisticHeight, scrollTop, reset } = useOptimisticScrollValue();

  const handleFetch = useCallback(async () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage]);

  useEffect(() => {
    if (!scrollTop || isLoading) {
      return;
    }

    masonryRef.current?.scrollTo(scrollTop);
    reset();
  }, [scrollTop, isLoading, reset]);

  if (isLoading || !data) {
    return;
  }

  return (
    <VirtualizedMasonry
      optimisticHeight={optimisticHeight}
      ref={masonryRef}
      breakpoints={breakpoints}
      items={data}
      render={PhotosGridItem}
      BottomComponent={<LoadMore loadMore={handleFetch} rootMargin="500px" />}
    />
  );
};
