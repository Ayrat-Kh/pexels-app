import { useRef } from 'react';
import {
  PhotoSearchBar,
  PhotoSearchInput,
  PhotoSearchReset,
} from './PhotoSearch.styles';

import { useSearchQueryParam } from '@/hooks/useSearchQueryParam';

export const PhotoSearch = () => {
  const searchRef = useRef<HTMLInputElement>(null);

  const { q, setQuery } = useSearchQueryParam();

  const handleSearch = () => {
    setQuery(searchRef.current?.value || '');
  };

  const handleReset = () => {
    setQuery('');
    if (searchRef.current) searchRef.current.value = '';
  };

  return (
    <PhotoSearchBar>
      <PhotoSearchInput
        ref={searchRef}
        type="text"
        defaultValue={q}
        placeholder="Search for photos..."
        onChange={handleSearch}
      />

      <PhotoSearchReset disabled={!q} onClick={handleReset}>
        Reset
      </PhotoSearchReset>
    </PhotoSearchBar>
  );
};
