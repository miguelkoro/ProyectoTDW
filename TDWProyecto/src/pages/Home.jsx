import "../styles/index.css";
import { useContext, useEffect } from 'react';
import Section from '../components/Section';
import { DataContext } from '../context/DataContext';
import { useAuth } from "../context/AuthContext";

const Home =() =>{  
    const { user, userLogin } = useAuth(); // Obtén el usuario autenticado

    const { persons, entities, products, associations, users,
      getPersons, getEntities, getProducts, getAssociations, getUsers} = useContext(DataContext); 
    //Aquí, los datos (persons, entities, products) se obtienen directamente del contexto.
    useEffect(() => {
      if (userLogin){  // Si el usuario está cargando, no hace nada
        getPersons(); // Llama a la función para obtener personas
        getEntities(); // Llama a la función para obtener entidades
        getProducts(); // Llama a la función para obtener productos
        getAssociations(); // Llama a la función para obtener asociaciones
        if (user && user?.scope === "writer") getUsers(); // Llama a la función para obtener usuarios
        console.log("useEffect normal", user); // Muestra el usuario en la consola
      }
    }, [userLogin]);

    return (
      <>
        <main>
              <Section objects={products} title={"💡 PRODUCTOS"} type={'product'}/>
              <Section objects={persons} title={"🪠 PERSONAS"} type={'person'}/>
              <Section objects={entities} title={"🧸 ENTIDADES"} type={'entity'}/>
              <Section objects={associations} title={"🔥 ASOCIACIONES"} type={'association'}/>
              {user?.scope==="writer" && <Section objects={users} title={"👥 USUARIOS"} type={'user'}/>}
        </main>
      </>
    )
  }
  
  export default Home