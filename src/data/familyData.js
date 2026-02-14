/**
 * Family Tree Data - Nested Structure
 *
 * Rules:
 * - `spouse` defined inline = married into the family
 * - `spouse: { ref: "FamilyName.path.to.person" }` = from another founding family
 * - Children are nested arrays
 * - IDs and unions are computed automatically
 * - `gender: "M"` or `gender: "F"` for gender symbols (♂/♀)
 *
 * Symbols in names:
 * - * = Adopted or not biologically related
 * - 1/2 = From another marriage
 * - ~ = Passed away, year unknown
 * - ○ = Stillborn
 * - <-> = Divorced out of the family
 */

export const familyData = {
  // ============================================================
  // ROBINSON FAMILY
  // ============================================================
  Robinson: {
    founders: [
      {
        name: "Wilmer Robinson",
        gender: "M",
        birthyear: 1886,
        deathyear: 1975,
        imageLink: "/photos/Robinson/WilmerRobinson.jpg",
      },
      {
        name: "Elsie Robinson",
        gender: "F",
        birthyear: 1889,
        deathyear: 1962,
      },
    ],
    children: [
      {
        name: "Reva Robinson",
        birthyear: 1910,
        deathyear: 2007,
        gender: "F",
      },
      {
        name: "Russell Robinson",
        birthyear: 1913,
        deathyear: 1916,
        gender: "M",
      },
      {
        name: "Ray Robinson",
        birthyear: 1915,
        deathyear: 1916,
        gender: "M",
      },
      {
        name: "Carmel Robinson",
        gender: "M",
        birthyear: 1918,
        deathyear: 1998,
        birthplace: "Canfield, WV",
        deathplace: "Ravenswood, WV",
        profession: "Store Owner of Ben Franklin - Ripley, WV stores",
        militaryService: "US Navy WWII",
        imageLink: "/photos/Robinson/CarmelRobinson.jpg",
        spouse: {
          name: "Retha Robinson",
          gender: "F",
          birthyear: 1921,
          deathyear: 2000,
          profession: "Store Owner of Ben Franklin - Ripley, WV stores",
          imageLink: "/photos/Robinson/RethaRobinson.jpg",
          fromFamily: { ref: "Long.Spicy May Long" },
        },
        children: [
          {
            name: "James Clark Robinson",
            gender: "M",
            nickname: "Jim",
            birthyear: 1942,
            deathyear: 2025,
            birthplace: "Charleston, WV",
            deathplace: "Bridgeport, WV",
            profession:
              "Store Owner of Ben Franklin - Salem & Grantsville, WV stores",
            militaryService: "US Army - Vietnam War",
            imageLink: "/photos/Robinson/JimRobinson.jpg",
            spouse: { ref: "Davis.Sandra Robinson" },
            familyPhotos: [
              "/familyPhotos/robinson.jpg",
              "/familyPhotos/robinson2.jpg",
              "/familyPhotos/robinson3.jpg",
              "/familyPhotos/robinson4.jpg",
              "/familyPhotos/robinson5.jpg",
              "/familyPhotos/robinson6.jpg",
              "/familyPhotos/robinson7.jpg",
            ],
            children: [
              {
                name: "John Robinson",
                gender: "M",
                birthyear: 1966,
                profession: "Device Software Engineer",
                imageLink: "/photos/Robinson/JohnRobinson.jpg",
                spouse: { ref: "Royyuru.R.L.N. Sastry.Padma Robinson" },
                familyPhotos: ["/familyPhotos/johnrobinsonfam.jpg", "/familyPhotos/johnrobinsonfam2.jpg", "/familyPhotos/johnrobinsonfam3.jpg"],
                children: [
                  {
                    name: "Sita Robinson",
                    gender: "F",
                    birthyear: 1998,
                    birthplace: "Morgantown, WV",
                    profession: "Software Engineer",
                    imageLink: "/photos/Robinson/SitaRobinson.jpg",
                  },
                ],
              },
              {
                name: "James Clark II Robinson",
                gender: "M",
                nickname: "Clark",
                birthyear: 1969,
                imageLink: "/photos/Robinson/ClarkRobinson.jpg",
                spouse: {
                  name: "Jennifer Robinson",
                  gender: "F",
                  birthyear: 1970,
                  profession: "Psychologist",
                  imageLink: "/photos/Robinson/JenniferRobinson.jpg",
                  fromFamily: { ref: "Conant.Linda Conant" },
                  priorChildren: [
                    {
                      name: "Chelsea Bly ½",
                      gender: "F",
                      imageLink: "/photos/Bly/ChelseaBly.jpg",
                      spouse: { name: "Steven Bly", gender: "M" },
                      children: [
                        {
                          name: "Sawyer Bly",
                          gender: "M",
                          birthyear: 2018,
                          imageLink: "/photos/Bly/SawyerBly.jpg",
                        },
                        {
                          name: "Riley Bly",
                          gender: "M",
                          birthyear: 2019,
                          imageLink: "/photos/Bly/RileyBly.jpg",
                        },
                        {
                          name: "Declan Bly",
                          gender: "M",
                          birthyear: 2024,
                          imageLink: "/photos/Bly/DeclanBly.jpg",
                        },
                      ],
                    },
                  ],
                },
                children: [
                  {
                    name: "Lauren Johnson",
                    gender: "F",
                    birthyear: 1997,
                    profession: "Radiologist Technician",
                    imageLink: "/photos/Johnson/Lauren&KaydenJohnson.jpg",
                    spouse: {
                      name: "Kayden Johnson",
                      gender: "M",
                      imageLink: "/photos/Johnson/Lauren&KaydenJohnson.jpg",
                    },
                    children: [
                      {
                        name: "Oliver Johnson",
                        gender: "M",
                        birthyear: 2023,
                        imageLink: "/photos/Johnson/OliverJohnson.jpg",
                      },
                      {
                        name: "Theo Johnson",
                        gender: "M",
                        birthyear: 2025,
                        imageLink: "/photos/Johnson/TheoJohnson.jpg",
                      },
                    ],
                  },
                  {
                    name: "Elijah Robinson",
                    gender: "M",
                    birthyear: 2002,
                    imageLink: "/photos/Robinson/ElijahRobinson.jpg",
                  },
                  {
                    name: "Hannah Robinson",
                    gender: "F",
                    birthyear: 2005,
                    imageLink: "/photos/Robinson/HannahRobinson.jpg",
                    spouse: {
                      name: "Nick Anderson",
                      gender: "M",
                      imageLink: "/photos/Robinson/HannahRobinson.jpg",
                    },
                  },
                ],
              },
            ],
          },
          {
            name: "Ronald Robinson",
            nickname: "Ron",
            gender: "M",
            birthyear: 1947,
            imageLink: "/photos/Robinson/RonRobinson.jpg",
            spouse: {
              name: "Lois Kincaid ⟷",
              gender: "F",
              imageLink: "/photos/LoisKincaid.jpg",
            },
            children: [
              {
                name: "Jodie Gardill",
                gender: "F",
                birthyear: 1976,
                imageLink: "/photos/Gardill/JodieGardill.jpg",
                spouse: {
                  name: "Chris Gardill",
                  gender: "M",
                  imageLink: "/photos/Gardill/ChrisGardill.jpg",
                },
                children: [
                  {
                    name: "Kaleb Gardill",
                    gender: "M",
                    imageLink: "/photos/Gardill/KalebGardill.jpg",
                  },
                  {
                    name: "Brenna Gardill",
                    gender: "F",
                    imageLink: "/photos/Gardill/BrennaGardill.jpg",
                  },
                  {
                    name: "Darcie Gardill",
                    gender: "F",
                    imageLink: "/photos/Gardill/DarcieGardill.jpg",
                  },
                ],
              },
              {
                name: "Monica Hager",
                gender: "F",
                imageLink: "/photos/Hager/MonicaHager.jpg",
                spouse: {
                  name: "Jason Hager",
                  gender: "M",
                  imageLink: "/photos/Hager/JasonHager.jpg",
                },
                children: [
                  {
                    name: "Maddie Hager",
                    gender: "F",
                    birthyear: 2003,
                    imageLink: "/photos/Hager/MaddieHager.jpg",
                  },
                  {
                    name: "Marley Hager *",
                    gender: "F",
                    imageLink: "/photos/Hager/MarleyHager.jpg",
                  },
                  {
                    name: "Meghan Hager *",
                    gender: "F",
                    imageLink: "/photos/Hager/MeghanHager.jpg",
                  },
                ],
              },
            ],
          },
          {
            name: "Karma Jane ○",
            gender: "F",
            birthyear: 1952,
            deathyear: 1952,
          },
        ],
      },
      {
        name: "Gale Robinson",
        birthyear: 1922,
        deathyear: 2007,
        gender: "M",
      },
      {
        name: "Daisy Robinson",
        birthyear: 1923,
        deathyear: "unknown",
        gender: "F",
      },
      {
        name: "Wanda Robinson",
        birthyear: 1930,
        deathyear: 1934,
        gender: "F",
      },
    ],
  },

  // ============================================================
  // DAVIS FAMILY
  // ============================================================
  Davis: {
    founders: [
      {
        name: "Benjamin Franklin Davis",
        gender: "M",
        birthyear: 1880,
        deathyear: 1923,
        imageLink: "/photos/Davis/BenjaminFranklinDavis.jpg",
      },
      {
        name: "Cora Davis",
        gender: "F",
        birthyear: 1889,
        deathyear: 1958,
        imageLink: "/photos/Davis/CoraDavis.jpg",
        otherSpouses: [
          {
            name: "William Irons",
            gender: "M",
            birthyear: 1875,
            deathyear: 1947,
          },
        ],
      },
    ],
    children: [
      {
        name: "Dorothy May Davis",
        gender: "F",
        birthyear: 1915,
        deathyear: 1999,
      },
      {
        name: "Vance Davis",
        birthyear: 1912,
        deathyear: 1977,
        gender: "M",
      },
      {
        name: "Rex Davis",
        gender: "M",
        profession: "Farmer, Employee at Ohio Steel Tube Company",
        birthyear: 1909,
        deathyear: 1994,
        birthplace: "Salem, WV",
        deathplace: "Shelby, Ohio",
        militaryService: "US Army WWII - China Burma India Theatre",
        spouse: {
          name: "Wilma Davis",
          gender: "F",
          birthyear: 1915,
          deathyear: 2012,
          birthplace: "Salem, WV",
          deathplace: "Shelby, Ohio",
          imageLink: "/photos/Davis/WilmaDavis.jpg",
          fromFamily: { ref: "Furbee.Nellie Furbee" },
        },
        children: [
          {
            name: "Rebecca Davis",
            nickname: "Becky",
            gender: "F",
            birthyear: 1936,
            imageLink: "/photos/Davis/RebeccaDavis.jpg",
            spouse: { name: "George Davis", nickname: "Bud", gender: "M" },
            children: [
              { name: "Petie Davis ○", gender: "M" },
              { name: "Greg Davis", gender: "M" },
              { name: "Rodney Davis", gender: "M" },
              {
                name: "Jane Davis",
                gender: "F",
                imageLink: "/photos/Davis/JaneDavis.jpg",
                birthyear: 1970,
              },
              { name: "Kevin Davis", gender: "M" },
              {
                name: "Chris Davis",
                gender: "M",
                imageLink: "/photos/Davis/ChrisDavis.jpg",
              },
            ],
          },
          {
            name: "Ross Davis",
            gender: "M",
            birthyear: 1938,
            deathyear: 2008,
            birthplace: "Long Run, WV",
            deathplace: "Davisville, WV",
            profession: "Worked at Corning Glass",
            children: [
              {
                name: "Dave Davis",
                gender: "M",
                imageLink: "/photos/Davis/DaveDavis.jpg",
              },
              { name: "Mark Davis", gender: "M" },
            ],
          },
          {
            name: "Rex Davis",
            gender: "M",
            nickname: "Sonny",
            profession: "Teacher",
            imageLink: "/photos/Davis/SonnyDavis.jpg",
            children: [
              {
                name: "Brian Davis",
                gender: "M",
                profession: "Teacher",
                imageLink: "/photos/Davis/BrianDavis.jpg",
                spouse: { name: "Tina Davis", gender: "F" },
                children: [
                  {
                    name: "Hallie Davis",
                    gender: "F",
                    imageLink: "/photos/Davis/HallieDavis.jpg",
                  },
                  {
                    name: "Andrew Davis",
                    gender: "M",
                    imageLink: "/photos/Davis/AndrewDavis.jpg",
                  },
                  {
                    name: "Jessica Davis",
                    gender: "F",
                    imageLink: "/photos/Davis/JessDavis.jpg",
                  },
                ],
              },
              {
                name: "Stephen Davis",
                gender: "M",
                birthyear: 1971,
                imageLink: "/photos/Davis/StephenDavis.jpg",
                spouse: { name: "Julie Soltis ⟷", gender: "F" },
                children: [
                  {
                    name: "Emilee Schmetzer",
                    gender: "F",
                    imageLink: "/photos/Emilee&StevenSchmetzer.jpg",
                    spouse: {
                      name: "Steven Schmetzer",
                      gender: "M",
                      imageLink: "/photos/Emilee&StevenSchmetzer.jpg",
                    },
                  },
                  {
                    name: "Josh Davis",
                    gender: "M",
                    imageLink: "/photos/Davis/JoshDavis.jpg",
                  },
                ],
              },
            ],
          },
          {
            name: "Sandra Robinson",
            gender: "F",
            birthyear: 1944,
            deathyear: 2006,
            deathplace: "Salem, WV",
            profession:
              "Store Owner of Ben Franklin - Salem & Grantsville, WV stores",
            imageLink: "/photos/Robinson/SandraRobinson.jpg",
            // Married Jim Robinson - children listed under Robinson tree
          },

          {
            name: "Patricia Malov",
            nickname: "Patty",
            gender: "F",
            imageLink: "/photos/Malov/PattyMalov.jpg",
            spouse: {
              name: "Alex Malov",
              gender: "M",
              birthyear: 1952,
              deathyear: 2023,
              imageLink: "/photos/Malov/AlexMalov.jpg",
            },
          },

          {
            name: "Belinda Kamann",
            gender: "F",
            imageLink: "/photos/Kamann/BelindaKamann.jpg",
            spouse: {
              name: "Kevin Kamann *",
              gender: "M",
              imageLink: "/photos/Kamann/KevinKamann.jpg",
            },
            children: [
              {
                name: "Jared Kamann",
                gender: "M",
                imageLink: "/photos/Kamann/JaredKamann.jpg",
                children: [
                  {
                    name: "Tristan Kamann",
                    gender: "M",
                    imageLink: "/photos/Kamann/TristanKamann.jpg",
                  },
                  {
                    name: "Quinn Kamann",
                    gender: "F",
                    imageLink: "/photos/Kamann/QuinnKamann.jpg",
                  },
                  {
                    name: "Wyatt Kamann",
                    gender: "M",
                    imageLink: "/photos/Kamann/WyattKamann.jpg",
                  },
                  {
                    name: "Rhett Kamann",
                    gender: "M",
                    imageLink: "/photos/Kamann/RhettKamann.jpg",
                  },
                ],
              },
              {
                name: "Kurt Kamann",
                gender: "M",
                imageLink: "/photos/Kamann/KurtKamann.jpg",
              },
              {
                name: "Gabe Kamann",
                gender: "M",
                imageLink: "/photos/Kamann/GabeKamann.jpg",
              },
            ],
          },
        ],
      },
    ],
  },

  // ============================================================
  // ROYYURU FAMILY (R.L.N. Sarma lineage)
  // ============================================================
  Royyuru: {
    founders: [
      {
        name: "R.L.N. Sarma *",
        gender: "M",
        deathyear: "~",
      },
      {
        name: "R. Subbalakshmi",
        gender: "F",
        deathyear: "~",
      },
    ],
    children: [
      {
        name: "Venkateswari Parimi",
        gender: "F",
        deathyear: "unknown",
        children: [
          { name: "Umapathy", gender: "M" },
          { name: "P.L.N. Sarma", gender: "M" },
        ],
      },
      {
        name: "Dabbu's Dad",
        gender: "M",
        deathyear: "unknown",
        deathcause: "disappeared",
        children: [
          { name: "Pandu", gender: "F" },
          { name: "Baba", gender: "M" },
          { name: "Rohini", gender: "F", nickname: "Chinnamma" },
          { name: "Dabbu", gender: "M" },
        ],
      },
      {
        name: "R. Subramanium",
        gender: "M",
        deathyear: "unknown",
        children: [
          { name: "Subbalakshmi", gender: "F" },
          { name: "Nawab", gender: "M" },
          { name: "Chitti Babu", gender: "M" },
        ],
      },
      {
        name: "Suryanarayana Murthy",
        gender: "M",
        imageLink: "/photos/Royyuru/SuryanarayanaMurthy.jpg",
        deathyear: 2019,
        spouse: {
          name: "V Sesharathnam",
          gender: "F",
          imageLink: "/photos/Royyuru/Sesharathnam.jpg",
        },
        children: [
          {
            name: "Kameswari Parimi",
            gender: "F",
            spouse: { ref: "Royyuru.Venkateswari Parimi.P.L.N. Sarma" },
          },
          {
            name: "Dixit Royyuru",
            gender: "M",
            imageLink: "/photos/Royyuru/DixitRoyyuru.jpg",
            spouse: {
              name: "Asha Royyuru",
              gender: "F",
              imageLink: "/photos/Royyuru/AshaRoyyuru.jpg",
            },
            children: [
              {
                name: "Nikhil Dixit",
                gender: "M",
                imageLink: "/photos/Royyuru/NikhilRoyyuru.jpg",
                profession: "Finance (FP&A)",
              },
              {
                name: "Rohan Dixit",
                gender: "M",
                birthyear: 1998,
                imageLink: "/photos/Royyuru/RohanRoyyuru.jpg",
                profession: "CEO at MyWork",
              },
            ],
          },
          { name: "Sarma Royyuru", gender: "M" },
          {
            name: "Ajay Royyuru",
            gender: "M",
            birthyear: 1964,
            imageLink: "/photos/Royyuru/AjayRoyyuru.jpg",
            spouse: {
              name: "Nibedita Royyuru",
              gender: "F",
              birthyear: 1963,
              imageLink: "/photos/Royyuru/NibeditaRoyyuru.jpg",
            },
            children: [
              {
                name: "Aditya Royyuru",
                gender: "M",
                birthyear: 1993,
                imageLink: "/photos/Royyuru/AdityaRoyyuru.jpg",
                spouse: { name: "Ella Glover", gender: "F" },
              },
            ],
          },
          {
            name: "Vijay Royyuru",
            gender: "M",
            birthyear: 1964,
            imageLink: "/photos/Royyuru/VijayRoyyuru.jpg",
            spouse: {
              name: "Hema Royyuru",
              gender: "F",
              birthyear: 1961,
              imageLink: "/photos/Royyuru/HemaRoyyuru.jpg",
            },
            children: [
              {
                name: "Harsha Kawahara",
                gender: "F",
                birthyear: 1991,
                imageLink: "/photos/Kawahara/HarshaKawahara.jpg",
                spouse: {
                  name: "Alan Kawahara",
                  gender: "M",
                  birthyear: 1991,
                  imageLink: "/photos/Kawahara/AlanKawahara.jpg",
                },
              },
              {
                name: "Varun Royyuru",
                gender: "M",
                birthyear: 1998,
                imageLink: "/photos/Royyuru/VarunRoyyuru.jpg",
              },
            ],
          },
        ],
      },
      {
        name: "R.L.N. Sastry",
        gender: "M",
        deathyear: 2010,
        deathplace: "Hyderabad, India",
        imageLink: "/photos/Royyuru/RLNSastry.jpg",
        spouse: { ref: "Viswanadham.Sita Devi Royyuru" },
        familyPhotos: ["/familyPhotos/rlnsastryfam.jpg", "/familyPhotos/rlnsastryfam2.jpg", "/familyPhotos/rlnsastryfam3.jpg"],
        children: [
          {
            name: "Lakshminarayana Royyuru",
            gender: "M",
            nickname: "Sarma",
            birthyear: 1955,
            imageLink: "/photos/Royyuru/SarmaRoyyuru.jpg",
            spouse: {
              name: "Lakshmi Royyuru",
              gender: "F",
              imageLink: "/photos/Royyuru/LakshmiRoyyuru.jpg",
            },
            familyPhotos: ["/familyPhotos/lakshminarayanaroyyurufam.jpg"],
            children: [
              {
                name: "Avinash Royyuru",
                gender: "M",
                nickname: "Vinoo",
                imageLink: "/photos/Royyuru/AvinashRoyyuru.jpg",
                spouse: {
                  name: "Akanksha Mehta ⟷",
                  gender: "F",
                  imageLink: "/photos/AkankshaMehta.jpg",
                },
              },
              {
                name: "Shruti Royyuru",
                gender: "F",
                nickname: "Tara",
                imageLink: "/photos/Royyuru/TaraRoyyuru.jpg",
                spouse: {
                  name: "Sandeep Eyyuni",
                  gender: "M",
                  imageLink: "/photos/Eyyuni/SandeepEyyuni.jpg",
                },
                children: [
                  {
                    name: "Vimanyu Eyyuni",
                    gender: "M",
                    birthyear: 2025,
                    birthplace: "California",
                    imageLink: "/photos/Eyyuni/VimanyuEyyuni.jpg",
                  },
                ],
              },
            ],
          },
          {
            name: "Subba Hota",
            gender: "F",
            birthyear: 1958,
            imageLink: "/photos/Hota/SubbaHota.jpg",
            spouse: {
              name: "Ramarao Hota",
              gender: "M",
              birthyear: 1951,
              imageLink: "/photos/Hota/RamaraoHota.jpg",
            },
            children: [
              {
                name: "Pallavi Gudipati",
                gender: "F",
                birthyear: 1982,
                birthplace: "Morgantown, WV",
                imageLink: "/photos/Gudipati/PallaviGudipati.jpg",
                spouse: {
                  name: "Ravi Gudipati",
                  gender: "M",
                  imageLink: "/photos/Gudipati/RaviGudipati.jpg",
                },
                familyPhotos: ["/familyPhotos/gudipati.jpg"],
                children: [
                  {
                    name: "Sitara Gudipati",
                    gender: "F",
                    birthyear: 2012,
                    birthplace: "Cleveland, Ohio",
                    imageLink: "/photos/Gudipati/SitaraGudipati.jpg",
                  },
                  {
                    name: "Vishnu Gudipati",
                    gender: "M",
                    birthyear: 2015,
                    birthplace: "Cleveland, Ohio",
                    imageLink: "/photos/Gudipati/VishnuGudipati.jpg",
                  },
                ],
              },
              {
                name: "Partha Hota",
                gender: "M",
                birthyear: 1985,
                birthplace: "Morgantown, WV",
                profession: "Radiologist",
                imageLink: "/photos/Hota/ParthaHota.jpg",
                spouse: {
                  name: "Kristen Hota",
                  gender: "F",
                  imageLink: "/photos/Hota/KristenZuber.jpg",
                },
                familyPhotos: ["/familyPhotos/parthahotafam.jpg"],
                children: [
                  {
                    name: "Wilhelmina Hota",
                    gender: "F",
                    birthyear: 2025,
                    birthplace: "Philadelphia, PA",
                    imageLink: "/photos/Hota/WillaHota.jpg",
                  },
                ],
              },
            ],
          },
          {
            name: "Padma Robinson",
            gender: "F",
            birthyear: 1961,
            profession: "Director, Advanced Analytics",
            imageLink: "/photos/Robinson/PadmaRobinson.jpg",
            // Married John Robinson - children listed under Robinson tree
          },
        ],
      },
      {
        name: "Ammalu",
        gender: "F",
        deathyear: 2023,
        children: [
          { name: "Jyothi", gender: "F" },
          { name: "Babu Rao", gender: "M" },
          { name: "Rama", gender: "M" },
        ],
      },
    ],
  },

  // ============================================================
  // VISWANADHAM FAMILY (V.B.R. Sarma lineage)
  // ============================================================
  Viswanadham: {
    founders: [
      {
        name: "V.B.R. Sarma",
        gender: "M",
        deathyear: "~",
        profession: "Accountant",
      },
      {
        name: "V. Padmavathi",
        gender: "F",
        birthyear: 1914,
        deathyear: "~",
        fromFamily: { ref: "Evani.Sita Mahalakshmi Evani" }, // She came from the Evani family
      },
    ],
    familyPhotos: ["/familyPhotos/viswanadham.jpg"],
    children: [
      {
        name: "Ravikanta Chavali",
        gender: "F",
        deathyear: 2024,
        deathplace: "Chennai, India",
        imageLink: "/photos/Chavali/RavikantaChavali.jpg",
        children: [
          {
            name: "Neeru Palepu *",
            gender: "F",
            birthyear: 1966,
            imageLink: "/photos/Palepu/NeeruPalepu.jpg",
            spouse: {
              name: "Prasad Palepu",
              gender: "M",
              imageLink: "/photos/Palepu/PrasadPalepu.jpg",
            },
            children: [
              {
                name: "Anjana Palepu",
                gender: "F",
                imageLink: "/photos/Palepu/AnjanaPalepu.jpg",
                spouse: {
                  name: "Anjana's husband",
                  gender: "M",
                  imageLink: "/photos/Anjana'sHusband.jpg",
                },
              },
              {
                name: "Sneha Palepu",
                gender: "F",
                birthyear: 1992,
                imageLink: "/photos/Palepu/SnehaPalepu.jpg",
                spouse: {
                  name: "Sneha's husband",
                  gender: "M",
                  imageLink: "/photos/Sneha'sHusband.jpg",
                },
              },
              {
                name: "Nethra Palepu",
                gender: "F",
                profession: "Psychologist",
                imageLink: "/photos/Palepu/NethraPalepu.jpg",
                spouse: { name: "Nethra's husband", gender: "M" },
              },
            ],
          },
        ],
      },
      {
        name: "VVS Sastry",
        gender: "M",
        nickname: "Srini",
        birthyear: 1930,
        deathyear: 2012,
        birthplace: "Visakhapatnam, India",
        spouse: {
          name: "Sita Viswanadham",
          gender: "F",
          birthyear: 1935,
          birthplace: "Visakhapatnam, India",
          imageLink: "/photos/SitaViswanadham.jpg",
        },
        children: [
          {
            name: "V Bhaskar",
            gender: "M",
            nickname: "Bhanu",
            birthyear: 1966,
            birthplace: "New Delhi, India",
            imageLink: "/photos/BhanuViswanadham.jpg",
            spouse: {
              name: "Monica Viswanadham",
              gender: "F",
              deathyear: 2019,
              imageLink: "/photos/MonicaViswanadham.jpg",
            },
            children: [
              {
                name: "Mira Viswanadham",
                gender: "F",
                imageLink: "/photos/MiraViswanadham.jpg",
              },
            ],
          },
        ],
      },
      {
        name: "VV Sastry",
        gender: "M",
        nickname: "Raja",
        imageLink: "/photos/VVSastry.jpg",
        spouse: {
          name: "Lakshmi Viswanadham",
          gender: "F",
          imageLink: "/photos/LakshmiViswanadham.jpg",
        },
      },
      {
        name: "V Atchutaramaiah",
        gender: "M",
        birthyear: 1936,
        deathyear: 2015,
        imageLink: "/photos/VAtchutaramaiah.jpg",
        spouse: {
          name: "Kameswari Viswanatham",
          gender: "F",
          imageLink: "/photos/KameswariViswanatham.jpg",
        },
        children: [
          {
            name: "Padma Murthi",
            gender: "F",
            imageLink: "/photos/Murthi/PadmaMurthi.jpg",
            spouse: {
              name: "B.P.S. Murthi",
              gender: "M",
              profession: "Marketing Professor",
              imageLink: "/photos/Murthi/BPSMurthi.jpg",
            },
            children: [
              {
                name: "Dr. Shweta",
                gender: "F",
                imageLink: "/photos/Sweta.jpg",
                children: [
                  { name: "Kamya", gender: "F" },
                  { name: "Sweta's son", gender: "M" },
                ],
              },
            ],
          },
          {
            name: "Bhaskar Viswanatham",
            gender: "M",
            nickname: "Bujju",
            profession: "Chartered Accountant/Tax Consultant",
            imageLink: "/photos/BujjuViswanatham.jpg",
            spouse: {
              name: "Suchitra Viswanatham",
              gender: "F",
              imageLink: "/photos/SuchitraViswanatham.jpg",
            },
            children: [
              {
                name: "Aditya Viswanatham",
                gender: "M",
                profession: "Software Engineer",
                imageLink: "/photos/AdityaViswanatham.jpg",
                birthyear: 1999,
                spouse: { name: "Rukmini Viswanatham", gender: "F" },
              },
              {
                name: "Anandita Viswanatham",
                gender: "F",
                profession: "Doctor",
                imageLink: "/photos/AnanditaViswanatham.jpg",
              },
            ],
          },
          {
            name: "Sudha Dhara",
            gender: "F",
            imageLink: "/photos/Dhara/SudhaDhara.jpg",
            spouse: {
              name: "Narendra Dhara",
              gender: "M",
            },
            children: [
              {
                name: "Amulya Dhara *",
                gender: "F",
                imageLink: "/photos/Dhara/AmulyaDhara.jpg",
              },
            ],
          },
        ],
      },
      {
        name: "Sita Devi Royyuru",
        gender: "F",
        birthyear: 1938,
        deathyear: 1995,
        deathplace: "Hyderabad, India",
        imageLink: "/photos/Royyuru/SitaRoyyuru.jpg",
        // Married R.L.N. Sastry - children listed under Royyuru tree
      },
      {
        name: "V Prakasa Rao",
        gender: "M",
        birthyear: 1941,
        deathyear: 2024,
        deathplace: "Rajahmundry, India",
        imageLink: "/photos/Prakasa.jpg",
        children: [
          {
            name: "Prabha",
            gender: "M",
            spouse: { name: "Prabha's wife", gender: "F" },
            children: [
              { name: "Prabha's son", gender: "M" },
              { name: "Prabha's daughter", gender: "F" },
            ],
          },
          {
            name: "Krishna Rao VVS",
            gender: "M",
            spouse: { name: "Syamala Krishna", gender: "F" },
            imageLink: "/photos/KrishnaRaoVVS.jpg",
            children: [
              {
                name: "Anirudh",
                gender: "M",
                imageLink: "/photos/Anirudh.jpg",
              },
            ],
          },
        ],
      },
      {
        name: "Radha Yenamandra",
        gender: "F",
        deathyear: 1968,
        deathplace: "New Dehli, India",
        spouse: { name: "Dharma Rao", gender: "M" },
        children: [
          {
            name: "Neeru Palepu (* by Ravi dodda)",
            gender: "F",
            birthyear: 1966,
            imageLink: "/photos/Palepu/NeeruPalepu.jpg",
          },
        ],
      },
      {
        name: "Dr. Sastry",
        gender: "M",
        nickname: "Butchi",
        imageLink: "/photos/Butchi.jpg",
        spouse: {
          name: "Kameswari Viswanadham",
          imageLink: "/photos/KameswariViswanadham.jpg",
          gender: "F",
        },
        children: [
          {
            name: "Padmini Shanmugam",
            gender: "F",
            spouse: { name: "Dr Shanmugam", gender: "M" },
            imageLink: "/photos/PadminiShanmugam.jpg",
            children: [
              { name: "Padmini's son 1", gender: "M" },
              { name: "Padmini's son 2", gender: "M" },
            ],
          },
          {
            name: "Bhaskar Viswanadham",
            gender: "M",
            nickname: "Sunny",
            imageLink: "/photos/SunnyViswanadham.jpg",
          },
        ],
      },

      {
        name: "Durga Hari",
        gender: "F",
        birthyear: 1947,
        deathyear: 2025,
        imageLink: "/photos/Hari/DurgaHari.jpg",
        children: [
          {
            name: "Vinod Hari",
            gender: "M",
            spouse: {
              name: "Srividya Hari",
              gender: "F",
              imageLink: "/photos/Hari/SrividyaHari.jpg",
            },
            imageLink: "/photos/Hari/VinodHari.jpg",
            profession: "Banking & Financial Services",
            children: [
              {
                name: "Karthik Hari",
                gender: "M",
                imageLink: "/photos/Hari/KarthikHari.jpg",
              },
              {
                name: "Shanmukha Shaurya Hari",
                gender: "M",
                birthyear: 2014,
                imageLink: "/photos/Hari/ShanmukhaHari.jpg",
              },
            ],
          },
          {
            name: "Anant Hari",
            gender: "M",
            spouse: { name: "Pratyusha Hari", gender: "F" },
            imageLink: "/photos/Hari/AnantHari.jpg",
            children: [{ name: "Anant's son", gender: "M" }],
          },
        ],
      },
      {
        name: "V Sundaram",
        gender: "M",
        deathyear: "unknown",
        children: [
          {
            name: "Bhaskar Viswanadham",
            gender: "M",
            spouse: { name: "Jyoti", gender: "F" },
            nickname: "Bachee",
            deathyear: "2020",
            deathcause: "Covid-19",
            imageLink: "/photos/BacheeViswanadham.jpg",
            children: [
              {
                name: "Yashila",
                gender: "F",
                imageLink: "/photos/BacheeDaughter1.jpg",
              },
              {
                name: "Bachee's daughter 2",
                gender: "F",
                imageLink: "/photos/BacheeDaughter2.jpg",
              },
            ],
          },
          {
            name: "Sriram Viswanadham",
            gender: "M",
            spouse: { name: "Pavani", gender: "F" },
            deathyear: "2020",
            deathcause: "Covid-19",
            imageLink: "/photos/SriramViswanadham.jpg",
            children: [
              {
                name: "Sriram's daughter",
                gender: "F",
                imageLink: "/photos/Sriram'sDaughter.jpg",
              },
              {
                name: "Sriyan",
                gender: "M",
                imageLink: "/photos/Sriram'sSon.jpg",
              },
            ],
          },
        ],
      },
      {
        name: "V Pardhasaradhi",
        gender: "M",
        nickname: "Pardha",
        imageLink: "/photos/PardhasaradhiViswanadham.jpg",
        spouse: {
          name: "Annapurna Viswanadham",
          gender: "F",
          imageLink: "/photos/AnnapurnaViswanadham.jpg",
        },
        children: [
          {
            name: "Jitu Viswanadham",
            gender: "M",
            imageLink: "/photos/JituViswanadham.jpg",
            spouse: { name: "Jitu's wife", gender: "F" },
            children: [
              {
                name: "Aditya Viswanadham",
                gender: "M",
                imageLink: "/photos/AdityaViswanadham.jpg",
              },
            ],
          },
          {
            name: "Surendra Viswanadham",
            gender: "M",
            nickname: "Suri",
            imageLink: "/photos/SuriViswanadham.jpg",
            spouse: {
              name: "Aparna Viswanadham",
              gender: "F",
              imageLink: "/photos/AparnaViswanadham.jpg",
            },
            children: [
              {
                name: "Nandini Viswanadham",
                gender: "F",
                imageLink: "/photos/NandiniViswanadham.jpg",
              },
            ],
          },
        ],
      },

      {
        name: "Rajeshwari Chainulu",
        gender: "F",
        deathyear: "unknown",
        spouse: { name: "Dr. Chainulu", gender: "M" },
      },
    ],
  },

  // ============================================================
  // EVANI FAMILY (Ancestors - connects to Viswanadham via V. Padmavathi)
  // ============================================================
  Evani: {
    founders: [
      {
        name: "Sita Mahalakshmi Evani",
        gender: "F",
        imageLink: "/photos/Evani/SitaEvani.jpg",
        birthyear: 1888,
        deathyear: 1971,
      },
      {
        name: "Subbayya Sastry Evani",
        gender: "M",
        birthyear: 1884,
        deathyear: 1974,
      },
    ],
    children: [
      {
        name: "Lakshmi Narasimham Evani",
        gender: "M",
        birthyear: 1904,
        deathyear: 1976,
        spouse: { name: "Atchutam Evani", gender: "F", birthyear: 1919 },
        children: [
          {
            name: "Syamalarao Evani",
            gender: "M",
            nickname: "Syam",
            imageLink: "/photos/Evani/SyamalaraoEvani.jpg",
            birthplace: "Srikakulam, Andhra Pradesh, India",
            profession: "Research Scientist (Dow Chemical)",
            birthyear: 1928,
            deathyear: 2011,
            spouse: {
              name: "Veeramathi Evani",
              gender: "F",
              nickname: "Rama",
              imageLink: "/photos/Evani/VeeramathiEvani.jpg",
            },
            children: [
              {
                name: "Venkatarama Narasimham Evani",
                gender: "M",
                nickname: "Bobby",
                birthyear: 1960,
                imageLink: "/photos/Evani/BobbyEvani.jpg",
              },
              {
                name: "Lakshman Evani",
                gender: "M",
                nickname: "Lucky",
                imageLink: "/photos/Evani/LuckyEvani.jpg",
                birthyear: 1967,
              },
              {
                name: "Venu Gopala Sarma Evani",
                gender: "M",
                birthyear: 1974,
                imageLink: "/photos/Evani/VenuEvani.jpg",
                spouse: { name: "Monal Patel ⟷" },
                children: [
                  {
                    name: "Anjali Evani",
                    birthyear: "2009",
                    imageLink: "/photos/Evani/AnjaliEvani.jpg",
                  },
                ],
              },
            ],
          },
          {
            name: "Manikyamba Tenneti",
            gender: "F",
            birthyear: 1925,
            imageLink: "/photos/ManikyambaTenneti.jpg",
          },
          {
            name: "Subbaya Sastry Evani",
            gender: "M",
            nickname: "Sastry",
            spouse: { name: "Lakshmi Evani", gender: "F" },
            children: [
              {
                name: "Sastry Evani",
                gender: "M",
                birthyear: 1963,
                birthplace: "Kakinada, India",
                imageLink: "/photos/Evani/SastryEvani.jpg",
                spouse: {
                  name: "Jyothi Evani",
                  gender: "F",
                  imageLink: "/photos/Evani/JyothiEvani.jpg",
                },
                children: [
                  {
                    name: "Anjani Evani",
                    gender: "F",
                    birthyear: 2003,
                    imageLink: "/photos/Evani/AnjaniEvani.jpg",
                  },
                ],
              },
              {
                name: "Lakshmi Dalwalla",
                gender: "F",
                birthyear: 1965,
                birthplace: "Kakinada, India",
                imageLink: "/photos/Dalwalla/LakshmiDalwalla.jpg",
                spouse: {
                  name: "Paresh Dalwalla",
                  gender: "M",
                  birthyear: 1968,
                  imageLink: "/photos/Dalwalla/PareshDalwalla.jpg",
                },
                children: [
                  {
                    name: "Mitali Dalwalla",
                    gender: "F",
                    birthyear: 1999,
                    imageLink: "/photos/Dalwalla/MitaliDalwalla.jpg",
                  },
                ],
              },
              {
                name: "Satyakant Evani",
                gender: "M",
                nickname: "Purna",
                birthyear: 1971,
                birthplace: "Bokaro Steel City, India",
                imageLink: "/photos/Evani/SatyakantEvani.jpg",
                spouse: { name: "Lisa Evani", gender: "F" },
              },
            ],
          },
          {
            name: "Kameswara Sarma Evani",
            gender: "M",
            nickname: "Thambi",
            spouse: { name: "Lakshmi Evani", gender: "F" },
            children: [
              { name: "Ajaisimha Evani", gender: "M", nickname: "Ajai" },
            ],
          },
          {
            name: "Kameswari Kunapuli",
            gender: "F",
            spouse: { name: "KVS Suryanarayana", gender: "M" },
            nickname: "Papa",
            imageLink: "/photos/Kunapuli/KameswariKunapuli.jpg",
            children: [
              {
                name: "Saraswathi Jayanthy",
                gender: "F",
                nickname: "Achuta",
                birthyear: 1960,
                imageLink: "/photos/Achuta&Ramamurthy.jpg",
                spouse: {
                  name: "Ramamurthy J.V.",
                  gender: "M",
                  birthyear: 1953,
                  imageLink: "/photos/Achuta&Ramamurthy.jpg",
                },
                children: [
                  {
                    name: "Surya Jayanthy",
                    gender: "M",
                    nickname: "Karthik",
                    birthyear: 1985,
                    imageLink: "/photos/KarthikJayanthy.jpg",
                  },
                ],
              },
              {
                name: "Satya Kunapuli",
                gender: "M",
                nickname: "Babu",
                imageLink: "/photos/Kunapuli/SatyaKunapuli.jpg",
                spouse: {
                  name: "Suma Kunapuli",
                  gender: "F",
                  imageLink: "/photos/Kunapuli/SumaKunapuli.jpg",
                },
                children: [
                  {
                    name: "Shalini Kunapuli",
                    birthyear: 1998,
                    gender: "F",
                    imageLink: "/photos/Kunapuli/ShaliniKunapuli.jpg",
                  },
                  {
                    name: "Sangita Kunapuli",
                    birthyear: 2001,
                    gender: "F",
                    imageLink: "/photos/Kunapuli/SangitaKunapuli.jpg",
                  },
                ],
              },
            ],
          },
        ],
      },
      { name: "Subbaraya Sastry Evani", gender: "M" },
      {
        name: "Ramalingeswara Evani",
        gender: "M",
        imageLink: "/photos/Evani/RamalingeswaraEvani.jpg",
      },
      {
        name: "Annapoorna Bhagavatula",
        gender: "F",
        birthyear: 1906,
        deathyear: 1987,
        spouse: { name: "Subrahmaniam Bhagavatula", gender: "M" },
      },
      { name: "Janaki Mithipati", gender: "F", birthyear: 1915 },
      {
        name: "Mahalakshmi Gunupudi",
        gender: "F",
        birthyear: 1910,
        deathyear: 1975,
        children: [
          {
            name: "Nageswarao Gunupudi",
            gender: "M",
            children: [
              {
                name: "Pavan Gunupudi",
                gender: "M",
                imageLink: "/photos/Gunupudi/PavanGunupudi.jpg",
                spouse: {
                  name: "Sailaja Gunupudi",
                  gender: "F",
                  imageLink: "/photos/Gunupudi/SailajaGunupudi.jpg",
                },
                children: [
                  {
                    name: "Dhatri Gunupudi",
                    gender: "F",
                    imageLink: "/photos/Gunupudi/DhatriGunupudi.jpg",
                  },
                  {
                    name: "Maitri Gunupudi",
                    gender: "F",
                    imageLink: "/photos/Gunupudi/MaitriGunupudi.jpg",
                  },
                  {
                    name: "Keerti Gunupudi",
                    gender: "F",
                    imageLink: "/photos/Gunupudi/KeertiGunupudi.jpg",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        name: "Saraswathi Kunapuli",
        gender: "F",
        birthyear: 1912,
        spouse: {
          name: "Satyanarayana Kunapuli",
          gender: "M",
          birthyear: 1904,
        },
      },
      { name: "Kamala Malladi", gender: "F", birthyear: 1921, deathyear: 1977 },
      {
        name: "Subbalakshmi Gunturu",
        gender: "F",
        imageLink: "/photos/SubbalakshmiGunturu.jpg",
      },
      {
        name: "Prabhavathi Vuppuluri",
        gender: "F",
        deathyear: 2020,
        spouse: {
          name: "Kalidas Vuppuluri",
          gender: "M",
          imageLink: "/photos/Vuppuluri/KalidasVuppuluri.jpg",
        },
        children: [
          {
            name: "Madhu Vuppuluri",
            gender: "M",
            imageLink: "/photos/Vuppuluri/MadhuVuppuluri.jpg",
            spouse: {
              name: "Seeta Vuppuluri",
              gender: "F",
              nickname: "Baby",
              imageLink: "/photos/Vuppuluri/SeetaVuppuluri.jpg",
            },
            children: [
              {
                name: "Pratibha",
                gender: "F",
                imageLink: "/photos/Vuppuluri/PratibhaVuppuluri.jpg",
                spouse: {
                  name: "Philip Au",
                  gender: "M",
                  imageLink: "/photos/PhilipAu.jpg",
                },
                children: [
                  {
                    name: "Son 1",
                  },
                ],
              },
              {
                name: "Nima",
                gender: "F",
                imageLink: "/photos/Vuppuluri/NimaVuppuluri.jpg",
              },
            ],
          },
          {
            name: "Sita Sastry Bhagavatula",
            gender: "F",
            imageLink: "/photos/Bhagavatula/SitaSastryBhagavatula.jpg",
            children: [
              {
                name: "Sireesha Malviya",
                gender: "F",
                imageLink: "/photos/Malviya/SireeshaMalviya.jpg",
              },
              {
                name: "Kalyanram Bhagavatula",
                gender: "M",
                imageLink: "/photos/Bhagavatula/KalyanramBhagavatula.jpg",
              },
            ],
          },
          {
            name: "Subhash Vuppuluri",
            gender: "M",
            imageLink: "/photos/Vuppuluri/SubhashVuppuluri.jpg",
          },
        ],
      },
      {
        name: "Suryakantham Emani",
        gender: "F",
        imageLink: "/photos/Emani/SuryakanthamEmani.jpg",
        spouse: {
          name: "Venkateswarlu Emani",
          imageLink: "/photos/Emani/VenkateswarluEmani.jpg",
        },
        children: [
          {
            name: "Dr. Chandrika",
            gender: "F",
          },
          {
            name: "Suryakiron Emani",
            gender: "M",
            imageLink: "/photos/Emani/SuryakironEmani.jpg",
          },
        ],
      },
    ],
  },

  // ============================================================
  // FURBEE FAMILY (Ancestors - connects to Davis via Wilma Davis)
  // ============================================================

  Furbee: {
    founders: [
      {
        name: "Nellie Furbee",
        gender: "F",
        birthyear: 1885,
        deathyear: 1980,
      },
      {
        name: "Otis Furbee",
        gender: "M",
        birthyear: 1884,
        deathyear: 1965,
      },
    ],
    children: [
      {
        name: "Robert Furbee",
        nickname: "Bob",
        gender: "M",
        birthyear: 1908,
        deathyear: 1988,
        birthplace: "Salem, WV",
        deathplace: "Clarksburg, WV",
        spouse: { name: "Wavelene Davis", birthyear: 1912, deathyear: 1964 },
      },
      {
        name: "Augustus Furbee",
        nickname: "Dutch",
        gender: "M",
        birthyear: 1910,
        deathyear: 1986,
      },
      {
        name: "Edward Furbee",
        nickname: "Ed",
        gender: "M",
        birthyear: 1912,
        deathyear: 2011,
        imageLink: "/photos/Furbee/EdwardFurbee.jpg",
      },
      {
        name: "Otis Furbee Jr.",
        nickname: "Jinks",
        gender: "M",
        spouse: {
          name: "June Furbee",
        },
        children: [
          {
            name: "Ronald Furbee",
            nickname: "Ronnie",
            birthyear: 1943,
            deathyear: 2017,
            birthplace: "Salem, WV",
            deathplace: "Ravenswood, WV",
            imageLink: "/photos/Furbee/RonaldFurbee.jpg",
          },
          {
            name: "Charles Furbee",
            birthyear: 1947,
            deathyear: 2009,
            spouse: {
              name: "Connie Furbee",
            },
          },
          {
            name: "Nancy Phillips",
          },
          {
            name: "Beth Imperio",
            spouse: {
              name: "David Imperio",
              nickname: "Dave",
            },
          },
        ],
        birthyear: 1921,
        deathyear: 2014,
        imageLink: "/photos/Furbee/OtisJrFurbee.jpg",
      },
      {
        name: "Mary Furbee",
        gender: "F",
        birthyear: 1923,
        deathyear: 1993,
      },
    ],
  },

  Long: {
    founders: [
      {
        name: "Alfred Long",
      },
      {
        name: "Spicy May Long",
      },
    ],
    children: [
      {
        name: "Darwin Long",
        birthyear: 1923,
        deathyear: 1955,
      },
      {
        name: "Rena Long",
        birthyear: 1925,
        deathyear: 1992,
      },
    ],
  },

  Conant: {
    founders: [
      {
        name: "Dale Conant",
        imageLink: "/photos/Conant/DaleConant.jpg",
      },
      {
        name: "Linda Conant",
        imageLink: "/photos/Conant/LindaConant.jpg",
      },
    ],
    children: [
      {
        name: "Christine Landis",
        imageLink: "/photos/ChristineLandis.jpg",
      },
      {
        name: "Mandi Robinson",
        imageLink: "/photos/MandiRobinson.jpg",
      },
    ],
  },
};
