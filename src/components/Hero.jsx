import React from 'react';

const Hero = () => {
  return (
    <div className="w-full h-[calc(100vh-80px)] flex items-center justify-end pr-16 pointer-events-none">
      <div className="text-right text-white drop-shadow-2xl transform -translate-y-16">
        <h1 className="text-6xl font-resident text-red-400 mb-4 leading-tight uppercase">
          Los sabores se<br/>descontrolaron
        </h1>
        <p className="text-2xl font-resident text-gray-200 opacity-90">
          ahora solo queda sobrevivir al menú
        </p>
      </div>
    </div>
  );
};

export default Hero;