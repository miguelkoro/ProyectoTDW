import React from 'react';
import '../styles/Section.css'; // Archivo CSS para estilos
import Card from './Card.jsx'; // Importa el componente de sección pequeña
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate para redirección



const Section = (props) => {
  const { user } = useAuth(); // Obtén el usuario autenticado del contexto
  const navigate = useNavigate(); // Hook para redirigir

  const handleNewClick = () => {
    let newTitle;
    switch (props.title) {
      case "Personas":
        newTitle = "person";
        break;
      case "Entidades":
        newTitle = "entity";
        break;
      case "Productos":
        newTitle = "product";
        break;
      default:
        newTitle = props.title; // Si no coincide con ninguno, usa el título original
    }
    // Aquí puedes implementar la lógica para crear un nuevo objeto
    navigate(`/new/${newTitle} `, {state:{new:true}}); // Redirige a la página de creación de nuevo objeto
    //console.log("Crear nuevo objeto:", title);
  }

  return (
    <div className="section-container">
      <div className="section-header">
        <h1 className="section-title">{props.title}</h1>
        {user?.role === "writer" && ( // Solo muestra el botón si el usuario ha iniciado sesión y es writer //user? se usa para que si es null, lo ponga como undefined en vez de dar error
          <button className="new-button" onClick={handleNewClick}>
            Nuevo
          </button>
        )}
      </div>
      <div className="card-wrapper">
        {props.objects.map((object) => (
          <Card key={object.id} object={object} />
          
        ))}
        
      </div>
      <hr className='section-hr'/>
    </div>
    
  );
};

export default Section;