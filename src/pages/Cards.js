import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { useIntersectionObserver } from '@/lib/useIntersectionObserver';

export default function Cards() {
  const [aboutRef, isAboutIntersecting] = useIntersectionObserver({ threshold: 0.2 });
  const [tripsRef, isTripsIntersecting] = useIntersectionObserver({ threshold: 0.2 });
  const [galleryRef, isGalleryIntersecting] = useIntersectionObserver({ threshold: 0.2 });
  const [conservationRef, isConservationIntersecting] = useIntersectionObserver({ threshold: 0.2 });

  return (
    <div className="overflow-hidden">
      <section ref={aboutRef} className="about w-full h-screen bg-gray-400 flex justify-center items-center sticky top-0">
        <div className="hide vignette absolute z-[100] w-full h-full top-0 left-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0)_65%,_rgba(0,0,0,0.7))]"></div>
        <Image
          src="/image/image-1.jpg"
          fill
          style={{ objectFit: 'cover' }}
          alt="About Indian Forests"
        />
        <div
          className="content absolute top-[10%] md:top-[20%] w-full md:w-[80%] max-w-[1140px] px-4 md:px-0 box-border text-white translate-y-12 blur-[20px] opacity-0 z-[200]"
          style={isAboutIntersecting ? { animation: "showContent 1s .1s linear 1 forwards" } : {}}
        >
          <div className="author font-bold tracking-wider uppercase text-sm md:text-base">
            Welcome
          </div>
          <div className="title text-4xl md:text-6xl lg:text-7xl font-bold leading-tight uppercase">
            About Indian{" "}
          </div>
          <div className="topic text-4xl md:text-6xl lg:text-7xl font-bold text-orange-600 leading-tight uppercase">
            Forests
          </div>
          <div className="des text-base md:text-xl mt-4">
            The rich biodiversity of Indian forests plays a crucial role in maintaining ecological balance and supporting the livelihoods of many communities. Our website aims to celebrate the beauty of India's forests and wildlife while promoting conservation efforts to protect these natural treasures for future generations. Explore our pages to discover the wonders of Indian wilderness and learn about our conservation initiatives.
          </div>
          <div className="mt-6">
            <Link href="/destinations">
              <Button className="bg-green-600 hover:bg-green-700 z-[300]">
                Explore More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section ref={tripsRef} className="trips w-full h-screen bg-black flex justify-center items-center sticky top-0">
        <div className="hide vignette absolute z-[100] w-full h-full top-0 left-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0)_65%,_rgba(0,0,0,0.7))]"></div>
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute left-0 top-0 w-full h-full object-cover"
        >
          <source src="/video/vid2.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div
          className="content absolute top-[10%] md:top-[20%] w-full md:w-[80%] max-w-[1140px] px-4 md:px-0 box-border text-white opacity-0 blur-[20px] z-[200]"
          style={isTripsIntersecting ? { animation: "showContent 1s .1s linear 1 forwards" } : {}}
        >
          <div className="title text-4xl md:text-6xl lg:text-7xl font-bold leading-tight uppercase">
            Plan Your Visit
          </div>
          <div className="topic text-4xl md:text-6xl lg:text-7xl font-bold text-orange-600 leading-tight uppercase">
            discover
          </div>
          <div className="des text-base md:text-xl mt-4">
            Explore the diverse destinations, discover hidden gems, and immerse yourself in the beauty of Indian wilderness. Start planning your next nature-filled adventure with us and create lasting memories while exploring the wonders of India's forests and wildlife.
          </div>
          <div className="mt-6">
            <Link href="/itineraries">
              <Button className="bg-green-600 hover:bg-green-700 z-[300]">
                Explore More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section ref={galleryRef} className="gallery w-full h-screen bg-gray-600 flex justify-center items-center sticky top-0">
        <div className="hide vignette absolute z-[100] w-full h-full top-0 left-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0)_65%,_rgba(0,0,0,0.7))]"></div>
        <Image
          src="/image/image-3.jpg"
          fill
          style={{ objectFit: 'cover' }}
          alt="Forest Gallery"
        />

        <div
          className="content absolute top-[10%] md:top-[20%] w-full md:w-[80%] max-w-[1140px] px-4 md:px-0 box-border text-white translate-y-12 blur-[20px] opacity-0 z-[200]"
          style={isGalleryIntersecting ? { animation: "showContent 1s .1s linear 1 forwards" } : {}}
        >
          <div className="author font-bold tracking-wider uppercase text-sm md:text-base">Explore</div>
          <div className="title text-4xl md:text-6xl lg:text-7xl font-bold leading-tight uppercase">
            the forest
          </div>
          <div className="topic text-4xl md:text-6xl lg:text-7xl font-bold text-orange-600 leading-tight uppercase">
            gallery{" "}
          </div>
          <div className="des text-base md:text-xl mt-4">
            Immerse yourself in the breathtaking beauty of lush green canopies, diverse wildlife, and serene landscapes captured in stunning photographs. From majestic tigers prowling through dense foliage to colorful birds perched on ancient trees, our gallery showcases the rich biodiversity and scenic wonders of Indian forests.
          </div>
          <div className="mt-6">
            <Link href="/photography">
              <Button className="bg-green-600 hover:bg-green-700 z-[300]">
                Explore More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <div ref={conservationRef} className="w-full h-screen bg-gray-600 flex justify-center items-center sticky top-0 overflow-hidden">
        <div className="hide vignette absolute z-[100] w-full h-full top-0 left-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0)_65%,_rgba(0,0,0,0.7))]"></div>

        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute left-0 top-0 w-full h-full object-cover"
        >
          <source src="/video/vid1.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div
          className="content absolute top-[10%] md:top-[20%] w-full md:w-[80%] max-w-[1140px] px-4 md:px-0 box-border text-white opacity-0 blur-[20px] z-[200]"
          style={isConservationIntersecting ? { animation: "showContent 1s .1s linear 1 forwards" } : {}}
        >
          <div className="author font-bold tracking-wider uppercase text-sm md:text-base">protect</div>
          <div className="title text-4xl md:text-6xl lg:text-7xl font-bold leading-tight uppercase">
            conservation
          </div>
          <div className="topic text-4xl md:text-6xl lg:text-7xl font-bold text-orange-600 leading-tight uppercase">
            efforts
          </div>
          <div className="des text-base md:text-xl mt-4">
            Join us in our mission to safeguard the biodiversity of Indian forests by learning about our projects, volunteering opportunities, and ways you can contribute to the conservation cause. Together, we can make a positive impact on the future of our forests and wildlife.
          </div>
          <div className="mt-6">
            <Link href="/insights">
              <Button className="bg-green-600 hover:bg-green-700 z-[300]">
                Explore More
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}