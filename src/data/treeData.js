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
      birthplace: "Charleston, WV",
      birthyear: 1942,
      deathyear: 2025,
      deathplace: "Salem, WV",
      own_unions: ["u3"],
      parent_union: "u1",
      full: "James Clark",
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
      deathyear: 1994,
    },
    id6: {
      name: "Wilma Davis",
      own_unions: ["u2"],
      birthyear: 1915,
      deathyear: 2012,
      imageLink: "/photos/WilmaDavis.jpg",
      birthplace: "Salem, WV",
      deathplace: "Willard, Ohio",
    },
    id7: {
      name: "Sandra Robinson",
      birthyear: 1944,
      deathyear: 2006,
      own_unions: ["u3"],
      parent_union: "u2",
      deathplace: "Salem, WV",
      deathcause: "Cancer - Multiple Myeloma",
    },
    id8: {
      name: "John Robinson",
      birthyear: 1966,
      own_unions: ["u5"],
      parent_union: "u3",
      imageLink: "/photos/Robinson/JohnRobinson.jpg",
    },
    id9: {
      name: "Clark Robinson",
      birthyear: 1969,
      own_unions: ["u4"],
      parent_union: "u3",
      full: "James Clark II",
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
      birthplace: "Morgantown, WV",
      imageLink: "/photos/Robinson/SitaRobinson.jpg",
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
      own_unions: ["u50"],
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
      imageLink: "/photos/Robinson/PadmaRobinson.jpg",
    },

    id23: {
      name: "Chelsea Bly *",
      own_unions: ["u49"],
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
      deathyear: 2023,
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
      deathyear: 2010,
      deathplace: "Hyderabad, India",
    },
    id38: {
      name: "Sita Devi Royyuru",
      own_unions: ["u13"],
      parent_union: "u31",
      deathyear: 1995,
      birthyear: 1938,
      deathplace: "Hyderabad, India",
    },
    id39: {
      name: "Subba Hota",
      birthyear: 1958,
      own_unions: ["u14"],
      parent_union: "u13",
    },
    id40: {
      name: "Sarma Royyuru",
      birthyear: 1955,
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
      birthplace: "Morgantown, WV",
    },
    id44: {
      name: "Partha Hota",
      birthyear: 1985,
      birthplace: "Morgantown, WV",
      own_unions: ["u75"],
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
      birthyear: 2012,
      birthplace: "Cleveland, Ohio",
    },
    id49: {
      name: "Vishnu Gudipati",
      own_unions: [],
      parent_union: "u16",
      birthyear: 2015,
      birthplace: "Cleveland, Ohio",
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
      name: "Julie Soltis ⟷",
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
      birthyear: 1964,
    },
    id71: {
      name: "Vijay Royyuru",
      own_unions: ["u27"],
      parent_union: "u24",
      birthyear: 1964,
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
      birthyear: 1961,
    },
    id76: {
      name: "Harsha Kawahara",
      own_unions: ["u29"],
      parent_union: "u27",
      birthyear: 1991,
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
      birthyear: 1991,
    },
    id79: {
      name: "Aditya Royyuru",
      own_unions: ["u30"],
      parent_union: "u26",
      birthyear: 1993,
    },
    id80: {
      name: "Nibedita Royyuru",
      own_unions: ["u26"],
      birthyear: 1963,
    },
    id81: {
      name: "Kameswari Parimi",
      own_unions: ["u47"],
      parent_union: "u24",
    },
    id82: {
      name: "R.L.N. Sarma *",
      own_unions: ["u28"],
      deathyear: "~",
    },
    id83: {
      name: "R. Subbalakshmi",
      own_unions: ["u28"],
      deathyear: "~",
    },
    id84: {
      name: "V.B.R. Sarma",
      own_unions: ["u31"],
      deathyear: "~",
    },
    id85: {
      name: "V. Padmavathi",
      own_unions: ["u31"],
      parent_union: "u63",
      deathyear: "~",
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
      name: "Aditya Viswanadham",
      own_unions: [],
      parent_union: "u33",
    },
    id93: {
      name: "Suri's wife",
      own_unions: ["u34"],
    },
    id94: {
      name: "Nandini Viswanadham",
      own_unions: [],
      parent_union: "u34",
    },
    id95: {
      name: "VVS Sastry (Srini)",
      own_unions: ["u35"],
      parent_union: "u31",
      birthyear: "1930",
      birthplace: "Visakhapatnam, India",
    },

    id96: {
      name: "V Bhaskar (Bhanu)",
      own_unions: ["u51"],
      parent_union: "u35",
      birthyear: "1966",
      birthplace: "New Delhi, India",
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
      birthyear: "1936",
    },

    id99: {
      name: "Padma Murthi",
      own_unions: ["u53"],
      parent_union: "u36",
    },

    id100: {
      name: "Bujju",
      own_unions: ["u55"],
      parent_union: "u36",
    },

    id101: {
      name: "Sudha Dhara",
      own_unions: ["u52"],
      parent_union: "u36",
    },
    id102: {
      name: "V Prakasa Rao",
      own_unions: ["u37"],
      parent_union: "u31",
      birthyear: "1941",
      deathplace: "Rajahmundry, India",
      deathyear: "2024",
    },

    id103: {
      name: "Prabha",
      own_unions: ["u56"],
      parent_union: "u37",
    },

    id104: {
      name: "Krishna Rao VVS",
      own_unions: ["u57"],
      parent_union: "u37",
    },
    id105: {
      name: "Dr. Sastry (Butchi)",
      own_unions: ["u38"],
      parent_union: "u31",
    },

    id106: {
      name: "Padmini",
      own_unions: ["u58"],
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
      own_unions: ["u59"],
      parent_union: "u39",
      deathyear: "~",
      deathcause: "Covid-19",
    },

    id110: {
      name: "Sriram",
      own_unions: ["u60"],
      parent_union: "u39",
      deathyear: "~",
      deathcause: "Covid-19",
    },

    id111: {
      name: "Ravikanta Chavali",
      own_unions: ["u40"],
      parent_union: "u31",
      deathplace: "Chennai, India",
      deathyear: "2024",
    },

    id112: {
      name: "Neeru Palepu *",
      own_unions: ["u41"],
      parent_union: "u40",
      birthyear: "1966",
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
      name: "Radha Yenamandra",
      own_unions: ["u42"],
      parent_union: "u31",
      deathyear: "1968",
    },

    id118: {
      name: "Dharma Rao",
      own_unions: ["u42"],
    },
    id119: {
      name: "Neeru Palepu (* by Ravi dodda)",
      own_unions: [],
      parent_union: "u42",
      birthyear: "1966",
    },
    id120: {
      name: "Durga Hari",
      own_unions: ["u43"],
      parent_union: "u31",
    },

    id121: {
      name: "Anant Hari",
      own_unions: ["u61"],
      parent_union: "u43",
    },

    id122: {
      name: "Vinod Hari",
      own_unions: ["u62"],
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
      deathyear: "unknown",
      deathcause: "disappeared",
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
      deathyear: 2023,
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
      birthyear: "1935",
      birthplace: "Visakhapatnam, India",
    },

    id140: {
      name: "Steven Bly",
      own_unions: ["u49"],
    },
    id141: {
      name: "Sawyer Bly",
      own_unions: [],
      parent_union: "u49",
      birthyear: 2018,
    },
    id142: {
      name: "Riley Bly",
      own_unions: [],
      parent_union: "u49",
      birthyear: 2019,
    },
    id143: {
      name: "Oliver Johnson",
      own_unions: [],
      parent_union: "u12",
      birthyear: 2023,
    },

    id144: {
      name: "Tristan Kamann",
      own_unions: [],
      parent_union: "u50",
    },

    id145: {
      name: "Quinn Kamann",
      own_unions: [],
      parent_union: "u50",
    },

    id146: {
      name: "Wyatt Kamann",
      own_unions: [],
      parent_union: "u50",
    },
    id147: {
      name: "Rhett Kamann",
      own_unions: [],
      parent_union: "u50",
    },
    id148: {
      name: "Mira Viswanadham",
      own_unions: [],
      parent_union: "u51",
    },
    id149: {
      name: "Monika Viswanadham",
      own_unions: ["u51"],
      deathyear: "~",
      deathcause: "Cancer - Breast",
    },
    id150: {
      name: "Amulya Dhara",
      own_unions: [],
      parent_union: "u52",
    },
    id151: {
      name: "Sweta",
      own_unions: ["u54"],
      parent_union: "u53",
    },
    id152: {
      name: "Kamya",
      own_unions: [],
      parent_union: "u54",
    },
    id153: {
      name: "Sweta's son",
      own_unions: [],
      parent_union: "u54",
    },
    id154: {
      name: "Anandita Viswanadham",
      own_unions: [],
      parent_union: "u55",
    },
    id155: {
      name: "Aditya Viswanatham",
      own_unions: [],
      parent_union: "u55",
    },
    id156: {
      name: "Prabha's son",
      own_unions: [],
      parent_union: "u56",
    },
    id157: {
      name: "Prabha's daughter",
      own_unions: [],
      parent_union: "u56",
    },
    id158: {
      name: "Anirudh",
      own_unions: [],
      parent_union: "u57",
    },
    id159: {
      name: "Padmini's son 1",
      own_unions: [],
      parent_union: "u58",
    },
    id160: {
      name: "Padmini's son 2",
      own_unions: [],
      parent_union: "u58",
    },

    id161: {
      name: "Bachee's daughter 1",
      own_unions: [],
      parent_union: "u59",
    },
    id162: {
      name: "Bachee's daughter 2",
      own_unions: [],
      parent_union: "u59",
    },

    id163: {
      name: "Sriram's son",
      own_unions: [],
      parent_union: "u60",
    },
    id164: {
      name: "Sriram's daughter",
      own_unions: [],
      parent_union: "u60",
    },
    id165: {
      name: "Anant's son",
      own_unions: [],
      parent_union: "u61",
    },
    id166: {
      name: "Karthik Hari",
      own_unions: [],
      parent_union: "u62",
    },
    id167: {
      name: "Shanmukha Shaurya Hari",
      own_unions: [],
      parent_union: "u62",
      birthyear: 2014,
    },
    id168: {
      name: "Sita Evani",
      own_unions: ["u63"],
    },
    id169: {
      name: "Subbayya Sastry Evani",
      own_unions: ["u63"],
    },
    id170: {
      name: "Lakshmi Narasimham Evani",
      own_unions: ["u65"],
      parent_union: "u63",
      birthyear: "1904",
      deathyear: "1976",
    },
    id171: {
      name: "Subbaraya Sastry Evani",
      own_unions: [],
      parent_union: "u63",
    },
    id172: {
      name: "Ramalingeswara Evani",
      own_unions: [],
      parent_union: "u63",
    },
    id173: {
      name: "Annapoorna Bhagavatula",
      own_unions: ["u64"],
      parent_union: "u63",
      birthyear: "1906",
      deathyear: "1987",
    },
    id174: {
      name: "Mahalakshmi Gunupudi",
      own_unions: [],
      parent_union: "u63",
    },
    id175: {
      name: "Janaki Mithipati",
      own_unions: [],
      parent_union: "u63",
    },
    id176: {
      name: "Saraswathi Kunapuli",
      own_unions: [],
      parent_union: "u63",
    },
    id177: {
      name: "Kamala Malladi",
      own_unions: [],
      parent_union: "u63",
    },
    id178: {
      name: "Subbalakshmi Gunturu",
      own_unions: [],
      parent_union: "u63",
    },
    id179: {
      name: "Prabhavathi Vuppuluri",
      own_unions: [],
      parent_union: "u63",
    },
    id180: {
      name: "Suryakantham Emani",
      own_unions: [],
      parent_union: "u63",
    },
    id181: {
      name: "Subrahmaniam Bhagavatula",
      own_unions: ["u64"],
    },
    id182: {
      name: "Atchutam Evani",
      own_unions: ["u65"],
      birthyear: "1919",
    },
    id183: {
      name: "Syamalarao Evani (Syam)",
      own_unions: ["u74"],
      parent_union: "u65",
      birthyear: "1928",
    },
    id184: {
      name: "Manikyamba Tenneti",
      own_unions: [],
      parent_union: "u65",
    },
    id185: {
      name: "Subbaya Sastry Evani (Sastry)",
      own_unions: ["u70"],
      parent_union: "u65",
    },
    id186: {
      name: "Kameswara Sarma Evani (Thambi)",
      own_unions: ["u69"],
      parent_union: "u65",
    },
    id187: {
      name: "Kameswari Kunapuli (Papa)",
      own_unions: ["u66"],
      parent_union: "u65",
    },
    id188: {
      name: "Saraswathi Jayanthy (Achuta)",
      own_unions: ["u67"],
      parent_union: "u66",
      birthyear: "1960",
    },
    id189: {
      name: "Satya Kunapuli (Babu)",
      own_unions: ["u68"],
      parent_union: "u66",
    },
    id190: {
      name: "Karthik Jayanthy",
      own_unions: [],
      parent_union: "u67",
      birthyear: "1985",
    },
    id191: {
      name: "Ramamurthy J.V.",
      own_unions: ["u67"],
      birthyear: "1953",
    },
    id192: {
      name: "Shalini Kunapuli",
      own_unions: [],
      parent_union: "u68",
    },
    id193: {
      name: "Sangita Kunapuli",
      own_unions: [],
      parent_union: "u68",
    },
    id194: {
      name: "Suma Kunapuli",
      own_unions: ["u68"],
    },

    id195: {
      name: "Ajaisimha Evani (Ajai)",
      parent_union: "u69",
      own_unions: [],
    },
    id196: {
      name: "Lakshmi Evani",
      own_unions: ["u69"],
    },
    id197: {
      name: "Lakshmi Evani",
      own_unions: ["u70"],
    },
    id198: {
      name: "Sastry Evani",
      parent_union: "u70",
      own_unions: ["u73"],
      birthplace: "Kakinada, India",
      birthyear: "1963",
    },
    id199: {
      name: "Lakshmi Dalwalla",
      parent_union: "u70",
      own_unions: ["u71"],
      birthplace: "Kakinada, India",
      birthyear: "1965",
    },
    id200: {
      name: "Satyakant Evani (Purna)",
      parent_union: "u70",
      own_unions: ["u72"],
      birthplace: "Bokaro Steel City, India",
      birthyear: "1971",
    },
    id201: {
      name: "Mitali Dalwalla",
      parent_union: "u71",
      own_unions: [],
      birthyear: "1999",
    },
    id202: {
      name: "Paresh Dalwalla",
      own_unions: ["u71"],
      birthyear: "1968",
    },
    id203: {
      name: "Lisa Evani",
      own_unions: ["u72"],
    },
    id204: {
      name: "Jyothi Evani",
      own_unions: ["u73"],
    },
    id205: {
      name: "Anjani Evani",
      parent_union: "u73",
      own_unions: [],
      birthyear: "2003",
    },
    id206: {
      name: "Veeramathi Evani (Rama)",
      own_unions: ["u74"],
    },

    id207: {
      name: "Venkatarama Narasimham Evani (Bobby)",
      parent_union: "u74",
      own_unions: [],
      birthyear: "1960",
    },
    id208: {
      name: "Lakshman Evani (Lucky)",
      parent_union: "u74",
      own_unions: [],
      birthyear: "1967",
    },
    id209: {
      name: "Venu Gopala Sarma Evani",
      parent_union: "u74",
      own_unions: [],
      birthyear: "1974",
    },
    id210: {
      name: "Declan Bly",
      parent_union: "u49",
      own_unions: [],
    },
    id211: {
      name: "Kristen Zuber (Hota)",
      own_unions: ["u75"],
    },

    id212: {
      name: "Wilhelmina Hota",
      parent_union: "u75",
      birthyear: 2025,
      birthplace: "Philadelphia, PA",
      own_unions: [],
    },
  },
};

data.unions = getUnions();
data.links = getLinks();
