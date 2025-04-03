import React from 'react';
import { useLocation } from 'react-router-dom';

const ObjectView = () => {
  const location = useLocation(); //accede al estado enviado desde la navegación
  const { object } = location.state || {}; // Obtén el objeto del estado

  if (!object) { // Si no hay objeto, muestra un mensaje de error
    return <p>No se encontró el objeto.</p>;
  }

  return (
    <div>
      <h1>{object.name}</h1>
      <img src={object.image} alt={object.name} />
      <p>ID: {object.id}</p>
      {/* Agrega más detalles del objeto aquí */}
    </div>
  );
};

export default ObjectView;