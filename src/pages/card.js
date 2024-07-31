import {React, useEffect} from "react";
import Image from "next/image";
import { smoothScroll } from "./animation";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AnimatedComponent } from "./animation";

const animationStyles = {
    '@keyframes showContent': {
      to: {
        transform: 'translateY(0px)',
        filter: 'blur(0px)',
        opacity: 1,
      },
    },
    animation: 'showContent 1s .1s linear 1 forwards',
  };

const card = () => {
    
    // useEffect(() => {
    //     smoothScroll();
    //   }, []);

  return (
    <div className="m-0 p-0 box-border">
      <div className="bg-blue-900 text-white flex justify-center items-center h-[200px] w-[100vw]">
        Header
      </div>
      <div>
        <div className="w-[100vw] h-[100vh] bg-gray-400 flex justify-center items-center sticky top-0">

          <div class="hide vignette absolute z-[100] w-full h-full top-0 left-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0)_65%,_rgba(0,0,0,0.7))]"></div> 
          <Image
            src="/image/image-1.jpg"
            width={800}
            height={800}
            className="absolute left-0 top-0 w-[100%] h-[100%] object-cover"
          />
          {/* <div className="content absolute top-[20%] w-[1140px] max-w-[80%] transform pr-[30%] box-border text-white translate-y-12 left-1/2 -translate-x-1/2"> */}
          {/* <div className="content absolute top-[20%] w-[1140px] max-w-[80%] transform pr-[30%] box-border text-white translate-y-12 blur-[20px] opacity-0">
                    <div class="author font-bold tracking-wider uppercase">LUNDEV</div>
                    <div class="title text-7xl font-bold leading-[1.3em] uppercase">INDIAN FORESTS</div>
                    <div class="topic text-7xl font-bold text-orange-600 leading-[1.3em] uppercase">ABOUT</div>
                    <div class="des text-xl">
                    Discover the rich history, diverse ecosystems, and unique wildlife that make Indian forests some of the most captivating natural wonders in the world.
                    </div>
                    <div class="buttons grid grid-cols-2 grid-rows-1 gap-5 mt-[20px] h-10 delay-300">
                        <button className="border-none bg-white tracking-widest font-poppins font-medium text-xl text-black ">SEE MORE</button>
                    </div>
                </div> */}
          <AnimatedComponent />
        </div>
        <div className="w-[100vw] h-[100vh] bg-gray-500 flex justify-center items-center sticky top-0">
            {/* https://www.pexels.com/video/a-zigzag-road-across-a-forest-2878084/ video to add for plan your trip */}
          Card 2
        </div>
        <div className="w-[100vw] h-[100vh] bg-black flex justify-center items-center sticky top-0 overflow-hidden">
         {/* <div className="image-track flex gap-[4vmin] absolute left-1/2 top-1/2 transform -translate-y-1/2" data-mouse-down-at="0" data-prev-percentage="0">
            <Image src="/image/image-2.jpg" width={400} height={500} className="w-[40vmin] h-[56vmin] object-cover object-center" draggable="false"/>
            <Image src="/image/image-2.jpg" width={400} height={500} className="w-[40vmin] h-[56vmin] object-cover object-center" draggable="false"/>
            <Image src="/image/image-2.jpg" width={400} height={500} className="w-[40vmin] h-[56vmin] object-cover object-center" draggable="false"/>
            <Image src="/image/image-2.jpg" width={400} height={500} className="w-[40vmin] h-[56vmin] object-cover object-center" draggable="false"/>
            <Image src="/image/image-2.jpg" width={400} height={500} className="w-[40vmin] h-[56vmin] object-cover object-center" draggable="false"/>
            <Image src="/image/image-2.jpg" width={400} height={500} className="w-[40vmin] h-[56vmin] object-cover object-center" draggable="false"/>
            <Image src="/image/image-2.jpg" width={400} height={500} className="w-[40vmin] h-[56vmin] object-cover object-center" draggable="false"/>
            <Image src="/image/image-2.jpg" width={400} height={500} className="w-[40vmin] h-[56vmin] object-cover object-center" draggable="false"/>
         </div> */}
        </div>
        <div className="w-[100vw] h-[100vh] bg-gray-700 flex justify-center items-center sticky top-0">
          Card 4
        </div>
      </div>
      <div className="bg-blue-900 text-white flex justify-center items-center h-[200px] w-[100vw]">
        Footer
      </div>
    </div>
  );
};

export default card;
