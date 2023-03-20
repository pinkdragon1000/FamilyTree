import React from "react";
import FamilyTree from "./FamilyTree/FamilyTree.js";
import * as d3 from "https://cdn.skypack.dev/d3";
import TreeLogo from "./tree.svg";

import { data } from "./data/treeData";
function App() {
  const svg = d3
    .select("body")
    .append("svg")
    .attr("width", document.body.offsetWidth)
    .attr("height", document.documentElement.clientHeight);

  const FT = new FamilyTree(data, svg).orientation("vertical");

  return (
    <>
      <div className="navbar">
        <img className="spacer" src={TreeLogo} alt="tree logo" />
        Family Tree
      </div>
      <div>
        A * denotes an individual was adopted or not biologically related
      </div>
      <div>{FT.draw()}</div>
    </>
  );
}

export default App;
