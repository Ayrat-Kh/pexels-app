import { useEffect, useRef } from 'react';
import { breakpoints } from '@/global/constants';
import { VirtualizedMasonry, MasonryRef } from '../VirtualizedMasonry';
import { LoadMore } from './LoadMore';
import { PhotosGridItem } from './PhotosGridItem';
import { useOptimisticScrollValue } from './hooks';
import { useSearchFetchPhotos } from '@/hooks';

export const PhotosGrid = () => {
  const masonryRef = useRef<MasonryRef>(null);

  const { data, isLoading } = useSearchFetchPhotos();

  const { optimisticHeight, scrollTop, reset } = useOptimisticScrollValue();

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
      BottomComponent={LoadMore}
    />
  );
};
