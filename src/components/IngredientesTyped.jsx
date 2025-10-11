import React, { useEffect, useRef } from 'react';
import Typed from 'typed.js';

const IngredientesTyped = ({ ingredientes }) => {
  const typedRef = useRef(null);
  const elRef = useRef(null);

  useEffect(() => {
    if (!ingredientes || ingredientes.length === 0) return;
    const options = {
      strings: ingredientes,
      typeSpeed: 40,
      backSpeed: 0,
      backDelay: 500,
      startDelay: 300,
      showCursor: false,
      smartBackspace: false,
      loop: false,
      fadeOut: false,
      onComplete: () => {
        // Opcional: puedes hacer algo cuando termine
      }
    };
    typedRef.current = new Typed(elRef.current, options);
    return () => {
      typedRef.current && typedRef.current.destroy();
    };
  }, [ingredientes]);

  return (
    <ul className="flex flex-col items-center justify-center gap-2 w-full text-gray-100 text-sm mb-6 leading-relaxed font-resident">
      <li><span ref={elRef} /></li>
    </ul>
  );
};

export default IngredientesTyped;
