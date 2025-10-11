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
    <div className="flex-1 flex items-end justify-center w-full m-0 p-0 mb-8 cursor-crosshair overflow-visible">
      <div className="flex justify-center items-stretch px-4 max-w-[95vw] overflow-hidden">
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