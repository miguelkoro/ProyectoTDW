import React, { useContext, useState } from 'react';
import '../styles/RelatedSection.css'; // Archivo CSS para estilos
import { useAuth } from '../context/AuthContext'; // Importa el contexto de autenticación
import { useLocation } from 'react-router-dom'; // Importa useLocation para obtener la ubicación actual
import { DataContext } from '../context/DataContext';

const RowRelated = ({ type, object,father}) => {
    //console.log("Objetos relacionados:", objects); // Verifica los objetos relacionados
    const { user } = useAuth(); // Obtén el usuario autenticado del contexto
    const { deleteRelationFromProduct, deleteRelationFromEntity } = useContext(DataContext);
    const [isDeleted, setIsDeleted] = useState(false); // Estado local para controlar la eliminación
    const location = useLocation(); // Obtén la ubicación actual
    const isView = location.state?.view || false;

    const handleDeleteClick = (e) => {
      e.stopPropagation();
      const confirmDelete = window.confirm(
        `¿Estás seguro de que deseas eliminar la relación con "${object.name}"?`
      );
      if (confirmDelete) {
        /*console.log('Eliminando relación:', object);
        setIsDeleted(true); // Marca el RowRelated como eliminado localmente
        console.log("deleteRelation", father.id, father.type, type, object.id);
        deleteRelation(father.id, father.type, type, object.id); // Llama al método del contexto*/
        //console.log('Eliminando relación:', object.type, " fdfd: ", father.type);
        father.type === 'product'
          ? setIsDeleted(deleteRelationFromProduct(father.id,type, object.id)) // Llama al método del contexto para productos
          : setIsDeleted(deleteRelationFromEntity(father.id, type, object.id)); // Llama al método del contexto para entidades

      }
    };

    if (isDeleted) {
      return null; // No renderiza nada si el RowRelated está marcado como eliminado
    }
   

  return (
    <>          
            <div key={object.id} className="related-row">
                <div className="related-column-id">{object.id}</div>
                <div className="related-column-name">{object.name || 'Sin nombre'}</div>
                {(user?.role === "writer" && !isView) && ( // Solo muestra los botones si el usuario ha iniciado sesión
                <div className="related-column-action">
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
            </div>
      
            </>
  );
  
};

export default RowRelated;