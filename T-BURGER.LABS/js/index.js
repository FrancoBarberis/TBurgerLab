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
      crearModal("Pedido descartado");
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

      const solicitarDireccion = () => {
        crearModalDireccion("Por favor, ingresa tu dirección de envío:", (resultado) => {
          if (resultado === null) {
            return; // Detiene el proceso de confirmación
          }

          direccion = resultado;

          if (!/^[a-zA-Z0-9áéíóúÁÉÍÓÚüÜñÑ\s,.-]+$/.test(direccion.trim())) {
            crearModal("Por favor, ingresa una dirección válida.");
            solicitarDireccion(); // Vuelve a solicitar la dirección
          } else {
            // Continúa con el pedido si la dirección es válida
            const numeroWhatsApp = "5491171545860";
            const mensaje = `Hola, quiero confirmar mi pedido. Mi dirección de envío es: ${direccion}\n\nHamburguesas elegidas:\n${mensajeHamburguesas}`;
            const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;

            // Reemplaza el alert por un modal
            crearModal("Dirección válida. Puedes continuar con tu pedido.", () => {
              console.log("Dirección válida:", direccion);
              console.log("Mensaje para WhatsApp:", mensaje);
              window.open(urlWhatsApp, "_blank"); // Abre el enlace de WhatsApp
            });
          }
        });
      };

      solicitarDireccion();
    } else {
      crearModal("No has seleccionado ningún producto.");
      return; // Detiene el proceso de confirmación
    }
  });
});

hideSpinner();

function crearModal(mensaje, callback) {
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
  modal.style.textAlign = "center";
  modal.style.fontFamily = "REFont";
  modal.style.animation = "popupAnimation 0.3s ease-out"; // Aplica la animación

  const mensajeModal = document.createElement("p");
  mensajeModal.textContent = mensaje;
  mensajeModal.style.marginBottom = "20px";
  mensajeModal.style.fontSize = "1.8rem";
  mensajeModal.style.fontWeight = "lighter";

  const botonCerrar = document.createElement("button");
  botonCerrar.textContent = "Cerrar";
  botonCerrar.style.padding = "10px 20px";
  botonCerrar.style.cursor = "pointer";
  botonCerrar.style.backgroundColor = "#f44336";
  botonCerrar.style.color = "#fff";
  botonCerrar.style.border = "none";
  botonCerrar.style.borderRadius = "4px";
  botonCerrar.style.fontSize = "1.5rem";
  botonCerrar.style.fontFamily = "REFont";

  botonCerrar.addEventListener("click", () => {
    document.body.removeChild(modal);
    if (callback) callback(); // Ejecuta el callback si se proporciona
  });

  modal.appendChild(mensajeModal);
  modal.appendChild(botonCerrar);
  document.body.appendChild(modal);
}

function crearModalDireccion(mensaje, callback) {
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
  modal.style.textAlign = "center";
  modal.style.fontFamily = "REFont";
  modal.style.animation = "popupAnimation 0.3s ease-out";

  const mensajeModal = document.createElement("p");
  mensajeModal.textContent = mensaje;
  mensajeModal.style.marginBottom = "20px";
  mensajeModal.style.fontSize = "1.8rem";
  mensajeModal.style.fontWeight = "lighter";

  const inputDireccion = document.createElement("input");
  inputDireccion.type = "text";
  inputDireccion.placeholder = "Ingresa tu dirección";
  inputDireccion.style.display = "block"; // Asegura que el input sea un bloque
  inputDireccion.style.margin = "0 auto"; // Centra horizontalmente el input
  inputDireccion.style.width = "80%"; // Ajusta el ancho del input
  inputDireccion.style.padding = "10px";
  inputDireccion.style.marginBottom = "20px";
  inputDireccion.style.border = "1px solid #ccc";
  inputDireccion.style.borderRadius = "4px";
  inputDireccion.style.fontSize = "1.5rem";
  inputDireccion.style.fontFamily = "REFont";

  // Contenedor para los botones
  const contenedorBotones = document.createElement("div");
  contenedorBotones.style.display = "flex";
  contenedorBotones.style.justifyContent = "center"; // Centra los botones horizontalmente
  contenedorBotones.style.gap = "10px"; // Espacio entre los botones
  contenedorBotones.style.marginTop = "10px"; // Espacio superior

  const botonConfirmar = document.createElement("button");
  botonConfirmar.textContent = "Confirmar";
  botonConfirmar.style.padding = "10px 20px";
  botonConfirmar.style.cursor = "pointer";
  botonConfirmar.style.backgroundColor = "#4CAF50";
  botonConfirmar.style.color = "#fff";
  botonConfirmar.style.border = "none";
  botonConfirmar.style.borderRadius = "4px";
  botonConfirmar.style.fontSize = "1.5rem";
  botonConfirmar.style.fontFamily = "REFont";

  const botonCancelar = document.createElement("button");
  botonCancelar.textContent = "Cancelar";
  botonCancelar.style.padding = "10px 20px";
  botonCancelar.style.cursor = "pointer";
  botonCancelar.style.backgroundColor = "#f44336";
  botonCancelar.style.color = "#fff";
  botonCancelar.style.border = "none";
  botonCancelar.style.borderRadius = "4px";
  botonCancelar.style.fontSize = "1.5rem";
  botonCancelar.style.fontFamily = "REFont";

  botonConfirmar.addEventListener("click", () => {
    const direccion = inputDireccion.value.trim();
    if (direccion && /^[a-zA-Z0-9áéíóúÁÉÍÓÚüÜñÑ\s,.-]+$/.test(direccion)) {
      document.body.removeChild(modal);
      callback(direccion); // Devuelve la dirección al callback
    } else {
      crearModal("Por favor, ingresa una dirección válida.");
    }
  });

  botonCancelar.addEventListener("click", () => {
    document.body.removeChild(modal);
    callback(null); // Devuelve null si se cancela
  });

  // Agrega los botones al contenedor
  contenedorBotones.appendChild(botonConfirmar);
  contenedorBotones.appendChild(botonCancelar);

  modal.appendChild(mensajeModal);
  modal.appendChild(inputDireccion);
  modal.appendChild(contenedorBotones);
  document.body.appendChild(modal);
}
