import React from 'react';
import './Section.css'; // Archivo CSS para estilos
import Card from './Card'; // Importa el componente de sección pequeña

const Section = () => {
  return (
    <div className="section-container">
      <h1 className="section-title">Ejemplo de Sección</h1>
      <div className="card-wrapper">
        <Card />
        <Card />

        <Card />
        <Card />
        <Card />

        <Card />
        <Card />
        <Card />

        <Card />
      </div>
      <hr className='section-hr'/>
    </div>
    
  );
};

export default Section;