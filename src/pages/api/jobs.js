// pages/api/jobs.js
export default function handler(req, res) {
    // In a real application, you would fetch this data from a database
    const jobs = [
      {
        id: 1,
        title: "Forest Conservation Officer",
        description: "Lead conservation efforts in protected forest areas.",
        location: "Maharashtra",
        experience: "3-5 years",
      },
      {
        id: 2,
        title: "Wildlife Biologist",
        description: "Conduct research on native wildlife species and their habitats.",
        location: "Karnataka",
        experience: "2-4 years",
      },
      {
        id: 3,
        title: "Sustainable Forestry Consultant",
        description: "Advise on sustainable forest management practices.",
        location: "Uttarakhand",
        experience: "5-7 years",
      },
      {
        id: 4,
        title: "Environmental Education Specialist",
        description: "Develop and implement forest education programs for schools and communities.",
        location: "Tamil Nadu",
        experience: "2-3 years",
      },
    ];
  
    res.status(200).json(jobs);
  }