import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from 'next/link';

const conservationData = [
    {
        id: 1,
        name: "Project Tiger",
        description: "A national initiative to protect Bengal tigers and their habitats across India.",
        image: "/images/project-tiger.jpg",
        link: "https://en.wikipedia.org/wiki/Project_Tiger",
        extraContent: "Project Tiger, launched in 1973, is India's most successful conservation program. It has helped increase the tiger population from 1,827 in 1972 to 2,967 in 2018. The project focuses on habitat protection, anti-poaching measures, and community involvement."
    },
    {
        id: 2,
        name: "Mangrove Restoration",
        description: "Efforts to restore and protect mangrove ecosystems in coastal regions.",
        image: "/images/mangrove-restoration.jpg",
        link: "https://en.wikipedia.org/wiki/Mangrove_restoration",
        extraContent: "Mangrove restoration in India is crucial for protecting coastal areas from erosion and storm surges. It also provides habitat for diverse marine life and helps in carbon sequestration. The Sundarbans in West Bengal is the world's largest mangrove forest."
    },
    {
        id: 3,
        name: "Gharial Conservation",
        description: "Programs to protect and breed the critically endangered gharial crocodile.",
        image: "/images/gharial-conservation.jpg",
        link: "https://ircf.org/portfolio-view/gharial/",
        extraContent: "The gharial, a unique crocodilian species, is critically endangered. Conservation efforts include captive breeding programs, habitat protection, and reintroduction of gharials into their natural habitats in the rivers of northern India."
    },
    {
        id: 4,
        name: "Forest Fire Prevention",
        description: "Initiatives to prevent and manage forest fires in vulnerable areas.",
        image: "/images/forest-fire-prevention.jpg",
        link: "https://portal.ct.gov/deep/forestry/forest-fire/forest-fire-prevention-tips",
        extraContent: "Forest fire prevention in India involves community education, early warning systems, and rapid response teams. The Forest Survey of India uses satellite technology to detect and monitor forest fires across the country."
    },
    {
        id: 5,
        name: "Project Elephant",
        description: "This is a wildlife conservation movement initiated in India to protect the endangered Indian elephant.",
        image: "/images/project-elephat.jpg",
        link: "https://en.wikipedia.org/wiki/Project_Elephant",
        extraContent: "Project Elephant, launched in 1992, aims to protect elephants, their habitats and corridors. It also seeks to address human-elephant conflict. The project covers 16 states in India where wild elephants are found."
    },
    {
        id: 6,
        name: "Himalayan Medicinal Plants Conservation",
        description: "Programs to protect and sustainably manage rare medicinal plants in the Himalayan region.",
        image: "/images/medicinal-plant.jpg",
        link: "https://www.sciencedirect.com/science/article/abs/pii/S0006320705000777",
        extraContent: "The Himalayas are home to over 1,700 medicinal plant species. Conservation efforts focus on sustainable harvesting practices, cultivation of endangered species, and preserving traditional knowledge about these plants."
    },
    {
        id: 7,
        name: "Snow Leopard Conservation Program",
        description: "Efforts to protect the endangered snow leopards in the Himalayan region.",
        image: "/images/snow-leopard.jpg",
        link: "https://snowleopardconservancy.org",
        extraContent: "Snow leopard conservation in India involves habitat protection, anti-poaching measures, and community-based conservation. Project Snow Leopard was launched in 2009 to safeguard and conserve India's high altitude wildlife populations."
    },
    {
        id: 8,
        name: "Western Ghats Biodiversity Hotspot Conservation",
        description: "Programs to protect the rich biodiversity of the Western Ghats mountain range.",
        image: "/images/westernghats-biodiversity.jpg",
        link: "https://en.wikipedia.org/wiki/Western_Ghats#Threats_and_conservationg",
        extraContent: "The Western Ghats, a UNESCO World Heritage site, is one of the world's eight 'hottest hotspots' of biological diversity. Conservation efforts focus on protecting endemic species, preventing deforestation, and promoting sustainable development in the region."
    },
    {
        id: 9,
        name: "Indian Rhino Vision 2020",
        description: "A program aimed at increasing the population of Indian rhinoceros in Assam.",
        image: "/images/rhino.jpg",
        link: "https://en.wikipedia.org/wiki/Indian_rhinoceros#Conservation",
        extraContent: "Indian Rhino Vision 2020 was a collaborative effort to increase the rhino population in Assam to 3,000 by 2020. It involved translocating rhinos to new protected areas to establish viable populations and reduce the risk of poaching."
    }
];

const Sidebar = () => (
    <nav className="flex flex-col gap-4 mt-8">
        <Link href="/" className="text-lg hover:underline transition-colors duration-200 hover:text-green-200">Home</Link>
        <Link href="/forests" className="text-lg hover:underline transition-colors duration-200 hover:text-green-200">Forests</Link>
        <Link href="/gallery" className="text-lg hover:underline transition-colors duration-200 hover:text-green-200">Gallery</Link>
        <Link href="/plan-your-trip" className="text-lg hover:underline transition-colors duration-200 hover:text-green-200">Plan Your Trip</Link>
        <Link href="/ce_test" className="text-lg hover:underline transition-colors duration-200 hover:text-green-200">Conservation Efforts</Link>
        <Link href="/about" className="text-lg hover:underline transition-colors duration-200 hover:text-green-200">About</Link>
    </nav>
);

const ConservationEffortsPage = () => {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [expandedCard, setExpandedCard] = useState(null);

    const toggleCardExpansion = (id) => {
        setExpandedCard(expandedCard === id ? null : id);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 w-full">
            <header className="bg-green-800 text-white p-2 w-full">
                <div className="container mx-auto px-4 flex items-center justify-between">
                    <Sheet open={isNavOpen} onOpenChange={setIsNavOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="text-white hover:bg-green-700">
                                <Menu className="h-6 w-6" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="bg-green-700 text-white">
                            <Sidebar />
                        </SheetContent>
                    </Sheet>
                    <div className="text-center flex-grow">
                        <h1 className="text-2xl font-bold">Conservation Efforts</h1>
                        <p className="text-sm">Protecting India's natural heritage</p>
                    </div>
                </div>
            </header>

            <main className="flex-grow p-4 w-full">
                <div className="max-w-full mx-auto">
                    <Card className="bg-green-100 border-green-300 mb-8">
                        <CardHeader>
                            <CardTitle className="text-2xl text-green-800">Preserving Our Forests for Future Generations</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-green-700">India's forests are home to a rich biodiversity and play a crucial role in maintaining ecological balance. Our conservation efforts aim to protect these vital ecosystems and the countless species that depend on them.</p>
                        </CardContent>
                    </Card>

                    <div className="space-y-12">
                        {conservationData.map((project, index) => (
                            <div key={project.id} className={`flex ${expandedCard === project.id ? 'justify-center' : index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                                <Card
                                    className={`bg-white border-green-200 transition-all duration-300 hover:shadow-xl group overflow-hidden
                                        ${expandedCard === project.id
                                            ? 'w-full h-auto'
                                            : 'w-full sm:w-5/6 md:w-3/4 lg:w-2/3 h-64 hover:scale-105'
                                        }`}
                                >
                                    <div
                                        className={`bg-cover bg-center transition-all duration-300 ${expandedCard === project.id ? 'h-96' : 'h-64'
                                            }`}
                                        style={{ backgroundImage: `url(${project.image})` }}
                                    >
                                        <div className="h-full w-full bg-black bg-opacity-50 p-4 flex flex-col justify-between">
                                            <div>
                                                <CardTitle className="text-xl text-white mb-2">{project.name}</CardTitle>
                                                <p className="text-white mb-4 line-clamp-2 group-hover:line-clamp-none transition-all duration-300">
                                                    {project.description}
                                                </p>
                                            </div>
                                            <div className="flex justify-center">
                                                <Button
                                                    className="bg-green-600 hover:bg-green-700 text-sm px-4 py-1 w-1/3"
                                                    onClick={() => toggleCardExpansion(project.id)}
                                                >
                                                    {expandedCard === project.id ? 'Close' : 'Learn More'}
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                    {expandedCard === project.id && (
                                        <div className="p-4 bg-white">
                                            <h3 className="text-lg font-semibold mb-2">Detailed Information</h3>
                                            <p>{project.extraContent}</p>
                                        </div>
                                    )}
                                </Card>
                            </div>
                        ))}
                    </div>

                    <Card className="bg-green-100 border-green-300 mt-8">
                        <CardHeader>
                            <CardTitle className="text-2xl text-green-800">Get Involved</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-green-700">Your support can make a difference in our conservation efforts. Whether through volunteering, donations, or spreading awareness, every action counts in protecting our precious forests.</p>
                            <div className="flex flex-col sm:flex-row gap-4 mt-4">
                                <Button className="bg-green-600 hover:bg-green-700">
                                    <Link href="https://www.forrest-india.org/donate/#:~:text=FORREST%20is%20committed%20to%20conserve,blissful%20place%20for%20all%20beings."
                                        className="text-lg hover:underline transition-colors duration-200 hover:text-green-200"
                                        target="_blank"
                                        rel="noopener noreferrer">
                                        Support our cause
                                    </Link>
                                </Button>
                                <Button className="bg-green-600 hover:bg-green-700">
                                    <Link href="https://indiaenvironment.org/volunteer/"
                                        className="text-lg hover:underline transition-colors duration-200 hover:text-green-200"
                                        target="_blank"
                                        rel="noopener noreferrer">
                                        Volunteer
                                    </Link>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>

            <footer className="bg-green-800 text-white p-4 w-full">
                <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-2 md:mb-0">
                        <h3 className="text-lg font-semibold mb-1">Stay Connected</h3>
                        <div className="flex gap-4">
                            <a href="https://www.instagram.com/indian_forest_official?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" className="text-white hover:text-green-200 transition-colors duration-200">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
                            </a>
                            <a href="https://x.com/DEFCCOfficial" className="text-white hover:text-green-200 transition-colors duration-200">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" /></svg>
                            </a>
                        </div>
                    </div>
                    <div className="text-center md:text-right">
                        <p className="text-sm">&copy; 2024 Indian Forests. All rights reserved.</p>
                        <p className="text-sm mt-1">Designed with 🌿 for nature lovers</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default ConservationEffortsPage;