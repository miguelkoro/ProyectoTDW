import React from 'react';
import './RelatedObject.css'; // Archivo CSS para estilos
import { useAuth } from '../context/AuthContext'; // Importa el contexto de autenticación
import { deletePerson } from '../services/dataService';

const RelatedObject = ({ title, objects = [], deleteRelationAction}) => {
    //console.log("Objetos relacionados:", objects); // Verifica los objetos relacionados
    const { user } = useAuth(); // Obtén el usuario autenticado del contexto
    let typeRelation = ""; // Asigna el tipo de relación basado en el título
    switch (title) {
        case 'persons':
          typeRelation = 'Personas relacionadas';
            break;
        case 'entities':
          typeRelation = 'Entidades relacionadas';
            break;
        case 'products':
          typeRelation = 'Productos relacionados';
            break;
        default:
            break;
    }
    

  return (
    <div className="related-object">
      {/* Título centrado */}
      <div className="related-header">
        <h3 className="related-title">{typeRelation}</h3>
      </div>

      {/* Encabezado de las columnas */}
      <div className="related-columns-header">
        <div className="related-column-id">ID</div>
        <div className="related-column-name">Nombre</div>
      </div>

      {/* Lista de objetos relacionados */}
      <div className="related-list">
        {objects
            .filter((object) => object && object.id) // Filtra objetos válidos
            .map((object) => (
            <div key={object.id} className="related-row">
                <div className="related-column-id">{object.id}</div>
                <div className="related-column-name">{object.name || 'Sin nombre'}</div>
                {user?.role === "writer" && ( // Solo muestra los botones si el usuario ha iniciado sesión
                <div className="related-column-action">
                <button
                    className="delete-button"
                    onClick={(e) => deleteRelationAction(object.id, title)}
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
            </div>
            ))}
        </div>
    </div>
  );
};

export default RelatedObject;