import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { useIntersectionObserver } from './useIntersectionObserver';

export default function Card() {
  const [aboutRef, isAboutIntersecting] = useIntersectionObserver({ threshold: 0.2 });
  const [tripsRef, isTripsIntersecting] = useIntersectionObserver({ threshold: 0.2 });
  const [galleryRef, isGalleryIntersecting] = useIntersectionObserver({ threshold: 0.2 });
  const [conservationRef, isConservationIntersecting] = useIntersectionObserver({ threshold: 0.2 });

  return (
    <div>
      <section ref={aboutRef} className="about w-[100vw] h-[100vh] bg-gray-400 flex justify-center items-center sticky top-0">
          <div className="hide vignette absolute z-[100] w-full h-full top-0 left-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0)_65%,_rgba(0,0,0,0.7))]"></div>
          <Image
            src="/image/image-1.jpg"
            width={800}
            height={800}
            className="absolute left-0 top-0 w-[100%] h-[100%] object-cover"
          />
          <div
            className="content absolute top-[20%] w-[1140px] max-w-[80%] transform pr-[30%] box-border text-white translate-y-12 blur-[20px] opacity-0 z-[200]"
            style={isAboutIntersecting ? { animation: "showContent 1s .1s linear 1 forwards" } : {}}
          >
            <div className="author font-bold tracking-wider uppercase">
              Welcome
            </div>
            <div className="title text-7xl font-bold leading-[1.3em] uppercase">
              About Indian{" "}
            </div>
            <div className="topic text-7xl font-bold text-orange-600 leading-[1.3em] uppercase">
              Forests
            </div>
            <div className="des text-xl">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut
              sequi, rem magnam nesciunt minima placeat, itaque eum neque
              officiis unde, eaque optio ratione aliquid assumenda facere ab et
              quasi ducimus aut doloribus non numquam. Explicabo, laboriosam
              nisi reprehenderit tempora at laborum natus unde. Ut,
              exercitationem eum aperiam illo illum laudantium?
            </div>
            <div className="buttons grid grid-cols-2 grid-rows-1 gap-5 mt-[20px] h-10 delay-300">
              <Link href="/ce_test1">
              <Button className="mt-4 bg-green-600 hover:bg-green-700 z-[300]">
                Explore More
              </Button>
              </Link>
            </div>
          </div>
        </section>

        <section ref={tripsRef} className="trips w-[100vw] h-[100vh] bg-black flex justify-center items-center sticky top-0">
          <div class="hide vignette absolute z-[100] w-full h-full top-0 left-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0)_65%,_rgba(0,0,0,0.7))]"></div>
          {/* <div className="content absolute top-[20%] w-[1140px] max-w-[80%] transform pr-[30%] box-border text-white translate-y-12 left-1/2 -translate-x-1/2"> */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute left-0 top-0 w-[100%] h-[100%] object-cover"
          >
            <source src="/video/vid2.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          <div
            className="content absolute top-[20%] w-[1140px] max-w-[80%] transform pr-[30%] box-border text-white opacity-0 left-1/2 -translate-x-1/2 blur-[20px] z-[200]"
            style={isTripsIntersecting ? { animation: "showContent 1s .1s linear 1 forwards" } : {}}
          >
            <div class="author font-bold tracking-wider uppercase"></div>
            <div class="title text-7xl font-bold leading-[1.3em] uppercase">
              Plan Your Visit
            </div>
            <div class="topic text-7xl font-bold text-orange-600 leading-[1.3em] uppercase">
              discover
            </div>
            <div class="des text-xl">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut
              sequi, rem magnam nesciunt minima placeat, itaque eum neque
              officiis unde, eaque optio ratione aliquid assumenda facere ab et
              quasi ducimus aut doloribus non numquam. Explicabo, laboriosam
              nisi reprehenderit tempora at laborum natus unde. Ut,
              exercitationem eum aperiam illo illum laudantium?
            </div>
            <div className="buttons grid grid-cols-2 grid-rows-1 gap-5 mt-[20px] h-10 delay-300">
              <Link href="/pyt_test">
              <Button className="mt-4 bg-green-600 hover:bg-green-700 z-[300]">
                Explore More
              </Button>
              </Link>
            </div>
          </div>
        </section>

        <section ref={galleryRef} className="gallery w-[100vw] h-[100vh] bg-gray-600 flex justify-center items-center sticky top-0">
          <div class="hide vignette absolute z-[100] w-full h-full top-0 left-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0)_65%,_rgba(0,0,0,0.7))]"></div>
          <Image
            src="/image/image-3.jpg"
            width={800}
            height={800}
            className="absolute left-0 top-0 w-[100%] h-[100%] object-cover"
          />

          <div
            className="content absolute top-[20%] w-[1140px] max-w-[80%] transform pr-[30%] box-border text-white translate-y-12 blur-[20px] opacity-0 z-[200]"
            style={isGalleryIntersecting ? { animation: "showContent 1s .1s linear 1 forwards" } : {}}
          >
            <div class="author font-bold tracking-wider uppercase">Explore</div>
            <div class="title text-7xl font-bold leading-[1.3em] uppercase">
              the forest
            </div>
            <div class="topic text-7xl font-bold text-orange-600 leading-[1.3em] uppercase">
              gallery{" "}
            </div>
            <div class="des text-xl">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut
              sequi, rem magnam nesciunt minima placeat, itaque eum neque
              officiis unde, eaque optio ratione aliquid assumenda facere ab et
              quasi ducimus aut doloribus non numquam. Explicabo, laboriosam
              nisi reprehenderit tempora at laborum natus unde. Ut,
              exercitationem eum aperiam illo illum laudantium?
            </div>
            <div className="buttons grid grid-cols-2 grid-rows-1 gap-5 mt-[20px] h-10 delay-300">
              <Link href="/ig2">
              <Button className="mt-4 bg-green-600 hover:bg-green-700 z-[300]">
                Explore More
              </Button>
              </Link>
            </div>
          </div>
        </section>

        <div ref={conservationRef} className="w-[100vw] h-[100vh] bg-gray-600 flex justify-center items-center sticky top-0 overflow-hidden">
          <div className="hide vignette absolute z-[100] w-full h-full top-0 left-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0)_65%,_rgba(0,0,0,0.7))]"></div>

          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute left-0 top-0 w-[100%] h-[100%] object-cover"
          >
            <source src="/video/vid1.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* <div
            className="content absolute top-[20%] w-[1140px] max-w-[80%] transform pr-[30%] box-border text-white translate-y-12 blur-[20px] opacity-0"
            style={animationStyles}
          > */}
          <div
            className="content absolute top-[20%] w-[1140px] max-w-[80%] transform pr-[30%] box-border text-white opacity-0 left-1/2 -translate-x-1/2 blur-[20px] z-[200]"
            style={isConservationIntersecting ? { animation: "showContent 1s .1s linear 1 forwards" } : {}}
          >
            <div class="author font-bold tracking-wider uppercase">protect</div>
            <div class="title text-7xl font-bold leading-[1.3em] uppercase">
              conservation
            </div>
            <div class="topic text-7xl font-bold text-orange-600 leading-[1.3em] uppercase">
              efforts
            </div>
            <div class="des text-xl">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut
              sequi, rem magnam nesciunt minima placeat, itaque eum neque
              officiis unde, eaque optio ratione aliquid assumenda facere ab et
              quasi ducimus aut doloribus non numquam. Explicabo, laboriosam
              nisi reprehenderit tempora at laborum natus unde. Ut,
              exercitationem eum aperiam illo illum laudantium?
            </div>
            <div className="buttons grid grid-cols-2 grid-rows-1 gap-5 mt-[20px] h-10 delay-300">
              <Link href="/ce_test">
              <Button className="mt-4 bg-green-600 hover:bg-green-700 z-[300]">
                Explore More
              </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
  );
}