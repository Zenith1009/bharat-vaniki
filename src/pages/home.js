import Hero from "./Hero";
import Card from "./Card";
import Footer from "./Footer";

export default function Home() {
  return (
    <div className="overflow-x-clip">
      <Hero />
      <Card />
      <Footer />
    </div>
  );
}