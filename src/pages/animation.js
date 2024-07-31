import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

// export function upparseniche() {
//   let timeline = gsap.timeline();

//   timeline.fromTo(
//     ".bg-img",
//     {
//       top: `${+1200}px`,
//       ease: "power3.out",
//     },
//     {
//       top: `${+400}px`,
//       ease: "power3.out",
//       duration: 5,
//     }
//   );
// }

// export function sabupparaao() {
//   const parallax_el = document.querySelectorAll(".parallax");
//   let timeline = gsap.timeline();

//   parallax_el.forEach((el) => {
//     timeline.fromTo(
//         el,
//         {
//             top: `${ +el.dataset.distance}px`
//         },
//         {
//             top: `${+450}px`,
//             duration: 1,
//         }
//     );
//   });
// }

// export function sabupparaao() {
//   // const parallax_el = document.querySelectorAll(".parallax:not(.text)");
//   const allParallaxElements = document.querySelectorAll(".parallax");
//   const parallax_el = Array.from(allParallaxElements).filter(
//     (el) => !el.classList.contains("text")
//   );
//   const h1position = document.querySelector(".text h1").getBoundingClientRect().top;
//   let timeline = gsap.timeline();

//   timeline.fromTo(
//     ".bg-img",
//     {
//       top: `${+1200}px`,
//       ease: "power3.out",
//     },
//     {
//       top: `${+400}px`,
//       ease: "power3.out",
//       duration: 5,
//     }
//   );

//   timeline.fromTo(
//     parallax_el,
//     {
//       // top: `${+1000}px`
//       top: (index, target) => `${target.dataset.distance}px`,
//       ease: "power3.out",
//     },
//     {
//       top: "450px",
//       ease: "power3.out",
//       duration: 3.5,
//       stagger: 0.1,
//     },
//     "2"
//   );

//   timeline.fromTo(".text h1", {
//       y:h1position,
//     },
//     {
//         // y: window.innerHeight - document.querySelector(".text h1").getBoundingClientRect().top,
//         y: 0,
//     duration: 2,
//   },
//   "3.5"
// ).fromTo(".text h2", {
//     y: -150,
//     opacity:0,
// },{
//     y:0,
//     opacity:1,
//     duration:1.5,
// },"4").fromTo(".hide", {
//     opacity:0,
// },{
//     opacity:1,
//     duration:1.5,
// }, "4");
// }

export function smoothScroll() {
  const track = document.querySelector(".image-track");

  const handleOnDown = (e) => (track.dataset.mouseDownAt = e.clientX);

  const handleOnUp = () => {
    track.dataset.mouseDownAt = "0";
    track.dataset.prevPercentage = track.dataset.percentage;
  };

  const handleOnMove = (e) => {
    if (track.dataset.mouseDownAt === "0") return;

    const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
      maxDelta = window.innerWidth / 2;

    const percentage = (mouseDelta / maxDelta) * -100,
      nextPercentageUnconstrained =
        parseFloat(track.dataset.prevPercentage) + percentage,
      nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);

    track.dataset.percentage = nextPercentage;

    track.animate(
      {
        transform: `translate(${nextPercentage}%, -50%)`,
      },
      { duration: 1200, fill: "forwards" }
    );

    for (const image of track.getElementsByClassName("image")) {
      image.animate(
        {
          objectPosition: `${100 + nextPercentage}% center`,
        },
        { duration: 1200, fill: "forwards" }
      );
    }
  };

  /* -- Had to add extra lines for touch events -- */

  window.onmousedown = (e) => handleOnDown(e);

  window.ontouchstart = (e) => handleOnDown(e.touches[0]);

  window.onmouseup = (e) => handleOnUp(e);

  window.ontouchend = (e) => handleOnUp(e.touches[0]);

  window.onmousemove = (e) => handleOnMove(e);

  window.ontouchmove = (e) => handleOnMove(e.touches[0]);
}

export function SmoothScroll2() {
  useEffect(() => {
    const track = document.querySelector(".image-track");

    const handleOnDown = (e) => (track.dataset.mouseDownAt = e.clientX);

    const handleOnUp = () => {
      track.dataset.mouseDownAt = "0";
      track.dataset.prevPercentage = track.dataset.percentage;
    };

    const handleOnMove = (e) => {
      if (track.dataset.mouseDownAt === "0") return;

      const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
        maxDelta = window.innerWidth / 2;

      const percentage = (mouseDelta / maxDelta) * -100,
        nextPercentageUnconstrained =
          parseFloat(track.dataset.prevPercentage) + percentage,
        nextPercentage = Math.max(
          Math.min(nextPercentageUnconstrained, 0),
          -100
        );

      track.dataset.percentage = nextPercentage;

      track.animate(
        {
          transform: `translate(${nextPercentage}%, -50%)`,
        },
        { duration: 1200, fill: "forwards" }
      );

      for (const image of track.getElementsByClassName("image")) {
        image.animate(
          {
            objectPosition: `${100 + nextPercentage}% center`,
          },
          { duration: 1200, fill: "forwards" }
        );
      }
    };

    window.addEventListener("mousedown", handleOnDown);
    window.addEventListener("touchstart", (e) => handleOnDown(e.touches[0]));
    window.addEventListener("mouseup", handleOnUp);
    window.addEventListener("touchend", (e) => handleOnUp(e.touches[0]));
    window.addEventListener("mousemove", handleOnMove);
    window.addEventListener("touchmove", (e) => handleOnMove(e.touches[0]));

    // Cleanup function to remove event listeners
    return () => {
      window.removeEventListener("mousedown", handleOnDown);
      window.removeEventListener("touchstart", (e) =>
        handleOnDown(e.touches[0])
      );
      window.removeEventListener("mouseup", handleOnUp);
      window.removeEventListener("touchend", (e) => handleOnUp(e.touches[0]));
      window.removeEventListener("mousemove", handleOnMove);
      window.removeEventListener("touchmove", (e) =>
        handleOnMove(e.touches[0])
      );
    };
  }, []); // Empty dependency array means this effect runs once on mount

  return null; // This component doesn't render anything
}

export function AnimatedComponent() {
  const elementRef = useRef(null);

  const animationStyles = {
    opacity: 0,
    transform: "translateY(20px)",
    filter: "blur(5px)",
    transition: "opacity 1s, transform 1s, filter 1s",
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = "translateY(0px)";
            entry.target.style.filter = "blur(0px)";
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 } // Trigger when 10% of the element is visible
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, []);

  return (
    <div ref={elementRef} style={animationStyles}>
      <div className="content absolute top-[20%] w-[1140px] max-w-[80%] transform pr-[30%] box-border text-white translate-y-12 blur-[20px] opacity-0">
        <div class="author font-bold tracking-wider uppercase">LUNDEV</div>
        <div class="title text-7xl font-bold leading-[1.3em] uppercase">
          INDIAN FORESTS
        </div>
        <div class="topic text-7xl font-bold text-orange-600 leading-[1.3em] uppercase">
          ABOUT
        </div>
        <div class="des text-xl">
          Discover the rich history, diverse ecosystems, and unique wildlife
          that make Indian forests some of the most captivating natural wonders
          in the world.
        </div>
        <div class="buttons grid grid-cols-2 grid-rows-1 gap-5 mt-[20px] h-10 delay-300">
          <button className="border-none bg-white tracking-widest font-poppins font-medium text-xl text-black ">
            SEE MORE
          </button>
        </div>
      </div>
    </div>
  );
}
