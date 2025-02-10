import { useCallback } from 'react';
import { VirtualizedMasonry } from '../VirtualizedMasonry';
import { breakpoints } from '@/global/constants';
import { LoadMore } from '../LoadMore';
import { useGlobalContext } from '@/context/GlobalContext';

export const PhotosGrid = () => {
  const { photoBatches, getNextPage } = useGlobalContext();

  const handleFetch = useCallback(async () => {
    getNextPage(photoBatches.length);
  }, [getNextPage, photoBatches.length]);

  return (
    <>
      <VirtualizedMasonry
        breakpoints={breakpoints}
        items={photoBatches}
        render={(item) => {
          return <img src={item.src.original} style={{ width: '100%' }} />;
        }}
      />
      <LoadMore loadMore={handleFetch} />
    </>
  );
};
