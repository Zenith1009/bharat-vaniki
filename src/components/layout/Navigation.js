import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { 
  ChevronDown, 
  Home, 
  Compass, 
  Map, 
  Camera, 
  Users, 
  Briefcase,
  Menu,
  X,
  HelpCircle,
  BarChart3,
  Heart
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { useLayout } from './Layout';

const Navigation = () => {
  const router = useRouter();
  const { isNavigationOpen, setIsNavigationOpen } = useLayout();
  const [isVisible, setIsVisible] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const navLinks = [
    { name: 'Home', icon: Home, href: '/', section: 'home' },
    { name: 'Destinations', icon: Compass, href: '/destinations', section: 'destinations' },
    { name: 'Itineraries', icon: Map, href: '/itineraries', section: 'itineraries' },
    { name: 'Photography', icon: Camera, href: '/photography', section: 'photography' },
    { name: 'Quiz', icon: HelpCircle, href: '/quiz', section: 'quiz' },
    { name: 'Insights', icon: BarChart3, href: '/insights', section: 'insights' },
    { name: 'Donate', icon: Heart, href: '/donate', section: 'donate' },
    { name: 'Organizations', icon: Users, href: '/organizations', section: 'organizations' },
    { name: 'Career Portals', icon: Briefcase, href: '/cportals', section: 'careers' },
    { name: 'About Us', icon: Users, href: '/about_us', section: 'about' },
  ];

  // Handle navbar visibility based on route
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

  // Handle active page highlighting
  useEffect(() => {
    const currentPath = router.pathname;
    const activeLink = navLinks.find(link => link.href === currentPath);
    if (activeLink) {
      setActiveSection(activeLink.section);
    }
  }, [router.pathname]);

  // Handle smooth scroll navigation for homepage sections
  const handleSmoothScroll = (sectionId) => {
    if (router.pathname === '/' && sectionId !== 'home') {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
        setActiveSection(sectionId);
      }
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (event, action) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      action();
    }
    if (event.key === 'Escape') {
      setIsDropdownOpen(false);
      setIsNavigationOpen(false);
    }
  };

  // Mobile menu variants
  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      x: '100%',
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 40
      }
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 40
      }
    }
  };

  // Dropdown variants
  const dropdownVariants = {
    closed: {
      opacity: 0,
      y: -10,
      scale: 0.95,
      transition: {
        duration: 0.2
      }
    },
    open: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <>
      <nav 
        className={`bg-black/20 backdrop-blur-md border-b border-white/10 sticky top-0 left-0 w-full z-[1000] px-4 sm:px-8 transition-opacity duration-500 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 rounded-lg"
            aria-label="वानिकी - Home"
          >
            <Image 
              src="/image/logo.png" 
              alt="वानिकी Logo" 
              width={48} 
              height={48} 
              className="h-12 w-12"
              priority
            />
            <div className="text-white text-3xl font-bold uppercase ml-2">
              वानिकी
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="relative">
              <Button
                variant="ghost"
                className="text-white hover:text-black text-xl flex items-center focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
                onKeyDown={(e) => handleKeyDown(e, () => setIsDropdownOpen(!isDropdownOpen))}
                aria-expanded={isDropdownOpen}
                aria-haspopup="true"
              >
                BROWSE
                <ChevronDown 
                  className={`ml-1 h-4 w-4 transition-transform duration-300 ${
                    isDropdownOpen ? 'rotate-180' : 'rotate-0'
                  }`} 
                />
              </Button>
              
              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial="closed"
                    animate="open"
                    exit="closed"
                    variants={dropdownVariants}
                    className="absolute right-0 mt-2 w-64 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 backdrop-blur-sm"
                    onMouseEnter={() => setIsDropdownOpen(true)}
                    onMouseLeave={() => setIsDropdownOpen(false)}
                    role="menu"
                    aria-orientation="vertical"
                  >
                    <div className="py-1">
                      {navLinks.map((link, index) => (
                        <Link
                          key={index}
                          href={link.href}
                          className={`flex items-center px-4 py-3 text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-inset ${
                            activeSection === link.section
                              ? 'bg-green-50 text-green-700 border-r-2 border-green-500'
                              : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                          }`}
                          role="menuitem"
                          onClick={() => {
                            if (router.pathname === '/' && link.section !== 'home') {
                              handleSmoothScroll(link.section);
                            }
                            setIsDropdownOpen(false);
                          }}
                          onKeyDown={(e) => handleKeyDown(e, () => {
                            if (router.pathname === '/' && link.section !== 'home') {
                              handleSmoothScroll(link.section);
                            }
                            setIsDropdownOpen(false);
                          })}
                        >
                          <link.icon className="mr-3 h-5 w-5" />
                          {link.name}
                          {activeSection === link.section && (
                            <motion.div
                              layoutId="activeIndicator"
                              className="ml-auto w-2 h-2 bg-green-500 rounded-full"
                            />
                          )}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden text-white hover:text-black focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            onClick={() => setIsNavigationOpen(!isNavigationOpen)}
            onKeyDown={(e) => handleKeyDown(e, () => setIsNavigationOpen(!isNavigationOpen))}
            aria-expanded={isNavigationOpen}
            aria-label="Toggle mobile menu"
          >
            {isNavigationOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isNavigationOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-[999] lg:hidden"
              onClick={() => setIsNavigationOpen(false)}
            />
            
            {/* Mobile Menu */}
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={mobileMenuVariants}
              className="fixed top-0 right-0 h-full w-80 bg-white shadow-xl z-[1000] lg:hidden"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation menu"
            >
              <div className="flex flex-col h-full">
                {/* Mobile Menu Header */}
                <div className="flex items-center justify-between p-4 border-b">
                  <div className="flex items-center">
                    <Image 
                      src="/image/logo.png" 
                      alt="वानिकी Logo" 
                      width={32} 
                      height={32} 
                      className="h-8 w-8"
                    />
                    <span className="text-gray-900 text-xl font-bold ml-2">वानिकी</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsNavigationOpen(false)}
                    className="focus:outline-none focus:ring-2 focus:ring-green-500"
                    aria-label="Close mobile menu"
                  >
                    <X className="h-6 w-6" />
                  </Button>
                </div>

                {/* Mobile Menu Links */}
                <div className="flex-1 overflow-y-auto py-4">
                  {navLinks.map((link, index) => (
                    <Link
                      key={index}
                      href={link.href}
                      className={`flex items-center px-6 py-4 text-base transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-inset ${
                        activeSection === link.section
                          ? 'bg-green-50 text-green-700 border-r-4 border-green-500'
                          : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                      }`}
                      onClick={() => {
                        if (router.pathname === '/' && link.section !== 'home') {
                          handleSmoothScroll(link.section);
                        }
                        setIsNavigationOpen(false);
                      }}
                    >
                      <link.icon className="mr-4 h-6 w-6" />
                      {link.name}
                      {activeSection === link.section && (
                        <motion.div
                          layoutId="mobileActiveIndicator"
                          className="ml-auto w-2 h-2 bg-green-500 rounded-full"
                        />
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;