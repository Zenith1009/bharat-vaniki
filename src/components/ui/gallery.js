import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

const Carousel = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);
  const timeoutRef = useRef(null);

  const showSlider = (type) => {
    setCurrentIndex((prevIndex) => {
      if (type === 'next') {
        return (prevIndex + 1) % items.length;
      } else {
        return (prevIndex - 1 + items.length) % items.length;
      }
    });
  };

  useEffect(() => {
    const runNextAuto = () => {
      timeoutRef.current = setTimeout(() => {
        showSlider('next');
      }, 7000);
    };

    runNextAuto();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [currentIndex]);

  return (
    <div className={styles.carousel} ref={carouselRef}>
      <div className={styles.list}>
        {items.map((item, index) => (
          <div key={index} className={`${styles.item} ${index === currentIndex ? styles.active : ''}`}>
            <Image src={item.image} alt={item.title} layout="fill" objectFit="cover" />
            <div className={styles.content}>
              <div className={styles.author}>{item.author}</div>
              <div className={styles.title}>{item.title}</div>
              <div className={styles.topic}>{item.topic}</div>
              <div className={styles.des}>{item.description}</div>
              <div className={styles.buttons}>
                <button>SEE MORE</button>
                <button>SUBSCRIBE</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.thumbnail}>
        {items.map((item, index) => (
          <div key={index} className={styles.item} onClick={() => setCurrentIndex(index)}>
            <Image src={item.image} alt={item.title} width={150} height={220} objectFit="cover" />
            <div className={styles.content}>
              <div className={styles.title}>{item.title}</div>
              <div className={styles.description}>{item.description}</div>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.arrows}>
        <button onClick={() => showSlider('prev')}>{'<'}</button>
        <button onClick={() => showSlider('next')}>{'>'}</button>
      </div>

      <div className={styles.time} />
    </div>
  );
};

export default Carousel;