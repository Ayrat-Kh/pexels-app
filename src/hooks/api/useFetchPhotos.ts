import { getPhotos, searchPhotos } from '@/services/api/pexelApi';
import { PhotosResult } from '@/types';
import { useInfiniteQuery } from '@tanstack/react-query';

export const useFetchPhotos = (search?: string | null) => {
  return useInfiniteQuery({
    initialPageParam: 1,
    queryKey: ['photos', search],
    async queryFn({ signal, pageParam = 1 }): Promise<PhotosResult> {
      if (search) {
        return await searchPhotos(search, pageParam, { signal });
      } else {
        return await getPhotos(pageParam, { signal });
      }
    },
    getNextPageParam(lastPage: PhotosResult): number | null {
      console.log('lastPage', lastPage);
      return lastPage.next_page ? lastPage.page + 1 : null;
    },
    select(pages) {
      return pages.pages.flatMap((photosPage) => photosPage.photos);
    },
  });
};
