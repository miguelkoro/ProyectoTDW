import { useAuth } from "../context/AuthContext";
import { DataContext } from '../context/DataContext';
import { Link } from "react-router-dom";
import React, {useContext} from 'react';
import "../styles/NavBar.css";

const NavBar = () => {
  const { user, logout } = useAuth();
  const { showMessage, message, messageType } = useContext(DataContext);

  return (
    <>
    <nav className="navbar">
      <Link className="navbar-left" to="/">
        <img src="/ProyectoTDW/assets/images/code.png" alt="Logo" className="navbar-logo" />
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
              <button className="navbar-logout-button" onClick={logout}>
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
    {message && (
      <div className={`message-container ${messageType}`}>
        <p>{message}</p>
      </div>
    )}
    </>
  );
};
export default NavBar;