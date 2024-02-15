import * as d3 from "d3";
import { data } from "./data/treeData.js";
import FamilyTree from "./js/familytree.js";
import TreeLogo from "./tree.svg";

function App() {
  const drawFamilyTree = () => {
    // insert svg object to hold the family tree

    const svgEl = d3.select("svg");

    console.log(svgEl.empty());

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
      <div>
        <p>A * denotes an individual was adopted or not biologically related</p>
        <p>
          A ~ by a death year means the person has passed away but year is
          unknown
        </p>

        <p>A ⟷ means that a person divorced out of the family</p>
      </div>
      <div>{drawFamilyTree()}</div>
    </>
  );
}

export default App;
