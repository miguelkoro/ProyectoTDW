import React from 'react';
import './Card.css'; // Archivo CSS para estilos

const Card = ({object}) => {
  return (
    <div className="card">
      <img className="card-image" src={object.image} alt={object.name}></img>
      <h2 className='card-title' >{object.name}</h2>
      
    </div>
  );
}
export default Card;