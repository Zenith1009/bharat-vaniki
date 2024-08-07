import React, { useState, useEffect, useRef } from 'react';
import { Menu, ArrowUp, Search, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from 'next/image';
import Link from 'next/link';
import { forestData } from '@/data/forestData';
import ItineraryNavbar from './itineraryNavbar';
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

const ScrollToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);

        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <>
            {isVisible && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-5 right-5 bg-green-600 text-white p-2 rounded-full shadow-lg hover:bg-green-700 transition-colors duration-300"
                    aria-label="Scroll to top"
                >
                    <ArrowUp size={24} />
                </button>
            )}
        </>
    );
};

const Itinerary = ({ itinerary }) => {
    if (!Array.isArray(itinerary)) {
        return <p>No itinerary available.</p>;
    }
    return (
        <div className="w-full px-4 mb-6">
            <h3 className="text-xl font-bold mb-4">Itinerary</h3>
            <div className="flex flex-col md:flex-row justify-between gap-4">
                {itinerary.map(dayInfo => (
                    <div key={dayInfo.day} className="flex-1 bg-green-50 p-4 rounded-lg">
                        <div className="bg-green-200 w-8 h-8 rounded-full flex items-center justify-center mb-2">
                            <span className="text-black font-bold">{dayInfo.day}</span>
                        </div>
                        <h4 className="font-bold mb-2">Day {dayInfo.day}</h4>
                        <ul className="list-disc pl-2 list-outside text-sm">
                            {dayInfo.activities.map((activity, index) => (
                                <li key={index}>{activity}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

const ForestContainer = ({ forest, isExpanded, onToggleExpand }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [showOverlay, setShowOverlay] = useState(false);

    useEffect(() => {
        let slideInterval;
        if (isExpanded) {
            slideInterval = setInterval(() => {
                setCurrentSlide((prev) => (prev + 1) % forest.carouselImages.length);
                setShowOverlay(true);
                setTimeout(() => setShowOverlay(false), 4000);
            }, 5000);
        }
        return () => clearInterval(slideInterval);
    }, [isExpanded, forest.carouselImages.length]);

    return (
        <div className="w-4/5 mx-auto mt-6">
            <div className={`bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-500 ease-in-out ${isExpanded ? 'h-auto' : 'h-72'}`}>
                <div className="relative h-72">
                    <Image src={forest.image} alt={forest.name} layout="fill" objectFit="cover" />
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white p-4">
                        <h2 className="text-3xl font-bold mb-2">{forest.name}</h2>
                        <h4 className="text-lg font-bold mb-2">{forest.state}</h4>
                        <p className="text-center mb-8">{forest.description}</p>
                        <button
                            onClick={onToggleExpand}
                            className={`absolute bottom-4 left-1/2 transform -translate-x-1/2 w-56 px-6 py-2 rounded-lg text-sm font-bold transition-colors ${isExpanded
                                ? 'bg-red-600 hover:bg-red-500'
                                : 'bg-green-600 hover:bg-green-700'
                                }`}
                        >
                            {isExpanded ? 'Close' : 'Explore More'}
                        </button>
                    </div>
                </div>
                {isExpanded && (
                    <div className="p-6 overflow-y-auto max-h-[calc(100vh-16rem)]">
                        <div className="flex flex-wrap -mx-4">
                            <div className="w-full md:w-1/2 px-4 mb-6">
                                <div className="relative h-64 rounded-lg overflow-hidden">
                                    <Image src={forest.carouselImages[currentSlide].image} alt={forest.carouselImages[currentSlide].name} layout="fill" objectFit="cover" />
                                    <div className="absolute bottom-0 left-0 right-0 flex items-end justify-center">
                                        <div className="bg-black bg-opacity-50 text-white text-xs font-bold px-4 py-2 m-4 rounded-t-lg">
                                            {forest.carouselImages[currentSlide].name}
                                        </div>
                                    </div>
                                    <button onClick={() => setCurrentSlide((prev) => (prev - 1 + forest.carouselImages.length) % forest.carouselImages.length)} className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2">
                                        &#8592;
                                    </button>
                                    <button onClick={() => setCurrentSlide((prev) => (prev + 1) % forest.carouselImages.length)} className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2">
                                        &#8594;
                                    </button>
                                    <div className="absolute bottom-2 left-0 right-0 flex justify-center">
                                        {forest.carouselImages.map((_, index) => (
                                            <div key={index} className={`h-1 w-8 mx-1 rounded-full ${index === currentSlide ? 'bg-white' : 'bg-gray-400'}`}></div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="w-full md:w-1/2 px-2 mb-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {['Type', 'Duration of Visit', 'Best Time to Visit', 'Expedition Difficulty Level'].map((item, index) => (
                                        <div key={index} className="mb-2 group">
                                            <div className="bg-gray-100 p-2 rounded-lg ">
                                                <h3 className="font-bold mb-2">{item}</h3>
                                                <p>{forest[item.toLowerCase().replace(/ /g, '')]}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="w-full md:w-1/2 px-4 mb-6">
                                <h3 className="text-xl font-bold mb-4">How to reach here</h3>
                                {forest.reachBy.map((method, index) => (
                                    <div key={index} className="flex items-center mb-4">
                                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                                            {method.mode === "Road" && (
                                                <span className="text-2xl" role="img" aria-label="car">🚗</span>
                                            )}
                                            {method.mode === "Train" && (
                                                <span className="text-2xl" role="img" aria-label="train">🚂</span>
                                            )}
                                            {method.mode === "Air" && (
                                                <span className="text-2xl" role="img" aria-label="airplane">✈️</span>
                                            )}
                                        </div>
                                        <div>
                                            <p className="font-bold">By {method.mode.charAt(0).toUpperCase() + method.mode.slice(1)}</p>
                                            <p>{method.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="w-full md:w-1/2 px-4 mb-6">
                                <h3 className="text-xl font-bold mb-4">Nearby Tourist Attractions</h3>
                                <div className="relative h-64 rounded-lg overflow-hidden">
                                    <Image src={forest.nearbyAttractions[currentSlide].image} alt={forest.nearbyAttractions[currentSlide].name} layout="fill" objectFit="cover" />
                                    <div className="absolute bottom-0 left-0 right-0 flex items-end justify-center">
                                        <div className="bg-black bg-opacity-50 text-white text-xs font-bold py-2 px-4 m-4 rounded-t-lg">
                                            {forest.nearbyAttractions[currentSlide].name}
                                        </div>
                                    </div>
                                    <button onClick={() => setCurrentSlide((prev) => (prev - 1 + forest.nearbyAttractions.length) % forest.nearbyAttractions.length)} className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2">
                                        &#8592;
                                    </button>
                                    <button onClick={() => setCurrentSlide((prev) => (prev + 1) % forest.nearbyAttractions.length)} className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2">
                                        &#8594;
                                    </button>
                                    <div className="absolute bottom-2 left-0 right-0 flex justify-center">
                                        {forest.nearbyAttractions.map((_, index) => (
                                            <div key={index} className={`h-1 w-8 mx-1 rounded-full ${index === currentSlide ? 'bg-white' : 'bg-gray-400'}`}></div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Itinerary itinerary={forest.itinerary} />
                        <button
                            onClick={onToggleExpand}
                            className="w-56 px-6 py-2 rounded-lg bg-red-500 text-white font-bold hover:bg-red-700 transition-colors mt-4"
                        >
                            Close
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};


const PlanYourTripPage = () => {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [expandedIndex, setExpandedIndex] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const searchRef = useRef(null);

    const handleToggleExpand = (index) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    const handleSearch = (value) => {
        setSearchTerm(value);
        if (value.trim() === '') {
            setSearchResults([]);
            return;
        }

        const filteredResults = forestData.filter(forest =>
            forest.name.toLowerCase().includes(value.toLowerCase()) ||
            forest.state.toLowerCase().includes(value.toLowerCase())
        );
        setSearchResults(filteredResults);
    };

    const handleSelectResult = (result) => {
        const index = forestData.findIndex(forest => forest.name === result.name);
        if (index !== -1) {
            setSearchTerm('');
            setSearchResults([]);
            const element = document.getElementById(`forest-${index}`);
            if (element) {
                const headerHeight = 64;
                const searchBarHeight = 60;
                const elementPosition = element.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerHeight - searchBarHeight - 20;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        }
    };

    const clearSearch = () => {
        setSearchTerm('');
        setSearchResults([]);
        searchRef.current.focus();
    };

    useEffect(() => {
        const debounceTimer = setTimeout(() => {
            if (searchTerm.trim() === '') {
                setSearchResults([]);
            } else {
                const filteredResults = forestData.filter(forest =>
                    forest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    forest.state.toLowerCase().includes(searchTerm.toLowerCase())
                );
                setSearchResults(filteredResults);
            }
        }, 10);
    
        return () => clearTimeout(debounceTimer);
    }, [searchTerm]);

    return (

        <div className="min-h-screen flex flex-col bg-black">
            
            <ItineraryNavbar />

            <div className="flex justify-center mt-3 mb-3">
                <Card className="bg-green-100 border-green-300 w-4/5">
                    <CardHeader>
                        <CardTitle className="text-2xl text-green-800">Embark on an Eco-Adventure</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-green-700">Discover the beauty and diversity of Indian forests through our carefully curated eco-friendly trips. Each journey offers a unique opportunity to connect with nature, learn about conservation, and create unforgettable memories.</p>
                    </CardContent>
                </Card>
            </div>

            <div className="sticky top-0 z-10 bg-black py-2 mb-4 blur-0">
    <div className="w-4/5 mx-auto relative">
        <input
            ref={searchRef}
            type="text"
            placeholder="Search forests by name or state"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="text-black w-full pl-10 pr-10 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-300"
            aria-label="Search forests"
        />
        <Search className=" absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        {searchTerm && (
            <Button
                onClick={clearSearch}
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
                variant="ghost"
                size="sm"
                aria-label="Clear search"
            >
                <X size={20} />
            </Button>
        )}
        {searchTerm && (
            <div className="text-black absolute w-full bg-white mt-1 rounded-md shadow-lg max-h-60 overflow-auto">
                {searchResults.length > 0 ? (
                    searchResults.map((result, index) => (
                        <button
                            key={index}
                            className="w-full text-left px-4 py-2 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                            onClick={() => handleSelectResult(result)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') handleSelectResult(result);
                            }}
                        >
                            {result.name} - {result.state}
                        </button>
                    ))
                ) : (
                    <div className="px-4 py-2 text-gray-500">No results found</div>
                )}
            </div>
        )}
    </div>
</div>

            <div className="bg-grey-100 pt-4 pb-20  text-black">
                {forestData.map((forest, index) => (
                    <div id={`forest-${index}`} key={index}>
                        <ForestContainer
                            forest={forest}
                            isExpanded={expandedIndex === index}
                            onToggleExpand={() => handleToggleExpand(index)}
                        />
                    </div>
                ))}
            </div>

            <ScrollToTopButton />

            <footer className="bg-green-800 text-white p-4">
                <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-2 md:mb-0">
                        <h3 className="text-lg font-semibold mb-1">Stay Connected</h3>
                        <div className="flex gap-4">
                            <a href="#" className="text-white hover:text-green-200 transition-colors duration-200">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
                            </a>
                            <a href="#" className="text-white hover:text-green-200 transition-colors duration-200">
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

export default PlanYourTripPage;