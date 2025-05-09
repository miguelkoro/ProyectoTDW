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
  const typeFromState =  location.state?.type || location.pathname.split('/')[2];
  const [objects, setObjects] = useState([]); 

  const { persons, entities, products, associations, users, 
    getPersons, getEntities, getProducts, getAssociations, getUsers} = useContext(DataContext); 

  // Llama a las funciones de obtención al montar el componente
  useEffect(() => {
    switch (typeFromState) {
      case 'persons':
        getPersons(); // Llama a la función para obtener personas
        break;
      case 'entities':
        getEntities(); // Llama a la función para obtener entidades
        break;
      case 'products':
        getProducts(); // Llama a la función para obtener productos
        break;
      case 'associations':
        getAssociations(); // Llama a la función para obtener asociaciones
        break;
      case 'users':
        getUsers(); // Llama a la función para obtener usuarios
        break;
      default:
        break;
    }
    console.log("getObjects", typeFromState); // Muestra el tipo en la consola
  }, [typeFromState]);

  // Observa los cambios en las variables del contexto y actualiza el estado `objects`
  useEffect(() => {
    switch (typeFromState) {
      case 'persons':
        setObjects(persons || []); // Actualiza el estado con las personas
        break;
      case 'entities':
        setObjects(entities || []); // Actualiza el estado con las entidades
        break;
      case 'products':
        setObjects(products || []); // Actualiza el estado con los productos
        break;
      case 'associations':
        setObjects(associations || []); // Actualiza el estado con las asociaciones
        break;
      case 'users':
        setObjects(users || []); // Actualiza el estado con los usuarios
        break;
      default:
        setObjects([]); // Si no hay tipo válido, establece un array vacío
        break;
    }
  }, [typeFromState, persons, entities, products, associations, users]);

  const handleNewClick = () => {
    // Aquí puedes implementar la lógica para crear un nuevo objeto
    navigate(`/new/${typeFromState}`, {state:{new:true}}); // Redirige a la página de creación de nuevo objeto
    //console.log("Crear nuevo objeto:", title);
  }

  return (
    <div className="section-container-management">
      <div className="section-header-management">
        <h1 className="section-title">{typeFromState}</h1>
        {(user?.scope === "writer" && typeFromState!=="users") && ( // Solo muestra el botón si el usuario ha iniciado sesión y es writer //user? se usa para que si es null, lo ponga como undefined en vez de dar error
          <button className="new-button" onClick={handleNewClick}>
            Nuevo
          </button>
        )}
      </div>
      <div className="card-management-wrapper">
        {objects.map((object) => (
          typeFromState!== "users" ? <Card key={object.id} object={object} />
          : <CardUser key={object.id} object={object} /> // Si no hay tipo, muestra el card sin importar el tipo
        ))}
        
      </div>
    </div>
    
  );
};

export default Management;