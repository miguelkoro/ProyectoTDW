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
  const [objects, setObjects] = useState([]); 
  const [selectedTypes, setSelectedTypes] = useState([]); // Estado para los tipos seleccionados
  const [searchNameInput, setSearchNameInput] = useState(''); // Estado para el nombre de búsqueda'');
  const [sortOption, setSortOption] = useState("");
  const [date, setDate] = useState('');
  const [isCleaningFilters, setIsCleaningFilters] = useState(false);
  const { persons, entities, products, associations, isLoading, searchName, setSearchName} = useContext(DataContext); 

  useEffect(() => {
    searchNavBar(); // Llama a la función para realizar la búsqueda inicial
  }, [persons, entities, products, associations, searchName]); // Se ejecuta cuando cambian los tipos seleccionados o las colecciones

  const searchNavBar = () => {
    const filteredObjects = [] // Arreglo para almacenar los objetos filtrados
    const namedObjects = getSelectedTypes(filteredObjects) // Llama a la función para obtener los tipos seleccionados
    setObjects(namedObjects.filter((obj) =>
      obj.name.toLowerCase().includes(searchName.toLowerCase())
    ));
    if (searchName) {
      setSearchNameInput(searchName); // Actualiza el estado del nombre de búsqueda
    }
  }

  const handleFilterClick = () => {
    let filteredObjects = []
    getSelectedTypes(filteredObjects)
    const namedObjects = getNamedObjects(filteredObjects);
    const dateFilteredObjects = getFilteredByDate(namedObjects);
    const sortedObjects = sortObjects(dateFilteredObjects);
    setObjects(sortedObjects);
  }

  const sortObjects = (filteredObjects) => {
    if (sortOption === "id") {
      // Ordenar por ID (numérico)
      return filteredObjects.sort((a, b) => a.id - b.id);
    } else if (sortOption === "name") {
      // Ordenar por nombre (alfabético)
      return filteredObjects.sort((a, b) => a.name.localeCompare(b.name));
    }
    // Si no hay opción de orden, devuelve los objetos sin cambios
  return filteredObjects;
};
  

  const getNamedObjects = (filteredObjects) => {
    if (!searchNameInput.trim()) {
      return filteredObjects;
    }
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

  const getFilteredByDate = (filteredObjects) => {
    if (!date.trim()) {
      // Si el campo de fecha está vacío, devuelve todos los objetos
      return filteredObjects;
    }

    // Convierte la fecha del input en un objeto Date
    const inputDate = new Date(date).toISOString().split("T")[0];
    // Filtra los objetos que tienen un intervalo válido y coinciden con la fecha
    return filteredObjects.filter((obj) => {
      if (!obj.birthDate || !obj.deathDate) {
        // Ignora los objetos con fechas nulas o indefinidas
        return false;
      }
      const birthDate = new Date(obj.birthDate).toISOString().split("T")[0];
      const deathDate = new Date(obj.deathDate).toISOString().split("T")[0];
      const isValid = inputDate >= birthDate && inputDate <= deathDate;

      return isValid;
    });
  };

  const cleanFilters = () => {
    setSelectedTypes([]); // Limpia los tipos seleccionados
    setSearchNameInput(''); // Limpia el campo de búsqueda
    setDate(''); // Limpia el campo de fecha
    setSortOption("");
    setIsCleaningFilters(true);
  }
  useEffect(() => {
    if (isCleaningFilters) {
      handleFilterClick(); // Llama a la función de filtrado
      setIsCleaningFilters(false); // Restablece el estado de limpieza
    }
  }, [isCleaningFilters]); 


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
          <button className="search-button-filter" onClick={handleFilterClick} title='Filtrar'>
            <svg xmlns="http://www.w3.org/2000/svg" height="1.8rem" viewBox="0 -960 960 960" fill="#FFFFFF"><path d="M796.58-99.67 534.83-361.45q-30.38 24.19-72.02 37.75-41.63 13.56-86.63 13.56-116.4 0-196.16-79.83-79.76-79.82-79.76-194.51 0-114.68 79.83-194.46t194.51-79.78q114.68 0 194.46 79.82 79.78 79.81 79.78 194.57 0 44.71-13.01 84.66-13 39.95-38.87 74.06l263.45 262.2-63.83 63.74ZM374.84-399.4q77.91 0 131.33-53.63 53.41-53.63 53.41-131.3 0-77.66-53.38-131.4-53.38-53.73-131.3-53.73-78.48 0-131.93 53.73-53.45 53.74-53.45 131.4 0 77.67 53.43 131.3 53.43 53.63 131.89 53.63Z"/></svg>
          </button>
          <button className="search-button-clean" onClick={cleanFilters} title='Limpiar'>
            <svg xmlns="http://www.w3.org/2000/svg" height="1.8rem" viewBox="0 -960 960 960" width="1.8rem" fill="#FFFFFF"><path d="M426.67-520h106.66v-280q0-22.33-15.33-37.83t-38-15.5q-22.67 0-38 15.33-15.33 15.33-15.33 38v280Zm-240 173.33h586.66v-106.66H186.67v106.66Zm-62 240h122v-86.66q0-14.17 9.61-23.75 9.62-9.59 23.84-9.59 14.21 0 23.71 9.59 9.5 9.58 9.5 23.75v86.66h133.34v-86.66q0-14.17 9.61-23.75 9.62-9.59 23.84-9.59 14.21 0 23.71 9.59 9.5 9.58 9.5 23.75v86.66h133.34v-86.66q0-14.17 9.61-23.75 9.62-9.59 23.84-9.59 14.21 0 23.71 9.59 9.5 9.58 9.5 23.75v86.66h122l-46.66-186.66H171.33l-46.66 186.66ZM818-40H142q-39 0-63-31t-14-69l55-220v-80q0-33 23.5-56.5T200-520h160v-280q0-50 35-85t85-35q50 0 85 35t35 85v280h160q33 0 56.5 23.5T840-440v80l55 220q11 38-13.17 69Q857.67-40 818-40Zm-44.67-413.33H186.67h586.66Zm-240-66.67H426.67h106.66Z"/></svg>
          </button>
        </div>

        <div className="search-column-right">
          <span className="search-type-label">Tipos:</span>
          <div className="checkbox-container">
            <label>
              <input type="checkbox" value="person" checked={selectedTypes.includes("person")} onChange={handleTypeChange} />
              Personas
            </label>
            <label>
              <input type="checkbox" value="entity" checked={selectedTypes.includes("entity")} onChange={handleTypeChange} />
              Entidades
            </label>
            <label>
              <input type="checkbox" value="product" checked={selectedTypes.includes("product")} onChange={handleTypeChange} />
              Productos
            </label>
            <label>
              <input type="checkbox" value="association" checked={selectedTypes.includes("association")} onChange={handleTypeChange} />
              Asociaciones
            </label>
          </div>
        </div>
      </div>

      {/* Segunda fila (puedes añadir más contenido aquí) */}
      <div className="search-row">
          {/* Primera columna */}
        <div className="search-column-left">
          <label htmlFor="start-date">Filtrar por fecha:</label>
          <input type="date" id="start-date" className="date-input" value={date}
              onChange={(e) => setDate(e.target.value)}/>
        </div>

        {/* Segunda columna */}
        <div className="search-column-right">
          <label className="search-type-label">Ordenar:</label>
          <div className="checkbox-container">
            <label>
              <input type="radio" name='sort' value="id" checked={sortOption === "id"}
                onChange={(e) => setSortOption(e.target.value)}/>
              ID
            </label>
            <label>
              <input type="radio" name='sort' value="name" checked={sortOption === "name"}
                onChange={(e) => setSortOption(e.target.value)}/>
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