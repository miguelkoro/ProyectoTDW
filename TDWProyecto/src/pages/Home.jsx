import "../styles/index.scss";
import { useContext, useEffect } from 'react';
import Section from '../components/Section';
import { DataContext } from '../context/DataContext';
import { useAuth } from "../context/AuthContext";

const Home =() =>{  
    const { user} = useAuth(); // Obtén el usuario autenticado

    const { persons, entities, products, associations, users} = useContext(DataContext); 

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