export const data = {
  start: "id4",
  persons: {
    id1: {
      id: "id1",
      name: "Carmel Robinson",
      own_unions: ["u1"],
    },
    id2: {
      id: "id2",
      name: "Reetha Robinson",
      own_unions: ["u1"],
    },
    id3: {
      id: "id3",
      name: "Jim Robinson",
      birthyear: 1942,
      own_unions: ["u3", "u4"],
      parent_union: "u1",
    },
    id4: {
      id: "id4",
      name: "Ron Robinson",
      birthyear: 1947,
      own_unions: ["u8"],
      parent_union: "u1",
    },
    id5: {
      id: "id5",
      name: "Sandra Robinson",
      own_unions: ["u3"],
      parent_union: "u2",
    },
    id6: {
      id: "id6",
      name: "Rex Davis",
      own_unions: ["u2"],
    },
    id7: {
      id: "id7",
      name: "Wilma Davis",
      own_unions: ["u2"],
    },
    id8: {
      id: "id8",
      name: "John Robinson",
      birthyear: 1966,
      own_unions: ["u5"],
      parent_union: "u3",
    },
    id9: {
      id: "id9",
      name: "Clark Robinson",
      birthyear: 1969,
      own_unions: ["u4"],
      parent_union: "u3",
    },
    id10: {
      id: "id10",
      name: "Lauren Johnson",
      birthyear: 1997,
      own_unions: ["u12"],
      parent_union: "u4",
    },
    id11: {
      id: "id11",
      name: "Elijah Robinson",
      birthyear: 2002,
      own_unions: [],
      parent_union: "u4",
    },
    id12: {
      id: "id12",
      name: "Hannah Robinson",
      birthyear: 2005,
      own_unions: [],
      parent_union: "u4",
    },
    id13: {
      id: "id13",
      name: "Sita Robinson",
      birthyear: 1998,
      own_unions: [],
      parent_union: "u5",
    },
    id14: {
      id: "id14",
      name: "Jennifer Robinson",
      birthyear: 1970,
      own_unions: ["u7"],
    },

    id15: {
      id: "id15",
      name: "Belinda Kamaan",
      own_unions: ["u6"],
      parent_union: "u2",
    },
    id16: {
      id: "id16",
      name: "Patty Malov",
      own_unions: ["u9"],
      parent_union: "u2",
    },
    id17: {
      id: "id17",
      name: "Becky",
      own_unions: ["u3"],
      parent_union: "u2",
    },
    id18: {
      id: "id18",
      name: "Kevin Kamaan",
      own_unions: [],
    },

    id19: {
      id: "id19",
      name: "Jared Kamaan",
      own_unions: [],
      parent_union: "u6",
    },
    id20: {
      id: "id20",
      name: "Kurt Kamaan",
      own_unions: [],
      parent_union: "u6",
    },
    id21: {
      id: "id21",
      name: "Gabe Kamaan",
      own_unions: [],
      parent_union: "u6",
    },
    id22: {
      id: "id22",
      name: "Padma Robinson",
      birthyear: 1961,
      own_unions: [],
    },

    id23: {
      id: "id23",
      name: "Chelsea Bly *",
      own_unions: [],
      parent_union: "u7",
    },

    id24: {
      id: "id24",
      name: "Lois Kincaid",
      own_unions: [],
    },

    id25: {
      id: "id25",
      name: "Jodie Gardill",
      birthyear: 1976,
      own_unions: ["u10"],
      parent_union: "u8",
    },

    id26: {
      id: "id26",
      name: "Monica Hager",
      own_unions: ["u11"],
      parent_union: "u8",
    },

    id27: {
      id: "id27",
      name: "Chris Gardill",
      own_unions: [],
    },

    id28: {
      id: "id28",
      name: "Jason Hager",
      own_unions: [],
    },

    id29: {
      id: "id29",
      name: "Maddie Hager",
      own_unions: [],
      parent_union: "u11",
    },
    id30: {
      id: "id30",
      name: "Marley Hager *",
      own_unions: [],
      parent_union: "u11",
    },

    id31: {
      id: "id31",
      name: "Meghan Hager *",
      own_unions: [],
      parent_union: "u11",
    },

    id32: {
      id: "id32",
      name: "Kaleb Gardill",
      own_unions: [],
      parent_union: "u10",
    },
    id33: {
      id: "id33",
      name: "Brenna Gardill",
      own_unions: [],
      parent_union: "u10",
    },

    id34: {
      id: "id34",
      name: "Darcie Gardill",
      own_unions: [],
      parent_union: "u10",
    },

    id35: {
      id: "id35",
      name: "Alex",
      own_unions: [],
    },

    id36: {
      id: "id36",
      name: "Kayden Johnson",
      own_unions: [],
    },
  },
  unions: {
    u1: {
      id: "u1",
      partner: ["id1", "id2"], //Carmel & Reetha
      children: ["id3", "id4"], //Ron and Jim
    },
    u2: {
      id: "u2",
      partner: ["id6", "id7"],
      children: ["id5", "id15", "id16", "id17"], //Sandra
    },
    u3: {
      id: "u3",
      partner: ["id3", "id5"],
      children: ["id8", "id9"], //John, Clark
    },
    u4: {
      id: "u4",
      partner: ["id14", "id9"], //Jennifer, Clark
      children: ["id10", "id11", "id12"],
    },
    u5: {
      id: "u5",
      partner: ["id8", "id22"], //John, Padma
      children: ["id13"],
    },
    u6: {
      id: "u6",
      partner: ["id15", "id18"], //Belinda, Kevin
      children: ["id19", "id20", "id21"],
    },

    u7: {
      id: "u7",
      partner: ["id14"], //Jennifer
      children: ["id23"], //Chelsea
    },

    u8: {
      id: "u8",
      partner: ["id4", "id24"], //Ron, Lois
      children: ["id25", "id26"],
    },

    u9: {
      id: "u9",
      partner: ["id16", "id35"], //Patty, Alex
      children: [],
    },

    u10: {
      id: "u10",
      partner: ["id25", "id27"], //Jodie and Chris
      children: ["id32", "id33", "id34"],
    },

    u11: {
      id: "u11",
      partner: ["id26", "id28"], //Monica and Jason
      children: ["id29", "id30", "id31"],
    },

    u12: {
      id: "u12",
      partner: ["id36", "id10"], //Lauren and Kayden
      children: [],
    },
  },
  links: [
    ["id1", "u1"],
    ["id2", "u1"],
    ["u1", "id3"],
    ["u1", "id4"],
    ["id6", "u2"],
    ["id7", "u2"],
    ["u2", "id5"],
    ["u2", "id15"],
    ["u2", "id16"],
    ["u2", "id17"],

    ["id3", "u3"],
    ["id5", "u3"],
    ["u3", "id8"],
    ["u3", "id9"],

    ["id14", "u4"],
    ["id9", "u4"],
    ["u4", "id10"],
    ["u4", "id11"],
    ["u4", "id12"],

    ["id8", "u5"],
    ["id22", "u5"],
    ["u5", "id13"],

    ["id15", "u6"],
    ["id18", "u6"],
    ["u6", "id19"],
    ["u6", "id20"],
    ["u6", "id21"],

    ["id14", "u7"],
    ["u7", "id23"],

    ["id4", "u8"],
    ["id24", "u8"],
    ["u8", "id25"],
    ["u8", "id26"],

    ["id16", "u9"],
    ["id35", "u9"],

    ["id25", "u10"],
    ["id27", "u10"],
    ["u10", "id32"],
    ["u10", "id33"],
    ["u10", "id34"],

    ["id26", "u11"],
    ["id28", "u11"],
    ["u11", "id29"],
    ["u11", "id30"],
    ["u11", "id31"],

    ["id36", "u12"],
    ["id10", "u12"],
  ],
};
