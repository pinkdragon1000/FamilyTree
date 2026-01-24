import { image } from "d3";

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
    // ========================================
    // ROBINSON-DAVIS FAMILY BRANCH
    // ========================================

    // Union u1: Carmel & Retha Robinson
    id1: {
      name: "Carmel Robinson",
      birthyear: 1918,
      deathyear: 1998,
      own_unions: ["u1"],
      profession: "Store Owner of Ben Franklin - Ripley, WV stores",
      imageLink: "/photos/Robinson/CarmelRobinson.jpg"
    },
    id2: {
      name: "Retha Robinson",
      birthyear: 1921,
      deathyear: 2000,
      own_unions: ["u1"],
      profession: "Store Owner of Ben Franklin - Ripley, WV stores",
      imageLink: "/photos/Robinson/RethaRobinson.jpg"
    },
    // Children of u1
    id3: {
      name: "Jim Robinson",
      birthplace: "Charleston, WV",
      birthyear: 1942,
      deathyear: 2025,
      deathplace: "Bridgeport, WV",
      own_unions: ["u3"],
      parent_union: "u1",
      imageLink: "/photos/Robinson/JimRobinson.jpg",
      full: "James Clark",
      profession: "Store Owner of Ben Franklin - Salem & Grantsville, WV stores"
    },
    id4: {
      name: "Ron Robinson",
      birthyear: 1947,
      imageLink: "/photos/Robinson/RonRobinson.jpg",
      own_unions: ["u8"],
      parent_union: "u1",
    },
    id221: {
      name: "Karma Jane",
      birthyear: 1952,
      deathyear: 1952,
      own_unions: [],
      parent_union: "u1",
    },

    // Union u2: Rex & Wilma Davis
    id5: {
      name: "Rex Davis",
      own_unions: ["u2"],
      birthyear: 1909,
      deathyear: 1994,
    },
    id6: {
      name: "Wilma Davis",
      own_unions: ["u2"],
      birthyear: 1915,
      deathyear: 2012,
      imageLink: "/photos/Davis/WilmaDavis.jpg",
      birthplace: "Salem, WV",
      deathplace: "Willard, Ohio",
    },
    // Children of u2
    id7: {
      name: "Sandra Robinson",
      birthyear: 1944,
      deathyear: 2006,
      own_unions: ["u3"],
      parent_union: "u2",
      deathplace: "Salem, WV",
      imageLink: "/photos/Robinson/SandraRobinson.jpg",
      profession: "Store Owner of Ben Franklin - Salem & Grantsville, WV stores"
    },
    id15: {
      name: "Belinda Kamann",
      own_unions: ["u6"],
      parent_union: "u2",
      imageLink: "/photos/Kamann/BelindaKamann.jpg",
    },
    id16: {
      name: "Patty Malov",
      own_unions: ["u9"],
      parent_union: "u2",
      imageLink: "/photos/Malov/PattyMalov.jpg",
    },
    id17: {
      name: "Rebecca Davis",
      own_unions: ["u22"],
      parent_union: "u2",
      birthyear: 1936,
      imageLink: "/photos/Davis/RebeccaDavis.jpg",
    },
    id52: {
      name: "Ross Davis",
      birthyear: 1938,
      deathyear: 2008,
      birthplace: "Long Run, WV",
      deathplace: "Davisville, WV",
      own_unions: ["u23"],
      parent_union: "u2",
      profession: "Worked at Corning Glass"
    },
    id53: {
      name: "Rex Davis",
      nickname: "Sonny",
      own_unions: ["u19"],
      parent_union: "u2",
      imageLink: "/photos/Davis/SonnyDavis.jpg",
      profession: "Teacher"
    },

    // Union u3: Jim & Sandra Robinson
    // Children of u3
    id8: {
      name: "John Robinson",
      birthyear: 1966,
      own_unions: ["u5"],
      parent_union: "u3",
      profession: "Device Software Engineer",
      imageLink: "/photos/Robinson/JohnRobinson.jpg",
    },
    id9: {
      name: "Clark Robinson",
      birthyear: 1969,
      own_unions: ["u4"],
      parent_union: "u3",
      full: "James Clark II",
      imageLink: "/photos/Robinson/Clark&JenniferRobinson.jpg",
    },

    // Union u4: Clark & Jennifer Robinson
    id14: {
      name: "Jennifer Robinson",
      birthyear: 1970,
      own_unions: ["u7", "u4"],
      imageLink: "/photos/Robinson/Clark&JenniferRobinson.jpg",
    },
    // Children of u4
    id10: {
      name: "Lauren Johnson",
      birthyear: 1997,
      own_unions: ["u12"],
      parent_union: "u4",
      imageLink: "/photos/Johnson/Lauren&KaydenJohnson.jpg"
    },
    id11: {
      name: "Elijah Robinson",
      birthyear: 2002,
      own_unions: [],
      parent_union: "u4",
      imageLink: "/photos/Robinson/ElijahRobinson.jpg",
    },
    id12: {
      name: "Hannah Robinson",
      birthyear: 2005,
      own_unions: ["u77"],
      parent_union: "u4",
      imageLink: "/photos/Robinson/HannahRobinson.jpg",
    },

    // Union u77: Hannah & Nick Anderson
    id214: {
      name: "Nick Anderson",
      own_unions: ["u77"],
      imageLink: "/photos/Robinson/HannahRobinson.jpg",
    },

    // Union u5: John & Padma Robinson
    // Children of u5
    id13: {
      name: "Sita Robinson",
      birthyear: 1998,
      own_unions: [],
      parent_union: "u5",
      birthplace: "Morgantown, WV",
      imageLink: "/photos/Robinson/SitaRobinson.jpg",
      profession: "Software Engineer"
    },

    // Union u6: Belinda & Kevin Kamann
    id18: {
      name: "Kevin Kamann *",
      own_unions: ["u6"],
      imageLink: "/photos/Kamann/KevinKamann.jpg",
    },
    // Children of u6
    id19: {
      name: "Jared Kamann",
      own_unions: ["u50"],
      parent_union: "u6",
      imageLink: "/photos/Kamann/JaredKamann.jpg"
    },
    id20: {
      name: "Kurt Kamann",
      own_unions: [],
      parent_union: "u6",
      imageLink: "/photos/Kamann/KurtKamann.jpg"
    },
    id21: {
      name: "Gabe Kamann",
      own_unions: [],
      parent_union: "u6",
    },

    // Union u7: Jennifer's first marriage
    // Children of u7
    id23: {
      name: "Chelsea Bly ½",
      own_unions: ["u49"],
      parent_union: "u7",
      imageLink: "/photos/Bly/ChelseaBly.jpg",
    },


    // Union u49: Chelsea & Steven Bly
    id140: {
      name: "Steven Bly",
      own_unions: ["u49"],
    },
    // Children of u49
    id141: {
      name: "Sawyer Bly",
      own_unions: [],
      parent_union: "u49",
      birthyear: 2018,
      imageLink: "/photos/Bly/SawyerBly.jpg",
    },
    id142: {
      name: "Riley Bly",
      own_unions: [],
      parent_union: "u49",
      birthyear: 2019,
      imageLink: "/photos/Bly/RileyBly.jpg",
    },
    id210: {
      name: "Declan Bly",
      parent_union: "u49",
      own_unions: [],
      birthyear: 2024,
      imageLink: "/photos/Bly/DeclanBly.jpg",
    },


    // Union u12: Lauren & Kayden Johnson
    id36: {
      name: "Kayden Johnson",
      own_unions: ["u12"],
      imageLink: "/photos/Johnson/Lauren&KaydenJohnson.jpg"
    },
    // Children of u12
    id143: {
      name: "Oliver Johnson",
      own_unions: [],
      parent_union: "u12",
      birthyear: 2023,
      imageLink: "/photos/Johnson/OliverJohnson.jpg"
    },
    id220: {
      name: "Theo Johnson",
      own_unions: [],
      parent_union: "u12",
      birthyear: 2025,
      imageLink: "/photos/Johnson/TheoJohnson.jpg"
    },


    // Union u8: Ron & Lois Robinson
    id24: {
      name: "Lois Kincaid ⟷",
      own_unions: ["u8"],
      imageLink: "/photos/LoisKincaid.jpg"
    },
    // Children of u8
    id25: {
      name: "Jodie Gardill",
      birthyear: 1976,
      own_unions: ["u10"],
      parent_union: "u8",
      imageLink: "/photos/Gardill/JodieGardill.jpg"
    },
    id26: {
      name: "Monica Hager",
      own_unions: ["u11"],
      parent_union: "u8",
      imageLink: "/photos/Hager/MonicaHager.jpg",
    },

    // Union u9: Patty & Alex Malov
    id35: {
      name: "Alex Malov",
      birthyear: 1952,
      deathyear: 2023,
      own_unions: ["u9"],
      imageLink: "/photos/Malov/AlexMalov.jpg"
    },

    // Union u10: Jodie & Chris Gardill
    id27: {
      name: "Chris Gardill",
      own_unions: ["u10"],
      imageLink: "/photos/Gardill/ChrisGardill.jpg"
    },
    // Children of u10
    id32: {
      name: "Kaleb Gardill",
      own_unions: [],
      parent_union: "u10",
      imageLink: "/photos/Gardill/KalebGardill.jpg"
    },
    id33: {
      name: "Brenna Gardill",
      own_unions: [],
      parent_union: "u10",
      imageLink: "/photos/Gardill/BrennaGardill.jpg"
    },
    id34: {
      name: "Darcie Gardill",
      own_unions: [],
      parent_union: "u10",
      imageLink: "/photos/Gardill/DarcieGardill.jpg"
    },

    // Union u11: Monica & Jason Hager
    id28: {
      name: "Jason Hager",
      own_unions: ["u11"],
      imageLink: "/photos/Hager/JasonHager.jpg"
    },
    // Children of u11
    id29: {
      name: "Maddie Hager",
      own_unions: [],
      parent_union: "u11",
      imageLink: "/photos/Hager/MaddieHager.jpg",
      birthyear: 2003
    },
    id30: {
      name: "Marley Hager *",
      own_unions: [],
      parent_union: "u11",
      imageLink: "/photos/Hager/MarleyHager.jpg",
    },
    id31: {
      name: "Meghan Hager *",
      own_unions: [],
      parent_union: "u11",
      imageLink: "/photos/Hager/MeghanHager.jpg"
    },
    // Union u19: Rex (Sonny) Davis
    // Children of u19
    id54: {
      name: "Brian Davis",
      own_unions: ["u21"],
      parent_union: "u19",
      imageLink: "/photos/Davis/BrianDavis.jpg",
      profession: "Teacher"
    },
    id55: {
      name: "Stephen Davis",
      own_unions: ["u20"],
      parent_union: "u19",
      birthyear: "1971",
      imageLink: "/photos/Davis/StephenDavis.jpg",
    },

    // Union u20: Stephen & Julie Davis
    id56: {
      name: "Julie Soltis ⟷",
      own_unions: ["u20"],
    },
    // Children of u20
    id57: {
      name: "Emilee Schmetzer",
      own_unions: ["u76"],
      parent_union: "u20",
      imageLink: "/photos/Emilee&StevenSchmetzer.jpg",
    },
    id58: {
      name: "Josh Davis",
      own_unions: [],
      parent_union: "u20",
      imageLink: "/photos/Davis/JoshDavis.jpg",
    },

    // Union u76: Emilee & Steven Schmetzer
    id213: {
      name: "Steven Schmetzer",
      own_unions: ["u76"],
      imageLink: "/photos/Emilee&StevenSchmetzer.jpg",
    },

    // Union u21: Brian & Tina Davis
    id59: {
      name: "Tina Davis",
      own_unions: ["u21"],
    },
    // Children of u21
    id60: {
      name: "Hallie Davis",
      own_unions: [],
      parent_union: "u21",
      imageLink: "/photos/Davis/HallieDavis.jpg",
    },
    id61: {
      name: "Andrew Davis",
      own_unions: [],
      parent_union: "u21",
      imageLink: "/photos/Davis/AndrewDavis.jpg",
    },
    id62: {
      name: "Jessica Davis",
      own_unions: [],
      parent_union: "u21",
      imageLink: "/photos/Davis/JessDavis.jpg",
    },

    // Union u22: Rebecca Davis
    // Children of u22
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
    id218: {
      name: "Chris Davis",
      own_unions: [],
      parent_union: "u22",
      imageLink: "/photos/Davis/ChrisDavis.jpg",
    },

    // Union u23: Ross Davis
    // Children of u23
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

    // Union u50: Jared Kamann
    // Children of u50
    id144: {
      name: "Tristan Kamann",
      own_unions: [],
      parent_union: "u50",
      imageLink: "/photos/Kamann/TristanKamann.jpg"
    },
    id145: {
      name: "Quinn Kamann",
      own_unions: [],
      parent_union: "u50",
      imageLink: "/photos/Kamann/QuinnKamann.jpg"
    },
    id146: {
      name: "Wyatt Kamann",
      own_unions: [],
      parent_union: "u50",
      imageLink: "/photos/Kamann/WyattKamann.jpg"
    },
    id147: {
      name: "Rhett Kamann",
      own_unions: [],
      parent_union: "u50",
      imageLink: "/photos/Kamann/RhettKamann.jpg"
    },



    // ========================================
    // ROYYURU-SASTRY FAMILY BRANCH
    // ========================================

    // Union u28: R.L.N. Sarma & R. Subbalakshmi (Ancestors)
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
    // Children of u28
    id37: {
      name: "R.L.N. Sastry",
      own_unions: ["u13"],
      parent_union: "u28",
      deathyear: 2010,
      deathplace: "Hyderabad, India",
      imageLink: "/photos/Royyuru/RLNSastry.jpg",
    },
    id68: {
      name: "Suryanarayana Murthy",
      own_unions: ["u24"],
      parent_union: "u28",
      imageLink: "/photos/Royyuru/SuryanarayanaMurthy.jpg",
    },
    id124: {
      name: "R. Subramanium",
      own_unions: ["u44"],
      parent_union: "u28",
    },
    id127: {
      name: "Dabbu's Dad",
      own_unions: ["u45"],
      parent_union: "u28",
      deathyear: "unknown",
      deathcause: "disappeared",
    },
    id132: {
      name: "Venkateswari Parimi",
      own_unions: ["u46"],
      parent_union: "u28",
    },
    id135: {
      name: "Ammalu",
      deathyear: 2023,
      own_unions: ["u48"],
      parent_union: "u28",
    },

    // Union u31: V.B.R. Sarma & V. Padmavathi
    id84: {
      name: "V.B.R. Sarma",
      own_unions: ["u31"],
      deathyear: "~",
      profession: "Accountant"
    },
    id85: {
      name: "V. Padmavathi",
      own_unions: ["u31"],
      parent_union: "u63",
      deathyear: "~",
    },
    // Children of u31
    id38: {
      name: "Sita Devi Royyuru",
      own_unions: ["u13"],
      parent_union: "u31",
      deathyear: 1995,
      birthyear: 1938,
      deathplace: "Hyderabad, India",
      imageLink: "/photos/Royyuru/SitaRoyyuru.jpg",
    },
    id87: {
      name: "V Pardhasaradhi",
      nickname: "Pardha",
      own_unions: ["u32"],
      parent_union: "u31",
    },
    id95: {
      name: "VVS Sastry",
      nickname: "Srini",
      own_unions: ["u35"],
      parent_union: "u31",
      birthyear: "1930",
      birthplace: "Visakhapatnam, India",
    },
    id97: {
      name: "VV Sastry",
      nickname: "Raja",
      own_unions: [],
      parent_union: "u31",
    },
    id98: {
      name: "V Atchutaramaiah",
      own_unions: ["u36"],
      parent_union: "u31",
      birthyear: "1936",
    },
    id102: {
      name: "V Prakasa Rao",
      own_unions: ["u37"],
      parent_union: "u31",
      birthyear: "1941",
      deathplace: "Rajahmundry, India",
      deathyear: "2024",
      imageLink: '/photos/Prakasa.jpg'
    },
    id105: {
      name: "Dr. Sastry",
      nickname: "Butchi",
      own_unions: ["u38"],
      parent_union: "u31",
    },
    id108: {
      name: "V Sundaram",
      own_unions: ["u39"],
      parent_union: "u31",
    },
    id111: {
      name: "Ravikanta Chavali",
      own_unions: ["u40"],
      parent_union: "u31",
      deathplace: "Chennai, India",
      deathyear: "2024",
      imageLink: "/photos/Chavali/RavikantaChavali.jpg",
    },
    id117: {
      name: "Radha Yenamandra",
      own_unions: ["u42"],
      parent_union: "u31",
      deathyear: "1968",
    },
    id120: {
      name: "Durga Hari",
      own_unions: ["u43"],
      parent_union: "u31",
      birthyear: "1947",
      deathyear: "2025",
      imageLink: "/photos/Hari/DurgaHari.jpg"
    },
    id123: {
      name: "Rajeshwari Chainulu",
      own_unions: [],
      parent_union: "u31",
    },

    // Union u13: R.L.N. Sastry & Sita Devi Royyuru
    // Children of u13
    id40: {
      name: "Lakshminarayana Royyuru",
      birthyear: 1955,
      own_unions: ["u15"],
      parent_union: "u13",
      nickname: "Sarma",
      imageLink: "/photos/Royyuru/SarmaRoyyuru.jpg",
    },
    id39: {
      name: "Subba Hota",
      birthyear: 1958,
      own_unions: ["u14"],
      parent_union: "u13",
      imageLink: "/photos/Hota/SubbaHota.jpg"
    },
    id22: {
      name: "Padma Robinson",
      birthyear: 1961,
      own_unions: ["u5"],
      parent_union: "u13",
      imageLink: "/photos/Robinson/PadmaRobinson.jpg",
      profession: "Director, Advanced Analytics"
    },

    // Union u14: Subba & Ramarao Hota
    id41: {
      name: "Ramarao Hota",
      birthyear: 1951,
      own_unions: ["u14"],
      imageLink: "/photos/Hota/RamaraoHota.jpg"
    },
    // Children of u14
    id43: {
      name: "Pallavi Gudipati",
      birthyear: 1982,
      own_unions: ["u16"],
      parent_union: "u14",
      imageLink: "/photos/Gudipati/PallaviGudipati.jpg",
      birthplace: "Morgantown, WV",
    },
    id44: {
      name: "Partha Hota",
      birthyear: 1985,
      birthplace: "Morgantown, WV",
      imageLink: "/photos/Hota/ParthaHota.jpg",
      own_unions: ["u75"],
      parent_union: "u14",
      profession: "Radiologist"
    },

    // Union u15: Sarma & Lakshmi Royyuru
    id42: {
      name: "Lakshmi Royyuru",
      own_unions: ["u15"],
      imageLink: "/photos/Royyuru/LakshmiRoyyuru.jpg",
    },
    // Children of u15
    id45: {
      name: "Avinash Royyuru",
      own_unions: ["u18"],
      parent_union: "u15",
      imageLink: "/photos/Royyuru/AvinashRoyyuru.jpg",
    },
    id46: {
      name: "Shruti Royyuru",
      own_unions: ["u17"],
      parent_union: "u15",
      imageLink: "/photos/Royyuru/TaraRoyyuru.jpg"
    },

    // Union u16: Pallavi & Ravi Gudipati
    id47: {
      name: "Ravi Gudipati",
      own_unions: ["u16"],
      imageLink: "/photos/Gudipati/RaviGudipati.jpg",
    },
    // Children of u16
    id48: {
      name: "Sitara Gudipati",
      own_unions: [],
      parent_union: "u16",
      birthyear: 2012,
      birthplace: "Cleveland, Ohio",
      imageLink: "/photos/Gudipati/SitaraGudipati.jpg",
    },
    id49: {
      name: "Vishnu Gudipati",
      own_unions: [],
      parent_union: "u16",
      birthyear: 2015,
      birthplace: "Cleveland, Ohio",
      imageLink: "/photos/Gudipati/VishnuGudipati.jpg",
    },

    // Union u17: Shruti & Sandeep
    id50: {
      name: "Sandeep Eyyuni",
      own_unions: ["u17"],
      imageLink: "/photos/Eyyuni/SandeepEyyuni.jpg",
    },
    // Children of u17
    id215: {
      name: "Shruti's son",
      own_unions: [],
      parent_union: "u17",
      birthyear: 2025,
      birthplace: "California"
    },

    // Union u18: Avinash & Akanksha
    id51: {
      name: "Akanksha Mehta ⟷",
      own_unions: ["u18"],
    },

    // Union u75: Partha & Kristen Hota
    id211: {
      name: "Kristen Hota",
      own_unions: ["u75"],
      imageLink: "/photos/Hota/KristenZuber.jpg",
    },
    // Children of u75
    id212: {
      name: "Wilhelmina Hota",
      parent_union: "u75",
      birthyear: 2025,
      birthplace: "Philadelphia, PA",
      own_unions: [],
      imageLink: "/photos/Hota/WillaHota.jpg"
    },

    // Union u24: Suryanarayana Murthy & V Sesharathnam
    id67: {
      name: "V Sesharathnam",
      own_unions: ["u24"],
      imageLink: "/photos/Royyuru/Sesharathnam.jpg",
    },
    // Children of u24
    id69: {
      name: "Dixit Royyuru",
      own_unions: ["u25"],
      parent_union: "u24",
      imageLink: "/photos/Royyuru/DixitRoyyuru.jpg",
    },
    id70: {
      name: "Ajay Royyuru",
      own_unions: ["u26"],
      parent_union: "u24",
      birthyear: 1964,
      imageLink: "/photos/Royyuru/AjayRoyyuru.jpg",
    },
    id71: {
      name: "Vijay Royyuru",
      own_unions: ["u27"],
      parent_union: "u24",
      birthyear: 1964,
      imageLink: "/photos/Royyuru/VijayRoyyuru.jpg",
    },
    id81: {
      name: "Kameswari Parimi",
      own_unions: ["u47"],
      parent_union: "u24",
    },

    // Union u25: Dixit & Asha Royyuru
    id72: {
      name: "Asha Royyuru",
      own_unions: ["u25"],
      imageLink: "/photos/Royyuru/AshaRoyyuru.jpg",
    },
    // Children of u25
    id73: {
      name: "Nikhil Dixit",
      own_unions: [],
      parent_union: "u25",
      imageLink: "/photos/Royyuru/NikhilRoyyuru.jpg",
    },
    id74: {
      name: "Rohan Dixit",
      birthyear: 1998,
      own_unions: [],
      parent_union: "u25",
      imageLink: "/photos/Royyuru/RohanRoyyuru.jpg",
    },

    // Union u26: Ajay & Nibedita Royyuru
    id80: {
      name: "Nibedita Royyuru",
      own_unions: ["u26"],
      birthyear: 1963,
      imageLink: "/photos/Royyuru/NibeditaRoyyuru.jpg",
    },
    // Children of u26
    id79: {
      name: "Aditya Royyuru",
      own_unions: ["u30"],
      parent_union: "u26",
      birthyear: 1993,
      imageLink: "/photos/Royyuru/AdityaRoyyuru.jpg",
    },

    // Union u30: Aditya & Ella
    id86: {
      name: "Ella Glover",
      own_unions: ["u30"],
    },

    // Union u27: Vijay & Hema Royyuru
    id75: {
      name: "Hema Royyuru",
      own_unions: ["u27"],
      birthyear: 1961,
      imageLink: "/photos/Royyuru/HemaRoyyuru.jpg",
    },
    // Children of u27
    id76: {
      name: "Harsha Kawahara",
      own_unions: ["u29"],
      parent_union: "u27",
      birthyear: 1991,
      imageLink: "/photos/Kawahara/HarshaKawahara.jpg",
    },
    id77: {
      name: "Varun Royyuru",
      birthyear: 1998,
      own_unions: [],
      parent_union: "u27",
      imageLink: "/photos/Royyuru/VarunRoyyuru.jpg",
    },

    // Union u29: Harsha & Alan Kawahara
    id78: {
      name: "Alan Kawahara",
      own_unions: ["u29"],
      birthyear: 1991,
      imageLink: "/photos/Kawahara/AlanKawahara.jpg",
    },


    // Union u47: Kameswari & P.L.N. Sarma
    id134: {
      name: "P.L.N. Sarma",
      own_unions: ["u47"],
      parent_union: "u46",
    },

    // Union u32: V Pardha & Annapurna Viswanadham
    id88: {
      name: "Annapurna Viswanadham",
      own_unions: ["u32"],
    },
    // Children of u32
    id89: {
      name: "Surendra Viswanadham",
      nickname: "Suri",
      own_unions: ["u34"],
      parent_union: "u32",
      imageLink: "/photos/SuriViswanadham.jpg"
    },
    id90: {
      name: "Jitu Viswanadham",
      own_unions: ["u33"],
      parent_union: "u32",
      imageLink: "/photos/JituViswanadham.jpg"
    },

    // Union u33: Jitu & wife
    id91: {
      name: "Jitu's wife",
      own_unions: ["u33"],
    },
    // Children of u33
    id92: {
      name: "Aditya Viswanadham",
      own_unions: [],
      parent_union: "u33",
      imageLink: "/photos/AdityaViswanadham.jpg"
    },
    // Union u34: Suri & wife
    id93: {
      name: "Suri's wife",
      own_unions: ["u34"],
    },
    // Children of u34
    id94: {
      name: "Nandini Viswanadham",
      own_unions: [],
      parent_union: "u34",

    },

    // Union u35: VVS Sastry & Sita Viswanadham
    id139: {
      name: "Sita Viswanadham",
      own_unions: ["u35"],
      birthyear: "1935",
      birthplace: "Visakhapatnam, India",
      imageLink: "/photos/SitaViswanadham.jpg",
    },
    // Children of u35
    id96: {
      name: "V Bhaskar",
      nickname: "Bhanu",
      own_unions: ["u51"],
      parent_union: "u35",
      birthyear: "1966",
      birthplace: "New Delhi, India",
      imageLink: "/photos/BhanuViswanadham.jpg",
    },

    // Union u51: V Bhaskar & Monica
    id149: {
      name: "Monica Viswanadham",
      own_unions: ["u51"],
      deathyear: "2019",
      imageLink: "/photos/MonicaViswanadham.jpg",
    },
    // Children of u51
    id148: {
      name: "Mira Viswanadham",
      own_unions: [],
      parent_union: "u51",
      imageLink: "/photos/MiraViswanadham.jpg",
    },

    // Union u36: V Atchutaramaiah
    // Children of u36
    id99: {
      name: "Padma Murthi",
      own_unions: ["u53"],
      parent_union: "u36",
    },
    id100: {
      name: "Bhaskar Viswanatham",
      nickname: "Bujju",
      own_unions: ["u55"],
      parent_union: "u36",
      profession: "Chartered Accountant/Tax Consultant",
      imageLink: "/photos/BujjuViswanatham.jpg"
    },
    id101: {
      name: "Sudha Dhara",
      own_unions: ["u52"],
      parent_union: "u36",
      imageLink: "/photos/Dhara/SudhaDhara.jpg"
    },

    // Union u52: Sudha Dhara
    // Children of u52
    id150: {
      name: "Amulya Dhara *",
      own_unions: [],
      parent_union: "u52",
      imageLink: "/photos/Dhara/AmulyaDhara.jpg"
    },

    // Union u53: Padma Murthi
    // Children of u53
    id151: {
      name: "Sweta",
      own_unions: ["u54"],
      parent_union: "u53",
    },

    // Union u54: Sweta
    // Children of u54
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

    // Union u55: Bujju & Suchitra Viswanatham
    id217: {
      name: "Suchitra Viswanatham",
      own_unions: ["u55"],
    },
    // Children of u55
    id154: {
      name: "Anandita Viswanatham",
      own_unions: [],
      parent_union: "u55",
      profession: "Doctor",
      imageLink: "/photos/AnanditaViswanatham.jpg"
    },
    id155: {
      name: "Aditya Viswanatham",
      own_unions: ["u78"],
      parent_union: "u55",
      birthyear: "1999",
    },

    // Union u78: Aditya & Rukmini Viswanatham
    id216: {
      name: "Rukmini Viswanatham",
      own_unions: ["u78"],
    },

    // Union u37: V Prakasa Rao
    // Children of u37
    id103: {
      name: "Prabha",
      own_unions: ["u56"],
      parent_union: "u37",
    },
    id104: {
      name: "Krishna Rao VVS",
      own_unions: ["u57"],
      parent_union: "u37",
      imageLink: "/photos/KrishnaRaoVVS.jpg"
    },
    // Union u56: Prabha
    // Children of u56
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

    // Union u57: Krishna Rao VVS
    // Children of u57
    id158: {
      name: "Anirudh",
      own_unions: [],
      parent_union: "u57",
    },

    // Union u38: Dr. Sastry (Butchi)
    // Children of u38
    id106: {
      name: "Padmini Shanmugam",
      own_unions: ["u58"],
      parent_union: "u38",
      imageLink: "/photos/PadminiShanmugam.jpg"
    },
    id107: {
      name: "Sunny",
      own_unions: [],
      parent_union: "u38",
    },

    // Union u58: Padmini
    // Children of u58
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

    // Union u39: Sundu mavaiyya
    // Children of u39
    id109: {
      name: "Bhaskar",
      nickname: "Bachee",
      own_unions: ["u59"],
      parent_union: "u39",
      deathyear: "~",
      deathcause: "Covid-19",
      imageLink: "/photos/BacheeViswanadham.jpg"
    },
    id110: {
      name: "Sriram",
      own_unions: ["u60"],
      parent_union: "u39",
      deathyear: "~",
      deathcause: "Covid-19",
      imageLink: "/photos/SriramViswanadham.jpg"
    },

    // Union u59: Bhaskar (Bachee)
    // Children of u59
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

    // Union u60: Sriram
    // Children of u60
    id163: {
      name: "Sriram's son",
      own_unions: [],
      parent_union: "u60",
      imageLink: "/photos/Sriram'sSon.jpg"
    },
    id164: {
      name: "Sriram's daughter",
      own_unions: [],
      parent_union: "u60",
      imageLink: "/photos/Sriram'sDaughter.jpg"
    },

    // Union u40: Ravikanta Chavali
    // Children of u40
    id112: {
      name: "Neeru Palepu *",
      own_unions: ["u41"],
      parent_union: "u40",
      birthyear: "1966",
      imageLink: "/photos/Palepu/NeeruPalepu.jpg",
    },

    // Union u41: Neeru & Prasad Palepu
    id116: {
      name: "Prasad Palepu",
      own_unions: ["u41"],
    },
    // Children of u41
    id113: {
      name: "Anjana Palepu",
      own_unions: [],
      parent_union: "u41",
      imageLink: "/photos/Palepu/AnjanaPalepu.jpg",
    },
    id114: {
      name: "Sneha Palepu",
      own_unions: [],
      parent_union: "u41",
      imageLink: "/photos/Palepu/SnehaPalepu.jpg",
    },
    id115: {
      name: "Nethra Palepu",
      own_unions: [],
      parent_union: "u41",
      imageLink: "/photos/Palepu/NethraPalepu.jpg",
    },

    // Union u42: Radha & Dharma Rao
    id118: {
      name: "Dharma Rao",
      own_unions: ["u42"],
    },
    // Children of u42
    id119: {
      name: "Neeru Palepu (* by Ravi dodda)",
      own_unions: [],
      parent_union: "u42",
      birthyear: "1966",
    },

    // Union u43: Durga Hari
    // Children of u43
    id121: {
      name: "Anant Hari",
      own_unions: ["u61"],
      parent_union: "u43",
    },
    id122: {
      name: "Vinod Hari",
      own_unions: ["u62"],
      parent_union: "u43",
      imageLink: '/photos/Hari/VinodHari.jpg'
    },

    // Union u61: Anant Hari
    // Children of u61
    id165: {
      name: "Anant's son",
      own_unions: [],
      parent_union: "u61",
    },

    // Union u62: Vinod Hari
    // Children of u62
    id166: {
      name: "Karthik Hari",
      own_unions: [],
      imageLink: '/photos/Hari/KarthikHari.jpg',
      parent_union: "u62",
    },
    id167: {
      name: "Shanmukha Shaurya Hari",
      own_unions: [],
      parent_union: "u62",
      imageLink: '/photos/Hari/ShanmukhaHari.jpg',
      birthyear: 2014,
    },

    // Union u44: R. Subramanium
    // Children of u44
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

    // Union u45: Dabbu's Dad
    // Children of u45
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
      name: "Rohini",
      nickname: "Chinnamma",
      own_unions: [],
      parent_union: "u45",
    },
    id131: {
      name: "Dabbu",
      own_unions: [],
      parent_union: "u45",
    },

    // Union u46: Venkateswari Parimi
    // Children of u46
    id133: {
      name: "Umapathy",
      own_unions: [],
      parent_union: "u46",
    },

    // Union u48: Ammalu
    // Children of u48
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

    // ========================================
    // EVANI FAMILY BRANCH
    // ========================================

    // Union u63: Sita & Subbayya Sastry Evani (Ancestors)
    id168: {
      name: "Sita Evani",
      own_unions: ["u63"],
      imageLink: "/photos/Evani/SitaEvani.jpg",
    },
    id169: {
      name: "Subbayya Sastry Evani",
      own_unions: ["u63"],
    },
    // Children of u63
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
      imageLink: "/photos/Evani/RamalingeswaraEvani.jpg"
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
      imageLink: "/photos/SubbalakshmiGunturu.jpg"
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

    // Union u64: Annapoorna & Subrahmaniam Bhagavatula
    id181: {
      name: "Subrahmaniam Bhagavatula",
      own_unions: ["u64"],
    },

    // Union u65: Lakshmi Narasimham & Atchutam Evani
    id182: {
      name: "Atchutam Evani",
      own_unions: ["u65"],
      birthyear: "1919",
    },
    // Children of u65
    id183: {
      name: "Syamalarao Evani",
      nickname: "Syam",
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
      name: "Subbaya Sastry Evani",
      nickname: "Sastry",
      own_unions: ["u70"],
      parent_union: "u65",
    },
    id186: {
      name: "Kameswara Sarma Evani",
      nickname: "Thambi",
      own_unions: ["u69"],
      parent_union: "u65",
    },
    id187: {
      name: "Kameswari Kunapuli",
      nickname: "Papa",
      own_unions: ["u66"],
      parent_union: "u65",
      imageLink: '/photos/Kunapuli/KameswariKunapuli.jpg'
    },
    id219: {
      name: "Kameswari's Husband",
      own_unions: ["u66"],
    },

    // Union u66: Kameswari Kunapuli
    // Children of u66
    id188: {
      name: "Saraswathi Jayanthy",
      nickname: "Achuta",
      own_unions: ["u67"],
      parent_union: "u66",
      birthyear: "1960",
      imageLink: "/photos/Achuta&Ramamurthy.jpg"
    },
    id189: {
      name: "Satya Kunapuli",
      nickname: "Babu",
      own_unions: ["u68"],
      parent_union: "u66",
      imageLink: "/photos/Kunapuli/SatyaKunapuli.jpg",
    },

    // Union u67: Saraswathi & Ramamurthy Jayanthy
    id191: {
      name: "Ramamurthy J.V.",
      own_unions: ["u67"],
      birthyear: "1953",
      imageLink: "/photos/Achuta&Ramamurthy.jpg"
    },
    // Children of u67
    id190: {
      name: "Surya Jayanthy",
      own_unions: [],
      parent_union: "u67",
      birthyear: "1985",
      nickname: "Karthik",
      imageLink: "/photos/KarthikJayanthy.jpg"
    },

    // Union u68: Satya & Suma Kunapuli
    id194: {
      name: "Suma Kunapuli",
      own_unions: ["u68"],
      imageLink: "/photos/Kunapuli/SumaKunapuli.jpg"
    },
    // Children of u68
    id192: {
      name: "Shalini Kunapuli",
      own_unions: [],
      parent_union: "u68",
      imageLink: "/photos/Kunapuli/ShaliniKunapuli.jpg",
    },
    id193: {
      name: "Sangita Kunapuli",
      own_unions: [],
      parent_union: "u68",
      imageLink: "/photos/Kunapuli/SangitaKunapuli.jpg",
    },

    // Union u69: Kameswara Sarma & Lakshmi Evani
    id196: {
      name: "Lakshmi Evani",
      own_unions: ["u69"],
    },
    // Children of u69
    id195: {
      name: "Ajaisimha Evani",
      nickname: "Ajai",
      parent_union: "u69",
      own_unions: [],
    },

    // Union u70: Subbaya Sastry & Lakshmi Evani
    id197: {
      name: "Lakshmi Evani",
      own_unions: ["u70"],
    },
    // Children of u70
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
      imageLink: "/photos/Dalwalla/LakshmiDalwalla.jpg"
    },
    id200: {
      name: "Satyakant Evani",
      nickname: "Purna",
      parent_union: "u70",
      own_unions: ["u72"],
      birthplace: "Bokaro Steel City, India",
      birthyear: "1971",
    },

    // Union u71: Lakshmi & Paresh Dalwalla
    id202: {
      name: "Paresh Dalwalla",
      own_unions: ["u71"],
      birthyear: "1968",
      imageLink: "/photos/Dalwalla/PareshDalwalla.jpg"
    },
    // Children of u71
    id201: {
      name: "Mitali Dalwalla",
      parent_union: "u71",
      own_unions: [],
      birthyear: "1999",
      imageLink: "/photos/Dalwalla/MitaliDalwalla.jpg"
    },

    // Union u72: Satyakant & Lisa Evani
    id203: {
      name: "Lisa Evani",
      own_unions: ["u72"],
    },

    // Union u73: Sastry & Jyothi Evani
    id204: {
      name: "Jyothi Evani",
      own_unions: ["u73"],
    },
    // Children of u73
    id205: {
      name: "Anjani Evani",
      parent_union: "u73",
      own_unions: [],
      birthyear: "2003",
    },

    // Union u74: Syamalarao & Veeramathi Evani
    id206: {
      name: "Veeramathi Evani",
      nickname: "Rama",
      own_unions: ["u74"],
    },
    // Children of u74
    id207: {
      name: "Venkatarama Narasimham Evani",
      nickname: "Bobby",
      parent_union: "u74",
      own_unions: [],
      birthyear: "1960",
    },
    id208: {
      name: "Lakshman Evani",
      nickname: "Lucky",
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
  },
};

data.unions = getUnions();
data.links = getLinks();
