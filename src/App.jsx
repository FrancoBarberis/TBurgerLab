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
  // Estado separado para el valor del input del modal
  const [modalInputValue, setModalInputValue] = useState('');

  // Calcula el resumen del pedido desde el estado global
  const getOrderItems = () => {
    const items = [];
    Object.entries(order).forEach(([burgerId, burgerOrder]) => {
      Object.entries(burgerOrder || {}).forEach(([type, quantity]) => {
        if (quantity > 0) {
          const burger = burgers.find(b => b.id === burgerId);
          if (burger) {
            items.push({
              burgerId,
              name: burger.name,
              type,
              quantity,
              price: prices[burger.name] ? prices[burger.name][type] : burger.prices[type]
            });
          }
        }
      });
    });
    return items;
  };

  // Sincroniza el modal de resumen con el estado global 'order'
  useEffect(() => {
    if (modal.isOpen && modal.type === 'resumen') {
      const orderItems = getOrderItems();
      if (orderItems.length === 0) {
        setModal(prev => ({ ...prev, isOpen: false }));
      } else {
        setModal(prev => ({ ...prev, resumen: orderItems }));
      }
    }
  }, [order]);

  // Handlers para modificar cantidades y eliminar productos en el resumen
  const handleResumenChange = {
    incrementar: (burgerId, type) => {
      setOrder(prev => ({
        ...prev,
        [burgerId]: {
          ...prev[burgerId],
          [type]: prev[burgerId][type] + 1
        }
      }));
    },
    decrementar: (burgerId, type) => {
      setOrder(prev => {
        const nuevo = { ...prev };
        if (nuevo[burgerId] && nuevo[burgerId][type] > 1) {
          nuevo[burgerId][type] = nuevo[burgerId][type] - 1;
        } else if (nuevo[burgerId] && nuevo[burgerId][type] === 1) {
          delete nuevo[burgerId][type];
          if (Object.keys(nuevo[burgerId]).length === 0) {
            delete nuevo[burgerId];
          }
        }
        return nuevo;
      });
    },
    eliminar: (burgerId, type) => {
      setOrder(prev => {
        const nuevo = { ...prev };
        if (nuevo[burgerId]) {
          delete nuevo[burgerId][type];
          if (Object.keys(nuevo[burgerId]).length === 0) {
            delete nuevo[burgerId];
          }
        }
        return nuevo;
      });
    }
  };
  // (Eliminadas declaraciones duplicadas de estado y referencia)

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

  const showPrompt = (message, placeholder, onSuccessCallback, title = 'Información Requerida') => {
    const validateAndProcess = (value) => {
      const direccion = value.trim();
      console.log('Validando dirección:', direccion);
      const hasNumber = /[0-9]/.test(direccion);
      console.log('¿Tiene número?', hasNumber);
      if (direccion && hasNumber) {
        console.log('Dirección válida, enviando a WhatsApp:', direccion);
        onSuccessCallback(direccion);
        setModal({ ...modal, isOpen: false });
        setModalInputValue('');
      } else {
        console.log('Dirección inválida, reabriendo modal:', direccion);
        setModal({
          isOpen: true,
          type: 'alert',
          title: 'Dirección Inválida',
          message: 'Por favor, ingrese una dirección válida (debe contener al menos un número).',
          onConfirm: () => {
            setModal({
              isOpen: true,
              type: 'prompt',
              title,
              message,
              placeholder,
              inputValue: direccion,
              onConfirm: (nuevoValor) => validateAndProcess(nuevoValor)
            });
          }
        });
      }
    };

    setModal({
      isOpen: true,
      type: 'prompt',
      title,
      message,
      placeholder,
  inputValue: modalInputValue,
  onConfirm: (valor) => validateAndProcess(valor)
    });
  };

  const handleConfirmOrder = () => {
    const orderItems = getOrderItems();
    if (orderItems.length === 0) {
      showAlert("No has seleccionado ningún producto.", "Pedido Vacío");
      return;
    }
    setModal({
      isOpen: true,
      type: 'resumen',
      title: 'Resumen de Pedido',
      resumen: orderItems,
      onResumenChange: handleResumenChange,
      onConfirm: () => {
        showPrompt(
          "Para procesar tu pedido, necesitamos tu dirección de envío:",
          "Ej: Av. Corrientes 1234, CABA",
          (direccion) => {
            const numeroWhatsApp = "5491171545860";
            let mensajeHamburguesas = "";
            getOrderItems().forEach(item => {
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
      }
    });
  };

  const handleInputChange = (value) => {
    console.log('Nuevo valor:', value);
    setModalInputValue(value);
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
              order={order}
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
        inputValue={modalInputValue}
        onInputChange={handleInputChange}
        resumen={modal.resumen}
        onResumenChange={modal.onResumenChange}
      />
    </>
  );
}

export default App;
