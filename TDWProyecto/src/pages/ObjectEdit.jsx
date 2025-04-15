import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import '../styles/ObjectView.css'; // Reutilizamos los estilos de ObjectView
import { DataContext } from '../context/DataContext'; // Contexto para guardar datos

import  Persona  from '../models/Persona'; // Importa el modelo Persona
import  Entidad  from '../models/Entidad'; // Importa el modelo Entidad
import  Producto  from '../models/Producto'; // Importa el modelo Producto
import RelatedSection from '../components/RelatedSection'; // Importa el componente de objetos relacionados

const ObjectEdit = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { type, id } = useParams();
  const [object, setObject] = useState(null); // Estado para el objeto
  const { getProductById, getPersonById, getEntityById, 
          createNewEntity, createNewPerson, createNewProduct,
          updateEntity, updateProduct, updatePerson} = useContext(DataContext); // Accede al método getObjectById del contexto

  const [relatedPersons, setRelatedPersons] = useState([]);
  const [relatedEntities, setRelatedEntities] = useState([]);

  const [isLoading, setIsLoading] = useState(true); // Estado de carga


  const isNew= location.state?.new || false;



  // Estados para los campos del formulario
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [deathDate, setDeathDate] = useState('');
  const [wikiUrl, setWikiUrl] = useState('');
  const [imageUrl, setImageUrl] = useState(''); // Nuevo estado para la URL de la imagen


  // Determinar si es un nuevo objeto o uno existente
  //const isNew = !object;


   useEffect(() => {
    console.log("type", type); // Verifica si es un nuevo objeto
    if(isNew) return; // Si es un nuevo objeto, no hacemos nada
      async function fetchObject() {
        try {
          let fetchedObject = null;
    
          // Realiza el fetch según el tipo
          switch (type) {
            case 'person':fetchedObject = await getPersonById(id); break;
            case 'entity':fetchedObject = await getEntityById(id);break;
            case 'product':fetchedObject = await getProductById(id);break;
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

        }
      }
    
      fetchObject(); // Llama a la función para obtener el objeto
    }, [type, id, getPersonById, getEntityById, getProductById]);

  useEffect(() => {
    if (!isNew && object) {
      // Si es un objeto existente, rellenar los campos con sus datos
      setName(object.name || '');
      setBirthDate(object.birthDate  || '');
      setDeathDate(object.deathDate  || '');
      setWikiUrl(object.wikiUrl || 'null');
      setImageUrl(object.imageUrl || 'https://static.thenounproject.com/png/559530-200.png'); // Inicializar la URL de la imagen

    }
  }, [ object]);

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
    }, [object, getPersonById, getEntityById]); // Dependencias necesarias


  const saveNewObject = () => {
    let newObject;
    switch (type) {
      case 'person':
        newObject = new Persona({name,birthDate,deathDate,wikiUrl,imageUrl,type:'person'}); // Crear un nuevo objeto persona
        createNewPerson(newObject); // Guardar como persona
        break;
      case 'entity':
        newObject = new Entidad({name,birthDate,deathDate,wikiUrl,imageUrl,type:'entity'}); // Crear un nuevo objeto persona
        createNewEntity(newObject); // Guardar como entidad
        break;
      case 'product':
        newObject = new Producto({name,birthDate,deathDate,wikiUrl,imageUrl,type:'product'}); // Crear un nuevo objeto persona
        createNewProduct(newObject); // Guardar como producto
        break;
      default: break;
    }
    //saveObject(newObject); // Guardar el objeto usando el contexto
    navigate(-1); // Volver a la página anterior
  }

  const updateObject = () => {
    // Crear una copia local del objeto actualizado
  const updatedObject = { ...object, name, birthDate, deathDate, wikiUrl, imageUrl };
  console.log('Objeto actualizado:', updatedObject); // Verifica el objeto actualizado
  // Actualizar el estado con el objeto actualizado
  setObject(updatedObject);

    switch (type) {
      case 'person':       
        updatePerson(id,updatedObject); // Guardar como persona
        break;
      case 'entity':
        updateEntity(id,updatedObject); // Guardar como entidad
        break;
      case 'product':
        updateProduct(id,updatedObject); // Guardar como producto
        break;
      default: break;
    }
  }

  const newTitle = () => {
    switch (type) {
      case 'person':
        return 'Nueva Persona'; 
      case 'entity':
        return 'Nueva Entidad'; 
      case 'product':
        return 'Nuevo Producto';
      default:
        return 'Objeto';
    }
  }

  const handleSave = () => {
    isNew ? saveNewObject() : updateObject(); // Guardar o actualizar el objeto según corresponda
  };

  const handleCancel = () => {
    navigate(-1); // Volver a la página anterior sin guardar
  };

  return (
    <div className="object-view-panel">
      {/* Fila principal: Título centrado y ID a la derecha */}
      <div className="object-header">
        <h1 className="object-title">{isNew ? `${newTitle()}` : `Editar ${type || 'Objeto:'}: ${name}`}</h1>
        <span className="object-id">ID: {isNew ? '?' : id}</span>
      </div>
      <hr className="object-divider" />
      {/* Contenedor de columnas */}
      <div className="object-content">
        {/* Columna izquierda: Imagen */}
        <div className="object-image-column">
          <img
            className="object-image"
            src={imageUrl || 'https://static.thenounproject.com/png/559530-200.png'}
            alt={name || 'Nuevo Objeto'}
          />
          <input
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Introduce la URL de la imagen"
            className="image-url-input"
          />
        </div>


        {/* Columna derecha: Detalles */}
        <div className="object-details-column">
          <div className="object-detail-row">
            <strong>Nombre:</strong>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Introduce el nombre"
            />
          </div>
          <div className="object-detail-row">
            <strong>{type === "person" ? "Nacimiento" : "Creacion"}:</strong>
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
            />
          </div>
          <div className="object-detail-row">
            <strong>{type === "person" ? "Muerte" : "Descontinuacion"}:</strong>
            <input
              type="date"
              value={deathDate}
              onChange={(e) => setDeathDate(e.target.value)}
            />
          </div>
          <div className="object-detail-row">
            <strong>URL a la Wiki:</strong>
            <input
              type="url"
              value={wikiUrl}
              onChange={(e) => setWikiUrl(e.target.value)}
              placeholder="Introduce la URL"
            />
          </div>
        </div>
      </div>
      <hr className="object-divider" />

      {/* Botones de acción */}
      <div className="object-actions">
        <button className="cancel-button" onClick={handleCancel}>
          Cancelar
        </button>
        <button className="save-button" onClick={handleSave}>
          Guardar
        </button>
      </div>
      <div className="related-columns">
      {(type==="product") && (
        <div
          className={`related-column ${
            relatedEntities.length === 0 ? 'single-column' : ''
          }`}
        >
          <RelatedSection type="persons" relatedObjects={relatedPersons} father={object} fatherType={type}
            
            />
        </div>
      )}
      {(type==="product" || type === "entity") && (
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
  );
};

export default ObjectEdit;