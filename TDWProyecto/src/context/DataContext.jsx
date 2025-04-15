import React, { createContext, useState, useEffect } from 'react';
import { fetchJSONPersons, fetchJSONEntities, fetchJSONProducts, 
  fetchPersonsFromLocalStorage, fetchEntitiesFromLocalStorage, fetchProductsFromLocalStorage, 
  fetchPersonByIdFromLocal, fetchEntityByIdFromLocal, fetchProductByIdFromLocal, 
  deletePersonFromLocal, deleteEntityFromLocal, deleteProductFromLocal,
  createNewPersonToLocal, createNewEntityToLocal, createNewProductToLocal,
  updateProductInLocal, updatePersonInLocal, updateEntityInLocal,
addRelationToProductLocal, addRelationToEntityLocal,
deleteRelationFromEntityLocal, deleteRelationFromProductLocal} from '../services/dataService';

export const DataContext = createContext();
//Aquí, los datos (persons, entities, products) se cargan una vez y se almacenan en el contexto.
//El estado isLoading se utiliza para indicar si los datos están siendo cargados.


export const DataProvider = ({ children }) => {
  const [persons, setPersons] = useState([]);
  const [entities, setEntities] = useState([]);
  const [products, setProducts] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const LOCAL_STORAGE = true; // Estado para manejar el local storage

  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState("");

  const showMessage = (text, type) => {
    setMessage(text);
    setMessageType(type);
    setTimeout(() => {
      setMessage(null);
    }, 4000);
  };


  //Que coja los datos del json y los almacene en el local storage
  const loadDataFromJson = async () => {
    setIsLoading(true); // Indica que los datos están siendo cargados
    localStorage.removeItem('persons'); // Elimina solo los datos de personas
    localStorage.removeItem('entities'); // Elimina solo los datos de entidades
    localStorage.removeItem('products'); // Elimina solo los datos de productos
    // Cargar los datos desde el JSON
    const [personsData, entitiesData, productsData] = await Promise.all([ 
      fetchJSONPersons(),
      fetchJSONEntities(),
      fetchJSONProducts(),
    ]);
    // Guardar los datos en el local storage
    fetchPersonsFromLocal(); // Cargar datos desde local storage
    fetchEntitiesFromLocal(); // Cargar datos desde local storage
    fetchProductsFromLocal(); // Cargar datos desde local storage
    setIsLoading(false); // Indica que los datos han terminado de cargarse
  }
  
  // Cargar datos desde local storage
  const fetchEntitiesFromLocal = () => {
    setIsLoading(true); // Indica que los datos están siendo cargados
    let fetchEntities = fetchEntitiesFromLocalStorage()
    setEntities(fetchEntities); // Cargar datos desde local storage
    setIsLoading(false); // Indica que los datos han terminado de cargarse
  }   
  
  const fetchPersonsFromLocal = () => {
    setIsLoading(true); // Indica que los datos están siendo cargados
    let fetchPersons = fetchPersonsFromLocalStorage()
    setPersons(fetchPersons); // Cargar datos desde local storage      
    setIsLoading(false); // Indica que los datos han terminado de cargarse
  }

  const fetchProductsFromLocal = () => {
    setIsLoading(true); // Indica que los datos están siendo cargados
    let fetchProducts = fetchProductsFromLocalStorage()
    setProducts(fetchProducts); // Cargar datos desde local storage      
    
    setIsLoading(false); // Indica que los datos han terminado de cargarse
  }
      

  // Llama a loadData al montar el componente
  useEffect(() => {
    //loadData();
    LOCAL_STORAGE && loadDataFromJson() // Cargar datos desde JSON al montar el componente
  }, []);

  //Metodo que pasandole un id, y el tipo de objeto devuelva el objeto correspondiente

  const getPersonById = async (id) => {
    if (LOCAL_STORAGE) {
      // Obtén la persona desde localStorage
      //console.log("getPersonById", id); // Verifica el ID recibido
      const person = await fetchPersonByIdFromLocal(id);  
      //console.log('Persona encontrada:', person);
      //console.log('Persona encontrada:', person);
      if (person) {
        //console.log('Persona encontrada:', person);  
        // Actualiza el estado de persons con la nueva persona si no existe
        setPersons((prevPersons) => {
          const exists = prevPersons.some((p) => p.id === Number(person.id)); // Verifica si ya existe
          if (!exists) {
            console.log('Añadiendo nueva persona al estado:', person);
            return [...prevPersons, person]; // Agrega la nueva persona si no existe
          }
          return prevPersons; // Devuelve la lista sin cambios si ya existe
        });  
        
        return person; // Devuelve la persona encontrada
      } else {
        console.error(`Persona con ID ${id} no encontrada en localStorage.`);
      }
    }
    return null; // Devuelve null si LOCAL_STORAGE es false o no se encuentra la persona
  };
  const getEntityById = async (id) => {
    if (LOCAL_STORAGE) {
      const entity = await fetchEntityByIdFromLocal(id);
      //console.log('Entidad encontrada:', entity);
      if(entity) {
        setEntities((prevEntities) => {
          const exists = prevEntities.some((e) => e.id === Number(entity.id)); // Verifica si ya existe
          if (!exists) {
            console.log('Añadiendo nueva entidad al estado:', entity);
            return [...prevEntities, entity]; // Agrega la nueva entidad si no existe
          }
          return prevEntities; // Devuelve la lista sin cambios si ya existe
        });
        return entity; // Devuelve la entidad encontrada
      }
      else {
        console.error(`Entidad con ID ${id} no encontrada en localStorage.`);
      }
      return null; // Devuelve null si LOCAL_STORAGE es false o no se encuentra la entidad
    }
  }
  const getProductById = async (id) => {
    if (LOCAL_STORAGE) {
      const product = fetchProductByIdFromLocal(id);
      if (product) {
        //console.log('Producto encontrado:', product);
  
        // Actualiza el estado de products con el nuevo producto si no existe
        setProducts((prevProducts) => {
          const exists = prevProducts.some((p) => p.id === Number(product.id)); // Verifica si ya existe
          if (!exists) {
           // console.log('Añadiendo nuevo producto al estado:', product);
            return [...prevProducts, product]; // Agrega el nuevo producto si no existe
          }
          return prevProducts; // Devuelve la lista sin cambios si ya existe
        });
  
        return product; // Devuelve el producto encontrado
      } else {
        console.error(`Producto con ID ${id} no encontrado en localStorage.`);
      }
    }
    return null; // Devuelve null si LOCAL_STORAGE es false o no se encuentra el producto
  };


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

  const updateProduct = (id, updatedProduct) => {    
    if(updateProductInLocal(id, updatedProduct)) { //Lo actualiza en el local storage
      setProducts((prevProducts) => 
        prevProducts.map((product) => (product.id === Number(id) ? updatedProduct : product))
      );
      showMessage(`Producto (${id}) actualizado correctamente`,"success"); // Tipo de mensaje
    }else{
      showMessage(`Error al actualizar el producto (${id})`,"error"); // Tipo de mensaje
    }
  };
  const updatePerson = (id, updatedPerson) => {
    if(updatePersonInLocal(id, updatedPerson)) { //Lo actualiza en el local storage
      setPersons((prevPersons) => 
        prevPersons.map((person) => (person.id === Number(id) ? updatedPerson : person))
      );
      showMessage(`Persona (${id}) actualizada correctamente`,"success"); // Tipo de mensaje
    }else{
      showMessage(`Error al actualizar la persona (${id})`,"error"); // Tipo de mensaje
    }
  }
  const updateEntity = (id, updatedEntity) => {
    if(updateEntityInLocal(id, updatedEntity)) { //Lo actualiza en el local storage
      setEntities((prevEntities) => 
        prevEntities.map((entity) => (entity.id === Number(id) ? updatedEntity : entity))
      );
      showMessage(`Entidad (${id}) actualizada correctamente`,"success"); // Tipo de mensaje
    }else{
      showMessage(`Error al actualizar la entidad (${id})`,"error"); // Tipo de mensaje
    }
  }

  const deletePerson = (id) => {
    if(deletePersonFromLocal(id)) {
      setPersons((prevPersons) => prevPersons.filter((person) => person.id !== Number(id))); //Lo quita de las constantes
      showMessage(`Persona (${id}) eliminada correctamente`,"success"); // Tipo de mensaje
    }else{
      showMessage(`Error al eliminar la persona (${id})`,"error"); // Tipo de mensaje
    }
  }
  const deleteEntity = (id) => {
    if(deleteEntityFromLocal(id)) { //Lo borra de localstorage
      setEntities((prevEntities) => prevEntities.filter((entity) => entity.id !== Number(id))); //Lo quita de las constantes
      showMessage(`Entidad (${id}) eliminada correctamente`,"success"); // Tipo de mensaje
    }else{
      showMessage(`Error al eliminar la entidad (${id})`,"error"); // Tipo de mensaje
    }
  }
  const deleteProduct = (id) => {
    if(deleteProductFromLocal(id)) {
      setProducts((prevProducts) => prevProducts.filter((product) => product.id !== Number(id))); //Lo quita de las constantes
      showMessage(`Producto (${id}) eliminado correctamente`,"success"); // Tipo de mensaje
    }else{
      showMessage(`Error al eliminar el producto (${id})`,"error"); // Tipo de mensaje
    }
  }

  const createNewPerson = (person) => {
    createNewPersonToLocal(person); //Crea la persona en el local storage 
    //setPersons((prevPersons) => [...prevPersons, person]);
    fetchPersonsFromLocal(); // Cargar datos desde local storage
    showMessage(`Persona creada correctamente`,"success"); // Tipo de mensaje
  };
  const createNewEntity = (entity) => {
    createNewEntityToLocal(entity); //Llama al servicio para crear la nueva entidad
    //setEntities((prevEntities) => [...prevEntities, entity]);
    fetchEntitiesFromLocal(); // Cargar datos desde local storage
    showMessage(`Entidad creada correctamente`,"success"); // Tipo de mensaje
  }
  const createNewProduct = (product) => {
    //console.log("createNewProdfdfduct", product); // Verifica el nuevo producto creado
    createNewProductToLocal(product); //Llama al servicio para crear el nuevo producto
    //setProducts((prevProducts) => [...prevProducts, product]);
    fetchProductsFromLocal(); // Cargar datos desde local storage
    showMessage(`Producto creado correctamente`,"success"); // Tipo de mensaje
    //console.log("creat", products); // Verifica el nuevo producto creado
  }




  return (
    <DataContext.Provider value={{ 
          persons, 
          entities, 
          products, 
          isLoading, 
          getPersonById : getPersonById,
          getEntityById : getEntityById,
          getProductById : getProductById,
          deleteEntity,
          deleteProduct,
          deletePerson,
          updateProduct,
          updatePerson,
          updateEntity,
          createNewEntity,
          createNewProduct,
          createNewPerson,
          addRelationToProduct,
          addRelationToEntity,
          deleteRelationFromProduct,
          deleteRelationFromEntity,
          showMessage,
          message,
          messageType,}}>
      {children}
    </DataContext.Provider>
  );
};