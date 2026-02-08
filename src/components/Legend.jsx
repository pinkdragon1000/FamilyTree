import { useState, useRef, useEffect } from 'react';
import Icon from './Icons.jsx';

/**
 * Legend/Symbols dropdown component for tree and card views
 * @param {boolean} showNodeColors - Whether to show the node colors section (tree view only)
 */
function Legend({ showNodeColors = false }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const title = 'Legend';

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  return (
    <div className="legend-dropdown" ref={dropdownRef}>
      <button
        className="legend-dropdown-button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <Icon name="info" />
        {title}
        <span className={`dropdown-arrow ${isOpen ? 'open' : ''}`}>▼</span>
      </button>

      {isOpen && (
        <div className="legend-dropdown-content">
          {showNodeColors && (
            <div className="legend-section">
              <div className="legend-subtitle">Node Colors:</div>
              <div className="legend-items">
                <div className="legend-item">
                  <svg width="20" height="20">
                    <circle cx="10" cy="10" r="8" className="legend-node extendable" />
                  </svg>
                  <span>Can expand (has hidden relatives)</span>
                </div>
                <div className="legend-item">
                  <svg width="20" height="20">
                    <circle cx="10" cy="10" r="8" className="legend-node collapsible" />
                  </svg>
                  <span>Can collapse (click to hide relatives)</span>
                </div>
                <div className="legend-item">
                  <svg width="20" height="20">
                    <circle cx="10" cy="10" r="8" className="legend-node non-extendable" />
                  </svg>
                  <span>No children/relatives</span>
                </div>
              </div>
            </div>
          )}
          <div className={showNodeColors ? 'legend-section' : ''}>
            {showNodeColors && <div className="legend-subtitle">Symbols:</div>}
            <div className="legend-notes">
              <p><strong>♂</strong> Male</p>
              <p><strong>♀</strong> Female</p>
              <p><strong>*</strong> Adopted or not biologically related</p>
              <p><strong>½</strong> From another marriage</p>
              <p><strong>~</strong> Passed away, year unknown</p>
              <p><strong>○</strong> Stillborn</p>
              <p><strong>⟷</strong> Divorced out of the family</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Legend;
