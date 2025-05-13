import React, {useContext} from 'react';
import '../styles/index.scss'; // Archivo CSS para estilos
import { useAuth } from '../context/AuthContext'; // Importa el contexto de autenticación
import { useNavigate } from 'react-router-dom'; // Importa useNavigate para redirección
import { DataContext } from '../context/DataContext'; // Importa el DataContext
//import { deletePerson, deleteEntity, deleteProduct } from '../services/dataService';


const CardUser = ({object}) => {
  const { user,  } = useAuth(); // Obtén el usuario autenticado del contexto
  const navigate = useNavigate(); // Hook para redirigir
  const { deleteUser } = useContext(DataContext); // Obtén el método deletePerson del DataContext

  const handleCardClick = () => {
    //console.log("Objeto clickeado:", object); // Verifica el objeto clickeado
    navigate(`/view/user/${object.id}`, { state: { view: true } });
    //console.log("Datos del objeto:", object);

  };

  const handleEditClick = (e)=> {
    e.stopPropagation(); // Evita que el evento de clic se propague al contenedor del card
    navigate(`/edit/user/${object.id}`, { state: { object , edit: true, id: object.id} }); // Redirige al ObjectView con el objeto como estado
    //console.log("editar objeto:", object);
  }

  const handleDeleteClick = (e) => {
    e.stopPropagation(); // Evita que el evento de clic se propague al contenedor del card
    const confirmDelete = window.confirm(
      `¿Estás seguro de que deseas eliminar el usuario "${object.userName}"?`
    );
    if (confirmDelete) {
      //deleteObject(object.type,object.id); // Llama a la función de eliminación para personas
      deleteUser(object.id); // Llama a la función de eliminación para personas
    } else {
      console.log("Eliminación cancelada");
    }
  }
  //console.log("", object.getType()); // Verifica el tipo de objeto
  

  return (
    <div className="card user-card" onClick={handleCardClick}>   
        <div className="card-buttons">
          <button
            className="edit-button"
            onClick={(e) => {handleEditClick(e)}}
            title="Editar" >
            <svg xmlns="http://www.w3.org/2000/svg" strokeLinecap="round" strokeWidth="2" strokeLinejoin="round" stroke="currentColor" viewBox="0 0 24 24" fill="none" width="16px" height="16px">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </button>
          <button
            className="delete-button"
            onClick={(e) => handleDeleteClick(e)}
            title="Eliminar">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="16px" height="16px">
              <path d="M3 6h18v2H3V6zm2 3h14v13H5V9zm3 2v9h2v-9H8zm6 0v9h2v-9h-2zM9 4h6v2H9V4z" />
            </svg>
          </button>
        </div>      
      {/*<img className="card-image" src={object.imageUrl} alt={object.name}></img>*/}
      <h2 className='card-username' >{object.userName}</h2>
      <h2 className='card-email'>{object.email}</h2>
    </div>
  );
}
export default CardUser;