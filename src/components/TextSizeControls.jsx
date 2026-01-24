import { useState } from 'react';

/**
 * Text Size controls panel component
 * @param {function} onIncrease - Callback to increase font size
 * @param {function} onDecrease - Callback to decrease font size
 * @param {function} onReset - Callback to reset font size
 * @param {number} fontSize - Current font size
 * @param {number} minSize - Minimum font size
 * @param {number} maxSize - Maximum font size
 */
function TextSizeControls({ onIncrease, onDecrease, onReset, fontSize, minSize, maxSize }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const atMin = fontSize <= minSize;
  const atMax = fontSize >= maxSize;

  return (
    <div className={`text-size-card panel-card ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="panel-title" onClick={() => setIsCollapsed(!isCollapsed)}>
        <span>{isCollapsed ? '+' : '−'}</span> Text Size
      </div>
      {!isCollapsed && (
        <div className="font-controls">
          <button
            onClick={onDecrease}
            title="Decrease font size (-)"
            disabled={atMin}
            className={atMin ? 'disabled' : ''}
          >
            A-
          </button>
          <button onClick={onReset} title="Reset font size (0)">
            A
          </button>
          <button
            onClick={onIncrease}
            title="Increase font size (+)"
            disabled={atMax}
            className={atMax ? 'disabled' : ''}
          >
            A+
          </button>
        </div>
      )}
    </div>
  );
}

export default TextSizeControls;
