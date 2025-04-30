import "../styles/Home.css";
import { useContext, useEffect } from 'react';
import Section from '../components/Section';
import { DataContext } from '../context/DataContext';

const Home =() =>{  

    const { persons, entities, products, associations, 
      getPersons, getEntities, getProducts, getAssociations} = useContext(DataContext); 
    //Aquí, los datos (persons, entities, products) se obtienen directamente del contexto.
    useEffect(() => {
      getPersons(); // Llama a la función para obtener personas
      getEntities(); // Llama a la función para obtener entidades
      getProducts(); // Llama a la función para obtener productos
      getAssociations(); // Llama a la función para obtener asociaciones
    }, []);


    return (
      <>
        <main>
              <Section objects={products} title={"PRODUCTOS"}/>
              <Section objects={persons} title={"PERSONAS"}/>
              <Section objects={entities} title={"ENTIDADES"}/>
              <Section objects={associations} title={"ASOCIACIONES"}/>
        </main>
      </>
    )
  }
  
  export default Home