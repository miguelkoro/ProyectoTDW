import React, { useState, useEffect, useContext, use } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import '../styles/index.css'; // Reutilizamos los estilos de ObjectView
import { DataContext } from '../context/DataContext'; // Contexto para guardar datos
import { useAuth } from '../context/AuthContext';
import User from '../models/User';

const UserView = () => {
    const {showMessage} = useContext(DataContext); // Accede al método getObjectById del contexto
    const {user, getUserById} = useAuth(); // Obtiene el usuario autenticado del contexto
    //const isEdit= location.state?.edit || false;
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(true); // Estado de carga   
    const [userObject, setUserObject] = useState({}); // Estado para el objeto de usuario


    // Estados para los campos del formulario


    useEffect(() => {
      if(!user) return; // Si no hay usuario, no hace nada    
      try { 
        fetchUser(id); // Llama a la función para obtener el usuario por ID
      } catch (error) {
        console.error("Error fetching user:", error); // Muestra el error en la consola
      }finally {
        setIsLoading(false); // Cambia el estado de carga a falso
      }
    },[])

    const fetchUser = async (id) => {
      let fetchedUser = await getUserById(id); // Obtiene el usuario por ID      
      if(fetchedUser){
        setUserObject(fetchedUser); // Obtiene el usuario por ID
      }      
    }

    if (isLoading) {
      return <p>Cargando...</p>; // Muestra un mensaje de carga mientras se obtienen los datos
    }
  
    if (!userObject) {
      return <p>No se encontró el usuario.</p>; // Muestra un mensaje si no se encuentra el usuario
    }
  



  return (
    <div className="object-view-panel">
    {/* Fila principal: Título centrado y ID a la derecha */}
    <div className="object-header">
      <h1 className="object-title">{userObject.userName}</h1>
      <span className="object-id">ID: {userObject.id}</span>
    </div>
    <hr className="object-divider" />

    {/* Contenedor de columnas */}
    <div className="object-content">
      {/* Columna derecha: Detalles */}
      <div className="object-details-column">
        <div className="object-detail-row">
          <strong>Nombre:</strong>
          <span>{userObject.userName}</span>
        </div>
        <div className="object-detail-row">
          <strong>Email:</strong>
          <span>{userObject.email}</span>
        </div>
        <div className="object-detail-row">
          <strong>Fecha de nacimiento:</strong>
          <span>{userObject.birthDate || 'No disponible'}</span> {/* Muestra la fecha o un mensaje si no está disponible */}
        </div>
        {user?.scope === "writer" && (
          <div className="object-detail-row">
            <strong>Rol:</strong>
            <span>{userObject.scope}</span>
          </div>
        )}
      </div>
    </div>
  </div>
  );
};

export default UserView;