import { useRef } from 'react';
import {
  PhotoSearchBar,
  PhotoSearchContainer,
  PhotoSearchInput,
} from './PhotoSearch.styles';

import { useSearchQueryParam } from '@/hooks/useSearchQueryParam';

export const PhotoSearch = () => {
  const searchRef = useRef<HTMLInputElement>(null);

  const { setQuery } = useSearchQueryParam();

  const handleSearch = (reset?: boolean) => {
    if (reset) {
      setQuery('');
      if (searchRef.current) searchRef.current.value = '';
    } else {
      setQuery(searchRef.current?.value || '');
    }
  };

  return (
    <PhotoSearchContainer>
      <PhotoSearchBar>
        <PhotoSearchInput
          ref={searchRef}
          type="text"
          placeholder="Search for photos..."
          onChange={() => handleSearch()}
        />

        <button onClick={() => handleSearch(true)}>Reset</button>
      </PhotoSearchBar>
    </PhotoSearchContainer>
  );
};
