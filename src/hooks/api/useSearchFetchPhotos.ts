import { useSearchQueryParam } from '../useSearchQueryParam';
import { useFetchPhotos } from './useFetchPhotos';

export const useSearchFetchPhotos = () => {
  const { q } = useSearchQueryParam();
  return useFetchPhotos(q);
};
