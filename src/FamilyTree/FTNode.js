import { dagNode } from "./d3-dag.js";

export class FTNode extends dagNode {
  is_extendable() {
    return this.get_neighbors().filter((node) => !node.visible).length > 0;
  }

  get_visible_neighbors() {
    return this.get_neighbors().filter((node) => node.visible);
  }

  get_visible_inserted_neighbors() {
    return this.get_visible_neighbors().filter((node) =>
      this.inserted_nodes.includes(node)
    );
  }
}
