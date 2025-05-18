import '../styles/index.scss'; // Archivo CSS para estilos
import Card from '../components/Card.jsx'; // Importa el componente de sección pequeña
import CardUser from '../components/CardUser.jsx'; // Importa el componente de sección pequeña
import { useAuth } from '../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate para redirección
import { useContext, useEffect, useState } from 'react';
import { DataContext } from '../context/DataContext';
import loadingGif from '../assets/images/Loading.gif';


const Management = (props) => {
  const { user } = useAuth(); // Obtén el usuario autenticado del contexto
  const navigate = useNavigate(); // Hook para redirigir
  const typeFromState =  location.state?.type || location.pathname.split('/')[2];
  const [objects, setObjects] = useState([]); 
  const [title, setTitle] = useState(''); // Estado para el título
  const [type, setType] = useState(''); // Estado para el tipo
  const [showNoData, setShowNoData] = useState(false); 
  const { persons, entities, products, associations, users, isLoading,
    getPersons, getEntities, getProducts, getAssociations, getUsers} = useContext(DataContext); 

  // Llama a las funciones de obtención al montar el componente
  /*useEffect(() => {
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
  }, [typeFromState]);*/

  
  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => {
        setShowNoData(true); // Activa el estado después del retraso
      }, 100); // Retraso de 300 ms

      return () => clearTimeout(timer); // Limpia el temporizador si el componente se desmonta o `isLoading` cambia
    } else {
      setShowNoData(false); // Reinicia el estado si vuelve a cargarse
    }
    console.log("isLoading", isLoading); // Muestra el estado de carga en la consola

  }, [objects, isLoading]);

  // Observa los cambios en las variables del contexto y actualiza el estado `objects`
  useEffect(() => {
    switch (typeFromState) {
      case 'persons':
        setObjects(persons || []); // Actualiza el estado con las personas
        setTitle('🪠 PERSONAS'); // Establece el título para personas
        setType('person'); // Establece el tipo para personas
        break;
      case 'entities':
        setObjects(entities || []); // Actualiza el estado con las entidades
        setTitle('🧸 ENTIDADES'); // Establece el título para entidades
        setType('entity'); // Establece el tipo para entidades
        break;
      case 'products':
        setObjects(products || []); // Actualiza el estado con los productos
        setTitle('💡 PRODUCTOS'); // Establece el título para productos
        setType('product'); // Establece el tipo para productos
        break;
      case 'associations':
        setObjects(associations || []); // Actualiza el estado con las asociaciones
        setTitle('🔥 ASOCIACIONES'); // Establece el título para asociaciones
        setType('association'); // Establece el tipo para asociaciones
        break;
      case 'users':
        setObjects(users || []); // Actualiza el estado con los usuarios
        setTitle('👥 USUARIOS'); // Establece el título para usuarios
        setType('user'); // Establece el tipo para usuarios
        break;
      default:
        setObjects([]); // Si no hay tipo válido, establece un array vacío
        break;
    }
  }, [typeFromState, persons, entities, products, associations, users]);

  const handleNewClick = () => {
    // Aquí puedes implementar la lógica para crear un nuevo objeto
    navigate(`/new/${type}`, {state:{new:true}}); // Redirige a la página de creación de nuevo objeto
    //console.log("Crear nuevo objeto:", title);
  }



  return (
  <div className="section-container-management">
    <div className="section-header">
      <h1 className="section-title-management">{title}</h1>
      {(user?.scope === "writer" && typeFromState !== "users") && (
        <button className="new-button" onClick={handleNewClick}> Nuevo </button>
      )}
    </div>

    {isLoading ? (
      <div className="centered-container" style={{display:"flex", justifyContent: "center", }}>
        <img src={loadingGif} alt="Cargando..." className="loading-image" style={{ maxWidth: '10rem' }} />
      </div>
    ) : showNoData && objects  && objects.length ===0 ? (
      <div className="centered-container" style={{display:"flex", justifyContent: "center", }}>
        <div style={{ margin: '0 auto', display: "flex", flexDirection: "column", alignItems:"center" }}>
          <p style={{fontSize:"1.4rem"}}> No hay datos disponibles.</p>
          <img src="./assets/images/SinDatos.jpg"  style={{ maxWidth: '14rem', borderRadius: '1rem' }}
            alt="No hay datos disponibles" className="empty-image" />
          <p style={{ fontSize:"1rem" }}>Yo los había ponido aquí</p>
        </div>
      </div>
    ) : (
      <div className="card-management-wrapper">
        {objects.map((object) => typeFromState !== "users" ? ( <Card key={object.id} object={object} />
          ) : (<CardUser key={object.id} object={object} />))}
      </div>
    )}
  </div>
    
  );
};

export default Management;