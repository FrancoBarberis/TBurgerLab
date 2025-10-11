import React from 'react';
import ParallaxText from './ParallaxText';

const Hero = () => {
  return (
    <div className="w-full h-screen flex items-center justify-end pr-16 pointer-events-none relative bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700">
      <div className="text-right text-white drop-shadow-2xl transform -translate-y-16 relative z-10">
        <ParallaxText speed={0.3} fadeOut={true} className="block">
          <h1 className="text-6xl font-resident text-red-400 mb-4 leading-tight uppercase">
            Los sabores se<br/>descontrolaron
          </h1>
        </ParallaxText>
        <ParallaxText speed={0.25} fadeOut={true} className="block">
          <p className="text-2xl font-resident text-gray-200 opacity-90">
            ahora solo queda sobrevivir al menú
          </p>
        </ParallaxText>
      </div>
    </div>
  );
};

export default Hero;