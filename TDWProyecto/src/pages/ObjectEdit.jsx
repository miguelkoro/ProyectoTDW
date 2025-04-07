import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import './ObjectView.css'; // Reutilizamos los estilos de ObjectView
import { DataContext } from '../context/DataContext'; // Contexto para guardar datos
import './ObjectView.css'; // Archivo CSS para estilos

const ObjectEdit = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { type, id } = useParams();
  const { object } = location.state || {}; // Objeto recibido desde el navigate
  const { saveObject } = useContext(DataContext); // Método para guardar el objeto

  // Estados para los campos del formulario
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [deathDate, setDeathDate] = useState('');
  const [wikiUrl, setWikiUrl] = useState('');
  const [imageUrl, setImageUrl] = useState(''); // Nuevo estado para la URL de la imagen


  // Determinar si es un nuevo objeto o uno existente
  const isNew = !object;

    // Función para transformar la fecha al formato yyyy-mm-dd
    const dateTransform = (date) => {
        if (!date) return ''; // Si no hay fecha, devuelve una cadena vacía
      
        const parts = date.split('/'); // Divide la fecha en partes
        if (parts.length === 3) {
          // Si la fecha tiene el formato completo (YYYY/MM/DD)
          const [year, month, day] = parts;
          return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
        } else if (parts.length === 1) {
          // Si solo tiene el año (YYYY)
          return `${parts[0]}-01-01`; // Asume 1 de enero como fecha predeterminada
        }
      
        return ''; // Si el formato no es válido, devuelve una cadena vacía
      };

  useEffect(() => {
    if (!isNew) {
      // Si es un objeto existente, rellenar los campos con sus datos
      setName(object.name || '');
      setBirthDate(dateTransform(object.birthDate  || ''));
      setDeathDate(dateTransform(object.deathDate  || ''));
      setWikiUrl(object.wikiUrl || '');
      setImageUrl(object.imageUrl || ''); // Inicializar la URL de la imagen

    }
  }, [isNew, object]);

 

  const handleSave = () => {
    const updatedObject = {
      id: isNew ? '?' : id, // Si es nuevo, el ID será una interrogación
      name,
      birthDate,
      deathDate,
      wikiUrl,
      imageUrl, // Guardar la URL de la imagen
    };

    saveObject(updatedObject); // Guardar el objeto usando el contexto
    navigate(-1); // Volver a la página anterior
  };

  const handleCancel = () => {
    navigate(-1); // Volver a la página anterior sin guardar
  };

  const birthLabel = type === 'Persona' ? 'Nacimiento' : 'Creación';
  const deathLabel = type === 'Persona' ? 'Fallecimiento' : 'Descontinuación';

  return (
    <div className="object-view-panel">
      {/* Fila principal: Título centrado y ID a la derecha */}
      <div className="object-header">
        <h1 className="object-title">{isNew ? 'Nuevo Objeto' : `Editar Objeto: ${name}`}</h1>
        <span className="object-id">ID: {isNew ? '?' : id}</span>
      </div>
      <hr className="object-divider" />
      {/* Contenedor de columnas */}
      <div className="object-content">
        {/* Columna izquierda: Imagen */}
        <div className="object-image-column">
          <img
            className="object-image"
            src={imageUrl || 'https://static.thenounproject.com/png/559530-200.png'}
            alt={name || 'Nuevo Objeto'}
          />
          <input
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Introduce la URL de la imagen"
            className="image-url-input"
          />
        </div>


        {/* Columna derecha: Detalles */}
        <div className="object-details-column">
          <div className="object-detail-row">
            <strong>Nombre:</strong>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Introduce el nombre"
            />
          </div>
          <div className="object-detail-row">
            <strong>{birthLabel}:</strong>
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
            />
          </div>
          <div className="object-detail-row">
            <strong>{deathLabel}:</strong>
            <input
              type="date"
              value={deathDate}
              onChange={(e) => setDeathDate(e.target.value)}
            />
          </div>
          <div className="object-detail-row">
            <strong>URL a la Wiki:</strong>
            <input
              type="url"
              value={wikiUrl}
              onChange={(e) => setWikiUrl(e.target.value)}
              placeholder="Introduce la URL"
            />
          </div>
        </div>
      </div>
      <hr className="object-divider" />

      {/* Botones de acción */}
      <div className="object-actions">
        <button className="cancel-button" onClick={handleCancel}>
          Cancelar
        </button>
        <button className="save-button" onClick={handleSave}>
          Guardar
        </button>
      </div>
    </div>
  );
};

export default ObjectEdit;