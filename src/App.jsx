import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Gallery from './components/Gallery';
import ParallaxSection from './components/ParallaxSection';
import LoadingScreen from './components/LoadingScreen';
import Modal from './components/Modal';
import { obtenerPreciosRealtime } from './services/firebase';
import { burgers } from './data/burgers';
import Admin from './pages/Admin';

function App() {
  // Actualiza los precios en tiempo real desde Firestore al montar el componente
  useEffect(() => {
    const unsubscribe = obtenerPreciosRealtime((precios) => {
      setPrices(precios);
      setIsLoading(false);
    });
    return () => unsubscribe && unsubscribe();
  }, []);
  const [order, setOrder] = useState({});
  const [prices, setPrices] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const galleryRef = useRef();
  const [modal, setModal] = useState({
    isOpen: false,
    type: 'alert',
    title: '',
    message: '',
    onConfirm: () => {},
    inputValue: '',
    placeholder: ''
  });
  const [modalInputValue, setModalInputValue] = useState('');


  // Función para confirmar el pedido
  function handleConfirmOrder() {
    setModal({
      isOpen: true,
      type: 'alert',
      title: 'Confirmar pedido',
      message: '¿Estás seguro de que quieres confirmar el pedido?',
      onConfirm: () => {
        setOrder({});
        setModal({ ...modal, isOpen: false });
      },
    });
  }

  // Función para descartar el pedido
  function handleDiscardOrder() {
    setOrder({});
    setModal({
      isOpen: true,
      type: 'alert',
      title: 'Pedido descartado',
      message: 'El pedido ha sido descartado.',
      onConfirm: () => setModal({ ...modal, isOpen: false }),
    });
  }

  // Verifica si el carrito está vacío
  function isCartEmpty() {
    return Object.keys(order).length === 0;
  }

  // Maneja cambios en el pedido desde Gallery
  function handleOrderChange(newOrder) {
    setOrder(newOrder);
  }

  // Maneja cambios en el input del modal
  function handleInputChange(e) {
    setModalInputValue(e.target.value);
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              {isLoading && <LoadingScreen onLoadComplete={() => setIsLoading(false)} />}
              <Header 
                onConfirmOrder={handleConfirmOrder}
                onDiscardOrder={handleDiscardOrder}
                isCartEmpty={isCartEmpty()}
              />
              <div className="pt-16 w-screen bg-black">
                <ParallaxSection speed={0.3} className="relative w-screen sm:bg-[#0a1020] lg:bg-black">
                  <Hero />
                </ParallaxSection>
                <ParallaxSection speed={0.6} isGallery={true} className="relative z-10 w-screen sm:bg-[#0a1020] lg:bg-black">
                  <Gallery 
                    ref={galleryRef}
                    onOrderChange={handleOrderChange}
                    order={order}
                    prices={prices}
                  />
                </ParallaxSection>
              </div>
              <Modal
                isOpen={modal.isOpen}
                onClose={() => setModal({ ...modal, isOpen: false })}
                onConfirm={modal.onConfirm}
                title={modal.title}
                message={modal.message}
                type={modal.type}
                placeholder={modal.placeholder}
                inputValue={modalInputValue}
                onInputChange={handleInputChange}
                resumen={modal.resumen}
                onResumenChange={modal.onResumenChange}
              />
            </>
          }
        />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
