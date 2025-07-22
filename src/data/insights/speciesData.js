// Comprehensive species data for Indian forests
export const speciesData = {
  // Flagship species
  flagshipSpecies: [
    {
      name: "Bengal Tiger",
      scientificName: "Panthera tigris tigris",
      status: "Endangered",
      population: 2967,
      habitat: "Tropical forests, grasslands, mangroves",
      imageUrl: "/images/species/bengal-tiger.jpg",
      description: "The Bengal tiger is the most numerous tiger subspecies and India's national animal.",
      threats: ["Habitat loss", "Poaching", "Human-wildlife conflict"],
      conservationEfforts: ["Project Tiger", "Tiger reserves", "Anti-poaching measures"],
      keyFacts: [
        "Can leap up to 10 meters horizontally",
        "Excellent swimmers, unlike most cats",
        "Territory can span up to 400 sq km"
      ]
    },
    {
      name: "Indian Elephant",
      scientificName: "Elephas maximus indicus",
      status: "Endangered",
      population: 29000,
      habitat: "Tropical forests, grasslands",
      imageUrl: "/images/species/indian-elephant.jpg",
      description: "The Indian elephant is smaller than its African cousin and plays a crucial role in forest ecosystems.",
      threats: ["Habitat fragmentation", "Human-elephant conflict", "Poaching"],
      conservationEfforts: ["Project Elephant", "Elephant corridors", "Community involvement"],
      keyFacts: [
        "Can consume up to 300 kg of vegetation daily",
        "Excellent memory and complex social structure",
        "Key seed dispersers in forest ecosystems"
      ]
    },
    {
      name: "Asiatic Lion",
      scientificName: "Panthera leo persica",
      status: "Endangered",
      population: 674,
      habitat: "Dry deciduous forests, grasslands",
      imageUrl: "/images/species/asiatic-lion.jpg",
      description: "The Asiatic lion is found only in Gir Forest of Gujarat and is slightly smaller than African lions.",
      threats: ["Limited habitat", "Disease outbreaks", "Genetic bottleneck"],
      conservationEfforts: ["Gir sanctuary management", "Translocation programs", "Veterinary care"],
      keyFacts: [
        "Only wild population exists in Gir Forest",
        "Males have less developed manes than African lions",
        "Live in smaller prides than African lions"
      ]
    },
    {
      name: "Indian Rhinoceros",
      scientificName: "Rhinoceros unicornis",
      status: "Vulnerable",
      population: 3588,
      habitat: "Grasslands, riverine forests",
      imageUrl: "/images/species/indian-rhino.jpg",
      description: "The Indian rhinoceros is the largest of the three Asian rhino species.",
      threats: ["Poaching for horn", "Habitat loss", "Floods"],
      conservationEfforts: ["Kaziranga protection", "Translocation programs", "Anti-poaching units"],
      keyFacts: [
        "Can run up to 55 km/h despite their size",
        "Excellent swimmers and divers",
        "Single horn made of keratin, not bone"
      ]
    },
    {
      name: "Snow Leopard",
      scientificName: "Panthera uncia",
      status: "Vulnerable",
      population: 718,
      habitat: "High altitude mountains, alpine regions",
      imageUrl: "/images/species/snow-leopard.jpg",
      description: "The snow leopard is perfectly adapted to life in the high mountains of Central and South Asia.",
      threats: ["Climate change", "Retaliatory killing", "Prey depletion"],
      conservationEfforts: ["Protected areas", "Community conservation", "Livestock insurance"],
      keyFacts: [
        "Can leap up to 15 meters in a single bound",
        "Thick fur and large paws for snow walking",
        "Cannot roar, only chuff and purr"
      ]
    }
  ],

  // Endemic species by region
  endemicSpecies: {
    westernGhats: [
      {
        name: "Lion-tailed Macaque",
        scientificName: "Macaca silenus",
        status: "Endangered",
        population: 4000,
        description: "Distinctive primate with a silver-white mane",
        habitat: "Tropical rainforests"
      },
      {
        name: "Nilgiri Tahr",
        scientificName: "Nilgiritragus hylocrius",
        status: "Endangered",
        population: 3122,
        description: "Mountain goat endemic to the Nilgiri Hills",
        habitat: "Montane grasslands"
      },
      {
        name: "Malabar Giant Squirrel",
        scientificName: "Ratufa indica",
        status: "Near Threatened",
        population: "Unknown",
        description: "Large, colorful squirrel with distinctive coat",
        habitat: "Deciduous and semi-evergreen forests"
      }
    ],
    easternHimalayas: [
      {
        name: "Red Panda",
        scientificName: "Ailurus fulgens",
        status: "Endangered",
        population: 2500,
        description: "Small mammal with distinctive red fur",
        habitat: "Temperate forests with bamboo"
      },
      {
        name: "Himalayan Black Bear",
        scientificName: "Ursus thibetanus",
        status: "Vulnerable",
        population: "Unknown",
        description: "Medium-sized bear with distinctive chest patch",
        habitat: "Deciduous tropical forests, grasslands"
      },
      {
        name: "Takin",
        scientificName: "Budorcas taxicolor",
        status: "Vulnerable",
        population: 300,
        description: "Large, stocky ungulate related to sheep and goats",
        habitat: "Dense bamboo and rhododendron forests"
      }
    ],
    sundarbans: [
      {
        name: "Saltwater Crocodile",
        scientificName: "Crocodylus porosus",
        status: "Least Concern",
        population: 200,
        description: "Largest living reptile and apex predator",
        habitat: "Mangrove swamps, estuaries"
      },
      {
        name: "Ganges River Dolphin",
        scientificName: "Platanista gangetica",
        status: "Endangered",
        population: 1800,
        description: "Freshwater dolphin endemic to the Indian subcontinent",
        habitat: "Rivers and tributaries"
      }
    ]
  },

  // Bird species diversity
  avianDiversity: {
    totalSpecies: 1340,
    endemicSpecies: 78,
    migratorySpecies: 370,
    keySpecies: [
      {
        name: "Great Indian Bustard",
        scientificName: "Ardeotis nigriceps",
        status: "Critically Endangered",
        population: 150,
        habitat: "Grasslands, scrublands",
        significance: "State bird of Rajasthan"
      },
      {
        name: "Sarus Crane",
        scientificName: "Antigone antigone",
        status: "Vulnerable",
        population: 15000,
        habitat: "Wetlands, agricultural fields",
        significance: "World's tallest flying bird"
      },
      {
        name: "Indian Peafowl",
        scientificName: "Pavo cristatus",
        status: "Least Concern",
        population: "Stable",
        habitat: "Forests, farmlands",
        significance: "National bird of India"
      },
      {
        name: "Himalayan Monal",
        scientificName: "Lophophorus impejanus",
        status: "Least Concern",
        population: "Stable",
        habitat: "Alpine forests, grasslands",
        significance: "State bird of Uttarakhand and Himachal Pradesh"
      }
    ]
  },

  // Plant diversity
  floralDiversity: {
    totalSpecies: 47000,
    endemicSpecies: 5725,
    medicinalPlants: 3000,
    keySpecies: [
      {
        name: "Banyan Tree",
        scientificName: "Ficus benghalensis",
        significance: "National tree of India",
        habitat: "Tropical and subtropical regions",
        uses: ["Shade", "Religious significance", "Traditional medicine"]
      },
      {
        name: "Teak",
        scientificName: "Tectona grandis",
        significance: "Valuable timber species",
        habitat: "Deciduous forests",
        uses: ["Furniture", "Shipbuilding", "Construction"]
      },
      {
        name: "Sandalwood",
        scientificName: "Santalum album",
        significance: "Aromatic wood",
        habitat: "Dry deciduous forests",
        uses: ["Perfumes", "Religious ceremonies", "Traditional medicine"]
      },
      {
        name: "Neem",
        scientificName: "Azadirachta indica",
        significance: "Medicinal tree",
        habitat: "Tropical and semi-arid regions",
        uses: ["Traditional medicine", "Pesticide", "Cosmetics"]
      }
    ]
  },

  // Threatened species statistics
  threatenedSpecies: {
    criticallyEndangered: 132,
    endangered: 345,
    vulnerable: 668,
    nearThreatened: 288,
    totalThreatened: 1433,
    majorThreats: [
      "Habitat loss and fragmentation",
      "Poaching and illegal trade",
      "Human-wildlife conflict",
      "Climate change",
      "Pollution",
      "Invasive species"
    ]
  },

  // Conservation breeding programs
  conservationBreeding: [
    {
      species: "Gharial",
      scientificName: "Gavialis gangeticus",
      status: "Critically Endangered",
      breedingCenters: 8,
      successRate: "75%",
      reintroduced: 5000
    },
    {
      species: "Hangul",
      scientificName: "Cervus hanglu hanglu",
      status: "Critically Endangered",
      breedingCenters: 2,
      successRate: "60%",
      reintroduced: 50
    },
    {
      species: "Manipur Brow-antlered Deer",
      scientificName: "Rucervus eldii eldii",
      status: "Endangered",
      breedingCenters: 3,
      successRate: "80%",
      reintroduced: 200
    }
  ]
};