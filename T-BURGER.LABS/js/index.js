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

        const sanitize = (str) => str.replace(/[^a-zA-Z0-9\s]/g, "");
        const tipoHamburguesaSanitizado = sanitize(tipoHamburguesa);
        const tipoCarneSanitizado = sanitize(tipoCarne);

        if (tipoHamburguesa && tipoCarne && cantidadNumerica > 0) {
          // Agrega la hamburguesa, el tipo de carne y su cantidad al mensaje
          mensajeHamburguesas += `${tipoHamburguesa} (${tipoCarne})x ${cantidadNumerica}\n`;
        } else {
          console.error("Datos inválidos detectados en el DOM.");
        }
      }
    });

    if (hayProductos) {
      let direccion = null;

      // Solicita la dirección hasta que sea válida
      while (!direccion || !/^[a-zA-Z0-9\s,.-]+$/.test(direccion.trim())) {
        if (direccion !== null) {
          alert("Por favor, ingresa una dirección válida.");
        }
        direccion = prompt("Por favor, ingresa tu dirección de envío:");
      }

      const numeroWhatsApp = "5491171545860";
      const mensaje = `Hola, quiero confirmar mi pedido. Mi dirección de envío es: ${direccion}\n\nHamburguesas elegidas:\n${mensajeHamburguesas}`;
      const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;

      try {
        // Intentar abrir WhatsApp
        window.open(urlWhatsApp, "_blank");
      } catch (error) {
        alert("Ocurrió un error al intentar redirigir a WhatsApp.");
        console.error(error);

        // Crear un pop-up dinámico
        const modal = document.createElement("div");
        modal.style.position = "fixed";
        modal.style.top = "50%";
        modal.style.left = "50%";
        modal.style.transform = "translate(-50%, -50%)";
        modal.style.backgroundColor = "#fff";
        modal.style.padding = "20px";
        modal.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
        modal.style.borderRadius = "8px";
        modal.style.zIndex = "1000";

        const mensajeError = document.createElement("p");
        mensajeError.textContent = "Haz clic en el enlace para confirmar tu pedido en WhatsApp:";
        mensajeError.style.marginBottom = "10px";

        const enlaceWhatsApp = document.createElement("a");
        enlaceWhatsApp.href = urlWhatsApp;
        enlaceWhatsApp.target = "_blank";
        enlaceWhatsApp.textContent = "Abrir WhatsApp";
        enlaceWhatsApp.style.color = "#25d366"; // Color de WhatsApp
        enlaceWhatsApp.style.textDecoration = "none";
        enlaceWhatsApp.style.fontWeight = "bold";

        const botonCerrar = document.createElement("button");
        botonCerrar.textContent = "Cerrar";
        botonCerrar.style.marginTop = "10px";
        botonCerrar.style.padding = "5px 10px";
        botonCerrar.style.cursor = "pointer";
        botonCerrar.style.backgroundColor = "#f44336";
        botonCerrar.style.color = "#fff";
        botonCerrar.style.border = "none";
        botonCerrar.style.borderRadius = "4px";

        botonCerrar.addEventListener("click", () => {
          document.body.removeChild(modal); // Elimina el pop-up
        });

        modal.appendChild(mensajeError);
        modal.appendChild(enlaceWhatsApp);
        modal.appendChild(botonCerrar);
        document.body.appendChild(modal);
      }
    } else {
      alert("No has seleccionado ningún producto.");
    }
  });
});

window.onload = () => {
  document.body.style.visibility = "visible"; // Muestra el contenido
};
