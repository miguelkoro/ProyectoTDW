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
  const {user, checkTokenExpiration, showMessage} = useAuth(); // Obtiene el usuario autenticado del contexto

  const VAGUE_MODE = true; 


 /* const afertUserLogin = async () => {
    await getAssociations(); // Llama a la función para obtener asociaciones
    await getProducts(); // Llama a la función para obtener productos
    await getPersons(); // Llama a la función para obtener personas
    await getEntities(); // Llama a la función para obtener entidades
    if(user?.scope==="writer") await getUsers(); // Llama a la función para obtener usuarios
  }*/



  // Cargar datos de la API
  const getProducts = async (name='', order='', ordering='') => {
    try {
      setIsLoading(true); // Indica que los datos están siendo cargados
      const response = await dataService.fetchAPIObjects('products', name, order, ordering);
      const productCollection = response.data.products.map((productData) => {
        const product = new Producto(productData.product); // Crea una instancia de Product
        product.setType('product'); // Configura el tipo como 'product'
        return product;
      });  
      setProducts(productCollection); // Guarda los productos en el estado
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
      const personCollection = response.data.persons.map((personData) => {
        const person = new Persona(personData.person); // Crea una instancia de Product
        person.setType('person'); // Configura el tipo como 'product'
        return person;
      });  
      setPersons(personCollection); // Guarda los productos en el estado
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
      const entityCollection = response.data.entities.map((entityData) => {
        const entity = new Entidad(entityData.entity); // Crea una instancia de Product
        entity.setType('entity'); // Configura el tipo como 'product'
        return entity;
      });  
      setEntities(entityCollection); // Guarda los productos en el estado
    } catch (error) {
      console.error('Error al cargar entidades:', error);
    } finally {
      setIsLoading(false); // Indica que los datos han terminado de cargarse
    }
  }
  const getAssociations = async (name='', order='', ordering='') => {
    try {
      setIsLoading(true); // Indica que los datos están siendo cargados
  
      // Llama al servicio para cargar los productos
      const response = await dataService.fetchAPIObjects('associations', name, order, ordering);
      // Convierte cada producto del JSON en una instancia de Product
      const associationCollection = response.data.associations.map((associationData) => {
          const association = new Asociacion(associationData.association); // Crea una instancia de Product
          association.setType('association'); // Configura el tipo como 'product'
          return association;
      });
  
      setAssociations(associationCollection); // Guarda los productos en el estado
      
      //showMessage('Productos cargados correctamente', 'success');
    } catch (error) {
      console.error('Error al cargar asociaciones:', error);
      //showMessage('Error al cargar asociaciones', 'error');
      //setIsLoading(false); // Finaliza la carga en caso de error
    } finally {
      setIsLoading(false); // Indica que los datos han terminado de cargarse
    }
  }

  const getPersonById = async (id) => {

      //setIsLoading(true); // Indica que los datos están siendo cargados
      // Llama al servicio para obtener la persona por ID
      const { data, etag } = await dataService.fetchAPIObjectById('persons', id);
      // Convierte el objeto en una instancia de Persona
      const person = new Persona(data.person);
      person.etag = etag; // Asigna el ETag al objeto
      person.setType('person'); // Configura el tipo como 'person'

      return person; // Devuelve la persona encontrada

      //setIsLoading(false); // Finaliza la carga en caso de error
    

  };
  const getEntityById = async (id) => {
    const { data, etag } = await dataService.fetchAPIObjectById('entities', id);
    // Convierte el objeto en una instancia de Persona
    const entity = new Entidad(data.entity);
    entity.etag = etag; // Asigna el ETag al objeto
    entity.setType('entity'); // Configura el tipo como 'person'

    return entity; // Devuelve la persona encontrada
  }
  const getProductById = async (id) => {
    try {
      setIsLoading(true); // Indica que los datos están siendo cargados
      const { data, etag } = await dataService.fetchAPIObjectById('products', id);
      const product = new Producto(data.product);
      product.etag = etag; // Asigna el ETag al objeto
      product.setType('product'); // Configura el tipo como 'person'
      return product; // Devuelve la persona encontrada
    } catch (error) {
      console.error('Error al cargar el producto:', error);
    }
    finally {
      setIsLoading(false); // Finaliza la carga en caso de error
    }
  };
  const getAssociationById = async (id) => {
    const { data, etag } = await dataService.fetchAPIObjectById('associations', id);
    // Convierte el objeto en una instancia de Persona
    const association = new Asociacion(data.association);
    association.etag = etag; // Asigna el ETag al objeto
    association.setType('association'); // Configura el tipo como 'person'

    return association; // Devuelve la persona encontrada
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

  const createObject = async (object) => {
    checkTokenExpiration(); // Verifica si el token ha expirado
    //!user && console.error("No hay usuario autenticado para crear el objeto."); // Verifica si hay un usuario autenticado
    const result = await dataService.createAPIObject(getPlural(object.type),object, user.token);
    await updateModifiedObjects(object.type); // Actualiza la lista de objetos modificados
    
  }

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



  const updateObject = async(updatedObject) => {
    //!user && console.error("No hay usuario autenticado para actualizar la asociación."); // Verifica si hay un usuario autenticado
    checkTokenExpiration(); // Verifica si el token ha expirado
    const result = await dataService.updateAPIObject(getPlural(updatedObject.type), updatedObject, user.token); // Llama al servicio para crear el productor
    await updateModifiedObjects(updatedObject.type); // Actualiza la lista de objetos modificados
    return result; // Devuelve el resultado de la actualización
  }


  const deleteObject = async (type, id) => {
    try{
      setIsLoading(true); // Indica que los datos están siendo cargados
      //!user && console.error("No hay usuario autenticado para eliminar el objeto."); // Verifica si hay un usuario autenticado
      checkTokenExpiration(); // Verifica si el token ha expirado
      const result = await dataService.deleteAPIObject(getPlural(type), id, user.token); // Llama al servicio para eliminar
      switch (type) {
        case 'person':
          await getPersons(); // Actualiza la lista de personas
           setPersons((prev) => prev.filter((person) => person.id !== id));
          break;
        case 'entity':
          await getEntities(); // Actualiza la lista de entidades
           setEntities((prev) => prev.filter((entity) => entity.id !== id));
          break;
        case 'product':
          await getProducts(); // Actualiza la lista de productos
          setProducts((prev) => prev.filter((product) => product.id !== id));
          break;
        case 'association':
          await getAssociations(); // Actualiza la lista de asociaciones
           setAssociations((prev) => prev.filter((association) => association.id !== id));
          break;
        default:
          console.error("Tipo de objeto no válido para eliminar."); // Maneja el error si el tipo no es válido
          break;
      }
    }catch (error) {
      console.error('Error al eliminar el objeto:', error);
      //showMessage('Error al eliminar el objeto', 'error');
      //setIsLoading(false); // Finaliza la carga en caso de error
    }finally {
      setIsLoading(false); // Indica que los datos han terminado de cargarse
    }
  }

  /**Añadir o eliminar una relacion con un objeto */
  const addRemRelation = async (objectsType, idObject, typeRelation, idRelation, action) => {
    checkTokenExpiration(); // Verifica si el token ha expirado
    const response = await dataService.addRemRelationAPI(getPlural(objectsType),idObject, typeRelation, idRelation, action, user.token); // Llama al servicio para añadir o eliminar la relación
    let accion = action === 'add' ? 'añadida' : 'eliminada'; // Determina la acción realizada
    if(!response.ok) {
    console.error(`Error al ${accion} la relación:`, response.code); // Maneja el error si la creación del usuario falla
      showMessage(`Error al ${accion} la relación.`, "error"); // Muestra un mensaje de error al usuario
    }else{   
      showMessage(`Relación ${accion} correctamente`, 'success'); // Muestra un mensaje de éxito al usuario
    }
    console.log("addRemRelation", response); // Verifica la respuesta del servicio
  }

 /**USUARIOS */
 /**Recupera todos los usuarios */
  const getUsers = async (name='', order='', ordering='') => {
    try{
      checkTokenExpiration(); // Verifica si el token ha expirado
      setIsLoading(true); // Indica que los datos están siendo cargados
      const response = await dataService.fetchAPIUsers(user.token,name, order, ordering );     
      if (!response.users) {
        console.error("Error al cargar los usuarios:", response.code); // Maneja el error si la creación del usuario falla
        showMessage("Error al cargar los usuarios.", "error"); // Muestra un mensaje de error al usuario
      }
      const userCollection = response.users.map((userData) => {
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
    } catch (error) {
      console.error('Error al cargar productos:', error);
    } finally {
      setIsLoading(false); // Indica que los datos han terminado de cargarse
    }
  }
  /**Eliminar un usuario */
  const deleteUser = async (id) => {
    try {
      setIsLoading(true); // Indica que los datos están siendo cargados
      checkTokenExpiration(); // Verifica si el token ha expirado
      const response = await dataService.deleteAPIUser(id, user.token); // Llama al servicio de autenticación
      console.log("deleteUser", response); // Verifica el nuevo producto creado
      if (response.ok) {
        showMessage('Usuario eliminado correctamente', 'success');     
      }else{
        console.error("Error al eliminar el usuario:", response.code); // Maneja el error si la creación del usuario falla
        showMessage("Error al eliminar el usuario.", "error"); // Muestra un mensaje de error al usuario
      }
      await getUsers(); 
      return response; // Devuelve el resultado de la solicitud
    }catch (error) {
      console.error('Error al eliminar el usuario:', error);
      //showMessage('Error al eliminar el usuario', 'error');
    }finally {
      setIsLoading(false); // Indica que los datos han terminado de cargarse
    }
  }
  /**Actualizar un usuario */
  const updateUser = async (userObject, password, role) => {
    try{
      checkTokenExpiration(); // Verifica si el token ha expirado
      const response = await dataService.updateAPIUser(userObject, password, role, user.token); // Llama al servicio de autenticación
      if(!response.user) {
        console.error("Error al actualizar el usuario:", response.code); // Maneja el error si la creación del usuario falla
        showMessage("Error al actualizar el usuario.", "error"); // Muestra un mensaje de error al usuario
      }else{
        //console.log("addUpdateUser", response); // Verifica el nuevo producto creado
        VAGUE_MODE ? addUpdateUser(response.user) : await getUsers(); // Actualiza la lista de usuarios
        showMessage('Usuario actualizado correctamente', 'success'); // Muestra un mensaje de éxito al usuario
      }      
      return response; // Devuelve el resultado de la solicitud      
    }catch (error) {
      console.error('Error al actualizar el usuario:', error);
      showMessage('Error al actualizar el usuario', 'error');
    }
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
    console.log("status", response); // Verifica el nuevo producto creado
    if (response.user) { // Verifica si la respuesta es exitosa
      showMessage("Usuario creado correctamente.", "success"); // Muestra un mensaje de éxito al usuario
      navigate("/login"); // Redirige al usuario a la página de inicio de sesión
    } else {
      console.error("Error al crear el usuario:", response.code); // Maneja el error si la creación del usuario falla
      showMessage("Error al crear el usuario.", "error"); // Muestra un mensaje de error al usuario
    }
  }
  /**Obtener usuario por id */
  const getUserById = async (id) => {
    try{
      checkTokenExpiration(); // Verifica si el token ha expirado
      const response = await dataService.getAPIUserById(id, user.token); // Llama al servicio de autenticación
      //console.log("getUserById", response); // Verifica el nuevo producto creado
      if (!response.data.user) {
        console.error("Error al obtener el usuario por ID:", response.code); // Maneja el error si la creación del usuario falla
        showMessage("Error al obtener el usuario por ID.", "error"); // Muestra un mensaje de error al usuario
      }
      const userObject = new User({id: response.data.user.id, userName: response.data.user.username, 
        scope: response.data.user.role, token:'', expiresIn:''});
      userObject.setEtag(response.etag); // Guarda el ETag del usuario
      userObject.setEmail(response.data.user.email); // Guarda el correo electrónico del usuario
      userObject.setBirthDate(response.data.user.birthDate); // Guarda la fecha de nacimiento del usuario
      userObject.setName(response.data.user.name); // Guarda el nombre del usuario
      return userObject; // Devuelve el objeto User 
    }catch (error) {
      console.error('Error al cargar el usuario:', error);
      //showMessage('Error al cargar el usuario', 'error');
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
          isLoading, searchName, setSearchName,
          getEntities, getProducts, getPersons, getAssociations,
          getPersonById, getEntityById, getProductById, getAssociationById,
          createObject, deleteObject, updateObject, addRemRelation,
          getUsers, deleteUser, updateUser, register, getUserById, checkUserName}}>
      {children}
    </DataContext.Provider>
  );
};