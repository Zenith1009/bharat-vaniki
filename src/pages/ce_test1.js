import React, { useState, useEffect, useRef } from 'react';
import { Menu } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from 'next/link';
import { conservationData } from '@/data/conservationData1';

const Sidebar = () => (
    <nav className="flex flex-col gap-4 mt-8">
        <Link href="/" className="text-lg hover:underline transition-colors duration-200 hover:text-green-200">Home</Link>
        <Link href="/forests" className="text-lg hover:underline transition-colors duration-200 hover:text-green-200">Forests</Link>
        <Link href="/gallery" className="text-lg hover:underline transition-colors duration-200 hover:text-green-200">Gallery</Link>
        <Link href="/plan-your-trip" className="text-lg hover:underline transition-colors duration-200 hover:text-green-200">Plan Your Trip</Link>
        <Link href="/conservation-efforts" className="text-lg hover:underline transition-colors duration-200 hover:text-green-200">Conservation Efforts</Link>
        <Link href="/about" className="text-lg hover:underline transition-colors duration-200 hover:text-green-200">About</Link>
    </nav>
);

const RainDrop = ({ delay, duration, top }) => (
    <div
        className="absolute bg-blue-300 rounded-full"
        style={{
            width: '3px',
            height: '10px',
            left: `${Math.random() * 100}%`,
            top: `${top}px`,
            animation: `fall ${duration}s linear ${delay}s infinite`
        }}
    ></div>
);

const RainEffect = () => {
    const [documentHeight, setDocumentHeight] = useState(0);

    useEffect(() => {
        const updateHeight = () => {
            setDocumentHeight(Math.max(
                document.body.scrollHeight,
                document.body.offsetHeight,
                document.documentElement.clientHeight,
                document.documentElement.scrollHeight,
                document.documentElement.offsetHeight
            ));
        };

        updateHeight();
        window.addEventListener('resize', updateHeight);
        window.addEventListener('scroll', updateHeight);

        return () => {
            window.removeEventListener('resize', updateHeight);
            window.removeEventListener('scroll', updateHeight);
        };
    }, []);

    const raindrops = Array.from({ length: 500 }, (_, i) => (
        <RainDrop
            key={i}
            delay={Math.random() * 5}
            duration={Math.random() * 3 + 2}
            top={Math.random() * documentHeight}
        />
    ));

    return (
        <div
            className="fixed inset-0 z-10 pointer-events-none overflow-hidden"
            style={{ height: `${documentHeight}px` }}
        >
            {raindrops}
        </div>
    );
};

const ConservationEffortsPage = () => {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [expandedCard, setExpandedCard] = useState(null);
    const cardRefs = useRef({});
    const toggleCardExpansion = (id) => {
        setExpandedCard(expandedCard === id ? null : id);
        if (expandedCard !== id) {
            setTimeout(() => {
                const cardElement = cardRefs.current[id];
                if (cardElement) {
                    const headerHeight = 5;
                    const yOffset = cardElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                    window.scrollTo({ top: yOffset, behavior: 'smooth' });
                }
            }, 0);
        }
    };

    return (
        <div className="min-h-screen w-full relative">
            <style jsx global>{`
                @keyframes fall {
                    0% {
                        transform: translateY(-15px);
                    }
                    100% {
                        transform: translateY(100vh);
                    }
                }
                .text-shadow {
                    text-shadow: 0 1px 2px rgba(0,0,0,0.8);
                }
                .mask-image {
                    mask-image: linear-gradient(to bottom, black 85%, transparent 100%);
                    -webkit-mask-image: linear-gradient(to bottom, black 85%, transparent 100%);
                }
            `}</style>
            <div
                className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: "url('/images/ce-bg.jpg')" }}
            ></div>
            <RainEffect />

            <div className="relative z-20">
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

                <main className="flex-grow p-4 w-full bg-white bg-opacity-10">
                    <div className="max-w-7xl mx-auto">
                        <Card className="bg-green-100 bg-opacity-60 border-green-300 mb-8 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="text-2xl text-green-800">Preserving Our Forests for Future Generations</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-green-700 mb-4">India's forests are home to a rich biodiversity and play a crucial role in maintaining ecological balance. Our conservation efforts aim to protect these vital ecosystems and the countless species that depend on them.</p>
                                <p className="text-green-700 mb-4">These forests serve as carbon sinks, mitigating climate change impacts and regulating local weather patterns. They are also vital for water conservation, soil protection, and air purification. Moreover, millions of people, especially indigenous communities, rely on these forests for their livelihoods and cultural heritage.</p>
                                <p className="text-green-700 mb-4">Our conservation initiatives focus on:</p>
                                <ul className="list-disc list-inside text-green-700 mb-4">
                                    <li>Sustainable forest management practices</li>
                                    <li>Reforestation and afforestation programs</li>
                                    <li>Wildlife protection and habitat restoration</li>
                                    <li>Community-based conservation approaches</li>
                                    <li>Environmental education and awareness campaigns</li>
                                </ul>
                                <p className="text-green-700">By preserving our forests, we safeguard biodiversity, combat climate change, and ensure a sustainable future for generations to come. Join us in our mission to protect these irreplaceable natural treasures.</p>
                            </CardContent>
                        </Card>

                        <div className="space-y-12">
                            {conservationData.map((project, index) => (
                                <div
                                    key={project.id}
                                    className={`flex ${expandedCard === project.id ? 'justify-center' : index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
                                    ref={el => cardRefs.current[project.id] = el}
                                >
                                    <Card
                                        className={`bg-white border-green-200 transition-all duration-300 hover:shadow-xl group overflow-hidden
                                            ${expandedCard === project.id
                                                ? 'w-full h-[550px]'
                                                : 'w-full sm:w-5/6 md:w-3/4 lg:w-2/3 xl:w-1/2 h-64 hover:scale-[1.02]'
                                            }`}
                                    >
                                        <div
                                            className={`bg-cover bg-center transition-all duration-300 h-full`}
                                            style={{ backgroundImage: `url(${expandedCard === project.id ? project.expandedImage : project.image})` }}
                                        >
                                            <div className={`h-full w-full flex flex-col justify-between
                                                ${expandedCard === project.id
                                                    ? 'bg-gradient-to-b from-black/70 to-black/40'
                                                    : 'bg-black bg-opacity-50'
                                                }`}>
                                                <div className={`p-4 overflow-y-auto ${expandedCard === project.id ? 'mask-image' : ''}`}>
                                                    <CardTitle className="text-xl text-white mb-2 font-bold">{project.name}</CardTitle>
                                                    <p className="text-white mb-4 text-shadow">
                                                        {project.description}
                                                    </p>
                                                    {expandedCard === project.id && (
                                                        <div className="mt-4">
                                                            <h3 className="text-lg font-semibold mb-2 text-white text-shadow">Detailed Information</h3>
                                                            <p className="text-white whitespace-pre-line text-shadow">{project.extraContent}</p>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="flex justify-center p-4">
                                                    <Button
                                                        className="bg-green-600 hover:bg-green-700 text-sm px-4 py-1 w-1/3"
                                                        onClick={() => toggleCardExpansion(project.id)}
                                                    >
                                                        {expandedCard === project.id ? 'Close' : 'Learn More'}
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                </div>
                            ))}
                        </div>

                        <Card className="bg-green-100 bg-opacity-60 border-green-300 mt-8 backdrop-blur-sm">
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
        </div>
    );
};

export default ConservationEffortsPage;