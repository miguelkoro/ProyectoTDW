import { useState } from 'react';
import './App.css'
import Login from './Login'; // Importa el componente de Login
import NavBar from './NavBar';
import Section from './Section';

import {products} from './mocks/products.json'; // Importa los productos desde el archivo products.json
import {persons} from './mocks/persons.json'; // Importa los productos desde el archivo products.json
import {entities} from './mocks/entities.json'; // Importa los productos desde el archivo products.json

function App() {
  const [showLogin, setShowLogin] = useState(false);  // Estado para controlar si se muestra el formulario de Login
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado para controlar si el usuario está logueado

  

  const handleLoginSuccess = () => {
    setIsLoggedIn(true); // Actualiza el estado para reflejar que el usuario ha iniciado sesión
    setShowLogin(false); // Oculta el formulario de Login y vuelve a las secciones
  };
  return (
    <>
      <NavBar setShowLogin={setShowLogin} /> {/* Pasa la función para cambiar el estado */}
      <main>
        {showLogin ? (
          <Login onLoginSuccess={handleLoginSuccess} /> // Pasa la función al componente Login
        ) : (
          <>
            <Section objects={products} title={"Productos"}/>
            <Section objects={persons} title={"Personas"}/>
            <Section objects={entities} title={"Entidades"}/>
          </>
        )}
      </main>
    </>
  )
}

export default App
