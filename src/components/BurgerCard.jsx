import React, { forwardRef, useImperativeHandle } from "react";
import IngredientesAnimados from "./IngredientesAnimados";

// ingredientes: array de objetos { nombre, icono }
const BurgerCard = forwardRef(
  (
    { burger, ingredientes, onQuantityChange, quantities, className = "" },
    ref
  ) => {
    // Recibo quantities como prop
    // El control visual usa quantities directamente
    const handleQuantityChange = (type, increment) => {
      let newQuantity = quantities[type];
      if (increment) {
        newQuantity += 1;
      } else if (newQuantity > 0) {
        newQuantity -= 1;
      }
      onQuantityChange(burger.id, type, newQuantity);
    };

    // Exponer la función reset para el componente padre
    useImperativeHandle(ref, () => ({
      resetQuantities: () => {
        onQuantityChange(burger.id, "simple", 0);
        onQuantityChange(burger.id, "doble", 0);
      },
    }));

    return (
      <div
        className={`burger-card group relative flex-shrink-0 w-full h-[calc(100vh-6rem)] sm:w-40 sm:h-80 sm:hover:w-56 sm:hover:h-80 shadow-lg sm:hover:shadow-2xl sm:hover:z-20 border-0 m-0 transition-all duration-700 ease-in-out ${className} shadow-[0_8px_32px_-8px_rgba(0,0,0,0.7)]`}
      >
        {/* Background Image */}
        <div
          className="card-image absolute inset-0 bg-cover bg-center transition-all duration-700 brightness-95  lg:brightness-125 group-hover:brightness-150 h-full w-full"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.5)), url(${
              burger.backgroundImage ||
              "https://via.placeholder.com/400x500/444/fff?text=Hamburguesa+" +
                burger.name
            })`,
            objectFit: "cover",
            minHeight: "100%",
            maxHeight: "none",
            overflowX: "auto",
          }}
        />

        {/* Card content */}
        <div className="card-content relative z-10 p-4 h-full flex flex-col sm:align-middle text-center">
          <div className="card-header flex flex-col justify-start  lg:opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:delay-500 w-full h-full">
            <h3 className="card-name text-7xl lg:text-4xl 3724-font font-bold pt-10 lg:pt-0 text-red-400 lg:mb-4 mb-20 text-left pl-4 lg:pl-0 w-auto">
                {burger.name}
              </h3>
              {/* LISTA INGREDIENTES */}
              <ul className="card-list text-4xl text-gray-100 lg:text-xl font-thin flex flex-col justify-center gap-0.2 w-full h-fit  lg:text-left">
                {(ingredientes
                  ? ingredientes
                  : burger.ingredients
                      .split(",")
                      .map((i) => ({ nombre: i.trim(), icono: "�️" }))
                ).map((i, idx) => (
                  <li key={idx} className="w-full text-left break-words">
                    {i.icono}{" "}
                    {i.nombre.charAt(0).toUpperCase() + i.nombre.slice(1)}
                  </li>
                ))}
              </ul>
          </div>
          {/* CONTENEDOR BOTONERA */}
        <div className="card-buttons absolute left-0 right-0 z-20 opacity-100 sm:opacity-0 lg:group-hover:opacity-80 transition-all duration-300 group-hover:delay-500 delay-0 transform translate-y-0 sm:translate-y-4 sm:group-hover:translate-y-0 bottom-0">
          {/* BOTONERA */}
          <div className="bg-black bg-opacity-50 rounded-sm backdrop-blur-sm px-5 w-full flex flex-col">
            {/* SIMPLE */}
            <div className="grid grid-cols-3 items-center gap-1 mb-1">
              <span className="text-4xl text-white font-semibold lg:text-3xl 3724-font text-left ">
                Simple
              </span>
              <div className="flex items-center justify-center gap-1">
                <button
                  onClick={() => handleQuantityChange("simple", false)}
                  className="bg-gray-700 hover:bg-gray-800 text-white w-6 h-6 rounded-sm flex items-center justify-center font-bold transition-colors text-xs font-resident focus:outline-none"
                >
                  -
                </button>
                <span className="text-white font-semibold w-6 text-center text-xs font-resident">
                  {quantities.simple}
                </span>
                <button
                  onClick={() => handleQuantityChange("simple", true)}
                  className="bg-red-600 hover:bg-red-700 text-white w-6 h-6 rounded-sm flex items-center justify-center font-bold transition-colors text-xs font-resident focus:outline-none"
                >
                  +
                </button>
              </div>
              <span className="text-green-400 font-bold text-xs font-resident text-center">
                ${burger.prices.simple}
              </span>
            </div>
            {/* DOBLE */}
            <div className="grid grid-cols-3 items-center gap-1">
              <span className="text-white font-semibold text-4xl lg:text-3xl 3724-font text-left">
                Doble
              </span>
              <div className="flex items-center justify-center gap-1">
                <button
                  onClick={() => handleQuantityChange("doble", false)}
                  className="bg-gray-700 hover:bg-gray-800 text-white w-6 h-6 rounded-sm flex items-center justify-center font-bold transition-colors text-xs font-resident focus:outline-none"
                >
                  -
                </button>
                <span className="text-white font-semibold w-6 text-center text-xs font-resident">
                  {quantities.doble}
                </span>
                <button
                  onClick={() => handleQuantityChange("doble", true)}
                  className="bg-red-600 hover:bg-red-700 text-white w-6 h-6 rounded-sm flex items-center justify-center font-bold transition-colors text-xs font-resident focus:outline-none"
                >
                  +
                </button>
              </div>
              <span className="text-green-400 font-bold text-xs font-resident text-center">
                ${burger.prices.doble}
              </span>
            </div>
          </div>
        </div>
        
        </div>
      </div>
    );
  }
);

BurgerCard.displayName = "BurgerCard";

export default BurgerCard;
