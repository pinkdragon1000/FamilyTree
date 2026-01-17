import * as d3 from "d3";
import { data } from "./data/treeData.js";
import FamilyTree from "./js/familytree.js";
import TreeLogo from "./tree.svg";

function App() {
  const drawFamilyTree = () => {
    // insert svg object to hold the family tree

    const svgEl = d3.select("svg");

    if (svgEl.empty()) {
      const svg = d3
        .select("body")
        .append("svg")
        .attr("width", document.documentElement.clientWidth)
        .attr("height", document.documentElement.clientHeight);

      // make family tree object
      let FT = new FamilyTree(data, svg).orientation("vertical");

      // draw family tree
      FT.draw();
    }
  };

  return (
    <>
      <div className="navbar">
        <img className="spacer" src={TreeLogo} alt="tree logo" />
        Family Tree
      </div>
      <div className="legend">
        <div className="legend-title">Legend</div>
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
      </div>
      <div>{drawFamilyTree()}</div>
    </>
  );
}

export default App;
