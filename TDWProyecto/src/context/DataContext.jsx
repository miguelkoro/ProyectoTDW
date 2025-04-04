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

  useEffect(() => {
    const loadData = async () => {
      const [personsData, entitiesData, productsData] = await Promise.all([
        fetchPersons(),
        fetchEntities(),
        fetchProducts(),
      ]);
      setPersons(personsData);
      setEntities(entitiesData);
      setProducts(productsData);
      setIsLoading(false);
    };

    loadData();
  }, []);

  return (
    <DataContext.Provider value={{ persons, entities, products, isLoading }}>
      {children}
    </DataContext.Provider>
  );
};