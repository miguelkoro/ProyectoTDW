import { useAuth } from "../context/AuthContext";
import { Link } from 'react-router-dom'; // Importa Link para la navegación
import './NavBar.css'; // Importa el archivo CSS

const NavBar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <Link className="navbar-left" to="/">
        <img src="/assets/images/code.png" alt="Logo" className="navbar-logo" />
        <div className="typewriter">
          <p className="navbar-title">ANALES DE LA CIENCIA</p>
        </div>
      </Link>
      <div className="navbar-profile">
        {user ? (
            <>
              <img
                src={user.profileImage}
                alt="Profile"
                className="navbar-profile-image"
              />
              <span>Bienvenido, {user.userName}</span>
              <button className="navbar-button" onClick={logout}>
                Cerrar Sesión
              </button>
            </>
          ) : (
            <Link className="navbar-button" to="/login">
              Iniciar Sesión
            </Link>
          )}
      </div>
    </nav>
  );
};
export default NavBar;