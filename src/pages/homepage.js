import Image from "next/image";
import { useEffect } from "react";
import { initParallax } from "./parallax";
import { parallaxScroll } from "./parallaxScroll";
import Navbar from "./navbar";
import { Button } from "@/components/ui/button";
import { useIntersectionObserver } from './useIntersectionObserver';
import Link from 'next/link';


export default function random() {
  useEffect(() => {
    initParallax();
  }, []);

  useEffect(() => {
    parallaxScroll();
  }, []);

  // const animationStyles = {
  //   "@keyframes showContent": {
  //     to: {
  //       transform: "translateY(0px)",
  //       filter: "blur(0px)",
  //       opacity: 1,
  //     },
  //   },
  //   animation: "showContent 1s .1s linear 1 forwards",
  // };

  const [sectionRef, isIntersecting] = useIntersectionObserver({
    threshold: 0.1,
  });
  
  const animationStyles = isIntersecting
    ? {
        animation: "showContent 1s .1s linear 1 forwards",
      }
    : {};

  return (
    <div className="overflow-x-clip">
      <main className="h-[100vh] w-[100vw] overflow-hidden relative ">
        <Navbar />

        <div class="hide vignette absolute z-[100] w-full h-full top-0 left-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0)_65%,_rgba(0,0,0,0.7))]"></div>
        <Image
          src="/img/background.png"
          alt="Background"
          width={2800}
          height={1600}
          className="bg-img absolute object-cover top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-[-390px] z-1 pointer-events-none scale-[2] transform "
          id="background-image"
          data-speedx="0.28"
          data-speedy="0.34"
          data-speedz="0"
          data-rotation="0"
          data-speed="0.2"
        />
        <Image
          src="/img/fog_7.png"
          alt="Background"
          width={1900}
          height={700}
          className="parallax fog_7 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-[-100px] ml-[300px] z-2 pointer-events-none translating"
          data-speedx="0.27"
          data-speedy="0.32"
          data-speedz="0"
          data-rotation="0"
          data-distance="850"
          data-speed="0.2"
        />

        <Image
          src="/img/mountain_10.png"
          alt="Background"
          width={1000}
          height={700}
          className="parallax mountain_10 absolute -translate-x-1/2 -translate-y-1/2 z-[3] top-[50%] mt-[69px] w-[870px] left-[50%] ml-[230px] pointer-events-none translating"
          data-speedx="0.195"
          data-speedy="0.305"
          data-speedz="0"
          data-rotation="0"
          data-distance="1100"
          data-speed="0.2"
        />

        <Image
          src="/img/fog_6.png"
          alt="Background"
          width={1000}
          height={700}
          className="parallax fog_6 absolute -translate-x-1/2 -translate-y-1/2 z-[7] top-[50%] mt-[177px] left-[50%] -ml-[30px] w-[1418px] pointer-events-none translating"
          data-speedx="0.025"
          data-speedy="0.28"
          data-speedz="0"
          data-rotation="0"
          data-distance="1400"
          data-speed="0.2"
        />

        <Image
          src="/img/mountain_9.png"
          alt="Background"
          width={1000}
          height={700}
          className="parallax fog_6 absolute -translate-x-1/2 -translate-y-1/2 z-[5] top-[50%] mt-[119px] w-[463px] left-[50%] -ml-[457px] pointer-events-none translating"
          data-speedx="0.125"
          data-speedy="0.155"
          data-speedz="0.15"
          data-rotation="0.02"
          data-distance="1700"
          data-speed="0.15"
        />

        <Image
          src="/img/mountain_8.png"
          alt="Background"
          width={1000}
          height={700}
          className="parallax mountain_8 absolute -translate-x-1/2 -translate-y-1/2 z-[6] top-[50%] mt-[96px] w-[786px] left-[50%] -ml-[202px] pointer-events-none translating"
          data-speedx="0.1"
          data-speedy="0.11"
          data-speedz="0"
          data-rotation="0.02"
          data-distance="1800"
          data-speed="0.15"
        />

        <Image
          src="/img/fog_5.png"
          alt="Background"
          width={1000}
          height={700}
          className="parallax fog_5 absolute -translate-x-1/2 -translate-y-1/2 z-[13] top-[50%] mt-[149px] left-[50%] -ml-[28px] w-[1435px] pointer-events-none translating"
          data-speedx="0.16"
          data-speedy="0.105"
          data-speedz="0"
          data-rotation="0"
          data-distance="1900"
          data-speed="0.15"
        />

        <Image
          src="/img/mountain_7.png"
          alt="Background"
          width={1000}
          height={700}
          className="parallax mountain_7 absolute -translate-x-1/2 -translate-y-1/2 z-[8] w-[515px] top-[50%] mt-[134px] left-[50%] ml-[305px] pointer-events-none translating"
          data-speedx="0.1"
          data-speedy="0.07"
          data-speedz="0"
          data-rotation="0.09"
          data-distance="2000"
          data-speed="0.1"
        />

        <div
          className="parallax text absolute z-[13] top-1/2 mt-[-130px] left-1/2 -translate-x-1/2 -translate-y-1/2 text-center uppercase text-white pointer-events-auto selection:bg-green-800 translating"
          data-speedx="0.07"
          data-speedy="0.1"
          data-speedz="0"
          data-rotation="0.11"
          data-distance="0"
          data-speed="0.05"
        >
          <h2 className="font-thin text-[6.5rem] leading-[0.88]">Indian</h2>
          <h1 className="font-extrabold text-[8rem] leading-[0.88]">
            Friedricebullshit
          </h1>
        </div>

        <Image
          src="/img/mountain_6.png"
          alt="Background"
          width={1000}
          height={700}
          className="parallax mountain_6 absolute -translate-x-1/2 -translate-y-1/2 z-[10] top-[50%] mt-[86.5px] w-[383.5px] left-[50%] ml-[590px] pointer-events-none translating"
          data-speedx="0.065"
          data-speedy="0.05"
          data-speedz="0.05"
          data-rotation="0.12"
          data-distance="2300"
          data-speed="0.1"
        />

        <Image
          src="/img/fog_4.png"
          alt="Background"
          width={1000}
          height={700}
          className="parallax fog_4 absolute -translate-x-1/2 -translate-y-1/2 z-[11] top-[50%] mt-[242px] left-[50%] -ml-[64px] w-[543px] pointer-events-none translating"
          data-speedx="0.135"
          data-speedy="0.04"
          data-speedz="0"
          data-rotation="0"
          data-distance="2400"
          data-speed="0.2"
        />

        <Image
          src="/img/mountain_5.png"
          alt="Background"
          width={1000}
          height={700}
          className="parallax mountain_5 absolute -translate-x-1/2 -translate-y-1/2 z-[12] top-[50%] mt-[269px] w-[583px] left-[50%] ml-[130px] pointer-events-none translating"
          data-speedx="0.08"
          data-speedy="0.03"
          data-speedz="0.13"
          data-rotation="0.1"
          data-distance="2550"
          data-speed="0.1"
        />

        <Image
          src="/img/fog_3.png"
          alt="Background"
          width={1000}
          height={700}
          className="parallax fog_3 absolute -translate-x-1/2 -translate-y-1/2 z-[7] top-[50%] mt-[171px] left-[50%] ml-[29px] w-[449px] pointer-events-none translating"
          data-speedx="0.11"
          data-speedy="0.018"
          data-speedz="0"
          data-rotation="0"
          data-distance="2800"
          data-speed="0.2"
        />

        <Image
          src="/img/mountain_4.png"
          alt="Background"
          width={1000}
          height={700}
          className="parallax mountain_4 absolute -translate-x-1/2 -translate-y-1/2 z-[14] top-[50%] mt-[221px] w-[717px] left-[50%] -ml-[381.5px] pointer-events-none translating"
          data-speedx="0.059"
          data-speedy="0.024"
          data-speedz="0.35"
          data-rotation="0.14"
          data-distance="3200"
          data-speed="-0.08"
        />

        <Image
          src="/img/mountain_3.png"
          alt="Background"
          width={1000}
          height={700}
          className="parallax mountain_3 absolute -translate-x-1/2 -translate-y-1/2 z-[15] top-[50%] mt-[133px] left-[50%] ml-[736px] w-[419px] pointer-events-none translating"
          data-speedx="0.04"
          data-speedy="0.018"
          data-speedz="0.32"
          data-rotation="0.05"
          data-distance="3400"
          data-speed="-0.08"
        />

        <Image
          src="/img/fog_2.png"
          alt="Background"
          width={1000}
          height={700}
          className="parallax fog_2 absolute -translate-x-1/2 -translate-y-1/2 z-[4] top-[50%] mt-[95px] left-[50%] ml-[7px] w-[1833px] pointer-events-none translating"
          data-speedx="0.15"
          data-speedy="0.0115"
          data-speedz="0"
          data-rotation="0"
          data-distance="3600"
          data-speed="-0.2"
        />

        <Image
          src="/img/mountain_2.png"
          alt="Background"
          width={1000}
          height={700}
          className="parallax mountain_2 absolute -translate-x-1/2 -translate-y-1/2 z-[17] top-[50%] mt-[188px] left-[50%] ml-[412px] w-[625px] pointer-events-none translating"
          data-speedx="0.0335"
          data-speedy="0.013"
          data-speedz="0.42"
          data-rotation="0.15"
          data-distance="3800"
          data-speed="-0.1"
        />

        <Image
          src="/img/mountain_1.png"
          alt="Background"
          width={1000}
          height={700}
          className="parallax mountain_1 absolute -translate-x-1/2 -translate-y-1/2 z-[18] top-[50%] mt-[91.5px] left-[50%] -ml-[651px] w-[450px] pointer-events-none translating"
          data-speedx="0.027"
          data-speedy="0.018"
          data-speedz="0.53"
          data-rotation="0.2"
          data-distance="4000"
          data-speed="-0.09"
        />

        <Image
          src="/img/sun_rays.png"
          alt="Background"
          width={1000}
          height={700}
          className="hide sun_rays absolute z-19 top-0 right-0 w-[795px] pointer-events-none"
        />
        <Image
          src="/img/black_shadow.png"
          alt="Background"
          width={1000}
          height={700}
          className="hide black_shadow absolute z-20 bottom-0 right-0 w-full pointer-events-none translate"
          data-speed="-0.25"
        />

        <Image
          src="/img/fog_1.png"
          alt="Background"
          width={1000}
          height={700}
          className=" fog_1 absolute -translate-x-1/2 -translate-y-1/2 z-[21] top-[100%] -mt-[355px] left-[50%] w-[1600px] pointer-events-none translating"
          data-speedx="0"
          data-speedy="0.01"
          data-speedz="0"
          data-rotation="0"
          data-distance="4200"
          data-speed="0"
        />
      </main>

      <section className="w-full bg-black relative">
        <div class="shadow absolute bottom-[100%] w-full h-[300px] left-0 z-50 bg-gradient-to-b from-transparent to-black"></div>

        <div class="container p-12 grid grid-cols-2 items-center justify-center min-h-[100vh]">
          <div class="content opacity text-white m-8 transform -translate-y-12">
            <h3 class="title font-bold text-4xl mb-4 pb-2 relative">
              Credits
              <div class="border absolute h-[3px] bg-white bottom-0 left-0"></div>
            </h3>
            <p class="text-2xl">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eaque
              officiis quos expedita ipsa, a quidem inventore voluptates debitis
              accusamus tenetur qui et voluptas dicta, culpa earum, doloribus
              odio consectetur consequuntur soluta quasi nobis! Deserunt
              voluptatum reiciendis iure expedita sequi quisquam laboriosam
              temporibus exercitationem.
            </p>
          </div>

          <div class="imgContainer opacity m-8 transform translate-y-12">
            <Image src="/img/background.png" width={800} height={600} />
          </div>
        </div>
        <div class="borderLine relative w-full h-[3px] bg-white bottom-0 left-0"></div>
      </section>
      <div>
        <section ref={sectionRef} className="about w-[100vw] h-[100vh] bg-gray-400 flex justify-center items-center sticky top-0">
          <div className="hide vignette absolute z-[100] w-full h-full top-0 left-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0)_65%,_rgba(0,0,0,0.7))]"></div>
          <Image
            src="/image/image-1.jpg"
            width={800}
            height={800}
            className="absolute left-0 top-0 w-[100%] h-[100%] object-cover"
          />
          <div
            className="content absolute top-[20%] w-[1140px] max-w-[80%] transform pr-[30%] box-border text-white translate-y-12 blur-[20px] opacity-0 z-[200]"
            style={animationStyles}
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
              <Link href="/ce_test">
              <Button className="mt-4 bg-green-600 hover:bg-green-700 z-[300]">
                Explore More
              </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="trips w-[100vw] h-[100vh] bg-black flex justify-center items-center sticky top-0">
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
            style={animationStyles}
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
              <Link href="/ce_test">
              <Button className="mt-4 bg-green-600 hover:bg-green-700 z-[300]">
                Explore More
              </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="gallery w-[100vw] h-[100vh] bg-gray-600 flex justify-center items-center sticky top-0">
          <div class="hide vignette absolute z-[100] w-full h-full top-0 left-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0)_65%,_rgba(0,0,0,0.7))]"></div>
          <Image
            src="/image/image-3.jpg"
            width={800}
            height={800}
            className="absolute left-0 top-0 w-[100%] h-[100%] object-cover"
          />

          <div
            className="content absolute top-[20%] w-[1140px] max-w-[80%] transform pr-[30%] box-border text-white translate-y-12 blur-[20px] opacity-0 z-[200]"
            style={animationStyles}
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

        <div className="w-[100vw] h-[100vh] bg-gray-600 flex justify-center items-center sticky top-0 overflow-hidden">
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
            style={animationStyles}
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
      {/* <div className="bg-black text-white flex justify-center items-center h-[200px] w-[100vw]">
        Footer
      </div> */}
      <footer className="bg-gray-900 text-white p-4 mt-12">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-semibold mb-2">Stay Connected</h3>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-white hover:text-green-200 transition-colors duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-instagram"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
              <a
                href="#"
                className="text-white hover:text-green-200 transition-colors duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-twitter"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
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
}
