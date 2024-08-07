import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { Instagram, Twitter, Facebook, Linkedin } from 'lucide-react';
import { Button } from "@/components/ui/button";

// Dynamically import the Confetti component without server-side rendering
const ReactConfetti = dynamic(() => import('react-confetti'), { ssr: false });

const About = () => {
  // State to control the confetti display
  const [confetti, setConfetti] = useState(false);

  // Position of the mouse cursor
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // State to track window size, initialized to zero
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  // Ref for controlling the timeout
  const timeoutRef = useRef(null);

  // New state to track if the cursor is moving
  const [isMoving, setIsMoving] = useState(false);

  // Effect to set initial window size on client-side only
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        setWindowSize({ width: window.innerWidth, height: window.innerHeight });
      };

      handleResize();
      window.addEventListener('resize', handleResize);

      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  // Function to handle mouse movement
  const handleMouseMove = (e) => {
    setPosition({ x: e.clientX, y: e.clientY });
    setIsMoving(true);
    setConfetti(true);

    // Clear previous timeouts
    clearTimeout(timeoutRef.current);

    // Set timeout to stop confetti after 100ms of no movement
    timeoutRef.current = setTimeout(() => {
      setIsMoving(false);
      setConfetti(false);
    }, 300);
  };

  // Effect to handle mouse movement, run on client-side only
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('mousemove', handleMouseMove);

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        clearTimeout(timeoutRef.current);
      };
    }
  }, []);

  // Inline Styles for the confetti wrapper
  const confettiWrapperStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    pointerEvents: 'none',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    zIndex: 5,
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: "url('/bg.jpg')" }}
    >
      {confetti && isMoving &&
        <div style={confettiWrapperStyle}>
          <ReactConfetti
            numberOfPieces={50}
            gravity={0.2}
            initialVelocityX={{ min: -5, max: 5 }}
            initialVelocityY={{ min: -5, max: 5 }}
            confettiSource={{ x: position.x, y: position.y }}
            width={windowSize.width}
            height={windowSize.height}
            recycle={true}
            run={isMoving}
          />
        </div>
      }
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 text-white text-center p-8">
        <h1 className="text-4xl font-bold mb-4">About Our Group</h1>
        <div className="flex justify-center space-x-4 mb-6">
          <Button variant="ghost" size="icon">
            <Instagram className="h-6 w-6" />
          </Button>
          <Button variant="ghost" size="icon">
            <Twitter className="h-6 w-6" />
          </Button>
          <Button variant="ghost" size="icon">
            <Facebook className="h-6 w-6" />
          </Button>
          <Button variant="ghost" size="icon">
            <Linkedin className="h-6 w-6" />
          </Button>
        </div>
        <div className="max-w-2xl mx-auto text-lg bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-blue-500 to-purple-600">
          <h2 className="text-3xl font-semibold mb-2">Introduction</h2>
          <p>
            We, Students of SVNIT from AI and CSE branch have created a website on the topic forestry. 
            Our aim was to create a website that showcases the wonderful world of flora and fauna, magical places and travelling spots that India has to offer.
          </p>
          <h2 className="text-3xl font-semibold mt-4 mb-2">Purpose</h2>
          <p>
            Our website solves a few real life problems as well, such as donations and volunteering for forest jobs can add towards conservation efforts and programs that our government has to offer.
          </p>
          <h2 className="text-3xl font-semibold mt-4 mb-2">Real Life Problems Solved</h2>
          <p>
            We have job applications to help people find their dream jobs in forestry department. By using our guides and itineraries you will also be helping locals get work and a chance to earn money.
          </p>
          <h2 className="text-3xl font-semibold mt-4 mb-2">Member List</h2>
          <ul className="list-disc list-inside">
            <li>Angela Dutta</li>
            <li>Naishadh Rana</li>
            <li>Rudray Dave (Group Leader)</li>
            <li>Smit Deoghare</li>
          </ul>
        </div>
        <p className="mt-4 text-sm">
          Move your cursor around to see a magical forest effect!
        </p>
      </div>
    </div>
  );
};

export default About;