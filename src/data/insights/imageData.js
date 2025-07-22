// Image data and metadata for forest insights
export const imageData = {
  // Hero images for different sections
  heroImages: [
    {
      id: 1,
      url: "/images/insights/forest-canopy-hero.jpg",
      alt: "Dense forest canopy from above",
      title: "India's Forest Heritage",
      description: "Exploring the rich biodiversity and ecological importance of Indian forests",
      category: "hero"
    },
    {
      id: 2,
      url: "/images/insights/tiger-in-forest.jpg", 
      alt: "Bengal tiger in natural habitat",
      title: "Wildlife Conservation Success",
      description: "Celebrating the recovery of India's flagship species",
      category: "hero"
    },
    {
      id: 3,
      url: "/images/insights/mangrove-aerial.jpg",
      alt: "Aerial view of mangrove forests",
      title: "Coastal Forest Guardians", 
      description: "Mangroves protecting India's coastline and marine ecosystems",
      category: "hero"
    }
  ],

  // Region-specific images
  regionImages: {
    westernGhats: [
      {
        url: "/images/regions/western-ghats-mist.jpg",
        alt: "Misty Western Ghats forest",
        caption: "Morning mist over Western Ghats rainforest",
        credit: "Forest Department"
      },
      {
        url: "/images/regions/western-ghats-waterfall.jpg",
        alt: "Waterfall in Western Ghats",
        caption: "Pristine waterfall in Western Ghats biodiversity hotspot",
        credit: "Wildlife Photography"
      },
      {
        url: "/images/regions/western-ghats-endemic-species.jpg",
        alt: "Endemic species of Western Ghats",
        caption: "Lion-tailed macaque, endemic to Western Ghats",
        credit: "Conservation India"
      }
    ],
    easternHimalayas: [
      {
        url: "/images/regions/eastern-himalayas-rhododendron.jpg",
        alt: "Rhododendron forests in Eastern Himalayas",
        caption: "Blooming rhododendrons in Eastern Himalayan forests",
        credit: "Mountain Photography"
      },
      {
        url: "/images/regions/eastern-himalayas-red-panda.jpg",
        alt: "Red panda in bamboo forest",
        caption: "Red panda in its natural bamboo habitat",
        credit: "WWF India"
      },
      {
        url: "/images/regions/eastern-himalayas-valley.jpg",
        alt: "Forest valley in Eastern Himalayas",
        caption: "Pristine forest valley showcasing biodiversity",
        credit: "Forest Survey of India"
      }
    ],
    centralIndia: [
      {
        url: "/images/regions/central-india-tiger-territory.jpg",
        alt: "Tiger territory in Central India",
        caption: "Dense sal forests - prime tiger habitat",
        credit: "Project Tiger"
      },
      {
        url: "/images/regions/central-india-deciduous.jpg",
        alt: "Deciduous forest in Central India",
        caption: "Tropical deciduous forest during monsoon",
        credit: "Forest Department"
      },
      {
        url: "/images/regions/central-india-wildlife-corridor.jpg",
        alt: "Wildlife corridor in Central India",
        caption: "Important wildlife corridor connecting forest patches",
        credit: "Wildlife Institute of India"
      }
    ],
    sundarbans: [
      {
        url: "/images/regions/sundarbans-mangrove-roots.jpg",
        alt: "Mangrove root system",
        caption: "Complex root system of mangrove trees",
        credit: "Sundarbans Tiger Reserve"
      },
      {
        url: "/images/regions/sundarbans-tiger-swimming.jpg",
        alt: "Tiger swimming in Sundarbans",
        caption: "Royal Bengal tiger swimming through mangrove channels",
        credit: "Wildlife Photography"
      },
      {
        url: "/images/regions/sundarbans-boat-safari.jpg",
        alt: "Boat safari in Sundarbans",
        caption: "Eco-tourism boat safari in mangrove waterways",
        credit: "West Bengal Tourism"
      }
    ]
  },

  // Species images with detailed metadata
  speciesImages: {
    mammals: [
      {
        species: "Bengal Tiger",
        url: "/images/species/bengal-tiger-portrait.jpg",
        alt: "Bengal tiger close-up portrait",
        scientificName: "Panthera tigris tigris",
        habitat: "Tropical forests and grasslands",
        status: "Endangered",
        population: "2,967 individuals",
        photographer: "Wildlife Photographer",
        location: "Ranthambore National Park"
      },
      {
        species: "Indian Elephant",
        url: "/images/species/indian-elephant-herd.jpg",
        alt: "Indian elephant herd in forest",
        scientificName: "Elephas maximus indicus",
        habitat: "Tropical forests and grasslands", 
        status: "Endangered",
        population: "29,000 individuals",
        photographer: "Conservation Photographer",
        location: "Periyar Wildlife Sanctuary"
      },
      {
        species: "Asiatic Lion",
        url: "/images/species/asiatic-lion-pride.jpg",
        alt: "Asiatic lion pride resting",
        scientificName: "Panthera leo persica",
        habitat: "Dry deciduous forests",
        status: "Endangered", 
        population: "674 individuals",
        photographer: "Big Cat Specialist",
        location: "Gir National Park"
      },
      {
        species: "Indian Rhinoceros",
        url: "/images/species/indian-rhino-grassland.jpg",
        alt: "Indian rhinoceros in grassland",
        scientificName: "Rhinoceros unicornis",
        habitat: "Grasslands and riverine forests",
        status: "Vulnerable",
        population: "3,588 individuals", 
        photographer: "Rhino Specialist",
        location: "Kaziranga National Park"
      }
    ],
    birds: [
      {
        species: "Great Indian Bustard",
        url: "/images/species/great-indian-bustard.jpg",
        alt: "Great Indian Bustard in grassland",
        scientificName: "Ardeotis nigriceps",
        habitat: "Grasslands and scrublands",
        status: "Critically Endangered",
        population: "150 individuals",
        photographer: "Bird Photographer",
        location: "Rajasthan"
      },
      {
        species: "Sarus Crane",
        url: "/images/species/sarus-crane-pair.jpg",
        alt: "Sarus crane pair in wetland",
        scientificName: "Antigone antigone", 
        habitat: "Wetlands and agricultural fields",
        status: "Vulnerable",
        population: "15,000 individuals",
        photographer: "Wetland Specialist",
        location: "Uttar Pradesh"
      }
    ]
  },

  // Conservation success images
  conservationImages: [
    {
      program: "Project Tiger",
      url: "/images/conservation/project-tiger-success.jpg",
      alt: "Tiger population recovery success",
      caption: "Tiger numbers increased from 1,411 to 2,967",
      year: "1973-2018",
      impact: "110% population increase"
    },
    {
      program: "Project Elephant", 
      url: "/images/conservation/elephant-corridor.jpg",
      alt: "Elephant using wildlife corridor",
      caption: "Successful elephant corridor reducing human-elephant conflict",
      year: "1992-present",
      impact: "88 corridors established"
    },
    {
      program: "Mangrove Restoration",
      url: "/images/conservation/mangrove-plantation.jpg",
      alt: "Community mangrove plantation",
      caption: "Community-led mangrove restoration program",
      year: "1987-present", 
      impact: "2,000 hectares restored"
    }
  ],

  // Infographic and chart supporting images
  infographicImages: [
    {
      type: "forest-types-diagram",
      url: "/images/infographics/forest-types-india.jpg",
      alt: "Diagram showing different forest types in India",
      description: "Visual representation of India's diverse forest ecosystems"
    },
    {
      type: "biodiversity-pyramid",
      url: "/images/infographics/biodiversity-pyramid.jpg", 
      alt: "Biodiversity pyramid showing species distribution",
      description: "Hierarchical representation of species diversity"
    },
    {
      type: "ecosystem-services",
      url: "/images/infographics/ecosystem-services-wheel.jpg",
      alt: "Circular diagram of ecosystem services",
      description: "Visual guide to forest ecosystem services and benefits"
    },
    {
      type: "conservation-timeline",
      url: "/images/infographics/conservation-timeline.jpg",
      alt: "Timeline of major conservation milestones",
      description: "Historical timeline of India's conservation achievements"
    }
  ],

  // Background and texture images
  backgroundImages: [
    {
      type: "forest-texture",
      url: "/images/backgrounds/forest-canopy-texture.jpg",
      alt: "Forest canopy texture background",
      usage: "Section backgrounds and overlays"
    },
    {
      type: "leaf-pattern",
      url: "/images/backgrounds/leaf-pattern-subtle.jpg",
      alt: "Subtle leaf pattern background",
      usage: "Card backgrounds and decorative elements"
    },
    {
      type: "wood-grain",
      url: "/images/backgrounds/natural-wood-grain.jpg",
      alt: "Natural wood grain texture",
      usage: "Header and footer backgrounds"
    }
  ],

  // Interactive map markers and icons
  mapAssets: [
    {
      type: "national-park-marker",
      url: "/images/icons/national-park-pin.svg",
      alt: "National park location marker",
      size: "32x32"
    },
    {
      type: "wildlife-sanctuary-marker", 
      url: "/images/icons/wildlife-sanctuary-pin.svg",
      alt: "Wildlife sanctuary location marker",
      size: "32x32"
    },
    {
      type: "tiger-reserve-marker",
      url: "/images/icons/tiger-reserve-pin.svg", 
      alt: "Tiger reserve location marker",
      size: "32x32"
    },
    {
      type: "biosphere-reserve-marker",
      url: "/images/icons/biosphere-reserve-pin.svg",
      alt: "Biosphere reserve location marker", 
      size: "32x32"
    }
  ]
};

// Image optimization and loading utilities
export const imageUtils = {
  // Generate responsive image URLs
  getResponsiveImageUrl: (baseUrl, size = 'medium') => {
    const sizes = {
      small: '400w',
      medium: '800w', 
      large: '1200w',
      xlarge: '1600w'
    };
    
    // In a real implementation, this would generate different sized versions
    return `${baseUrl}?w=${sizes[size]}`;
  },

  // Generate image srcSet for responsive images
  generateSrcSet: (baseUrl) => {
    const sizes = [400, 800, 1200, 1600];
    return sizes.map(size => `${baseUrl}?w=${size} ${size}w`).join(', ');
  },

  // Get placeholder image while loading
  getPlaceholderUrl: (width = 800, height = 600, category = 'forest') => {
    const colors = {
      forest: '16a34a',
      wildlife: '15803d', 
      conservation: '0ea5e9',
      species: '8b5cf6'
    };
    
    return `https://via.placeholder.com/${width}x${height}/${colors[category]}/ffffff?text=Loading...`;
  },

  // Validate image URL
  isValidImageUrl: (url) => {
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.svg'];
    return imageExtensions.some(ext => url.toLowerCase().includes(ext));
  },

  // Get image metadata
  getImageMetadata: (imageId, category) => {
    switch(category) {
      case 'hero':
        return imageData.heroImages.find(img => img.id === imageId);
      case 'species':
        return imageData.speciesImages.mammals.find(img => img.species === imageId) ||
               imageData.speciesImages.birds.find(img => img.species === imageId);
      case 'conservation':
        return imageData.conservationImages.find(img => img.program === imageId);
      default:
        return null;
    }
  }
};