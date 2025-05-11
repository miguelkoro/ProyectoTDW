import { useAuth } from "../context/AuthContext";
import { DataContext } from '../context/DataContext';
import { Link } from "react-router-dom";
import React, {useContext, useState} from 'react';
import "../styles/index.css";
import { useNavigate } from 'react-router-dom'; // Importa useNavigate para redirección

const NavBar = () => {
  const { user, logout } = useAuth();
  const { showMessage, message, messageType } = useContext(DataContext);
  const navigate = useNavigate(); // Hook para redirigir

  const [searchTerm, setSearchTerm] = useState(""); // Estado para el término de búsqueda

  const [menuOpen, setMenuOpen] = useState(false); // Estado para el menú de usuario
  const [manageMenuOpen, setManageMenuOpen] = useState(false); // Estado para el menú de gestión

  const handleMouseEnter = () => setMenuOpen(true);
  const handleMouseLeave = () => setMenuOpen(false);

  const handleManageMouseEnter = () => setManageMenuOpen(true);
  const handleManageMouseLeave = () => setManageMenuOpen(false);

  const handleSearch = () => {
    // Lógica para manejar la búsqueda
    console.log("Realizando búsqueda...");
    navigate(`/search/${searchTerm}`, { state: { searchTerm } }); 
  };

  return (
    <>
    <nav className="navbar">
      <Link className="navbar-left" to="/">
        <img src="/ProyectoTDW/assets/images/code.png" alt="Logo" className="navbar-logo" />
        <div className="typewriter">
          <p className="navbar-title">ANALES DE LA CIENCIA</p>
        </div>
      </Link>

      {/* Buscador */}
      <div className="navbar-search">
          <input
            type="text"
            className="search-input"
            placeholder="Buscar..."
            onChange={(e) => setSearchTerm(e.target.value)} // Actualiza el término de búsqueda
          />
          <button className="search-button" onClick={handleSearch}>
          <svg xmlns="http://www.w3.org/2000/svg" height="1.8rem" viewBox="0 -960 960 960" fill="#FFFFFF"><path d="M796.58-99.67 534.83-361.45q-30.38 24.19-72.02 37.75-41.63 13.56-86.63 13.56-116.4 0-196.16-79.83-79.76-79.82-79.76-194.51 0-114.68 79.83-194.46t194.51-79.78q114.68 0 194.46 79.82 79.78 79.81 79.78 194.57 0 44.71-13.01 84.66-13 39.95-38.87 74.06l263.45 262.2-63.83 63.74ZM374.84-399.4q77.91 0 131.33-53.63 53.41-53.63 53.41-131.3 0-77.66-53.38-131.4-53.38-53.73-131.3-53.73-78.48 0-131.93 53.73-53.45 53.74-53.45 131.4 0 77.67 53.43 131.3 53.43 53.63 131.89 53.63Z"/></svg>
          </button>
        </div>


      {/* Menú de gestión */}
      <div
          className="navbar-manage"
          onMouseEnter={handleManageMouseEnter}
          onMouseLeave={handleManageMouseLeave}
        >
          <span className="manage-title">Gestión</span>
          {manageMenuOpen && (
            <div className="dropdown-menu-manage">
              <Link to="/associations" state={{type: 'association'}} onClick={() => setManageMenuOpen(false)}  className="dropdown-item-manage">🔥 Asociaciones</Link>
              <Link to="/products" state={{type: 'product'}} onClick={() => setManageMenuOpen(false)}  className="dropdown-item-manage">💡 Productos</Link>
              <Link to="/persons" state={{type: 'person'}} onClick={() => setManageMenuOpen(false)}  className="dropdown-item-manage">🪠 Personas</Link>
              <Link to="/entities" state={{type: 'entity'}} onClick={() => setManageMenuOpen(false)}  className="dropdown-item-manage">🧸 Entidades</Link> 
              {user?.scope==="writer" && <Link to="/users" className="dropdown-item-manage" onClick={() => setManageMenuOpen(false)}  state={{type: 'user'}}>👥 Usuarios</Link>}
            </div>
          )}
        </div>


        {/* Perfil de usuario */}
      <div className="navbar-profile">
      {user ? (
            <>
              <span>Hola, {user.userName}</span>
              <div className={`dropdown ${menuOpen ? "active" : ""}`} onMouseEnter={handleMouseEnter}  onMouseLeave={handleMouseLeave}>
               <svg className="config"  xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"  fill="#EFEFEF"><path d="m382-80-18.67-126.67q-17-6.33-34.83-16.66-17.83-10.34-32.17-21.67L178-192.33 79.33-365l106.34-78.67q-1.67-8.33-2-18.16-.34-9.84-.34-18.17 0-8.33.34-18.17.33-9.83 2-18.16L79.33-595 178-767.67 296.33-715q14.34-11.33 32.34-21.67 18-10.33 34.66-16L382-880h196l18.67 126.67q17 6.33 35.16 16.33 18.17 10 31.84 22L782-767.67 880.67-595l-106.34 77.33q1.67 9 2 18.84.34 9.83.34 18.83 0 9-.34 18.5Q776-452 774-443l106.33 78-98.66 172.67-118-52.67q-14.34 11.33-32 22-17.67 10.67-35 16.33L578-80H382Zm55.33-66.67h85l14-110q32.34-8 60.84-24.5T649-321l103.67 44.33 39.66-70.66L701-415q4.33-16 6.67-32.17Q710-463.33 710-480q0-16.67-2-32.83-2-16.17-7-32.17l91.33-67.67-39.66-70.66L649-638.67q-22.67-25-50.83-41.83-28.17-16.83-61.84-22.83l-13.66-110h-85l-14 110q-33 7.33-61.5 23.83T311-639l-103.67-44.33-39.66 70.66L259-545.33Q254.67-529 252.33-513 250-497 250-480q0 16.67 2.33 32.67 2.34 16 6.67 32.33l-91.33 67.67 39.66 70.66L311-321.33q23.33 23.66 51.83 40.16 28.5 16.5 60.84 24.5l13.66 110Zm43.34-200q55.33 0 94.33-39T614-480q0-55.33-39-94.33t-94.33-39q-55.67 0-94.5 39-38.84 39-38.84 94.33t38.84 94.33q38.83 39 94.5 39ZM480-480Z"/></svg>
                {menuOpen && (
                  <div className="dropdown-menu">
                    <Link to="/profile" className="dropdown-item">
                      Mi cuenta
                    </Link>
                    <div className="dropdown-item logout" onClick={() => { setMenuOpen(false); logout(); }}>
                      Cerrar Sesión
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <Link className="navbar-button" to="/login">
              Iniciar Sesión
            </Link>
          )}
      </div>
    </nav>


    {/* Mensaje de error o éxito */}
    {message && (
      <div className={`message-container ${messageType}`}>
        <p>{message}</p>
      </div>
    )}
    </>
  );
};
export default NavBar;