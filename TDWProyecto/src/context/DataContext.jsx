import React, { createContext, useState, useEffect } from 'react';
import { fetchPersons, fetchEntities, fetchProducts } from '../services/dataService';

export const DataContext = createContext();
//Aquí, los datos (persons, entities, products) se cargan una vez y se almacenan en el contexto.
//El estado isLoading se utiliza para indicar si los datos están siendo cargados.


export const DataProvider = ({ children }) => {
  const [persons, setPersons] = useState([]);
  const [entities, setEntities] = useState([]);
  const [products, setProducts] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

    // con la funcion loadData  cargo los datos desde el componente que lo necesite
  const loadData = async () => {
    setIsLoading(true); // Indica que los datos están siendo cargados
    const [personsData, entitiesData, productsData] = await Promise.all([
      fetchPersons(),
      fetchEntities(),
      fetchProducts(),
    ]);
    setPersons(personsData);
    setEntities(entitiesData);
    setProducts(productsData);
    setIsLoading(false); // Indica que los datos han terminado de cargarse

     // Verifica si los datos son instancias de las clases
  /*if (personsData.length > 0) {
    console.log('Tipo del primer objeto en personsData:', personsData[0].getType());
  }*/


  };

  // Llama a loadData al montar el componente
  useEffect(() => {
    loadData();
  }, []);

  //Metodo que pasandole un id, y el tipo de objeto devuelva el objeto correspondiente
  const getObjectById = async (id, type) => {
    switch (type) {
      case 'Persona':
        return persons.find((person) => person.id === id);
      case 'Entidad':
        return entities.find((entity) => entity.id === id);
      case 'Producto':
        return products.find((product) => product.id === id);
      default:
        console.error('Tipo de objeto no reconocido:', type);
    }
   
  }

  const createNewObject = (object) => {
    switch (object.getType()) {
      case 'Persona':
        setPersons((prevPersons) => [...prevPersons, object]);
        break;
      case 'Entidad':
        setEntities((prevEntities) => [...prevEntities, object]);
        break;
      case 'Producto':
        setProducts((prevProducts) => [...prevProducts, object]);
        break;
      default:
        console.error('Tipo de objeto no reconocido:', object.getType());
    }

  }

  //Modificar mas tarde la llamada a dataService para realizar el borrado contra la API
  const deleteObjectById = async (object) => {
    try {
      console.log('Estado actual de object:', object);
      switch (object.getType()) {
        case 'Persona':
          //await deletePerson(object.id);
          setPersons((prevPersons) => {
            const updatedPersons = prevPersons.filter((person) => person.id !== object.id);
            console.log('Estado actualizado de persons:', updatedPersons);
            return updatedPersons;
          });
          console.log(`Persona con id ${object.id} eliminada.`);
          break;
        case 'Entidad':
          //await deleteEntity(object.id);
          setEntities((prevEntities) => {
            const updatedEntities = prevEntities.filter((entity) => entity.id !== object.id);
            console.log('Estado actualizado de entities:', updatedEntities);
            return updatedEntities;
          });
          break;
        case 'Producto':
          //await deleteProduct(object.id);
          setProducts((prevProducts) => {
            const updatedProducts = prevProducts.filter((product) => product.id !== object.id);
            console.log('Estado actualizado de products:', updatedProducts);
            return updatedProducts;
          }); 
          break;
        default:
          console.error('Tipo de objeto no reconocido:', object.getType());
      }
      
    } catch (error) {
      console.error('Error al eliminar el objeto:', error);
    }
  };

  return (
    <DataContext.Provider value={{ 
          persons, 
          entities, 
          products, 
          isLoading, 
          reloadData: loadData,
          deleteObject: deleteObjectById,
          getObject: getObjectById,
          createObject: createNewObject,}}>
      {children}
    </DataContext.Provider>
  );
};