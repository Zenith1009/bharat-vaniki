// Main export file for all forest insights data
export { forestStatistics } from './forestStatistics.js';
export { speciesData } from './speciesData.js';
export { conservationImpact } from './conservationImpact.js';
export { forestImportance } from './forestImportance.js';
export { forestRegions } from './forestRegions.js';
export { chartsData, chartConfigs } from './chartsData.js';
export { imageData, imageUtils } from './imageData.js';

// Combined data structure for easy access
export const forestInsightsData = {
  // Core statistics and metrics
  statistics: {
    overview: {
      totalForestCover: 712249, // sq km
      forestCoverPercentage: 21.67,
      biodiversityCount: 91000,
      conservationProjects: 870,
      carbonSequestration: 7124.6, // million tonnes
      protectedAreas: 870,
      nationalParks: 104,
      wildlifeSanctuaries: 551,
      tigerReserves: 52,
      biosphereReserves: 18
    },
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
    ]
  },

  // Major forest regions
  regions: [
    {
      id: 1,
      name: "Western Ghats",
      type: "Biodiversity Hotspot",
      area: 160000,
      endemicSpecies: 5000,
      conservationStatus: "UNESCO World Heritage Site",
      significance: "One of world's eight biodiversity hotspots"
    },
    {
      id: 2,
      name: "Eastern Himalayas",
      type: "Biodiversity Hotspot", 
      area: 218000,
      endemicSpecies: 3500,
      conservationStatus: "Biodiversity Hotspot",
      significance: "Bridge between Indian and Southeast Asian fauna"
    },
    {
      id: 3,
      name: "Central Indian Forests",
      type: "Tiger Landscape",
      area: 195000,
      endemicSpecies: 800,
      conservationStatus: "Critical Tiger Habitat",
      significance: "Largest tiger population in India"
    },
    {
      id: 4,
      name: "Sundarbans",
      type: "Mangrove Ecosystem",
      area: 10000,
      endemicSpecies: 400,
      conservationStatus: "UNESCO World Heritage Site & Ramsar Site",
      significance: "World's largest mangrove forest"
    }
  ],

  // Key species information
  species: {
    flagship: [
      {
        name: "Bengal Tiger",
        scientificName: "Panthera tigris tigris",
        status: "Endangered",
        population: 2967,
        habitat: "Tropical forests, grasslands, mangroves"
      },
      {
        name: "Indian Elephant",
        scientificName: "Elephas maximus indicus", 
        status: "Endangered",
        population: 29000,
        habitat: "Tropical forests, grasslands"
      },
      {
        name: "Asiatic Lion",
        scientificName: "Panthera leo persica",
        status: "Endangered", 
        population: 674,
        habitat: "Dry deciduous forests, grasslands"
      },
      {
        name: "Indian Rhinoceros",
        scientificName: "Rhinoceros unicornis",
        status: "Vulnerable",
        population: 3588,
        habitat: "Grasslands, riverine forests"
      }
    ],
    diversity: {
      totalSpecies: 91000,
      mammals: 410,
      birds: 1340,
      reptiles: 518,
      amphibians: 314,
      plants: 47000,
      endemicSpecies: 5725
    }
  },

  // Conservation achievements
  conservation: {
    majorPrograms: [
      {
        name: "Project Tiger",
        launchYear: 1973,
        tigerIncrease: "62%",
        reserves: 52,
        areaProtected: "75,000 sq km"
      },
      {
        name: "Project Elephant", 
        launchYear: 1992,
        elephantIncrease: "12%",
        reserves: 32,
        corridors: 88
      },
      {
        name: "Mangrove Conservation",
        launchYear: 1987,
        areaIncrease: "18%",
        restoredArea: "2000 hectares",
        protectedCoastline: "7500 km"
      }
    ],
    successStories: [
      {
        species: "Asiatic Lion",
        populationGrowth: "574% since 1900",
        currentPopulation: 674,
        location: "Gir Forest, Gujarat"
      },
      {
        species: "Indian Rhinoceros", 
        populationGrowth: "1694% since 1900",
        currentPopulation: 3588,
        location: "Kaziranga National Park, Assam"
      }
    ]
  },

  // Ecosystem services and importance
  importance: {
    ecosystemServices: [
      {
        service: "Carbon Sequestration",
        value: "₹2.5 trillion annually",
        description: "Forests store carbon, helping mitigate climate change"
      },
      {
        service: "Water Regulation", 
        value: "₹1.8 trillion annually",
        description: "Forests regulate water cycle and prevent floods"
      },
      {
        service: "Biodiversity Conservation",
        value: "₹1.2 trillion annually", 
        description: "Forests provide habitat for diverse flora and fauna"
      },
      {
        service: "Soil Conservation",
        value: "₹800 billion annually",
        description: "Forest cover prevents soil erosion and maintains fertility"
      }
    ],
    globalContext: {
      indiaRanking: "10th globally in forest cover",
      biodiversityRanking: "4th most biodiverse country",
      tigerPopulation: "70% of world's tigers",
      elephantPopulation: "60% of Asian elephants"
    }
  },

  // Major threats and challenges
  threats: [
    {
      threat: "Climate Change",
      severity: "Very High",
      impact: "Species migration, forest fires, ecosystem disruption",
      affectedArea: "85% of forest areas"
    },
    {
      threat: "Deforestation",
      severity: "High", 
      impact: "Loss of 1.38 million hectares annually",
      causes: ["Agricultural expansion", "Infrastructure development", "Urbanization"]
    },
    {
      threat: "Forest Degradation",
      severity: "High",
      impact: "Reduced forest quality and biodiversity", 
      causes: ["Overgrazing", "Fuelwood collection", "Illegal logging"]
    },
    {
      threat: "Human-Wildlife Conflict",
      severity: "Medium",
      impact: "Wildlife casualties, crop damage, human injuries",
      causes: ["Habitat fragmentation", "Human encroachment", "Resource competition"]
    }
  ],

  // Future goals and targets
  futureGoals: [
    {
      goal: "Increase Forest Cover",
      target: "33% of geographical area by 2030",
      current: "21.67%",
      timeline: "2030"
    },
    {
      goal: "Tiger Population",
      target: "3,500 tigers by 2030", 
      current: "2,967 tigers",
      timeline: "2030"
    },
    {
      goal: "Species Recovery",
      target: "Improve conservation status of 500 threatened species",
      current: "1,433 threatened species",
      timeline: "2030"
    },
    {
      goal: "Carbon Sequestration",
      target: "Additional 2.5-3 billion tonnes CO2",
      current: "7,124.6 million tonnes stored",
      timeline: "2030"
    }
  ]
};

// Data validation and utility functions
export const dataUtils = {
  // Validate data structure
  validateData: (data) => {
    const requiredFields = ['statistics', 'regions', 'species', 'conservation'];
    return requiredFields.every(field => data.hasOwnProperty(field));
  },

  // Get data by category
  getDataByCategory: (category) => {
    switch(category) {
      case 'statistics':
        return forestInsightsData.statistics;
      case 'regions':
        return forestInsightsData.regions;
      case 'species':
        return forestInsightsData.species;
      case 'conservation':
        return forestInsightsData.conservation;
      case 'importance':
        return forestInsightsData.importance;
      case 'threats':
        return forestInsightsData.threats;
      case 'goals':
        return forestInsightsData.futureGoals;
      default:
        return null;
    }
  },

  // Format numbers for display
  formatNumber: (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  },

  // Get species by status
  getSpeciesByStatus: (status) => {
    // This would filter species data by conservation status
    return forestInsightsData.species.flagship.filter(species => 
      species.status.toLowerCase() === status.toLowerCase()
    );
  },

  // Calculate conservation success rate
  getConservationSuccessRate: () => {
    const programs = forestInsightsData.conservation.majorPrograms;
    const successfulPrograms = programs.filter(program => 
      program.tigerIncrease || program.elephantIncrease || program.areaIncrease
    );
    return (successfulPrograms.length / programs.length) * 100;
  }
};