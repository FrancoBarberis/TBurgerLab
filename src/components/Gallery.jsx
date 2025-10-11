import React, { useRef, forwardRef, useImperativeHandle } from 'react';
import BurgerCard from './BurgerCard';
import { burgers } from '../data/burgers';

const Gallery = forwardRef(({ onOrderChange }, ref) => {
  const cardRefs = useRef({});

  const handleQuantityChange = (burgerId, type, quantity) => {
    onOrderChange(burgerId, type, quantity);
  };

  const resetAllQuantities = () => {
    Object.values(cardRefs.current).forEach(cardRef => {
      if (cardRef && cardRef.resetQuantities) {
        cardRef.resetQuantities();
      }
    });
  };

  // Exponer la función reset para el componente padre
  useImperativeHandle(ref, () => ({
    resetAllQuantities
  }));

  return (
    <div className="w-screen bg-black h-screen flex flex-col items-center justify-center cursor-crosshair px-4 overflow-hidden">
      <h2 className="text-4xl font-resident text-red-400 mb-8 uppercase drop-shadow-2xl">
        COMBOS
      </h2>
      <div className="flex justify-center items-end">
        {burgers.map((burger) => (
          <BurgerCard
            key={burger.id}
            burger={burger}
            ref={el => cardRefs.current[burger.id] = el}
            onQuantityChange={handleQuantityChange}
          />
        ))}
      </div>
    </div>
  );
});

Gallery.displayName = 'Gallery';

export default Gallery;