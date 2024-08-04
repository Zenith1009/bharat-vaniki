import Image from "next/image";
import { useEffect } from "react";
import { initParallax } from "./parallax";
import { parallaxScroll } from "./parallaxScroll";
import Navbar from "./navbar";

export default function Hero() {
  useEffect(() => {
    initParallax();
    parallaxScroll();
  }, []);

  return (
    <main className="h-[100vh] w-[100vw] overflow-hidden relative">
      <Navbar />
      <div className="hide vignette absolute z-[100] w-full h-full top-0 left-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0)_65%,_rgba(0,0,0,0.7))]"></div>

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
        <h2 className="font-thin text-[6.5rem] leading-[0.88]">forest</h2>
        <h1 className="font-extrabold text-[8rem] leading-[0.88]">galaxy</h1>
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
  );
}
