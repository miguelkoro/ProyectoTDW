import React from 'react';
import './Card.css'; // Archivo CSS para estilos
import { useAuth } from '../context/AuthContext'; // Importa el contexto de autenticación
import { useNavigate } from 'react-router-dom'; // Importa useNavigate para redirección

const Card = ({object}) => {
  const { user } = useAuth(); // Obtén el usuario autenticado del contexto
  const navigate = useNavigate(); // Hook para redirigir

  const handleCardClick = () => {
    navigate(`/object/${object.id}`, { state: { object } }); // Redirige al ObjectView con el objeto como estado
  };

  return (
    <div className="card" onClick={handleCardClick}>
      {user && ( // Solo muestra los botones si el usuario ha iniciado sesión
        <div className="card-buttons">
          <button
            className="edit-button"
            onClick={() => onEdit(object.id)}
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
            onClick={() => onDelete(object.id)}
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
      <img className="card-image" src={object.image} alt={object.name}></img>
      <h2 className='card-title' >{object.name}</h2>
      
    </div>
  );
}
export default Card;