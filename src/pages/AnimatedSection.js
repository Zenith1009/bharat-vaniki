import { useIntersectionObserver } from './useIntersectionObserver';

const AnimatedSection = ({ children, className = '' }) => {
  const [sectionRef, isIntersecting] = useIntersectionObserver({
    threshold: 0.1,
  });

  const animationStyles = isIntersecting
    ? {
        animation: "showContent 1s .1s linear 1 forwards",
      }
    : {};

  return (
    <section 
      ref={sectionRef} 
      className={`${className} w-[100vw] h-[100vh] flex justify-center items-center sticky top-0`}
    >
      <div
        className="content absolute top-[20%] w-[1140px] max-w-[80%] transform pr-[30%] box-border text-white translate-y-12 blur-[20px] opacity-0 z-[200]"
        style={animationStyles}
      >
        {children}
      </div>
    </section>
  );
};

export default AnimatedSection;