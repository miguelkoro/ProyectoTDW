import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { DataContext } from '../context/DataContext'; // Importa el contexto
import '../styles/index.scss'; // Archivo CSS para estilos
import RelatedSection from '../components/RelatedSection'; // Importa el componente de objetos relacionados
import loadingGif from '../assets/images/Loading.gif';
import Error from './Error'; // Importa el componente de error



const ObjectView = (props) => {
  const { type, id } = useParams(); // Obtén el tipo y el id desde la URL
  const [object, setObject] = useState(null); // Estado para el objeto
  const { getProductById, getPersonById, getEntityById, getAssociationById, persons, entities} = useContext(DataContext); // Accede al método getObjectById del contexto

  const [error, setError] = useState(false); // Estado para manejar errores

  const [relatedPersons, setRelatedPersons] = useState([]);
  const [relatedEntities, setRelatedEntities] = useState([]);

  const [isLoading, setIsLoading] = useState(true); // Estado de carga

  useEffect(() => {
    setIsLoading(true); // Inicia la carga
    async function fetchObject() {
      try {
        setRelatedPersons([]);
        setRelatedEntities([]);
        let fetchedObject = null;
        switch (type) {
          case 'person':fetchedObject = await getPersonById(id); break;
          case 'entity':fetchedObject = await getEntityById(id);break;
          case 'product':fetchedObject = await getProductById(id);break;
          case 'association':fetchedObject = await getAssociationById(id);break;
          default: console.error(`Tipo no válido: ${type}`); break;
        }
  
        if (fetchedObject) {setObject(fetchedObject); // Guarda el objeto en el estado
        } else {
          console.error(`No se encontró un objeto con ID ${id} y tipo ${type}`);
          setObject(null); // Establece el estado como null si no se encuentra el objeto
          setError(true); // Establece el error a true
        }
      } catch (error) {
        console.error('Error al obtener el objeto:', error);
        setObject(null); // Maneja errores estableciendo el estado como null
        setError(true); // Establece el error a true
      } 
    }
  
    fetchObject(); // Llama a la función para obtener el objeto
  }, [id,type]);
  
  useEffect(() => {
    fetchRelatedObjects(); // Llama a la función para obtener los objetos relacionados
  }, [object]); // Dependencias necesarias


  const fetchRelatedObjects = async () => {
    if (!object) return; // Asegúrate de que `object` esté cargado antes de continuar
    try {
      if (object?.persons) {
        /*const persons = await Promise.all(object.persons.map((personId) => getPersonById(personId)) );*/
        const relatedPersonsData = await Promise.all(object.persons.map((personId) => {
          const person = persons.find((p) => p.id === personId); // Busca la persona en el array de personas
          return person ? person : getPersonById(personId); // Si la persona ya está en el array, la devuelve, de lo contrario, la obtiene por ID
        }));
        setRelatedPersons(relatedPersonsData);
      }
      if (object?.entities) {
        /*const entities = await Promise.all(object.entities.map((entityId) => getEntityById(entityId)) );*/
        const relatedEntitiesData = await Promise.all(object.entities.map((entityId) => {
          const entity = entities.find((e) => e.id === entityId); // Busca la entidad en el array de entidades
          return entity ? entity : getEntityById(entityId); // Si la entidad ya está en el array, la devuelve, de lo contrario, la obtiene por ID
        }));
        setRelatedEntities(relatedEntitiesData);
      }
    } catch (error) {
      console.error("Error al obtener objetos relacionados:", error);
    }finally {
      setIsLoading(false); // Finaliza la carga
    }
  };

  if (error) {
    return <Error message="No se encontró el objeto." />; // Muestra un mensaje de error si no se encuentra el objeto
  }

  if (isLoading) {
    return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" , width:"100vw"}}>
      <img src={loadingGif} alt="Cargando..." style={{ height: "5rem" , margin:"0 auto"}} />
    </div>
    ); // Muestra un spinner de carga
  }



 
  return (
    <>
    <div className="object-panel">
    {/* Fila principal: Título centrado y ID a la derecha */}
    <div className="object-header">
      <h1 className="object-title">{object.name}</h1>
      <span className="object-id">ID: {id}</span>
    </div>
    <hr className="object-divider" />
    {/* Contenedor de columnas */}
    <div className="object-content">
      {/* Columna izquierda: Imagen */}
      <div className="object-image-column">
        <img className="object-image" src={object.imageUrl} alt={object.name} />
      </div>

      {/* Columna derecha: Detalles */}
      <div className="object-details-column">
        <div className="object-detail-row">
          <strong>{type === "person" ? "Nacimiento" : "Creacion"}:</strong>
          <span>{new Date(object.birthDate).toLocaleDateString()}</span>
        </div>
        <div className="object-detail-row">
          <strong>{type === "person" ? "Fallecimiento" : "Descontinuacion"}:</strong>
          <span>{new Date(object.deathDate).toLocaleDateString()}</span>
        </div>
        <div className="object-detail-row">
          <strong>URL a la Wiki:</strong>
          <span>
            <a href={object.wikiUrl} target="_blank" rel="noopener noreferrer">
              {object.wikiUrl}
            </a>
          </span>
        </div>
      </div>
    </div>
    <hr className="object-divider" />

    {/* Contenedor de columnas para entidades y personas relacionadas */}
    <div className="related-columns">
      {relatedPersons.length > 0 && (
        <div className={`related-column ${relatedEntities.length === 0 ? 'single-column' : ''}`}>
          <RelatedSection type="persons" relatedObjects={relatedPersons} father={object} fatherType={type}/>
        </div>
      )}
      {relatedEntities.length > 0 && (
        <div className={`related-column ${relatedPersons.length === 0 ? 'single-column' : ''}`}>
          <RelatedSection type="entities" relatedObjects={relatedEntities} father={object} fatherType={type}/>
        </div>
      )}
    </div>
  </div>
  </>
  );
};

export default ObjectView;