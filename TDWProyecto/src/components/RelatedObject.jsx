import React from 'react';
import './RelatedObject.css'; // Archivo CSS para estilos

const RelatedObject = ({ title, objects = [] }) => {
    //console.log("Objetos relacionados:", objects); // Verifica los objetos relacionados
  return (
    <div className="related-object">
      {/* Título centrado */}
      <div className="related-header">
        <h3 className="related-title">{title}</h3>
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
            </div>
            ))}
        </div>
    </div>
  );
};

export default RelatedObject;