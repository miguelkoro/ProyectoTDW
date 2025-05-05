import "../styles/Home.css";
import { useContext, useEffect } from 'react';
import Section from '../components/Section';
import { DataContext } from '../context/DataContext';
import { useAuth } from "../context/AuthContext";

const Home =() =>{  
    const { user } = useAuth(); // Obtén el usuario autenticado

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
              <Section objects={products} title={"💡 PRODUCTOS"} type={'product'}/>
              <Section objects={persons} title={"🪠 PERSONAS"} type={'person'}/>
              <Section objects={entities} title={"🧸 ENTIDADES"} type={'entity'}/>
              <Section objects={associations} title={"🔥 ASOCIACIONES"} type={'association'}/>
              {user?.scope==="writer" && <Section objects={associations} title={"👥 USUARIOS"} type={'association'}/>}
        </main>
      </>
    )
  }
  
  export default Home