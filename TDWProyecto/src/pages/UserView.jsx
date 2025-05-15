import { useState, useEffect, useContext} from 'react';
import {useParams } from 'react-router-dom';
import '../styles/index.scss'; // Reutilizamos los estilos de ObjectView
import { DataContext } from '../context/DataContext'; // Contexto para guardar datos
import { useAuth } from '../context/AuthContext';
import loadingGif from '../assets/images/Loading.gif';
import Error from './Error'; // Importa el componente de error

const UserView = () => {
    const {getUserById} = useContext(DataContext); // Accede al método getObjectById del contexto
    const {user} = useAuth(); // Obtiene el usuario autenticado del contexto
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(true); // Estado de carga   
    const [error, setError] = useState(false); // Estado para manejar errores
    const [userObject, setUserObject] = useState({}); // Estado para el objeto de usuario

    useEffect(() => {   
      const fetchData = async () => {
        setIsLoading(true); // Inicia la carga
        try {
          if (!user) return; // Si no hay usuario, no hace nada
          await fetchUser(id); // Llama a la función para obtener el usuario por ID
        } catch (error) {
          console.error("Error fetching user:", error); // Muestra el error en la consola
          setError(true); // Establece el error a true
        } finally {
          setIsLoading(false); // Cambia el estado de carga a falso
        }
      };
      fetchData();
    },[user, id])

    const fetchUser = async (id) => {
      try {
        const fetchedUser = await getUserById(id); // Obtiene el usuario por ID
        if (fetchedUser) {
          setUserObject(fetchedUser); // Establece el usuario en el estado
        } else {
          //throw new Error("Usuario no encontrado"); // Lanza un error si no se encuentra el usuario
          setError(true); // Establece el estado de error
        }
      } catch (error) {
        console.error("Error al obtener el usuario:", error);
        setError(true); // Establece el estado de error
      }   
    }

    if (error) {
      return <Error message="No se encontró el objeto." />; // Muestra un mensaje de error si no se encuentra el objeto
    }

    if (isLoading) {
      return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" , width:"100vw"}}>
        <img src={loadingGif} alt="Cargando..." style={{ height: "5rem" , margin:"0 auto"}} />
      </div>
      ); // Muestra un spinner de carga
    }
  return (
    <div className="object-panel object-panel-user" >
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
          <strong>Username:</strong>
          <span>{userObject.userName}</span>
        </div>
        <div className="object-detail-row">
          <strong>Nombre:</strong>
          <span>{userObject.name}</span>
        </div>
        <div className="object-detail-row">
          <strong>Email:</strong>
          <span>
            <a className="user-email" href={`mailto:${userObject.email}`}>{userObject.email}</a>
          </span>
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