import React, { useRef, forwardRef, useImperativeHandle } from 'react';
import BurgerCard from './BurgerCard';
import ParallaxText from './ParallaxText';
import FadeInElement from './FadeInElement';
import { burgers } from '../data/burgers';

const Gallery = forwardRef(({ onOrderChange, order }, ref) => {
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

  // Recibo el estado global 'order' como prop
  // ...existing code...
  return (
  <div className="w-screen bg-black min-h-dvh flex flex-col items-center justify-center px-0 overflow-hidden relative pb-4">
      <div className="absolute inset-0 bg-gradient-to-t from-black via-gray-900 to-black opacity-80"></div>
  <div className="relative z-10 flex flex-col pt-20 mb-4 w-full">
        <FadeInElement className="mb-12">
          <ParallaxText speed={0.05}>
            <h2 className="text-4xl font-resident text-red-400 uppercase drop-shadow-2xl text-center w-full">
              COMBOS
            </h2>
          </ParallaxText>
        </FadeInElement>
          <div className="grid grid-cols-1 w-full gap-0 sm:flex sm:flex-row sm:flex-nowrap sm:gap-2 sm:justify-center">
          {burgers.map((burger) => {
            const quantities = {
              simple: (order[burger.id]?.simple) || 0,
              doble: (order[burger.id]?.doble) || 0
            };
            return (
              <BurgerCard
                key={burger.id}
                burger={burger}
                quantities={quantities}
                ref={el => cardRefs.current[burger.id] = el}
                onQuantityChange={handleQuantityChange}
                className="cursor-crosshair"
              />
            );
          })}
        </div>
      </div>
    </div>
  );
});

Gallery.displayName = 'Gallery';

export default Gallery;