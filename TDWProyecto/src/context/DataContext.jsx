import React, { createContext, useState, useEffect } from 'react';
import { fetchJSONPersons, fetchJSONEntities, fetchJSONProducts, 
  fetchPersonsFromLocalStorage, fetchEntitiesFromLocalStorage, fetchProductsFromLocalStorage, 
  fetchPersonByIdFromLocal, fetchEntityByIdFromLocal, fetchProductByIdFromLocal, 
  deletePersonFromLocal, deleteEntityFromLocal, deleteProductFromLocal,
  createNewPersonToLocal, createNewEntityToLocal, createNewProductToLocal,
  updateProductInLocal} from '../services/dataService';

export const DataContext = createContext();
//Aquí, los datos (persons, entities, products) se cargan una vez y se almacenan en el contexto.
//El estado isLoading se utiliza para indicar si los datos están siendo cargados.


export const DataProvider = ({ children }) => {
  const [persons, setPersons] = useState([]);
  const [entities, setEntities] = useState([]);
  const [products, setProducts] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState(null); // Estado para manejar errores
  const LOCAL_STORAGE = true; // Estado para manejar el local storage


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
      console.log("getPersonById", id); // Verifica el ID recibido
      const person = await fetchPersonByIdFromLocal(id);  
      console.log('Persona encontrada:', person);
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

  const deleteRelation = async (idObject, type, typeRelation, idRelation) => {
    try {
      console.log(
        `Eliminando relación con ID: ${idObject}, tipo: ${type}, tipo de relación: ${typeRelation}, ID de relación: ${idRelation}`
      );
  
      switch (type) {
        case 'person':
          setPersons((prevPersons) =>
            prevPersons.map((person) =>
              person.id === idObject
                ? {
                    ...person,
                    [typeRelation]: person[typeRelation]?.filter(
                      (relationId) => relationId !== idRelation
                    ),
                  }
                : person
            )
          );
          break;
  
        case 'entity':
          setEntities((prevEntities) =>
            prevEntities.map((entity) =>
              entity.id === idObject
                ? {
                    ...entity,
                    [typeRelation]: entity[typeRelation]?.filter(
                      (relationId) => relationId !== idRelation
                    ),
                  }
                : entity
            )
          );
          break;
  
        case 'product':
          setProducts((prevProducts) =>
            prevProducts.map((product) =>
              product.id === idObject
                ? {
                    ...product,
                    [typeRelation]: product[typeRelation]?.filter(
                      (relationId) => relationId !== idRelation
                    ),
                  }
                : product
            )
          );
          break;
  
        default:
          console.error('Tipo de objeto no reconocido:', type);
      }
    } catch (error) {
      console.error('Error al eliminar la relación:', error);
    }
  };

  const addRelationToProduct = (idObject, typeRelation, idRelation) => {
    let relationAdded = false; // Variable para rastrear si se añadió la relación  
    return relationAdded; // Devuelve true si se añadió la relación, false en caso contrario
  };
  const addRelationToEntity = (idObject, typeRelation, idRelation) => {
    let relationAdded = false; // Variable para rastrear si se añadió la relación
    return relationAdded; // Devuelve true si se añadió la relación, false en caso contrario
  }

  const updateProduct = (id, updatedProduct) => {    
    if(updateProductInLocal(id, updatedProduct)) { //Lo actualiza en el local storage
      setProducts((prevProducts) => 
        prevProducts.map((product) => (product.id === Number(id) ? updatedProduct : product))
      );
    }
  };
  const updatePerson = (id, updatedPerson) => {
    if(updateProductInLocal(id, updatedPerson)) { //Lo actualiza en el local storage
      setPersons((prevPersons) => 
        prevPersons.map((person) => (person.id === Number(id) ? updatedPerson : person))
      );
    }
  }
  const updateEntity = (id, updatedEntity) => {
    if(updateProductInLocal(id, updatedEntity)) { //Lo actualiza en el local storage
      setEntities((prevEntities) => 
        prevEntities.map((entity) => (entity.id === Number(id) ? updatedEntity : entity))
      );
    }
  }

  const deletePerson = (id) => {
    if(deletePersonFromLocal(id)) {
      setPersons((prevPersons) => prevPersons.filter((person) => person.id !== Number(id))); //Lo quita de las constantes
    }
  }
  const deleteEntity = (id) => {
    if(deleteEntityFromLocal(id)) { //Lo borra de localstorage
      setEntities((prevEntities) => prevEntities.filter((entity) => entity.id !== Number(id))); //Lo quita de las constantes
    }
  }
  const deleteProduct = (id) => {
    if(deleteProductFromLocal(id)) {
      setProducts((prevProducts) => prevProducts.filter((product) => product.id !== Number(id))); //Lo quita de las constantes
    }
  }

  const createNewPerson = (person) => {
    createNewPersonToLocal(person); //Crea la persona en el local storage 
    //setPersons((prevPersons) => [...prevPersons, person]);
    fetchPersonsFromLocal(); // Cargar datos desde local storage
  };
  const createNewEntity = (entity) => {
    createNewEntityToLocal(entity); //Llama al servicio para crear la nueva entidad
    //setEntities((prevEntities) => [...prevEntities, entity]);
    fetchEntitiesFromLocal(); // Cargar datos desde local storage
  }
  const createNewProduct = (product) => {
    console.log("createNewProdfdfduct", product); // Verifica el nuevo producto creado
    createNewProductToLocal(product); //Llama al servicio para crear el nuevo producto
    //setProducts((prevProducts) => [...prevProducts, product]);
    fetchProductsFromLocal(); // Cargar datos desde local storage
    console.log("creat", products); // Verifica el nuevo producto creado
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
          deleteRelation,
          addRelationToProduct,
          addRelationToEntity}}>
      {children}
    </DataContext.Provider>
  );
};