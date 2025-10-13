import React, { useEffect, useRef, useState } from 'react';
import Typed from 'typed.js';

const IngredientesTypedVertical = ({ ingredientes, typeSpeed = 40, backSpeed = 40, backDelay = 1200 }) => {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;

  if (isMobile) {
    // Mobile: lista simple
    return (
      <ul className="w-full text-gray-100 text-sm mb-6 leading-relaxed font-resident min-h-[8rem] list-none pl-0">
        {Array.isArray(ingredientes) && ingredientes.map((ing, idx) => (
          <li key={idx}>{ing}</li>
        ))}
      </ul>
    );
  }

  // Desktop: Typed.js
  const elRef = useRef(null);
  const typedRef = useRef(null);
  useEffect(() => {
    if (!Array.isArray(ingredientes) || ingredientes.length === 0) {
      if (elRef.current) elRef.current.innerHTML = '';
      return;
    }
    const lista = [ingredientes.join('\n')];
    if (elRef.current) elRef.current.innerHTML = '';
    const options = {
      strings: lista,
      typeSpeed,
      backSpeed: 40,
      backDelay: 3000,
      startDelay: 300,
      showCursor: true,
      smartBackspace: false,
      loop: true,
      fadeOut: false,
      contentType: 'null',
    };
    typedRef.current = new Typed(elRef.current, options);
    return () => {
      typedRef.current && typedRef.current.destroy();
    };
  }, [ingredientes, typeSpeed, backSpeed, backDelay]);
  return (
    <div className="w-full text-gray-100 text-sm mb-6 leading-relaxed font-resident min-h-[8rem] whitespace-pre-line">
      <span ref={elRef} />
    </div>
  );
};

export default IngredientesTypedVertical;
