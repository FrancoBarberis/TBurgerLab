import React, { useState, forwardRef, useImperativeHandle } from 'react';

const BurgerCard = forwardRef(({ burger, onQuantityChange, quantities }, ref) => {
  // Recibo quantities como prop
  // El control visual usa quantities directamente
  const handleQuantityChange = (type, increment) => {
    let newQuantity = quantities[type];
    if (increment) {
      newQuantity += 1;
    } else if (newQuantity > 0) {
      newQuantity -= 1;
    }
    onQuantityChange(burger.id, type, newQuantity);
  };

  // Exponer la función reset para el componente padre
  useImperativeHandle(ref, () => ({
    resetQuantities: () => {
      onQuantityChange(burger.id, 'simple', 0);
      onQuantityChange(burger.id, 'doble', 0);
    }
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
        <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200 transform translate-y-4 group-hover:translate-y-0 flex-1 flex items-start justify-center">
          <div className="w-72 text-center">
            <h3 className="text-2xl font-resident text-red-400 mb-4 drop-shadow-2xl uppercase">
              {burger.name}
            </h3>
            <p className="text-gray-100 text-sm mb-6 leading-relaxed font-resident">
              {burger.ingredients}
            </p>
          </div>
        </div>
      </div>
      
      {/* Controls - Posicionados absolutamente en el fondo */}
      <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-90 transition-all duration-500 delay-400 transform translate-y-4 group-hover:translate-y-0 z-20">
  <div className="bg-black bg-opacity-75 rounded backdrop-blur-sm p-3">
          {/* Opción Simple */}
          <div className="grid grid-cols-3 items-center gap-2 mb-2">
            <span className="text-white font-semibold text-xs font-resident text-left">Simple</span>
            <div className="flex items-center justify-center gap-1">
              <button 
                onClick={() => handleQuantityChange('simple', false)}
                className="bg-gray-700 hover:bg-gray-800 text-white w-6 h-6 rounded flex items-center justify-center font-bold transition-colors text-xs font-resident focus:outline-none"
              >
                -
              </button>
              <span className="text-white font-semibold w-6 text-center text-xs font-resident">{quantities.simple}</span>
              <button 
                onClick={() => handleQuantityChange('simple', true)}
                className="bg-red-600 hover:bg-red-700 text-white w-6 h-6 rounded flex items-center justify-center font-bold transition-colors text-xs font-resident focus:outline-none"
              >
                +
              </button>
            </div>
            <span className="text-green-400 font-bold text-xs font-resident text-right">${burger.prices.simple}</span>
          </div>
          
          {/* Opción Doble */}
          <div className="grid grid-cols-3 items-center gap-2">
            <span className="text-white font-semibold text-xs font-resident text-left">Doble</span>
            <div className="flex items-center justify-center gap-1">
              <button 
                onClick={() => handleQuantityChange('doble', false)}
                className="bg-gray-700 hover:bg-gray-800 text-white w-6 h-6 rounded flex items-center justify-center font-bold transition-colors text-xs font-resident focus:outline-none"
              >
                -
              </button>
              <span className="text-white font-semibold w-6 text-center text-xs font-resident">{quantities.doble}</span>
              <button 
                onClick={() => handleQuantityChange('doble', true)}
                className="bg-red-600 hover:bg-red-700 text-white w-6 h-6 rounded flex items-center justify-center font-bold transition-colors text-xs font-resident focus:outline-none"
              >
                +
              </button>
            </div>
            <span className="text-green-400 font-bold text-xs font-resident text-right">${burger.prices.doble}</span>
          </div>
        </div>
      </div>
    </div>
  );
});

BurgerCard.displayName = 'BurgerCard';

export default BurgerCard;