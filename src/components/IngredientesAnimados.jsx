import React, { useEffect, useState } from 'react';

const IngredientesAnimados = ({ ingredientes, delay = 600, resetDelay = 1200 }) => {
  const [visibleItems, setVisibleItems] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let timer;
    if (index < ingredientes.length) {
      timer = setTimeout(() => {
        setVisibleItems(prev => [...prev, ingredientes[index]]);
        setIndex(prev => prev + 1);
      }, delay);
    } else {
      // Espera y reinicia la animación
      timer = setTimeout(() => {
        setVisibleItems([]);
        setIndex(0);
      }, resetDelay);
    }
    return () => clearTimeout(timer);
  }, [index, ingredientes, delay, resetDelay]);

  return (
    <ul className="flex flex-col items-center justify-center gap-2 w-full text-gray-100 text-sm mb-6 leading-relaxed font-resident min-h-[8rem]">
      {ingredientes.map((item, i) => (
        <li key={i} className={visibleItems.includes(item) ? "animate-fadeIn" : "opacity-0"}>{item}</li>
      ))}
    </ul>
  );
};

export default IngredientesAnimados;
