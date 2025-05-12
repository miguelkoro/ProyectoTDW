import React, { useState, useEffect, useContext, use } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import '../styles/index.scss'; // Reutilizamos los estilos de ObjectView
import { DataContext } from '../context/DataContext'; // Contexto para guardar datos
import { useAuth } from '../context/AuthContext';
import User from '../models/User';

const UserEdit = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const isEdit= location.state?.edit || false;
    const {showMessage, updateUser, getUserById, checkUserName} = useContext(DataContext); // Accede al método getObjectById del contexto
    const {user} = useAuth(); // Obtiene el usuario autenticado del contexto
    //const isEdit= location.state?.edit || false;
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(true); // Estado de carga
    const [nameError, setNameError] = useState(false); // Estado para el error de nombre
    const [passwordError, setPasswordError] = useState(false); // Estado para el error de contraseña
    const [emailError, setEmailError] = useState(false); // Estado para el error de email
   
    const [userObject, setUserObject] = useState({}); // Estado para el objeto de usuario


    // Estados para los campos del formulario
    const [userId, setUserId] = useState(''); // ID del usuario
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [scope, setScope] = useState(''); // Rol del usuario (por defecto es READER)
    const [birthDate, setBirthDate] = useState(''); // Estado para la fecha de nacimiento

    useEffect(() => {
      if(!user) return; // Si no hay usuario, no hace nada
      let userId;
      //console.log("user", isEdit); // Muestra el usuario en la consola
      !isEdit ? userId = user.id : userId = id; // Si es edición, usa el ID del usuario autenticado, si no, usa el ID del objeto de usuario
      fetchUser(userId); // Llama a la función para obtener el usuario por ID
    },[])

    const fetchUser = async (id) => {
      let fetchedUser = await getUserById(id); // Obtiene el usuario por ID
      
      if(fetchedUser){

        setUserObject(fetchedUser); // Obtiene el usuario por ID
        setUserId(fetchedUser.id || ''); // Establece el ID del usuario
        setUsername(fetchedUser.userName || ''); // Establece el nombre de usuario
        setEmail(fetchedUser.email || ''); // Establece el email del usuario
        setScope(fetchedUser.scope || ''); // Establece el rol del usuario
        setBirthDate(fetchedUser.birthDate || ''); // Establece la fecha de nacimiento del usuario
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
      if(username === userObject.userName) return true; // Si el nombre no ha cambiado, no verifica la disponibilidad
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
    let passwordsValid;
    password === '' ? passwordsValid = true : passwordsValid = checkPasswords(); // Verifica las contraseñas
    //const passwordsValid = checkPasswords(); // Verifica las contraseñas
    const nameValid = await checkName(); // Espera a que se resuelva la verificación del nombre
    const emailValid = checkEmail(); // Verifica el formato del email

    if (!passwordsValid || !nameValid || !emailValid) {
      return; // Si alguna validación falla, no continúa
    }

    let userObj = new User({ // Crea un nuevo objeto de usuario
      id: userObject.id, // ID del usuario
      userName: username, // Nombre de usuario
      email: email, // Email del usuario
      scope: scope, // Rol del usuario
      token: userObject.token, // Token del usuario
      expiresIn: '' // Fecha de expiración del token      
    });
    userObj.setEtag(userObject.etag); // Establece el ETag del usuario
    userObj.setEmail(email); // Establece el email del usuario
    userObj.setBirthDate(birthDate); // Establece la fecha de nacimiento del usuario
    console.log("userObj", userObj); // Muestra el objeto de usuario en la consola
    await updateUser(userObj, password, userObj.scope); // Llama a la función de actualización del usuario
    await fetchUser(userObject.id); // Vuelve a obtener el usuario actualizado
  };

  const handleCancel = () => {
    navigate(-1); // Volver a la página anterior sin guardar
  };

  return (
    <div className="object-panel object-panel-user">
        <div className="object-header">
        <h1 className="object-title"></h1>
        <span className="object-id">ID:{userObject.id}</span>
      </div>
      {/* Fila principal: Título centrado */}
      <div className="object-header">
        <h1 className="object-title">{isEdit ? `Editar usuario: ${userObject.userName}` : "Mi Cuenta"}</h1>
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
            <strong>Fecha de nacimiento:</strong>
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)} // Actualiza el estado al cambiar
              placeholder="Introduce tu fecha de nacimiento"
              className="birthdate-input"
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
          {isEdit && // Solo muestra el selector de rol si es edición
          <div className="object-detail-row">
            <strong>Rol:</strong>
            <select
              value={scope}
              onChange={(e) => setScope(e.target.value)} // Actualiza el estado cuando se selecciona una opción
              className="role-selector"
            >
              <option value="READER">READER</option>
              <option value="WRITER">WRITER</option>
              <option value="INACTIVE">INACTIVE</option>
            </select>
        </div>
        }
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