import React, { useState } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import {
  StatisticsPanel,
  BiodiversityChart,
  InteractiveMap,
  ConservationImpact,
  ImportanceSection
} from '../components/features/Insights';
import FloatingDonationPrompt from '../components/features/Donations/FloatingDonationPrompt';

const Insights = () => {
  const [activeSection, setActiveSection] = useState('overview');

  const sections = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'statistics', label: 'Statistics', icon: '📈' },
    { id: 'biodiversity', label: 'Biodiversity', icon: '🌿' },
    { id: 'map', label: 'Forest Map', icon: '🗺️' },
    { id: 'conservation', label: 'Conservation', icon: '🛡️' },
    { id: 'importance', label: 'Importance', icon: '🌳' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <>
      <Head>
        <title>Forest Insights - Indian Forests Encyclopedia</title>
        <meta 
          name="description" 
          content="Comprehensive insights into Indian forests, biodiversity, conservation efforts, and ecosystem importance. Explore interactive maps, statistics, and conservation success stories." 
        />
        <meta name="keywords" content="Indian forests, biodiversity, conservation, forest statistics, ecosystem services, forest importance" />
        <meta property="og:title" content="Forest Insights - Indian Forests Encyclopedia" />
        <meta property="og:description" content="Discover comprehensive insights about Indian forests, their biodiversity, and conservation efforts." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="/insights" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50 relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23059669' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3Ccircle cx='10' cy='10' r='1'/%3E%3Ccircle cx='50' cy='10' r='1'/%3E%3Ccircle cx='10' cy='50' r='1'/%3E%3Ccircle cx='50' cy='50' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }} />
        </div>
        {/* Hero Section */}
        <motion.section 
          className="relative py-16 px-4 sm:px-6 lg:px-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-7xl mx-auto text-center">
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-green-800 mb-6"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Forest Insights
            </motion.h1>
            <motion.p 
              className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Explore comprehensive data, statistics, and insights about India's rich forest ecosystems, 
              biodiversity, and conservation efforts. Discover the importance of forests and their impact 
              on our environment and society.
            </motion.p>
            
            {/* Navigation Pills */}
            <motion.div 
              className="flex flex-wrap justify-center gap-2 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`px-4 py-2 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
                    activeSection === section.id
                      ? 'bg-green-600 text-white shadow-lg'
                      : 'bg-white text-green-700 hover:bg-green-50 shadow-md'
                  }`}
                >
                  <span className="mr-2">{section.icon}</span>
                  {section.label}
                </button>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* Main Content */}
        <motion.div 
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Overview Section */}
          {activeSection === 'overview' && (
            <motion.div variants={itemVariants} className="space-y-8">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-3xl font-bold text-green-800 mb-6 text-center">
                  Welcome to Forest Insights
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-6 border border-green-200">
                    <div className="text-4xl mb-4 text-center">📊</div>
                    <h3 className="text-xl font-bold text-green-800 mb-3">Statistics & Data</h3>
                    <p className="text-gray-700 text-sm">
                      Comprehensive forest statistics, coverage data, and key metrics about India's forest resources.
                    </p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-6 border border-blue-200">
                    <div className="text-4xl mb-4 text-center">🌿</div>
                    <h3 className="text-xl font-bold text-blue-800 mb-3">Biodiversity Charts</h3>
                    <p className="text-gray-700 text-sm">
                      Interactive visualizations of forest types, species distribution, and biodiversity hotspots.
                    </p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-6 border border-purple-200">
                    <div className="text-4xl mb-4 text-center">🗺️</div>
                    <h3 className="text-xl font-bold text-purple-800 mb-3">Interactive Map</h3>
                    <p className="text-gray-700 text-sm">
                      Explore forest regions across India with detailed information about each ecosystem.
                    </p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-lg p-6 border border-orange-200">
                    <div className="text-4xl mb-4 text-center">🛡️</div>
                    <h3 className="text-xl font-bold text-orange-800 mb-3">Conservation Impact</h3>
                    <p className="text-gray-700 text-sm">
                      Success stories, conservation programs, and their measurable impact on forest preservation.
                    </p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-teal-50 to-green-50 rounded-lg p-6 border border-teal-200">
                    <div className="text-4xl mb-4 text-center">🌳</div>
                    <h3 className="text-xl font-bold text-teal-800 mb-3">Forest Importance</h3>
                    <p className="text-gray-700 text-sm">
                      Understanding ecosystem services, climate impact, and the crucial role of forests.
                    </p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-lg p-6 border border-indigo-200">
                    <div className="text-4xl mb-4 text-center">🔬</div>
                    <h3 className="text-xl font-bold text-indigo-800 mb-3">Research & Data</h3>
                    <p className="text-gray-700 text-sm">
                      Latest research findings, scientific data, and evidence-based conservation strategies.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Statistics Section */}
          {activeSection === 'statistics' && (
            <motion.div variants={itemVariants}>
              <StatisticsPanel />
            </motion.div>
          )}

          {/* Biodiversity Section */}
          {activeSection === 'biodiversity' && (
            <motion.div variants={itemVariants}>
              <BiodiversityChart />
            </motion.div>
          )}

          {/* Interactive Map Section */}
          {activeSection === 'map' && (
            <motion.div variants={itemVariants}>
              <InteractiveMap />
            </motion.div>
          )}

          {/* Conservation Section */}
          {activeSection === 'conservation' && (
            <motion.div variants={itemVariants}>
              <ConservationImpact />
            </motion.div>
          )}

          {/* Importance Section */}
          {activeSection === 'importance' && (
            <motion.div variants={itemVariants}>
              <ImportanceSection />
            </motion.div>
          )}
        </motion.div>

        {/* Call to Action Section */}
        <motion.section 
          className="bg-gradient-to-r from-green-600 to-emerald-600 py-16 px-4 sm:px-6 lg:px-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Take Action for Forest Conservation
            </h2>
            <p className="text-lg text-green-100 mb-8">
              Understanding forests is just the beginning. Your support can help protect these vital ecosystems and the wildlife that depends on them.
            </p>
            
            {/* Impact Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl font-bold mb-2">3.2M+</div>
                <div className="text-sm text-green-100">Hectares Protected</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl font-bold mb-2">56.5M+</div>
                <div className="text-sm text-green-100">Trees Planted</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl font-bold mb-2">185K+</div>
                <div className="text-sm text-green-100">Families Supported</div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/donate"
                className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors duration-300 flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="mr-2">🌱</span>
                Support Conservation
              </motion.a>
              <motion.a
                href="/quiz"
                className="bg-green-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-800 transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Test Your Knowledge
              </motion.a>
              <motion.a
                href="/organizations"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Organizations
              </motion.a>
            </div>
            
            <div className="mt-6 text-sm text-green-100">
              <p>✓ All organizations verified  ✓ 100% secure donations  ✓ Tax benefits available</p>
            </div>
          </div>
        </motion.section>

        {/* Floating Donation Prompt */}
        <FloatingDonationPrompt 
          showAfterScroll={600}
          hideAfterTime={25000}
          position="bottom-right"
        />
      </div>
    </>
  );
};

export default Insights;