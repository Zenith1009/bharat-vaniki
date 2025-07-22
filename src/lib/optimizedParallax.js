import { gsap } from "gsap";

class ParallaxManager {
  constructor() {
    this.parallaxElements = [];
    this.backgroundImage = null;
    this.isInitialized = false;
    this.animationFrame = null;
    this.intersectionObserver = null;
    this.timeline = null;
    this.loadingStates = new Map();
    
    // Mouse and scroll values
    this.mouseX = 0;
    this.mouseY = 0;
    this.scrollY = 0;
    this.zValue = 0;
    this.rotateDegree = 0;
    
    // Performance optimization
    this.isMouseMoving = false;
    this.lastMouseMoveTime = 0;
    this.throttleDelay = 16; // ~60fps
    
    // Bind methods
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.updateParallax = this.updateParallax.bind(this);
    this.handleIntersection = this.handleIntersection.bind(this);
  }

  init() {
    if (typeof window === "undefined" || this.isInitialized) return;

    try {
      this.setupElements();
      this.setupIntersectionObserver();
      this.setupEventListeners();
      this.initializeTimeline();
      this.preloadImages();
      
      this.isInitialized = true;
      console.log("Parallax initialized successfully");
    } catch (error) {
      console.error("Failed to initialize parallax:", error);
    }
  }

  setupElements() {
    // Get all parallax elements
    this.parallaxElements = Array.from(document.querySelectorAll(".parallax"));
    this.backgroundImage = document.getElementById("background-image");
    
    if (this.parallaxElements.length === 0) {
      console.warn("No parallax elements found");
    }

    // Initialize loading states
    this.parallaxElements.forEach(el => {
      if (el.tagName === 'IMG') {
        this.loadingStates.set(el, { loaded: false, error: false });
      }
    });

    if (this.backgroundImage) {
      this.loadingStates.set(this.backgroundImage, { loaded: false, error: false });
    }
  }

  setupIntersectionObserver() {
    // Create intersection observer for performance optimization
    const options = {
      root: null,
      rootMargin: '50px',
      threshold: 0.1
    };

    this.intersectionObserver = new IntersectionObserver(this.handleIntersection, options);
    
    // Observe all parallax elements
    this.parallaxElements.forEach(el => {
      this.intersectionObserver.observe(el);
    });

    if (this.backgroundImage) {
      this.intersectionObserver.observe(this.backgroundImage);
    }
  }

  handleIntersection(entries) {
    entries.forEach(entry => {
      const element = entry.target;
      
      if (entry.isIntersecting) {
        element.classList.add('parallax-active');
      } else {
        element.classList.remove('parallax-active');
      }
    });
  }

  setupEventListeners() {
    // Throttled mouse move handler
    window.addEventListener("mousemove", this.handleMouseMove, { passive: true });
    window.addEventListener("scroll", this.handleScroll, { passive: true });
    window.addEventListener("resize", this.handleResize, { passive: true });
  }

  handleMouseMove(e) {
    const now = Date.now();
    if (now - this.lastMouseMoveTime < this.throttleDelay) return;
    
    this.lastMouseMoveTime = now;
    
    // Don't update during timeline animation
    if (this.timeline && this.timeline.isActive()) return;
    
    this.mouseX = e.clientX - window.innerWidth / 2;
    this.mouseY = e.clientY - window.innerHeight / 2;
    this.zValue = e.clientX;
    this.rotateDegree = (this.mouseX / (window.innerWidth / 2)) * 20;
    
    this.isMouseMoving = true;
    this.requestParallaxUpdate();
  }

  handleScroll() {
    this.scrollY = window.scrollY;
    this.updateScrollParallax();
  }

  handleResize() {
    // Debounce resize events
    clearTimeout(this.resizeTimeout);
    this.resizeTimeout = setTimeout(() => {
      this.requestParallaxUpdate();
    }, 100);
  }

  requestParallaxUpdate() {
    if (this.animationFrame) return;
    
    this.animationFrame = requestAnimationFrame(() => {
      this.updateParallax();
      this.animationFrame = null;
    });
  }

  updateParallax() {
    if (!this.isMouseMoving) return;
    
    this.parallaxElements.forEach((el) => {
      // Only update visible elements
      if (!el.classList.contains('parallax-active')) return;
      
      // Check if image is loaded
      if (el.tagName === 'IMG' && !this.isImageLoaded(el)) return;
      
      try {
        const speedx = parseFloat(el.dataset.speedx) || 0;
        const speedy = parseFloat(el.dataset.speedy) || 0;
        const speedz = parseFloat(el.dataset.speedz) || 0;
        const rotateSpeed = parseFloat(el.dataset.rotation) || 0;
        
        const offsetX = -this.mouseX * speedx;
        const offsetY = this.mouseY * speedy;
        const offsetZ = this.zValue * speedz;
        
        const isInLeft = parseFloat(getComputedStyle(el).left) < window.innerWidth / 2 ? 1 : -1;
        const zTransform = (this.zValue - parseFloat(getComputedStyle(el).left)) * isInLeft * 0.35;
        
        const transform = `translate(-50%, -50%) translateX(${offsetX}px) translateY(${offsetY}px) perspective(2300px) translateZ(${zTransform}px) rotateY(${this.rotateDegree * rotateSpeed}deg)`;
        
        el.style.transform = transform;
      } catch (error) {
        console.warn("Error updating parallax for element:", el, error);
      }
    });

    // Handle background image separately
    if (this.backgroundImage && this.isImageLoaded(this.backgroundImage)) {
      try {
        const speedx = parseFloat(this.backgroundImage.dataset.speedx) || 0;
        const speedy = parseFloat(this.backgroundImage.dataset.speedy) || 0;
        const offsetX = -this.mouseX * speedx;
        const offsetY = this.mouseY * speedy;
        
        this.backgroundImage.style.transform = `translate(-50%, -50%) translateX(${offsetX}px) translateY(${offsetY}px) scale(2)`;
      } catch (error) {
        console.warn("Error updating background image:", error);
      }
    }
    
    this.isMouseMoving = false;
  }

  updateScrollParallax() {
    const translateElements = document.querySelectorAll(".translating");
    const textElement = document.querySelector(".text");
    const mainElement = document.querySelector("main");
    const shadowElement = document.querySelector(".shadow");
    const contentElement = document.querySelector(".content");
    const imgContainerElement = document.querySelector(".imgContainer");
    const sectionElement = document.querySelector("section");
    const opacityElements = document.querySelectorAll(".opacity");
    const borderElement = document.querySelector(".border");

    if (!mainElement || !sectionElement) return;

    const mainHeight = mainElement.offsetHeight;
    const sectionHeight = sectionElement.offsetHeight;
    const sectionRect = sectionElement.getBoundingClientRect();

    // Update translating elements
    translateElements.forEach((element) => {
      if (!element.classList.contains('parallax-active')) return;
      
      try {
        const speed = parseFloat(element.dataset.speed) || 0;
        element.style.transform = `translate(-50%, -50%) translateY(${this.scrollY * speed}px)`;
      } catch (error) {
        console.warn("Error updating scroll parallax for element:", element, error);
      }
    });

    // Update opacity elements
    opacityElements.forEach((el) => {
      try {
        el.style.opacity = Math.max(0, Math.min(1, this.scrollY / (sectionRect.top + sectionHeight)));
      } catch (error) {
        console.warn("Error updating opacity:", error);
      }
    });

    // Update other elements with error handling
    try {
      if (textElement) {
        textElement.style.opacity = Math.max(0, -this.scrollY / (mainHeight / 2) + 1);
      }
      
      if (shadowElement) {
        shadowElement.style.height = `${this.scrollY * 0.5 + 300}px`;
      }
      
      if (contentElement) {
        contentElement.style.transform = `translateY(${this.scrollY / (sectionHeight + sectionRect.top) * 50 - 50}px)`;
      }
      
      if (imgContainerElement) {
        imgContainerElement.style.transform = `translateY(${this.scrollY / (sectionHeight + sectionRect.top) * -50 + 50}px)`;
      }
      
      if (borderElement) {
        borderElement.style.width = `${Math.min(30, this.scrollY / (sectionRect.top + sectionHeight) * 30)}%`;
      }
    } catch (error) {
      console.warn("Error updating scroll effects:", error);
    }
  }

  initializeTimeline() {
    try {
      const allParallaxElements = document.querySelectorAll(".parallax");
      const parallaxEl2 = Array.from(allParallaxElements).filter(
        (el) => !el.classList.contains("text")
      );
      
      const h1Element = document.querySelector(".text h1");
      if (!h1Element) {
        console.warn("H1 element not found for timeline");
        return;
      }
      
      const h1Position = h1Element.getBoundingClientRect().top;
      this.timeline = gsap.timeline();

      // Background image animation
      this.timeline.fromTo(
        ".bg-img",
        {
          top: "1400px",
          ease: "power3.out",
        },
        {
          top: "400px",
          ease: "power3.out",
          duration: 5,
        }
      );

      // Parallax elements animation
      this.timeline.fromTo(
        parallaxEl2,
        {
          top: (index, target) => `${target.dataset.distance || 1000}px`,
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

      // Text animations
      this.timeline
        .fromTo(
          ".text h1",
          {
            y: h1Position,
          },
          {
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
    } catch (error) {
      console.error("Error initializing timeline:", error);
    }
  }

  preloadImages() {
    // Preload all parallax images
    this.parallaxElements.forEach(el => {
      if (el.tagName === 'IMG') {
        this.setupImageLoading(el);
      }
    });

    if (this.backgroundImage) {
      this.setupImageLoading(this.backgroundImage);
    }
  }

  setupImageLoading(img) {
    const loadingState = this.loadingStates.get(img);
    if (!loadingState) return;

    // Add loading class
    img.classList.add('parallax-loading');

    const handleLoad = () => {
      loadingState.loaded = true;
      img.classList.remove('parallax-loading');
      img.classList.add('parallax-loaded');
      console.log(`Image loaded: ${img.src}`);
    };

    const handleError = () => {
      loadingState.error = true;
      img.classList.remove('parallax-loading');
      img.classList.add('parallax-error');
      console.warn(`Failed to load image: ${img.src}`);
    };

    if (img.complete) {
      handleLoad();
    } else {
      img.addEventListener('load', handleLoad, { once: true });
      img.addEventListener('error', handleError, { once: true });
    }
  }

  isImageLoaded(img) {
    const loadingState = this.loadingStates.get(img);
    return loadingState ? loadingState.loaded : true;
  }

  destroy() {
    if (!this.isInitialized) return;

    try {
      // Remove event listeners
      window.removeEventListener("mousemove", this.handleMouseMove);
      window.removeEventListener("scroll", this.handleScroll);
      window.removeEventListener("resize", this.handleResize);

      // Cancel animation frame
      if (this.animationFrame) {
        cancelAnimationFrame(this.animationFrame);
        this.animationFrame = null;
      }

      // Disconnect intersection observer
      if (this.intersectionObserver) {
        this.intersectionObserver.disconnect();
        this.intersectionObserver = null;
      }

      // Kill timeline
      if (this.timeline) {
        this.timeline.kill();
        this.timeline = null;
      }

      // Clear timeouts
      if (this.resizeTimeout) {
        clearTimeout(this.resizeTimeout);
      }

      // Reset state
      this.isInitialized = false;
      this.parallaxElements = [];
      this.backgroundImage = null;
      this.loadingStates.clear();

      console.log("Parallax destroyed successfully");
    } catch (error) {
      console.error("Error destroying parallax:", error);
    }
  }
}

// Create singleton instance
const parallaxManager = new ParallaxManager();

// Export functions for backward compatibility
export function initParallax() {
  return parallaxManager.init();
}

export function destroyParallax() {
  return parallaxManager.destroy();
}

// Development helper functions
export function getParallaxStatus() {
  return {
    isInitialized: parallaxManager.isInitialized,
    elementCount: parallaxManager.parallaxElements.length,
    hasBackgroundImage: !!parallaxManager.backgroundImage,
    loadingStates: Array.from(parallaxManager.loadingStates.entries()).map(([el, state]) => ({
      element: el.tagName + (el.id ? `#${el.id}` : '') + (el.className ? `.${el.className.split(' ')[0]}` : ''),
      loaded: state.loaded,
      error: state.error
    }))
  };
}

export function logParallaxStatus() {
  const status = getParallaxStatus();
  console.group('🎯 Parallax Status');
  console.log('Initialized:', status.isInitialized);
  console.log('Elements:', status.elementCount);
  console.log('Background Image:', status.hasBackgroundImage);
  console.log('Loading States:', status.loadingStates);
  console.groupEnd();
}

export { parallaxManager };