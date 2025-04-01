import { useState } from 'react';
import './NavBar.css'; // Importa el archivo CSS

const NavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({
    name: 'Miguekoro', // Nombre de usuario de ejemplo
    image: 'https://unavatar.io/miguelkoro', // Imagen de perfil de ejemplo
  });

  const handleLogin = () => {
    setIsLoggedIn(true); // Simula el inicio de sesión
  };

  const handleLogout = () => {
    setIsLoggedIn(false); // Simula el cierre de sesión
  };

  return (
    <nav className="navbar">
    <div className="navbar-left">
      <img
        src="/assets/images/code.png"
        alt="Logo"
        className="navbar-logo"
      />
      <h1 className="navbar-title">ANALES DE LA CIENCIA</h1>
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