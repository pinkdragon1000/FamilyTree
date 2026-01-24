import { useState, useEffect, useCallback, useRef } from "react";
import * as d3 from "d3";
import { data, INITIAL_COUPLES } from "./data/buildTreeData.js";
import FamilyTree from "./js/familytree.js";
import CardView from "./components/CardView.jsx";
import Legend from "./components/Legend.jsx";
import TextSizeControls from "./components/TextSizeControls.jsx";
import SearchBar from "./components/SearchBar.jsx";
import TreeLogo from "./tree.svg";

const DEFAULT_FONT_SIZE = 14;
const MIN_FONT_SIZE = 8;
const MAX_FONT_SIZE = 24;
const FONT_SIZE_STEP = 2;
const STORAGE_KEY = "familyTreeFontSize";
const VIEW_MODE_STORAGE_KEY = "familyTreeViewMode";

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

  const [viewMode, setViewMode] = useState(() => {
    const saved = localStorage.getItem(VIEW_MODE_STORAGE_KEY);
    if (saved) {
      return saved;
    }
    // Default to card view on smaller screens
    return window.innerWidth <= 600 ? 'card' : 'tree';
  });

  // Card view navigation stack
  const [cardNavStack, setCardNavStack] = useState([{ couples: INITIAL_COUPLES }]);
  const canGoBackInCards = cardNavStack.length > 1;

  // Search target for card view navigation
  const [cardSearchTarget, setCardSearchTarget] = useState(null);

  // Get the name of the descendant we'd navigate back to
  const getBackLabel = useCallback(() => {
    if (cardNavStack.length <= 1) return 'Descendants';
    const currentView = cardNavStack[cardNavStack.length - 1];
    // Get childName from the first couple that has one
    const childName = currentView.couples?.find(c => c.childName)?.childName;
    return childName || 'Descendants';
  }, [cardNavStack]);

  const navigateBackInCards = useCallback(() => {
    setCardNavStack(prev => prev.length > 1 ? prev.slice(0, -1) : prev);
  }, []);

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

  const toggleViewMode = useCallback(() => {
    setViewMode((prev) => {
      const newMode = prev === 'tree' ? 'card' : 'tree';
      localStorage.setItem(VIEW_MODE_STORAGE_KEY, newMode);
      return newMode;
    });
  }, []);

  // Jump to a specific person in tree view
  const jumpToTreePerson = useCallback((personId) => {
    setViewMode('tree');
    localStorage.setItem(VIEW_MODE_STORAGE_KEY, 'tree');
    // Wait for view mode to switch and SVG to be visible, then navigate
    setTimeout(() => {
      if (familyTreeRef.current) {
        familyTreeRef.current.navigateToNode(personId);
      }
    }, 100);
  }, []);

  // Handle search selection based on current view mode
  const handleSearchSelect = useCallback((personId) => {
    if (viewMode === 'card') {
      // Navigate within card view
      setCardSearchTarget(personId);
    } else {
      // Jump to tree view
      jumpToTreePerson(personId);
    }
  }, [viewMode, jumpToTreePerson]);

  // Control SVG visibility based on view mode
  useEffect(() => {
    const svg = d3.select('body > svg');
    if (!svg.empty()) {
      svg.style('display', viewMode === 'tree' ? 'block' : 'none');
      // Center the tree view when switching to it
      if (viewMode === 'tree' && familyTreeRef.current) {
        // Small delay to ensure SVG is visible before centering
        setTimeout(() => {
          familyTreeRef.current.centerView();
        }, 50);
      }
    }
  }, [viewMode]);

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
        <SearchBar data={data} onSelectPerson={handleSearchSelect} />
        <div className="navbar-title">
          <img className="spacer" src={TreeLogo} alt="tree logo" />
          Family Tree
        </div>
        <div className="navbar-buttons">
          {viewMode === 'card' && canGoBackInCards && (
            <button className="view-toggle" onClick={navigateBackInCards}>
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 12H5M5 12L12 19M5 12L12 5" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {getBackLabel()}
            </button>
          )}
          <Legend showNodeColors={viewMode === 'tree'} />
          <button className="view-toggle" onClick={toggleViewMode}>
            {viewMode === 'tree' ? (
              <>
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <rect x="3" y="3" width="7" height="7" rx="1" />
                  <rect x="14" y="3" width="7" height="7" rx="1" />
                  <rect x="3" y="14" width="7" height="7" rx="1" />
                  <rect x="14" y="14" width="7" height="7" rx="1" />
                </svg>
                Cards
              </>
            ) : (
              <>
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L12 8M12 8L8 5M12 8L16 5M4 10H20M4 10V20C4 21 5 22 6 22H18C19 22 20 21 20 20V10M8 14H8.01M12 14H12.01M16 14H16.01M8 18H8.01M12 18H12.01M16 18H16.01" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Tree
              </>
            )}
          </button>
        </div>
      </div>
      {viewMode === 'card' && <CardView data={data} navStack={cardNavStack} setNavStack={setCardNavStack} onJumpToTree={jumpToTreePerson} searchTargetId={cardSearchTarget} onSearchTargetHandled={() => setCardSearchTarget(null)} />}
      {viewMode === 'tree' && (
        <TextSizeControls
          onIncrease={increaseFontSize}
          onDecrease={decreaseFontSize}
          onReset={resetFontSize}
        />
      )}
    </>
  );
}

export default App;
