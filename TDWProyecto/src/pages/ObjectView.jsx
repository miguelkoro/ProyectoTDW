import React, { useEffect, useState, useContext, use } from 'react';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { DataContext } from '../context/DataContext'; // Importa el contexto
import '../styles/ObjectView.css'; // Archivo CSS para estilos
import RelatedSection from '../components/RelatedSection'; // Importa el componente de objetos relacionados




const ObjectView = (props) => {
  const { type, id } = useParams(); // Obtén el tipo y el id desde la URL
  const [object, setObject] = useState(null); // Estado para el objeto
  const { getProductById, getPersonById, getEntityById, getAssociationById} = useContext(DataContext); // Accede al método getObjectById del contexto


  const [relatedPersons, setRelatedPersons] = useState([]);
  const [relatedEntities, setRelatedEntities] = useState([]);

  const [isLoading, setIsLoading] = useState(true); // Estado de carga

  //console.log("ObjectView", object); // Verifica el objeto recibido
  //console.log("", object.getType()); // Verifica el tipo de objeto
  //console.log("Objeto recibido en ObjectView:", type);
  //console.log("getObjectById:", getObject);

  useEffect(() => {
    setIsLoading(true); // Inicia la carga
    async function fetchObject() {
      try {
        let fetchedObject = null;
        //console.log("fetchObject", type, id); // Verifica el tipo y el id
        // Realiza el fetch según el tipo
        switch (type) {
          case 'person':fetchedObject = await getPersonById(id); break;
          case 'entity':fetchedObject = await getEntityById(id);break;
          case 'product':fetchedObject = await getProductById(id);break;
          case 'association':fetchedObject = await getAssociationById(id);break;
          default: console.error(`Tipo no válido: ${type}`); break;
        }
  
        if (fetchedObject) {
          setObject(fetchedObject); // Guarda el objeto en el estado
          //console.log('Objeto obtenido:', fetchedObject); // Verifica el objeto obtenido
        } else {
          console.error(`No se encontró un objeto con ID ${id} y tipo ${type}`);
          setObject(null); // Establece el estado como null si no se encuentra el objeto
        }
      } catch (error) {
        console.error('Error al obtener el objeto:', error);
        setObject(null); // Maneja errores estableciendo el estado como null
      } finally {
        setIsLoading(false); // Finaliza la carga
      }
    }
  
    fetchObject(); // Llama a la función para obtener el objeto
  }, []);
  
  useEffect(() => {
    const fetchRelatedObjects = async () => {
      if (!object) return; // Asegúrate de que `object` esté cargado antes de continuar
  
      //console.log("fetchRelatedObjects", object); // Verifica el objeto recibido
      try {
        if (object?.persons) {
          // Espera a que todas las promesas se resuelvan
          const persons = await Promise.all(
            object.persons.map((personId) => getPersonById(personId))
          );
          setRelatedPersons(persons);
          //console.log("Personas relacionadas:", persons); // Verifica las personas relacionadas
        }
        if (object?.entities) {
          const entities = await Promise.all(
            object.entities.map((entityId) => getEntityById(entityId))
          );
          setRelatedEntities(entities);
        }
      } catch (error) {
        console.error("Error al obtener objetos relacionados:", error);
      }
    };
  
    fetchRelatedObjects(); // Llama a la función para obtener los objetos relacionados
  }, [object, getPersonById, getEntityById, getAssociationById]); // Dependencias necesarias


  if (!object) {
    return <p>No se encontró el objeto.</p>;
  }

 
  return (
    <>
    <div className="object-view-panel">
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
        <div
          className={`related-column ${
            relatedEntities.length === 0 ? 'single-column' : ''
          }`}
        >
          <RelatedSection type="persons" relatedObjects={relatedPersons} father={object} fatherType={type}
            
            />
        </div>
      )}
      {relatedEntities.length > 0 && (
        <div
          className={`related-column ${
            relatedPersons.length === 0 ? 'single-column' : ''
          }`}
        >
          <RelatedSection type="entities" relatedObjects={relatedEntities} father={object} fatherType={type}
            />
        </div>
      )}
    </div>
  </div>
  </>
  );
};

export default ObjectView;