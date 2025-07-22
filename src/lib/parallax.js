import { gsap } from "gsap";

export function initParallax() {
  if (typeof window !== "undefined") {
    const parallax_el = document.querySelectorAll(".parallax");
    const background_img = document.getElementById("background-image");
    // const timeline = createTimeline();

    let xValue = 0,
      yValue = 0,
      zValue = 0,
      rotateDegree = 0;

    function updateParallax() {
      parallax_el.forEach((el) => {
        let speedx = parseFloat(el.dataset.speedx);
        let speedy = parseFloat(el.dataset.speedy);
        let speedz = parseFloat(el.dataset.speedz);
        let rotateSpeed = parseFloat(el.dataset.rotation);
        let offsetX = -xValue * speedx;
        let offsetY = yValue * speedy;
        let offsetZ = zValue * speedz;

        let isInLeft =
          parseFloat(getComputedStyle(el).left) <
          parseFloat(window.innerWidth / 2)
            ? 1
            : -1;

        zValue =
          (zValue - parseFloat(getComputedStyle(el).left)) * isInLeft * 0.35;

        el.style.transform = `translate(-50%, -50%) translateX(${offsetX}px) translateY(${offsetY}px) perspective(2300px) translateZ(${offsetZ}px) rotateY(${
          rotateDegree * rotateSpeed
        }deg)`;
      });

      // Handle background image separately
      if (background_img) {
        let speedx = parseFloat(background_img.dataset.speedx);
        let speedy = parseFloat(background_img.dataset.speedy);
        let offsetX = -xValue * speedx;
        let offsetY = yValue * speedy;

        //   background_img.style.transform = `translate(-50%, -50%) translate3d(${offsetX}px, ${offsetY}px, 0) scale(2)`;
        background_img.style.transform = `translate(-50%, -50%) translateX(${offsetX}px) translateY(${offsetY}px) scale(2)`;
      }
    }

    function handleMouseMove(e) {
      if(timeline.isActive()) return;
      xValue = e.clientX - window.innerWidth / 2;
      yValue = e.clientY - window.innerHeight / 2;
      zValue = e.clientX;
      rotateDegree = (xValue / (window.innerWidth / 2)) * 20;

      requestAnimationFrame(updateParallax);
    }

    function handleResize() {
      updateParallax();
    }

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    // Initial update
    updateParallax();

    const allParallaxElements = document.querySelectorAll(".parallax");
    const parallax_el2 = Array.from(allParallaxElements).filter(
      (el) => !el.classList.contains("text")
    );
    const h1position = document
      .querySelector(".text h1")
      .getBoundingClientRect().top;
    let timeline = gsap.timeline();

    timeline.fromTo(
      ".bg-img",
      {
        top: `${+1400}px`,
        ease: "power3.out",
      },
      {
        top: `${+400}px`,
        ease: "power3.out",
        duration: 5,
      }
    );

    timeline.fromTo(
      parallax_el2,
      {
        // top: `${+1000}px`
        top: (index, target) => `${target.dataset.distance}px`,
        ease: "power3.out",
      },
      {
        top: "450px",
        ease: "power3.out",
        duration: 3.5,
        stagger: 0.1,
      },
      "2"
    );

    timeline
      .fromTo(
        ".text h1",
        {
          y: h1position,
        },
        {
          // y: window.innerHeight - document.querySelector(".text h1").getBoundingClientRect().top,
          y: 0,
          duration: 2,
        },
        "3.5"
      )
      .fromTo(
        ".text h2",
        {
          y: -150,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1.5,
        },
        "4"
      )
      .fromTo(
        ".hide",
        {
          opacity: 0,
        },
        {
          opacity: 1,
          duration: 1.5,
        },
        "4"
      );

    // Clean up function
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }
}