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
  
      // Llama al servicio para cargar los productos
      const response = await dataService.fetchAPIObjects('products', name, order, ordering);

      // Convierte cada producto del JSON en una instancia de Product
      const productCollection = response.data.products.map((productData) => {
        const product = new Producto(productData.product); // Crea una instancia de Product
        product.setType('product'); // Configura el tipo como 'product'
        //console.log('Producto cargado:', productData); // Verifica el producto cargado
        return product;
      });
  
      setProducts(productCollection); // Guarda los productos en el estado
      //showMessage('Productos cargados correctamente', 'success');
    } catch (error) {
      console.error('Error al cargar productos:', error);
      //showMessage('Error al cargar productos', 'error');
    } finally {
      setIsLoading(false); // Indica que los datos han terminado de cargarse
    }
  }
  const getPersons = async (name='', order='', ordering='') => {
    try {
      setIsLoading(true); // Indica que los datos están siendo cargados
  
      // Llama al servicio para cargar los productos
      const response = await dataService.fetchAPIObjects('persons', name, order, ordering);
  

      // Convierte cada producto del JSON en una instancia de Product
      const personCollection = response.data.persons.map((personData) => {
        const person = new Persona(personData.person); // Crea una instancia de Product
        person.setType('person'); // Configura el tipo como 'product'
        //console.log('Producto cargado:', productData); // Verifica el producto cargado
        return person;
      });  
      setPersons(personCollection); // Guarda los productos en el estado
      //showMessage('Productos cargados correctamente', 'success');
    } catch (error) {
      console.error('Error al cargar personas:', error);
      //showMessage('Error al cargar personas', 'error');
      //setIsLoading(false); // Finaliza la carga en caso de error
    } finally {
      setIsLoading(false); // Indica que los datos han terminado de cargarse
    }
  }
  const getEntities = async (name='', order='', ordering='') => {
    try {
      setIsLoading(true); // Indica que los datos están siendo cargados
  
      // Llama al servicio para cargar los productos
      const response = await dataService.fetchAPIObjects('entities', name, order, ordering);
      // Convierte cada producto del JSON en una instancia de Product
      const entityCollection = response.data.entities.map((entityData) => {
        const entity = new Entidad(entityData.entity); // Crea una instancia de Product
        entity.setType('entity'); // Configura el tipo como 'product'
        //console.log('Producto cargado:', productData); // Verifica el producto cargado
        return entity;
      });
  
      setEntities(entityCollection); // Guarda los productos en el estado
      //showMessage('Productos cargados correctamente', 'success');
      //console.log("loadEntities", entityCollection); // Verifica el nuevo producto creado
    } catch (error) {
      console.error('Error al cargar entidades:', error);
      //showMessage('Error al cargar entidades', 'error');
      //setIsLoading(false); // Finaliza la carga en caso de error
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
        //console.log('Producto cargado:', productData); // Verifica el producto cargado
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
      // Convierte el objeto en una instancia de Persona
      const product = new Producto(data.product);
      product.etag = etag; // Asigna el ETag al objeto
      product.setType('product'); // Configura el tipo como 'person'
      console.log(JSON.stringify(product))
      return product; // Devuelve la persona encontrada
    } catch (error) {
      console.error('Error al cargar el producto:', error);
      //showMessage('Error al cargar el producto', 'error');
      //setIsLoading(false); // Finaliza la carga en caso de error
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
    //console.log("updateObject", result); // Verifica el nuevo producto creado
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

 const addRemRelation = async (objectsType, idObject, typeRelation, idRelation, action) => {
  checkTokenExpiration(); // Verifica si el token ha expirado
  const response = await dataService.addRemRelationAPI(getPlural(objectsType),idObject, typeRelation, idRelation, action, user.token); // Llama al servicio para añadir o eliminar la relación
  console.log("addRemRelation", response); // Verifica la respuesta del servicio
 }

const getUsers = async (name='', order='', ordering='') => {
    try{
      checkTokenExpiration(); // Verifica si el token ha expirado
      setIsLoading(true); // Indica que los datos están siendo cargados
      
      // Llama al servicio para cargar los productos
      const response = await dataService.fetchAPIUsers(user.token,name, order, ordering );

      /*if (response.type === 'error') {
        console.error(`Error al cargar productos: ${response.data}`);
        showMessage('Error al cargar productos', 'error');
        setIsLoading(false);
        return;
      }  */
      // Convierte cada producto del JSON en una instancia de Product
      //console.log("getUsers", response); // Verifica el nuevo producto creado
      const userCollection = response.users.map((userData) => {
        const newUser= new User({
          id: userData.user.id,
          userName: userData.user.username,
          scope: userData.user.role,
          //email: userData.user.email,
        });
        newUser.setEmail(userData.user.email); // Guarda el correo electrónico del usuario
        return newUser; // Devuelve el nuevo objeto User
      }); 
      console.log("userCollection", userCollection); // Verifica el nuevo producto creado

      setUsers(userCollection); // Guarda los productos en el estado
    
    //showMessage('Productos cargados correctamente', 'success');
    } catch (error) {
      console.error('Error al cargar productos:', error);
      //showMessage('Error al cargar productos', 'error');
    } finally {
      setIsLoading(false); // Indica que los datos han terminado de cargarse
    }
}

const deleteUser = async (id) => {
  try {
    setIsLoading(true); // Indica que los datos están siendo cargados
    checkTokenExpiration(); // Verifica si el token ha expirado
    const response = await dataService.deleteAPIUser(id, user.token); // Llama al servicio de autenticación
    await getUsers(); // Actualiza la lista de usuarios
    return response; // Devuelve el resultado de la solicitud
  }catch (error) {
    console.error('Error al eliminar el usuario:', error);
    //showMessage('Error al eliminar el usuario', 'error');
  }finally {
    setIsLoading(false); // Indica que los datos han terminado de cargarse
  }
}

  const updateUser = async (userObject, password, role) => {
    try{
      checkTokenExpiration(); // Verifica si el token ha expirado
      const response = await dataService.updateAPIUser(userObject, password, role, user.token); // Llama al servicio de autenticación
      await getUsers(); // Actualiza la lista de usuarios
      showMessage('Usuario actualizado correctamente', 'success'); // Muestra un mensaje de éxito al usuario
      return response; // Devuelve el resultado de la solicitud      
    }catch (error) {
      console.error('Error al actualizar el usuario:', error);
      showMessage('Error al actualizar el usuario', 'error');
    }
  }

  const register = async (userName, email, password, birthDate) => {
    //console.log("register", userName, email, password); // Muestra el objeto en la consola
    const response = await dataService.createAPIUser(userName, email, password, birthDate); // Llama al servicio de autenticación
    if (response) {
      //alert("Usuario creado correctamente."); // Muestra un mensaje de éxito al usuario
      showMessage("Usuario creado correctamente.", "success"); // Muestra un mensaje de éxito al usuario
      navigate("/login"); // Redirige al usuario a la página de inicio de sesión
    } else {
      //alert("Error al crear el usuario."); // Muestra un mensaje de error al usuario
      showMessage("Error al crear el usuario.", "error"); // Muestra un mensaje de error al usuario
    }
  }

  const getUserById = async (id) => {
    checkTokenExpiration(); // Verifica si el token ha expirado
    const response = await dataService.getAPIUserById(id, user.token); // Llama al servicio de autenticación
    const userObject = new User({
      id: response.data.user.id, 
      userName: response.data.user.username, 
      scope: response.data.user.role, 
      token:'',  
      expiresIn:''});
    userObject.setEtag(response.etag); // Guarda el ETag del usuario
    userObject.setEmail(response.data.user.email); // Guarda el correo electrónico del usuario
    userObject.setBirthDate(response.data.user.birthDate); // Guarda la fecha de nacimiento del usuario
    return userObject; // Devuelve el objeto User 
  }

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