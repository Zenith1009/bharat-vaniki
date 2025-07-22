import React, { useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { slide } from '@/lib/slide';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const PhotographyPage = () => {
    useEffect(() => {
        slide();
    }, []);

    const galleryImages = [
        {
            src: "/image/img1.jpg",
            title: "Forest Wildlife",
            topic: "BIODIVERSITY",
            description: "Capturing the diverse wildlife that calls Indian forests home"
        },
        {
            src: "/image/img2.jpg", 
            title: "Dense Canopies",
            topic: "LANDSCAPES",
            description: "The lush green canopies that form the heart of our forests"
        },
        {
            src: "/image/img3.jpg",
            title: "Forest Streams",
            topic: "ECOSYSTEMS", 
            description: "Crystal clear streams flowing through pristine forest environments"
        },
        {
            src: "/image/img4.jpg",
            title: "Ancient Trees",
            topic: "HERITAGE",
            description: "Majestic ancient trees that have stood for centuries"
        }
    ];

    return (
        <>
            <Head>
                <title>Forest Photography Gallery - Indian Forests Encyclopedia</title>
                <meta 
                    name="description" 
                    content="Explore stunning photography of Indian forests, wildlife, and landscapes. Immerse yourself in the beauty of India's diverse forest ecosystems through captivating images." 
                />
                <meta name="keywords" content="forest photography, Indian wildlife, nature photography, forest landscapes, biodiversity images" />
                <meta property="og:title" content="Forest Photography Gallery - Indian Forests Encyclopedia" />
                <meta property="og:description" content="Stunning photography showcasing the beauty and diversity of Indian forests and wildlife." />
                <meta property="og:type" content="website" />
                <link rel="canonical" href="/photography" />
            </Head>

            <div className="min-h-screen bg-black">
                {/* Hero Section */}
                <motion.section 
                    className="relative py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-green-900 to-blue-900"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="max-w-4xl mx-auto text-center">
                        <motion.h1 
                            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            Forest Photography Gallery
                        </motion.h1>
                        <motion.p 
                            className="text-xl md:text-2xl text-green-100 mb-8"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        >
                            Immerse yourself in the breathtaking beauty of India's forests through stunning photography
                        </motion.p>
                    </div>
                </motion.section>

                {/* Gallery Carousel */}
                <div className="carousel">
                    <div className="list">
                        {galleryImages.map((image, index) => (
                            <div key={index} className="item">
                                <Image 
                                    src={image.src} 
                                    width={1000} 
                                    height={800}
                                    alt={image.title}
                                    style={{ objectFit: 'cover' }}
                                    priority={index === 0}
                                    loading={index === 0 ? 'eager' : 'lazy'}
                                    quality={85}
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                                />
                                <div className="content">
                                    <div className="title">{image.title}</div>
                                    <div className="topic">{image.topic}</div>
                                    <div className="description">{image.description}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    <div className="thumbnail">
                        {galleryImages.map((image, index) => (
                            <div key={index} className="item">
                                <Image 
                                    src={image.src} 
                                    width={1000} 
                                    height={800}
                                    alt={`${image.title} thumbnail`}
                                    style={{ objectFit: 'cover' }}
                                    loading="lazy"
                                    quality={75}
                                    sizes="(max-width: 768px) 25vw, 20vw"
                                />
                            </div>
                        ))}
                    </div>

                    <div className="arrows">
                        <button id="prev" aria-label="Previous image">
                            <ArrowLeft />
                        </button>
                        <button id="next" aria-label="Next image">
                            <ArrowRight />
                        </button>
                    </div>
                    <div className="time"></div>
                </div>

                {/* Call to Action */}
                <motion.section 
                    className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-green-800 to-blue-800"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                >
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                            Explore More of India's Natural Beauty
                        </h2>
                        <p className="text-lg text-green-100 mb-8">
                            Discover destinations, plan your visits, and learn about conservation efforts
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <motion.a
                                href="/destinations"
                                className="bg-white text-green-800 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors duration-300"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Explore Destinations
                            </motion.a>
                            <motion.a
                                href="/insights"
                                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-800 transition-colors duration-300"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Forest Insights
                            </motion.a>
                        </div>
                    </div>
                </motion.section>
            </div>
        </>
    );
};

export default PhotographyPage