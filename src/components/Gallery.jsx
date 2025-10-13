import React, { useRef, forwardRef, useImperativeHandle } from "react";
import BurgerCard from "./BurgerCard";
import { burgers } from "../data/burgers";

const Gallery = forwardRef(({ onOrderChange, order, prices }, ref) => {
  const cardRefs = useRef({});

  const handleQuantityChange = (burgerId, type, quantity) => {
    onOrderChange(burgerId, type, quantity);
  };

  const resetAllQuantities = () => {
    Object.values(cardRefs.current).forEach((cardRef) => {
      if (cardRef && cardRef.resetQuantities) {
        cardRef.resetQuantities();
      }
    });
  };

  // Exponer la función reset para el componente padre
  useImperativeHandle(ref, () => ({
    resetAllQuantities,
  }));

  return (
    // GALLERY CONTAINER
    <div className="bg-[#0a1020]  w-screen lg:mt-40 h-full flex flex-col items-center justify-center px-0 overflow-hidden relative pb-4>">
      <h2 className="text-6xl lg:text-6xl 3724-font text-red-400 uppercase text-center w-full tracking-wide mb-12">
              COMBOS
        </h2>
        {/* CONTENEDOR CARDS */}
        <div className="grid grid-cols-1 sm:w-5/6 lg:w-full gap-4 justify-center items-center sm:flex sm:flex-row sm:flex-nowrap sm:gap-2 sm:justify-center sm:items-center">
          {burgers.map((burger) => {
            const quantities = {
              simple: order[burger.id]?.simple || 0,
              doble: order[burger.id]?.doble || 0,
            };
            // Mapeo de iconos por ingrediente
            const iconMap = [
              {
                regex:
                  /cheddar de licker|cheddar de nemesis|queso|cheddar|dambo/i,
                icon: "🧀",
              },
              { regex: /mayonesa de ajo negra/i, icon: "🧄" },
              { regex: /miel/i, icon: "🍯" },
              { regex: /salsa de mostaza y miel/i, icon: "🍯" },
              { regex: /huevo frito/i, icon: "🥚" },
              { regex: /bacon|panceta/i, icon: "🥓" },
              { regex: /carne|hamburguesa/i, icon: "🍔" },
              { regex: /lechuga|rúcula|rucula/i, icon: "🥬" },
              { regex: /morron asado|morrón asado/i, icon: "🌶️" },
              { regex: /tomate/i, icon: "🍅" },
              { regex: /cebolla/i, icon: "🧅" },
              { regex: /huevo/i, icon: "🥚" },
              { regex: /pan/i, icon: "🍞" },
              { regex: /salsa|mayonesa|mostaza|ketchup|barbacoa/i, icon: "🥫" },
            ];
            const ingredientes = burger.ingredients.split(",").map((i) => {
              const texto = i.trim();
              const found = iconMap.find((m) => m.regex.test(texto));
              return {
                nombre: texto,
                icono: found ? found.icon : "🍽️",
              };
            });
            // Usar precios de Firebase si existen
            const preciosActualizados =
              prices && prices[burger.name]
                ? prices[burger.name]
                : burger.prices;
            return (
              <BurgerCard
                key={burger.id}
                burger={{ ...burger, prices: preciosActualizados }}
                ingredientes={ingredientes}
                quantities={quantities}
                ref={(el) => (cardRefs.current[burger.id] = el)}
                onQuantityChange={handleQuantityChange}
                className="cursor-crosshair"
              />
            );
          })}
        </div>
      <div className="w-full flex justify-center mt-4 mb-20 relative z-20">
        <p className="text-gray-100 text-3xl  font-extralight 3724-font text-center max-w-md shadow-none cursor-default">
          Todos los combos incluyen papas
        </p>
      </div>
    </div>
  );
});

Gallery.displayName = "Gallery";

export default Gallery;
