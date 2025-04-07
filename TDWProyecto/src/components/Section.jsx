import React from 'react';
import './Section.css'; // Archivo CSS para estilos
import Card from './Card.jsx'; // Importa el componente de sección pequeña
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate para redirección



const Section = ({title, objects = []}) => {
  const { user } = useAuth(); // Obtén el usuario autenticado del contexto
  const navigate = useNavigate(); // Hook para redirigir

  const handleNewClick = () => {
    // Aquí puedes implementar la lógica para crear un nuevo objeto
    navigate(`/new/${title} `); // Redirige a la página de creación de nuevo objeto
    console.log("Crear nuevo objeto:", title);
  }

  return (
    <div className="section-container">
      <div className="section-header">
        <h1 className="section-title">{title}</h1>
        {user?.role === "writer" && ( // Solo muestra el botón si el usuario ha iniciado sesión y es writer //user? se usa para que si es null, lo ponga como undefined en vez de dar error
          <button className="new-button" onClick={handleNewClick}>
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