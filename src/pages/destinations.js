import React, { useEffect, useState } from "react";
import { Menu, Park, TreePine, Trees } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import Image from "next/image";
import forestDataJson from "@/data/indianForests.json";
import Navbar from "./navbar";

const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const CustomMarker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const CustomPopup = dynamic(
  () => import("react-leaflet").then((mod) => mod.Popup),
  { ssr: false }
);

const ForestTypeMarker = ({ position, children, type }) => {
  const buttonClasses = {
    "National Park": "bg-green-600 hover:bg-green-700",
    "Wildlife Sanctuary": "bg-yellow-600 hover:bg-yellow-700",
    "Forest": "bg-blue-600 hover:bg-blue-700",
  };

  const IconComponent = {
    "National Park": Park,
    "Wildlife Sanctuary": TreePine,
    "Forest": Trees,
  };

  const ButtonIcon = IconComponent[type] || Trees;

  return (
    <CustomMarker position={position}>
      <CustomPopup>
        <Button
          variant="outline"
          size="icon"
          className={buttonClasses[type] || buttonClasses["Forest"]}
        >
          <ButtonIcon className="h-4 w-4 text-white" />
        </Button>
        {children}
      </CustomPopup>
    </CustomMarker>
  );
};

const ImageGallery = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <div className="relative w-full h-48 mb-4">
      <Image
        src={images[currentImageIndex]}
        alt={`Forest image ${currentImageIndex + 1}`}
        layout="fill"
        objectFit="cover"
        className="rounded-t-lg"
      />
      <button
        onClick={prevImage}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
      >
        &lt;
      </button>
      <button
        onClick={nextImage}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
      >
        &gt;
      </button>
    </div>
  );
};

const HomePage = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const L = require("leaflet");
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon-2x.png",
        iconUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
        shadowUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png",
      });
    }
  }, []);

  const getCardStyles = (type) => {
    switch (type) {
      case "National Park":
        return {
          gradient: "bg-gradient-to-br from-green-500 to-green-700",
          button: "bg-green-600 hover:bg-green-700",
          text: "text-green-100",
        };
      case "Wildlife Sanctuary":
        return {
          gradient: "bg-gradient-to-br from-yellow-500 to-yellow-700",
          button: "bg-yellow-600 hover:bg-yellow-700",
          text: "text-yellow-100",
        };
      default:
        return {
          gradient: "bg-gradient-to-br from-blue-500 to-blue-700",
          button: "bg-blue-600 hover:bg-blue-700",
          text: "text-blue-100",
        };
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        <div className="h-full relative">
          {isMounted && (
            <MapContainer
              center={[20.5937, 78.9629]}
              zoom={5}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                url={`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`}
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {forestDataJson.forestData.map((forest) => {
                const styles = getCardStyles(forest.type);
                return (
                  <ForestTypeMarker
                    key={forest.id}
                    position={[forest.lat, forest.lon]}
                    type={forest.type}
                  >
                    <Card className={`border-none shadow-lg w-full max-w-[400px] animate-fade-in-scale ${styles.gradient}`}>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-xl font-bold text-white">
                          {forest.name}
                        </CardTitle>
                        <CardDescription className={`text-sm ${styles.text}`}>
                          <strong>Type:</strong> {forest.type}
                        </CardDescription>
                        <CardDescription className={`text-sm ${styles.text}`}>
                          <strong>State:</strong> {forest.state}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="p-4 bg-white bg-opacity-90 rounded-b-lg">
                        <ImageGallery images={forest.images} />
                        <CardDescription className="text-sm mb-2 text-gray-700">
                          <strong>Introduction:</strong> {forest.introduction}
                        </CardDescription>
                        <CardDescription className="text-sm mb-2 text-gray-700">
                          <strong>Importance:</strong> {forest.importance}
                        </CardDescription>
                        <CardDescription className="text-sm mb-2 text-gray-700">
                          <strong>Why it should be protected:</strong>{" "}
                          {forest.protection}
                        </CardDescription>
                        {/* <Button className={`mt-4 w-full text-white transition-colors duration-300 ${styles.button}`}>
                          Learn More
                        </Button> */}
                      </CardContent>
                    </Card>
                  </ForestTypeMarker>
                );
              })}
            </MapContainer>
          )}
        </div>
      </main>
    </div>
  );
};

export default HomePage;