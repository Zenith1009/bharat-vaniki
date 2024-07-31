import React, { useState, useEffect } from 'react';
import { Search, Menu } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const scrollToSection = (sectionClass) => {
        const section = document.querySelector(`.${sectionClass}`);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            // Add any scroll-based logic here if needed
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className="hide bg-transparent sticky top-0 left-0 w-full z-[1000] px-4 sm:px-8">
            <div className="max-w-7xl mx-auto flex items-center justify-between h-16"> 
                <div className="text-white text-3xl font-bold flex items-center uppercase">
                    TRavelo
                    <span className="ml-1 text-xl">°</span>
                </div>
                <div className="flex items-center space-x-4">
                    <Button 
                        variant="ghost" 
                        className="text-white hover:text-black text-xl"
                        onClick={() => scrollToSection('about')}
                    >
                        About
                    </Button>
                    <Button 
                        variant="ghost" 
                        className="text-white hover:text-black text-xl"
                        onClick={() => scrollToSection('trips')}
                    >
                        Trips
                    </Button>
                    <Button 
                        variant="ghost" 
                        className="text-white hover:text-black text-xl"
                        onClick={() => scrollToSection('gallery')}
                    >
                        Gallery
                    </Button>
                    <Button variant="ghost" size="icon" className="text-white hover:text-black text-xl">
                        <Search className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-white hover:text-black text-xl">
                        <Menu className="h-6 w-6" />
                    </Button>

                    <Button 
                        variant="ghost" 
                        size="icon" 
                        className="text-white hover:text-gray-200 sm:hidden"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <Menu className="h-6 w-6" />
                    </Button>

                    {isMenuOpen && (
                        <div className="absolute top-16 left-0 w-full bg-transparent sm:hidden">
                            <Button variant="ghost" className="w-full text-white hover:text-gray-200 py-2">Login</Button>
                            <Button variant="ghost" className="w-full text-white hover:text-gray-200 py-2">Sign Up</Button>
                        </div>
                    )}
                </div>
            </div> 
        </nav>
    );
};

export default Navbar;