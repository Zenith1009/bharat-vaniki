import Image from "next/image";
import { useParallax } from "@/hooks/useParallax";

export default function Hero() {
  const { error } = useParallax();

  // Show loading state or error if needed
  if (error) {
    console.warn('Parallax initialization failed:', error);
  }

  return (
    <main className="h-[100vh] w-[100vw] overflow-hidden relative">
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
        priority
        quality={85}
        sizes="100vw"
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
        loading="lazy"
        quality={80}
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
        loading="lazy"
        quality={80}
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
        loading="lazy"
        quality={80}
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
        loading="lazy"
        quality={80}
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
        loading="lazy"
        quality={80}
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
        loading="lazy"
        quality={80}
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
        loading="lazy"
        quality={80}
      />

      {/* Main Title - Only this moves with parallax */}
      <div
        className="parallax text absolute z-[13] top-1/2 mt-[-200px] left-1/2 -translate-x-1/2 -translate-y-1/2 text-center uppercase text-white pointer-events-auto selection:bg-green-800 translating px-4"
        data-speedx="0.07"
        data-speedy="0.1"
        data-speedz="0"
        data-rotation="0.11"
        data-distance="0"
        data-speed="0.05"
      >
        <h2 className="font-thin text-[2.5rem] sm:text-[3.5rem] md:text-[5rem] lg:text-[6.5rem] leading-[1.2] animate-fade-in-up hover:scale-105 transition-transform duration-500 mb-[-8px] sm:mb-[-12px]">Bharat</h2>
        <h1 className="font-extrabold text-[2.8rem] sm:text-[4rem] md:text-[5.5rem] lg:text-[7rem] leading-[1.4] animate-fade-in-up animation-delay-300 hover:scale-105 transition-transform duration-500 bg-gradient-to-r from-white via-green-100 to-orange-200 bg-clip-text text-transparent">वानिकी</h1>
      </div>

      {/* Creative Slogans - Fixed position, no parallax */}
      <div className="absolute z-[60] top-[45%] mt-[50px] left-1/2 -translate-x-1/2 text-center px-4 w-full max-w-4xl">
        <div className="space-y-3 sm:space-y-4 animate-fade-in-up animation-delay-600">
          <p className="text-base sm:text-lg md:text-xl font-light tracking-wide text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.7)] normal-case">
            Where Ancient Wisdom Meets Wild Beauty
          </p>
          <p className="text-xs sm:text-sm md:text-base font-light italic text-white/90 drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)] normal-case max-w-xs sm:max-w-md mx-auto leading-relaxed">
            "In every walk with nature, one receives far more than they seek"
          </p>
        </div>

        {/* Call to Action */}
        <div className="mt-6 sm:mt-8 animate-fade-in-up animation-delay-900">
          <p className="text-xs sm:text-sm md:text-base font-semibold tracking-widest text-green-300 drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)] normal-case mb-2">
            EMBARK ON YOUR JOURNEY
          </p>
          <div className="flex items-center justify-center">
            <span className="text-xs sm:text-sm font-light text-white/90 drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)] normal-case">
              Explore India's Forest Heritage
            </span>
          </div>
        </div>
      </div>

      {/* Animated Scroll Indicator - Fixed position, centered */}
      <div className="absolute bottom-16 sm:bottom-20 left-1/2 -translate-x-1/2 z-[60]">
        <div className="flex flex-col items-center text-white hover:text-green-300 transition-colors duration-300 cursor-pointer group">
          <p className="text-xs sm:text-sm font-light tracking-wider uppercase animate-pulse drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)] mb-2">
            Scroll to Explore
          </p>

          {/* Animated Down Arrow */}
          <div className="relative">
            <svg
              className="w-5 h-6 sm:w-6 sm:h-8 md:w-8 md:h-10 animate-arrow-bounce-fade group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 5v14m0 0l-6-6m6 6l6-6"
              />
            </svg>
            {/* Subtle Glow */}
            <div className="absolute inset-0 w-5 h-6 sm:w-6 sm:h-8 md:w-8 md:h-10 bg-green-400/20 rounded-full blur-lg animate-pulse opacity-40"></div>
          </div>
        </div>
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
        loading="lazy"
        quality={80}
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
        loading="lazy"
        quality={80}
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
        loading="lazy"
        quality={80}
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
        loading="lazy"
        quality={80}
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
        loading="lazy"
        quality={80}
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
        loading="lazy"
        quality={80}
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
        loading="lazy"
        quality={80}
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
        loading="lazy"
        quality={80}
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
        loading="lazy"
        quality={80}
      />

      <Image
        src="/img/sun_rays.png"
        alt="Background"
        width={1000}
        height={700}
        className="hide sun_rays absolute z-19 top-0 right-0 w-[795px] pointer-events-none"
        loading="lazy"
        quality={80}
      />
      <Image
        src="/img/black_shadow.png"
        alt="Background"
        width={1000}
        height={700}
        className="hide black_shadow absolute z-20 bottom-0 right-0 w-full pointer-events-none translate"
        data-speed="-0.25"
        loading="lazy"
        quality={80}
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
        loading="lazy"
        quality={80}
      />

    </main>
  );
}
