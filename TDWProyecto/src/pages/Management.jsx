import React from 'react';
import '../styles/Section.css'; // Archivo CSS para estilos
import Card from '../components/Card.jsx'; // Importa el componente de sección pequeña
import CardUser from '../components/CardUser.jsx'; // Importa el componente de sección pequeña
import { useAuth } from '../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate para redirección
import { useContext, useEffect, useState } from 'react';
import { DataContext } from '../context/DataContext';


const Management = (props) => {
  const { user } = useAuth(); // Obtén el usuario autenticado del contexto
  const navigate = useNavigate(); // Hook para redirigir
  const typeFromState =  location.pathname.split('/')[2];
  const [objects, setObjects] = useState([]); 

  const { persons, entities, products, associations, users, 
    getPersons, getEntities, getProducts, getAssociations, getUsers} = useContext(DataContext); 
      //Aquí, los datos (persons, entities, products) se obtienen directamente del contexto.
      /*useEffect(() => {
        getPersons(); // Llama a la función para obtener personas
        getEntities(); // Llama a la función para obtener entidades
        getProducts(); // Llama a la función para obtener productos
        getAssociations(); // Llama a la función para obtener asociaciones
        if (user && user?.scope === "writer") getUsers(); // Llama a la función para obtener usuarios
      }, []);*/
// Función para obtener los datos según el tipo
const fetchObjects = async () => {
  /*switch (typeFromState) {
    case 'persons':
      await getPersons(); // Llama a la función para obtener personas
      setObjects(persons); // Actualiza el estado con las personas
      break;
    case 'entities':
      await getEntities(); // Llama a la función para obtener entidades
      setObjects(entities); // Actualiza el estado con las entidades
      break;
    case 'products':
      await getProducts(); // Llama a la función para obtener productos
      setObjects(products); // Actualiza el estado con los productos
      break;
    case 'associations':
      await getAssociations(); // Llama a la función para obtener asociaciones
      setObjects(associations); // Actualiza el estado con las asociaciones
      break;
    case 'users':
      await getUsers(); // Llama a la función para obtener usuarios
      setObjects(users); // Actualiza el estado con los usuarios
      break;
    default:
      setObjects([]); // Si no hay tipo válido, establece un array vacío
      break;
  }*/
};

  const handleNewClick = () => {
    
    // Aquí puedes implementar la lógica para crear un nuevo objeto
    //navigate(`/new/${props.type} `, {state:{new:true}}); // Redirige a la página de creación de nuevo objeto
    //console.log("Crear nuevo objeto:", title);
  }

  useEffect(() => {
    //fetchObjects(); // Llama a la función para obtener los datos
  }, [typeFromState, persons, entities, products, associations, users]); // Incluye todas las dependencias relevantes


  if (!objects || objects.length === 0) {
    return <p>No hay datos disponibles para mostrar.</p>; // Muestra un mensaje si no hay datos
  }

  return (
    <div className="section-container">
      <div className="section-header">
        <h1 className="section-title">{typeFromState}</h1>
        {(user?.scope === "writer" && typeFromState!=="user") && ( // Solo muestra el botón si el usuario ha iniciado sesión y es writer //user? se usa para que si es null, lo ponga como undefined en vez de dar error
          <button className="new-button" onClick={handleNewClick}>
            Nuevo
          </button>
        )}
      </div>
      <div className="card-wrapper">
        {objects.map((object) => (
          typeFromState!== "user" ? <Card key={object.id} object={object} />
          : <CardUser key={object.id} object={object} /> // Si no hay tipo, muestra el card sin importar el tipo
        ))}
        
      </div>
    </div>
    
  );
};

export default Management;