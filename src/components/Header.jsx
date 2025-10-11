import React from 'react';

const Header = ({ onConfirmOrder, onDiscardOrder }) => {
  return (
    <header className="sticky top-0 z-50 bg-black bg-opacity-90 backdrop-blur-sm py-4 px-6 flex flex-col sm:flex-row justify-between items-center gap-4 border-b border-red-800 w-full">
      <div className="contenedor-titulo">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl text-white drop-shadow-lg font-resident">
          <span className="text-red-500">T-B</span>URGER<span className="text-red-500">.L</span>ABS
        </h1>
      </div>
      <div className="flex gap-3 lg:gap-4">
        <button 
          onClick={onConfirmOrder}
          className="bg-green-600 hover:bg-green-700 text-white px-4 lg:px-6 py-2 lg:py-3 rounded-lg flex items-center gap-2 transition-all font-semibold text-sm lg:text-base hover:scale-105 shadow-lg"
        >
          <span className="hidden sm:inline">CONFIRMAR PEDIDO</span>
          <span className="sm:hidden">CONFIRMAR</span>
          <i className="fas fa-check"></i>
        </button>
        <button 
          onClick={onDiscardOrder}
          className="bg-red-600 hover:bg-red-700 text-white px-3 lg:px-4 py-2 lg:py-3 rounded-lg transition-all hover:scale-105 shadow-lg"
        >
          <i className="fas fa-trash"></i>
        </button>
      </div>
    </header>
  );
};

export default Header;