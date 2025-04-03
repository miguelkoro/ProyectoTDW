import "./Home.css";
import Section from "../components/Section";
import {products} from '../mocks/products.json'; // Importa los productos desde el archivo products.json
import {persons} from '../mocks/persons.json'; // Importa los productos desde el archivo products.json
import {entities} from '../mocks/entities.json'; // Importa los productos desde el archivo products.json

function Home() {  

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