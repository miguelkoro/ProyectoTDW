import React from 'react';
import './Section.css'; // Archivo CSS para estilos
import Card from './Card.jsx'; // Importa el componente de sección pequeña



const Section = ({title, objects = []}) => {
  return (
    <div className="section-container">
      <div className="section-header">
        <h1 className="section-title">{title}</h1>
        <button className="new-button" >
          Nuevo
        </button>
      </div>
      <div className="card-wrapper">
        {objects.map((object) => (
          <Card key={object.id} object={object} />
          
        ))}
        
      </div>
      <hr className='section-hr'/>
    </div>
    
  );
};

export default Section;