// Importa Firebase y los módulos necesarios
import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, set } from "firebase/database";

// Configuración de Firebase (reemplaza con tus credenciales)
const firebaseConfig = {
  apiKey: "AIzaSyAY9eSy7SfUwP0bGjSbBnHH2l-RVw0lQPc",
  authDomain: "t-burgerlabs.firebaseapp.com",
  databaseURL: "https://t-burgerlabs-default-rtdb.firebaseio.com",
  projectId: "t-burgerlabs",
  storageBucket: "t-burgerlabs.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:0987654321abcdefg",
  measurementId: "G-1234567890"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Función para obtener precios desde Firebase
export const obtenerPrecios = async () => {
  try {
    const snapshot = await get(ref(db, "precios"));
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.error("No se encontraron precios en la base de datos.");
      return null;
    }
  } catch (error) {
    console.error("Error al obtener precios:", error);
    return null;
  }
};

// Función para actualizar precios en Firebase
export const actualizarPrecios = async (nuevosPrecios) => {
  try {
    await set(ref(db, "precios"), nuevosPrecios);
    console.log("Precios actualizados correctamente.");
  } catch (error) {
    console.error("Error al actualizar precios:", error);
  }
};