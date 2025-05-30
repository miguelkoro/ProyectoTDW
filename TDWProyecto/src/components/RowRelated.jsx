import '../styles/index.scss'; // Archivo CSS para estilos
import { useAuth } from '../context/AuthContext'; // Importa el contexto de autenticación
import { useLocation } from 'react-router-dom'; // Importa useLocation para obtener la ubicación actual
import { useNavigate } from 'react-router-dom'; // Importa useNavigate para redirección

const RowRelated = (props) => {
    //console.log("Objetos relacionados:", objects); // Verifica los objetos relacionados
    const { user } = useAuth(); // Obtén el usuario autenticado del contexto
    const location = useLocation(); // Obtén la ubicación actual
    const navigate = useNavigate(); // Hook para redirigir

    const handleDeleteClick = (e) => {
      e.stopPropagation();
      const confirmDelete = window.confirm(
        `¿Estás seguro de que deseas eliminar la relación con "${props.object.name}"?`
      );
      if (confirmDelete) {        
         props.removeRelation(props.object.id, props.type); // Llama a la función para eliminar la relación
      }
    };

    const handleClick = () => {
      !props.isEdit &&
        navigate(`/view/${props.object.type}/${props.object.id}`, { state: { view: true } }); // Redirige al ObjectView con el objeto como estado
      //console.log("Datos del objeto:", object);
    };

  return (
    <>          
            <div key={props.object.id} className="related-row" onClick={handleClick} style={{ cursor: !props.isEdit ? 'pointer' : 'default' }}>
                <div className="related-column-id">{props.object.id}</div>
                <div className="related-column-name">{props.object.name || 'Sin nombre'}</div>
                {(user?.scope === "writer" && props.isEdit) && ( // Solo muestra los botones si el usuario ha iniciado sesión
                <div className="related-column-action">
                <button className="delete-button" title="Eliminar"
                    onClick={(e) => handleDeleteClick(e)} >
                    <svg xmlns="http://www.w3.org/2000/svg"viewBox="0 0 24 24"fill="currentColor" width="16px" height="16px">
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