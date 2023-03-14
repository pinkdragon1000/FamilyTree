import { dagNode } from "./d3-dag.js";

import { Union } from "./Union.js";
import { FTNode } from "./FTNode.js";

export class Person extends FTNode {
  constructor(dagNode, data, ft_datahandler) {
    super(dagNode.id, data);
    // link to new object
    dagNode.ftnode = this;
    // define additional family tree properties
    this.ft_datahandler = ft_datahandler;
    this._children = dagNode.children;
    this.children = [];
    this._childLinkData = dagNode._childLinkData;
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
      .filter((node) => node !== undefined);
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
    return this.get_visible_parent_unions().length === 0;
  }

  is_union() {
    return false;
  }

  get_own_unions() {
    var unions = this.data.own_unions
      .map((id) => this.ft_datahandler.find_node_by_id(id))
      .filter((u) => u !== undefined);
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

  get_partners() {
    var partners = [];
    this.get_own_unions().forEach((u) => {
      partners.push(this.get_other_partner(u.data));
    });
    return partners.filter((p) => p !== undefined);
  }

  get_children() {
    var children = [];
    children = children.filter((c) => c !== undefined);
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
    // extend if there are uncollapsed neighbor unions
    if (this.is_extendable()) this.show();
    // collapse if fully extended
    else this.hide();
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
