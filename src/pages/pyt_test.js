import React, { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from 'next/image';
import Link from 'next/link';


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


const forestData = [
    {
        name: "Sundarbans National Park",
        state: "West Bengal",
        description: "The largest mangrove forest in the world and a UNESCO World Heritage Site, known for its Royal Bengal Tigers and unique ecosystem",
        image: "/images/Sundarbans0.jpg",
        type: "National Park",
        durationofvisit: "2-3 days",
        besttimetovisit: "September to March",
        expeditiondifficultylevel: "Moderate",
        reachBy: [
            { mode: "Road", description: "From Kolkata (about 100 km) reach Godkhali or Sonakhali" },
            { mode: "Train", description: "Canning Railway Station (48 km)" },
            { mode: "Air", description: "Netaji Subhash Chandra Bose International Airport in Kolkata (about 112 km)" },
        ],
        nearbyAttractions: [
            { name: "Kolkata City", image: "/images/Sundarbans5.jpg" },
            { name: "Bakkhali beach ", image: "/images/Sundarbans6.jpg" },
            { name: "Henry Island", image: "/images/Sundarbans7.jpg" },
            { name: "Diamond Harbour", image: "/images/Sundarbans8.jpg" },
        ],
        carouselImages: [
            { image: "/images/Sundarbans1.jpg", name: "Majestic Royal Bengal Tiger" },
            { image: "/images/Sundarbans2.jpg", name: "Wildlife safaris by boat" },
            { image: "/images/Sundarbans3.jpg", name: "Bird watching" },
            { image: "/images/Sundarbans4.jpg", name: "Mangrove Forest" },
        ],
        itinerary: [
            {
                day: 1,
                activities: [
                    "Arrive at Godkhali/Sonakhali, transfer to boat for Sundarbans",
                    "Check-in at the resort or forest lodge",
                    "Evening boat safari for wildlife spotting and sunset views",
                ]
            },
            {
                day: 2,
                activities: [
                    "Early morning boat safari for tiger spotting and bird watching",
                    "Visit Sajnekhali Wildlife Sanctuary and Mangrove Interpretation Centre",
                    "Afternoon visit to local village for cultural interaction",
                ]
            },
            {
                day: 3,
                activities: [
                    "Morning bird watching session",
                    "Visit Dobanki Watch Tower or Netidhopani Watch Tower for more wildlife sightings",
                    "Departure from Sundarbans",
                ]
            }
        ]
    },
    {
        name: "Namdapha National Park ",
        state: "Arunachal Pradesh",
        description: "The largest protected areas in the Eastern Himalayas and is known for its biodiversity, including rare and endangered species",
        image: "/images/Namdapha0.jpg",
        type: "National Park",
        durationofvisit: "3-5 days",
        besttimetovisit: "October to April",
        expeditiondifficultylevel: "Moderate to Difficult",
        reachBy: [
            { mode: "Road", description: "from Dibrugarh in Assam (160 km)" },
            { mode: "Train", description: "Tinsukia Railway Station in Assam (140 km)" },
            { mode: "Air", description: "Dibrugarh Airport in Assam (190 km)" },
        ],
        nearbyAttractions: [
            { name: "Miao town ", image: "/images/Namdapha5.jpg" },
            { name: "Mehao Wildlife Sanctuary", image: "/images/Namdapha6.jpg" },
            { name: "Deban", image: "/images/Namdapha7.jpg" },
            { name: "Ziro Valley", image: "/images/Namdapha8.jpg" },
        ],
        carouselImages: [
            { image: "/images/Namdapha1.jpg", name: "Wildlife safaris" },
            { image: "/images/Namdapha2.jpg", name: "Bird watching" },
            { image: "/images/Namdapha3.jpg", name: "Trekking" },
            { image: "/images/Namdapha4.jpg", name: "Visit to Miao" },
        ],
        itinerary: [
            {
                day: 1,
                activities: [
                    "Arrive at Miao, obtain permits and travel to Deban",
                    "Check-in at the forest guesthouse or campsite",
                    "Evening orientation and short trek around Deban",
                ]
            },
            {
                day: 2,
                activities: [
                    "Full-day trekking along the Noa-Dihing River",
                    "Haldibari for wildlife spotting",
                    "Bird watching and photography sessions",
                ]
            },
            {
                day: 3,
                activities: [
                    "Early morning wildlife safari or bird watching",
                    "Visit nearby Tibetan settlements and interact with locals",
                    "Return to Deban and rela",
                ]
            },
            {
                day: 4,
                activities: [
                    "Explore Miao town and visit nearby attractions",
                    "Departure from Miao or extension for further exploration",
                ]
            }
        ]
    },
    {
        name: "Gir National Park",
        state: "Gujarat",
        description: "The last natural habitat of the Asiatic lions in the world",
        image: "/images/Gir0.jpg",
        type: "National Park",
        durationofvisit: "2-3 days",
        besttimetovisit: "December to March",
        expeditiondifficultylevel: "Easy",
        reachBy: [
            { mode: "Road", description: "From Ahmedabad (335 km) and Rajkot (160 km)" },
            { mode: "Train", description: "Junagadh (65 km) and Veraval (40 km) " },
            { mode: "Air", description: "Diu Airport (110 km) and Rajkot Airport (160 km)" },
        ],
        nearbyAttractions: [
            { name: "Somnath Temple", image: "/images/Gir5.jpg" },
            { name: "Junagadh city", image: "/images/Gir6.jpg" },
            { name: "Uparkot Fort", image: "/images/Gir7.jpg" },
            { name: "Girnar Hills", image: "/images/Gir8.jpg" },
        ],
        carouselImages: [
            { image: "/images/Gir1.jpg", name: "Wildlife safaris" },
            { image: "/images/Gir2.jpg", name: "Crocodile breeding farm" },
            { image: "/images/Gir3.jpg", name: "Bird watching" },
            { image: "/images/Gir4.jpg", name: "Kamleshwar Dam" },
        ],
        itinerary: [
            {
                day: 1,
                activities: [
                    "Arrive at Gir National Park, check-in at the resort",
                    "Afternoon safari to explore the wildlife and bird watching",
                    "Visit the crocodile breeding farm at Sasan",
                ]
            },
            {
                day: 2,
                activities: [
                    "Early morning wildlife safari for lion spotting",
                    "Visit Kamleshwar Dam and enjoy bird watching",
                    "Explore nearby attractions like Junagadh city and Uparkot Fort",
                ]
            },
            {
                day: 3,
                activities: [
                    "Morning safari for wildlife spotting",
                    "Visit Somnath Temple or Girnar Temples",
                    "Departure",
                ]
            }
        ]
    },
    {
        name: "Chambal National Sanctuary",
        state: "Madhya Pradesh, Uttar Pradesh, and Rajasthan",
        description: "Crucial for the conservation of the critically endangered Ganges river dolphin and gharial",
        image: "/images/Chambal0.jpg",
        type: "Wildlife Sanctuary",
        durationofvisit: "2-3 days",
        besttimetovisit: "November to March",
        expeditiondifficultylevel: "Easy",
        reachBy: [
            { mode: "Road", description: "From Agra (70 km) and Gwalior (120 km)" },
            { mode: "Train", description: "Dholpur Railway Station (25 km)" },
            { mode: "Air", description: "Gwalior Airport (120 km) and Agra Airport (70 km)" },
        ],
        nearbyAttractions: [
            { name: "Agra", image: "/images/Chambal5.jpg" },
            { name: "Gwalior", image: "/images/Chambal6.jpg" },
            { name: "Bateshwar Temples", image: "/images/Chambal7.jpg" },
            { name: "Fatehpur Sikri", image: "/images/Chambal8.jpg" },
        ],
        carouselImages: [
            { image: "/images/Chambal1.jpg", name: "River safaris" },
            { image: "/images/Chambal2.jpg", name: "Boat rides on the Chambal River" },
            { image: "/images/Chambal3.jpg", name: "Bird watching" },
            { image: "/images/Chambal4.jpg", name: "Ancient temples and ruins" },
        ],
        itinerary: [
            {
                day: 1,
                activities: [
                    "Arrive at Chambal National Sanctuary, check-in at the resort",
                    "Afternoon river safari to spot gharials and dolphins",
                    "Evening bird watching session",
                ]
            },
            {
                day: 2,
                activities: [
                    "Morning boat ride on the Chambal River",
                    "Visit Bateshwar Temples",
                    "Explore nearby ruins and temples along the riverbanks",
                ]
            },
            {
                day: 3,
                activities: [
                    "Morning river safari for more wildlife spotting",
                    "Visit nearby attractions such as Fatehpur Sikri or Agra",
                    "Departure",
                ]
            }
        ]
    },
    {
        name: "Bhadra Wildlife Sanctuary",
        state: "Karnataka",
        description: "Rich biodiversity and conservation of endangered species, including tigers and elephants",
        image: "/images/Bhadra0.jpg",
        type: "Wildlife Sanctuary",
        durationofvisit: "2-3 days",
        besttimetovisit: "October to May",
        expeditiondifficultylevel: "Moderate",
        reachBy: [
            { mode: "Road", description: "From Chikmagalur (38 km) and Bangalore (285 km)" },
            { mode: "Train", description: "Kadur Railway Station (51 km) and Birur Junction (47 km)" },
            { mode: "Air", description: "Mangalore Airport (173 km) and Kempegowda International Airport, Bangalore (285 km)" },
        ],
        nearbyAttractions: [
            { name: "Chikmagalur ", image: "/images/Bhadra5.jpg" },
            { name: "Baba Budangiri", image: "/images/Bhadra6.jpg" },
            { name: "Mullayanagiri", image: "/images/Bhadra7.jpg" },
            { name: "Kudremukh National Park", image: "/images/Bhadra8.jpg" },
        ],
        carouselImages: [
            { image: "/images/Bhadra1.jpg", name: "Wildlife safaris " },
            { image: "/images/Bhadra2.jpg", name: "Boating & bird watching" },
            { image: "/images/Bhadra3.jpg", name: "Hebbe Falls" },
            { image: "/images/Bhadra4.jpg", name: "Kallathigiri and Mullayanagiri peaks" },
        ],
        itinerary: [
            {
                day: 1,
                activities: [
                    "Arrive at Bhadra Wildlife Sanctuary, check-in at the resort",
                    "Afternoon safari to explore the wildlife",
                    "Evening boat ride on Bhadra Reservoir",
                ]
            },
            {
                day: 2,
                activities: [
                    "Morning safari for more wildlife spotting",
                    "Visit Hebbe Falls",
                    "Trek to Mullayanagiri Peak (optional)",
                ]
            },
            {
                day: 3,
                activities: [
                    "Bird watching session",
                    "Visit nearby attractions like Baba Budangiri",
                    "Departure",
                ]
            }
        ]
    },
];



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
    const [isExpanded, setIsExpanded] = useState(false);
    const [mainCarouselIndex, setMainCarouselIndex] = useState(0);
    const [nearbyCarouselIndex, setNearbyCarouselIndex] = useState(0);
    const [expandedIndex, setExpandedIndex] = useState(null);


    const handleToggleExpand = (index) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    useEffect(() => {
        let interval;
        if (isExpanded) {
            interval = setInterval(() => {
                setMainCarouselIndex((prevIndex) => (prevIndex + 1) % mainImages.length);
                setNearbyCarouselIndex((prevIndex) => (prevIndex + 1) % nearbyImages.length);
            }, 7000);
        }
        return () => clearInterval(interval);
    }, [isExpanded]);

    return (
        <div className="min-h-screen flex flex-col bg-green-50">
            <header className="bg-green-800 text-white p-2">
                <div className="container mx-auto flex items-center justify-between">
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
                        <h1 className="text-2xl font-bold">Plan Your Trip</h1>
                        <p className="text-sm">Explore the wonders of Indian forests</p>
                    </div>
                </div>
            </header>

            <div class="flex justify-center mt-3">
                <Card className="bg-green-100 border-green-300 w-4/5">
                    <CardHeader>
                        <CardTitle className="text-2xl text-green-800">Embark on an Eco-Adventure</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-green-700">Discover the beauty and diversity of Indian forests through our carefully curated eco-friendly trips. Each journey offers a unique opportunity to connect with nature, learn about conservation, and create unforgettable memories.</p>
                    </CardContent>
                </Card>
            </div>



            <div className="bg-grey-100 pt-2">
                {forestData.map((forest, index) => (
                    <ForestContainer
                        key={index}
                        forest={forest}
                        isExpanded={expandedIndex === index}
                        onToggleExpand={() => handleToggleExpand(index)}
                    />
                ))}
            </div>


            <main className="flex-grow pb-4">
                <div className=" w-4/5 mx-auto">
                    <Card className="bg-green-100 border-green-300 mt-8">
                        <CardHeader>
                            <CardTitle className="text-2xl text-green-800">Responsible Tourism</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-green-700">We are committed to sustainable and responsible tourism. Our trips are designed to minimize environmental impact while maximizing the benefits to local communities and conservation efforts.</p>
                            <Button className="mt-4 bg-green-600 hover:bg-green-700">Learn More About Conservation Efforts</Button>
                        </CardContent>
                    </Card>
                </div>
            </main>

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