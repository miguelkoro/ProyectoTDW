import React from 'react';
import '../styles/Section.css'; // Archivo CSS para estilos
import Card from './Card.jsx'; // Importa el componente de sección pequeña
import CardUser from './CardUser.jsx'; // Importa el componente de sección pequeña
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate para redirección
import { DataContext } from '../context/DataContext';
import { useContext, useEffect, useState } from 'react';
import loadingGif from '../assets/images/Loading.gif';

const Section = (props) => {
  const { user } = useAuth(); // Obtén el usuario autenticado del contexto
  const navigate = useNavigate(); // Hook para redirigir
  const {isLoading, entities, persons, products,associations, users} = useContext(DataContext);

   const [showNoData, setShowNoData] = useState(false); // Estado para controlar el retraso

    // Determina si los datos están completamente cargados
  //const isDataLoading = isLoading || !props.objects || props.objects.length === 0;
  
  const handleNewClick = () => {
    
    // Aquí puedes implementar la lógica para crear un nuevo objeto
    navigate(`/new/${props.type} `, {state:{new:true}}); // Redirige a la página de creación de nuevo objeto
    //console.log("Crear nuevo objeto:", title);
  }

  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => {
        setShowNoData(true); // Activa el estado después del retraso
      }, 600); // Retraso de 300 ms

      return () => clearTimeout(timer); // Limpia el temporizador si el componente se desmonta o `isLoading` cambia
    } else {
      setShowNoData(false); // Reinicia el estado si vuelve a cargarse
    }
  }, [isLoading, props.objects]); // Observa los cambios en `isLoading` y los objetos relacionados


  const titleClick = () => {
    switch (props.type) {
      case 'person':
        return () => navigate('/persons', { state: { type: 'person' } });
      case 'entity':
        return () => navigate('/entities', { state: { type: 'entity' } });
      case 'product':
        return () => navigate('/products', { state: { type: 'product' } });
      case 'association':
        return () => navigate('/associations', { state: { type: 'association' } });
      case 'user':
        return () => navigate('/users', { state: { type: 'user' } });
      default:
        return () => {}; // No hace nada si no hay tipo
    }
  }

  return (
    <div className="section-container">
      <div className="section-header">
        <h1 className="section-title" onClick={titleClick()}>
          {props.title}
        </h1>
        {user?.scope === 'writer' && props.type !== 'user' && (
          <button className="new-button" onClick={handleNewClick}>
            Nuevo
          </button>
        )}
      </div>
      <div className="card-wrapper">
        {isLoading ? (
          <img
            src={loadingGif}
            style={{ maxWidth: '5rem', margin: '0 auto' }}
            alt="Cargando..."
            className="loading-image"
          />
        ) : showNoData && props.objects  && props.objects.length ===0 ? (
          <div style={{ margin: '0 auto' }}>
            <p style={{ color: 'white' }}>No hay datos disponibles.</p>
            <img
              src="./assets/images/SinDatos.jpg"
              style={{ maxWidth: '10rem' }}
              alt="No hay datos disponibles"
              className="empty-image"
            />
          </div>
        ) : (
          props.objects.map((object) =>
            props.type !== 'user' ? (
              <Card key={object.id} object={object} />
            ) : (
              <CardUser key={object.id} object={object} />
            )
          )
        )}
      </div>
      <hr className="section-hr" />
    </div>
    
  );
};

export default Section;