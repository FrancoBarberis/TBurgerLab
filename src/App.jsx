import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Gallery from './components/Gallery';
import ParallaxSection from './components/ParallaxSection';
import LoadingScreen from './components/LoadingScreen';
import Modal from './components/Modal';
import { obtenerPrecios } from './services/firebase';
import { burgers } from './data/burgers';

function App() {
  const [order, setOrder] = useState({});
  const [prices, setPrices] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const galleryRef = useRef();
  
  // Estados del modal
  const [modal, setModal] = useState({
    isOpen: false,
    type: 'alert',
    title: '',
    message: '',
    onConfirm: () => {},
    inputValue: '',
    placeholder: ''
  });

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
      setModal({
        isOpen: true,
        type: 'confirm',
        title: 'Descartar Pedido',
        message: '¿Estás seguro de que quieres descartar todo el pedido?',
        onConfirm: () => {
          setOrder({});
          if (galleryRef.current && galleryRef.current.resetAllQuantities) {
            galleryRef.current.resetAllQuantities();
          }
          setModal({ ...modal, isOpen: false });
          showAlert('Pedido descartado exitosamente', 'Descarte Completado');
        }
      });
    }
  };

  const showAlert = (message, title = 'Información') => {
    setModal({
      isOpen: true,
      type: 'alert',
      title,
      message,
      onConfirm: () => setModal({ ...modal, isOpen: false })
    });
  };

  const showPrompt = (message, placeholder, onConfirm, title = 'Información Requerida') => {
    setModal({
      isOpen: true,
      type: 'prompt',
      title,
      message,
      placeholder,
      inputValue: '',
      onConfirm: () => {
        const direccion = modal.inputValue.trim();
        // Validar: al menos 1 mayúscula, 1 minúscula y 1 número
        const hasUppercase = /[A-Z]/.test(direccion);
        const hasLowercase = /[a-z]/.test(direccion);
        const hasNumber = /[0-9]/.test(direccion);
        
        if (direccion && hasUppercase && hasLowercase && hasNumber) {
          onConfirm(modal.inputValue);
          setModal({ ...modal, isOpen: false });
        } else {
          // Mostrar error y luego reabrir el prompt
          setModal({
            isOpen: true,
            type: 'alert',
            title: 'Dirección Inválida',
            message: 'Por favor, ingrese una dirección válida (debe contener al menos una mayúscula, una minúscula y un número).',
            onConfirm: () => {
              // Reabrir el prompt original
              showPrompt(message, placeholder, onConfirm, title);
            }
          });
        }
      }
    });
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
      showAlert("No has seleccionado ningún producto.", "Pedido Vacío");
      return;
    }

    showPrompt(
      "Para procesar tu pedido, necesitamos tu dirección de envío:",
      "Ej: Av. Corrientes 1234, CABA",
      (direccion) => {
        const numeroWhatsApp = "5491171545860";
        let mensajeHamburguesas = "";
        
        orderItems.forEach(item => {
          mensajeHamburguesas += `${item.name} (${item.type}) x ${item.quantity}\n`;
        });

        const mensaje = `Hola, quiero confirmar mi pedido. Mi dirección de envío es: ${direccion}\n\nHamburguesas elegidas:\n${mensajeHamburguesas}`;
        const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;

        try {
          window.open(urlWhatsApp, "_blank");
          showAlert("Tu pedido se ha procesado correctamente. Te redirigimos a WhatsApp.", "Pedido Enviado");
        } catch (error) {
          showAlert("Ocurrió un error al intentar redirigir a WhatsApp. Por favor, inténtalo nuevamente.", "Error de Conexión");
          console.error(error);
        }
      },
      "Dirección de Envío"
    );
  };

  const handleInputChange = (value) => {
    setModal(prev => ({ ...prev, inputValue: value }));
  };

  // Función para verificar si el carrito está vacío
  const isCartEmpty = () => {
    return !Object.values(order).some(burgerOrder =>
      Object.values(burgerOrder || {}).some(qty => qty > 0)
    );
  };

  return (
    <>
      {isLoading && <LoadingScreen onLoadComplete={() => setIsLoading(false)} />}
      <div className={`bg-black m-0 p-0 w-screen overflow-x-hidden transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <Header 
          onConfirmOrder={handleConfirmOrder}
          onDiscardOrder={handleDiscardOrder}
          isCartEmpty={isCartEmpty()}
        />
        <div className="pt-16 w-screen">
          <ParallaxSection speed={0.3} className="relative w-screen">
            <Hero />
          </ParallaxSection>
          <ParallaxSection speed={0.6} isGallery={true} className="relative z-10 -mt-32 w-screen">
            <Gallery 
              ref={galleryRef}
              onOrderChange={handleOrderChange}
            />
          </ParallaxSection>
        </div>
      </div>
      <Modal
        isOpen={modal.isOpen}
        onClose={() => setModal({ ...modal, isOpen: false })}
        onConfirm={modal.onConfirm}
        title={modal.title}
        message={modal.message}
        type={modal.type}
        placeholder={modal.placeholder}
        inputValue={modal.inputValue}
        onInputChange={handleInputChange}
      />
    </>
  );
}

export default App;
