// Conservation impact and success stories data
export const conservationImpact = {
  // Major conservation programs and their impact
  majorPrograms: [
    {
      id: 1,
      name: "Project Tiger",
      launchYear: 1973,
      description: "India's flagship conservation program to protect Bengal tigers and their habitats",
      image: "/images/conservation/project-tiger.jpg",
      impact: {
        tigerPopulation: {
          before: 1827, // 1972
          after: 2967,  // 2018
          increase: "62%"
        },
        reserves: 52,
        areaProtected: "75,000 sq km",
        states: 18
      },
      keyAchievements: [
        "Tiger population increased from 1,827 to 2,967",
        "Established 52 tiger reserves across 18 states",
        "Protected 75,000 sq km of critical tiger habitat",
        "Reduced poaching incidents by 40%"
      ],
      challenges: [
        "Human-tiger conflict in buffer zones",
        "Habitat fragmentation due to infrastructure",
        "Prey depletion in some reserves"
      ],
      futureGoals: [
        "Achieve 3,500 tigers by 2030",
        "Establish more tiger corridors",
        "Enhance community participation"
      ]
    },
    {
      id: 2,
      name: "Project Elephant",
      launchYear: 1992,
      description: "Conservation program to protect elephants, their habitats and corridors",
      image: "/images/conservation/project-elephant.jpg",
      impact: {
        elephantPopulation: {
          before: 26000, // 1992
          after: 29000,  // 2017
          increase: "12%"
        },
        reserves: 32,
        corridors: 88,
        states: 16
      },
      keyAchievements: [
        "Established 32 elephant reserves",
        "Identified and protected 88 elephant corridors",
        "Reduced human-elephant conflict by 25%",
        "Improved welfare of 2,500 captive elephants"
      ],
      challenges: [
        "Increasing human-elephant conflict",
        "Habitat fragmentation",
        "Linear infrastructure barriers"
      ],
      futureGoals: [
        "Secure all identified corridors",
        "Reduce conflict incidents by 50%",
        "Establish transboundary conservation"
      ]
    },
    {
      id: 3,
      name: "Mangrove Conservation",
      launchYear: 1987,
      description: "Protection and restoration of mangrove ecosystems along Indian coasts",
      image: "/images/conservation/mangrove-restoration.jpg",
      impact: {
        mangroveArea: {
          before: 4200, // 1987
          after: 4975,  // 2019
          increase: "18%"
        },
        restoredArea: "2000 hectares",
        protectedCoastline: "7500 km",
        communities: 500
      },
      keyAchievements: [
        "Restored 2,000 hectares of degraded mangroves",
        "Protected 7,500 km of coastline",
        "Benefited 500 coastal communities",
        "Sequestered 1.5 million tonnes of carbon"
      ],
      challenges: [
        "Sea level rise due to climate change",
        "Coastal development pressure",
        "Aquaculture expansion"
      ],
      futureGoals: [
        "Restore 5,000 hectares by 2030",
        "Establish community-based management",
        "Enhance climate resilience"
      ]
    }
  ],

  // Success stories by species
  speciesRecovery: [
    {
      species: "Asiatic Lion",
      location: "Gir Forest, Gujarat",
      timeline: "1900-2020",
      populationTrend: {
        1900: 100,
        1970: 180,
        2000: 359,
        2010: 411,
        2020: 674
      },
      conservationMeasures: [
        "Habitat protection and management",
        "Community involvement in conservation",
        "Veterinary care and disease management",
        "Prey base enhancement"
      ],
      currentStatus: "Population stable and growing",
      challenges: ["Limited habitat", "Disease outbreaks", "Genetic diversity"],
      image: "/images/conservation/asiatic-lion-recovery.jpg"
    },
    {
      species: "Indian Rhinoceros",
      location: "Kaziranga National Park, Assam",
      timeline: "1900-2020",
      populationTrend: {
        1900: 200,
        1970: 366,
        2000: 1552,
        2010: 2329,
        2020: 3588
      },
      conservationMeasures: [
        "Strict protection and anti-poaching",
        "Habitat management and expansion",
        "Translocation to new areas",
        "Community awareness programs"
      ],
      currentStatus: "Population recovering steadily",
      challenges: ["Poaching pressure", "Habitat limitation", "Floods"],
      image: "/images/conservation/rhino-recovery.jpg"
    },
    {
      species: "Gharial",
      location: "Chambal River System",
      timeline: "1970-2020",
      populationTrend: {
        1970: 60,
        1980: 200,
        2000: 182,
        2010: 200,
        2020: 650
      },
      conservationMeasures: [
        "Captive breeding and release programs",
        "Habitat protection and restoration",
        "Community engagement",
        "Research and monitoring"
      ],
      currentStatus: "Slowly recovering from near extinction",
      challenges: ["River pollution", "Sand mining", "Fishing nets"],
      image: "/images/conservation/gharial-recovery.jpg"
    }
  ],

  // Community conservation initiatives
  communityConservation: [
    {
      name: "Joint Forest Management",
      description: "Community-based forest management program involving local communities",
      coverage: "118,000 committees managing 24 million hectares",
      impact: [
        "Reduced forest degradation by 30%",
        "Improved livelihood of 6 million families",
        "Enhanced biodiversity conservation",
        "Increased forest cover by 2.5%"
      ],
      keyFeatures: [
        "Participatory forest management",
        "Benefit sharing mechanisms",
        "Capacity building programs",
        "Alternative livelihood options"
      ]
    },
    {
      name: "Eco-Development Committees",
      description: "Community groups formed around protected areas for conservation",
      coverage: "1,500 committees around 400 protected areas",
      impact: [
        "Reduced human-wildlife conflict by 35%",
        "Improved habitat quality",
        "Enhanced community awareness",
        "Sustainable livelihood generation"
      ],
      keyFeatures: [
        "Conservation education",
        "Eco-tourism development",
        "Sustainable resource use",
        "Conflict mitigation"
      ]
    }
  ],

  // Technology in conservation
  technologyImpact: [
    {
      technology: "Camera Traps",
      application: "Wildlife monitoring and research",
      coverage: "15,000+ cameras across India",
      impact: [
        "Accurate population estimation",
        "Behavioral studies",
        "Anti-poaching surveillance",
        "Habitat use analysis"
      ]
    },
    {
      technology: "Satellite Monitoring",
      application: "Forest cover assessment and fire detection",
      coverage: "Pan-India coverage",
      impact: [
        "Real-time forest fire alerts",
        "Deforestation monitoring",
        "Habitat mapping",
        "Conservation planning"
      ]
    },
    {
      technology: "GPS Collaring",
      application: "Animal movement tracking",
      coverage: "500+ animals across species",
      impact: [
        "Corridor identification",
        "Conflict prediction",
        "Habitat requirements",
        "Migration patterns"
      ]
    },
    {
      technology: "Drones",
      application: "Surveillance and monitoring",
      coverage: "200+ protected areas",
      impact: [
        "Anti-poaching operations",
        "Wildlife census",
        "Habitat assessment",
        "Emergency response"
      ]
    }
  ],

  // International recognition and awards
  internationalRecognition: [
    {
      award: "UNESCO World Heritage Sites",
      sites: [
        "Kaziranga National Park",
        "Keoladeo National Park",
        "Sundarbans National Park",
        "Manas Wildlife Sanctuary",
        "Western Ghats"
      ],
      significance: "Global recognition of conservation value"
    },
    {
      award: "Ramsar Wetland Sites",
      sites: 46,
      significance: "International importance for waterfowl conservation"
    },
    {
      award: "Biosphere Reserves",
      sites: 18,
      significance: "UNESCO recognition for ecosystem conservation"
    }
  ],

  // Economic impact of conservation
  economicImpact: {
    ecotourism: {
      revenue: "₹15,000 crores annually",
      employment: "4.8 million jobs",
      growth: "15% annually"
    },
    ecosystemServices: {
      value: "₹8.2 trillion annually",
      services: [
        "Carbon sequestration",
        "Water regulation",
        "Soil conservation",
        "Biodiversity conservation"
      ]
    },
    forestProducts: {
      value: "₹1.2 trillion annually",
      products: [
        "Timber and bamboo",
        "Non-timber forest products",
        "Medicinal plants",
        "Honey and wax"
      ]
    }
  },

  // Future conservation goals
  futureGoals: [
    {
      goal: "Increase Forest Cover",
      target: "33% of geographical area by 2030",
      current: "21.67%",
      strategies: [
        "Afforestation programs",
        "Agroforestry promotion",
        "Urban forestry",
        "Degraded land restoration"
      ]
    },
    {
      goal: "Species Recovery",
      target: "Improve conservation status of 500 threatened species",
      strategies: [
        "Habitat restoration",
        "Captive breeding programs",
        "Translocation projects",
        "Genetic rescue programs"
      ]
    },
    {
      goal: "Climate Resilience",
      target: "Build climate-resilient ecosystems",
      strategies: [
        "Assisted migration",
        "Corridor enhancement",
        "Adaptive management",
        "Community resilience"
      ]
    },
    {
      goal: "Sustainable Financing",
      target: "Mobilize ₹50,000 crores for conservation",
      strategies: [
        "Green bonds",
        "Payment for ecosystem services",
        "Carbon markets",
        "Private sector engagement"
      ]
    }
  ]
};