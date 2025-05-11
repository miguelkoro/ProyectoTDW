import React, { use } from 'react';
import Card from '../components/Card.jsx'; // Importa el componente de sección pequeña
import CardUser from '../components/CardUser.jsx'; // Importa el componente de sección pequeña
import { useAuth } from '../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate para redirección
import { useContext, useEffect, useState } from 'react';
import { DataContext } from '../context/DataContext';
import loadingGif from '../assets/images/Loading.gif';
import '../styles/index.css';


const Search = (props) => {
  //const { user } = useAuth(); // Obtén el usuario autenticado del contexto
  //const navigate = useNavigate(); // Hook para redirigir
  //const typeFromState =  location.state?.type || location.pathname.split('/')[2];
  const [objects, setObjects] = useState([]); 
  //const [title, setTitle] = useState(''); // Estado para el título
  const [type, setType] = useState(''); // Estado para el tipo
  const [selectedTypes, setSelectedTypes] = useState([]); // Estado para los tipos seleccionados

  const { persons, entities, products, associations, isLoading} = useContext(DataContext); 

  useEffect(() => {
    if (selectedTypes.length === 0) {
      // Si no hay tipos seleccionados, combina todas las colecciones
      setObjects([...persons, ...entities, ...products, ...associations]);
    } else {
      // Si hay tipos seleccionados, filtra las colecciones correspondientes
      const updatedObjects = [];
      if (selectedTypes.includes("person")) {
        updatedObjects.push(...persons);
      }
      if (selectedTypes.includes("entity")) {
        updatedObjects.push(...entities);
      }
      if (selectedTypes.includes("product")) {
        updatedObjects.push(...products);
      }
      if (selectedTypes.includes("association")) {
        updatedObjects.push(...associations);
      }
      setObjects(updatedObjects);
    }
  }, [selectedTypes, persons, entities, products, associations]); // Se ejecuta cuando cambian los tipos seleccionados o las colecciones

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

    // Filtrar los objetos según los tipos seleccionados
  const filteredObjects = selectedTypes.length
    ? objects.filter((object) => selectedTypes.includes(object.type))
    : objects;

  useEffect(() => {

  },[]);


  return (
  <div className="section-container-management">
    <div className="section-header-management">
      <h1 className="section-title">🔍 Busqueda</h1>     
    </div>
    <div className="search-panel">
       {/* Columna izquierda: Input y botón */}
      <div className="search-column-left">
        <input
          type="text"
          placeholder="Buscar nombre"
          className="search-input"
        />
        <button className="search-button">
          <svg
            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20px" height="20px" >
            <path d="M10 2a8 8 0 105.293 14.293l5.707 5.707 1.414-1.414-5.707-5.707A8 8 0 0010 2zm0 2a6 6 0 110 12 6 6 0 010-12z" />
          </svg>
        </button>
      </div>

      {/* Columna derecha: Checkboxes */}
      <div className="search-column-right">
        <span className="search-type-label">Tipos:</span>
        <div className="checkbox-container">
          <label>
            <input type="checkbox" value="person" onChange={handleTypeChange}/>
            Personas
          </label>
          <label>
            <input type="checkbox" value="entity" onChange={handleTypeChange}/>
            Entidades
          </label>
          <label>
            <input type="checkbox" value="product" onChange={handleTypeChange}/>
            Productos
          </label>
          <label>
            <input type="checkbox" value="association" onChange={handleTypeChange}/>
            Asociaciones
          </label>
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