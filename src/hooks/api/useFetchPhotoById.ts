import { getPhotoById } from '@/services/api/photoApi';
import { useQuery } from '@tanstack/react-query';

export const useFetchPhotoById = (id: string | undefined | null) => {
  return useQuery({
    queryKey: ['photos-details', id],
    enabled: !!id,
    queryFn: ({ signal }) => {
      // put ! the hook will only run if non null id is provided
      return getPhotoById(id!, { signal });
    },
  });
};
