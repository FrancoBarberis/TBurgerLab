const loadingSpinner = document.getElementById('loadingSpinner');

function showSpinner(){
  loadingSpinner.classList.add('show');
}

function hideSpinner(){
  loadingSpinner.classList.remove('show');
}


showSpinner();

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

        const tipoHamburguesa = cantidad.closest(".tipoHamburguesa").querySelector(".textoTipoHamburguesa").textContent;
        const tipoCarne = cantidad.closest(".infoCompra").querySelector(".tipoCarne").textContent;

        mensajeHamburguesas += `${tipoHamburguesa} (${tipoCarne})x ${cantidadNumerica}\n`;
      }
    });

    if (hayProductos) {
      let direccion = null;

      // Solicita la dirección hasta que sea válida o el usuario cancele
      while (!direccion || !/^[a-zA-Z0-9áéíóúÁÉÍÓÚüÜ\s,.-]+$/.test(direccion.trim())) {
        direccion = prompt("Por favor, ingresa tu dirección de envío:");

        if (direccion === null) {
          alert("Has cancelado la solicitud de dirección.");
          return; // Rompe el flujo y no continúa con el pedido
        }

        if (!/^[a-zA-Z0-9áéíóúÁÉÍÓÚüÜ\s,.-]+$/.test(direccion.trim())) {
          alert("Por favor, ingresa una dirección válida.");
        }
      }

      const numeroWhatsApp = "5491171545860";
      const mensaje = `Hola, quiero confirmar mi pedido. Mi dirección de envío es: ${direccion}\n\nHamburguesas elegidas:\n${mensajeHamburguesas}`;
      const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;

      try {
        // Intentar abrir WhatsApp
        window.open(urlWhatsApp, "_blank");
      } catch (error) {
        alert("Ocurrió un error al intentar redirigir a WhatsApp. Haz clic en el enlace generado.");
        console.error(error);

        const enlaceWhatsApp = document.createElement("a");
        enlaceWhatsApp.href = urlWhatsApp;
        enlaceWhatsApp.target = "_blank";
        enlaceWhatsApp.textContent = "Haz clic aquí para confirmar tu pedido en WhatsApp";
        document.body.appendChild(enlaceWhatsApp);
      }
    } else {
      alert("No has seleccionado ningún producto.");
    }
  });
});

hideSpinner();
