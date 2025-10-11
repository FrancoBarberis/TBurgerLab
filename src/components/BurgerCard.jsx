import React, { useState, forwardRef, useImperativeHandle } from 'react';

const BurgerCard = forwardRef(({ burger, onQuantityChange }, ref) => {
  const [quantities, setQuantities] = useState({
    simple: 0,
    doble: 0
  });



  const handleQuantityChange = (type, increment) => {
    const newQuantities = { ...quantities };
    if (increment) {
      newQuantities[type] += 1;
    } else if (newQuantities[type] > 0) {
      newQuantities[type] -= 1;
    }
    setQuantities(newQuantities);
    onQuantityChange(burger.id, type, newQuantities[type]);
  };

  const resetQuantities = () => {
    setQuantities({ simple: 0, doble: 0 });
    onQuantityChange(burger.id, 'simple', 0);
    onQuantityChange(burger.id, 'doble', 0);

  };

  // Exponer la función reset para el componente padre
  useImperativeHandle(ref, () => ({
    resetQuantities
  }));

  return (
    <div className="group relative overflow-hidden transition-all duration-700 ease-in-out flex-shrink-0 
                    w-40 hover:w-64 h-80 
                    shadow-lg hover:shadow-2xl hover:z-20 border-0 m-0">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-700 brightness-110 group-hover:brightness-75"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.5)), url(${burger.backgroundImage || 'https://via.placeholder.com/400x500/444/fff?text=Hamburguesa+' + burger.name})`
        }}
      />

      {/* Content */}
      <div className="relative z-10 p-4 h-full flex flex-col">
        {/* Title and Ingredients - Only on hover */}
        <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200 transform translate-y-4 group-hover:translate-y-0 flex-1">
          <h3 className="text-2xl font-resident text-red-400 mb-4 text-center drop-shadow-2xl uppercase">
            {burger.name}
          </h3>
          <p className="text-gray-100 text-sm text-center mb-6 leading-relaxed font-resident">
            {burger.ingredients}
          </p>
        </div>
      </div>
      
      {/* Controls - Posicionados absolutamente en el fondo */}
      <div className="absolute bottom-0 left-0 right-0 opacity-0 group-hover:opacity-80 transition-all duration-500 delay-400 transform translate-y-8 group-hover:translate-y-0 z-20">
        {/* Opción Simple */}
        <div className="bg-black bg-opacity-60 p-1 rounded-t backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <span className="text-white font-semibold text-xs font-resident w-10">Simple</span>
            <div className="flex items-center gap-1">
              <button 
                onClick={() => handleQuantityChange('simple', false)}
                className="bg-gray-700 hover:bg-gray-800 text-white w-4 h-4 rounded-full flex items-center justify-center font-bold transition-colors text-xs font-resident focus:outline-none border border-gray-600"
              >
                -
              </button>
              <span className="text-white font-semibold w-3 text-center text-xs font-resident">{quantities.simple}</span>
              <button 
                onClick={() => handleQuantityChange('simple', true)}
                className="bg-red-600 hover:bg-red-700 text-white w-4 h-4 rounded-full flex items-center justify-center font-bold transition-colors text-xs font-resident focus:outline-none border border-red-500"
              >
                +
              </button>
            </div>
            <span className="text-green-400 font-bold text-xs font-resident w-12 text-right">${burger.prices.simple}</span>
          </div>
        </div>
        
        {/* Opción Doble */}
        <div className="bg-black bg-opacity-60 p-1 rounded-b backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <span className="text-white font-semibold text-xs font-resident w-10">Doble</span>
            <div className="flex items-center gap-1">
              <button 
                onClick={() => handleQuantityChange('doble', false)}
                className="bg-gray-700 hover:bg-gray-800 text-white w-4 h-4 rounded-full flex items-center justify-center font-bold transition-colors text-xs font-resident focus:outline-none border border-gray-600"
              >
                -
              </button>
              <span className="text-white font-semibold w-3 text-center text-xs font-resident">{quantities.doble}</span>
              <button 
                onClick={() => handleQuantityChange('doble', true)}
                className="bg-red-600 hover:bg-red-700 text-white w-4 h-4 rounded-full flex items-center justify-center font-bold transition-colors text-xs font-resident focus:outline-none border border-red-500"
              >
                +
              </button>
            </div>
            <span className="text-green-400 font-bold text-xs font-resident w-12 text-right">${burger.prices.doble}</span>
          </div>
        </div>
      </div>
    </div>
  );
});

BurgerCard.displayName = 'BurgerCard';

export default BurgerCard;