import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselRef = useRef(null);
  const sliderRef = useRef(null);
  const thumbnailBorderRef = useRef(null);
  const timeRef = useRef(null);
  const nextRef = useRef(null);
  const prevRef = useRef(null);

  const images = ['/image/img1.jpg', '/image/img2.jpg', '/image/img3.jpg', '/image/img4.jpg'];

  useEffect(() => {
    const carouselDom = carouselRef.current;
    const SliderDom = sliderRef.current;
    const thumbnailBorderDom = thumbnailBorderRef.current;
    const nextDom = nextRef.current;
    const prevDom = prevRef.current;

    let thumbnailItemsDom = thumbnailBorderDom.querySelectorAll('.item');
    thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);

    const timeRunning = 3000;
    const timeAutoNext = 7000;

    let runTimeOut;
    let runNextAuto = setTimeout(() => {
      nextDom.click();
    }, timeAutoNext);

    const showSlider = (type) => {
      let SliderItemsDom = SliderDom.querySelectorAll('.item');
      thumbnailItemsDom = thumbnailBorderDom.querySelectorAll('.item');
      
      if(type === 'next'){
        setCurrentSlide((prev) => (prev + 1) % images.length);
        SliderDom.appendChild(SliderItemsDom[0]);
        thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
        carouselDom.classList.add('next');
      } else {
        setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
        SliderDom.prepend(SliderItemsDom[SliderItemsDom.length - 1]);
        thumbnailBorderDom.prepend(thumbnailItemsDom[thumbnailItemsDom.length - 1]);
        carouselDom.classList.add('prev');
      }

      clearTimeout(runTimeOut);
      runTimeOut = setTimeout(() => {
        carouselDom.classList.remove('next');
        carouselDom.classList.remove('prev');
      }, timeRunning);

      clearTimeout(runNextAuto);
      runNextAuto = setTimeout(() => {
        nextDom.click();
      }, timeAutoNext);
    };

    nextDom.onclick = () => showSlider('next');
    prevDom.onclick = () => showSlider('prev');

    return () => {
      clearTimeout(runTimeOut);
      clearTimeout(runNextAuto);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white font-['Poppins'] text-xs">
      <header className="w-[1140px] max-w-[80%] mx-auto h-[50px] flex items-center relative z-[100]">
        <nav>
          <a href="" className="text-white mr-[40px]">Home</a>
          <a href="" className="text-white mr-[40px]">Contacts</a>
          <a href="" className="text-white mr-[40px]">Info</a>
        </nav>
      </header>

      <div className="carousel h-screen -mt-[50px] w-screen overflow-hidden relative" ref={carouselRef}>
        <div className="list relative w-full h-full" ref={sliderRef}>
          <div className="item absolute inset-0 w-full h-full z-[1]">
            <Image src={images[currentSlide]} alt={`Slide ${currentSlide + 1}`} layout="fill" objectFit="cover" />
            <div className="content absolute top-[20%] w-[1140px] max-w-[80%] left-1/2 transform -translate-x-1/2 pr-[30%] box-border text-white shadow-[0_5px_10px_#0004]">
              <div className="author font-bold tracking-[10px] animate-showContent">LUNDEV</div>
              <div className="title text-[5em] font-bold leading-[1.3em] animate-showContent animation-delay-[1.2s]">DESIGN SLIDER</div>
              <div className="topic text-[5em] font-bold leading-[1.3em] text-[#f1683a] animate-showContent animation-delay-[1.4s]">ANIMAL</div>
              <div className="des animate-showContent animation-delay-[1.6s]">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut sequi, rem magnam nesciunt minima placeat, itaque eum neque officiis unde, eaque optio ratione aliquid assumenda facere ab et quasi ducimus aut doloribus non numquam. Explicabo, laboriosam nisi reprehenderit tempora at laborum natus unde. Ut, exercitationem eum aperiam illo illum laudantium?
              </div>
              <div className="buttons grid grid-cols-2 gap-[5px] mt-[20px] animate-showContent animation-delay-[1.8s]">
                <button className="border-none bg-white text-black tracking-[3px] font-['Poppins'] font-medium">SEE MORE</button>
                <button className="bg-transparent border border-white text-white tracking-[3px] font-['Poppins'] font-medium">SUBSCRIBE</button>
              </div>
            </div>
          </div>
        </div>

        <div className="thumbnail absolute bottom-[50px] left-1/2 w-max z-[100] flex gap-[20px]" ref={thumbnailBorderRef}>
          {images.map((img, index) => (
            <div key={index} className="item w-[150px] h-[220px] flex-shrink-0 relative">
              <Image src={img} alt={`Thumbnail ${index + 1}`} layout="fill" objectFit="cover" className="rounded-[20px]" />
              <div className="content absolute bottom-[10px] left-[10px] right-[10px] text-white">
                <div className="title font-medium">Name Slider</div>
                <div className="description font-light">Description</div>
              </div>
            </div>
          ))}
        </div>

        <div className="arrows absolute top-[80%] right-[52%] z-[100] w-[300px] max-w-[30%] flex gap-[10px] items-center">
          <button id="prev" ref={prevRef} className="w-[40px] h-[40px] rounded-full bg-[#eee4] border-none text-white font-mono font-bold transition-[0.5s] hover:bg-white hover:text-black">&lt;</button>
          <button id="next" ref={nextRef} className="w-[40px] h-[40px] rounded-full bg-[#eee4] border-none text-white font-mono font-bold transition-[0.5s] hover:bg-white hover:text-black">&gt;</button>
        </div>

        <div className="time absolute bottom-0 left-0 w-full h-[3px] bg-[#f1683a]" ref={timeRef}></div>
      </div>
    </div>
  );
};

export default Carousel;