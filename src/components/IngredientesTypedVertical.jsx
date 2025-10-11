import React, { useEffect, useRef, useState } from 'react';
import Typed from 'typed.js';

const IngredientesTypedVertical = ({ ingredientes, typeSpeed = 40, backSpeed = 40, backDelay = 1200 }) => {
  const elRef = useRef(null);
  const typedRef = useRef(null);
  const [showCursor, setShowCursor] = useState(false);

  useEffect(() => {
    if (!Array.isArray(ingredientes) || ingredientes.length === 0) {
      if (elRef.current) elRef.current.innerHTML = '';
      return;
    }
    // Usar saltos de línea para simular lista vertical
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
      contentType: 'null', // texto plano, no HTML
    };
    typedRef.current = new Typed(elRef.current, options);
    return () => {
      typedRef.current && typedRef.current.destroy();
    };
  }, [ingredientes, typeSpeed, backSpeed, backDelay]);

  // El cursor de Typed.js ya parpadea por defecto
  return (
    <div className="w-full text-gray-100 text-sm mb-6 leading-relaxed font-resident min-h-[8rem] whitespace-pre-line">
      <span ref={elRef} />
    </div>
  );
};

export default IngredientesTypedVertical;
