import React, { useEffect, useRef } from 'react';

const ParallaxSection = ({ children, speed = 0.5, className = "", isGallery = false }) => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const scrolled = window.pageYOffset;
      const windowHeight = window.innerHeight;
      
      if (isGallery) {
        // Para la galería, hacer que suba desde abajo más dramáticamente
        const rate = Math.max(-windowHeight * 0.5, (windowHeight - scrolled * 1.5) * speed);
        sectionRef.current.style.transform = `translateY(${rate}px)`;
      } else {
        // Para hero, parallax normal
        const rate = scrolled * -speed;
        sectionRef.current.style.transform = `translateY(${rate}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [speed, isGallery]);

  return (
    <div className={`parallax-container ${className}`}>
      <div ref={sectionRef} className="parallax-element">
        {children}
      </div>
    </div>
  );
};

export default ParallaxSection;