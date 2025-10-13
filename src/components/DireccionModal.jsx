import React from 'react';

const DireccionModal = ({
  isOpen,
  value,
  onChange,
  onConfirm,
  onClose,
  placeholder = 'Dirección de entrega',
  disabled = false
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-gray-900 border-2 border-red-600 rounded-md shadow-2xl max-w-md w-full mx-4 font-['3724-font'] animate-popIn">
        <div className="bg-red-600 px-6 py-4 rounded-t-md">
          <h3 className="text-white font-bold text-2xl lg:text-4xl uppercase tracking-wider font-['3724-font']">
            Ingresar dirección
          </h3>
        </div>
        <form onSubmit={e => { e.preventDefault(); onConfirm(value); }} className="p-6 font-['3724-font']">
          <input
            type="text"
            value={value}
            onChange={e => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-sm text-white placeholder:text-xs lg:placeholder:text-sm placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-colors mb-6 text-lg lg:text-2xl font-mono"
            autoFocus
            disabled={disabled}
          />
          <div className="flex gap-3 justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 bg-gray-700 hover:bg-gray-800 text-white rounded-sm transition-colors border border-gray-600 font-['3724-font'] uppercase tracking-wide"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-sm transition-colors border border-red-500 font-['3724-font'] uppercase tracking-wide cursor-pointer"
            >
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DireccionModal;
