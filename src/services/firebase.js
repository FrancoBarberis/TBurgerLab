// Función para escuchar precios en tiempo real desde Firestore
export function obtenerPreciosRealtime(callback) {
  const preciosRef = collection(db, "precios");
  return onSnapshot(preciosRef, (snapshot) => {
    const precios = {};
    snapshot.forEach(doc => {
      const data = doc.data();
      precios[data.nombre] = {
        simple: data.simple,
        doble: data.doble
      };
    });
    callback(precios);
  });
}
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs, onSnapshot } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAY9eSy7SfUwP0bGjSbBnHH2l-RVw0lQPc",
  authDomain: "t-burgerlabs.firebaseapp.com",
  databaseURL: "https://t-burgerlabs-default-rtdb.firebaseio.com",
  projectId: "t-burgerlabs",
  storageBucket: "t-burgerlabs.firebasestorage.app",
  messagingSenderId: "519691492104",
  appId: "1:519691492104:web:e88d900e37a73f461eaabd",
  measurementId: "G-8M0X70MCW6"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Inicializa Firestore
const db = getFirestore(app);

// Función para obtener precios desde Firestore
export async function obtenerPrecios() {
  const preciosRef = collection(db, "precios");
  const snapshot = await getDocs(preciosRef);
  const precios = {};
  snapshot.forEach(doc => {
    const data = doc.data();
    precios[data.nombre] = {
      simple: data.simple,
      doble: data.doble
    };
  });
  return precios;
}