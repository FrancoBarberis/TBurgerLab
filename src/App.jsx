import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Gallery from './components/Gallery';
import { obtenerPrecios } from './services/firebase';
import { burgers } from './data/burgers';

function App() {
  const [order, setOrder] = useState({});
  const [prices, setPrices] = useState({});
  const galleryRef = useRef();

  useEffect(() => {
    const loadPrices = async () => {
      try {
        const firebasePrices = await obtenerPrecios();
        if (firebasePrices) {
          setPrices(firebasePrices);
        }
      } catch (error) {
        console.error('Error al cargar precios:', error);
      }
    };
    
    loadPrices();
  }, []);

  const handleOrderChange = (burgerId, type, quantity) => {
    setOrder(prev => ({
      ...prev,
      [burgerId]: {
        ...prev[burgerId],
        [type]: quantity
      }
    }));
  };

  const handleDiscardOrder = () => {
    const hasProducts = Object.values(order).some(burgerOrder =>
      Object.values(burgerOrder || {}).some(qty => qty > 0)
    );

    if (hasProducts) {
      setOrder({});
      if (galleryRef.current && galleryRef.current.resetAllQuantities) {
        galleryRef.current.resetAllQuantities();
      }
      alert("Pedido descartado");
    }
  };

  const handleConfirmOrder = () => {
    const orderItems = [];
    
    Object.entries(order).forEach(([burgerId, burgerOrder]) => {
      Object.entries(burgerOrder || {}).forEach(([type, quantity]) => {
        if (quantity > 0) {
          const burger = burgers.find(b => b.id === burgerId);
          if (burger) {
            orderItems.push({
              name: burger.name,
              type,
              quantity,
              price: prices[burger.name] ? prices[burger.name][type] : burger.prices[type]
            });
          }
        }
      });
    });

    if (orderItems.length === 0) {
      alert("No has seleccionado ningún producto.");
      return;
    }

    const direccion = prompt("Por favor, ingresa tu dirección de envío:");

    if (direccion && /^[a-zA-Z0-9\s,.-]+$/.test(direccion.trim())) {
      const numeroWhatsApp = "5491171545860";
      let mensajeHamburguesas = "";
      
      orderItems.forEach(item => {
        mensajeHamburguesas += `${item.name} (${item.type}) x ${item.quantity}\n`;
      });

      const mensaje = `Hola, quiero confirmar mi pedido. Mi dirección de envío es: ${direccion}\n\nHamburguesas elegidas:\n${mensajeHamburguesas}`;
      const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;

      try {
        window.open(urlWhatsApp, "_blank");
      } catch (error) {
        alert("Ocurrió un error al intentar redirigir a WhatsApp.");
        console.error(error);
      }
    } else {
      alert("Por favor, ingresa una dirección válida.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black m-0 p-0">
      <Header 
        onConfirmOrder={handleConfirmOrder}
        onDiscardOrder={handleDiscardOrder}
      />
      <Hero />
      <Gallery 
        ref={galleryRef}
        onOrderChange={handleOrderChange}
      />
    </div>
  );
}

export default App;
