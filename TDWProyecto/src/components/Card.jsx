import React, {use, useContext, useEffect, useState} from 'react';
import '../styles/index.scss'; // Archivo CSS para estilos
import { useAuth } from '../context/AuthContext'; // Importa el contexto de autenticación
import { useNavigate } from 'react-router-dom'; // Importa useNavigate para redirección
import { DataContext } from '../context/DataContext'; // Importa el DataContext
//import { deletePerson, deleteEntity, deleteProduct } from '../services/dataService';


const Card = (props) => {
  const { user } = useAuth(); // Obtén el usuario autenticado del contexto
  const navigate = useNavigate(); // Hook para redirigir
  const { deleteObject } = useContext(DataContext); // Obtén el método deletePerson del DataContext
  const [color , setColor] = useState("rgba(255, 255, 255, 0.14)"); // Estado para el color del card
  const [titleType , setTitleType] = useState("Tipo"); // Estado para el color del card

  const handleCardClick = () => {
    //console.log("Objeto clickeado:", props.object); // Verifica el objeto clickeado
    navigate(`/view/${props.object.type}/${props.object.id}`, { state: { view: true } }); // Redirige al props.objectView con el objeto como estado
    //console.log("Datos del objeto:", props.object);
  };

  const handleEditClick = (e)=> {
    e.stopPropagation(); // Evita que el evento de clic se propague al contenedor del card
    navigate(`/edit/${props.object.type}/${props.object.id}`, { state: { object: props.object } }); // Redirige al props.objectView con el objeto como estado
    //console.log("editar objeto:", props.object);
  }

  const handleDeleteClick = async (e) => {
    e.stopPropagation(); // Evita que el evento de clic se propague al contenedor del card
    const confirmDelete = window.confirm(
      `¿Estás seguro de que deseas eliminar el objeto "${props.object.name}"?`
    );
    if (confirmDelete) {
      await deleteObject(props.object.type,props.object.id); // Llama a la función de eliminación para personas
    } else {
      console.log("Eliminación cancelada");
    }
  }
  //console.log("", props.object.getType()); // Verifica el tipo de objeto
  
  const cardColor = () => {
    switch (props.object.type) {
      case 'person':
        setColor("rgba(255, 7, 7, 0.23)"); // Color para personas
        setTitleType("🪠 PERSONA"); // Título para personas
        break;
      case 'entity':
        setColor("rgba(21, 255, 0, 0.24)"); // Color para entidades
        setTitleType("🧸 ENTIDAD"); // Título para entidades
        break;
      case 'product':
        setColor("rgba(179, 0, 255, 0.23)"); // Color para productos
        setTitleType("💡 PRODUCTO"); // Título para productos
        break;
      case 'association':
        setColor("rgba(0, 179, 255, 0.14)"); // Color para asociaciones
        setTitleType("🔥 ASOCIACIÓN"); // Título para asociaciones
        break;
      default:
        setColor("rgba(255, 255, 255, 0.14)"); // Color por defecto
        setTitleType("Tipo"); // Título por defecto
        break;
    }
  }

  useEffect(() => {
    cardColor(); // Llama a la función para establecer el color y el título
  },[props.object.type]); // Dependencia para que se ejecute cuando cambie el tipo de objeto


  return (
    <div className="card" onClick={handleCardClick}>
      {props.showType && <div className={`card-type`} style={{ backgroundColor: color }}>
        {titleType}
      </div>}
      {user?.scope === "writer" && ( // Solo muestra los botones si el usuario ha iniciado sesión
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
      )}

      <img className="card-image" src={props.object.imageUrl} alt={props.object.name}></img>
      <h2 className='card-title' >{props.object.name}</h2>
      
    </div>
  );
}
export default Card;