import { debounce } from '@/utils';
import { useRef } from 'react';
import { useSearchParams } from 'react-router';

type UseSearchQueryParam = {
  q: string;
  setQuery: (q: string) => void;
  setDebouncedQuery: (q: string) => void;
};

export const useSearchQueryParam = (): UseSearchQueryParam => {
  const [params, setQuery] = useSearchParams();
  const setQueryRef = useRef(
    debounce<(nextQuery: string) => void>((nextQuery: string): void => {
      setQuery(nextQuery ? { q: nextQuery } : {});
    }, 400)
  );

  return {
    q: params.get('q') ?? '',
    setQuery,
    setDebouncedQuery: setQueryRef.current,
  };
};
