import React, { useState, forwardRef, useImperativeHandle } from 'react';

const BurgerCard = forwardRef(({ burger, onQuantityChange, quantities, className = "" }, ref) => {
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
  <div className={`group relative flex-shrink-0 w-full h-[calc(100vh-6rem)] sm:w-40 sm:h-80 sm:hover:w-56 sm:hover:h-80 shadow-lg sm:hover:shadow-2xl sm:hover:z-20 border-0 m-0 transition-all duration-700 ease-in-out ${className}`}>
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-700 brightness-125 group-hover:brightness-100 h-full w-full"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.5)), url(${burger.backgroundImage || 'https://via.placeholder.com/400x500/444/fff?text=Hamburguesa+' + burger.name})`,
          objectFit: 'cover',
          minHeight: '100%',
          maxHeight: 'none',
          overflowX: 'auto'
        }}
      />

      {/* Content */}
      <div className="relative z-10 p-4 h-full flex flex-col">
        {/* Título e ingredientes siempre visibles en móvil, solo en hover en desktop */}
      <div className="w-full flex flex-col items-center justify-center text-center block sm:hidden h-full">
          <h3 className="text-2xl font-resident text-red-400 mb-4 drop-shadow-2xl uppercase">
            {burger.name}
          </h3>
          <div className="flex-1 flex items-center justify-center w-full">
            <p className="text-gray-100 text-sm mb-6 leading-relaxed font-resident">
              {burger.ingredients}
            </p>
          </div>
        </div>
    <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200 sm:transform sm:translate-x-8 sm:group-hover:translate-x-0 flex-1 flex items-center justify-center sm:block hidden">
          <div className="w-72 text-center mx-auto">
            <h3 className="text-2xl font-resident text-red-400 mb-4 drop-shadow-2xl uppercase">
              {burger.name}
            </h3>
            <p className="text-gray-100 text-sm mb-6 leading-relaxed font-resident">
              {burger.ingredients}
            </p>
          </div>
        </div>
      </div>
    {/* Controles: solo en hover en desktop, abajo en ambas vistas */}
    <div className="absolute left-2 right-2 z-20 opacity-100 sm:opacity-0 sm:group-hover:opacity-90 transition-all duration-500 delay-400 transform translate-y-0 sm:translate-y-4 sm:group-hover:translate-y-0 bottom-2">
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