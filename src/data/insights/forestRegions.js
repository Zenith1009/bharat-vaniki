// Comprehensive forest regions data for Indian forests
export const forestRegions = {
  // Major forest regions with detailed information
  majorRegions: [
    {
      id: 1,
      name: "Western Ghats",
      type: "Biodiversity Hotspot",
      location: {
        states: ["Kerala", "Tamil Nadu", "Karnataka", "Goa", "Maharashtra", "Gujarat"],
        coordinates: { lat: 15.2993, lon: 74.1240 },
        area: 160000 // sq km
      },
      forestTypes: [
        "Tropical Wet Evergreen",
        "Tropical Semi-Evergreen", 
        "Tropical Moist Deciduous",
        "Montane Subtropical"
      ],
      biodiversity: {
        totalSpecies: 7402,
        endemicSpecies: 5000,
        floralSpecies: 4000,
        faunalSpecies: 3402,
        keySpecies: [
          "Lion-tailed Macaque",
          "Nilgiri Tahr", 
          "Malabar Giant Squirrel",
          "Indian Elephant",
          "Bengal Tiger"
        ]
      },
      conservation: {
        protectedAreas: 39,
        nationalParks: 13,
        wildlifeSanctuaries: 26,
        unescoSites: ["Western Ghats World Heritage Site"],
        conservationStatus: "UNESCO World Heritage Site"
      },
      threats: [
        "Deforestation for agriculture",
        "Infrastructure development",
        "Mining activities",
        "Climate change",
        "Human encroachment"
      ],
      significance: [
        "One of world's eight biodiversity hotspots",
        "Source of major rivers",
        "Climate regulation for peninsular India",
        "Endemic species repository"
      ],
      images: [
        "/images/regions/western-ghats-1.jpg",
        "/images/regions/western-ghats-2.jpg",
        "/images/regions/western-ghats-3.jpg"
      ]
    },
    {
      id: 2,
      name: "Eastern Himalayas",
      type: "Biodiversity Hotspot",
      location: {
        states: ["Arunachal Pradesh", "Assam", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Sikkim", "Tripura", "West Bengal"],
        coordinates: { lat: 27.0873, lon: 88.2663 },
        area: 218000 // sq km
      },
      forestTypes: [
        "Tropical Wet Evergreen",
        "Tropical Semi-Evergreen",
        "Montane Subtropical",
        "Montane Temperate",
        "Alpine"
      ],
      biodiversity: {
        totalSpecies: 6500,
        endemicSpecies: 3500,
        floralSpecies: 3500,
        faunalSpecies: 3000,
        keySpecies: [
          "Red Panda",
          "Snow Leopard",
          "Himalayan Black Bear",
          "Hoolock Gibbon",
          "Takin"
        ]
      },
      conservation: {
        protectedAreas: 45,
        nationalParks: 12,
        wildlifeSanctuaries: 33,
        unescoSites: ["Manas Wildlife Sanctuary", "Kaziranga National Park"],
        conservationStatus: "Biodiversity Hotspot"
      },
      threats: [
        "Poaching and illegal trade",
        "Habitat fragmentation",
        "Infrastructure development",
        "Climate change",
        "Political instability"
      ],
      significance: [
        "Bridge between Indian and Southeast Asian fauna",
        "Critical habitat for high-altitude species",
        "Major watershed region",
        "Cultural diversity hotspot"
      ],
      images: [
        "/images/regions/eastern-himalayas-1.jpg",
        "/images/regions/eastern-himalayas-2.jpg",
        "/images/regions/eastern-himalayas-3.jpg"
      ]
    },
    {
      id: 3,
      name: "Central Indian Forests",
      type: "Tiger Landscape",
      location: {
        states: ["Madhya Pradesh", "Chhattisgarh", "Maharashtra", "Odisha", "Jharkhand"],
        coordinates: { lat: 22.9734, lon: 78.6569 },
        area: 195000 // sq km
      },
      forestTypes: [
        "Tropical Moist Deciduous",
        "Tropical Dry Deciduous",
        "Tropical Thorn"
      ],
      biodiversity: {
        totalSpecies: 4200,
        endemicSpecies: 800,
        floralSpecies: 2500,
        faunalSpecies: 1700,
        keySpecies: [
          "Bengal Tiger",
          "Indian Leopard",
          "Sloth Bear",
          "Indian Wild Dog",
          "Gaur"
        ]
      },
      conservation: {
        protectedAreas: 85,
        nationalParks: 25,
        wildlifeSanctuaries: 60,
        tigerReserves: 18,
        conservationStatus: "Critical Tiger Habitat"
      },
      threats: [
        "Human-wildlife conflict",
        "Mining pressure",
        "Agricultural expansion",
        "Linear infrastructure",
        "Forest fires"
      ],
      significance: [
        "Largest tiger population in India",
        "Critical wildlife corridors",
        "Tribal livelihood support",
        "Carbon sequestration hub"
      ],
      images: [
        "/images/regions/central-india-1.jpg",
        "/images/regions/central-india-2.jpg",
        "/images/regions/central-india-3.jpg"
      ]
    },
    {
      id: 4,
      name: "Sundarbans",
      type: "Mangrove Ecosystem",
      location: {
        states: ["West Bengal"],
        coordinates: { lat: 21.9497, lon: 89.1833 },
        area: 10000 // sq km
      },
      forestTypes: [
        "Mangrove Forests"
      ],
      biodiversity: {
        totalSpecies: 2487,
        endemicSpecies: 400,
        floralSpecies: 334,
        faunalSpecies: 2153,
        keySpecies: [
          "Royal Bengal Tiger",
          "Saltwater Crocodile",
          "Ganges River Dolphin",
          "Spotted Deer",
          "Olive Ridley Turtle"
        ]
      },
      conservation: {
        protectedAreas: 4,
        nationalParks: 1,
        wildlifeSanctuaries: 3,
        unescoSites: ["Sundarbans National Park"],
        conservationStatus: "UNESCO World Heritage Site & Ramsar Site"
      },
      threats: [
        "Sea level rise",
        "Cyclones and storms",
        "Human pressure",
        "Pollution",
        "Climate change"
      ],
      significance: [
        "World's largest mangrove forest",
        "Coastal protection barrier",
        "Blue carbon ecosystem",
        "Unique tiger adaptation"
      ],
      images: [
        "/images/regions/sundarbans-1.jpg",
        "/images/regions/sundarbans-2.jpg",
        "/images/regions/sundarbans-3.jpg"
      ]
    },
    {
      id: 5,
      name: "Andaman & Nicobar Islands",
      type: "Island Ecosystem",
      location: {
        states: ["Andaman and Nicobar Islands"],
        coordinates: { lat: 11.7401, lon: 92.6586 },
        area: 8249 // sq km
      },
      forestTypes: [
        "Tropical Wet Evergreen",
        "Tropical Semi-Evergreen",
        "Littoral and Swamp"
      ],
      biodiversity: {
        totalSpecies: 2200,
        endemicSpecies: 1067,
        floralSpecies: 2200,
        faunalSpecies: 1800,
        keySpecies: [
          "Andaman Wild Pig",
          "Nicobar Megapode",
          "Andaman Teal",
          "Saltwater Crocodile",
          "Dugong"
        ]
      },
      conservation: {
        protectedAreas: 96,
        nationalParks: 9,
        wildlifeSanctuaries: 87,
        conservationStatus: "Island Biodiversity Reserve"
      },
      threats: [
        "Invasive species",
        "Tourism pressure",
        "Infrastructure development",
        "Climate change",
        "Coral bleaching"
      ],
      significance: [
        "Unique island biodiversity",
        "High endemism rates",
        "Marine ecosystem connectivity",
        "Tsunami early warning importance"
      ],
      images: [
        "/images/regions/andaman-1.jpg",
        "/images/regions/andaman-2.jpg",
        "/images/regions/andaman-3.jpg"
      ]
    },
    {
      id: 6,
      name: "Thar Desert Forests",
      type: "Arid Ecosystem",
      location: {
        states: ["Rajasthan", "Gujarat", "Haryana", "Punjab"],
        coordinates: { lat: 27.0238, lon: 70.8022 },
        area: 200000 // sq km
      },
      forestTypes: [
        "Tropical Thorn",
        "Tropical Dry Deciduous"
      ],
      biodiversity: {
        totalSpecies: 1500,
        endemicSpecies: 200,
        floralSpecies: 700,
        faunalSpecies: 800,
        keySpecies: [
          "Great Indian Bustard",
          "Blackbuck",
          "Chinkara",
          "Desert Fox",
          "Spiny-tailed Lizard"
        ]
      },
      conservation: {
        protectedAreas: 25,
        nationalParks: 3,
        wildlifeSanctuaries: 22,
        conservationStatus: "Desert Ecosystem Reserve"
      },
      threats: [
        "Desertification",
        "Overgrazing",
        "Water scarcity",
        "Solar energy projects",
        "Mining activities"
      ],
      significance: [
        "Desert ecosystem conservation",
        "Drought-resistant species",
        "Traditional pastoral systems",
        "Renewable energy potential"
      ],
      images: [
        "/images/regions/thar-desert-1.jpg",
        "/images/regions/thar-desert-2.jpg",
        "/images/regions/thar-desert-3.jpg"
      ]
    }
  ],

  // Forest corridors and connectivity
  wildlifeCorridors: [
    {
      name: "Central India Tiger Corridor",
      length: 1200, // km
      connects: ["Kanha", "Pench", "Tadoba", "Melghat"],
      species: ["Tiger", "Leopard", "Wild Dog"],
      status: "Partially Protected",
      threats: ["Road development", "Mining", "Agriculture"]
    },
    {
      name: "Elephant Corridor Network",
      length: 15000, // km total
      connects: ["Western Ghats", "Central India", "Northeast"],
      species: ["Elephant", "Tiger", "Leopard"],
      status: "Under Development",
      threats: ["Linear infrastructure", "Human settlements", "Agriculture"]
    },
    {
      name: "Western Ghats Connectivity",
      length: 800, // km
      connects: ["Nilgiris", "Anamalai", "Periyar", "Silent Valley"],
      species: ["Elephant", "Tiger", "Lion-tailed Macaque"],
      status: "Fragmented",
      threats: ["Tea plantations", "Roads", "Dams"]
    }
  ],

  // Regional forest statistics
  regionalStatistics: {
    byRegion: [
      {
        region: "Western Ghats",
        forestCover: 58000, // sq km
        forestPercentage: 36.25,
        carbonStock: 2100, // million tonnes
        biodiversityIndex: 0.85
      },
      {
        region: "Eastern Himalayas", 
        forestCover: 65000, // sq km
        forestPercentage: 29.82,
        carbonStock: 2800, // million tonnes
        biodiversityIndex: 0.78
      },
      {
        region: "Central India",
        forestCover: 95000, // sq km
        forestPercentage: 48.72,
        carbonStock: 1800, // million tonnes
        biodiversityIndex: 0.65
      },
      {
        region: "Sundarbans",
        forestCover: 4200, // sq km
        forestPercentage: 42.0,
        carbonStock: 180, // million tonnes
        biodiversityIndex: 0.72
      }
    ]
  },

  // Climate zones and forest distribution
  climateZones: [
    {
      zone: "Tropical Wet",
      area: 45000, // sq km
      rainfall: "2000-4000mm",
      temperature: "20-30°C",
      regions: ["Western Ghats", "Northeast", "Andaman"],
      forestTypes: ["Evergreen", "Semi-evergreen"]
    },
    {
      zone: "Tropical Moist",
      area: 238000, // sq km
      rainfall: "1000-2000mm", 
      temperature: "25-35°C",
      regions: ["Central India", "Eastern India"],
      forestTypes: ["Moist Deciduous"]
    },
    {
      zone: "Tropical Dry",
      area: 318000, // sq km
      rainfall: "600-1000mm",
      temperature: "25-40°C", 
      regions: ["Deccan Plateau", "Central India"],
      forestTypes: ["Dry Deciduous"]
    },
    {
      zone: "Arid",
      area: 21000, // sq km
      rainfall: "100-600mm",
      temperature: "20-45°C",
      regions: ["Rajasthan", "Gujarat"],
      forestTypes: ["Thorn", "Scrub"]
    },
    {
      zone: "Temperate",
      area: 29000, // sq km
      rainfall: "1000-2500mm",
      temperature: "5-25°C",
      regions: ["Himalayas", "Western Ghats"],
      forestTypes: ["Coniferous", "Mixed"]
    }
  ]
};