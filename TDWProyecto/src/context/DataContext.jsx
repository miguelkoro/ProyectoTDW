import { createContext, useState } from 'react';
import * as dataService from '../services/dataService'; // Importa todos los servicios de dataService

import { useAuth } from './AuthContext';
import Persona from '../models/Persona.js'; 
import Entidad from '../models/Entidad.js'; 
import Producto from '../models/Producto.js'; 
import Asociacion from '../models/Asociacion.js';
import User from '../models/User.js';
import { useNavigate } from "react-router-dom";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const navigate = useNavigate();

  const [persons, setPersons] = useState([]);
  const [entities, setEntities] = useState([]);
  const [products, setProducts] = useState([]);
  const [associations, setAssociations] = useState([]); // Estado para las asociaciones 
  const [users, setUsers] = useState([]); // Estado para los usuarios

  const [searchName, setSearchName] = useState(''); // Estado para el nombre de búsqueda

  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingUsers, setIsLoadingUsers] = useState(true); // Estado de carga de usuarios
  const {user, checkTokenExpiration, showMessage, loadData} = useAuth(); // Obtiene el usuario autenticado del contexto

  const VAGUE_MODE = true; 
  const SHOW_NO_DATA_MESSAGE = false;


  const loadAllData = async () => {
    await getAssociations(); // Llama a la función para obtener asociaciones
    await getProducts(); // Llama a la función para obtener productos
    await getPersons(); // Llama a la función para obtener personas
    await getEntities(); // Llama a la función para obtener entidades
    if(user?.scope==="writer") await getUsers(); // Llama a la función para obtener usuarios
  }



  // Cargar datos de la API
  const getProducts = async (name='', order='', ordering='') => {
    try {
      setIsLoading(true); // Indica que los datos están siendo cargados
      const response = await dataService.fetchAPIObjects('products', name, order, ordering);
      if(response.status === 200) {
        const productCollection = response.data.products.map((productData) => {
          const product = new Producto(productData.product); // Crea una instancia de Product
          product.setType('product'); // Configura el tipo como 'product'
          return product;
        });  
        setProducts(productCollection); // Guarda los productos en el estado
      }else if(response.status === 404) {
        SHOW_NO_DATA_MESSAGE && showMessage("Error al cargar los productos. No se han encontrado productos.", "error"); // Muestra un mensaje de error al usuario
        setProducts([]); // Limpia la lista de productos
      }else{
        console.error("Error al cargar los productos:", response.status); // Maneja el error si la creación del usuario falla
        showMessage("Error al cargar los productos.", "error"); // Muestra un mensaje de error al usuario
        setProducts([]); // Limpia la lista de productos
      }
    } catch (error) {
      console.error('Error al cargar productos:', error);
    } finally {
      setIsLoading(false); // Indica que los datos han terminado de cargarse
    }
  }
  const getPersons = async (name='', order='', ordering='') => {
    try {
      setIsLoading(true); // Indica que los datos están siendo cargados
      const response = await dataService.fetchAPIObjects('persons', name, order, ordering);
      if(response.status === 200) {
        const personCollection = response.data.persons.map((personData) => {
          const person = new Persona(personData.person); // Crea una instancia de Product
          person.setType('person'); // Configura el tipo como 'product'
          return person;
        });  
        setPersons(personCollection); // Guarda los productos en el estado
      }else if(response.status === 404) {
        SHOW_NO_DATA_MESSAGE && showMessage("Error al cargar las personas. No se han encontrado personas.", "error"); // Muestra un mensaje de error al usuario
        setPersons([]); // Limpia la lista de personas
      }else{
        console.error("Error al cargar las personas:", response.status); // Maneja el error si la creación del usuario falla
        showMessage("Error al cargar las personas.", "error"); // Muestra un mensaje de error al usuario
        setPersons([]); // Limpia la lista de personas
      }
    } catch (error) {
      console.error('Error al cargar personas:', error);
    } finally {
      setIsLoading(false); // Indica que los datos han terminado de cargarse
    }
  }
  const getEntities = async (name='', order='', ordering='') => {
    try {
      setIsLoading(true); // Indica que los datos están siendo cargados
      const response = await dataService.fetchAPIObjects('entities', name, order, ordering);
      if(response.status=200){
        const entityCollection = response.data.entities.map((entityData) => {
          const entity = new Entidad(entityData.entity); // Crea una instancia de Product
          entity.setType('entity'); // Configura el tipo como 'product'
          return entity;
        });  
        setEntities(entityCollection); // Guarda los productos en el estado
      }else if(response.status === 404) {
        SHOW_NO_DATA_MESSAGE && showMessage("Error al cargar las entidades. No se han encontrado entidades.", "error"); // Muestra un mensaje de error al usuario
        setEntities([]); // Limpia la lista de entidades
      }else{
        console.error("Error al cargar las entidades:", response.status); // Maneja el error si la creación del usuario falla
        showMessage("Error al cargar las entidades.", "error"); // Muestra un mensaje de error al usuario
        setEntities([]); // Limpia la lista de entidades
      }
    } catch (error) {
      console.error('Error al cargar entidades:', error);
    } finally {
      setIsLoading(false); // Indica que los datos han terminado de cargarse
    }
  }
  const getAssociations = async (name='', order='', ordering='') => {
    try {
      setIsLoading(true); // Indica que los datos están siendo cargados  
      const response = await dataService.fetchAPIObjects('associations', name, order, ordering);
      if(response.status === 200) {
        const associationCollection = response.data.associations.map((associationData) => {
            const association = new Asociacion(associationData.association); // Crea una instancia de Product
            association.setType('association'); // Configura el tipo como 'product'
            return association;
        });  
        setAssociations(associationCollection); // Guarda los productos en el estado
      }else if(response.status === 404) {
        SHOW_NO_DATA_MESSAGE && showMessage("Error al cargar las asociaciones. No se han encontrado asociaciones.", "error"); // Muestra un mensaje de error al usuario
        setAssociations([]); // Limpia la lista de asociaciones
      }else{
        console.error("Error al cargar las asociaciones:", response.status); // Maneja el error si la creación del usuario falla
        showMessage("Error al cargar las asociaciones.", "error"); // Muestra un mensaje de error al usuario
        setAssociations([]); // Limpia la lista de asociaciones
      }
    } catch (error) {
      console.error('Error al cargar asociaciones:', error);
      showMessage("Error al cargar asociaciones", "error"); // Muestra un mensaje de error al usuario
    } finally {
      setIsLoading(false); // Indica que los datos han terminado de cargarse
    }
  }

  /** Get por Id de los diferentes objetos
   * Con el objeto recibido, se crea una nueva instancia del objeto correspondiente
   * y se añade a la lista de objetos del contexto o se actualiza si ya existia.
   * @returns {Promise<Persona|null>} Devuelve la persona encontrada o null si no se encuentra
   */
  const getPersonById = async (id) => {      
      const { data, etag, status } = await dataService.fetchAPIObjectById('persons', id);
      if(status === 200){        
        // Convierte el objeto en una instancia de Persona
        const person = new Persona(data.person);
        person.etag = etag; // Asigna el ETag al objeto
        person.setType('person'); // Configura el tipo como 'person'
        const existingPersonIndex = persons.findIndex((object) => person.id === object.id);
        if (existingPersonIndex !== -1) {
          setPersons((prevPersons) => { // Si el usuario ya existe, actualiza su información
            const updatedPersons = [...prevPersons]; // Crea una copia de la lista de personas
            updatedPersons[existingPersonIndex] = person; // Actualiza el usuario existente
            return updatedPersons;
          });
        } else { // Si el usuario no existe, lo añade a la lista de usuarios
          setPersons((prevPersons) => [...prevPersons, person]); // Añade la nueva persona a la lista de personas
        }
        return person; // Devuelve la persona encontrada
      }else if(status === 404){
        showMessage("Error al cargar la persona. No se ha encontrado la persona.", "error"); // Muestra un mensaje de error al usuario
        return null; // Devuelve null si no se encuentra la asociación
      }else{
        showMessage("Error al cargar la persona.", "error"); // Muestra un mensaje de error al usuario
        return null; // Devuelve null si no se encuentra la asociación
      }
  };
  const getEntityById = async (id) => {
    const { data, etag, status } = await dataService.fetchAPIObjectById('entities', id);
    if(status === 200){
      const entity = new Entidad(data.entity);
      entity.etag = etag; // Asigna el ETag al objeto
      entity.setType('entity'); // Configura el tipo como 'person'
      const existingEntityIndex = entities.findIndex((object) => entity.id === object.id);
      if (existingEntityIndex !== -1) {
        setEntities((prevEntities) => { // Si el usuario ya existe, actualiza su información
          const updatedEntities = [...prevEntities]; // Crea una copia de la lista de entidades
          updatedEntities[existingEntityIndex] = entity; // Actualiza el usuario existente
          return updatedEntities;
        });
      } else { // Si el usuario no existe, lo añade a la lista de usuarios
        setEntities((prevEntities) => [...prevEntities, entity]); // Añade la nueva entidad a la lista de entidades
      }      
      return entity; // Devuelve la persona encontrada
    }else if(status === 404){
      showMessage("Error al cargar la entidad. No se ha encontrado la entidad.", "error"); // Muestra un mensaje de error al usuario
      return null; // Devuelve null si no se encuentra la asociación
    }else{
      showMessage("Error al cargar la entidad.", "error"); // Muestra un mensaje de error al usuario
      return null; // Devuelve null si no se encuentra la asociación
    }
  }
  const getProductById = async (id) => {     
      const { data, etag , status} = await dataService.fetchAPIObjectById('products', id);
      if(status === 200){
        const product = new Producto(data.product);
        product.etag = etag; // Asigna el ETag al objeto
        product.setType('product'); // Configura el tipo como 'person'
        const existingProductIndex = products.findIndex((object) => product.id === object.id);
        if (existingProductIndex !== -1) {
          setProducts((prevProducts) => { // Si el usuario ya existe, actualiza su información
            const updatedProducts = [...prevProducts]; // Crea una copia de la lista de productos
            updatedProducts[existingProductIndex] = product; // Actualiza el usuario existente
            return updatedProducts;
          });
        } else { // Si el usuario no existe, lo añade a la lista de usuarios
          setProducts((prevProducts) => [...prevProducts, product]);
        }
        return product; // Devuelve la persona encontrada
      }else if(status === 404){
        showMessage("Error al cargar el producto. No se ha encontrado el producto.", "error"); // Muestra un mensaje de error al usuario
        return null; // Devuelve null si no se encuentra la asociación
      }

  };
  const getAssociationById = async (id) => {
    const { data, etag, status } = await dataService.fetchAPIObjectById('associations', id);
    if(status === 200 ){
      const association = new Asociacion(data.association);
      association.etag = etag; // Asigna el ETag al objeto
      association.setType('association'); 
      const existingAssociationIndex = associations.findIndex((object) => association.id === object.id);
      if (existingAssociationIndex !== -1) {       
        setAssociations((prevAssociations) => { // Si el usuario ya existe, actualiza su información
          const updatedAssociations = [...prevAssociations]; // Crea una copia de la lista de asociaciones
          updatedAssociations[existingAssociationIndex] = association; // Actualiza el usuario existente
          return updatedAssociations;
        });
      } else { // Si el usuario no existe, lo añade a la lista de usuarios
        setUsers((prevAssociations) => [...prevAssociations, association]); 
      }      
      //console.log("association", associations); // Muestra el objeto en la consola
      return association; // Devuelve la persona encontrada
    }else if(status === 404){
      showMessage("Error al cargar la asociación. No se ha encontrado la asociación.", "error"); // Muestra un mensaje de error al usuario
      return null; // Devuelve null si no se encuentra la asociación
    }else{
      showMessage("Error al cargar la asociación.", "error"); // Muestra un mensaje de error al usuario
      return null; // Devuelve null si no se encuentra la asociación
    }
  };



  const getPlural = (type) => {
    switch (type) {
      case 'person':
        return 'persons'; // Retorna el plural de 'person'
      case 'entity':
        return 'entities'; // Retorna el plural de 'entity'
      case 'product':
        return 'products'; // Retorna el plural de 'product'
      case 'association':
        return 'associations'; // Retorna el plural de 'association'
      default:
        return type; // Retorna el tipo original si no coincide con ninguno de los anteriores
    }
  }

  /** Crea un objeto en la API */
  const createObject = async (object) => {
      checkTokenExpiration(); // Verifica si el token ha expirado    
      const result = await dataService.createAPIObject(getPlural(object.type),object, user.token);
      //console.log("createObject", result); // Verifica el nuevo producto creado
      if(result.status === 201) {                
        switch (object.type) {
          case 'person':
            setPersons((prev) => [...prev, createPerson(result.data)]); // Añade la nueva persona a la lista de personas
            break;
          case 'entity':
            setEntities((prev) => [...prev, createEntity(result.data)]); // Añade la nueva entidad a la lista de entidades
            break;
          case 'product':
            setProducts((prev) => [...prev, createProduct(result.data)]); // Añade el nuevo producto a la lista de productos
            break;
          case 'association':
            setAssociations((prev) => [...prev, createAssociation(result.data)]); // Añade la nueva asociación a la lista de asociaciones
            break;
          default:
            console.error("Tipo de objeto no válido para crear."); // Maneja el error si el tipo no es válido
        }
        !VAGUE_MODE && await updateModifiedObjects(object.type); // Actualiza la lista de objetos modificados  
        showMessage(`Objeto ${object.name} creado correctamente`, 'success'); // Muestra un mensaje de éxito al usuario
      }else if(result.status === 400) {
        showMessage(`Error al crear el objeto ${object.type}. El nombre ya existe.`, "error"); // Muestra un mensaje de error al usuario
        await updateModifiedObjects(object.type); // Actualiza la lista de objetos modificados
      }else if(result.status === 401 || result.status === 403) {
        showMessage("Error al crear el objeto. No tienes permiso para realizar esta acción.", "error"); // Muestra un mensaje de error al usuario
        VAGUE_MODE && await updateModifiedObjects(object.type);
      }else{
        console.error("Error al crear el objeto:", result); // Maneja el error si la creación del usuario falla
        showMessage("Error al crear el objeto.", "error"); // Muestra un mensaje de error al usuario
        VAGUE_MODE && await updateModifiedObjects(object.type);
      }
  }


 /**Metodos que crean un objeto con los datos devueltos de la API y lo devuelven */
  const createEntity = (data) => {
    const entity = new Entidad(data.entity);    
    entity.setType('entity'); // Configura el tipo como 'person'
    return entity; // Devuelve la persona encontrada
  }
  const createPerson = (data) => {
    const person = new Persona(data.person);
    person.setType('person'); // Configura el tipo como 'person'
    return person; // Devuelve la persona encontrada
  }
  const createProduct = (data) => {
    const product = new Producto(data.product);
    product.setType('product'); // Configura el tipo como 'person'
    return product; // Devuelve la persona encontrada
  }
  const createAssociation = (data) => {
    const association = new Asociacion(data.association);
    association.setType('association'); // Configura el tipo como 'person'
    return association; // Devuelve la persona encontrada
  }


  /** Actualiza un objeto hacia la API */
  const updateObject = async(updatedObject) => {
    //!user && console.error("No hay usuario autenticado para actualizar la asociación."); // Verifica si hay un usuario autenticado
    checkTokenExpiration(); // Verifica si el token ha expirado
    const result = await dataService.updateAPIObject(getPlural(updatedObject.type), updatedObject, user.token); // Llama al servicio para crear el productor
    switch (result.status) {
      case 209: //Todo ok
        VAGUE_MODE ? updateLocalObject(updatedObject.type, result.data) : await updateModifiedObjects(updatedObject.type); // Actualiza la lista de objetos modificados
        showMessage('Objeto actualizado correctamente', 'success'); // Muestra un mensaje de éxito al usuario
        break;
      case 400:
        showMessage("Error al actualizar el objeto. El nombre ya existe.", "error"); // Muestra un mensaje de error al usuario
        await updateModifiedObjects(updatedObject.type); // Actualiza la lista de objetos modificados
        break;
      case 401:
        showMessage("Error al actualizar el objeto. No tienes permiso para realizar esta acción.", "error"); // Muestra un mensaje de error al usuario
        //await updateModifiedObjects(updatedObject.type); // Actualiza la lista de objetos modificados
        navigate('/'); // Redirige a la página de inicio
        break;
      case 404:
        showMessage("Error al actualizar el objeto. El objeto no existe o no tienes acceso.", "error"); // Muestra un mensaje de error al usuario
        await updateModifiedObjects(updatedObject.type); // Actualiza la lista de objetos modificados
        break;
      case 428:
        showMessage("Error al actualizar el objeto. Fallo en el eTag", "error"); // Muestra un mensaje de error al usuario
        await updateModifiedObjects(updatedObject.type); // Actualiza la lista de objetos modificados
        break;
      default:
        console.error("Error al actualizar el objeto:", result); // Maneja el error si la creación del usuario falla
        showMessage("Error al actualizar el objeto.", "error"); // Muestra un mensaje de error al usuario
        await updateModifiedObjects(updatedObject.type); // Actualiza la lista de objetos modificados
        break;
    }
  }
  /** Actualizar el objeto con la respuesta devuelta */
  const updateLocalObject = (type, object) => {
    switch (type) {
      case 'person':
        let personAux = createPerson(object); // Crea una nueva persona        
        setPersons((prev) => prev.map((person) => (person.id === personAux.id ? personAux : person))); // Actualiza la lista de personas
        break;
      case 'entity':        
        let entityAux = createEntity(object); // Crea una nueva entidad        
        setEntities((prev) => prev.map((entity) => (entity.id === entityAux.id ? entityAux : entity))); // Actualiza la lista de entidades
        break;
      case 'product':
        let productAux = createProduct(object); // Crea un nuevo producto
        setProducts((prev) => prev.map((product) => (product.id === productAux.id ? productAux : product))); // Actualiza la lista de productos
        break;
      case 'association':
        let associationAux = createAssociation(object); // Crea una nueva asociación
        setAssociations((prev) => prev.map((association) => (association.id === associationAux.id ? associationAux : association))); // Actualiza la lista de asociaciones
        break;
      default:
        console.error("Tipo de objeto no válido para eliminar."); // Maneja el error si el tipo no es válido
        break;
    }
  }
  /** Actualiza la lista de objetos con la API */
  const updateModifiedObjects = async (type) => {
    switch (type) {
      case 'person':
        await getPersons(); // Actualiza la lista de personas
        break;
      case 'entity':
        await getEntities(); // Actualiza la lista de entidades
        break;
      case 'product':
        await getProducts(); // Actualiza la lista de productos
        break;
      case 'association':
        await getAssociations(); // Actualiza la lista de asociaciones
        break;
      default:
        console.error("Tipo de objeto no válido para eliminar."); // Maneja el error si el tipo no es válido
        break;
    }
  }
  /**Elimina un objeto de la API */
  const deleteObject = async (type, id) => {   
    checkTokenExpiration(); // Verifica si el token ha expirado
    const result = await dataService.deleteAPIObject(getPlural(type), id, user.token); // Llama al servicio para eliminar
    if (result.ok) {
      showMessage('Objeto eliminado correctamente', 'success'); // Muestra un mensaje de éxito al usuario
      await setDeleteObject(type, id); // Actualiza la lista de objetos eliminados
    }else if(result.status === 401) {
      showMessage("Error al eliminar el objeto. No tienes permiso para realizar esta acción.", "error"); // Muestra un mensaje de error al usuario
     //0 await updateObjects(type); // Actualiza la lista de objetos eliminados
     navigate('/'); // Redirige a la página de inicio
    }else if(result.status === 404) {
      showMessage("Error al eliminar el objeto. El objeto no existe o no tienes acceso.", "error"); // Muestra un mensaje de error al usuario
      await updateObjects(type); // Actualiza la lista de objetos eliminados
    }else{
      console.error("Error al eliminar el objeto:", result); // Maneja el error si la creación del usuario falla
      showMessage("Error al eliminar el objeto.", "error"); // Muestra un mensaje de error al usuario
      await updateObjects(type); // Actualiza la lista de objetos eliminados
    }   
  }  
  /** Actualiza la lista local de objetos del tipo que le pongamos */
  const updateObjects = async (type) => {
    switch (type) {
      case 'person':
        await getPersons(); // Actualiza la lista de personas
        break;
      case 'entity':
        await getEntities(); // Actualiza la lista de entidades
        break;
      case 'product':
        await getProducts(); // Actualiza la lista de productos
        break;
      case 'association':
        await getAssociations(); // Actualiza la lista de asociaciones
        break;
      default:
        console.error("Tipo de objeto no válido para eliminar."); // Maneja el error si el tipo no es válido
        break;
    }
  }
  /**Eliminar un objeto de la lista local y actualizar todos */
  const setDeleteObject = async (type, id) => {
    switch (type) {
      case 'person':
        !VAGUE_MODE && await getPersons(); // Actualiza la lista de personas
        setPersons((prev) => prev.filter((person) => person.id !== id));
        break;
      case 'entity':
        !VAGUE_MODE && await getEntities(); // Actualiza la lista de entidades
        setEntities((prev) => prev.filter((entity) => entity.id !== id));
        break;
      case 'product':
        !VAGUE_MODE && await getProducts(); // Actualiza la lista de productos
        setProducts((prev) => prev.filter((product) => product.id !== id));
        break;
      case 'association':
        !VAGUE_MODE && await getAssociations(); // Actualiza la lista de asociaciones
        setAssociations((prev) => prev.filter((association) => association.id !== id));
        break;
      default:
        console.error("Tipo de objeto no válido para eliminar."); // Maneja el error si el tipo no es válido
        break;
      }  
  }
  /**Añadir o eliminar una relacion con un objeto */
  const addRemRelation = async (objectsType, idObject, typeRelation, idRelation, action) => {
    checkTokenExpiration(); // Verifica si el token ha expirado
    const response = await dataService.addRemRelationAPI(getPlural(objectsType),idObject, typeRelation, idRelation, action, user.token); // Llama al servicio para añadir o eliminar la relación
    let accion = action === 'add' ? 'añadida' : 'eliminada'; // Determina la acción realizada
    if(response.ok) {
       showMessage(`Relación ${accion} correctamente`, 'success'); // Muestra un mensaje de éxito al usuario    
    }else if(response.status === 401 || response.status === 403) {
      let accion = action === 'add' ? 'añadir' : 'eliminar';
      showMessage(`Error al ${accion} la relación. No tienes permiso para realizar esta acción.`, "error"); // Muestra un mensaje de error al usuario
    }else if(response.status === 404 || response.status === 406) {
      let accion = action === 'add' ? 'añadir' : 'eliminar';
      showMessage(`Error al ${accion} la relación. No se ha encontrado el objeto relacionado.`, "error"); // Muestra un mensaje de error al usuario
    }else{   
      let accion = action === 'add' ? 'añadir' : 'eliminar';
      console.error(`Error al ${accion} la relación:`, response.code); // Maneja el error si la creación del usuario falla
      showMessage(`Error al ${accion} la relación.`, "error"); // Muestra un mensaje de error al usuario
    }
  }
  /**Comprobar si el nombre de un objeto ya existe */
  const checkObjectName = async (type, name) => {
    //console.log("checkObjectName", type, name);
    //checkTokenExpiration(); // Verifica si el token ha expirado
    const response = await dataService.checkAPIObjectName(getPlural(type), type, name); // Llama al servicio para comprobar el nombre
    return response; // Devuelve la respuesta de la API
  }

    

 /**USUARIOS */
 /**Recupera todos los usuarios */
  const getUsers = async (name='', order='', ordering='') => {
    try{
      checkTokenExpiration(); // Verifica si el token ha expirado
      setIsLoadingUsers(true); // Indica que los datos están siendo cargados
      const response = await dataService.fetchAPIUsers(user?.token,name, order, ordering );     
      if (response.status === 200) {
          const userCollection = response.data.users.map((userData) => {
            const newUser= new User({
              id: userData.user.id,
              userName: userData.user.username,
              scope: userData.user.role,
            });
            newUser.setEmail(userData.user.email); // Guarda el correo electrónico del usuario
            newUser.setBirthDate(userData.user.birthDate); // Guarda la fecha de nacimiento del usuario
            newUser.setName(userData.user.name); // Guarda el nombre del usuario
            return newUser; // Devuelve el nuevo objeto User
          }); 
        setUsers(userCollection); // Guarda los productos en el estado        
      }else if(response.status === 401) {
        showMessage("Error al cargar los usuarios. No tienes permiso para realizar esta acción.", "error"); // Muestra un mensaje de error al usuario
        setUsers([]); // Limpia la lista de usuarios
      }else if(response.status === 404) {
        showMessage("Error al cargar los usuarios. No se han encontrado usuarios.", "error"); // Muestra un mensaje de error al usuario
        setUsers([]); // Limpia la lista de usuarios
      }else{
        console.error("Error al cargar los usuarios:", response.status); // Maneja el error si la creación del usuario falla
        showMessage("Error al cargar los usuarios.", "error"); // Muestra un mensaje de error al usuario
        setUsers([]); // Limpia la lista de usuarios
      }
    } catch (error) {
      console.error('Error al cargar productos:', error);
    } finally {
      setIsLoadingUsers(false); // Indica que los datos han terminado de cargarse
    }
  }
  /**Eliminar un usuario */
  const deleteUser = async (id) => {
      setIsLoading(true); // Indica que los datos están siendo cargados
      checkTokenExpiration(); // Verifica si el token ha expirado
      const response = await dataService.deleteAPIUser(id, user.token); // Llama al servicio de autenticación
      if (response.ok) {
        showMessage('Usuario eliminado correctamente', 'success');     
      }else if(response.status=== 401) {
        showMessage("Error al eliminar el usuario. No tienes permiso para realizar esta acción.", "error"); // Muestra un mensaje de error al usuario
      }else if(response.status === 404) {
        showMessage("Error al eliminar el usuario. El usuario no existe.", "error"); // Muestra un mensaje de error al usuario
      }else{
        console.error("Error al eliminar el usuario:", response); // Maneja el error si la creación del usuario falla
        showMessage("Error al eliminar el usuario.", "error"); // Muestra un mensaje de error al usuario
      }
      await getUsers(); 
      return response; // Devuelve el resultado de la solicitud
  }
  /**Actualizar un usuario */
  const updateUser = async (userObject, password, role) => {
      checkTokenExpiration(); // Verifica si el token ha expirado
      const response = await dataService.updateAPIUser(userObject, password, role, user.token, user.scope); // Llama al servicio de autenticación
      if(response.data.user) {
        VAGUE_MODE ? addUpdateUser(response.data.user) : await getUsers(); // Actualiza la lista de usuarios
        showMessage('Usuario actualizado correctamente', 'success'); // Muestra un mensaje de éxito al usuario
      }else if(response.status === 400) {
        showMessage("Error al actualizar el usuario. El usuario o correo ya existen.", "error"); // Muestra un mensaje de error al usuario
      }else if(response.status === 404) {
        showMessage("Error al actualizar el usuario. El usuario no existe.", "error"); // Muestra un mensaje de error al usuario
      }else if(response.status === 401) {
        showMessage("Error al actualizar el usuario. No tienes permiso para realizar esta acción.", "error"); // Muestra un mensaje de error al usuario
      }else if(response.status === 428) {
        showMessage("Error al actualizar el usuario. Fallo en el eTag", "error"); // Muestra un mensaje de error al usuario
      }else{
        console.error("Error al actualizar el usuario:", response.status); // Maneja el error si la creación del usuario falla
        showMessage("Error al actualizar el usuario.", "error"); // Muestra un mensaje de error al usuario
      }      
      return response; // Devuelve el resultado de la solicitud   
  }
  /**Guarda la actualizacion del usuario en local */
  const addUpdateUser = async (userObj) => {    
    const updatedUser = new User({id: userObj.id, userName: userObj.username,
        scope: userObj.role, token: '', expiresIn: '',});      
      updatedUser.setEmail(userObj.email); // Guarda el correo electrónico del usuario
      updatedUser.setBirthDate(userObj.birthDate); // Guarda la fecha de nacimiento del usuario
      updatedUser.setName(userObj.name); // Guarda el nombre del usuario
    const existingUserIndex = users.findIndex((user) => userObj.id === user.id);
    if (existingUserIndex !== -1) {       
      setUsers((prevUsers) => { // Si el usuario ya existe, actualiza su información
        const updatedUsers = [...prevUsers];
        updatedUsers[existingUserIndex] = updatedUser; // Actualiza el usuario existente
        return updatedUsers;
      });
    } else { // Si el usuario no existe, lo añade a la lista de usuarios
      setUsers((prevUsers) => [...prevUsers, updatedUser]); 
    }
  }
  /**Registro de nuevo usuario */
  const register = async (userName, email, password, birthDate, name) => {
    const response = await dataService.createAPIUser(userName, email, password, birthDate, name); // Llama al servicio de autenticación
    if (response.status === 201) { // Verifica si la respuesta es exitosa
      showMessage("Usuario creado correctamente.", "success"); // Muestra un mensaje de éxito al usuario
      navigate("/login"); // Redirige al usuario a la página de inicio de sesión
    } else if(response.status === 400) {
      showMessage("Error al crear el usuario. El usuario o correo ya existen.", "error"); // Muestra un mensaje de error al usuario
    }else if(response.status === 422) {
      showMessage("Error al crear el usuario. Faltan campos", "error"); // Muestra un mensaje de error al usuario
    }else{
      console.error("Error al crear el usuario:", response.status); // Maneja el error si la creación del usuario falla
      showMessage("Error al crear el usuario.", "error"); // Muestra un mensaje de error al usuario
    }
  }
  /**Obtener usuario por id */
  const getUserById = async (id) => {
    checkTokenExpiration(); // Verifica si el token ha expirado
    const response = await dataService.getAPIUserById(id, user.token);
    if (response.status === 200) { // Verifica si la respuesta es exitosa
      const userObject = new User({id: response.data.user.id, userName: response.data.user.username, 
        scope: response.data.user.role, token:'', expiresIn:''});
      userObject.setEtag(response.etag); // Guarda el ETag del usuario
      userObject.setEmail(response.data.user.email); // Guarda el correo electrónico del usuario
      userObject.setBirthDate(response.data.user.birthDate); // Guarda la fecha de nacimiento del usuario
      userObject.setName(response.data.user.name); // Guarda el nombre del usuario
      addUser(userObject); // Añade el usuario al estado
      return userObject; // Devuelve el objeto User 
    }else if(response.status === 404) {
      showMessage("Error, Usuario no encontrado", "error"); // Muestra un mensaje de error al usuario
      await getUsers(); // Actualiza la lista de usuarios
      return null; // Devuelve null si no se encuentra el usuario
    }else if (response.status === 401) {
      showMessage("Error al obtener el usuario. No tienes permiso para realizar esta acción.", "error"); // Muestra un mensaje de error al usuario
      //await getUsers(); // Actualiza la lista de usuarios
      return null; // Devuelve null si no se encuentra el usuario
    }else{
      console.error("Error al obtener el usuario por ID:", response); // Maneja el error si la creación del usuario falla
      showMessage("Error al obtener el usuario por ID.", "error"); // Muestra un mensaje de error al usuario
      await getUsers(); // Actualiza la lista de usuarios
      return null; // Devuelve null si no se encuentra el usuario
    }
  }
  /**Añadir un usuario a la coleccion local */
  const addUser = async (userObj) => {   
    const existingUserIndex = users.findIndex((user) => userObj.id === user.id);
    if (existingUserIndex !== -1) {       
      setUsers((prevUsers) => { // Si el usuario ya existe, actualiza su información
        const updatedUsers = [...prevUsers];
        updatedUsers[existingUserIndex] = userObj; // Actualiza el usuario existente
        return updatedUsers;
      });
    } else { // Si el usuario no existe, lo añade a la lista de usuarios
      setUsers((prevUsers) => [...prevUsers, userObj]); 
    }
  }
  /**Comprobar si existe el nombre de usuario */
  const checkUserName = async (name) => {  
      const response = await dataService.checkAPIUserName(name); // Llama al servicio de autenticación
      return response 
  }

  return (
    <DataContext.Provider value={{ 
          persons, entities, products, associations, users,
          isLoading, searchName, setSearchName, checkObjectName,
          getEntities, getProducts, getPersons, getAssociations,
          getPersonById, getEntityById, getProductById, getAssociationById,
          createObject, deleteObject, updateObject, addRemRelation, loadAllData,
          getUsers, deleteUser, updateUser, register, getUserById, checkUserName}}>
      {children}
    </DataContext.Provider>
  );
};