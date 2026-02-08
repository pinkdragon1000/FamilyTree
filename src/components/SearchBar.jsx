import { useState, useRef, useEffect } from 'react';
import Icon from './Icons.jsx';

/**
 * SearchBar component for searching family members by name
 */
function SearchBar({ data, onSelectPerson }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef(null);
  const resultsRef = useRef(null);

  // Filter persons when query changes
  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    const searchTerm = query.toLowerCase().trim();
    const matches = [];

    for (const [id, person] of Object.entries(data.persons)) {
      if (!person.name) continue;

      const cleanName = person.name.replace(/[*⟷½]/g, '').trim().toLowerCase();
      const nickname = person.nickname?.toLowerCase() || '';

      if (cleanName.includes(searchTerm) || nickname.includes(searchTerm)) {
        matches.push({
          id,
          name: person.name.replace(/[*⟷½]/g, '').trim(),
          nickname: person.nickname,
          birthyear: person.birthyear,
          imageLink: person.imageLink
        });
      }
    }

    // Sort by name
    matches.sort((a, b) => a.name.localeCompare(b.name));

    setResults(matches.slice(0, 10)); // Limit to 10 results
    setIsOpen(matches.length > 0);
    setSelectedIndex(-1);
  }, [query, data.persons]);

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (!isOpen) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => Math.min(prev + 1, results.length - 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => Math.max(prev - 1, 0));
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && results[selectedIndex]) {
          handleSelect(results[selectedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setQuery('');
        inputRef.current?.blur();
        break;
    }
  };

  // Handle selecting a person
  const handleSelect = (person) => {
    setQuery('');
    setIsOpen(false);
    setResults([]);
    onSelectPerson(person.id);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        inputRef.current && !inputRef.current.contains(e.target) &&
        resultsRef.current && !resultsRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="search-bar">
      <div className="search-input-wrapper">
        <Icon name="search" className="search-icon" />
        <input
          ref={inputRef}
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => results.length > 0 && setIsOpen(true)}
        />
      </div>

      {isOpen && results.length > 0 && (
        <div className="search-results" ref={resultsRef}>
          {results.map((person, index) => (
            <div
              key={person.id}
              className={`search-result-item ${index === selectedIndex ? 'selected' : ''}`}
              onClick={() => handleSelect(person)}
              onMouseEnter={() => setSelectedIndex(index)}
            >
              {person.imageLink ? (
                <img src={person.imageLink} alt={person.name} className="search-result-photo" />
              ) : (
                <div className="search-result-photo search-result-photo-placeholder">
                  {person.name.charAt(0)}
                </div>
              )}
              <div className="search-result-info">
                <div className="search-result-name">{person.name}</div>
                {person.nickname && (
                  <div className="search-result-nickname">"{person.nickname}"</div>
                )}
                {person.birthyear && (
                  <div className="search-result-year">b. {person.birthyear}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
