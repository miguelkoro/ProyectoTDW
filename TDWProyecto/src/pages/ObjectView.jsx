import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchPersons, fetchEntities } from '../services/dataService';
import './ObjectView.css'; // Archivo CSS para estilos

const ObjectView = () => {
  const location = useLocation(); //accede al estado enviado desde la navegación
  const { object } = location.state || {}; // Obtén el objeto del estado
  const [relatedPersons, setRelatedPersons] = useState([]);
  const [relatedEntities, setRelatedEntities] = useState([]);

  useEffect(() => {
    const loadRelatedData = async () => {
      if (object.persons) {
        const personsData = await fetchPersons();
        setRelatedPersons(personsData.filter((person) => object.persons.includes(person.id)));
      }
      if (object.entities) {
        const entitiesData = await fetchEntities();
        setRelatedEntities(entitiesData.filter((entity) => object.entities.includes(entity.id)));
      }
    };

    loadRelatedData();
  }, [object]);

  if (!object) {
    return <p>No se encontró el objeto.</p>;
  }

  return (
      <div className="object-view-panel">
        <h1>{object.name}</h1>
        <img src={object.image} alt={object.name} />
        <p>{object.description}</p>
        {relatedPersons.length > 0 && (
          <div>
            <h2>Personas relacionadas</h2>
            <ul>
              {relatedPersons.map((person) => (
                <li key={person.id}>{person.name}</li>
              ))}
            </ul>
          </div>
        )}
        {relatedEntities.length > 0 && (
          <div>
            <h2>Entidades relacionadas</h2>
            <ul>
              {relatedEntities.map((entity) => (
                <li key={entity.id}>{entity.name}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
  );
};

export default ObjectView;