import { useRef } from 'react';
import {
  PhotoSearchBar,
  PhotoSearchContainer,
  PhotoSearchInput,
} from './PhotoSearch.styles';
import { useSearchParams } from 'react-router';

export const PhotoSearch = () => {
  const searchRef = useRef<HTMLInputElement>(null);

  const [, setQuery] = useSearchParams();

  const handleSearch = (reset?: boolean) => {
    if (reset) {
      setQuery({});
      if (searchRef.current) searchRef.current.value = '';
    } else {
      setQuery({
        q: searchRef.current?.value || '',
      });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <PhotoSearchContainer>
      <PhotoSearchBar>
        <PhotoSearchInput
          ref={searchRef}
          type="text"
          placeholder="Search for photos..."
          onKeyUp={handleKeyPress}
        />
        <div className="search-actions">
          <button className="search-button" onClick={() => handleSearch()}>
            Search
          </button>
          <button className="reset-button" onClick={() => handleSearch(true)}>
            Reset
          </button>
        </div>
      </PhotoSearchBar>
    </PhotoSearchContainer>
  );
};
