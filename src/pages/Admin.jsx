import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { getFirestore, collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { app } from '../services/firebase';

const auth = getAuth(app);
const db = getFirestore(app);

export default function Admin() {
  const [popup, setPopup] = useState({ show: false, message: '', type: 'success' });
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [precios, setPrecios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setError('');
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      const fetchPrecios = async () => {
        setLoading(true);
        const snapshot = await getDocs(collection(db, 'precios'));
        const arr = [];
        snapshot.forEach(docSnap => {
          arr.push({ id: docSnap.id, ...docSnap.data() });
        });
        setPrecios(arr);
        setLoading(false);
      };
      fetchPrecios();
    }
  }, [user]);

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log('Email ingresado:', email);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError('Credenciales incorrectas');
    }
  };

  const handleLogout = () => {
    signOut(auth);
  };

  const handleChange = (id, field, value) => {
    setPrecios(prev => prev.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const handleSave = async (id) => {
    const precio = precios.find(p => p.id === id);
    try {
      await updateDoc(doc(db, 'precios', id), {
        simple: Number(precio.simple),
        doble: Number(precio.doble)
      });
      setPopup({ show: true, message: 'Precios actualizados', type: 'success' });
      setTimeout(() => setPopup({ show: false, message: '', type: 'success' }), 2500);
    } catch (err) {
      setPopup({ show: true, message: 'No tienes permisos para editar precios. Contacta al administrador.', type: 'error' });
      setTimeout(() => setPopup({ show: false, message: '', type: 'error' }), 3500);
    }
  };

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-2xl mb-4">Acceso Administrador</h2>
        <form onSubmit={handleLogin} className="flex flex-col gap-2 w-64">
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required className="p-2 border rounded" />
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Contraseña" required className="p-2 border rounded" />
          <button type="submit" className="bg-red-600 text-white p-2 rounded">Ingresar</button>
        </form>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </div>
    );
  }

  // Usuario autorizado: muestra el panel de edición centrado
  return (
    <div className="admin-panel flex items-center justify-center bg-gray-900 overflow-auto">
      <div className="max-w-xl w-full bg-gray-800 rounded-lg shadow-lg p-8 mx-auto flex flex-col items-center px-4 relative">
        {popup.show && (
          <div className={`fixed top-8 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded shadow-lg z-50 text-center ${popup.type === 'success' ? 'bg-green-700 text-white' : 'bg-red-700 text-white'}`}>
            {popup.message}
          </div>
        )}
        <h2 className="text-2xl mb-4 text-center text-white">Editar Precios de Hamburguesas</h2>
        <p className="mb-2 text-gray-300 text-sm">Usuario autenticado: <span className="font-mono">{user.email}</span></p>
        <button onClick={handleLogout} className="mb-6 bg-gray-700 text-white px-4 py-2 rounded block mx-auto">Cerrar sesión</button>
        {loading ? <p className="text-center text-white">Cargando...</p> : (
          <table className="w-full border border-gray-700">
            <thead>
              <tr>
                <th className="border p-2 text-white">Hamburguesa</th>
                <th className="border p-2 text-white">Simple</th>
                <th className="border p-2 text-white">Doble</th>
                <th className="border p-2 text-white">Acción</th>
              </tr>
            </thead>
            <tbody>
              {precios.map(p => (
                <tr key={p.id}>
                  <td className="border p-2 text-white font-semibold">{p.nombre || 'Sin nombre'}</td>
                  <td className="border p-2">
                    <input type="number" value={p.simple} onChange={e => handleChange(p.id, 'simple', e.target.value)} className="w-20 p-1 border rounded bg-gray-900 text-white font-sans" />
                  </td>
                  <td className="border p-2">
                    <input type="number" value={p.doble} onChange={e => handleChange(p.id, 'doble', e.target.value)} className="w-20 p-1 border rounded bg-gray-900 text-white font-sans" />
                  </td>
                  <td className="border p-2">
                    <button onClick={() => handleSave(p.id)} className="bg-green-600 text-white px-2 py-1 rounded">Guardar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
