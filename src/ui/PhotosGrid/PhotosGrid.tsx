import { useCallback } from 'react';
import { VirtualizedMasonry } from '../VirtualizedMasonry';
import { breakpoints } from '@/global/constants';
import { LoadMore } from '../LoadMore';
import { useFetchPhotos } from '@/hooks/api/useFetchPhotos';
import { PhotosGridItem } from './PhotosGridItem';

export const PhotosGrid = () => {
  const { data, isLoading, fetchNextPage, hasNextPage } = useFetchPhotos();

  const handleFetch = useCallback(async () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage]);

  if (isLoading || !data) {
    return;
  }

  return (
    <VirtualizedMasonry
      breakpoints={breakpoints}
      items={data}
      render={PhotosGridItem}
      BottomComponent={<LoadMore loadMore={handleFetch} rootMargin="10px" />}
    />
  );
};
