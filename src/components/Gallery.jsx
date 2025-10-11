import React, { useRef, forwardRef, useImperativeHandle } from 'react';
import BurgerCard from './BurgerCard';
import ParallaxText from './ParallaxText';
import FadeInElement from './FadeInElement';
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
    <div className="w-screen bg-black min-h-screen flex flex-col items-center justify-start cursor-crosshair px-4 overflow-hidden relative pb-16">
      <div className="absolute inset-0 bg-gradient-to-t from-black via-gray-900 to-black opacity-80"></div>
      <div className="relative z-10 flex flex-col items-center pt-16 mb-16">
        <FadeInElement className="mb-8">
          <ParallaxText speed={0.1}>
            <h2 className="text-4xl font-resident text-red-400 uppercase drop-shadow-2xl">
              COMBOS
            </h2>
          </ParallaxText>
        </FadeInElement>
        <FadeInElement>
          <div className="flex justify-center items-end gap-1">
            {burgers.map((burger) => (
              <BurgerCard
                key={burger.id}
                burger={burger}
                ref={el => cardRefs.current[burger.id] = el}
                onQuantityChange={handleQuantityChange}
              />
            ))}
          </div>
        </FadeInElement>
      </div>
    </div>
  );
});

Gallery.displayName = 'Gallery';

export default Gallery;