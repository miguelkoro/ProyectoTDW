import React from 'react';
import './Section.css'; // Archivo CSS para estilos
import Card from './Card.jsx'; // Importa el componente de sección pequeña
import { useAuth } from '../context/AuthContext';



const Section = ({title, objects = []}) => {
  const { user } = useAuth(); // Obtén el usuario autenticado del contexto
  //console.log("Section", objects); // Verifica los objetos recibidos
  //console.log("", objects[0]); // Verifica el tipo de objeto
  //console.log("¿getType está disponible?", typeof objects[0].getType === "function");
  /*console.log("Objeto recibido en Section:", objects[0]);
  if (objects[0]) {
    console.log("¿getType está disponible?", typeof objects[0].getType === "function");
    console.log("Tipo del objeto:", objects[0].getType ? objects[0].getType() : "No es una instancia válida");
  }*/

  return (
    <div className="section-container">
      <div className="section-header">
        <h1 className="section-title">{title}</h1>
        {user?.role === "writer" && ( // Solo muestra el botón si el usuario ha iniciado sesión y es writer //user? se usa para que si es null, lo ponga como undefined en vez de dar error
          <button className="new-button">
            Nuevo
          </button>
        )}
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