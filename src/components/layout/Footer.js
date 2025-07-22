import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Instagram, 
  Twitter, 
  Facebook, 
  Youtube, 
  Mail, 
  Phone, 
  MapPin, 
  Send,
  Heart,
  Leaf,
  ArrowUp
} from 'lucide-react';
import { Button } from "@/components/ui/button";

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscriptionStatus, setSubscriptionStatus] = useState('');

  // Quick links organized by category
  const quickLinks = {
    explore: [
      { name: 'Destinations', href: '/destinations' },
      { name: 'Itineraries', href: '/itineraries' },
      { name: 'Photography', href: '/photography' },
      { name: 'Quiz', href: '/quiz' }
    ],
    learn: [
      { name: 'Forest Insights', href: '/insights' },
      { name: 'About Us', href: '/about_us' },
      { name: 'Career Portals', href: '/cportals' }
    ],
    support: [
      { name: 'Donate', href: '/donate' },
      { name: 'Contact Us', href: '/contact' },
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' }
    ]
  };

  const socialLinks = [
    { 
      name: 'Instagram', 
      icon: Instagram, 
      href: '#', 
      color: 'hover:text-pink-500',
      ariaLabel: 'Follow us on Instagram'
    },
    { 
      name: 'Twitter', 
      icon: Twitter, 
      href: '#', 
      color: 'hover:text-blue-400',
      ariaLabel: 'Follow us on Twitter'
    },
    { 
      name: 'Facebook', 
      icon: Facebook, 
      href: '#', 
      color: 'hover:text-blue-600',
      ariaLabel: 'Follow us on Facebook'
    },
    { 
      name: 'YouTube', 
      icon: Youtube, 
      href: '#', 
      color: 'hover:text-red-500',
      ariaLabel: 'Subscribe to our YouTube channel'
    }
  ];

  const contactInfo = [
    {
      icon: Mail,
      text: 'info@indianforests.org',
      href: 'mailto:info@indianforests.org'
    },
    {
      icon: Phone,
      text: '+91 98765 43210',
      href: 'tel:+919876543210'
    },
    {
      icon: MapPin,
      text: 'New Delhi, India',
      href: '#'
    }
  ];

  // Handle newsletter subscription
  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setIsSubscribing(true);
    
    try {
      // Simulate API call - replace with actual implementation
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubscriptionStatus('success');
      setEmail('');
      setTimeout(() => setSubscriptionStatus(''), 3000);
    } catch (error) {
      setSubscriptionStatus('error');
      setTimeout(() => setSubscriptionStatus(''), 3000);
    } finally {
      setIsSubscribing(false);
    }
  };

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-gray-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm0 0c0 11.046 8.954 20 20 20s20-8.954 20-20-8.954-20-20-20-20 8.954-20 20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <div className="flex items-center mb-4">
                <Image 
                  src="/image/logo.png" 
                  alt="वानिकी Logo" 
                  width={40} 
                  height={40} 
                  className="h-10 w-10"
                />
                <span className="text-2xl font-bold ml-2">वानिकी</span>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Exploring and preserving India's magnificent forests and ecosystems. 
                Join us in our mission to protect nature for future generations.
              </p>
              
              {/* Social Media Links */}
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    className={`text-gray-400 transition-colors duration-200 ${social.color} focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded-lg p-1`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={social.ariaLabel}
                  >
                    <social.icon className="h-6 w-6" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Quick Links - Explore */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Leaf className="h-5 w-5 mr-2 text-green-400" />
                Explore
              </h3>
              <ul className="space-y-2">
                {quickLinks.explore.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-green-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Links - Learn */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Heart className="h-5 w-5 mr-2 text-green-400" />
                Learn & Support
              </h3>
              <ul className="space-y-2">
                {quickLinks.learn.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-green-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter & Contact */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Stay Connected</h3>
              
              {/* Newsletter Signup */}
              <form onSubmit={handleNewsletterSubmit} className="mb-6">
                <div className="flex flex-col space-y-2">
                  <label htmlFor="newsletter-email" className="text-sm text-gray-300">
                    Subscribe to our newsletter
                  </label>
                  <div className="flex">
                    <input
                      id="newsletter-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-l-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      required
                    />
                    <Button
                      type="submit"
                      disabled={isSubscribing}
                      className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-r-md rounded-l-none focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                    >
                      {isSubscribing ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <Send className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  {subscriptionStatus === 'success' && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-green-400 text-sm"
                    >
                      Successfully subscribed!
                    </motion.p>
                  )}
                  {subscriptionStatus === 'error' && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-400 text-sm"
                    >
                      Something went wrong. Please try again.
                    </motion.p>
                  )}
                </div>
              </form>

              {/* Contact Information */}
              <div className="space-y-3">
                {contactInfo.map((contact, index) => (
                  <a
                    key={index}
                    href={contact.href}
                    className="flex items-center text-gray-300 hover:text-green-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded"
                  >
                    <contact.icon className="h-4 w-4 mr-3 text-green-400" />
                    <span className="text-sm">{contact.text}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-center md:text-left mb-4 md:mb-0">
                <p className="text-gray-400 text-sm">
                  &copy; 2024 Indian Forests Encyclopedia. All rights reserved.
                </p>
                <p className="text-gray-500 text-xs mt-1 flex items-center justify-center md:justify-start">
                  Designed with <Heart className="h-3 w-3 mx-1 text-red-500" /> for nature lovers
                </p>
              </div>
              
              {/* Support Links */}
              <div className="flex items-center space-x-6">
                {quickLinks.support.map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    className="text-gray-400 hover:text-green-400 text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Scroll to Top Button */}
        <motion.button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-green-600 hover:bg-green-700 text-white p-3 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 z-50"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-5 w-5" />
        </motion.button>
      </div>
    </footer>
  );
};

export default Footer;