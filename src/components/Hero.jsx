import React from 'react';
import ParallaxText from './ParallaxText';

const Hero = () => {
  const videoRef = React.useRef(null);

  React.useEffect(() => {
    if (videoRef.current) {
      // Asegurar que el video se reproduce correctamente
      videoRef.current.load();
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.log("Error reproduciendo video:", error);
        });
      }
    }
  }, []);

  return (
    <div className="w-screen h-dvh flex items-center justify-end pr-16 pointer-events-none relative overflow-hidden">
      {/* Video de fondo */}
      <video 
        ref={videoRef}
        autoPlay 
        muted 
        loop 
        playsInline
        preload="metadata"
        className="absolute w-full h-full object-cover z-0"
        style={{ 
          top: '0', 
          left: '0',
          width: '100vw',
          height: '100dvh',
          minWidth: '100vw',
          minHeight: '100dvh',
          objectFit: 'cover'
        }}
      >
        <source src="/vids/LeonVSChris.mp4" type="video/mp4" />
      </video>
      
      {/* Overlay oscuro para mejorar legibilidad */}
      <div className="absolute inset-0 bg-black bg-opacity-40 z-5"></div>
      
      <div className="text-right text-white drop-shadow-2xl transform -translate-y-16 relative z-10">
        <ParallaxText speed={0.6} fadeOut={true} className="block">
          <h1 className="text-6xl font-resident text-red-400 mb-4 leading-tight uppercase drop-shadow-2xl">
            Los sabores se<br/>descontrolaron
          </h1>
        </ParallaxText>
        <ParallaxText speed={0.5} fadeOut={true} className="block">
          <p className="text-2xl font-resident text-gray-200 opacity-90 drop-shadow-xl">
            ahora solo queda sobrevivir al menú
          </p>
        </ParallaxText>
      </div>
    </div>
  );
};

export default Hero;