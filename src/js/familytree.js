import * as d3 from "d3";
import {
  graphConnect,
  sugiyama,
  layeringSimplex,
  decrossTwoLayer,
  coordCenter,
} from "d3-dag";


// extend javascript array class by a remove function
// copied from https://stackoverflow.com/a/3955096/12267732
Array.prototype.remove = function () {
  var what,
    a = arguments,
    L = a.length,
    ax;
  while (L && this.length) {
    what = a[--L];
    while ((ax = this.indexOf(what)) !== -1) {
      this.splice(ax, 1);
    }
  }
  return this;
};

function add_text_label(
  d3element,
  text,
  delimiter = "_",
  css_class = undefined,
  line_sep = 14,
  line_offset = undefined,
  x = 13,
  dominant_baseline = "central"
) {
  // adds a multi-line text label to a d3 element
  if (!text) return;
  const d3text = d3element
    .append("text")
    .attr("class", css_class)
    .attr("dominant-baseline", dominant_baseline);
  const arr = text.split(delimiter);
  if (!line_offset) {
    line_offset = (-line_sep * (arr.length - 1)) / 2;
  }
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] !== "") {
      d3text
        .append("tspan")
        .text(arr[i])
        .attr("dy", i == 0 ? line_offset : line_sep)
        .attr("x", x);
    }
  }
}

class FTNode {
  constructor(id, data) {
    this.id = id;
    this.data = data;
    this.children = [];
    this._children = [];
  }

  descendants() {
    return [this];
  }

  links() {
    return [];
  }

  copy() {
    const copied = new this.constructor(this.id, this.data);
    copied.children = this.children.slice();
    copied._children = this._children.slice();
    return copied;
  }
  
  is_extendable() {
    // A node is extendable if it has neighbors to show OR visible inserted neighbors to hide
    const hiddenNeighbors = this.get_neighbors().filter((node) => !node.visible).length > 0;
    const visibleInsertedNeighbors = this.get_visible_inserted_neighbors().length > 0;
    return hiddenNeighbors || visibleInsertedNeighbors;
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

function d3_append_multiline_text(
  d3element,
  text,
  delimiter = "_",
  css_class = undefined,
  line_sep = 14,
  line_offset = undefined,
  x = 13,
  dominant_baseline = "central"
) {
  // adds a multi-line text label to a d3 element
  if (!text) return;
  const d3text = d3element
    .append("text")
    .attr("class", css_class)
    .attr("dominant-baseline", dominant_baseline);
  const arr = text.split(delimiter);
  if (!line_offset) {
    line_offset = (-line_sep * (arr.length - 1)) / 2;
  }
  if (arr != undefined) {
    for (let i = 0; i < arr.length; i++) {
      d3text
        .append("tspan")
        .text(arr[i])
        .attr("dy", i == 0 ? line_offset : line_sep)
        .attr("x", x);
    }
  }
}

class FTDataHandler {
  constructor(data, start_node_id = data.start) {
    // check if edge list defined
    if (data.links.length > 0) {
      // make dag from edge list using new API
      const connect = graphConnect();
      this.graph = connect(data.links);
      
      // Create node map for quick lookup
      this.nodeMap = new Map();
      for (const graphNode of this.graph.nodes()) {
        const id = graphNode.data; // data IS the ID in new API
        let ftNode;
        
        if (id in data.unions) {
          ftNode = new Union(graphNode, data.unions[id], this);
        } else if (id in data.persons) {
          ftNode = new Person(graphNode, data.persons[id], this);
        }
        
        if (ftNode) {
          this.nodeMap.set(id, ftNode);
          graphNode.ftNode = ftNode;
          ftNode.graphNode = graphNode;
        }
      }
      
      this.nodes = Array.from(this.nodeMap.values());
      
      // Set up parent-child relationships
      for (const link of this.graph.links()) {
        const source = this.nodeMap.get(link.source.data);
        const target = this.nodeMap.get(link.target.data);
        if (source && target) {
          if (!source._children) source._children = [];
          source._children.push(target);
        }
      }
      
      // Find and set root
      this.root = this.nodeMap.get(start_node_id);
      
      if (!this.root && this.nodes.length > 0) {
        this.root = this.nodes[0];
      }
      
      if (this.root) {
        this.root.visible = true;
      }
      
      this.number_nodes = this.nodes.length;
    }
    // if no edges but only nodes are defined: create single person root
    else if (Object.values(data.persons).length > 0) {
      const root_data = data.persons[start_node_id];
      // Create a minimal graph with just one node
      const mockGraphNode = { data: { id: start_node_id } };
      this.root = new Person(mockGraphNode, root_data, this);
      this.root.visible = true;
      this.number_nodes = 1;
      this.nodes = [this.root];
      
      // Create empty graph
      const connect = graphConnect();
      this.graph = connect([]);
    }
  }

  update_roots() {
    // Update roots is not needed with new graph API
  }

  find_node_by_id(id) {
    return this.nodes.find((node) => node.id == id);
  }
}

class Union extends FTNode {
  constructor(graphNode, data, ft_datahandler) {
    super(graphNode.data, data);
    this.ft_datahandler = ft_datahandler;
    this._children = [];
    this.children = [];
    this.inserted_nodes = [];
    this.inserted_links = [];
    this.visible = false;
  }

  get_neighbors() {
    return this.get_parents().concat(this.get_children());
  }

  get_parents() {
    var parents = this.data.partner
      .map((id) => this.ft_datahandler.find_node_by_id(id))
      .filter((node) => node != undefined);
    if (parents) return parents;
    else return [];
  }

  get_hidden_parents() {
    return this.get_parents().filter((parent) => !parent.visible);
  }

  get_visible_parents() {
    return this.get_parents().filter((parent) => parent.visible);
  }

  get_children() {
    var children = [];
    children = this.children.concat(this._children);
    // sort children by birth year, filter undefined
    children = children.filter((c) => c != undefined);
    // .sort((a, b) => Math.sign((getBirthYear(a) || 0) - (getBirthYear(b) || 0)));
    return children;
  }

  get_hidden_children() {
    return this.get_children().filter((child) => !child.visible);
  }

  get_visible_children() {
    return this.get_children().filter((child) => child.visible);
  }

  show_child(child) {
    if (!this._children.includes(child)) {
      console.warn("Child node not in this' _children array.");
    }
    this.children.push(child);
    this._children.remove(child);
    // if child is already visible, note a connection to destroy it later
    if (child.visible) {
      this.inserted_links.push([this, child]);
    }
    // if child is hidden, show it
    else {
      child.visible = true;
      this.inserted_nodes.push(child);
      // downstream part of the family tree is automatically reconstructed because children attribute
      // is not reset when hiding
    }
  }

  show_parent(parent) {
    if (!parent._children.includes(this)) {
      console.warn("This node not in parent's _children array.");
    }
    parent.children.push(this);
    parent._children.remove(this);
    // if parent is already visible, note a connection to destroy it later
    if (parent.visible) {
      this.inserted_links.push([parent, this]);
    }
    // if parent is hidden, show it
    else {
      parent.visible = true;
      this.inserted_nodes.push(parent);
    }
  }

  show() {
    this.visible = true;

    // show neighboring children
    this.get_children().forEach((child) => {
      this.show_child(child);
    });

    // show neighboring parents
    this.get_parents().forEach((parent) => {
      this.show_parent(parent);
    });
  }

  get_visible_inserted_children() {
    return this.children.filter((child) => this.inserted_nodes.includes(child));
  }

  get_visible_inserted_parents() {
    return this.get_visible_parents().filter((parent) =>
      this.inserted_nodes.includes(parent)
    );
  }

  is_root() {
    return false;
  }

  hide_child(child) {
    if (!this.children.includes(child)) {
      console.warn("Child node not in this's children array.");
    }
    child.visible = false;
    this._children.push(child);
    this.children.remove(child);
    this.inserted_nodes.remove(child);
  }

  hide_parent(parent) {
    if (!parent.children.includes(this)) {
      console.warn("This node not in parent's children array.");
    }
    parent.visible = false;
    parent._children.push(this);
    parent.children.remove(this);
    this.inserted_nodes.remove(parent);
  }

  hide() {
    this.visible = false;

    // hide neighboring children, if inserted by this node
    this.get_visible_inserted_children().forEach((child) => {
      this.hide_child(child);
    });

    // hide neighboring parents, if inserted by this node
    this.get_visible_inserted_parents().forEach((parent) => {
      this.hide_parent(parent);
    });

    // hide only edge (not node) if not inserted by this node
    this.inserted_links.forEach((edge) => {
      const source = edge[0];
      const target = edge[1];
      if (this == source) {
        this._children.push(target);
        this.children.remove(target);
      } else if (this == target) {
        source._children.push(this);
        source.children.remove(this);
      }
    });
    this.inserted_links = [];
  }

  get_own_unions() {
    return [];
  }

  get_parent_unions() {
    return [];
  }

  get_name() {
    return undefined;
  }

  get_birth_year() {
    return undefined;
  }

  get_birth_place() {
    return undefined;
  }

  get_death_year() {
    return undefined;
  }

  get_death_place() {
    return undefined;
  }

  is_union() {
    return true;
  }

  add_parent(person_data) {
    // make person object
    const id = person_data.id || "p" + ++this.ft_datahandler.number_nodes;
    const dagnode = new dagNode(id, person_data);
    const person = new Person(dagnode, person_data, this.ft_datahandler);
    if (!("parent_union" in person_data)) person_data.parent_union = undefined;
    if (!("own_unions" in person_data)) {
      person_data.own_unions = [this.id];
      person._childLinkData = [[person.id, this.id]];
      person._children.push(this);
    }
    person.data = person_data;
    this.ft_datahandler.nodes.push(person);
    // make sure person lists this union as an own union
    if (!person_data.own_unions.includes(this.id))
      person_data.own_unions.push(this.id);
    // make sure this union lists person as parent
    if (!this.data.partner.includes(person.id))
      this.data.partner.push(person.id);
    // make union visible
    this.show_parent(person);
    this.ft_datahandler.update_roots();
    return person;
  }

  add_child(person_data) {
    // make person object
    const id = person_data.id || "p" + ++this.ft_datahandler.number_nodes;
    const dagnode = new dagNode(id, person_data);
    const person = new Person(dagnode, person_data, this.ft_datahandler);
    if (!("parent_union" in person_data)) person_data.parent_union = this.id;
    if (!("own_unions" in person_data)) person_data.own_unions = [];
    person.data = person_data;
    this.ft_datahandler.nodes.push(person);
    // make sure person lists this union as an parent union
    if (!person_data.parent_union == this.id)
      person_data.parent_union == this.id;
    // make sure this union lists person as child
    if (!this.data.children.includes(person.id))
      this.data.children.push(person.id);
    if (!this._childLinkData.includes([this.id, person.id]))
      this._childLinkData.push([this.id, person.id]);
    // make union visible
    this.show_child(person);
    return person;
  }
}

class Person extends FTNode {
  constructor(graphNode, data, ft_datahandler) {
    super(graphNode.data, data);
    this.ft_datahandler = ft_datahandler;
    this._children = [];
    this.children = [];
    this.inserted_nodes = [];
    this.inserted_links = [];
    this.visible = false;
  }

  get_name() {
    return this.data.name;
  }

  get_birth_year() {
    return this.data.birthyear;
  }

  get_birth_place() {
    return this.data.birthplace;
  }

  get_death_year() {
    return this.data.deathyear;
  }

  get_death_place() {
    return this.data.deathplace;
  }

  get_neighbors() {
    return this.get_own_unions().concat(this.get_parent_unions());
  }

  get_parent_unions() {
    var unions = [this.data.parent_union]
      .map((id) => this.ft_datahandler.find_node_by_id(id))
      .filter((node) => node != undefined);
    var u_id = this.data.parent_union;
    if (unions) return unions;
    else return [];
  }

  get_hidden_parent_unions() {
    return this.get_parent_unions().filter((union) => !union.visible);
  }

  get_visible_parent_unions() {
    return this.get_parent_unions().filter((union) => union.visible);
  }

  get_visible_inserted_parent_unions() {
    return this.get_visible_parent_unions().filter((union) =>
      this.inserted_nodes.includes(union)
    );
  }

  is_root() {
    return this.get_visible_parent_unions().length == 0;
  }

  is_union() {
    return false;
  }

  get_own_unions() {
    var unions = (this.data.own_unions ?? [])
      .map((id) => this.ft_datahandler.find_node_by_id(id))
      .filter((u) => u != undefined);
    if (unions) return unions;
    else return [];
  }

  get_hidden_own_unions() {
    return this.get_own_unions().filter((union) => !union.visible);
  }

  get_visible_own_unions() {
    return this.get_own_unions().filter((union) => union.visible);
  }

  get_visible_inserted_own_unions() {
    return this.get_visible_own_unions().filter((union) =>
      this.inserted_nodes.includes(union)
    );
  }

  get_parents() {
    var parents = [];
    this.get_parent_unions().forEach(
      (u) => (parents = parents.concat(u.get_parents()))
    );
  }

  get_other_partner(union_data) {
    var partner_id = union_data.partner.find(
      (p_id) => (p_id != this.id) & (p_id != undefined)
    );
    return all_nodes.find((n) => n.id == partner_id);
  }

  get_partners() {
    var partners = [];
    this.get_own_unions().forEach((u) => {
      partners.push(this.get_other_partner(u.data));
    });
    return partners.filter((p) => p != undefined);
  }

  get_children() {
    var children = [];
    this.get_own_unions().forEach(
      (u) => (children = children.concat(getChildren(u)))
    );
    // sort children by birth year, filter undefined
    children = children.filter((c) => c != undefined);
    // .sort((a, b) => Math.sign((getBirthYear(a) || 0) - (getBirthYear(b) || 0)));
    return children;
  }

  show_union(union) {
    union.show();
    this.inserted_nodes.push(union);
  }

  hide_own_union(union) {
    union.hide();
    this.inserted_nodes.remove(union);
  }

  hide_parent_union(union) {
    union.hide();
  }

  show() {
    this.get_hidden_own_unions().forEach((union) => this.show_union(union));
    this.get_hidden_parent_unions().forEach((union) => this.show_union(union));
  }

  hide() {
    this.get_visible_inserted_own_unions().forEach((union) =>
      this.hide_own_union(union)
    );
    this.get_visible_inserted_parent_unions().forEach((union) =>
      this.hide_parent_union(union)
    );
  }

  click() {
    const hiddenNeighbors = this.get_neighbors().filter((n) => !n.visible).length > 0;
    const visibleInsertedNeighbors = this.get_visible_inserted_neighbors().length > 0;
    
    // If has both hidden and visible, prioritize showing hidden first
    if (hiddenNeighbors) {
      this.show();
    }
    // If only visible inserted neighbors, hide them
    else if (visibleInsertedNeighbors) {
      this.hide();
    }
    // update dag roots
    this.ft_datahandler.update_roots();
  }

  add_own_union(union_data) {
    // make union object
    const id = union_data.id || "u" + ++this.ft_datahandler.number_nodes;
    const dagnode = new dagNode(id, union_data);
    const union = new Union(dagnode, union_data, this.ft_datahandler);
    if (!("partner" in union_data)) union_data.partner = [this.id];
    if (!("children" in union_data)) {
      union_data.children = [];
      union._childLinkData = [];
    }
    union.data = union_data;
    this.ft_datahandler.nodes.push(union);
    // make sure union lists this person as a partner
    if (!union_data.partner.includes(this.id)) union_data.partner.push(this.id);
    // make sure this person lists union as own_union
    if (!this.data.own_unions.includes(union.id))
      this.data.own_unions.push(union.id);
    if (!this._childLinkData.includes([this.id, union.id]))
      this._childLinkData.push([this.id, union.id]);
    // make union visible
    this.show_union(union);
    return union;
  }

  add_parent_union(union_data) {
    // make union object
    const id = union_data.id || "u" + ++this.ft_datahandler.number_nodes;
    const dagnode = new dagNode(id, union_data);
    const union = new Union(dagnode, union_data, this.ft_datahandler);
    if (!("partner" in union_data)) union_data.partner = [];
    if (!("children" in union_data)) {
      union_data.children = [this.id];
      union._childLinkData = [[union.id, this.id]];
      union._children.push(this);
    }
    union.data = union_data;
    this.ft_datahandler.nodes.push(union);
    // make sure union lists this person as a child
    if (!union_data.children.includes(this.id))
      union_data.children.push(this.id);
    // make sure this person lists union as own_union
    this.data.parent_union = union.id;
    // make union visible
    this.show_union(union);
    this.ft_datahandler.update_roots();
    return union;
  }
}

class FTDrawer {
  static label_delimiter = "_";

  constructor(ft_datahandler, svg, x0, y0) {
    this.ft_datahandler = ft_datahandler;
    this.svg = svg;
    this._orientation = null;
    this.link_css_class = "link";

    // append group element to draw family tree in
    this.g = this.svg.append("g");

    // initialize panning, zooming
    this.zoom = d3
      .zoom()
      .on("zoom", (event) => this.g.attr("transform", event.transform));
    this.svg.call(this.zoom);

    // initialize tooltips
    this._tooltip_div = d3
      .select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);
    this.tooltip(FTDrawer.default_tooltip_func);

    // initialize dag layout maker
    this.layout = sugiyama()
      .nodeSize([100, 150])
      .layering(layeringSimplex())
      .decross(decrossTwoLayer())
      .coord(coordCenter());

    // defaults
    this.orientation("horizontal");
    this.transition_duration(750);
    this.link_path(FTDrawer.default_link_path_func);
    this.node_label(FTDrawer.default_node_label_func);
    this.node_size(FTDrawer.default_node_size_func);
    this.node_class(FTDrawer.default_node_class_func);

    // set starting position for root node
    const default_pos = this.default_root_position();
    if (this.ft_datahandler.root) {
      this.ft_datahandler.root.x0 = x0 || default_pos[0];
      this.ft_datahandler.root.y0 = y0 || default_pos[1];
    }
  }

  default_root_position() {
    return [this.svg.attr("width") / 2, this.svg.attr("height") / 2];
  }

  orientation(value) {
    // getter/setter for tree orientation (horizontal/vertical)
    if (!value) return this.orientation;
    else {
      this._orientation = value;
      return this;
    }
  }

  node_separation(value) {
    // getter/setter for separation of nodes in x and y direction (see d3-dag documentation)
    if (!value) return this.layout.nodeSize();
    else {
      this.layout.nodeSize(value);
      return this;
    }
  }

  layering(value) {
    // getter/setter for layout operator (see d3-dag documentation)
    if (!value) return this.layout.layering();
    else {
      this.layout.layering(value);
      return this;
    }
  }

  decross(value) {
    // getter/setter for descross operator (see d3-dag documentation)
    if (!value) return this.layout.decross();
    else {
      this.layout.decross(value);
      return this;
    }
  }

  coord(value) {
    // getter/setter for coordinate operator (see d3-dag documentation)
    if (!value) return this.layout.coord();
    else {
      this.layout.coord(value);
      return this;
    }
  }

  transition_duration(value) {
    // getter/setter for animation transition duration
    if ((value != 0) & !value) return this._transition_duration;
    else {
      this._transition_duration = value;
      return this;
    }
  }

  static default_tooltip_func(node) {
    if (node.is_union()) return;
    
    const birthYear = node.get_birth_year();
    const deathYear = node.get_death_year();
    const birthPlace = node.data.birthplace;
    const deathPlace = node.data.deathplace;
    const imageLink = node.data.imageLink;
    const profession = node.data.profession;
    
    var content = ``;
    
    // Add photo if available
    if (imageLink) {
      content += `<img src="${imageLink}" alt="${node.get_name()}" style="width: 100px; height: auto; display: block; margin: 0 auto 10px auto; border-radius: 5px;"><br>`;
    }
    
    content += `<span style='margin-left: 2.5px;'><b>` + node.get_name() + `</b></span>`;
    
    // Add profession if available
    if (profession) {
      content += `<br><span style='margin-left: 2.5px; font-style: italic;'>` + profession + `</span>`;
    }
    
    // Only add table if there's actual info to show
    const hasBirthInfo = birthYear || birthPlace;
    const hasDeathInfo = deathYear || deathPlace;
    
    if (hasBirthInfo || hasDeathInfo) {
      content += `<br><table style="margin-top: 2.5px;">`;
      
      if (hasBirthInfo) {
        let birthText = birthYear || "";
        if (birthYear && birthPlace) {
          birthText += " in " + birthPlace;
        } else if (birthPlace) {
          birthText = birthPlace;
        }
        content += `<tr><td>born</td><td>` + birthText + `</td></tr>`;
      }
      
      if (hasDeathInfo) {
        let deathText = deathYear || "";
        if (deathYear && deathPlace) {
          deathText += " in " + deathPlace;
        } else if (deathPlace) {
          deathText = deathPlace;
        }
        content += `<tr><td>died</td><td>` + deathText + `</td></tr>`;
      }
      
      content += `</table>`;
    }
    
    return content.replace(new RegExp("null", "g"), "?");
  }

  tooltip(tooltip_func) {
    // setter for tooltips
    if (!tooltip_func) {
      this.show_tooltips = false;
    } else {
      this.show_tooltips = true;
      this._tooltip_func = tooltip_func;
    }
    return this;
  }

  static default_node_label_func(node) {
    // node label function
    // text will be split into multiple lines where `label_delimiter` is used
    if (node.is_union()) return;
    return (
      node.get_name() +
      FTDrawer.label_delimiter +
      (node.get_birth_year() || "?") +
      " - " +
      (node.get_death_year() || "?")
    );
  }

  node_label(node_label_func) {
    // setter for node labels
    if (!node_label_func) {
    } else {
      this.node_label_func = node_label_func;
    }
    return this;
  }

  static default_node_class_func(node) {
    // returns a node's css classes as a string
    if (node.is_union()) return;
    else {
      const hiddenNeighbors = node.get_neighbors().filter((n) => !n.visible).length > 0;
      const visibleInsertedNeighbors = node.get_visible_inserted_neighbors().length > 0;
      
      // Prioritize showing expandable state
      if (hiddenNeighbors) return "person extendable";
      else if (visibleInsertedNeighbors) return "person collapsible";
      else return "person non-extendable";
    }
  }

  node_class(node_class_func) {
    // setter for node css class function
    if (!node_class_func) {
    } else {
      this.node_class_func = node_class_func;
    }
    return this;
  }

  static default_node_size_func(node) {
    // returns an integer determining the node's size
    if (node.is_union()) return 0;
    else return 10;
  }

  node_size(node_size_func) {
    // setter for node size function
    if (!node_size_func) {
    } else {
      this.node_size_func = node_size_func;
    }
    return this;
  }

  static default_link_path_func(s, d) {
    function vertical_gentle_curve(s, d) {
      // Creates a gentler curve for vertically oriented trees
      const controlOffset = Math.abs(d.y - s.y) * 0.25;
      return `M ${s.x} ${s.y}
            C ${s.x} ${s.y + controlOffset},
            ${d.x} ${d.y - controlOffset},
            ${d.x} ${d.y}`;
    }

    function horizontal_gentle_curve(s, d) {
      // Creates a gentler curve for horizontally oriented trees
      const controlOffset = Math.abs(d.x - s.x) * 0.25;
      return `M ${s.x} ${s.y}
            C ${s.x + controlOffset} ${s.y},
              ${d.x - controlOffset} ${d.y},
              ${d.x} ${d.y}`;
    }
    return this._orientation == "vertical"
      ? vertical_gentle_curve(s, d)
      : horizontal_gentle_curve(s, d);
  }

  static straight_link_path_func(s, d) {
    // Straight line
    return `M ${s.x} ${s.y} L ${d.x} ${d.y}`;
  }

  static elbow_link_path_func(s, d) {
    function vertical_elbow(s, d) {
      // Creates right-angle connection for vertical trees
      return `M ${s.x} ${s.y}
              V ${(s.y + d.y) / 2}
              H ${d.x}
              V ${d.y}`;
    }

    function horizontal_elbow(s, d) {
      // Creates right-angle connection for horizontal trees
      return `M ${s.x} ${s.y}
              H ${(s.x + d.x) / 2}
              V ${d.y}
              H ${d.x}`;
    }
    return this._orientation == "vertical"
      ? vertical_elbow(s, d)
      : horizontal_elbow(s, d);
  }

  static step_link_path_func(s, d) {
    function vertical_step(s, d) {
      // Creates a step connection for vertical trees
      const midY = (s.y + d.y) / 2;
      return `M ${s.x} ${s.y}
              V ${midY}
              H ${d.x}
              V ${d.y}`;
    }

    function horizontal_step(s, d) {
      // Creates a step connection for horizontal trees  
      const midX = (s.x + d.x) / 2;
      return `M ${s.x} ${s.y}
              H ${midX}
              V ${d.y}
              H ${d.x}`;
    }
    return this._orientation == "vertical"
      ? vertical_step(s, d)
      : horizontal_step(s, d);
  }

  link_path(link_path_func) {
    // setter for link path function
    if (!link_path_func) {
    } else {
      this.link_path_func = link_path_func;
    }
    return this;
  }

  static make_unique_link_id(link) {
    return link.id || link.source.id + "_" + link.target.id;
  }

  draw(source = this.ft_datahandler.root) {
    // Guard against undefined root
    if (!this.ft_datahandler.root) {
      console.warn("Cannot draw: no root node available");
      return;
    }
    
    // Disable tooltips during transition
    this._tooltips_enabled = false;
    
    let nodes, links;
    
    // If we have a graph, run layout on it
    if (this.ft_datahandler.graph) {
      // Get visible nodes first
      nodes = this.ft_datahandler.nodes.filter(n => n.visible);
      
      // Create a subgraph with only visible nodes
      const visibleIds = new Set(nodes.map(n => n.id));
      const visibleLinks = [];
      
      for (const link of this.ft_datahandler.graph.links()) {
        const sourceId = link.source.data;
        const targetId = link.target.data;
        if (visibleIds.has(sourceId) && visibleIds.has(targetId)) {
          visibleLinks.push([sourceId, targetId]);
        }
      }
      
      // Create and layout subgraph with only visible nodes
      if (visibleLinks.length > 0) {
        const connect = graphConnect();
        const visibleGraph = connect(visibleLinks);
        this.layout(visibleGraph);
        
        // Copy coordinates from subgraph to FT nodes
        for (const graphNode of visibleGraph.nodes()) {
          const ftNode = this.ft_datahandler.nodeMap.get(graphNode.data);
          if (ftNode) {
            ftNode.x = graphNode.x;
            ftNode.y = graphNode.y;
            // Initialize x0, y0 for first render
            if (ftNode.x0 === undefined) {
              ftNode.x0 = source ? source.x : ftNode.x;
              ftNode.y0 = source ? source.y : ftNode.y;
            }
          }
        }
      } else if (nodes.length === 1) {
        // Single visible node
        nodes[0].x = 0;
        nodes[0].y = 0;
        if (nodes[0].x0 === undefined) {
          nodes[0].x0 = 0;
          nodes[0].y0 = 0;
        }
      }
      
      // Get links between visible nodes  
      links = [];
      for (const link of this.ft_datahandler.graph.links()) {
        const sourceFT = link.source.ftNode;
        const targetFT = link.target.ftNode;
        if (sourceFT && targetFT && sourceFT.visible && targetFT.visible) {
          links.push({ source: sourceFT, target: targetFT, data: link.data });
        }
      }
    } else {
      // Single node case - no graph
      nodes = [this.ft_datahandler.root];
      links = [];
      this.ft_datahandler.root.x = 0;
      this.ft_datahandler.root.y = 0;
      if (this.ft_datahandler.root.x0 === undefined) {
        this.ft_datahandler.root.x0 = 0;
        this.ft_datahandler.root.y0 = 0;
      }
    }

    // switch x and y coordinates if orientation = "horizontal"
    if (this._orientation == "horizontal") {
      var buffer = null;
      nodes.forEach(function (d) {
        buffer = d.x;
        d.x = d.y;
        d.y = buffer;
      });
    }

    // ****************** Nodes section ***************************

    // assign node data
    var node = this.g.selectAll("g.node").data(nodes, (node) => node.id);

    // insert new nodes at the parent's previous position.
    var nodeEnter = node
      .enter()
      .append("g")
      .attr("class", "node")
      .attr(
        "transform",
        (_) => "translate(" + source.x0 + "," + source.y0 + ")"
      )
      .attr("visible", true);

    // add tooltip
    if (this.show_tooltips) {
      const tooltip_div = this._tooltip_div,
        tooltip_func = this._tooltip_func,
        drawer = this;
      nodeEnter
        .on("mouseover", function (event, d) {
          if (!drawer._tooltips_enabled) return;
          tooltip_div.html(tooltip_func(d));
          let height = tooltip_div.node().getBoundingClientRect().height;
          tooltip_div
            .style("left", event.pageX + 10 + "px")
            .style("top", event.pageY - height / 2 + "px");
          tooltip_div.transition().duration(200).style("opacity", undefined);
        })
        .on("mouseout", function (d) {
          tooltip_div.transition().duration(500).style("opacity", 0);
        });
    }

    // add click handler (after tooltip to ensure tooltip hides on click)
    nodeEnter.on("click", (_, node) => {
      if (this.show_tooltips) {
        this._tooltip_div.style("opacity", 0).html("");
      }
      node.click();
      this.draw(node);
    });

    // add a circle for each node
    nodeEnter
      .append("circle")
      .attr("class", this.node_class_func)
      .attr("r", 1e-6);

    // add node label
    const this_object = this;
    nodeEnter.each(function (node) {
      d3_append_multiline_text(
        d3.select(this),
        this_object.node_label_func(node),
        FTDrawer.label_delimiter,
        "node-label"
      );
    });

    // UPDATE
    var nodeUpdate = nodeEnter.merge(node);

    // transition node to final coordinates
    nodeUpdate
      .transition()
      .duration(this.transition_duration())
      .attr("transform", (d) => "translate(" + d.x + "," + d.y + ")");

    // update node style
    nodeUpdate
      .select(".node circle")
      .attr("r", this.node_size_func)
      .attr("class", this.node_class_func)
      .attr("cursor", "pointer");

    // remove hidden nodes
    var nodeExit = node
      .exit()
      .transition()
      .duration(this.transition_duration())
      .attr("transform", (_) => "translate(" + source.x + "," + source.y + ")")
      .attr("visible", false)
      .remove();

    // animation: shrink hidden nodes
    nodeExit.select("circle").attr("r", 1e-6);

    // animation: hide hidden nodes' labels
    nodeExit.select("text").style("fill-opacity", 1e-6);

    // ****************** links section ***************************

    // Update the links...
    var link = this.g
      .selectAll("path." + this.link_css_class)
      .data(links, FTDrawer.make_unique_link_id);

    // Enter any new links at the parent's previous position.
    var linkEnter = link
      .enter()
      .insert("path", "g")
      .attr("class", this.link_css_class)
      .attr("d", (_) => {
        var o = {
          x: source.x0,
          y: source.y0,
        };
        return this.link_path_func(o, o);
      });

    // UPDATE
    var linkUpdate = linkEnter.merge(link);

    // Transition back to the parent element position
    linkUpdate
      .transition()
      .duration(this.transition_duration())
      .attr("d", (d) => this.link_path_func(d.source, d.target));

    // Remove any exiting links
    var linkExit = link
      .exit()
      .transition()
      .duration(this.transition_duration())
      .attr("d", (_) => {
        var o = {
          x: source.x,
          y: source.y,
        };
        return this.link_path_func(o, o);
      })
      .remove();

    // expanding a big subgraph moves the entire dag out of the screen
    // to prevent this, cancel any transformations in y-direction
    this.svg
      .transition()
      .duration(this.transition_duration())
      .call(
        this.zoom.transform,
        d3
          .zoomTransform(this.g.node())
          .translate(-(source.x - source.x0), -(source.y - source.y0))
      );

    // store current node positions for next transition
    nodes.forEach(function (d) {
      d.x0 = d.x;
      d.y0 = d.y;
    });
    
    // Re-enable tooltips after transition completes
    const drawer = this;
    setTimeout(() => {
      drawer._tooltips_enabled = true;
    }, this.transition_duration());
  }

  clear() {
    this.g.selectAll("*").remove();
  }
}

export default class FamilyTree extends FTDrawer {
  constructor(data, svg) {
    const ft_datahandler = new FTDataHandler(data);
    super(ft_datahandler, svg);
  }

  get root() {
    return this.ft_datahandler.root;
  }

  draw_data(data) {
    var x0 = null,
      y0 = null;
    if (this.root !== null) {
      [x0, y0] = [this.root.x0, this.root.y0];
    } else {
      [x0, y0] = this.default_root_position();
    }
    this.ft_datahandler = new FTDataHandler(data);
    this.root.x0 = x0;
    this.root.y0 = y0;
    this.clear();
    this.draw();
  }
}
