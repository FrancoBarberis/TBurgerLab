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
  {/* Fondo negro sólido */}
  <div className="relative z-10 flex flex-col pt-10 mb-2 w-full">
        <FadeInElement className="mb-6">
          <ParallaxText speed={0.05}>
            <h2 className="text-2xl sm:text-4xl font-resident text-red-400 uppercase drop-shadow-2xl text-center w-full tracking-wide">
              COMBOS
            </h2>
          </ParallaxText>
        </FadeInElement>
          <div className="grid grid-cols-1 w-full gap-4 justify-center items-center sm:flex sm:flex-row sm:flex-nowrap sm:gap-2 sm:justify-center sm:items-center">
          {burgers.map((burger) => {
            const quantities = {
              simple: (order[burger.id]?.simple) || 0,
              doble: (order[burger.id]?.doble) || 0
            };
            // Mapeo de iconos por ingrediente
            const iconMap = [
              { regex: /cheddar de licker|cheddar de nemesis|queso|cheddar|dambo/i, icon: '🧀' },
              { regex: /mayonesa de ajo negra/i, icon: '🧄' },
              { regex: /miel/i, icon: '🍯' },
              { regex: /salsa de mostaza y miel/i, icon: '🍯' },
              { regex: /huevo frito/i, icon: '🥚' },
              { regex: /bacon|panceta/i, icon: '🥓' },
              { regex: /carne|hamburguesa/i, icon: '🍔' },
              { regex: /lechuga|rúcula|rucula/i, icon: '🥬' },
              { regex: /morron asado|morrón asado/i, icon: '🌶️' },
              { regex: /tomate/i, icon: '🍅' },
              { regex: /cebolla/i, icon: '🧅' },
              { regex: /huevo/i, icon: '🥚' },
              { regex: /pan/i, icon: '🍞' },
              { regex: /salsa|mayonesa|mostaza|ketchup|barbacoa/i, icon: '🥫' },
            ];
            const ingredientes = burger.ingredients.split(',').map(i => {
              const texto = i.trim();
              const found = iconMap.find(m => m.regex.test(texto));
              return {
                nombre: texto,
                icono: found ? found.icon : '🍽️'
              };
            });
            return (
              <BurgerCard
                key={burger.id}
                burger={burger}
                ingredientes={ingredientes}
                quantities={quantities}
                ref={el => cardRefs.current[burger.id] = el}
                onQuantityChange={handleQuantityChange}
                className="cursor-crosshair"
              />
            );
          })}
        </div>
      </div>
      <div className="w-full flex justify-center mt-4">
  <p className="text-gray-300 text-xs font-resident text-center bg-black bg-opacity-60 rounded px-4 py-2 max-w-md">Todos los combos incluyen papas</p>
      </div>
    </div>
  );
});

Gallery.displayName = 'Gallery';

export default Gallery;