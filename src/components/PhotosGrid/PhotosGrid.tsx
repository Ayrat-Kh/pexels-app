import { useEffect, useRef } from 'react';
import { PHOTOS_GRID_BREAKPOINTS } from '@/global/constants';
import { VirtualizedMasonry, MasonryRef } from '../VirtualizedMasonry';
import { LoadMore } from './LoadMore';
import { PhotosGridItem } from './PhotosGridItem';
import { useOptimisticScrollValue } from './hooks';
import { useSearchFetchPhotos } from '@/hooks';

export const PhotosGrid = () => {
  const masonryRef = useRef<MasonryRef>(null);

  const { data, isLoading } = useSearchFetchPhotos();

  const { optimisticHeight, scrollTop, reset } = useOptimisticScrollValue();

  // when the user goes back from the details page
  // and if there is memoed scroll position
  // restore it and clean the memo
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
      breakpoints={PHOTOS_GRID_BREAKPOINTS}
      items={data}
      renderItem={PhotosGridItem}
      BottomComponent={LoadMore}
    />
  );
};
