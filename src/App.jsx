import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Gallery from './components/Gallery';
import LoadingScreen from './components/LoadingScreen';
import Modal from './components/Modal';
import DireccionModal from './components/DireccionModal';
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
  const [direccionModalOpen, setDireccionModalOpen] = useState(false);


  // Función para mostrar el resumen interactivo del pedido
  function buildResumen() {
    const resumen = [];
    Object.entries(order).forEach(([burgerId, tipos]) => {
      Object.entries(tipos).forEach(([type, quantity]) => {
        if (quantity > 0) {
          const burger = burgers.find(b => b.id === burgerId);
          const price = prices[burger?.name]?.[type] ?? burger?.prices?.[type] ?? 0;
          resumen.push({
            burgerId,
            name: burger?.name ?? '',
            type,
            quantity,
            price
          });
        }
      });
    });
    return resumen;
  }

  function handleConfirmOrder() {
    setModal({
      isOpen: true,
      type: 'resumen',
      title: 'Resumen de tu pedido',
      resumen: buildResumen(),
      onResumenChange: {
        incrementar: (burgerId, type) => {
          handleOrderChange(burgerId, type, (order[burgerId]?.[type] ?? 0) + 1);
          setModal(modal => ({ ...modal, resumen: buildResumen() }));
        },
        decrementar: (burgerId, type) => {
          handleOrderChange(burgerId, type, Math.max(0, (order[burgerId]?.[type] ?? 0) - 1));
          setModal(modal => ({ ...modal, resumen: buildResumen() }));
        },
        eliminar: (burgerId, type) => {
          handleOrderChange(burgerId, type, 0);
          setModal(modal => ({ ...modal, resumen: buildResumen() }));
        },
        descartarTodo: () => {
          setOrder({});
          setModal({ ...modal, isOpen: false });
        }
      },
      onConfirm: () => {
        setDireccionModalOpen(true);
        setModal({ ...modal, isOpen: false });
      },
      onClose: () => setModal({ ...modal, isOpen: false })
    });
  }

  // Función para descartar el pedido
  function handleDiscardOrder() {
    setOrder({});
    setModal({ ...modal, isOpen: false });
  }

  // Verifica si el carrito está vacío
  function isCartEmpty() {
    return Object.keys(order).length === 0;
  }

  // Maneja cambios en el pedido desde Gallery
  function handleOrderChange(burgerId, type, quantity) {
    setOrder(prevOrder => {
      const updatedOrder = { ...prevOrder };
      if (!updatedOrder[burgerId]) {
        updatedOrder[burgerId] = {};
      }
      updatedOrder[burgerId][type] = quantity;
      // Si ambos son 0, elimina el producto del pedido
      if ((updatedOrder[burgerId].simple ?? 0) === 0 && (updatedOrder[burgerId].doble ?? 0) === 0) {
        delete updatedOrder[burgerId];
      }
      return updatedOrder;
    });
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
              <div className="md:pt-16 w-screen sm:bg-[#0a1020] md:bg-black">
                <Hero/>
                <Gallery 
                  ref={galleryRef}
                  onOrderChange={handleOrderChange}
                  order={order}
                  prices={prices}
                  className= "bg-white"
                />
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
                onInputChange={modal.onInputChange}
                resumen={modal.resumen}
                onResumenChange={modal.onResumenChange}
              />
              <DireccionModal
                isOpen={direccionModalOpen}
                value={modalInputValue}
                onChange={setModalInputValue}
                onConfirm={(direccion) => {
                  const tieneLetra = /[a-zA-Z]/.test(direccion);
                  const tieneNumero = /[0-9]/.test(direccion);
                  if (!tieneLetra || !tieneNumero) {
                    setDireccionModalOpen(false);
                    setModal({
                      isOpen: true,
                      type: 'alert',
                      title: 'Dirección inválida',
                      message: 'Por favor ingresa una dirección válida (debe contener al menos una letra y un número).',
                      onConfirm: () => {
                        setModal({ ...modal, isOpen: false });
                        setDireccionModalOpen(true);
                      },
                      onClose: () => {
                        setModal({ ...modal, isOpen: false });
                        setDireccionModalOpen(true);
                      }
                    });
                  } else {
                    // Construir resumen de productos
                    const resumen = buildResumen();
                    const productos = resumen.map(item => `${item.name} (${item.type}): x${item.quantity}`).join('\n');
                    const mensaje = encodeURIComponent(
                      `Hola! Mi dirección de entrega es: ${direccion}\n\nPedido:\n${productos}`
                    );
                    window.open(`https://wa.me/?text=${mensaje}`, '_blank');
                    setOrder({});
                    setDireccionModalOpen(false);
                    setModalInputValue('');
                  }
                }}
                onClose={() => setDireccionModalOpen(false)}
                placeholder="Por favor, ingresa tu dirección para el pedido"
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
