import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from 'next/image';
import Link from 'next/link';

const tripData = [
  {
    id: 1,
    name: "Sundarbans Mangrove Tour",
    duration: "3 days",
    difficulty: "Moderate",
    description: "Explore the world's largest mangrove forest and spot the elusive Bengal tiger.",
    image: "/api/placeholder/800/600"
  },
  {
    id: 2,
    name: "Gir Lion Safari",
    duration: "2 days",
    difficulty: "Easy",
    description: "Witness the majestic Asiatic lions in their natural habitat.",
    image: "/api/placeholder/800/600"
  },
  {
    id: 3,
    name: "Namdapha Trekking Expedition",
    duration: "5 days",
    difficulty: "Challenging",
    description: "Embark on a thrilling trek through one of the largest protected areas in the Eastern Himalaya.",
    image: "/api/placeholder/800/600"
  },
  {
    id: 4,
    name: "Chambal River Safari",
    duration: "1 day",
    difficulty: "Easy",
    description: "Cruise along the Chambal River and spot gharials, turtles, and various bird species.",
    image: "/api/placeholder/800/600"
  }
];

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

const PlanYourTripPage = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

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

      <main className="flex-grow p-4">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-green-100 border-green-300 mb-8">
            <CardHeader>
              <CardTitle className="text-2xl text-green-800">Embark on an Eco-Adventure</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-green-700">Discover the beauty and diversity of Indian forests through our carefully curated eco-friendly trips. Each journey offers a unique opportunity to connect with nature, learn about conservation, and create unforgettable memories.</p>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tripData.map((trip) => (
              <Card key={trip.id} className="bg-white border-green-200 hover:shadow-md transition-shadow duration-300">
                <Image
                  src={trip.image}
                  alt={trip.name}
                  width={400}
                  height={300}
                  layout="responsive"
                  className="rounded-t-lg"
                />
                <CardHeader>
                  <CardTitle className="text-xl text-green-800">{trip.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-2">Duration: {trip.duration} | Difficulty: {trip.difficulty}</p>
                  <p className="text-green-700 mb-4">{trip.description}</p>
                  <Button className="bg-green-600 hover:bg-green-700">Book Now</Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="bg-green-100 border-green-300 mt-8">
            <CardHeader>
              <CardTitle className="text-2xl text-green-800">Responsible Tourism</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-green-700">We are committed to sustainable and responsible tourism. Our trips are designed to minimize environmental impact while maximizing the benefits to local communities and conservation efforts.</p>
              <Button className="mt-4 bg-green-600 hover:bg-green-700">Learn More About Our Approach</Button>
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
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a href="#" className="text-white hover:text-green-200 transition-colors duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
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