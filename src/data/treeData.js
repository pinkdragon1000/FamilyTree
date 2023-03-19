const getLinks = () => {
  const links = [];
  for (const union in data.unions) {
    const currentUnion = data.unions[union];
    for (const partner of currentUnion.partner) {
      links.push([partner, union]);
    }
    for (const child of currentUnion.children) {
      links.push([union, child]);
    }
  }
  return links;
};

export const data = {
  start: "id1",
  persons: {
    id1: {
      name: "Carmel Robinson",
      birthyear: 1917,
      deathyear: 1998,
      own_unions: ["u1"],
    },
    id2: {
      name: "Reetha Robinson",
      birthyear: 1921,
      deathyear: 2000,
      own_unions: ["u1"],
    },
    id3: {
      name: "Jim Robinson",
      birthyear: 1942,
      own_unions: ["u3", "u4"],
      parent_union: "u1",
    },
    id4: {
      name: "Ron Robinson",
      birthyear: 1947,
      own_unions: ["u8"],
      parent_union: "u1",
    },
    id5: {
      name: "Sandra Robinson",
      birthyear: 1944,
      deathyear: 2006,
      own_unions: ["u3"],
      parent_union: "u2",
    },
    id6: {
      name: "Rex Davis",
      own_unions: ["u2"],
    },
    id7: {
      name: "Wilma Davis",
      own_unions: ["u2"],
    },
    id8: {
      name: "John Robinson",
      birthyear: 1966,
      own_unions: ["u5"],
      parent_union: "u3",
    },
    id9: {
      name: "Clark Robinson",
      birthyear: 1969,
      own_unions: ["u4"],
      parent_union: "u3",
    },
    id10: {
      name: "Lauren Johnson",
      birthyear: 1997,
      own_unions: ["u12"],
      parent_union: "u4",
    },
    id11: {
      name: "Elijah Robinson",
      birthyear: 2002,
      own_unions: [],
      parent_union: "u4",
    },
    id12: {
      name: "Hannah Robinson",
      birthyear: 2005,
      own_unions: [],
      parent_union: "u4",
    },
    id13: {
      name: "Sita Robinson",
      birthyear: 1998,
      own_unions: [],
      parent_union: "u5",
    },
    id14: {
      name: "Jennifer Robinson",
      birthyear: 1970,
      own_unions: ["u7", "u4"],
    },

    id15: {
      name: "Belinda Kamaan",
      own_unions: ["u6"],
      parent_union: "u2",
    },
    id16: {
      name: "Patty Malov",
      own_unions: ["u9"],
      parent_union: "u2",
    },
    id17: {
      name: "Becky",
      own_unions: ["u3"],
      parent_union: "u2",
    },
    id18: {
      name: "Kevin Kamaan",
      own_unions: [],
    },

    id19: {
      name: "Jared Kamaan",
      own_unions: [],
      parent_union: "u6",
    },
    id20: {
      name: "Kurt Kamaan",
      own_unions: [],
      parent_union: "u6",
    },
    id21: {
      name: "Gabe Kamaan",
      own_unions: [],
      parent_union: "u6",
    },
    id22: {
      name: "Padma Robinson",
      birthyear: 1961,
      own_unions: [],
      parent_union: "u13",
    },

    id23: {
      name: "Chelsea Bly *",
      own_unions: [],
      parent_union: "u7",
    },

    id24: {
      name: "Lois Kincaid",
      own_unions: [],
    },

    id25: {
      name: "Jodie Gardill",
      birthyear: 1976,
      own_unions: ["u10"],
      parent_union: "u8",
    },

    id26: {
      name: "Monica Hager",
      own_unions: ["u11"],
      parent_union: "u8",
    },

    id27: {
      name: "Chris Gardill",
      own_unions: [],
    },

    id28: {
      name: "Jason Hager",
      own_unions: [],
    },

    id29: {
      name: "Maddie Hager",
      own_unions: [],
      parent_union: "u11",
    },
    id30: {
      name: "Marley Hager *",
      own_unions: [],
      parent_union: "u11",
    },

    id31: {
      name: "Meghan Hager *",
      own_unions: [],
      parent_union: "u11",
    },

    id32: {
      name: "Kaleb Gardill",
      own_unions: [],
      parent_union: "u10",
    },
    id33: {
      name: "Brenna Gardill",
      own_unions: [],
      parent_union: "u10",
    },

    id34: {
      name: "Darcie Gardill",
      own_unions: [],
      parent_union: "u10",
    },

    id35: {
      name: "Alex Malov",
      own_unions: [],
    },

    id36: {
      name: "Kayden Johnson",
      own_unions: [],
    },

    id37: {
      name: "R.L.N. Sastry",
      own_unions: ["u13"],
    },
    id38: {
      name: "R Sita Royyuru",
      own_unions: ["u13"],
    },
    id39: {
      name: "Subba Hota",
      birthyear: 1958,
      own_unions: ["u14"],
      parent_union: "u13",
    },
    id40: {
      name: "Sarma",
      own_unions: ["u15"],
      parent_union: "u13",
    },
    id41: {
      name: "Ramarao Hota",
      birthyear: 1951,
      own_unions: ["u14"],
    },
    id42: {
      name: "Laxmi",
      own_unions: ["u15"],
    },
    id43: {
      name: "Pallavi Gudipati",
      birthyear: 1982,
      own_unions: ["u16"],
      parent_union: "u14",
    },
    id44: {
      name: "Partha Hota",
      own_unions: [],
      parent_union: "u14",
    },
    id45: {
      name: "Avinash Royyuru",
      own_unions: ["u18"],
      parent_union: "u15",
    },
    id46: {
      name: "Shruti Royyuru",
      own_unions: ["u17"],
      parent_union: "u15",
    },
    id47: {
      name: "Ravi Gudipati",
      own_unions: ["u16"],
    },
    id48: {
      name: "Sitara Gudipati",
      own_unions: [],
      parent_unions: "u16",
    },
    id49: {
      name: "Vishnu Gudipati",
      own_unions: [],
      parent_unions: "u16",
    },
    id50: {
      name: "Sandeep Eyunni",
      own_unions: ["u17"],
    },
    id51: {
      name: "Akanksha Mehta",
      own_unions: ["u18"],
    },
  },
  unions: {
    u1: {
      partner: ["id1", "id2"], //Carmel & Reetha
      children: ["id3", "id4"], //Ron and Jim
    },
    u2: {
      partner: ["id6", "id7"],
      children: ["id5", "id15", "id16", "id17"], //Sandra
    },
    u3: {
      partner: ["id3", "id5"],
      children: ["id8", "id9"], //John, Clark
    },
    u4: {
      partner: ["id14", "id9"], //Jennifer, Clark
      children: ["id10", "id11", "id12"],
    },
    u5: {
      partner: ["id8", "id22"], //John, Padma
      children: ["id13"],
    },
    u6: {
      partner: ["id15", "id18"], //Belinda, Kevin
      children: ["id19", "id20", "id21"],
    },
    u7: {
      partner: ["id14"], //Jennifer
      children: ["id23"], //Chelsea
    },
    u8: {
      partner: ["id4", "id24"], //Ron, Lois
      children: ["id25", "id26"],
    },
    u9: {
      partner: ["id16", "id35"], //Patty, Alex
      children: [],
    },
    u10: {
      partner: ["id25", "id27"], //Jodie and Chris
      children: ["id32", "id33", "id34"],
    },
    u11: {
      partner: ["id26", "id28"], //Monica and Jason
      children: ["id29", "id30", "id31"],
    },
    u12: {
      partner: ["id36", "id10"], //Lauren and Kayden
      children: [],
    },
    u13: {
      partner: ["id37", "id38"],
      children: ["id39", "id40", "id22"],
    },
    u14: {
      partner: ["id39", "id41"],
      children: ["id43", "id44"],
    },
    u15: {
      partner: ["id40", "id42"],
      children: ["id45", "id46"],
    },
    u16: {
      partner: ["id43", "id47"],
      children: ["id48", "id49"],
    },
    u17: {
      partner: ["id46", "id50"],
      children: [],
    },
    u18: {
      partner: ["id45", "id51"],
      children: [],
    },
  },
};

data.links = getLinks();
