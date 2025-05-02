import React, { createContext, useState, useEffect } from 'react';
import {
addRelationToProductLocal, addRelationToEntityLocal,
deleteRelationFromEntityLocal, deleteRelationFromProductLocal} from '../services/dataService';
import * as dataService from '../services/dataService'; // Importa todos los servicios de dataService

import { useAuth } from './AuthContext';
import Persona from '../models/Persona.js'; 
import Entidad from '../models/Entidad.js'; 
import Producto from '../models/Producto.js'; 
import Asociacion from '../models/Asociacion.js';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [persons, setPersons] = useState([]);
  const [entities, setEntities] = useState([]);
  const [products, setProducts] = useState([]);
  const [associations, setAssociations] = useState([]); // Estado para las asociaciones 

  const [isLoading, setIsLoading] = useState(true);

  const {user} = useAuth(); // Obtiene el usuario autenticado del contexto


  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState("");

  const showMessage = (text, type) => {
    setMessage(text);
    setMessageType(type);
    setTimeout(() => {
      setMessage(null);
    }, 2000);
  };



  // Cargar datos de la API
  const getProducts = async (name='', order='', ordering='') => {
    try {
      setIsLoading(true); // Indica que los datos están siendo cargados
  
      // Llama al servicio para cargar los productos
      const response = await dataService.fetchAPIObjects('products', name, order, ordering);
  
      if (response.type === 'error') {
        console.error(`Error al cargar productos: ${response.data}`);
        showMessage('Error al cargar productos', 'error');
        setIsLoading(false);
        return;
      }  
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
      showMessage('Error al cargar productos', 'error');
    } finally {
      setIsLoading(false); // Indica que los datos han terminado de cargarse
    }
  }
  const getPersons = async (name='', order='', ordering='') => {
    try {
      setIsLoading(true); // Indica que los datos están siendo cargados
  
      // Llama al servicio para cargar los productos
      const response = await dataService.fetchAPIObjects('persons', name, order, ordering);
  
      if (response.type === 'error') {
        console.error(`Error al cargar personas: ${response.data}`);
        showMessage('Error al cargar personas', 'error');
        setIsLoading(false);
        return;
      }  
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
      showMessage('Error al cargar personas', 'error');
    } finally {
      setIsLoading(false); // Indica que los datos han terminado de cargarse
    }
  }
  const getEntities = async (name='', order='', ordering='') => {
    try {
      setIsLoading(true); // Indica que los datos están siendo cargados
  
      // Llama al servicio para cargar los productos
      const response = await dataService.fetchAPIObjects('entities', name, order, ordering);
  
      if (response.type === 'error') {
        console.error(`Error al cargar entidades: ${response.data}`);
        showMessage('Error al cargar entidades', 'error');
        setIsLoading(false);
        return;
      }  
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
      showMessage('Error al cargar entidades', 'error');
    } finally {
      setIsLoading(false); // Indica que los datos han terminado de cargarse
    }
  }
  const getAssociations = async (name='', order='', ordering='') => {
    try {
      setIsLoading(true); // Indica que los datos están siendo cargados
  
      // Llama al servicio para cargar los productos
      const response = await dataService.fetchAPIObjects('associations', name, order, ordering);
  
      if (response.type === 'error') {
        console.error(`Error al cargar asociaciones: ${response.data}`);
        showMessage('Error al cargar asociaciones', 'error');
        setIsLoading(false);
        return;
      }  
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
      showMessage('Error al cargar asociaciones', 'error');
    } finally {
      setIsLoading(false); // Indica que los datos han terminado de cargarse
    }
  }

  const getPersonById = async (id) => {
    // Llama al servicio para obtener la persona por ID
    const { data, etag } = await dataService.fetchAPIObjectById('persons', id);
    // Convierte el objeto en una instancia de Persona
    const person = new Persona(data.person);
    person.etag = etag; // Asigna el ETag al objeto
    person.setType('person'); // Configura el tipo como 'person'

    return person; // Devuelve la persona encontrada

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
    const { data, etag } = await dataService.fetchAPIObjectById('products', id);
    // Convierte el objeto en una instancia de Persona
    const product = new Producto(data.product);
    product.etag = etag; // Asigna el ETag al objeto
    product.setType('product'); // Configura el tipo como 'person'
    console.log(JSON.stringify(product))
    return product; // Devuelve la persona encontrada
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
    !user && console.error("No hay usuario autenticado para crear el objeto."); // Verifica si hay un usuario autenticado
    const result = await dataService.createAPIObject(getPlural(object.type),object, user.token);
  }

  const updateProduct = async(updatedProduct) => {
    !user && console.error("No hay usuario autenticado para actualizar el producto."); // Verifica si hay un usuario autenticado
    //console.log("updateProduct", updatedProduct); // Verifica el nuevo producto creado
    const result = dataService.updateAPIObject("products", updatedProduct, user.token); // Llama al servicio para crear el producto
    //console.log("updateProduct", result); // Verifica el nuevo producto creado
  }
  const updatePerson = async(updatedPerson) => {
    !user && console.error("No hay usuario autenticado para actualizar la persona."); 
    const result = dataService.updateAPIObject("persons", updatedPerson, user.token); // Llama al servicio para crear el producto
  }
  const updateEntity = async(updatedEntity) => {
    !user && console.error("No hay usuario autenticado para actualizar la entidad."); // Verifica si hay un usuario autenticado
    const result = dataService.updateAPIObject("entities", updatedEntity, user.token); // Llama al servicio para crear el producto
  }
  const updateAssociation = async(updatedAssociation) => {
    !user && console.error("No hay usuario autenticado para actualizar la asociación."); // Verifica si hay un usuario autenticado
    const result = dataService.updateAPIObject("associations", updatedAssociation, user.token); // Llama al servicio para crear el producto
  }

  const updateObject = async(updatedObject) => {
    !user && console.error("No hay usuario autenticado para actualizar la asociación."); // Verifica si hay un usuario autenticado
    const result = dataService.updateAPIObject(getPlural(updatedObject.type), updatedObject, user.token); // Llama al servicio para crear el productor
    //console.log("updateObject", result); // Verifica el nuevo producto creado
    return result; // Devuelve el resultado de la actualización
  }


  const deleteObject = async (type, id) => {
    !user && console.error("No hay usuario autenticado para eliminar el objeto."); // Verifica si hay un usuario autenticado
    const result = await dataService.deleteAPIObject(getPlural(type), id, user.token); // Llama al servicio para eliminar
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

 const addRemRelation = async (objectsType, idObject, typeRelation, idRelation, action) => {
  const response = await dataService.addRemRelationAPI(getPlural(objectsType),idObject, typeRelation, idRelation, action, user.token); // Llama al servicio para añadir o eliminar la relación
  console.log("addRemRelation", response); // Verifica la respuesta del servicio
 }

  const deleteRelationFromEntity = (idObject, typeRelation, idRelation) => {
    let relationDeleted = deleteRelationFromEntityLocal(idObject, typeRelation, idRelation); // Llama al servicio para eliminar la relación
    if (relationDeleted) { // Si se eliminó la relación, lo actualiza en la constante
      setEntities((prevEntities) => prevEntities.map((entity) =>
          entity.id === Number(idObject) ? { ...entity, [typeRelation]: entity[typeRelation].filter((relationId) => relationId !== idRelation),}: entity ));
      showMessage(`Relación eliminada correctamente de la entidad (${idObject})`,"success"); // Tipo de mensaje
    } else {
      showMessage('No se pudo eliminar la relación de la entidad.', 'error'); // Mensaje de error si no se pudo eliminar la relación
      //console.error('No se pudo eliminar la relación de la entidad.'); // Maneja el error si no se pudo eliminar la relación
    }
  }
  const deleteRelationFromProduct = (idObject, typeRelation, idRelation) => {
    let relationDeleted = deleteRelationFromProductLocal(idObject, typeRelation, idRelation); // Llama al servicio para eliminar la relación
    if (relationDeleted) { // Si se eliminó la relación, lo actualiza en la constante
      setProducts((prevProducts) => prevProducts.map((product) =>
          product.id === Number(idObject) ? { ...product, [typeRelation]: product[typeRelation].filter((relationId) => relationId !== idRelation),}: product ));
      showMessage(`Relación eliminada correctamente del producto (${idObject})`,"success"); // Tipo de mensaje
      return true;
    } else {
      //console.error('No se pudo eliminar la relación del producto.'); // Maneja el error si no se pudo eliminar la relación
      showMessage('No se pudo eliminar la relación del producto.', 'error'); // Mensaje de error si no se pudo eliminar la relación
      return false;
    }
   //console.log("deleteRelationFromProduct", idObject, typeRelation, idRelation); // Verifica los parámetros recibidos
  }

  const addRelationToProduct = (idObject, typeRelation, idRelation) => {
    let relationAdded = addRelationToProductLocal(idObject, typeRelation, idRelation); // Llama al servicio para añadir la relación
    if (relationAdded) { // Si se añadió la relación, lo actualiza en la constante
      setProducts((prevProducts) => prevProducts.map((product) =>
          product.id === Number(idObject) ? { ...product, [typeRelation]: [...(product[typeRelation] || []), idRelation],}: product ));
      showMessage(`Relación añadida correctamente al producto (${idObject})`,"success"); // Tipo de mensaje
    } else {
      //console.error('No se pudo añadir la relación al producto.'); // Maneja el error si no se pudo añadir la relación
      showMessage('No se pudo añadir la relación al producto.', 'error'); // Mensaje de error si no se pudo añadir la relación
    }
    //return relationAdded; // Devuelve true si se añadió la relación, false en caso contrario
  };
  const addRelationToEntity = (idObject, typeRelation, idRelation) => {
    let relationAdded = addRelationToEntityLocal(idObject, typeRelation, idRelation); // Llama al servicio para añadir la relación
    if (relationAdded) { // Si se añadió la relación, lo actualiza en la constante
      setEntities((prevEntities) => prevEntities.map((entity) =>
          entity.id === Number(idObject) ? { ...entity, [typeRelation]: [...(entity[typeRelation] || []), idRelation],}: entity ));
      showMessage(`Relación añadida correctamente a la entidad (${idObject})`,"success"); // Tipo de mensaje
    } else {
      //console.error('No se pudo añadir la relación a la entidad.'); // Maneja el error si no se pudo añadir la relación
      showMessage('No se pudo añadir la relación a la entidad.', 'error'); // Mensaje de error si no se pudo añadir la relación
    }
  }





  return (
    <DataContext.Provider value={{ 
          persons, entities, products, associations,
          isLoading, message, messageType,
          getEntities, getProducts, getPersons, getAssociations,
          getPersonById, getEntityById, getProductById, getAssociationById,
          updateProduct, updatePerson, updateEntity, updateAssociation,
          createObject, deleteObject, updateObject,
          addRelationToProduct,
          addRelationToEntity,
          deleteRelationFromProduct,
          deleteRelationFromEntity,
          addRemRelation,
          showMessage,}}>
      {children}
    </DataContext.Provider>
  );
};