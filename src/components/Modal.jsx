import React from 'react';

const Modal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  message, 
  type = 'alert', // 'alert', 'confirm', 'prompt', 'resumen'
  placeholder = '',
  inputValue = '',
  onInputChange = () => {},
  resumen = null,
  onResumenChange = null
}) => {
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onConfirm) {
      if (type === 'prompt') {
        onConfirm(inputValue);
      } else {
        onConfirm();
      }
    }
  };

  const handleInputChange = (e) => {
    onInputChange(e.target.value);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-gray-900 border-2 border-red-600 rounded-md shadow-2xl max-w-md w-full mx-4 font-['3724-font'] animate-popIn">
        {/* Header */}
        <div className="bg-red-600 px-6 py-4 rounded-t-md">
          <h3 className="text-white font-bold text-2xl lg:text-4xl uppercase tracking-wider font-['3724-font']">
            {title}
          </h3>
        </div>
        {/* Content */}
  <form onSubmit={handleSubmit} className="p-6 font-['3724-font']">
          {type === 'resumen' ? (
            <>
              {/* Eliminado el texto de resumen */}
              <ul className="mb-2 text-gray-200 text-sm">
                {Array.isArray(resumen) && resumen.length > 0 ? (
                  resumen.map((item, idx) => {
                    const total = item.price * item.quantity;
                    return (
                      <li key={item.burgerId + '-' + item.type} className="mb-2 flex items-center justify-between">
                        <span className="text-xl lg:text-4xl font-bold text-white">{item.name} <span className="text-gray-400 text-base lg:text-2xl font-normal">({item.type})</span></span>
                        <div className="flex items-center gap-2 justify-end">
                          <button type="button" className="bg-gray-700 hover:bg-gray-800 text-white w-6 h-6 rounded-sm flex items-center justify-center font-bold transition-colors text-xs font-resident focus:outline-none" onClick={(e) => { e.preventDefault(); onResumenChange?.decrementar(item.burgerId, item.type); }}>-</button>
                          <span className="font-mono text-lg lg:text-2xl text-white">x{item.quantity}</span>
                          <button type="button" className="bg-red-600 hover:bg-red-700 text-white w-6 h-6 rounded-sm flex items-center justify-center font-bold transition-colors text-xs font-resident focus:outline-none" onClick={(e) => { e.preventDefault(); onResumenChange?.incrementar(item.burgerId, item.type); }}>+</button>
                          <span className="text-green-400 ml-2 text-lg lg:text-2xl font-mono w-20 text-right">${total}</span>
                          <button type="button" className="ml-2 bg-red-700 hover:bg-red-800 text-white w-6 h-6 rounded-sm flex items-center justify-center font-bold transition-colors text-xs font-resident focus:outline-none" onClick={(e) => { e.preventDefault(); onResumenChange?.eliminar(item.burgerId, item.type); }}>X</button>
                        </div>
                      </li>
                    );
                  })
                ) : (
                  <li>No hay productos seleccionados.</li>
                )}
              </ul>
              {/* Total a pagar */}
              {Array.isArray(resumen) && resumen.length > 0 && (
                <div className="mb-6 text-right text-2xl lg:text-4xl font-bold text-green-400">
                  Total a pagar: <span className="font-mono">${resumen.reduce((acc, item) => acc + item.price * item.quantity, 0)}</span>
                </div>
              )}
              <div className="flex gap-3 justify-end">
                {type === 'resumen' && (
                  <button
                    type="button"
                    onClick={() => {
                      if (typeof onResumenChange?.descartarTodo === 'function') onResumenChange.descartarTodo();
                    }}
                    className="px-6 py-2 bg-gray-700 hover:bg-gray-800 text-white rounded-sm transition-colors border border-gray-600 font-['3724-font'] flex items-center justify-center"
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                )}
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2 bg-gray-700 hover:bg-gray-800 text-white rounded-sm transition-colors border border-gray-600 font-['3724-font'] uppercase tracking-wide"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-sm transition-colors border border-red-500 font-['3724-font'] uppercase tracking-wide"
                >
                  Continuar
                </button>
              </div>
            </>
          ) : (
            <>
              <p className="text-gray-100 mb-6 leading-relaxed">
                <span className="block text-base lg:text-2xl text-red-400 font-bold mb-2">{message}</span>
              </p>
              {type === 'prompt' && (
                <>
                  <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder={placeholder}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-sm text-white placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-colors mb-6 text-lg lg:text-2xl font-mono"
                    autoFocus
                  />
                </>
              )}
              <div className="flex gap-3 justify-end">
                {type !== 'alert' && (
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-6 py-2 bg-gray-700 hover:bg-gray-800 text-white rounded-sm transition-colors border border-gray-600 font-['3724-font'] uppercase tracking-wide"
                  >
                    Cancelar
                  </button>
                )}
                <button
                  type="submit"
                  className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-sm transition-colors border border-red-500 font-['3724-font'] uppercase tracking-wide"
                  disabled={type === 'prompt' && (!inputValue || inputValue.length < 5)}
                >
                  {type === 'confirm' ? 'Confirmar' : type === 'prompt' ? 'Enviar' : 'Aceptar'}
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default Modal;