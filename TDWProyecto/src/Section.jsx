import React from 'react';
import './Section.css'; // Archivo CSS para estilos
import Card from './Card'; // Importa el componente de sección pequeña



const Section = ({title, objects = []}) => {
  return (
    <div className="section-container">
      <h1 className="section-title">{title}</h1>
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