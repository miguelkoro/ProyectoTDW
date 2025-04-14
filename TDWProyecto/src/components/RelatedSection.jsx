import React, { useState, useContext, useEffect } from 'react';
import './RelatedSection.css'; // Archivo CSS para estilos
import { useAuth } from '../context/AuthContext'; // Importa el contexto de autenticación
import { DataContext } from '../context/DataContext'; // Importa el DataContext
//import { RowRelated} from './RowRelated';
import RowRelated from './RowRelated'; // Importa el componente de fila relacionada
import { useLocation } from 'react-router-dom'; // Importa useLocation para obtener la ubicación actual

const RelatedSection = ({ type, relatedObjects = [], father, fatherType, onAddRelation}) => {
    //console.log("Objetos relacionados:", objects); // Verifica los objetos relacionados
    const { user } = useAuth(); // Obtén el usuario autenticado del contexto
    const { persons, entities } = useContext(DataContext); // Obtén datos y método del contexto
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
    setLocalRelatedObjects(relatedObjects);
    console.log('Objetos relacionados actualizados:', relatedObjects); // Depuración
  }, [localRelatedObjects]);

    const handleAddRelation = () => {
     /* if (!selectedId) {
        console.log('No se seleccionó un ID'); // Depuración
        return; // No hacer nada si no se seleccionó un ID
      }
      
      console.log('Añadiendo relación:', selectedId, 'tipo: ', type); // Ahora puedes usar selectedObject
    
      
      const relationAdded = addRelation(father.id, fatherType, type, selectedId); // Llama al método del contexto
      if (relationAdded) {
        console.log('Relación añadida correctamente:', selectedId);
    
        // Busca el objeto completo en relatedObjects
        const relatedObject = relatedObjects.find((object) => object.id === parseInt(selectedId));
        console.log('Obffjeto relacionado añadido:', relatedObject);
        // Llama a onAddRelation con el objeto completo
        if (relatedObject && onAddRelation) {
          onAddRelation(relatedObject);
          console.log('Objeto relacionado añadido:', relatedObject);
        }
      } else {
        console.log('La relación ya existe, no se añadió.');
      }*/
        //setRelatedObjects((prevRelatedObjects) => [...prevRelatedObjects, selectedObject]);
      
    };
      

    

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
          <button onClick={handleAddRelation} className="related-add-button">
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
            .filter((object) => object && object.id) // Filtra objetos válidos
            .map((object) => (
            <RowRelated
                key={object.id}
                type={type}
                object={object}
                father={father}
                fatherType={fatherType}
                />
            ))}
        </div>
    </div>
  );
};

export default RelatedSection;