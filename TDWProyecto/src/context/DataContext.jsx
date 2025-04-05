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
          deleteObject: deleteObjectById,}}>
      {children}
    </DataContext.Provider>
  );
};