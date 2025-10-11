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
                    w-48 hover:w-80 h-96 
                    shadow-lg hover:shadow-2xl hover:z-20 border-0 m-0">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.7)), url(${burger.backgroundImage || 'https://via.placeholder.com/400x500/444/fff?text=Hamburguesa+' + burger.name})`
        }}
      />

      {/* Content */}
      <div className="relative z-10 p-4 h-full flex flex-col">
        {/* Title and Ingredients - Only on hover */}
        <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200 transform translate-y-4 group-hover:translate-y-0">
          <h3 className="text-2xl font-resident text-red-400 mb-4 text-center drop-shadow-2xl">
            {burger.name}
          </h3>
          <p className="text-gray-100 text-sm text-center mb-6 leading-relaxed">
            {burger.ingredients}
          </p>
        </div>
        
        {/* Spacer */}
        <div className="flex-grow"></div>
        
        {/* Controls - Hidden by default, shown on hover */}
        <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 delay-400 transform translate-y-8 group-hover:translate-y-0 space-y-3">
          {/* Opción Simple */}
          <div className="bg-black bg-opacity-80 p-4 rounded-lg backdrop-blur-sm border border-gray-700">
            <div className="flex justify-between items-center mb-3">
              <span className="text-white font-semibold">Simple</span>
              <span className="text-green-400 font-bold">${burger.prices.simple}</span>
            </div>
            <div className="flex items-center justify-center gap-4">
              <button 
                onClick={() => handleQuantityChange('simple', false)}
                className="bg-red-600 hover:bg-red-700 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold transition-colors"
              >
                -
              </button>
              <span className="text-white font-semibold w-8 text-center">{quantities.simple}</span>
              <button 
                onClick={() => handleQuantityChange('simple', true)}
                className="bg-green-600 hover:bg-green-700 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold transition-colors"
              >
                +
              </button>
            </div>
          </div>
          
          {/* Opción Doble */}
          <div className="bg-black bg-opacity-80 p-4 rounded-lg backdrop-blur-sm border border-gray-700">
            <div className="flex justify-between items-center mb-3">
              <span className="text-white font-semibold">Doble</span>
              <span className="text-green-400 font-bold">${burger.prices.doble}</span>
            </div>
            <div className="flex items-center justify-center gap-4">
              <button 
                onClick={() => handleQuantityChange('doble', false)}
                className="bg-red-600 hover:bg-red-700 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold transition-colors"
              >
                -
              </button>
              <span className="text-white font-semibold w-8 text-center">{quantities.doble}</span>
              <button 
                onClick={() => handleQuantityChange('doble', true)}
                className="bg-green-600 hover:bg-green-700 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold transition-colors"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

BurgerCard.displayName = 'BurgerCard';

export default BurgerCard;