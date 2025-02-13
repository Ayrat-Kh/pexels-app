import { SCROLL_POSITION_KEY } from '@/global/constants';
import { useCallback, useState } from 'react';
import { MasonryContainerData } from '../VirtualizedMasonry';
import { useSearchFetchPhotos } from '@/hooks';

export const useOptimisticScrollValue = () => {
  const [{ optimisticHeight, scrollTop }, setOPtimisticValue] = useState<{
    optimisticHeight?: number;
    scrollTop?: number;
  }>(() => {
    try {
      const item = sessionStorage.getItem(SCROLL_POSITION_KEY);
      sessionStorage.removeItem(SCROLL_POSITION_KEY);
      if (!item) {
        return {};
      }

      const parsedItem = JSON.parse(item) as MasonryContainerData;

      return {
        optimisticHeight: parsedItem.height,
        scrollTop: parsedItem.top,
      };
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return {};
    }
  });

  const reset = useCallback(() => {
    setOPtimisticValue({});
  }, [setOPtimisticValue]);

  return {
    optimisticHeight,
    scrollTop,
    reset,
  };
};

export const useFetchMorePhotos = () => {
  const { hasNextPage, fetchNextPage, isFetching } = useSearchFetchPhotos();

  const fetchMore = useCallback(async () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage]);

  return {
    fetchMore,
    isFetching,
  };
};
