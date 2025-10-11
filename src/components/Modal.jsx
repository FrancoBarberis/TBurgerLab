import React from 'react';

const Modal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  message, 
  type = 'alert', // 'alert', 'confirm', 'prompt'
  placeholder = '',
  inputValue = '',
  onInputChange = () => {}
}) => {
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onConfirm) {
      onConfirm();
    }
  };

  const handleInputChange = (e) => {
    onInputChange(e.target.value);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-gray-900 border-2 border-red-600 rounded-lg shadow-2xl max-w-md w-full mx-4 font-resident animate-popIn">
        {/* Header */}
        <div className="bg-red-600 px-6 py-4 rounded-t-lg">
          <h3 className="text-white font-bold text-lg uppercase tracking-wider">
            {title}
          </h3>
        </div>
        
        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6">
          <p className="text-gray-100 mb-6 leading-relaxed">
            {message}
          </p>
          
          {type === 'prompt' && (
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder={placeholder}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-colors mb-6 font-resident"
              autoFocus
            />
          )}
          
          {/* Buttons */}
          <div className="flex gap-3 justify-end">
            {type !== 'alert' && (
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 bg-gray-700 hover:bg-gray-800 text-white rounded-md transition-colors border border-gray-600 font-resident uppercase tracking-wide"
              >
                Cancelar
              </button>
            )}
            <button
              type="submit"
              className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors border border-red-500 font-resident uppercase tracking-wide"
            >
              {type === 'confirm' ? 'Confirmar' : type === 'prompt' ? 'Enviar' : 'Aceptar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;