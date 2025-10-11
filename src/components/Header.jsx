import React from 'react';

const Header = ({ onConfirmOrder, onDiscardOrder, isCartEmpty }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black bg-opacity-90 backdrop-blur-sm py-4 px-6 flex flex-col sm:flex-row justify-between items-center gap-4 w-full">
      <div className="contenedor-titulo">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl text-white drop-shadow-lg font-resident">
          <span className="text-red-500">T-B</span>URGER<span className="text-red-500">.L</span>ABS
        </h1>
      </div>
      <div className="flex gap-3 lg:gap-4">
        <button 
          onClick={isCartEmpty ? undefined : onConfirmOrder}
          disabled={isCartEmpty}
          className={`px-4 lg:px-6 py-2 lg:py-3 rounded-lg flex items-center gap-2 transition-all font-semibold text-sm lg:text-base shadow-lg border ${
            isCartEmpty 
              ? 'bg-red-900 border-red-900 text-red-200 cursor-not-allowed opacity-50' 
              : 'bg-red-600 hover:bg-red-700 text-white border-red-500 hover:scale-105 cursor-pointer'
          }`}
        >
          <span className="hidden sm:inline">CONFIRMAR PEDIDO</span>
          <span className="sm:hidden">CONFIRMAR</span>
          <i className="fas fa-check"></i>
        </button>
        <button 
          onClick={isCartEmpty ? undefined : onDiscardOrder}
          disabled={isCartEmpty}
          className={`px-4 lg:px-6 py-2 lg:py-3 rounded-lg transition-all shadow-lg border flex items-center gap-2 ${
            isCartEmpty
              ? 'bg-gray-900 border-gray-900 text-gray-400 cursor-not-allowed opacity-50'
              : 'bg-gray-700 hover:bg-gray-800 text-white border-gray-600 hover:scale-105 cursor-pointer'
          }`}
        >
          <i className="fas fa-trash"></i>
          <span className="hidden sm:inline font-resident text-sm lg:text-base">DESCARTAR</span>
        </button>
      </div>
    </header>
  );
};

export default Header;