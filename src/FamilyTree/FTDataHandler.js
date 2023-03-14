import { dagNode, dagConnect } from "./d3-dag.js";

import { Union } from "./Union.js";
import { Person } from "./Person.js";

export class FTDataHandler {
  constructor(data, start_node_id = data.start) {
    // check if edge list defined
    if (data.links.length > 0) {
      // make dag from edge list
      this.dag = dagConnect()(data.links);

      // dag must be a node with id undefined. fix if necessary
      if (this.dag.id !== undefined) {
        this.root = this.dag.copy();
        this.root.id = undefined;
        this.root.children = [this.dag];
        this.dag = this.root;
      }

      // get all d3-dag nodes and convert to family tree nodes
      this.nodes = this.dag.descendants().map((node) => {
        if (node.id in data.unions)
          return new Union(node, data.unions[node.id], this);
        else if (node.id in data.persons)
          return new Person(node, data.persons[node.id], this);
      });

      // relink children arrays: use family tree nodes instead of d3-dag nodes
      this.nodes.forEach(
        (n) => (n._children = n._children.map((c) => c.ftnode))
      );

      // make sure each node has an id
      this.number_nodes = 0;
      this.nodes.forEach((node) => {
        node.id = node.id || this.number_nodes;
        this.number_nodes++;
      });

      // set root node
      this.root = this.find_node_by_id(start_node_id);
      this.root.visible = true;
      this.dag.children = [this.root];
    }
    // if no edges but only nodes are defined: root = dag
    else if (Object.values(data.persons).length > 0) {
      const root_data = data.persons[start_node_id];
      this.root = new dagNode(start_node_id, root_data);
      this.root = new Person(this.root, root_data, this);
      this.root.visible = true;
      this.number_nodes = 1;
      this.nodes = [this.root];

      // dag must be a node with id undefined
      this.dag = new dagNode(undefined, {});
      this.dag.children = this.root;
    }
  }

  update_roots() {
    this.dag.children = [this.root];
    const FT = this;

    function find_roots_recursive(node) {
      node.get_visible_inserted_neighbors().forEach((node) => {
        if (node.is_root()) FT.dag.children.push(node);
        find_roots_recursive(node);
      });
    }
    find_roots_recursive(this.root);
  }

  find_node_by_id(id) {
    return this.nodes.find((node) => node.id === id);
  }
}
