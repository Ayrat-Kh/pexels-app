import { useRef } from 'react';
import './SearchBar.scss';

function SearchBar() {
  const searchRef = useRef<HTMLInputElement>(null);

  const handleSearch = (reset?: boolean) => {
    if (reset) {
      // setQuery('');
      if (searchRef.current) searchRef.current.value = '';
    } else {
      // setQuery(searchRef.current?.value || '');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <div className="search-container">
      <div className="search-bar">
        <input
          ref={searchRef}
          type="text"
          placeholder="Search for photos..."
          className="search-input"
          onKeyUp={handleKeyPress}
        />
        <div className="search-actions">
          <button
            className="reset-button"
            onClick={() => handleSearch(true)}
            aria-label="Reset search"
          >
            ✕
          </button>
          <button
            className="search-button"
            onClick={() => handleSearch()}
            aria-label="Search"
          >
            🔍
          </button>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
