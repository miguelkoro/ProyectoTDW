import "../styles/Home.css";
import React, { useContext } from 'react';
import Section from '../components/Section';
import { DataContext } from '../context/DataContext';

const Home =() =>{  

    const { persons, entities, products, associations} = useContext(DataContext); 
    //Aquí, los datos (persons, entities, products) se obtienen directamente del contexto.

    return (
      <>
        <main>
              <Section objects={products} title={"Productos"}/>
              <Section objects={persons} title={"Personas"}/>
              <Section objects={entities} title={"Entidades"}/>
              <Section objects={associations} title={"Asociaciones"}/>
        </main>
      </>
    )
  }
  
  export default Home