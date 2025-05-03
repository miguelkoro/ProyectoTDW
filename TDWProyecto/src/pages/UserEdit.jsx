import React, { useState, useEffect, useContext, use } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import '../styles/ObjectView.css'; // Reutilizamos los estilos de ObjectView
import { DataContext } from '../context/DataContext'; // Contexto para guardar datos
import { useAuth } from '../context/AuthContext';
import User from '../models/User';

const UserEdit = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const isProfile= location.state?.profile || false;
    const {showMessage} = useContext(DataContext); // Accede al método getObjectById del contexto
    const {user, checkUserName, getUserById} = useAuth(); // Obtiene el usuario autenticado del contexto


    const [isLoading, setIsLoading] = useState(true); // Estado de carga
    const [nameError, setNameError] = useState(false); // Estado para el error de nombre
    const [passwordError, setPasswordError] = useState(false); // Estado para el error de contraseña
    const [emailError, setEmailError] = useState(false); // Estado para el error de email
   
    const [userObject, setUserObject] = useState({}); // Estado para el objeto de usuario


    // Estados para los campos del formulario
    const [id, setId] = useState(''); // ID del usuario
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    useEffect(() => {
      if(!user) return; // Si no hay usuario, no hace nada
      fetchUser(user.id)
    },[])

    const fetchUser = async (id) => {
      let fetchedUser = await getUserById(id); // Obtiene el usuario por ID
      
      if(fetchedUser){
        setUserObject(fetchedUser); // Obtiene el usuario por ID
        setUsername(fetchedUser.userName || ''); // Establece el nombre de usuario
        setEmail(fetchedUser.email || ''); // Establece el email del usuario
        //console.log("fetchedUser", fetchedUser); // Muestra el usuario en la consola
      }
    }

    const checkPasswords = () => {
      if (password !== confirmPassword) {
        setPasswordError(true); // Establece el error si las contraseñas no coinciden
        showMessage("Las contraseñas no coinciden", "error"); // Muestra un mensaje de error
        return false;
      } else if (password.length < 6 || password.length > 16) {
        setPasswordError(true); // Establece el error si la contraseña no cumple con la longitud
        showMessage("La contraseña debe tener entre 6 y 16 caracteres", "error"); // Muestra un mensaje de error
        return false;
      } else {
        setPasswordError(false); // Restablece el error si las contraseñas son válidas
        return true;
      }
    };

    const checkEmail = () => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expresión regular para validar emails
      if (!emailRegex.test(email)) {
        setEmailError(true); // Establece el error si el email no es válido
        showMessage("El email no tiene un formato válido", "error"); // Muestra un mensaje de error
        return false;
      } else {
        setEmailError(false); // Restablece el error si el email es válido
        return true;
      }
    };

    const checkNameLength = () => {
      if (username.length < 3) { // Verifica si el nombre tiene menos de 3 caracteres
        setNameError(true); // Establece el error si el nombre es demasiado corto
        showMessage("El nombre debe tener al menos 3 caracteres", "error"); // Muestra un mensaje de error
        return false;
      } else {
        setNameError(false); // Restablece el error si el nombre es válido
        return true;
      }
    };
  
    const checkName = async () => {
      if (!checkNameLength()) return false; // Verifica primero la longitud del nombre
      if (await checkUserName(username)) {
        setNameError(true); // Establece el error si el nombre ya existe
        showMessage("El nombre de usuario ya está en uso", "error"); // Muestra un mensaje de error
        return false;
      } else {
        setNameError(false); // Restablece el error si el nombre es válido
        return true;
      }
    };

  const handleSave = async () => {
       // Lógica para guardar los datos
    const passwordsValid = checkPasswords(); // Verifica las contraseñas
    const nameValid = await checkName(); // Espera a que se resuelva la verificación del nombre
    const emailValid = checkEmail(); // Verifica el formato del email

    if (!passwordsValid || !nameValid || !emailValid) {
      return; // Si alguna validación falla, no continúa
    }
  };

  const handleCancel = () => {
    navigate(-1); // Volver a la página anterior sin guardar
  };

  return (
    <div className="myaccount-panel">
        <div className="object-header">
        <h1 className="object-title"></h1>
        <span className="object-id">ID:{user.id}</span>
      </div>
      {/* Fila principal: Título centrado */}
      <div className="object-header">
        <h1 className="object-title">Mi Cuenta</h1>
      </div>
      <hr className="object-divider" />

      {/* Contenedor de columnas */}
      <div className="object-content">
        {/* Columna derecha: Detalles */}
        <div className="object-details-column">
          <div className="object-detail-row">
            <strong>Nombre de usuario:</strong>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Introduce tu nombre de usuario"
              className={nameError ? 'input-error' : ''}
              onBlur={checkNameLength}
            />
          </div>
          <div className="object-detail-row">
            <strong>Email:</strong>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Introduce tu email"
              className={emailError ? 'input-error' : ''}
              onBlur={checkEmail} // Valida al deseleccionar el campo
            />
          </div>
          <div className="object-detail-row">
            <strong>Contraseña:</strong>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Introduce tu contraseña"
              className={passwordError ? 'input-error' : ''}
              onBlur={checkPasswords} // Valida al deseleccionar el campo
            />
          </div>
          <div className="object-detail-row">
            <strong>Confirmar contraseña:</strong>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirma tu contraseña"
              className={passwordError ? 'input-error' : ''}
              onBlur={checkPasswords} // Valida al deseleccionar el campo
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

export default UserEdit;