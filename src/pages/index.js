import React, { useEffect, useState } from 'react';
import { Menu } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';

const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });

const forestData = [
  { id: 1, name: "Chambal National Sanctuary", lat: 26.6492, lon: 77.9064, info: "Known for its pristine riverine ecosystem and as a habitat for the critically endangered gharial." },
  { id: 2, name: "Sundarbans", lat: 21.9497, lon: 89.1833, info: "The largest mangrove forest in the world, home to the Bengal tiger and numerous other species." },
  { id: 3, name: "Namdapha National Park", lat: 27.4000, lon: 96.3833, info: "One of the largest protected areas in Eastern Himalaya, known for its rich biodiversity." },
  { id: 4, name: "Gir National Park", lat: 21.1239, lon: 70.8167, info: "The last remaining natural habitat of the Asiatic lion in the world." },
  { id: 5, name: "Bhadra Wildlife Sanctuary", lat: 13.7256, lon: 75.6614, info: "A tiger reserve in the Western Ghats, known for its diverse flora and fauna." }
];

const HomePage = () => {
  const [selectedForest, setSelectedForest] = useState(null);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Fix for default marker icon
      const L = require('leaflet');
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png',
      });
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-green-50">
      <header className="bg-green-800 text-white p-4 flex items-center justify-between sticky top-0 z-50">
        <Sheet open={isNavOpen} onOpenChange={setIsNavOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="text-white hover:bg-green-700">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="bg-green-700 text-white">
            <nav className="flex flex-col gap-4 mt-8">
              <a href="#" className="text-lg hover:underline transition-colors duration-200 hover:text-green-200">Home</a>
              <a href="#" className="text-lg hover:underline transition-colors duration-200 hover:text-green-200">About</a>
              <a href="#" className="text-lg hover:underline transition-colors duration-200 hover:text-green-200">Forests</a>
              <a href="#" className="text-lg hover:underline transition-colors duration-200 hover:text-green-200">Gallery</a>
              <a href="#" className="text-lg hover:underline transition-colors duration-200 hover:text-green-200">Contact</a>
            </nav>
          </SheetContent>
        </Sheet>
        <div className="text-center flex-grow">
          <h1 className="text-3xl font-bold">Discover Indian Forests</h1>
          <p className="text-xl">Explore the diverse and captivating forests of India</p>
        </div>
      </header>

      <main className="flex-grow p-4">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-8">
          <div className="h-[60vh] relative">
            {isMounted && (
              <MapContainer center={[20.5937, 78.9629]} zoom={5} style={{ height: '100%', width: '100%', zIndex: 1 }}>
                <TileLayer
                  url={`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`}
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {forestData.map((forest) => (
                  <Marker key={forest.id} position={[forest.lat, forest.lon]}>
                    <Popup>
                      <Card className="border-none shadow-none">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg font-bold">{forest.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <CardDescription>{forest.info}</CardDescription>
                        </CardContent>
                      </Card>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            )}
          </div>
        </div>

        <div className="space-y-8">
          <Card className="bg-green-100 border-green-300">
            <CardHeader>
              <CardTitle className="text-2xl text-green-800">Discover the Wonders of Indian Forests</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-green-700">India is home to some of the most diverse and breathtaking forests in the world. From the mangroves of Sundarbans to the deciduous forests of Gir, each ecosystem tells a unique story of biodiversity and natural beauty.</p>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-green-50 border-green-200 hover:shadow-md transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-xl text-green-800">Conservation Efforts</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-green-700">Learn about the ongoing conservation efforts to protect Indias precious forest ecosystems and the wildlife they support.</p>
                <Button className="mt-4 bg-green-600 hover:bg-green-700">Read More</Button>
              </CardContent>
            </Card>

            <Card className="bg-green-50 border-green-200 hover:shadow-md transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-xl text-green-800">Plan Your Visit</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-green-700">Discover how you can experience the magic of Indian forests firsthand through eco-friendly tourism initiatives.</p>
                <Button className="mt-4 bg-green-600 hover:bg-green-700">Explore Options</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <footer className="bg-green-800 text-white p-6 mt-12">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-semibold mb-2">Stay Connected</h3>
            <div className="flex gap-4">
              <a href="#" className="text-white hover:text-green-200 transition-colors duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a href="#" className="text-white hover:text-green-200 transition-colors duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
              </a>
            </div>
          </div>
          <div className="text-center md:text-right">
            <p>&copy; 2024 Indian Forests. All rights reserved.</p>
            <p className="mt-2">Designed with 🌿 for nature lovers</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;