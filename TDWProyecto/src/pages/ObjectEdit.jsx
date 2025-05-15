import { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import '../styles/index.scss'; // Reutilizamos los estilos de ObjectView
import { DataContext } from '../context/DataContext'; // Contexto para guardar datos
import loadingGif from '../assets/images/Loading.gif';
import Error from './Error'; // Importa el componente de error
import Objeto from '../models/Objeto'; // Importa el modelo Objeto
import RelatedSection from '../components/RelatedSection'; // Importa el componente de objetos relacionados

const ObjectEdit = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { type, id } = useParams();
  const [object, setObject] = useState(null); // Estado para el objeto
  const { getProductById, getPersonById, getEntityById, getAssociationById,
          createObject, updateObject, addRemRelation, persons, entities,
          } = useContext(DataContext); // Accede al método getObjectById del contexto

  const [relatedPersons, setRelatedPersons] = useState([]);
  const [relatedEntities, setRelatedEntities] = useState([]);

  const [isLoading, setIsLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(false); // Estado para manejar errores
  const [nameError, setNameError] = useState(false); // Estado para el error de nombre

  const isNew= location.pathname.includes("new"); // Verifica si es un nuevo objeto

  // Estados para los campos del formulario
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [deathDate, setDeathDate] = useState('');
  const [wikiUrl, setWikiUrl] = useState('');
  const [imageUrl, setImageUrl] = useState(''); // Nuevo estado para la URL de la imagen


   useEffect(() => {
    if(isNew){ setIsLoading(false); return}; // Si es un nuevo objeto, no hacemos nada    
      fetchObject(); // Llama a la función para obtener el objeto
    }, []);

    const fetchObject = async () => {
      try {
        setIsLoading(true); // Inicia la carga
        let fetchedObject = null;
        switch (type) {
          case 'person':fetchedObject = await getPersonById(id); break;
          case 'entity':fetchedObject = await getEntityById(id);break;
          case 'product':fetchedObject = await getProductById(id);break;
          case 'association':fetchedObject = await getAssociationById(id);break;
          default: console.error(`Tipo no válido: ${type}`); break;
        }
        if (fetchedObject) {
          await setfetchObject(fetchedObject); // Llama a la función para establecer los datos del objeto
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

    const setfetchObject = async (fetchedObject) => {
        setObject(fetchedObject); // Guarda el objeto en el estado
        setName(fetchedObject.name || '');
        setBirthDate(fetchedObject.birthDate  || '');
        setDeathDate(fetchedObject.deathDate  || '');
        setWikiUrl(fetchedObject.wikiUrl || 'null');
        setImageUrl(fetchedObject.imageUrl || 'https://static.thenounproject.com/png/559530-200.png'); // Inicializar la URL de la imagen      
    }

    const fetchRelatedObjects = async () => {       
      if (!object) return; // Asegúrate de que `object` esté cargado antes de continuar
      try {
        if (object?.persons) {        
          const relatedPersonsData = await Promise.all(object.persons.map((personId) => {
            const person = persons.find((p) => p.id === personId); // Busca la persona en el array de personas
            return person ? person : getPersonById(personId); // Si la persona ya está en el array, la devuelve, de lo contrario, la obtiene por ID
          }));
          setRelatedPersons(relatedPersonsData);
        }
        if (object?.entities) {          
          const relatedEntitiesData = await Promise.all(object.entities.map((entityId) => {
            const entity = entities.find((e) => e.id === entityId); // Busca la entidad en el array de entidades
            return entity ? entity : getEntityById(entityId); // Si la entidad ya está en el array, la devuelve, de lo contrario, la obtiene por ID
          }));
          setRelatedEntities(relatedEntitiesData);
        }
      } catch (error) {
        console.error("Error al obtener objetos relacionados:", error);
        setError(true); // Establece el error a true
      }finally {setIsLoading(false);}
    };

    useEffect(() => {
      if (object) { fetchRelatedObjects(); }
    }, [object]); // Dependencia para ejecutar cuando el objeto cambie
  
  const checkName = () => {
    if (!name) {      
      setNameError(true); // Cambia el estado para mostrar el error en el campo
      return false; // Si el nombre está vacío, no se puede crear el objeto
    }else return true;
  }

  const saveNewObject = () => {   
    if (!checkName()) {
      return; // Si el nombre no es válido, no se puede crear el objeto
    }
    setNameError(false); // Restablece el estado si el nombre es válido
    let birthDateTemp = birthDate ; // Si la fecha de nacimiento está vacía, asigna una fecha por defecto
    let deathDateTemp = deathDate ; // Si la fecha de muerte está vacía, asigna una fecha por defecto
    let imageUrlTemp = imageUrl === '' ? "https://static.thenounproject.com/png/559530-200.png" : imageUrl; // Si la URL de la imagen está vacía, asigna una URL por defecto
    let newObject = new Objeto({name, birthDate:birthDateTemp, deathDate:deathDateTemp, wikiUrl, imageUrl:imageUrlTemp}); // Crear un nuevo objeto persona
    newObject.setType(type)  
    createObject(newObject); // Guardar el objeto usando el contexto
    navigate(-1); // Volver a la página anterior
  }

  const update = async () => {
    if (!checkName()) {return; }
    setNameError(false); // Restablece el estado si el nombre es válido
    let imageUrlTemp = imageUrl === '' ? "https://static.thenounproject.com/png/559530-200.png" : imageUrl;
    let objeto=new Objeto({id:object.id, name, birthDate, deathDate, imageUrlTemp, wikiUrl}); // Crear un nuevo objeto con los datos actualizados
    objeto.setEtag(object.etag); // Establecer el etag del objeto original
    objeto.setType(type); // Establecer el tipo del objeto
    await updateObject(objeto); // Guardar el objeto usando el contexto
    await fetchObject(); // Llama a la función para establecer los datos del objeto
  }

  const addRelation = async (childId, childType) => {   
    await addRemRelation(type,id, childType, childId,'add');
    await fetchObject(); // Llama a la función para obtener los objetos relacionados
  }

  const removeRelation = async (childId, childType) => {
    console.log("removeRelation: ", type, id, childId, childType); // Verifica los IDs de los objetos relacionados
    await addRemRelation(type,id, childType, childId,'rem');
    await fetchObject(); // Llama a la función para obtener los objetos relacionados
  }

  
  const newTitle = () => {
    switch (type) {
      case 'person':
        return 'Nueva Persona'; 
      case 'entity':
        return 'Nueva Entidad'; 
      case 'product':
        return 'Nuevo Producto';
      case 'association':
        return 'Nueva Asociación';
      default:
        return 'Objeto';
    }
  }

  const handleSave = () => {
    isNew ? saveNewObject() : update(); // Guardar o actualizar el objeto según corresponda
  };

  const handleCancel = () => {
    navigate('/'); // Volver a la página anterior sin guardar
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
    <div className="object-panel">
      {/* Fila principal: Título centrado y ID a la derecha */}
      <div className="object-header">
        <h1 className="object-title">{isNew ? `${newTitle()}` : `Editar ${type || 'Objeto:'}: ${object?.name}`}</h1>
        <span className="object-id">ID: {isNew ? '?' : id}</span>
      </div>
      <hr className="object-divider" />
      {/* Contenedor de columnas */}
      <div className="object-content">
        {/* Columna izquierda: Imagen */}
        <div className="object-image-column">
          <img className="object-image" src={imageUrl || 'https://static.thenounproject.com/png/559530-200.png'}
            alt={name || 'Nuevo Objeto'}/>
          <input  type="url" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Introduce la URL de la imagen" className="image-url-input" />
        </div>

        {/* Columna derecha: Detalles */}
        <div className="object-details-column">
          <div className="object-detail-row">
            <strong>Nombre:</strong>
            <input  type="text" value={name} onChange={(e) => setName(e.target.value)}
              placeholder="Introduce el nombre"  className={nameError ? 'input-error' : ''} />
          </div>
          <div className="object-detail-row">
            <strong>{type === "person" ? "Nacimiento" : "Creacion"}:</strong>
            <input type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} />
          </div>
          <div className="object-detail-row">
            <strong>{type === "person" ? "Muerte" : "Descontinuacion"}:</strong>
            <input type="date" value={deathDate} onChange={(e) => setDeathDate(e.target.value)}/>
          </div>
          <div className="object-detail-row">
            <strong>{type==="association" ? "URL" : "URL a la Wiki:"}</strong>
            <input type="url" value={wikiUrl} onChange={(e) => setWikiUrl(e.target.value)}
              placeholder="Introduce la URL"/>
          </div>
        </div>
      </div>
      <hr className="object-divider" />

      {/* Botones de acción */}
      <div className="object-actions">
        <button className="cancel-button" onClick={handleCancel}>Cancelar</button>
        <button className="save-button" onClick={handleSave}>Guardar</button>
      </div>

      <div className="related-columns">
      {((type==="product" || type === "entity" ) && !isNew) && (
        <div className={`related-column ${relatedEntities.length === 0 ? 'single-column' : ''}`}>
          <RelatedSection type="persons" relatedObjects={relatedPersons} father={object} fatherType={type}
              addRelation={addRelation} removeRelation={removeRelation} isEdit={true}/>
        </div>
      )}
      {((type==="product" || type === "association") && !isNew) && (
        <div className={`related-column ${relatedPersons.length === 0 ? 'single-column' : ''}`}>
          <RelatedSection type="entities" relatedObjects={relatedEntities} father={object} fatherType={type}
             addRelation={addRelation} removeRelation={removeRelation} isEdit={true}/>
        </div>
      )}
    </div>
      
    </div>
  );
};

export default ObjectEdit;