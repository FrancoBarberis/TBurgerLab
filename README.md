# T-Burger.Lab 🍔

Aplicación web para el menú de hamburguesas T-Burger.Lab, desarrollada con React, Vite y Tailwind CSS.

## Características

- ✅ **React 19** con hooks modernos
- ✅ **Vite** para desarrollo rápido y build optimizado
- ✅ **Tailwind CSS** para estilos responsive
- ✅ **Firebase** para gestión de precios en tiempo real
- ✅ **Font Awesome** para iconografía
- ✅ **Integración WhatsApp** para pedidos
- ✅ **Responsive Design** optimizado para móviles y desktop

## Estructura del Proyecto

```
src/
├── components/
│   ├── Header.jsx          # Cabecera con botones de acción
│   ├── Gallery.jsx         # Galería de hamburguesas
│   └── BurgerCard.jsx      # Tarjeta individual de hamburguesa
├── data/
│   └── burgers.js          # Datos de las hamburguesas
├── services/
│   └── firebase.js         # Configuración y servicios de Firebase
├── App.jsx                 # Componente principal
├── main.jsx               # Punto de entrada
└── index.css              # Estilos globales con Tailwind
```

## Desarrollo

```bash
# Instalar dependencias
npm install

# Servidor de desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview
```

## Despliegue en Netlify

El proyecto está configurado para despliegue automático en Netlify:

- **Build Command:** `npm run build`
- **Publish Directory:** `dist`
- **Redirects:** Configuradas para SPA en `netlify.toml`

## Tecnologías

- **React 19** - Librería de interfaz de usuario
- **Vite 7** - Herramienta de build y desarrollo
- **Tailwind CSS 3** - Framework de CSS utilitario
- **Firebase** - Base de datos en tiempo real
- **Font Awesome** - Biblioteca de iconos

## Funcionalidades

### Componentes Principales

1. **Header**: Navegación y botones de confirmar/descartar pedido
2. **Gallery**: Contenedor principal de todas las hamburguesas
3. **BurgerCard**: Tarjeta individual con imagen, descripción y controles de cantidad

### Gestión de Estado

- Estado local con `useState` para cantidades
- Comunicación entre componentes vía props
- Referencias con `useRef` e `useImperativeHandle` para control de reset

### Integración Firebase

- Carga de precios desde Firebase Realtime Database
- Fallback a precios estáticos si Firebase no está disponible
- Configuración modular en `/src/services/firebase.js`

### Flujo de Pedidos

1. Usuario selecciona hamburguesas y cantidades
2. Botón "Confirmar Pedido" valida selección
3. Solicita dirección de envío
4. Genera mensaje estructurado
5. Redirige a WhatsApp con el pedido completo

## Customización

### Agregar Nueva Hamburguesa

Edita `/src/data/burgers.js`:

```javascript
{
  id: 'nueva-hamburguesa',
  name: 'Nombre',
  characterImage: '/imgs/personaje.webp',
  burgerImage: '/imgs/hamburguesa.webp', 
  ingredients: 'Lista de ingredientes',
  prices: {
    simple: 12000,
    doble: 14000
  }
}
```

### Configurar Firebase

Actualiza `/src/services/firebase.js` con tus credenciales:

```javascript
const firebaseConfig = {
  apiKey: "tu-api-key",
  authDomain: "tu-proyecto.firebaseapp.com",
  databaseURL: "tu-database-url",
  // ...resto de configuración
};
```

### Modificar Estilos

El proyecto usa Tailwind CSS con configuración personalizada en `tailwind.config.js`. Las fuentes personalizadas están definidas en `src/index.css`.

## Assets

Coloca los archivos en las carpetas correspondientes:

- **Imágenes**: `/public/imgs/`
- **Fuentes**: `/public/fonts/`

## Contacto

Para pedidos: WhatsApp +54 9 11 7154-5860

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
