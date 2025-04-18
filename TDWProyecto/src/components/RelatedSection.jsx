import React, { useState, useContext, useEffect } from 'react';
import '../styles/RelatedSection.css'; // Archivo CSS para estilos
import { useAuth } from '../context/AuthContext'; // Importa el contexto de autenticación
import { DataContext } from '../context/DataContext'; // Importa el DataContext
//import { RowRelated} from './RowRelated';
import RowRelated from './RowRelated'; // Importa el componente de fila relacionada
import { useLocation } from 'react-router-dom'; // Importa useLocation para obtener la ubicación actual

const RelatedSection = ({ type, relatedObjects = [], father}) => {
    //console.log("Objetos relacionados:", objects); // Verifica los objetos relacionados
    const { user } = useAuth(); // Obtén el usuario autenticado del contexto
    const { persons, entities, addRelationToProduct, addRelationToEntity, showMessage } = useContext(DataContext); // Obtén datos y método del contexto
    const [selectedId, setSelectedId] = useState(''); // Estado para el ID seleccionado
    const [localRelatedObjects, setLocalRelatedObjects] = useState(relatedObjects); // Estado local para los objetos relacionados
    const location = useLocation(); // Obtén la ubicación actual
    const isView = location.state?.view || false;

    let title = ''; // Asigna el tipo de relación basado en el título
    let options = []; // Opciones para el selector
  
    switch (type) {
      case 'persons':
        title = 'Personas relacionadas';
        options = persons; // Usa la lista de personas
        break;
      case 'entities':
        title = 'Entidades relacionadas';
        options = entities; // Usa la lista de entidades
        break;
      default:
        break;
    }

    // Actualiza el estado local cuando cambien las props `relatedObjects`
    useEffect(() => {
      //console.log("relatedObjects: ", relatedObjects, " dfdfdf: ",father); // Verifica los objetos relacionados
    }, []);

    const checkAddRelation = () => {
      if (!selectedId) {
        //console.error("No se ha seleccionado ningún ID."); // Mensaje de error si no hay nada seleccionado
        showMessage("No se ha seleccionado ningún ID."); // Mensaje de error si no hay nada seleccionado
        return false; // No se puede añadir la relación
      }
    
      // Verifica si el ID ya está en la lista de objetos relacionados
      const alreadyExists = relatedObjects.some((object) => object.id === Number(selectedId));
      if (alreadyExists) {
        //console.error(`El ID ${selectedId} ya está en la lista de objetos relacionados.`);
        showMessage(`El ID ${selectedId} ya está en la lista de objetos relacionados.`); // Mensaje de error si ya existe
        return false; // No se puede añadir la relación
      }    
      return true; // Se puede añadir la relación
    }

    const addRelation =() =>{
      if (!checkAddRelation()) {
        return; // Detener si no se cumplen las condiciones
      }
      console.log("Añadiendo reón a: ", father.type);
      switch (father.type) {
        //case 'person':
        
        //break;
        case 'entity':
          console.log("Añadiendo relación a:", father, father.type, " con el hijo: ", selectedId, type);
          addRelationToEntity(father.id, type, selectedId); // Llama al método del contexto
          break;
        case 'product':
          console.log("Añadiendo relación a:", father, father.type, " con el hijo: ", selectedId, type);
          addRelationToProduct(father.id, type, selectedId); // Llama al método del contexto
          break;
        default:
          break;
      }
    }
      

    

  return (
    <div className="related-object">
      {/* Título centrado */}
      <div className="related-header">
        <h3 className="related-title">{title}</h3>
      </div>

      {/* Selector para añadir relaciones */}
      {(user?.role === 'writer' && !isView) && (
        <div className="related-add">
          <select
            value={selectedId}
            onChange={(e) => setSelectedId(e.target.value)}
            className="related-select"
          >
            <option value="">Seleccionar {type === 'persons' ? 'persona' : 'entidad'}</option>
            {options.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name || `ID: ${option.id}`}
              </option>
            ))}
          </select>
          <button onClick={addRelation} className="related-add-button">
            Añadir
          </button>
        </div>
      )}

      {/* Encabezado de las columnas */}
      <div className="related-columns-header">
        <div className="related-column-id">ID</div>
        <div className="related-column-name">Nombre</div>
      </div>

      {/* Lista de objetos relacionados */}
      <div className="related-list">
        {relatedObjects
            .map((object) => (
            <RowRelated
                key={object.id}
                type={type}
                object={object}
                father={father}
                />
            ))}
        </div>
    </div>
  );
};

export default RelatedSection;