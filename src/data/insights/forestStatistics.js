// Comprehensive forest statistics and data for India
export const forestStatistics = {
  // Overall forest statistics for India
  overview: {
    totalForestCover: 712249, // in sq km
    forestCoverPercentage: 21.67, // percentage of total geographical area
    biodiversityCount: 91000, // total species count
    conservationProjects: 870,
    carbonSequestration: 7124.6, // in million tonnes
    protectedAreas: 870,
    nationalParks: 104,
    wildlifeSanctuaries: 551,
    tigerReserves: 52,
    biosphereReserves: 18
  },

  // Key forest statistics by category
  keyMetrics: [
    {
      title: "Forest Cover",
      value: "712,249",
      unit: "sq km",
      description: "Total forest cover in India",
      icon: "🌲",
      trend: "+0.56% from 2019"
    },
    {
      title: "Biodiversity",
      value: "91,000+",
      unit: "species",
      description: "Total documented species",
      icon: "🦋",
      trend: "8% of global biodiversity"
    },
    {
      title: "Carbon Storage",
      value: "7,124.6",
      unit: "million tonnes",
      description: "Carbon sequestered by forests",
      icon: "🌍",
      trend: "+2.3% annually"
    },
    {
      title: "Protected Areas",
      value: "870",
      unit: "areas",
      description: "National parks & sanctuaries",
      icon: "🛡️",
      trend: "5% of total land area"
    }
  ],

  // Forest cover by state (top 10)
  stateWiseForestCover: [
    { state: "Madhya Pradesh", area: 77482, percentage: 25.15 },
    { state: "Arunachal Pradesh", area: 66688, percentage: 79.63 },
    { state: "Chhattisgarh", area: 55717, percentage: 41.09 },
    { state: "Odisha", area: 51619, percentage: 33.16 },
    { state: "Maharashtra", area: 50778, percentage: 16.47 },
    { state: "Telangana", area: 26904, percentage: 24.03 },
    { state: "Karnataka", area: 38720, percentage: 20.19 },
    { state: "Jharkhand", area: 23605, percentage: 29.61 },
    { state: "Uttarakhand", area: 24495, percentage: 45.43 },
    { state: "Assam", area: 26832, percentage: 34.21 }
  ],

  // Forest types distribution
  forestTypes: [
    {
      type: "Tropical Wet Evergreen",
      area: 9400,
      percentage: 1.3,
      characteristics: "High rainfall, dense canopy, rich biodiversity",
      locations: ["Western Ghats", "Northeast India", "Andaman & Nicobar"]
    },
    {
      type: "Tropical Semi-Evergreen",
      area: 18200,
      percentage: 2.6,
      characteristics: "Moderate rainfall, mixed deciduous-evergreen",
      locations: ["Western Ghats", "Eastern Ghats", "Northeast"]
    },
    {
      type: "Tropical Moist Deciduous",
      area: 238400,
      percentage: 33.5,
      characteristics: "Monsoon forests, shed leaves in dry season",
      locations: ["Central India", "Eastern India", "Western Ghats foothills"]
    },
    {
      type: "Tropical Dry Deciduous",
      area: 318200,
      percentage: 44.7,
      characteristics: "Low to moderate rainfall, drought-resistant species",
      locations: ["Central India", "Deccan Plateau", "Rajasthan"]
    },
    {
      type: "Tropical Thorn",
      area: 20877,
      percentage: 2.9,
      characteristics: "Arid regions, thorny vegetation, sparse canopy",
      locations: ["Rajasthan", "Gujarat", "Haryana", "Punjab"]
    },
    {
      type: "Montane Subtropical",
      area: 29000,
      percentage: 4.1,
      characteristics: "Hill forests, temperate species, high altitude",
      locations: ["Himalayas", "Western Ghats", "Eastern Ghats"]
    },
    {
      type: "Montane Temperate",
      area: 19400,
      percentage: 2.7,
      characteristics: "Coniferous forests, cold climate adaptation",
      locations: ["Himalayas", "Kashmir", "Himachal Pradesh"]
    },
    {
      type: "Alpine",
      area: 5200,
      percentage: 0.7,
      characteristics: "High altitude, dwarf vegetation, extreme conditions",
      locations: ["High Himalayas", "Ladakh", "Sikkim"]
    }
  ],

  // Biodiversity hotspots
  biodiversityHotspots: [
    {
      name: "Western Ghats",
      area: 160000,
      endemicSpecies: 5000,
      biodiversity: ["Tigers", "Elephants", "Lion-tailed Macaque", "Nilgiri Tahr", "Malabar Giant Squirrel"],
      threats: ["Deforestation", "Human encroachment", "Climate change", "Mining"],
      conservationStatus: "UNESCO World Heritage Site",
      significance: "One of the world's eight biodiversity hotspots"
    },
    {
      name: "Eastern Himalayas",
      area: 218000,
      endemicSpecies: 3500,
      biodiversity: ["Red Panda", "Snow Leopard", "Himalayan Black Bear", "Musk Deer", "Takin"],
      threats: ["Poaching", "Habitat fragmentation", "Climate change", "Infrastructure development"],
      conservationStatus: "Biodiversity Hotspot",
      significance: "Critical habitat for high-altitude species"
    },
    {
      name: "Indo-Burma",
      area: 100000,
      endemicSpecies: 2800,
      biodiversity: ["Hoolock Gibbon", "Asian Elephant", "Clouded Leopard", "Sun Bear"],
      threats: ["Deforestation", "Agricultural expansion", "Hunting"],
      conservationStatus: "Biodiversity Hotspot",
      significance: "Bridge between Indian and Southeast Asian fauna"
    },
    {
      name: "Sundarbans",
      area: 10000,
      endemicSpecies: 400,
      biodiversity: ["Royal Bengal Tiger", "Saltwater Crocodile", "Ganges River Dolphin", "Spotted Deer"],
      threats: ["Sea level rise", "Cyclones", "Human pressure", "Pollution"],
      conservationStatus: "UNESCO World Heritage Site & Ramsar Site",
      significance: "World's largest mangrove forest"
    }
  ],

  // Conservation success stories
  conservationSuccesses: [
    {
      title: "Tiger Population Recovery",
      description: "India's tiger population increased from 1,411 in 2006 to 2,967 in 2018",
      impact: "110% increase in tiger numbers",
      timeframe: "2006-2018",
      keyFactors: ["Project Tiger", "Habitat protection", "Anti-poaching measures"]
    },
    {
      title: "Forest Cover Increase",
      description: "India added 15,320 sq km of forest cover between 2017-2019",
      impact: "0.56% increase in forest cover",
      timeframe: "2017-2019",
      keyFactors: ["Afforestation programs", "Community participation", "Policy initiatives"]
    },
    {
      title: "Asiatic Lion Recovery",
      description: "Asiatic lion population in Gir increased from 411 in 2010 to 674 in 2020",
      impact: "64% increase in lion population",
      timeframe: "2010-2020",
      keyFactors: ["Habitat management", "Community involvement", "Veterinary care"]
    },
    {
      title: "Mangrove Restoration",
      description: "Successful restoration of mangrove forests in coastal areas",
      impact: "Restoration of over 2,000 hectares",
      timeframe: "2015-2021",
      keyFactors: ["Community participation", "Scientific approach", "Policy support"]
    }
  ],

  // Ecosystem services provided by forests
  ecosystemServices: [
    {
      service: "Carbon Sequestration",
      value: "7,124.6 million tonnes",
      description: "Forests store carbon, helping mitigate climate change",
      economicValue: "₹2.5 trillion annually"
    },
    {
      service: "Water Regulation",
      value: "60% of water resources",
      description: "Forests regulate water cycle and prevent floods",
      economicValue: "₹1.8 trillion annually"
    },
    {
      service: "Biodiversity Conservation",
      value: "91,000+ species",
      description: "Forests provide habitat for diverse flora and fauna",
      economicValue: "₹1.2 trillion annually"
    },
    {
      service: "Soil Conservation",
      value: "Prevention of 5.3 billion tonnes soil erosion",
      description: "Forest cover prevents soil erosion and maintains fertility",
      economicValue: "₹800 billion annually"
    },
    {
      service: "Livelihood Support",
      value: "300 million people dependent",
      description: "Forests provide livelihood to rural communities",
      economicValue: "₹600 billion annually"
    },
    {
      service: "Climate Regulation",
      value: "Temperature moderation",
      description: "Forests moderate local and regional climate",
      economicValue: "₹400 billion annually"
    }
  ],

  // Threats to Indian forests
  majorThreats: [
    {
      threat: "Deforestation",
      severity: "High",
      causes: ["Agricultural expansion", "Infrastructure development", "Urbanization"],
      impact: "Loss of 1.38 million hectares annually",
      solutions: ["Sustainable agriculture", "Green infrastructure", "Urban planning"]
    },
    {
      threat: "Forest Degradation",
      severity: "High",
      causes: ["Overgrazing", "Fuelwood collection", "Illegal logging"],
      impact: "Reduced forest quality and biodiversity",
      solutions: ["Alternative energy", "Sustainable harvesting", "Community management"]
    },
    {
      threat: "Climate Change",
      severity: "Very High",
      causes: ["Global warming", "Changing precipitation patterns", "Extreme weather"],
      impact: "Species migration, forest fires, ecosystem disruption",
      solutions: ["Adaptation strategies", "Resilient species", "Ecosystem restoration"]
    },
    {
      threat: "Human-Wildlife Conflict",
      severity: "Medium",
      causes: ["Habitat fragmentation", "Human encroachment", "Resource competition"],
      impact: "Wildlife casualties, crop damage, human injuries",
      solutions: ["Corridor creation", "Compensation schemes", "Community awareness"]
    },
    {
      threat: "Invasive Species",
      severity: "Medium",
      causes: ["Global trade", "Climate change", "Habitat disturbance"],
      impact: "Native species displacement, ecosystem alteration",
      solutions: ["Early detection", "Rapid response", "Biological control"]
    },
    {
      threat: "Pollution",
      severity: "Medium",
      causes: ["Industrial emissions", "Agricultural chemicals", "Urban runoff"],
      impact: "Forest health decline, species mortality",
      solutions: ["Pollution control", "Clean technologies", "Sustainable practices"]
    }
  ]
};