import React, { use } from 'react';
import Card from '../components/Card.jsx'; // Importa el componente de sección pequeña
import CardUser from '../components/CardUser.jsx'; // Importa el componente de sección pequeña
import { useAuth } from '../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate para redirección
import { useContext, useEffect, useState } from 'react';
import { DataContext } from '../context/DataContext';
import loadingGif from '../assets/images/Loading.gif';
import '../styles/index.scss';
import { useLocation } from "react-router-dom";


const Search = (props) => {
  //const { user } = useAuth(); // Obtén el usuario autenticado del contexto
  //const navigate = useNavigate(); // Hook para redirigir
  //const location = useLocation();
  //const nameSearch =  location.state?.name;// || location.pathname.split('/')[2];
  const [objects, setObjects] = useState([]); 
  //const [title, setTitle] = useState(''); // Estado para el título
  //const [type, setType] = useState(''); // Estado para el tipo
  const [selectedTypes, setSelectedTypes] = useState([]); // Estado para los tipos seleccionados
  const [searchNameInput, setSearchNameInput] = useState(''); // Estado para el nombre de búsqueda'');
  const { persons, entities, products, associations, isLoading, searchName, setSearchName} = useContext(DataContext); 

  useEffect(() => {
    /*const filteredObjects = [] // Arreglo para almacenar los objetos filtrados
    const namedObjects = getSelectedTypes(filteredObjects) // Llama a la función para obtener los tipos seleccionados

    setObjects(getNamedObjects(namedObjects)); // Actualiza el estado de los objetos con los objetos filtrados
*/
    searchNavBar(); // Llama a la función para realizar la búsqueda inicial
  }, [persons, entities, products, associations, searchName]); // Se ejecuta cuando cambian los tipos seleccionados o las colecciones

  const searchNavBar = () => {
    const filteredObjects = [] // Arreglo para almacenar los objetos filtrados
    const namedObjects = getSelectedTypes(filteredObjects) // Llama a la función para obtener los tipos seleccionados

    //setObjects(getNamedObjects(namedObjects)); 
    setObjects(namedObjects.filter((obj) =>
      obj.name.toLowerCase().includes(searchName.toLowerCase())
    ));
    if (searchName) {
      setSearchNameInput(searchName); // Actualiza el estado del nombre de búsqueda
    }
  }

  /*useEffect(() => {
    if (searchNameInput) {
      //setSearchNameInput(searchName); // Actualiza el estado del nombre de búsqueda
      handleFilterClick(); // Realiza la búsqueda inicial
    }
  }, [searchNameInput]);*/

  const handleFilterClick = () => {
    let filteredObjects = []
    getSelectedTypes(filteredObjects)
    const namedObjects = getNamedObjects(filteredObjects);

    setObjects(namedObjects);
  }

  const getNamedObjects = (filteredObjects) => {

    //console.log("searchName", searchName);
    if (!searchNameInput.trim()) {
      // Si no hay texto en el input, devuelve todos los objetos
      return filteredObjects;
    }
    // Filtra los objetos que contienen el texto ingresado en el nombre
    return filteredObjects.filter((obj) =>
      obj.name.toLowerCase().includes(searchNameInput.toLowerCase())
    );
  }

  const getSelectedTypes = (filteredObjects) => {
    if (selectedTypes.length === 0) {
      // Si no hay tipos seleccionados, combina todas las colecciones
      filteredObjects.push(...persons, ...entities, ...products, ...associations);
    } else {
      // Si hay tipos seleccionados, filtra las colecciones correspondientes
      if (selectedTypes.includes("person")) {
        filteredObjects.push(...persons);
      }
      if (selectedTypes.includes("entity")) {
        filteredObjects.push(...entities);
      }
      if (selectedTypes.includes("product")) {
        filteredObjects.push(...products);
      }
      if (selectedTypes.includes("association")) {
        filteredObjects.push(...associations);
      }      
    }
    return filteredObjects;
  }



    // Manejador para actualizar los tipos seleccionados
  const handleTypeChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      // Añadir el tipo seleccionado
      setSelectedTypes((prev) => [...prev, value]);
    } else {
      // Eliminar el tipo desmarcado
      setSelectedTypes((prev) => prev.filter((type) => type !== value));
    }
  };

  return (
  <div className="section-container-management">
    <div className="section-header-management">
      <h1 className="section-title-management">🔍 Busqueda</h1>     
    </div>
    <div className="search-panel">
      {/* Primera fila */}
      <div className="search-row">
        <div className="search-column-left">
          <input
            type="text"
            placeholder="Buscar nombre"
            className="search-input"
            value={searchNameInput} // Valor del input de búsqueda
            onChange={(e) => setSearchNameInput(e.target.value)} // Actualiza el estado
          />
          <button className="search-button-filter" onClick={handleFilterClick}>
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M440-160q-17 0-28.5-11.5T400-200v-240L163.33-742q-14.33-18-4.16-38 10.16-20 32.83-20h576q22.67 0 32.83 20 10.17 20-4.16 38L560-440v240q0 17-11.5 28.5T520-160h-80Zm40-286.67 226-286.66H254l226 286.66Zm0 0Z"/></svg> Filtrar
          </button>
          <button className="search-button-clean">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M426.67-520h106.66v-280q0-22.33-15.33-37.83t-38-15.5q-22.67 0-38 15.33-15.33 15.33-15.33 38v280Zm-240 173.33h586.66v-106.66H186.67v106.66Zm-62 240h122v-86.66q0-14.17 9.61-23.75 9.62-9.59 23.84-9.59 14.21 0 23.71 9.59 9.5 9.58 9.5 23.75v86.66h133.34v-86.66q0-14.17 9.61-23.75 9.62-9.59 23.84-9.59 14.21 0 23.71 9.59 9.5 9.58 9.5 23.75v86.66h133.34v-86.66q0-14.17 9.61-23.75 9.62-9.59 23.84-9.59 14.21 0 23.71 9.59 9.5 9.58 9.5 23.75v86.66h122l-46.66-186.66H171.33l-46.66 186.66ZM818-40H142q-39 0-63-31t-14-69l55-220v-80q0-33 23.5-56.5T200-520h160v-280q0-50 35-85t85-35q50 0 85 35t35 85v280h160q33 0 56.5 23.5T840-440v80l55 220q11 38-13.17 69Q857.67-40 818-40Zm-44.67-413.33H186.67h586.66Zm-240-66.67H426.67h106.66Z"/></svg> Limpiar
          </button>
        </div>

        <div className="search-column-right">
          <span className="search-type-label">Tipos:</span>
          <div className="checkbox-container">
            <label>
              <input type="checkbox" value="person" onChange={handleTypeChange} />
              Personas
            </label>
            <label>
              <input type="checkbox" value="entity" onChange={handleTypeChange} />
              Entidades
            </label>
            <label>
              <input type="checkbox" value="product" onChange={handleTypeChange} />
              Productos
            </label>
            <label>
              <input type="checkbox" value="association" onChange={handleTypeChange} />
              Asociaciones
            </label>
          </div>
        </div>
      </div>

      {/* Segunda fila (puedes añadir más contenido aquí) */}
      <div className="search-row">
          {/* Primera columna */}
        <div className="search-column-left">
          <label htmlFor="start-date">Desde</label>
          <input type="date" id="start-date" className="date-input" />
          <label htmlFor="end-date">Hasta</label>
          <input type="date" id="end-date" className="date-input" />
        </div>

        {/* Segunda columna */}
        <div className="search-column-right">
          <label className="search-type-label">Ordenar:</label>
          <div className="checkbox-container">
            <label>
              <input type="radio" name='sort' value="id" />
              ID
            </label>
            <label>
              <input type="radio" name='sort' value="name" />
              Nombre
            </label>
          </div>
        </div>
      </div>
    </div>
    <div className="card-management-wrapper">
      {objects.map((object) =>          
          <Card key={object.type+object.id} object={object} showType={true}/>          
      )}
    </div>
  </div>
    
  );
};

export default Search;