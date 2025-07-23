// Mock data for donation causes
const mockCauses = [
  {
    id: 1,
    title: "Protect Western Ghats Biodiversity",
    shortDescription: "Support conservation efforts in one of the world's most biodiverse regions. Help protect endangered species and their habitats in the Western Ghats.",
    description: "The Western Ghats are one of the world's eight biodiversity hotspots, home to thousands of endemic species. This critical ecosystem faces threats from deforestation, mining, and climate change. Your donation supports habitat protection, wildlife monitoring, and community engagement programs.",
    category: "Wildlife Protection",
    organization: "Wildlife Conservation Trust",
    organizationId: 1,
    targetAmount: 500000,
    raisedAmount: 325000,
    donorsCount: 1250,
    featured: true,
    verified: true,
    imageUrl: "/images/causes/western-ghats.jpg",
    websiteUrl: "https://www.wct-india.org/western-ghats",
    donationUrl: "https://www.wct-india.org/donate/western-ghats",
    urgency: "high",
    location: "Western Ghats, India",
    impact: {
      habitatProtected: "15,000 hectares",
      speciesMonitored: 250,
      communitiesEngaged: 45,
      treesPlanted: 50000
    },
    transparency: {
      programExpenses: "85%",
      financialRating: "4.8/5",
      verificationStatus: "Verified"
    },
    tags: ["biodiversity", "endangered species", "habitat protection"],
    createdAt: "2024-01-15T00:00:00Z",
    updatedAt: "2024-01-20T00:00:00Z"
  },
  {
    id: 2,
    title: "Reforestation in Madhya Pradesh",
    shortDescription: "Plant native trees and restore degraded forest lands in Madhya Pradesh. Each donation helps plant and maintain trees for 5 years.",
    description: "Madhya Pradesh has lost significant forest cover due to agricultural expansion and development. Our reforestation program focuses on planting native species, restoring degraded lands, and creating sustainable livelihoods for local communities through forest-based enterprises.",
    category: "Reforestation",
    organization: "Green India Foundation",
    organizationId: 2,
    targetAmount: 300000,
    raisedAmount: 180000,
    donorsCount: 890,
    featured: true,
    verified: true,
    imageUrl: "/images/causes/reforestation.jpg",
    websiteUrl: "https://www.greenindiafoundation.org/reforestation",
    donationUrl: "https://www.greenindiafoundation.org/donate/reforestation",
    urgency: "medium",
    location: "Madhya Pradesh, India",
    impact: {
      treesPlanted: 50000,
      landRestored: "2,500 hectares",
      communitiesSupported: 25,
      carbonSequestered: "10,000 tons"
    },
    transparency: {
      programExpenses: "82%",
      financialRating: "4.6/5",
      verificationStatus: "Verified"
    },
    tags: ["reforestation", "climate change", "native species"],
    createdAt: "2024-01-10T00:00:00Z",
    updatedAt: "2024-01-18T00:00:00Z"
  },
  {
    id: 3,
    title: "Save the Sundarbans Mangroves",
    shortDescription: "Protect the world's largest mangrove forest and home to the Royal Bengal Tiger. Support community-based conservation efforts.",
    description: "The Sundarbans mangrove forest is a UNESCO World Heritage Site and critical habitat for the endangered Royal Bengal Tiger. Rising sea levels and human activities threaten this unique ecosystem. Your support helps protect mangroves, reduce human-wildlife conflict, and develop sustainable livelihoods.",
    category: "Habitat Conservation",
    organization: "Sundarbans Conservation Society",
    organizationId: 3,
    targetAmount: 750000,
    raisedAmount: 420000,
    donorsCount: 1680,
    featured: true,
    verified: true,
    imageUrl: "/images/causes/sundarbans.jpg",
    websiteUrl: "https://www.sundarbanssociety.org/mangrove-conservation",
    donationUrl: "https://www.sundarbanssociety.org/donate/mangroves",
    urgency: "high",
    location: "Sundarbans, West Bengal",
    impact: {
      mangroveArea: "2,000 sq km",
      tigersProtected: 120,
      fishermenSupported: 500,
      coastlineProtected: "150 km"
    },
    transparency: {
      programExpenses: "88%",
      financialRating: "4.7/5",
      verificationStatus: "Verified"
    },
    tags: ["mangroves", "tigers", "coastal protection"],
    createdAt: "2024-01-05T00:00:00Z",
    updatedAt: "2024-01-22T00:00:00Z"
  },
  {
    id: 4,
    title: "Himalayan Forest Conservation",
    shortDescription: "Preserve high-altitude forests in the Himalayas that are crucial for water security and climate regulation across South Asia.",
    description: "Himalayan forests are vital for water security, climate regulation, and biodiversity conservation. These high-altitude ecosystems face threats from climate change, deforestation, and unsustainable development. Support conservation efforts that protect watersheds and mountain communities.",
    category: "Forest Protection",
    organization: "Himalayan Ecology Foundation",
    organizationId: 4,
    targetAmount: 400000,
    raisedAmount: 240000,
    donorsCount: 960,
    featured: false,
    verified: true,
    imageUrl: "/images/causes/himalayan-forest.jpg",
    websiteUrl: "https://www.himalayanecology.org/forest-conservation",
    donationUrl: "https://www.himalayanecology.org/donate/forests",
    urgency: "medium",
    location: "Himalayas, India",
    impact: {
      forestArea: "8,000 hectares",
      watershedsProtected: 15,
      communitiesSupported: 30,
      speciesConserved: 180
    },
    transparency: {
      programExpenses: "84%",
      financialRating: "4.5/5",
      verificationStatus: "Verified"
    },
    tags: ["mountains", "water security", "climate"],
    createdAt: "2024-01-12T00:00:00Z",
    updatedAt: "2024-01-19T00:00:00Z"
  },
  {
    id: 5,
    title: "Anti-Poaching Operations",
    shortDescription: "Fund anti-poaching patrols and technology to protect endangered wildlife from illegal hunting and trafficking.",
    description: "Wildlife poaching threatens India's endangered species including tigers, elephants, and rhinos. Our anti-poaching program deploys trained rangers, advanced technology, and community engagement to combat wildlife crime and protect critical habitats.",
    category: "Wildlife Protection",
    organization: "Wildlife Protection Force",
    organizationId: 5,
    targetAmount: 600000,
    raisedAmount: 380000,
    donorsCount: 1520,
    featured: false,
    verified: true,
    imageUrl: "/images/causes/anti-poaching.jpg",
    websiteUrl: "https://www.wildlifeprotectionforce.org/anti-poaching",
    donationUrl: "https://www.wildlifeprotectionforce.org/donate/anti-poaching",
    urgency: "high",
    location: "Multiple National Parks",
    impact: {
      parksProtected: 5,
      rangersDeployed: 120,
      poachingIncidentsPrevented: 500,
      wildlifeCriminalsArrested: 200
    },
    transparency: {
      programExpenses: "90%",
      financialRating: "4.9/5",
      verificationStatus: "Verified"
    },
    tags: ["anti-poaching", "law enforcement", "wildlife crime"],
    createdAt: "2024-01-08T00:00:00Z",
    updatedAt: "2024-01-21T00:00:00Z"
  },
  {
    id: 6,
    title: "Community Forest Management",
    shortDescription: "Empower local communities to manage and protect their forest resources through sustainable practices and alternative livelihoods.",
    description: "Local communities are the best guardians of forests when provided with proper support and incentives. This program empowers forest communities with sustainable livelihood options, conservation training, and forest management rights.",
    category: "Community Conservation",
    organization: "Rural Development Trust",
    organizationId: 6,
    targetAmount: 350000,
    raisedAmount: 210000,
    donorsCount: 840,
    featured: false,
    verified: true,
    imageUrl: "/images/causes/community-forest.jpg",
    websiteUrl: "https://www.ruraldevelopmenttrust.org/community-forests",
    donationUrl: "https://www.ruraldevelopmenttrust.org/donate/community",
    urgency: "medium",
    location: "Rural India",
    impact: {
      communitiesSupported: 50,
      forestAreaManaged: "12,000 hectares",
      familiesBenefited: 2500,
      alternativeLivelihoods: 800
    },
    transparency: {
      programExpenses: "86%",
      financialRating: "4.4/5",
      verificationStatus: "Verified"
    },
    tags: ["community", "sustainable development", "livelihoods"],
    createdAt: "2024-01-14T00:00:00Z",
    updatedAt: "2024-01-20T00:00:00Z"
  }
];

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Simulate API delay
    setTimeout(() => {
      res.status(200).json(mockCauses);
    }, 100);
  } catch (error) {
    console.error('Error fetching donation causes:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}