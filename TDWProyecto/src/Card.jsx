import React from 'react';
import './Card.css'; // Archivo CSS para estilos

const Card = () => {
  return (
    <div className="card">
      <img className="card-image" src="./assets/images/CSS.png" alt="Imagen Ejemplo"></img>
      <h2 className='card-title' >Ejemplo Titulo</h2>
      <p className='card-description'>Descripcion sobre la entidad, persona o empresa del ejemplo</p>
    </div>
  );
}
export default Card;