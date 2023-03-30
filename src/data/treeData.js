const getUnions = () => {
  const unions = {};

  for (const union in data.persons) {
    const currentPerson = data.persons[union];
    for (const ownUnion of currentPerson.own_unions) {
      if (ownUnion in unions) {
        unions[ownUnion].partner.push(union);
      } else {
        unions[ownUnion] = { partner: [union], children: [] };
      }
    }
    if ("parent_union" in currentPerson) {
      const parentUnion = currentPerson.parent_union;
      if (parentUnion in unions) {
        unions[parentUnion].children.push(union);
      } else {
        unions[parentUnion] = { partner: [], children: [union] };
      }
    }
  }
  return unions;
};

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
      name: "Retha Robinson",
      birthyear: 1921,
      deathyear: 2000,
      own_unions: ["u1"],
    },
    id3: {
      name: "Jim Robinson",
      birthyear: 1942,
      own_unions: ["u3"],
      parent_union: "u1",
    },
    id4: {
      name: "Ron Robinson",
      birthyear: 1947,
      own_unions: ["u8"],
      parent_union: "u1",
    },
    id5: {
      name: "Rex Davis",
      own_unions: ["u2"],
    },
    id6: {
      name: "Wilma Davis",
      own_unions: ["u2"],
    },
    id7: {
      name: "Sandra Robinson",
      birthyear: 1944,
      deathyear: 2006,
      own_unions: ["u3"],
      parent_union: "u2",
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
      name: "Belinda Kamann",
      own_unions: ["u6"],
      parent_union: "u2",
    },
    id16: {
      name: "Patty Malov",
      own_unions: ["u9"],
      parent_union: "u2",
    },
    id17: {
      name: "Rebecca Davis",
      own_unions: ["u22"],
      parent_union: "u2",
    },
    id18: {
      name: "Kevin Kamann *",
      own_unions: ["u6"],
    },

    id19: {
      name: "Jared Kamann",
      own_unions: [],
      parent_union: "u6",
    },
    id20: {
      name: "Kurt Kamann",
      own_unions: [],
      parent_union: "u6",
    },
    id21: {
      name: "Gabe Kamann",
      own_unions: [],
      parent_union: "u6",
    },
    id22: {
      name: "Padma Robinson",
      birthyear: 1961,
      own_unions: ["u5"],
      parent_union: "u13",
    },

    id23: {
      name: "Chelsea Bly *",
      own_unions: [],
      parent_union: "u7",
    },

    id24: {
      name: "Lois Kincaid",
      own_unions: ["u8"],
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
      own_unions: ["u10"],
    },
    id28: {
      name: "Jason Hager",
      own_unions: ["u11"],
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
      own_unions: ["u9"],
    },

    id36: {
      name: "Kayden Johnson",
      own_unions: ["u12"],
    },

    id37: {
      name: "R.L.N. Sastry",
      own_unions: ["u13"],
      parent_union: "u28",
    },
    id38: {
      name: "Sita Devi Royyuru",
      own_unions: ["u13"],
      parent_union: "u31",
    },
    id39: {
      name: "Subba Hota",
      birthyear: 1958,
      own_unions: ["u14"],
      parent_union: "u13",
    },
    id40: {
      name: "Sarma Royyuru ",
      own_unions: ["u15"],
      parent_union: "u13",
      full: "Lakshminarayana",
    },
    id41: {
      name: "Ramarao Hota",
      birthyear: 1951,
      own_unions: ["u14"],
    },
    id42: {
      name: "Lakshmi Royyuru",
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
      parent_union: "u16",
    },
    id49: {
      name: "Vishnu Gudipati",
      own_unions: [],
      parent_union: "u16",
    },
    id50: {
      name: "Sandeep Eyyuni",
      own_unions: ["u17"],
    },
    id51: {
      name: "Akanksha Mehta",
      own_unions: ["u18"],
    },
    id52: {
      name: "Ross Davis",
      birthyear: 1938,
      deathyear: 2008,
      own_unions: ["u23"],
      parent_union: "u2",
    },
    id53: {
      name: "Rex (Sonny) Davis",
      own_unions: ["u19"],
      parent_union: "u2",
    },
    id54: {
      name: "Brian Davis",
      own_unions: ["u21"],
      parent_union: "u19",
    },

    id55: {
      name: "Steven Davis",
      own_unions: ["u20"],
      parent_union: "u19",
    },
    id56: {
      name: "Julie Soltis",
      own_unions: ["u20"],
    },
    id57: {
      name: "Emilee Davis",
      own_unions: [],
      parent_union: "u20",
    },
    id58: {
      name: "Josh Davis",
      own_unions: [],
      parent_union: "u20",
    },
    id59: {
      name: "Tina Davis",
      own_unions: ["u21"],
    },
    id60: {
      name: "Hallie Davis",
      own_unions: [],
      parent_union: "u21",
    },
    id61: {
      name: "Andrew Davis",
      own_unions: [],
      parent_union: "u21",
    },
    id62: {
      name: "Jessica Davis",
      own_unions: [],
      parent_union: "u21",
    },
    id63: {
      name: "Jane Davis",
      own_unions: [],
      parent_union: "u22",
    },
    id64: {
      name: "Kevin Davis",
      own_unions: [],
      parent_union: "u22",
    },
    id65: {
      name: "Dave Davis",
      own_unions: [],
      parent_union: "u23",
    },
    id66: {
      name: "Mark Davis",
      own_unions: [],
      parent_union: "u23",
    },
    id67: {
      name: "V Sesharathnam",
      own_unions: ["u24"],
    },
    id68: {
      name: "Suryanarayana Murthy",
      own_unions: ["u24"],
      parent_union: "u28",
    },
    id69: {
      name: "Dixit Royyuru",
      own_unions: ["u25"],
      parent_union: "u24",
    },
    id70: {
      name: "Ajay Royyuru",
      own_unions: ["u26"],
      parent_union: "u24",
    },
    id71: {
      name: "Vijay Royyuru",
      own_unions: ["u27"],
      parent_union: "u24",
    },
    id72: {
      name: "Asha Royyuru",
      own_unions: ["u25"],
    },
    id73: {
      name: "Nikhil Royyuru",
      own_unions: [],
      parent_union: "u25",
    },
    id74: {
      name: "Rohan Royyuru",
      birthyear: 1998,
      own_unions: [],
      parent_union: "u25",
    },
    id75: {
      name: "Hema Royyuru",
      own_unions: ["u27"],
    },
    id76: {
      name: "Harsha Kawahara",
      own_unions: ["u29"],
      parent_union: "u27",
    },
    id77: {
      name: "Varun Royyuru",
      birthyear: 1998,
      own_unions: [],
      parent_union: "u27",
    },
    id78: {
      name: "Alan Kawahara",
      own_unions: ["u29"],
    },
    id79: {
      name: "Aditya Royyuru",
      own_unions: ["u30"],
      parent_union: "u26",
    },
    id80: {
      name: "Nibedita Royyuru",
      own_unions: ["u26"],
    },
    id81: {
      name: "Kameswari Parimi",
      own_unions: ["u47"],
      parent_union: "u24",
    },
    id82: {
      name: "R.L.N. Sarma *",
      own_unions: ["u28"],
    },
    id83: {
      name: "R. Subbalakshmi",
      own_unions: ["u28"],
    },
    id84: {
      name: "V.B.R. Sarma",
      own_unions: ["u31"],
    },
    id85: {
      name: "V. Padmavathi",
      own_unions: ["u31"],
    },
    id86: {
      name: "Ella Glover",
      own_unions: ["u30"],
    },
    id87: {
      name: "V Pardha",
      own_unions: ["u32"],
      parent_union: "u31",
      full: "Pardhasaradhi",
    },
    id88: {
      name: "Annapurna Viswanadham",
      own_unions: ["u32"],
    },
    id89: {
      name: "Suri Viswanadham",
      own_unions: ["u34"],
      parent_union: "u32",
    },
    id90: {
      name: "Jitu Viswanadham",
      own_unions: ["u33"],
      parent_union: "u32",
    },
    id91: {
      name: "Jitu's wife",
      own_unions: ["u33"],
    },
    id92: {
      name: "Jitu's son",
      own_unions: [],
      parent_union: "u33",
    },
    id93: {
      name: "Suri's wife",
      own_unions: ["u34"],
    },
    id94: {
      name: "Suri's daughter",
      own_unions: [],
      parent_union: "u34",
    },
    id95: {
      name: "VVS Sastry (Srini)",
      own_unions: ["u35"],
      parent_union: "u31",
    },

    id96: {
      name: "V Bhaskar (Bhanu)",
      own_unions: [],
      parent_union: "u35",
    },

    id97: {
      name: "VV Sastry (Raja)",
      own_unions: [],
      parent_union: "u31",
    },

    id98: {
      name: "V Atchutaramaiah",
      own_unions: ["u36"],
      parent_union: "u31",
    },

    id99: {
      name: "Padma",
      own_unions: [],
      parent_union: "u36",
    },

    id100: {
      name: "Bujju",
      own_unions: [],
      parent_union: "u36",
    },

    id101: {
      name: "Suddha",
      own_unions: [],
      parent_union: "u36",
    },
    id102: {
      name: "V Prakasa Rao",
      own_unions: ["u37"],
      parent_union: "u31",
    },

    id103: {
      name: "Prabha",
      own_unions: [],
      parent_union: "u37",
    },

    id104: {
      name: "Krishna",
      own_unions: [],
      parent_union: "u37",
    },
    id105: {
      name: "Dr. Sastry (Butchi)",
      own_unions: ["u38"],
      parent_union: "u31",
    },

    id106: {
      name: "Padmini",
      own_unions: [],
      parent_union: "u38",
    },

    id107: {
      name: "Sunny",
      own_unions: [],
      parent_union: "u38",
    },

    id108: {
      name: "Sundu mavaiyya",
      own_unions: ["u39"],
      parent_union: "u31",
    },

    id109: {
      name: "Bhaskar (Bachee)",
      own_unions: [],
      parent_union: "u39",
    },

    id110: {
      name: "Sriram",
      own_unions: [],
      parent_union: "u39",
    },

    id111: {
      name: "Ravikanta Chavali",
      own_unions: ["u40"],
      parent_union: "u31",
    },

    id112: {
      name: "Neeru Palepu *",
      own_unions: ["u41"],
      parent_union: "u40",
    },

    id113: {
      name: "Anjana Palepu",
      own_unions: [],
      parent_union: "u41",
    },
    id114: {
      name: "Sneha Palepu",
      own_unions: [],
      parent_union: "u41",
    },

    id115: {
      name: "Nethra Palepu",
      own_unions: [],
      parent_union: "u41",
    },

    id116: {
      name: "Prasad Palepu",
      own_unions: ["u41"],
    },

    id117: {
      name: "Radha Pinni",
      own_unions: ["u42"],
      parent_union: "u31",
    },

    id118: {
      name: "Dharma Rao",
      own_unions: ["u42"],
    },
    id119: {
      name: "Neeru Palepu (* by Ravi dodda)",
      own_unions: [],
      parent_union: "u42",
    },
    id120: {
      name: "Durga Hari",
      own_unions: ["u43"],
      parent_union: "u31",
    },

    id121: {
      name: "Anant Hari",
      own_unions: [],
      parent_union: "u43",
    },

    id122: {
      name: "Vinod Hari",
      own_unions: [],
      parent_union: "u43",
    },

    id123: {
      name: "Rajeshwari Chainulu",
      own_unions: [],
      parent_union: "u31",
    },

    id124: {
      name: "R. Subramanium",
      own_unions: ["u44"],
      parent_union: "u28",
    },

    id125: {
      name: "Chitti Babu",
      own_unions: [],
      parent_union: "u44",
    },

    id126: {
      name: "Subbalakshmi",
      own_unions: [],
      parent_union: "u44",
    },

    id127: {
      name: "Dabbu's Dad",
      own_unions: ["u45"],
      parent_union: "u28",
    },

    id128: {
      name: "Baba",
      own_unions: [],
      parent_union: "u45",
    },

    id129: {
      name: "Pandu",
      own_unions: [],
      parent_union: "u45",
    },

    id130: {
      name: "Rohini (Chinnamma)",
      own_unions: [],
      parent_union: "u45",
    },
    id131: {
      name: "Dabbu",
      own_unions: [],
      parent_union: "u45",
    },

    id132: {
      name: "Venkateswari Parimi",
      own_unions: ["u46"],
      parent_union: "u28",
    },

    id133: {
      name: "Umapathy",
      own_unions: [],
      parent_union: "u46",
    },

    id134: {
      name: "P.L.N. Sarma",
      own_unions: ["u47"],
      parent_union: "u46",
    },

    id135: {
      name: "Ammalu",
      own_unions: ["u48"],
      parent_union: "u28",
    },

    id136: {
      name: "Jyothi",
      own_unions: [],
      parent_union: "u48",
    },
    id137: {
      name: "Babu Rao",
      own_unions: [],
      parent_union: "u48",
    },
    id138: {
      name: "Rama",
      own_unions: [],
      parent_union: "u48",
    },

    id139: {
      name: "Sita Viswanadham",
      own_unions: ["u35"],
    },
  },
};

data.unions = getUnions();
data.links = getLinks();
