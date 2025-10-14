import React, { useState, useEffect, useRef } from 'react';

const LazyImage = ({ src, className, placeholder, style, onLoad }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isInView && src) {
      const img = new Image();
      img.onload = () => {
        setIsLoaded(true);
        if (onLoad) onLoad();
      };
      img.src = src;
    }
  }, [isInView, src, onLoad]);

  return (
    <div 
      ref={imgRef} 
      className={className} 
      style={{
        ...style,
        backgroundImage: isLoaded 
          ? `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.5)), url(${src})`
          : placeholder 
            ? `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.7)), url(${placeholder})`
            : 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.8))',
        transition: 'background-image 0.3s ease-in-out'
      }}
    >
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-pulse text-gray-400">
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
};

export default LazyImage;