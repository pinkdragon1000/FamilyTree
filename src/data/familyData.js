/**
 * Family Tree Data - Nested Structure
 *
 * Rules:
 * - `spouse` defined inline = married into the family
 * - `spouse: { ref: "FamilyName.path.to.person" }` = from another founding family
 * - Children are nested arrays
 * - IDs and unions are computed automatically
 *
 * Symbols in names:
 * - * = Adopted or not biologically related
 * - 1/2 = From another marriage
 * - ~ = Passed away, year unknown
 * - <-> = Divorced out of the family
 */

export const familyData = {
  // ============================================================
  // ROBINSON FAMILY
  // ============================================================
  Robinson: {
    founders: [
      {
        name: "Carmel Robinson",
        birthyear: 1918,
        deathyear: 1998,
        profession: "Store Owner of Ben Franklin - Ripley, WV stores",
        imageLink: "/photos/Robinson/CarmelRobinson.jpg"
      },
      {
        name: "Retha Robinson",
        birthyear: 1921,
        deathyear: 2000,
        profession: "Store Owner of Ben Franklin - Ripley, WV stores",
        imageLink: "/photos/Robinson/RethaRobinson.jpg"
      }
    ],
    children: [
      {
        name: "Jim Robinson",
        full: "James Clark",
        birthyear: 1942,
        deathyear: 2025,
        birthplace: "Charleston, WV",
        deathplace: "Bridgeport, WV",
        profession: "Store Owner of Ben Franklin - Salem & Grantsville, WV stores",
        imageLink: "/photos/Robinson/JimRobinson.jpg",
        spouse: { ref: "Davis.Sandra Robinson" },
        children: [
          {
            name: "John Robinson",
            birthyear: 1966,
            profession: "Device Software Engineer",
            imageLink: "/photos/Robinson/JohnRobinson.jpg",
            spouse: { ref: "Royyuru.R.L.N. Sastry.Padma Robinson" },
            children: [
              {
                name: "Sita Robinson",
                birthyear: 1998,
                birthplace: "Morgantown, WV",
                profession: "Software Engineer",
                imageLink: "/photos/Robinson/SitaRobinson.jpg"
              }
            ]
          },
          {
            name: "Clark Robinson",
            full: "James Clark II",
            birthyear: 1969,
            imageLink: "/photos/Robinson/Clark&JenniferRobinson.jpg",
            spouse: {
              name: "Jennifer Robinson",
              birthyear: 1970,
              imageLink: "/photos/Robinson/Clark&JenniferRobinson.jpg",
              priorChildren: [
                {
                  name: "Chelsea Bly ½",
                  imageLink: "/photos/Bly/ChelseaBly.jpg",
                  spouse: { name: "Steven Bly" },
                  children: [
                    { name: "Sawyer Bly", birthyear: 2018, imageLink: "/photos/Bly/SawyerBly.jpg" },
                    { name: "Riley Bly", birthyear: 2019, imageLink: "/photos/Bly/RileyBly.jpg" },
                    { name: "Declan Bly", birthyear: 2024, imageLink: "/photos/Bly/DeclanBly.jpg" }
                  ]
                }
              ]
            },
            children: [
              {
                name: "Lauren Johnson",
                birthyear: 1997,
                imageLink: "/photos/Johnson/Lauren&KaydenJohnson.jpg",
                spouse: { name: "Kayden Johnson", imageLink: "/photos/Johnson/Lauren&KaydenJohnson.jpg" },
                children: [
                  { name: "Oliver Johnson", birthyear: 2023, imageLink: "/photos/Johnson/OliverJohnson.jpg" },
                  { name: "Theo Johnson", birthyear: 2025, imageLink: "/photos/Johnson/TheoJohnson.jpg" }
                ]
              },
              {
                name: "Elijah Robinson",
                birthyear: 2002,
                imageLink: "/photos/Robinson/ElijahRobinson.jpg"
              },
              {
                name: "Hannah Robinson",
                birthyear: 2005,
                imageLink: "/photos/Robinson/HannahRobinson.jpg",
                spouse: { name: "Nick Anderson", imageLink: "/photos/Robinson/HannahRobinson.jpg" }
              }
            ]
          }
        ]
      },
      {
        name: "Ron Robinson",
        birthyear: 1947,
        imageLink: "/photos/Robinson/RonRobinson.jpg",
        spouse: { name: "Lois Kincaid ⟷", imageLink: "/photos/LoisKincaid.jpg" },
        children: [
          {
            name: "Jodie Gardill",
            birthyear: 1976,
            imageLink: "/photos/Gardill/JodieGardill.jpg",
            spouse: { name: "Chris Gardill", imageLink: "/photos/Gardill/ChrisGardill.jpg" },
            children: [
              { name: "Kaleb Gardill", imageLink: "/photos/Gardill/KalebGardill.jpg" },
              { name: "Brenna Gardill", imageLink: "/photos/Gardill/BrennaGardill.jpg" },
              { name: "Darcie Gardill", imageLink: "/photos/Gardill/DarcieGardill.jpg" }
            ]
          },
          {
            name: "Monica Hager",
            imageLink: "/photos/Hager/MonicaHager.jpg",
            spouse: { name: "Jason Hager", imageLink: "/photos/Hager/JasonHager.jpg" },
            children: [
              { name: "Maddie Hager", birthyear: 2003, imageLink: "/photos/Hager/MaddieHager.jpg" },
              { name: "Marley Hager *", imageLink: "/photos/Hager/MarleyHager.jpg" },
              { name: "Meghan Hager *", imageLink: "/photos/Hager/MeghanHager.jpg" }
            ]
          }
        ]
      },
      {
        name: "Karma Jane",
        birthyear: 1952,
        deathyear: 1952
      }
    ]
  },

  // ============================================================
  // DAVIS FAMILY
  // ============================================================
  Davis: {
    founders: [
      {
        name: "Rex Davis",
        birthyear: 1909,
        deathyear: 1994
      },
      {
        name: "Wilma Davis",
        birthyear: 1915,
        deathyear: 2012,
        birthplace: "Salem, WV",
        deathplace: "Willard, Ohio",
        imageLink: "/photos/Davis/WilmaDavis.jpg"
      }
    ],
    children: [
      {
        name: "Sandra Robinson",
        birthyear: 1944,
        deathyear: 2006,
        deathplace: "Salem, WV",
        profession: "Store Owner of Ben Franklin - Salem & Grantsville, WV stores",
        imageLink: "/photos/Robinson/SandraRobinson.jpg"
        // Married Jim Robinson - children listed under Robinson tree
      },
      {
        name: "Belinda Kamann",
        imageLink: "/photos/Kamann/BelindaKamann.jpg",
        spouse: { name: "Kevin Kamann *", imageLink: "/photos/Kamann/KevinKamann.jpg" },
        children: [
          {
            name: "Jared Kamann",
            imageLink: "/photos/Kamann/JaredKamann.jpg",
            children: [
              { name: "Tristan Kamann", imageLink: "/photos/Kamann/TristanKamann.jpg" },
              { name: "Quinn Kamann", imageLink: "/photos/Kamann/QuinnKamann.jpg" },
              { name: "Wyatt Kamann", imageLink: "/photos/Kamann/WyattKamann.jpg" },
              { name: "Rhett Kamann", imageLink: "/photos/Kamann/RhettKamann.jpg" }
            ]
          },
          { name: "Kurt Kamann", imageLink: "/photos/Kamann/KurtKamann.jpg" },
          { name: "Gabe Kamann" }
        ]
      },
      {
        name: "Patty Malov",
        imageLink: "/photos/Malov/PattyMalov.jpg",
        spouse: { name: "Alex Malov", birthyear: 1952, deathyear: 2023, imageLink: "/photos/Malov/AlexMalov.jpg" }
      },
      {
        name: "Rebecca Davis",
        birthyear: 1936,
        imageLink: "/photos/Davis/RebeccaDavis.jpg",
        children: [
          { name: "Jane Davis" },
          { name: "Kevin Davis" },
          { name: "Chris Davis", imageLink: "/photos/Davis/ChrisDavis.jpg" }
        ]
      },
      {
        name: "Ross Davis",
        birthyear: 1938,
        deathyear: 2008,
        birthplace: "Long Run, WV",
        deathplace: "Davisville, WV",
        profession: "Worked at Corning Glass",
        children: [
          { name: "Dave Davis" },
          { name: "Mark Davis" }
        ]
      },
      {
        name: "Rex Davis",
        nickname: "Sonny",
        profession: "Teacher",
        imageLink: "/photos/Davis/SonnyDavis.jpg",
        children: [
          {
            name: "Brian Davis",
            profession: "Teacher",
            imageLink: "/photos/Davis/BrianDavis.jpg",
            spouse: { name: "Tina Davis" },
            children: [
              { name: "Hallie Davis", imageLink: "/photos/Davis/HallieDavis.jpg" },
              { name: "Andrew Davis", imageLink: "/photos/Davis/AndrewDavis.jpg" },
              { name: "Jessica Davis", imageLink: "/photos/Davis/JessDavis.jpg" }
            ]
          },
          {
            name: "Stephen Davis",
            birthyear: 1971,
            imageLink: "/photos/Davis/StephenDavis.jpg",
            spouse: { name: "Julie Soltis ⟷" },
            children: [
              {
                name: "Emilee Schmetzer",
                imageLink: "/photos/Emilee&StevenSchmetzer.jpg",
                spouse: { name: "Steven Schmetzer", imageLink: "/photos/Emilee&StevenSchmetzer.jpg" }
              },
              { name: "Josh Davis", imageLink: "/photos/Davis/JoshDavis.jpg" }
            ]
          }
        ]
      }
    ]
  },

  // ============================================================
  // ROYYURU FAMILY (R.L.N. Sarma lineage)
  // ============================================================
  Royyuru: {
    founders: [
      {
        name: "R.L.N. Sarma *",
        deathyear: "~"
      },
      {
        name: "R. Subbalakshmi",
        deathyear: "~"
      }
    ],
    children: [
      {
        name: "R.L.N. Sastry",
        deathyear: 2010,
        deathplace: "Hyderabad, India",
        imageLink: "/photos/Royyuru/RLNSastry.jpg",
        spouse: { ref: "Viswanadham.Sita Devi Royyuru" },
        children: [
          {
            name: "Lakshminarayana Royyuru",
            nickname: "Sarma",
            birthyear: 1955,
            imageLink: "/photos/Royyuru/SarmaRoyyuru.jpg",
            spouse: { name: "Lakshmi Royyuru", imageLink: "/photos/Royyuru/LakshmiRoyyuru.jpg" },
            children: [
              {
                name: "Avinash Royyuru",
                imageLink: "/photos/Royyuru/AvinashRoyyuru.jpg",
                spouse: { name: "Akanksha Mehta ⟷" }
              },
              {
                name: "Shruti Royyuru",
                imageLink: "/photos/Royyuru/TaraRoyyuru.jpg",
                spouse: { name: "Sandeep Eyyuni", imageLink: "/photos/Eyyuni/SandeepEyyuni.jpg" },
                children: [
                  { name: "Shruti's son", birthyear: 2025, birthplace: "California" }
                ]
              }
            ]
          },
          {
            name: "Subba Hota",
            birthyear: 1958,
            imageLink: "/photos/Hota/SubbaHota.jpg",
            spouse: { name: "Ramarao Hota", birthyear: 1951, imageLink: "/photos/Hota/RamaraoHota.jpg" },
            children: [
              {
                name: "Pallavi Gudipati",
                birthyear: 1982,
                birthplace: "Morgantown, WV",
                imageLink: "/photos/Gudipati/PallaviGudipati.jpg",
                spouse: { name: "Ravi Gudipati", imageLink: "/photos/Gudipati/RaviGudipati.jpg" },
                children: [
                  { name: "Sitara Gudipati", birthyear: 2012, birthplace: "Cleveland, Ohio", imageLink: "/photos/Gudipati/SitaraGudipati.jpg" },
                  { name: "Vishnu Gudipati", birthyear: 2015, birthplace: "Cleveland, Ohio", imageLink: "/photos/Gudipati/VishnuGudipati.jpg" }
                ]
              },
              {
                name: "Partha Hota",
                birthyear: 1985,
                birthplace: "Morgantown, WV",
                profession: "Radiologist",
                imageLink: "/photos/Hota/ParthaHota.jpg",
                spouse: { name: "Kristen Hota", imageLink: "/photos/Hota/KristenZuber.jpg" },
                children: [
                  { name: "Wilhelmina Hota", birthyear: 2025, birthplace: "Philadelphia, PA", imageLink: "/photos/Hota/WillaHota.jpg" }
                ]
              }
            ]
          },
          {
            name: "Padma Robinson",
            birthyear: 1961,
            profession: "Director, Advanced Analytics",
            imageLink: "/photos/Robinson/PadmaRobinson.jpg"
            // Married John Robinson - children listed under Robinson tree
          }
        ]
      },
      {
        name: "Suryanarayana Murthy",
        imageLink: "/photos/Royyuru/SuryanarayanaMurthy.jpg",
        spouse: { name: "V Sesharathnam", imageLink: "/photos/Royyuru/Sesharathnam.jpg" },
        children: [
          {
            name: "Dixit Royyuru",
            imageLink: "/photos/Royyuru/DixitRoyyuru.jpg",
            spouse: { name: "Asha Royyuru", imageLink: "/photos/Royyuru/AshaRoyyuru.jpg" },
            children: [
              { name: "Nikhil Dixit", imageLink: "/photos/Royyuru/NikhilRoyyuru.jpg" },
              { name: "Rohan Dixit", birthyear: 1998, imageLink: "/photos/Royyuru/RohanRoyyuru.jpg" }
            ]
          },
          {
            name: "Ajay Royyuru",
            birthyear: 1964,
            imageLink: "/photos/Royyuru/AjayRoyyuru.jpg",
            spouse: { name: "Nibedita Royyuru", birthyear: 1963, imageLink: "/photos/Royyuru/NibeditaRoyyuru.jpg" },
            children: [
              {
                name: "Aditya Royyuru",
                birthyear: 1993,
                imageLink: "/photos/Royyuru/AdityaRoyyuru.jpg",
                spouse: { name: "Ella Glover" }
              }
            ]
          },
          {
            name: "Vijay Royyuru",
            birthyear: 1964,
            imageLink: "/photos/Royyuru/VijayRoyyuru.jpg",
            spouse: { name: "Hema Royyuru", birthyear: 1961, imageLink: "/photos/Royyuru/HemaRoyyuru.jpg" },
            children: [
              {
                name: "Harsha Kawahara",
                birthyear: 1991,
                imageLink: "/photos/Kawahara/HarshaKawahara.jpg",
                spouse: { name: "Alan Kawahara", birthyear: 1991, imageLink: "/photos/Kawahara/AlanKawahara.jpg" }
              },
              { name: "Varun Royyuru", birthyear: 1998, imageLink: "/photos/Royyuru/VarunRoyyuru.jpg" }
            ]
          },
          {
            name: "Kameswari Parimi",
            spouse: { ref: "Royyuru.Venkateswari Parimi.P.L.N. Sarma" }
          }
        ]
      },
      {
        name: "R. Subramanium",
        children: [
          { name: "Chitti Babu" },
          { name: "Subbalakshmi" }
        ]
      },
      {
        name: "Dabbu's Dad",
        deathyear: "unknown",
        deathcause: "disappeared",
        children: [
          { name: "Baba" },
          { name: "Pandu" },
          { name: "Rohini", nickname: "Chinnamma" },
          { name: "Dabbu" }
        ]
      },
      {
        name: "Venkateswari Parimi",
        children: [
          { name: "Umapathy" },
          { name: "P.L.N. Sarma" }
        ]
      },
      {
        name: "Ammalu",
        deathyear: 2023,
        children: [
          { name: "Jyothi" },
          { name: "Babu Rao" },
          { name: "Rama" }
        ]
      }
    ]
  },

  // ============================================================
  // VISWANADHAM FAMILY (V.B.R. Sarma lineage)
  // ============================================================
  Viswanadham: {
    founders: [
      {
        name: "V.B.R. Sarma",
        deathyear: "~",
        profession: "Accountant"
      },
      {
        name: "V. Padmavathi",
        deathyear: "~",
        fromFamily: { ref: "Evani.Lakshmi Narasimham Evani" } // She came from the Evani family
      }
    ],
    children: [
      {
        name: "Sita Devi Royyuru",
        birthyear: 1938,
        deathyear: 1995,
        deathplace: "Hyderabad, India",
        imageLink: "/photos/Royyuru/SitaRoyyuru.jpg"
        // Married R.L.N. Sastry - children listed under Royyuru tree
      },
      {
        name: "V Pardhasaradhi",
        nickname: "Pardha",
        spouse: { name: "Annapurna Viswanadham" },
        children: [
          {
            name: "Surendra Viswanadham",
            nickname: "Suri",
            imageLink: "/photos/SuriViswanadham.jpg",
            spouse: { name: "Suri's wife" },
            children: [
              { name: "Nandini Viswanadham" }
            ]
          },
          {
            name: "Jitu Viswanadham",
            imageLink: "/photos/JituViswanadham.jpg",
            spouse: { name: "Jitu's wife" },
            children: [
              { name: "Aditya Viswanadham", imageLink: "/photos/AdityaViswanadham.jpg" }
            ]
          }
        ]
      },
      {
        name: "VVS Sastry",
        nickname: "Srini",
        birthyear: 1930,
        birthplace: "Visakhapatnam, India",
        spouse: { name: "Sita Viswanadham", birthyear: 1935, birthplace: "Visakhapatnam, India", imageLink: "/photos/SitaViswanadham.jpg" },
        children: [
          {
            name: "V Bhaskar",
            nickname: "Bhanu",
            birthyear: 1966,
            birthplace: "New Delhi, India",
            imageLink: "/photos/BhanuViswanadham.jpg",
            spouse: { name: "Monica Viswanadham", deathyear: 2019, imageLink: "/photos/MonicaViswanadham.jpg" },
            children: [
              { name: "Mira Viswanadham", imageLink: "/photos/MiraViswanadham.jpg" }
            ]
          }
        ]
      },
      {
        name: "VV Sastry",
        nickname: "Raja"
      },
      {
        name: "V Atchutaramaiah",
        birthyear: 1936,
        children: [
          {
            name: "Padma Murthi",
            children: [
              {
                name: "Sweta",
                children: [
                  { name: "Kamya" },
                  { name: "Sweta's son" }
                ]
              }
            ]
          },
          {
            name: "Bhaskar Viswanatham",
            nickname: "Bujju",
            profession: "Chartered Accountant/Tax Consultant",
            imageLink: "/photos/BujjuViswanatham.jpg",
            spouse: { name: "Suchitra Viswanatham" },
            children: [
              { name: "Anandita Viswanatham", profession: "Doctor", imageLink: "/photos/AnanditaViswanatham.jpg" },
              {
                name: "Aditya Viswanatham",
                birthyear: 1999,
                spouse: { name: "Rukmini Viswanatham" }
              }
            ]
          },
          {
            name: "Sudha Dhara",
            imageLink: "/photos/Dhara/SudhaDhara.jpg",
            children: [
              { name: "Amulya Dhara *", imageLink: "/photos/Dhara/AmulyaDhara.jpg" }
            ]
          }
        ]
      },
      {
        name: "V Prakasa Rao",
        birthyear: 1941,
        deathyear: 2024,
        deathplace: "Rajahmundry, India",
        imageLink: "/photos/Prakasa.jpg",
        children: [
          {
            name: "Prabha",
            children: [
              { name: "Prabha's son" },
              { name: "Prabha's daughter" }
            ]
          },
          {
            name: "Krishna Rao VVS",
            imageLink: "/photos/KrishnaRaoVVS.jpg",
            children: [
              { name: "Anirudh" }
            ]
          }
        ]
      },
      {
        name: "Dr. Sastry",
        nickname: "Butchi",
        children: [
          {
            name: "Padmini Shanmugam",
            imageLink: "/photos/PadminiShanmugam.jpg",
            children: [
              { name: "Padmini's son 1" },
              { name: "Padmini's son 2" }
            ]
          },
          { name: "Sunny" }
        ]
      },
      {
        name: "V Sundaram",
        children: [
          {
            name: "Bhaskar",
            nickname: "Bachee",
            deathyear: "~",
            deathcause: "Covid-19",
            imageLink: "/photos/BacheeViswanadham.jpg",
            children: [
              { name: "Bachee's daughter 1" },
              { name: "Bachee's daughter 2" }
            ]
          },
          {
            name: "Sriram",
            deathyear: "~",
            deathcause: "Covid-19",
            imageLink: "/photos/SriramViswanadham.jpg",
            children: [
              { name: "Sriram's son", imageLink: "/photos/Sriram'sSon.jpg" },
              { name: "Sriram's daughter", imageLink: "/photos/Sriram'sDaughter.jpg" }
            ]
          }
        ]
      },
      {
        name: "Ravikanta Chavali",
        deathyear: 2024,
        deathplace: "Chennai, India",
        imageLink: "/photos/Chavali/RavikantaChavali.jpg",
        children: [
          {
            name: "Neeru Palepu *",
            birthyear: 1966,
            imageLink: "/photos/Palepu/NeeruPalepu.jpg",
            spouse: { name: "Prasad Palepu" },
            children: [
              { name: "Anjana Palepu", imageLink: "/photos/Palepu/AnjanaPalepu.jpg" },
              { name: "Sneha Palepu", imageLink: "/photos/Palepu/SnehaPalepu.jpg" },
              { name: "Nethra Palepu", imageLink: "/photos/Palepu/NethraPalepu.jpg" }
            ]
          }
        ]
      },
      {
        name: "Radha Yenamandra",
        deathyear: 1968,
        spouse: { name: "Dharma Rao" },
        children: [
          { name: "Neeru Palepu (* by Ravi dodda)", birthyear: 1966 }
        ]
      },
      {
        name: "Durga Hari",
        birthyear: 1947,
        deathyear: 2025,
        imageLink: "/photos/Hari/DurgaHari.jpg",
        children: [
          {
            name: "Anant Hari",
            children: [
              { name: "Anant's son" }
            ]
          },
          {
            name: "Vinod Hari",
            imageLink: "/photos/Hari/VinodHari.jpg",
            children: [
              { name: "Karthik Hari", imageLink: "/photos/Hari/KarthikHari.jpg" },
              { name: "Shanmukha Shaurya Hari", birthyear: 2014, imageLink: "/photos/Hari/ShanmukhaHari.jpg" }
            ]
          }
        ]
      },
      { name: "Rajeshwari Chainulu" }
    ]
  },

  // ============================================================
  // EVANI FAMILY (Ancestors - connects to Viswanadham via V. Padmavathi)
  // ============================================================
  Evani: {
    founders: [
      {
        name: "Sita Evani",
        imageLink: "/photos/Evani/SitaEvani.jpg"
      },
      {
        name: "Subbayya Sastry Evani"
      }
    ],
    children: [
      {
        name: "Lakshmi Narasimham Evani",
        birthyear: 1904,
        deathyear: 1976,
        spouse: { name: "Atchutam Evani", birthyear: 1919 },
        children: [
          {
            name: "Syamalarao Evani",
            nickname: "Syam",
            birthyear: 1928,
            spouse: { name: "Veeramathi Evani", nickname: "Rama" },
            children: [
              { name: "Venkatarama Narasimham Evani", nickname: "Bobby", birthyear: 1960 },
              { name: "Lakshman Evani", nickname: "Lucky", birthyear: 1967 },
              { name: "Venu Gopala Sarma Evani", birthyear: 1974 }
            ]
          },
          { name: "Manikyamba Tenneti" },
          {
            name: "Subbaya Sastry Evani",
            nickname: "Sastry",
            spouse: { name: "Lakshmi Evani" },
            children: [
              {
                name: "Sastry Evani",
                birthyear: 1963,
                birthplace: "Kakinada, India",
                spouse: { name: "Jyothi Evani" },
                children: [
                  { name: "Anjani Evani", birthyear: 2003 }
                ]
              },
              {
                name: "Lakshmi Dalwalla",
                birthyear: 1965,
                birthplace: "Kakinada, India",
                imageLink: "/photos/Dalwalla/LakshmiDalwalla.jpg",
                spouse: { name: "Paresh Dalwalla", birthyear: 1968, imageLink: "/photos/Dalwalla/PareshDalwalla.jpg" },
                children: [
                  { name: "Mitali Dalwalla", birthyear: 1999, imageLink: "/photos/Dalwalla/MitaliDalwalla.jpg" }
                ]
              },
              {
                name: "Satyakant Evani",
                nickname: "Purna",
                birthyear: 1971,
                birthplace: "Bokaro Steel City, India",
                spouse: { name: "Lisa Evani" }
              }
            ]
          },
          {
            name: "Kameswara Sarma Evani",
            nickname: "Thambi",
            spouse: { name: "Lakshmi Evani" },
            children: [
              { name: "Ajaisimha Evani", nickname: "Ajai" }
            ]
          },
          {
            name: "Kameswari Kunapuli",
            nickname: "Papa",
            imageLink: "/photos/Kunapuli/KameswariKunapuli.jpg",
            spouse: { name: "Kameswari's Husband" },
            children: [
              {
                name: "Saraswathi Jayanthy",
                nickname: "Achuta",
                birthyear: 1960,
                imageLink: "/photos/Achuta&Ramamurthy.jpg",
                spouse: { name: "Ramamurthy J.V.", birthyear: 1953, imageLink: "/photos/Achuta&Ramamurthy.jpg" },
                children: [
                  { name: "Surya Jayanthy", nickname: "Karthik", birthyear: 1985, imageLink: "/photos/KarthikJayanthy.jpg" }
                ]
              },
              {
                name: "Satya Kunapuli",
                nickname: "Babu",
                imageLink: "/photos/Kunapuli/SatyaKunapuli.jpg",
                spouse: { name: "Suma Kunapuli", imageLink: "/photos/Kunapuli/SumaKunapuli.jpg" },
                children: [
                  { name: "Shalini Kunapuli", imageLink: "/photos/Kunapuli/ShaliniKunapuli.jpg" },
                  { name: "Sangita Kunapuli", imageLink: "/photos/Kunapuli/SangitaKunapuli.jpg" }
                ]
              }
            ]
          }
        ]
      },
      { name: "Subbaraya Sastry Evani" },
      { name: "Ramalingeswara Evani", imageLink: "/photos/Evani/RamalingeswaraEvani.jpg" },
      {
        name: "Annapoorna Bhagavatula",
        birthyear: 1906,
        deathyear: 1987,
        spouse: { name: "Subrahmaniam Bhagavatula" }
      },
      { name: "Mahalakshmi Gunupudi" },
      { name: "Janaki Mithipati" },
      { name: "Saraswathi Kunapuli" },
      { name: "Kamala Malladi" },
      { name: "Subbalakshmi Gunturu", imageLink: "/photos/SubbalakshmiGunturu.jpg" },
      { name: "Prabhavathi Vuppuluri" },
      { name: "Suryakantham Emani" }
    ]
  }
};
