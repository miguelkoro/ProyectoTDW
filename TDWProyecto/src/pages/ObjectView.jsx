import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { DataContext } from '../context/DataContext'; // Importa el contexto
import './ObjectView.css'; // Archivo CSS para estilos
import RelatedObject from '../components/RelatedObject'; // Importa el componente de objetos relacionados

import Objeto from '../models/Objeto'; // Importa las clases de modelos


const ObjectView = () => {
  const location = useLocation(); //accede al estado enviado desde la navegación
  const { type, id } = useParams(); // Obtén el tipo y el id desde la URL
  const { object } = location.state || {}; // Obtén el objeto del estado
  const { getObject } = useContext(DataContext); // Accede al método getObjectById del contexto
  const [relatedPersons, setRelatedPersons] = useState([]);
  const [relatedEntities, setRelatedEntities] = useState([]);

  const [isLoading, setIsLoading] = useState(true); // Estado de carga

  //console.log("ObjectView", object); // Verifica el objeto recibido
  //console.log("", object.getType()); // Verifica el tipo de objeto
  //console.log("Objeto recibido en ObjectView:", object);
  //console.log("getObjectById:", getObject);

  useEffect(() => {
    const fetchRelatedObjects = async () => {
      try {
        if (object?.persons) {
          // Espera a que todas las promesas se resuelvan
          const persons = await Promise.all(
            object.persons.map((personId) => getObject(personId, 'Persona'))
          );
          setRelatedPersons(persons);
        }
        if (object?.entities) {
          const entities = await Promise.all(
            object.entities.map((entityId) => getObject(entityId, 'Entidad'))
          );
          setRelatedEntities(entities);
        }
      } catch (error) {
        console.error('Error al obtener objetos relacionados:', error);
      } finally {
        setIsLoading(false); // Finaliza la carga
      }
    };

    fetchRelatedObjects();
  }, [object, getObject]);

  if (isLoading) {
    //return <p>Cargando datos relacionados...</p>; // Muestra un mensaje de carga
  }

  if (!object) {
    return <p>No se encontró el objeto.</p>;
  }


  if (!object) {
    return <p>No se encontró el objeto.</p>;
  }

  // Determinar el tipo de objeto usando el método getType
  /*const objectType = object.getType();*/

   // Determinar las etiquetas dinámicamente según el tipo de objeto
    const birthLabel = type === 'Persona' ? 'Nacimiento' : 'Creación';
    const deathLabel = type === 'Persona' ? 'Fallecimiento' : 'Descontinuación';

  return (
    <div className="object-view-panel">
    {/* Fila principal: Título centrado y ID a la derecha */}
    <div className="object-header">
      <h1 className="object-title">{object.name}</h1>
      <span className="object-id">ID: {id}</span>
    </div>
    <hr className="object-divider" />
    {/* Contenedor de columnas */}
    <div className="object-content">
      {/* Columna izquierda: Imagen */}
      <div className="object-image-column">
        <img className="object-image" src={object.imageUrl} alt={object.name} />
      </div>

      {/* Columna derecha: Detalles */}
      <div className="object-details-column">
        <div className="object-detail-row">
          <strong>{birthLabel}:</strong>
          <span>{new Date(object.birthDate).toLocaleDateString()}</span>
        </div>
        <div className="object-detail-row">
          <strong>{deathLabel}:</strong>
          <span>{new Date(object.deathDate).toLocaleDateString()}</span>
        </div>
        <div className="object-detail-row">
          <strong>URL a la Wiki:</strong>
          <span>
            <a href={object.wikiUrl} target="_blank" rel="noopener noreferrer">
              {object.wikiUrl}
            </a>
          </span>
        </div>
      </div>
    </div>
    <hr className="object-divider" />

    {/* Contenedor de columnas para entidades y personas relacionadas */}
    <div className="related-columns">
      {relatedPersons.length > 0 && (
        <div
          className={`related-column ${
            relatedEntities.length === 0 ? 'single-column' : ''
          }`}
        >
          <RelatedObject title="Personas relacionadas" objects={relatedPersons} />
        </div>
      )}
      {relatedEntities.length > 0 && (
        <div
          className={`related-column ${
            relatedPersons.length === 0 ? 'single-column' : ''
          }`}
        >
          <RelatedObject title="Entidades relacionadas" objects={relatedEntities} />
        </div>
      )}
    </div>
  </div>
  );
};

export default ObjectView;