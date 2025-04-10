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

  const addRelation = (idObject, type, typeRelation, idRelation) => {
    switch (type) {
      case 'person':
        setPersons((prevPersons) =>
          prevPersons.map((person) =>
            person.id === idObject
              ? {
                  ...person,
                  [typeRelation]: person[typeRelation]?.includes(idRelation)
                    ? person[typeRelation] // Si ya existe, no lo añade
                    : [...(person[typeRelation] || []), idRelation],
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
                  [typeRelation]: entity[typeRelation]?.includes(idRelation)
                    ? entity[typeRelation] // Si ya existe, no lo añade
                    : [...(entity[typeRelation] || []), idRelation],
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
                  [typeRelation]: product[typeRelation]?.includes(idRelation)
                    ? product[typeRelation] // Si ya existe, no lo añade
                    : [...(product[typeRelation] || []), idRelation],
                }
              : product
          )
        );
        break;
  
      default:
        console.error('Tipo de objeto no reconocido:', type);
    }
    console.log(products);
  };

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
      switch (object.type) {
        case 'person':
          //await deletePerson(object.id);
          setPersons((prevPersons) => {
            const updatedPersons = prevPersons.filter((person) => person.id !== object.id);
            console.log('Estado actualizado de persons:', updatedPersons);
            return updatedPersons;
          });
          console.log(`Persona con id ${object.id} eliminada.`);
          break;
        case 'entity':
          //await deleteEntity(object.id);
          setEntities((prevEntities) => {
            const updatedEntities = prevEntities.filter((entity) => entity.id !== object.id);
            console.log('Estado actualizado de entities:', updatedEntities);
            return updatedEntities;
          });
          break;
        case 'product':
          //await deleteProduct(object.id);
          setProducts((prevProducts) => {
            const updatedProducts = prevProducts.filter((product) => product.id !== object.id);
            console.log('Estado actualizado de products:', updatedProducts);
            return updatedProducts;
          }); 
          break;
        default:
          console.error('Tipo de objeto no reconocido:', object.type);
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
          createObject: createNewObject,
          deleteRelation,
          addRelation}}>
      {children}
    </DataContext.Provider>
  );
};