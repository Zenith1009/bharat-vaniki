import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { ChevronDown, Home, Compass, Map, Camera, Users, Recycle, Briefcase } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Link from 'next/link';

const ItineraryNavbar = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const router = useRouter();

    const navLinks = [
        { name: 'Home', icon: Home, href: '/' },
        { name: 'Destinations', icon: Compass, href: '/destinations' },
        { name: 'Itineraries', icon: Map, href: '/itineraries' },
        { name: 'Photography', icon: Camera, href: '/photography' },
        { name: 'Conservation Efforts', icon: Recycle, href: '/con-efforts' },
        { name: 'Career Portals', icon: Briefcase, href: '/cportals' },
        { name: 'About Us', icon: Users, href: '/about' },
    ];

    useEffect(() => {
        if (router.pathname === '/') {
            const timer = setTimeout(() => {
                setIsVisible(true);
            }, 4500); 

            return () => clearTimeout(timer);
        } else {
            setIsVisible(true);
        }
    }, [router.pathname]);

    return (
        <nav className={`bg-transparent top-0 left-0 w-full z-[1000] px-4 sm:px-8 transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <div className="max-w-7xl mx-auto flex items-center justify-between h-16">
                <Link href="/" className="flex items-center">
                    <img src="/image/logo.png" alt="Travelo Logo" className="h-12 w-12" />
                    <div className="text-white text-3xl font-bold uppercase">
                        वानिकी
                    </div>
                </Link>
                
                <div className="flex items-center space-x-4 z-50">
                    <div className="relative">
                        <Button
                            variant="ghost"
                            className="text-white hover:text-black text-xl flex items-center "
                        >
                            <span 
                                className="relative"
                                onMouseEnter={() => setIsDropdownOpen(true)}
                                onMouseLeave={() => setIsDropdownOpen(true)}
                            >
                                BROWSE
                                <ChevronDown className="ml-1 h-4 w-4 inline-block transition-transform duration-300" style={{ transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
                            </span>
                        </Button>
                        {isDropdownOpen && (
                            <div 
                                className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                                onMouseEnter={() => setIsDropdownOpen(true)}
                                onMouseLeave={() => setIsDropdownOpen(false)}
                            >
                                <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                    {navLinks.map((link, index) => (
                                        <Link
                                            key={index}
                                            href={link.href}
                                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                            role="menuitem"
                                        >
                                            <link.icon className="mr-3 h-5 w-5" />
                                            {link.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                    
                </div>
            </div>
        </nav>
    );
};

export default ItineraryNavbar;
