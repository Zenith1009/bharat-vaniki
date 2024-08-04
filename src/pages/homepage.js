import { useEffect } from "react";
import { initParallax } from "./parallax";
import { parallaxScroll } from "./parallaxScroll";
import Hero from "./Hero";
import Card from "./Card";
import Footer from "./Footer";
import Credits from "./Credits";

export default function random() {
  useEffect(() => {
    initParallax();
  }, []);

  useEffect(() => {
    parallaxScroll();
  }, []);

  return (
    <div className="overflow-x-clip">
      <Hero />
      <Credits />
      <Card />
      <Footer />
    </div>
  );
}
