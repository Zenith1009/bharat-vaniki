// Chart data for forest insights visualizations
export const chartsData = {
  // Forest cover by state (for bar chart)
  forestCoverByState: [
    { state: "Madhya Pradesh", area: 77482, percentage: 25.15, color: "#16a34a" },
    { state: "Arunachal Pradesh", area: 66688, percentage: 79.63, color: "#15803d" },
    { state: "Chhattisgarh", area: 55717, percentage: 41.09, color: "#166534" },
    { state: "Odisha", area: 51619, percentage: 33.16, color: "#14532d" },
    { state: "Maharashtra", area: 50778, percentage: 16.47, color: "#052e16" },
    { state: "Telangana", area: 26904, percentage: 24.03, color: "#22c55e" },
    { state: "Karnataka", area: 38720, percentage: 20.19, color: "#4ade80" },
    { state: "Jharkhand", area: 23605, percentage: 29.61, color: "#86efac" },
    { state: "Uttarakhand", area: 24495, percentage: 45.43, color: "#bbf7d0" },
    { state: "Assam", area: 26832, percentage: 34.21, color: "#dcfce7" }
  ],

  // Forest types distribution (for pie chart)
  forestTypesDistribution: [
    { 
      type: "Tropical Dry Deciduous", 
      area: 318200, 
      percentage: 44.7, 
      color: "#ea580c",
      description: "Drought-resistant forests in central India"
    },
    { 
      type: "Tropical Moist Deciduous", 
      area: 238400, 
      percentage: 33.5, 
      color: "#16a34a",
      description: "Monsoon forests with seasonal leaf shedding"
    },
    { 
      type: "Montane Subtropical", 
      area: 29000, 
      percentage: 4.1, 
      color: "#0ea5e9",
      description: "Hill forests at moderate altitudes"
    },
    { 
      type: "Tropical Thorn", 
      area: 20877, 
      percentage: 2.9, 
      color: "#eab308",
      description: "Arid region forests with thorny vegetation"
    },
    { 
      type: "Montane Temperate", 
      area: 19400, 
      percentage: 2.7, 
      color: "#8b5cf6",
      description: "Coniferous forests in cold climates"
    },
    { 
      type: "Tropical Semi-Evergreen", 
      area: 18200, 
      percentage: 2.6, 
      color: "#06b6d4",
      description: "Mixed deciduous-evergreen forests"
    },
    { 
      type: "Tropical Wet Evergreen", 
      area: 9400, 
      percentage: 1.3, 
      color: "#10b981",
      description: "Dense, biodiverse rainforests"
    },
    { 
      type: "Alpine", 
      area: 5200, 
      percentage: 0.7, 
      color: "#f59e0b",
      description: "High altitude dwarf vegetation"
    }
  ],

  // Tiger population trend (for line chart)
  tigerPopulationTrend: [
    { year: 2006, population: 1411, surveys: "First comprehensive survey" },
    { year: 2010, population: 1706, surveys: "20% increase" },
    { year: 2014, population: 2226, surveys: "30% increase" },
    { year: 2018, population: 2967, surveys: "33% increase" },
    { year: 2022, population: 3167, surveys: "Latest estimate" }
  ],

  // Biodiversity by region (for radar chart)
  biodiversityByRegion: [
    {
      region: "Western Ghats",
      mammals: 85,
      birds: 75,
      reptiles: 90,
      amphibians: 95,
      plants: 88,
      endemism: 92
    },
    {
      region: "Eastern Himalayas",
      mammals: 78,
      birds: 82,
      reptiles: 65,
      amphibians: 70,
      plants: 80,
      endemism: 75
    },
    {
      region: "Central India",
      mammals: 70,
      birds: 68,
      reptiles: 60,
      amphibians: 45,
      plants: 65,
      endemism: 35
    },
    {
      region: "Sundarbans",
      mammals: 45,
      birds: 88,
      reptiles: 75,
      amphibians: 40,
      plants: 50,
      endemism: 60
    },
    {
      region: "Andaman & Nicobar",
      mammals: 40,
      birds: 65,
      reptiles: 80,
      amphibians: 55,
      plants: 70,
      endemism: 95
    }
  ],

  // Conservation success metrics (for area chart)
  conservationSuccess: [
    {
      year: 2000,
      protectedAreas: 589,
      forestCover: 675538,
      tigerPopulation: 1500,
      elephantPopulation: 26000
    },
    {
      year: 2005,
      protectedAreas: 660,
      forestCover: 690899,
      tigerPopulation: 1411,
      elephantPopulation: 26500
    },
    {
      year: 2010,
      protectedAreas: 733,
      forestCover: 692027,
      tigerPopulation: 1706,
      elephantPopulation: 27000
    },
    {
      year: 2015,
      protectedAreas: 804,
      forestCover: 701673,
      tigerPopulation: 2226,
      elephantPopulation: 27500
    },
    {
      year: 2020,
      protectedAreas: 870,
      forestCover: 712249,
      tigerPopulation: 2967,
      elephantPopulation: 29000
    }
  ],

  // Ecosystem services value (for stacked bar chart)
  ecosystemServicesValue: [
    {
      service: "Carbon Sequestration",
      value: 2500,
      category: "Climate Regulation",
      color: "#16a34a"
    },
    {
      service: "Water Regulation",
      value: 1800,
      category: "Water Security",
      color: "#0ea5e9"
    },
    {
      service: "Biodiversity Conservation",
      value: 1200,
      category: "Genetic Resources",
      color: "#8b5cf6"
    },
    {
      service: "Soil Conservation",
      value: 800,
      category: "Land Protection",
      color: "#eab308"
    },
    {
      service: "Livelihood Support",
      value: 600,
      category: "Economic Benefits",
      color: "#ea580c"
    },
    {
      service: "Climate Regulation",
      value: 400,
      category: "Temperature Control",
      color: "#06b6d4"
    }
  ],

  // Threats severity (for horizontal bar chart)
  threatsSeverity: [
    {
      threat: "Climate Change",
      severity: 95,
      impact: "Very High",
      color: "#dc2626",
      affectedArea: 85
    },
    {
      threat: "Deforestation",
      severity: 88,
      impact: "High",
      color: "#ea580c",
      affectedArea: 70
    },
    {
      threat: "Forest Degradation",
      severity: 82,
      impact: "High",
      color: "#f59e0b",
      affectedArea: 65
    },
    {
      threat: "Human-Wildlife Conflict",
      severity: 65,
      impact: "Medium",
      color: "#eab308",
      affectedArea: 45
    },
    {
      threat: "Invasive Species",
      severity: 58,
      impact: "Medium",
      color: "#84cc16",
      affectedArea: 35
    },
    {
      threat: "Pollution",
      severity: 52,
      impact: "Medium",
      color: "#22c55e",
      affectedArea: 30
    }
  ],

  // Species population trends (for multi-line chart)
  speciesPopulationTrends: [
    {
      year: 2000,
      tiger: 1500,
      elephant: 26000,
      rhinoceros: 1552,
      lion: 327,
      leopard: 12000
    },
    {
      year: 2005,
      tiger: 1411,
      elephant: 26500,
      rhinoceros: 1855,
      lion: 359,
      leopard: 12500
    },
    {
      year: 2010,
      tiger: 1706,
      elephant: 27000,
      rhinoceros: 2329,
      lion: 411,
      leopard: 12000
    },
    {
      year: 2015,
      tiger: 2226,
      elephant: 27500,
      rhinoceros: 2401,
      lion: 523,
      leopard: 14000
    },
    {
      year: 2020,
      tiger: 2967,
      elephant: 29000,
      rhinoceros: 3588,
      lion: 674,
      leopard: 15000
    }
  ],

  // Forest cover change over time (for area chart)
  forestCoverChange: [
    {
      year: 1990,
      veryDenseForest: 41890,
      moderatelyDenseForest: 318000,
      openForest: 285000,
      total: 644890
    },
    {
      year: 1995,
      veryDenseForest: 45000,
      moderatelyDenseForest: 325000,
      openForest: 290000,
      total: 660000
    },
    {
      year: 2000,
      veryDenseForest: 48000,
      moderatelyDenseForest: 332000,
      openForest: 295538,
      total: 675538
    },
    {
      year: 2005,
      veryDenseForest: 52000,
      moderatelyDenseForest: 338000,
      openForest: 300899,
      total: 690899
    },
    {
      year: 2010,
      veryDenseForest: 55000,
      moderatelyDenseForest: 342000,
      openForest: 295027,
      total: 692027
    },
    {
      year: 2015,
      veryDenseForest: 58000,
      moderatelyDenseForest: 348000,
      openForest: 295673,
      total: 701673
    },
    {
      year: 2020,
      veryDenseForest: 61000,
      moderatelyDenseForest: 356000,
      openForest: 295249,
      total: 712249
    }
  ],

  // Protected areas growth (for step chart)
  protectedAreasGrowth: [
    { year: 1970, nationalParks: 5, wildlifeSanctuaries: 60, total: 65 },
    { year: 1980, nationalParks: 22, wildlifeSanctuaries: 158, total: 180 },
    { year: 1990, nationalParks: 54, wildlifeSanctuaries: 247, total: 301 },
    { year: 2000, nationalParks: 89, wildlifeSanctuaries: 500, total: 589 },
    { year: 2010, nationalParks: 99, wildlifeSanctuaries: 634, total: 733 },
    { year: 2020, nationalParks: 104, wildlifeSanctuaries: 551, total: 870 }
  ],

  // Regional carbon storage (for treemap data)
  regionalCarbonStorage: [
    { region: "Central India", carbon: 1800, area: 195000, density: 9.23 },
    { region: "Eastern Himalayas", carbon: 2800, area: 218000, density: 12.84 },
    { region: "Western Ghats", carbon: 2100, area: 160000, density: 13.13 },
    { region: "Northeast Plains", carbon: 800, area: 85000, density: 9.41 },
    { region: "Deccan Plateau", carbon: 600, area: 120000, density: 5.00 },
    { region: "Sundarbans", carbon: 180, area: 10000, density: 18.00 },
    { region: "Andaman & Nicobar", carbon: 120, area: 8249, density: 14.55 }
  ],

  // Monthly forest fire incidents (for heatmap)
  forestFireIncidents: [
    { month: "January", incidents: 45, area: 1200, severity: "Low" },
    { month: "February", incidents: 120, area: 3500, severity: "Medium" },
    { month: "March", incidents: 280, area: 8900, severity: "High" },
    { month: "April", incidents: 450, area: 15600, severity: "Very High" },
    { month: "May", incidents: 380, area: 12800, severity: "High" },
    { month: "June", incidents: 180, area: 4200, severity: "Medium" },
    { month: "July", incidents: 85, area: 1800, severity: "Low" },
    { month: "August", incidents: 65, area: 1200, severity: "Low" },
    { month: "September", incidents: 95, area: 2100, severity: "Low" },
    { month: "October", incidents: 140, area: 3800, severity: "Medium" },
    { month: "November", incidents: 220, area: 6500, severity: "Medium" },
    { month: "December", incidents: 80, area: 2200, severity: "Low" }
  ]
};

// Chart configuration and styling
export const chartConfigs = {
  colors: {
    primary: "#16a34a",
    secondary: "#15803d", 
    accent: "#ea580c",
    success: "#22c55e",
    warning: "#eab308",
    danger: "#dc2626",
    info: "#0ea5e9",
    light: "#f8fafc",
    dark: "#1e293b"
  },
  
  gradients: {
    forest: ["#16a34a", "#22c55e", "#4ade80"],
    biodiversity: ["#8b5cf6", "#a78bfa", "#c4b5fd"],
    conservation: ["#0ea5e9", "#38bdf8", "#7dd3fc"],
    threats: ["#dc2626", "#ef4444", "#f87171"]
  },

  animations: {
    duration: 1000,
    easing: "easeInOutCubic",
    delay: 100
  },

  responsive: {
    mobile: { width: 350, height: 250 },
    tablet: { width: 500, height: 350 },
    desktop: { width: 700, height: 450 }
  }
};