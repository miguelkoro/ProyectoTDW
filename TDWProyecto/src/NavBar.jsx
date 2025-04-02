import { useState } from 'react';
import './NavBar.css'; // Importa el archivo CSS

const NavBar = ({ setShowLogin }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({
    name: 'Miguekoro', // Nombre de usuario de ejemplo
    image: 'https://unavatar.io/miguelkoro', // Imagen de perfil de ejemplo
  });

  const handleLogin = () => {
    /*setIsLoggedIn(true); // Simula el inicio de sesión*/
    setShowLogin(true); // Cambia el estado para mostrar el formulario de Login
  };

  const handleLogout = () => {
    setIsLoggedIn(false); // Simula el cierre de sesión*/
    setShowLogin(false); // Cambia el estado para volver a las secciones
  };

  const handleGoHome = () => {
    window.location.href = '/';// Redirige a la pantalla principal
  };

  return (
    <nav className="navbar">
    <div className="navbar-left" onClick={handleGoHome}>
      <img
        src="/assets/images/code.png"
        alt="Logo"
        className="navbar-logo"
      />
      <div className="typewriter">
        <p className="navbar-title">ANALES DE LA CIENCIA</p>
      </div>
    </div>
    <div className="navbar-right">
      {!isLoggedIn ? (
        <button className="navbar-button" onClick={handleLogin}>
          Login
        </button>
      ) : (
        <div className="navbar-profile">
          <img
            src={user.image}
            alt="Profile"
            className="navbar-profile-image"
          />
          <span>{user.name}</span>
          <button
            className="navbar-logout-button"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  </nav>
);
};
export default NavBar;