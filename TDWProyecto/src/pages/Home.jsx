import "./Home.css";
import React, { useEffect, useState } from 'react';
import Section from '../components/Section';
import { fetchPersons, fetchEntities, fetchProducts } from '../services/dataService';
/*import {products} from '../mocks/products.json'; // Importa los productos desde el archivo products.json
import {persons} from '../mocks/persons.json'; // Importa los productos desde el archivo products.json
import {entities} from '../mocks/entities.json'; // Importa los productos desde el archivo products.json*/

const Home =() =>{  
  const [persons, setPersons] = useState([]);
  const [entities, setEntities] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const [personsData, entitiesData, productsData] = await Promise.all([
        fetchPersons(),
        fetchEntities(),
        fetchProducts()
      ]);

      /*console.log("Persons Data:", personsData);
      console.log("Entities Data:", entitiesData);
      console.log("Products Data:", productsData);*/

      
      setPersons(personsData);
      setEntities(entitiesData);
      setProducts(productsData);
    };

    loadData();
  }, []);

    return (
      <>
        <main>
              <Section objects={products} title={"Productos"}/>
              <Section objects={persons} title={"Personas"}/>
              <Section objects={entities} title={"Entidades"}/>
        </main>
      </>
    )
  }
  
  export default Home