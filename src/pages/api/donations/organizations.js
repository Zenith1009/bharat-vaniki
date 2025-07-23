// Mock data for conservation organizations
const mockOrganizations = [
  {
    id: 1,
    name: "Wildlife Conservation Trust",
    type: "Non-Profit Organization",
    established: 1993,
    mission: "To ensure the survival of India's wildlife and wild places for future generations through conservation science and community participation.",
    description: "Dedicated to protecting India's wildlife and their habitats through scientific research, community engagement, and policy advocacy.",
    headquarters: "Mumbai, Maharashtra",
    website: "https://www.wct-india.org",
    donationUrl: "https://www.wct-india.org/donate",
    logo: "/images/organizations/wct-logo.png",
    image: "/images/organizations/wct-banner.jpg",
    verified: true,
    trustScore: 95,
    focusAreas: [
      "Tiger Conservation",
      "Marine Conservation", 
      "Human-Wildlife Conflict Resolution",
      "Conservation Education",
      "Wildlife Research",
      "Habitat Protection"
    ],
    keyPrograms: [
      {
        name: "Project Tiger Shield",
        description: "Anti-poaching and habitat protection for tigers in Maharashtra & Karnataka",
        impact: "Protected 15,000 hectares of tiger habitat"
      },
      {
        name: "Marine Turtle Conservation",
        description: "Protection of nesting beaches and turtle rehabilitation along Konkan Coast",
        impact: "Saved 2,500+ turtle hatchlings annually"
      },
      {
        name: "Human-Wildlife Conflict Mitigation",
        description: "Community-based solutions to reduce conflicts between humans and wildlife",
        impact: "60% reduction in conflict incidents"
      }
    ],
    financials: {
      totalRevenue: "₹15 crores",
      rating: "4.8/5",
      programExpenses: "85%",
      adminExpenses: "10%",
      fundraisingExpenses: "5%"
    },
    certifications: [
      "12A Registration",
      "80G Tax Exemption",
      "FCRA Approved",
      "GuideStar India Verified"
    ],
    contact: {
      email: "info@wct-india.org",
      phone: "+91-22-2570-6666",
      address: "A-220, Boomerang, Chandivali Farm Road, Andheri (E), Mumbai - 400072",
      website: "https://www.wct-india.org"
    },
    socialMedia: {
      facebook: "https://facebook.com/WCTIndia",
      twitter: "https://twitter.com/WCTIndia",
      instagram: "https://instagram.com/wctindia"
    }
  },
  {
    id: 2,
    name: "Green India Foundation",
    type: "Environmental NGO",
    established: 2001,
    mission: "To create a greener India through community-driven environmental conservation and sustainable development programs.",
    description: "Working towards environmental conservation through reforestation, sustainable development, and climate action initiatives across India.",
    headquarters: "New Delhi",
    website: "https://www.greenindiafoundation.org",
    donationUrl: "https://www.greenindiafoundation.org/donate",
    logo: "/images/organizations/gif-logo.png",
    image: "/images/organizations/gif-banner.jpg",
    verified: true,
    trustScore: 92,
    focusAreas: [
      "Tree Plantation Drives",
      "Watershed Management",
      "Renewable Energy Projects",
      "Environmental Education",
      "Climate Action",
      "Sustainable Development"
    ],
    keyPrograms: [
      {
        name: "Million Trees Initiative",
        description: "Large-scale reforestation with native species across India",
        impact: "2 million trees planted across 15 states"
      },
      {
        name: "Green Schools Program",
        description: "Environmental education and school gardens in rural areas",
        impact: "500+ schools with environmental programs"
      },
      {
        name: "Watershed Management",
        description: "Community-based water conservation and soil restoration",
        impact: "25,000 hectares of degraded land restored"
      }
    ],
    financials: {
      totalRevenue: "₹8.5 crores",
      rating: "4.6/5",
      programExpenses: "82%",
      adminExpenses: "12%",
      fundraisingExpenses: "6%"
    },
    certifications: [
      "12A Registration",
      "80G Tax Exemption",
      "FCRA Approved",
      "ISO 14001 Certified"
    ],
    contact: {
      email: "contact@greenindiafoundation.org",
      phone: "+91-11-4567-8900",
      address: "Green House, Sector 15, Dwarka, New Delhi - 110075",
      website: "https://www.greenindiafoundation.org"
    },
    socialMedia: {
      facebook: "https://facebook.com/GreenIndiaFoundation",
      twitter: "https://twitter.com/GreenIndiaFound",
      instagram: "https://instagram.com/greenindiafoundation"
    }
  },
  {
    id: 3,
    name: "Sundarbans Conservation Society",
    type: "Conservation NGO",
    established: 1995,
    mission: "To conserve the Sundarbans ecosystem while ensuring sustainable livelihoods for local communities.",
    description: "Dedicated to protecting the Sundarbans mangrove ecosystem and supporting local communities dependent on this unique environment.",
    headquarters: "Kolkata, West Bengal",
    website: "https://www.sundarbanssociety.org",
    donationUrl: "https://www.sundarbanssociety.org/support",
    logo: "/images/organizations/scs-logo.png",
    image: "/images/organizations/scs-banner.jpg",
    verified: true,
    trustScore: 90,
    focusAreas: [
      "Mangrove Restoration",
      "Tiger Conservation",
      "Sustainable Fisheries",
      "Climate Adaptation",
      "Community Development",
      "Marine Conservation"
    ],
    keyPrograms: [
      {
        name: "Mangrove Restoration Project",
        description: "Large-scale mangrove plantation and protection in Sundarbans Delta",
        impact: "5,000 hectares of mangrove forests restored"
      },
      {
        name: "Tiger Coexistence Program",
        description: "Reducing human-tiger conflict through community engagement",
        impact: "70% reduction in human-tiger conflicts"
      },
      {
        name: "Sustainable Fisheries Initiative",
        description: "Training fishermen in sustainable practices and alternative livelihoods",
        impact: "2,000+ fishermen trained in sustainable practices"
      }
    ],
    financials: {
      totalRevenue: "₹12 crores",
      rating: "4.7/5",
      programExpenses: "88%",
      adminExpenses: "8%",
      fundraisingExpenses: "4%"
    },
    certifications: [
      "12A Registration",
      "80G Tax Exemption",
      "FCRA Approved",
      "UNESCO Partnership"
    ],
    contact: {
      email: "info@sundarbanssociety.org",
      phone: "+91-33-2345-6789",
      address: "Sundarbans House, Salt Lake, Kolkata - 700064",
      website: "https://www.sundarbanssociety.org"
    },
    socialMedia: {
      facebook: "https://facebook.com/SundarbansConservation",
      twitter: "https://twitter.com/SundarbansCS",
      instagram: "https://instagram.com/sundarbanssociety"
    }
  },
  {
    id: 4,
    name: "Himalayan Ecology Foundation",
    type: "Mountain Conservation NGO",
    established: 1988,
    mission: "To protect Himalayan ecosystems and promote sustainable mountain development.",
    description: "Focused on conserving high-altitude ecosystems and supporting mountain communities in the Indian Himalayas.",
    headquarters: "Dehradun, Uttarakhand",
    website: "https://www.himalayanecology.org",
    donationUrl: "https://www.himalayanecology.org/donate",
    logo: "/images/organizations/hef-logo.png",
    image: "/images/organizations/hef-banner.jpg",
    verified: true,
    trustScore: 89,
    focusAreas: [
      "Alpine Forest Conservation",
      "Watershed Protection",
      "Sustainable Tourism",
      "Traditional Knowledge Preservation",
      "Mountain Ecology",
      "Community Development"
    ],
    keyPrograms: [
      {
        name: "High Altitude Forest Protection",
        description: "Conservation of critical watershed forests in Uttarakhand Himalayas",
        impact: "15,000 hectares of alpine forests protected"
      },
      {
        name: "Sustainable Mountain Tourism",
        description: "Community-based eco-tourism development in Himalayan villages",
        impact: "1,500+ mountain guides trained in eco-tourism"
      },
      {
        name: "Traditional Knowledge Documentation",
        description: "Preserving indigenous knowledge of medicinal plants and practices",
        impact: "500+ traditional medicinal plants documented"
      }
    ],
    financials: {
      totalRevenue: "₹6.5 crores",
      rating: "4.5/5",
      programExpenses: "84%",
      adminExpenses: "11%",
      fundraisingExpenses: "5%"
    },
    certifications: [
      "12A Registration",
      "80G Tax Exemption",
      "FCRA Approved",
      "Mountain Partnership UN"
    ],
    contact: {
      email: "contact@himalayanecology.org",
      phone: "+91-135-2345-678",
      address: "Mountain House, Rajpur Road, Dehradun - 248001",
      website: "https://www.himalayanecology.org"
    },
    socialMedia: {
      facebook: "https://facebook.com/HimalayanEcology",
      twitter: "https://twitter.com/HimalayanEco",
      instagram: "https://instagram.com/himalayanecology"
    }
  },
  {
    id: 5,
    name: "Wildlife Protection Force",
    type: "Wildlife Law Enforcement",
    established: 2005,
    mission: "To eliminate wildlife crime and ensure the safety of India's endangered species.",
    description: "Specialized in anti-poaching operations and wildlife law enforcement across India's protected areas.",
    headquarters: "Bangalore, Karnataka",
    website: "https://www.wildlifeprotectionforce.org",
    donationUrl: "https://www.wildlifeprotectionforce.org/support",
    logo: "/images/organizations/wpf-logo.png",
    image: "/images/organizations/wpf-banner.jpg",
    verified: true,
    trustScore: 94,
    focusAreas: [
      "Anti-Poaching Operations",
      "Wildlife Crime Investigation",
      "Technology for Conservation",
      "Ranger Training",
      "Law Enforcement",
      "Wildlife Protection"
    ],
    keyPrograms: [
      {
        name: "Operation Tiger Guard",
        description: "24/7 anti-poaching patrols in tiger reserves across Central India",
        impact: "500+ poaching incidents prevented"
      },
      {
        name: "Wildlife Crime Database",
        description: "Digital tracking of wildlife crimes and criminals across India",
        impact: "200+ wildlife criminals arrested"
      },
      {
        name: "Ranger Training Program",
        description: "Advanced training for forest rangers in anti-poaching techniques",
        impact: "800+ forest rangers trained"
      }
    ],
    financials: {
      totalRevenue: "₹10 crores",
      rating: "4.9/5",
      programExpenses: "90%",
      adminExpenses: "7%",
      fundraisingExpenses: "3%"
    },
    certifications: [
      "12A Registration",
      "80G Tax Exemption",
      "FCRA Approved",
      "INTERPOL Partnership"
    ],
    contact: {
      email: "info@wildlifeprotectionforce.org",
      phone: "+91-80-1234-5678",
      address: "Protection House, Koramangala, Bangalore - 560034",
      website: "https://www.wildlifeprotectionforce.org"
    },
    socialMedia: {
      facebook: "https://facebook.com/WildlifeProtectionForce",
      twitter: "https://twitter.com/WildlifeProtect",
      instagram: "https://instagram.com/wildlifeprotectionforce"
    }
  }
];

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Simulate API delay
    setTimeout(() => {
      res.status(200).json(mockOrganizations);
    }, 100);
  } catch (error) {
    console.error('Error fetching organizations:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}