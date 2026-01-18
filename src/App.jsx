import { useState, useEffect, useCallback, useRef } from "react";
import * as d3 from "d3";
import { data } from "./data/treeData.js";
import FamilyTree from "./js/familytree.js";
import TreeLogo from "./tree.svg";

const DEFAULT_FONT_SIZE = 14;
const MIN_FONT_SIZE = 8;
const MAX_FONT_SIZE = 24;
const FONT_SIZE_STEP = 2;
const STORAGE_KEY = "familyTreeFontSize";

// Calculate base width from longest name in data
const getLongestNameLength = () => {
  let maxLength = 0;
  for (const person of Object.values(data.persons)) {
    if (person.name && person.name.length > maxLength) {
      maxLength = person.name.length;
    }
  }
  return maxLength;
};

// Base node separation at default font size (12px)
// Width: ~5px per character at 12px font + padding for node circle
const longestNameLength = getLongestNameLength();
const BASE_NODE_WIDTH = Math.max(100, longestNameLength * 5 + 40);
const BASE_NODE_HEIGHT = 120;

// Calculate node separation based on font size
const getNodeSeparation = (size) => {
  const scale = size / DEFAULT_FONT_SIZE;
  return [BASE_NODE_WIDTH * scale, BASE_NODE_HEIGHT * scale];
};

function App() {
  const [fontSize, setFontSize] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? parseInt(saved, 10) : DEFAULT_FONT_SIZE;
  });

  const [isLegendCollapsed, setIsLegendCollapsed] = useState(false);
  const [isTextSizeCollapsed, setIsTextSizeCollapsed] = useState(false);

  const familyTreeRef = useRef(null);
  const isInitializedRef = useRef(false);

  // Initialize family tree on mount
  useEffect(() => {
    if (isInitializedRef.current) return;
    isInitializedRef.current = true;

    const svg = d3
      .select("body")
      .append("svg")
      .attr("width", document.documentElement.clientWidth)
      .attr("height", document.documentElement.clientHeight);

    const [width, height] = getNodeSeparation(fontSize);
    const FT = new FamilyTree(data, svg)
      .orientation("vertical")
      .node_separation([width, height]);

    familyTreeRef.current = FT;
    FT.draw();
  }, []);

  // Update CSS variable and relayout when font size changes
  useEffect(() => {
    document.documentElement.style.setProperty(
      "--node-label-font-size",
      `${fontSize}px`
    );
    localStorage.setItem(STORAGE_KEY, fontSize.toString());

    // Update line spacing on existing labels
    const lineSep = fontSize * 1.4;
    d3.selectAll(".node-label").each(function () {
      const tspans = d3.select(this).selectAll("tspan");
      const numLines = tspans.size();
      if (numLines > 0) {
        const lineOffset = (-lineSep * (numLines - 1)) / 2;
        tspans.each(function (d, i) {
          d3.select(this).attr("dy", i === 0 ? lineOffset : lineSep);
        });
      }
    });

    // Update layout if tree exists
    if (familyTreeRef.current) {
      const [width, height] = getNodeSeparation(fontSize);
      familyTreeRef.current.node_separation([width, height]);
      familyTreeRef.current.draw();
    }
  }, [fontSize]);

  const increaseFontSize = useCallback(() => {
    setFontSize((prev) => Math.min(prev + FONT_SIZE_STEP, MAX_FONT_SIZE));
  }, []);

  const decreaseFontSize = useCallback(() => {
    setFontSize((prev) => Math.max(prev - FONT_SIZE_STEP, MIN_FONT_SIZE));
  }, []);

  const resetFontSize = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setFontSize(DEFAULT_FONT_SIZE);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ignore if user is typing in an input
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") {
        return;
      }
      if (e.key === "+" || e.key === "=") {
        increaseFontSize();
      } else if (e.key === "-") {
        decreaseFontSize();
      } else if (e.key === "0") {
        resetFontSize();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [increaseFontSize, decreaseFontSize, resetFontSize]);

  return (
    <>
      <div className="navbar">
        <img className="spacer" src={TreeLogo} alt="tree logo" />
        Family Tree
      </div>
      <div className={`legend ${isLegendCollapsed ? 'collapsed' : ''}`}>
        <div className="legend-title" onClick={() => setIsLegendCollapsed(!isLegendCollapsed)}>
          <span>{isLegendCollapsed ? '+' : '−'}</span> Legend
        </div>
        {!isLegendCollapsed && (
          <>
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
            <div className="legend-section">
              <div className="legend-subtitle">Symbols:</div>
              <div className="legend-notes">
                <p><strong>*</strong> Adopted or not biologically related</p>
                <p><strong>~</strong> Passed away, year unknown</p>
                <p><strong>⟷</strong> Divorced out of the family</p>
              </div>
            </div>
          </>
        )}
      </div>
      <div className={`text-size-card ${isTextSizeCollapsed ? 'collapsed' : ''}`}>
        <div className="card-title" onClick={() => setIsTextSizeCollapsed(!isTextSizeCollapsed)}>
          <span>{isTextSizeCollapsed ? '+' : '−'}</span> Text Size
        </div>
        {!isTextSizeCollapsed && (
          <div className="font-controls">
            <button onClick={decreaseFontSize} title="Decrease font size (-)">
              A-
            </button>
            <button onClick={resetFontSize} title="Reset font size (0)">
              A
            </button>
            <button onClick={increaseFontSize} title="Increase font size (+)">
              A+
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
