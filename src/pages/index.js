import Hero from "./Hero";
import EnhancedSections from "../components/sections/EnhancedSections";

export default function HomePage() {
  // Parallax is now handled by the Hero component using the useParallax hook

  return (
    <div className="overflow-x-clip">
      <Hero />
      <EnhancedSections />
    </div>
  );
}
