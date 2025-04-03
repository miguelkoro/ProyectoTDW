import React from 'react';
import './ObjectView.css'; // Archivo CSS para estilos

const ObjectView = ({ object }) => {
  return (
    <div className="object-view">
      {/* Encabezado con la imagen y la información principal */}
      <div className="object-header">
        <img className="object-image" src={object.image} alt={object.name} />
        <div className="object-info">
          <h1 className="object-name">{object.name}</h1>
          <p className="object-dates">
            {object.birth} - {object.death}
          </p>
          <a
            className="object-wiki"
            href={object.wiki}
            target="_blank"
            rel="noopener noreferrer"
          >
            Ver en Wikipedia
          </a>
        </div>
      </div>

      {/* Listas de personas y entidades */}
      <div className="object-lists">
        <div className="object-list entities-list">
          <h2>Entidades</h2>
          <ul>
            {object.entities.map((entity, index) => (
              <li key={index}>{entity}</li>
            ))}
          </ul>
        </div>
        <div className="object-list persons-list">
          <h2>Personas</h2>
          <ul>
            {object.persons.map((person, index) => (
              <li key={index}>{person}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ObjectView;