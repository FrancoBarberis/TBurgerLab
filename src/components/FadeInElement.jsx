import React, { useEffect, useRef } from 'react';

const FadeInElement = ({ children, className = "" }) => {
  const elementRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!elementRef.current) return;
      
      const scrolled = window.pageYOffset;
      const windowHeight = window.innerHeight;
      
      // Los elementos de la galería aparecen gradualmente - sincronizado con parallax
      const fadeStart = windowHeight * 0.25; // Comienza cuando el parallax está activo
      const fadeEnd = windowHeight * 0.55; // Completamente visible cuando está bien posicionado
      
      let opacity = 0;
      if (scrolled > fadeStart) {
        const fadeProgress = (scrolled - fadeStart) / (fadeEnd - fadeStart);
        opacity = Math.min(1, fadeProgress);
      }
      
      elementRef.current.style.opacity = opacity;
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Ejecutar una vez al montar
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div ref={elementRef} className={`fade-in-element ${className}`} style={{ opacity: 0 }}>
      {children}
    </div>
  );
};

export default FadeInElement;