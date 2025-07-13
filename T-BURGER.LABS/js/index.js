document.addEventListener("DOMContentLoaded", () => {
  const botonesSumar = document.querySelectorAll(".btn-sumar");
  const botonesRestar = document.querySelectorAll(".btn-restar");
  const botonDescartar = document.querySelector(".btn-descartar");
  const botonConfirmar = document.querySelector(".btn-confirmar");

  // Agrega el event listener para los botones de sumar
  botonesSumar.forEach((boton) => {
    boton.addEventListener("click", () => {
      const cantidad = boton.previousElementSibling; // Selecciona el span con la cantidad
      cantidad.textContent = parseInt(cantidad.textContent) + 1; // Incrementa la cantidad
    });
  });

  // Agrega el event listener para los botones de restar
  botonesRestar.forEach((boton) => {
    boton.addEventListener("click", () => {
      const cantidad = boton.nextElementSibling; // Selecciona el span con la cantidad
      if (parseInt(cantidad.textContent) > 0) {
        cantidad.textContent = parseInt(cantidad.textContent) - 1; // Decrementa la cantidad si es mayor a 0
      }
    });
  });

  // Agrega el event listener para el botón de descartar
  botonDescartar.addEventListener("click", () => {
    const cantidades = document.querySelectorAll(".cantidad"); // Selecciona todos los spans con la clase cantidad
    let seDescarto = false; // Variable para verificar si se descartó alguna cantidad

    cantidades.forEach((cantidad) => {
      if (parseInt(cantidad.textContent) > 0) {
        seDescarto = true; // Marca que se descartó al menos una cantidad
        cantidad.textContent = 0; // Resetea la cantidad a 0
      }
    });

    if (seDescarto) {
      alert("Pedido descartado"); // Muestra el mensaje solo si se descartó algo
    }
  });

  // Agrega el event listener para el botón de confirmar pedido
  botonConfirmar.addEventListener("click", () => {
    const cantidades = document.querySelectorAll(".cantidad"); // Selecciona todos los spans con la clase cantidad
    let hayProductos = false; // Variable para verificar si hay productos seleccionados
    let mensajeHamburguesas = ""; // Variable para construir el mensaje

    cantidades.forEach((cantidad) => {
      const cantidadNumerica = parseInt(cantidad.textContent);
      if (cantidadNumerica > 0) {
        hayProductos = true; // Marca que hay al menos un producto seleccionado

        // Obtiene el nombre de la hamburguesa (asume que está en un elemento hermano con clase .tipoHamburguesa)
        const tipoHamburguesa = cantidad.closest(".tipoHamburguesa").querySelector(".textoTipoHamburguesa").textContent;

        // Obtiene el tipo de carne (asume que está en un elemento hermano con clase .tipoCarne)
        const tipoCarne = cantidad.closest(".infoCompra").querySelector(".tipoCarne").textContent;

        // Agrega la hamburguesa, el tipo de carne y su cantidad al mensaje
        mensajeHamburguesas += `${tipoHamburguesa} (${tipoCarne}): ${cantidadNumerica}\n`;
      }
    });

    if (hayProductos) {
      // Solicita la dirección de envío
      const direccion = prompt("Por favor, ingresa tu dirección de envío:");

      // Verifica que se haya ingresado una dirección
      if (direccion && direccion.trim() !== "") {
        // Número de WhatsApp al que se enviará el mensaje
        const numeroWhatsApp = "5491171545860";

        // Mensaje que se enviará
        const mensaje = `Hola, quiero confirmar mi pedido. Mi dirección de envío es: ${direccion}\n\nHamburguesas seleccionadas:\n${mensajeHamburguesas}`;

        // Redirige a WhatsApp con el mensaje
        const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;
        window.open(urlWhatsApp, "_blank"); // Abre WhatsApp en una nueva pestaña
      } else {
        alert("No ingresaste una dirección válida."); // Muestra un mensaje si no se ingresó una dirección
      }
    } else {
      alert("No has seleccionado ningún producto."); // Muestra un mensaje si no hay productos seleccionados
    }
  });
});

window.onload = () => {
  document.body.style.visibility = "visible"; // Muestra el contenido
};
