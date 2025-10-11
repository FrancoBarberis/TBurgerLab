import React, { useEffect, useRef } from 'react';

const ParallaxText = ({ children, speed = 0.2, className = "", fadeOut = false }) => {
  const textRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!textRef.current) return;
      
      const scrolled = window.pageYOffset;
      const windowHeight = window.innerHeight;
      const rate = scrolled * -speed;
      
      // Calcular opacity basado en el scroll
      let opacity = 1;
      if (fadeOut) {
        // Los textos del hero se desvanecen al hacer scroll hacia abajo
        const fadeStart = windowHeight * 0.3; // Comienza a desvanecer al 30% del scroll
        const fadeEnd = windowHeight * 0.8; // Completamente invisible al 80%
        
        if (scrolled > fadeStart) {
          const fadeProgress = (scrolled - fadeStart) / (fadeEnd - fadeStart);
          opacity = Math.max(0, 1 - fadeProgress);
        }
      }
      
      textRef.current.style.transform = `translateY(${rate}px)`;
      textRef.current.style.opacity = opacity;
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [speed, fadeOut]);

  return (
    <div ref={textRef} className={`parallax-text ${className}`}>
      {children}
    </div>
  );
};

export default ParallaxText;