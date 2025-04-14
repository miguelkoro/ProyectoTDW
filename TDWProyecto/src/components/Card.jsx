import React, {useContext} from 'react';
import './Card.css'; // Archivo CSS para estilos
import { useAuth } from '../context/AuthContext'; // Importa el contexto de autenticación
import { useNavigate } from 'react-router-dom'; // Importa useNavigate para redirección
import { DataContext } from '../context/DataContext'; // Importa el DataContext
//import { deletePerson, deleteEntity, deleteProduct } from '../services/dataService';


const Card = ({object}) => {
  const { user } = useAuth(); // Obtén el usuario autenticado del contexto
  const navigate = useNavigate(); // Hook para redirigir
  const { deleteEntity, deletePerson, deleteProduct } = useContext(DataContext); // Obtén el método deletePerson del DataContext

  const handleCardClick = () => {
    //console.log("Objeto clickeado:", object); // Verifica el objeto clickeado
    navigate(`/view/${object.type}/${object.id}`, { state: { view: true } }); // Redirige al ObjectView con el objeto como estado
    //console.log("Datos del objeto:", object);
  };

  const handleEditClick = (e)=> {
    e.stopPropagation(); // Evita que el evento de clic se propague al contenedor del card
    navigate(`/edit/${object.type}/${object.id}`, { state: { object } }); // Redirige al ObjectView con el objeto como estado
    console.log("editar objeto:", object);
  }

  const handleDeleteClick = (e) => {
    e.stopPropagation(); // Evita que el evento de clic se propague al contenedor del card
    const confirmDelete = window.confirm(
      `¿Estás seguro de que deseas eliminar el objeto "${object.name}"?`
    );
    if (confirmDelete) {
      console.log("Eliminando objeto:", object);
      //onDelete(object.id); // Llama a la función de eliminación pasada como prop
      //Tengo que ver si el objeto es una persona o una entidad y llamar a la función de eliminación correspondiente
      switch (object.type) {
        case 'person':
          deletePerson(object.id); // Llama a la función de eliminación para personas
          break;
        case 'entity':
          deleteEntity(object.id); // Llama a la función de eliminación para entidades
          break;
        case 'product':
          deleteProduct(object.id); // Llama a la función de eliminación para productos
          break;
        default:
          console.log("Tipo de objeto no válido:", object.type); // Maneja el caso de tipo no válido
      }
    } else {
      console.log("Eliminación cancelada");
    }
  }
  //console.log("", object.getType()); // Verifica el tipo de objeto
  

  return (
    <div className="card" onClick={handleCardClick}>
      {user?.role === "writer" && ( // Solo muestra los botones si el usuario ha iniciado sesión
        <div className="card-buttons">
          <button
            className="edit-button"
            onClick={(e) => {handleEditClick(e)}}
            title="Editar"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              strokeLinecap="round"
              strokeWidth="2"
              strokeLinejoin="round"
              stroke="currentColor"
              viewBox="0 0 24 24"
              fill="none"
              width="16px"
              height="16px">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </button>
          <button
            className="delete-button"
            onClick={(e) => handleDeleteClick(e)}
            title="Eliminar">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              width="16px"
              height="16px">
              <path d="M3 6h18v2H3V6zm2 3h14v13H5V9zm3 2v9h2v-9H8zm6 0v9h2v-9h-2zM9 4h6v2H9V4z" />
            </svg>
          </button>
        </div>
      )}
      <img className="card-image" src={object.imageUrl} alt={object.name}></img>
      <h2 className='card-title' >{object.name}</h2>
      
    </div>
  );
}
export default Card;