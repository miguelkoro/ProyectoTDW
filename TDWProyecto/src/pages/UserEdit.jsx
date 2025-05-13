import { useState, useEffect, useContext, use} from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import '../styles/index.scss'; // Reutilizamos los estilos de ObjectView
import { DataContext } from '../context/DataContext'; // Contexto para guardar datos
import { useAuth } from '../context/AuthContext';
import User from '../models/User';

const UserEdit = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const isEdit= location.state?.edit || false;
    const {updateUser, getUserById, checkUserName} = useContext(DataContext); // Accede al método getObjectById del contexto
    const {user} = useAuth(); // Obtiene el usuario autenticado del contexto
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(true); // Estado de carga

    const [passwordError, setPasswordError] = useState(false); // Estado para el error de contraseña
    const [confirmPasswordError, setConfirmPasswordError] = useState(false); // Estado para el error de confirmación de contraseña
    const [emailError, setEmailError] = useState(false); // Estado para el error de email
    //const [nameError, setNameError] = useState(false); // Estado para el error de nombre
    //const [userNameError, setUserNameError] = useState("");  

    const [userObject, setUserObject] = useState({}); // Estado para el objeto de usuario


    // Estados para los campos del formulario
    const [userId, setUserId] = useState(''); // ID del usuario
    const [username, setUsername] = useState('');
    const [name, setName] = useState(''); // Estado para el nombre
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [scope, setScope] = useState(''); // Rol del usuario (por defecto es READER)
    const [birthDate, setBirthDate] = useState(''); // Estado para la fecha de nacimiento

    useEffect(() => {
      cleanInputs(); // Limpia los inputs al cargar el componente
      if(!user) return; // Si no hay usuario, no hace nada

      let userId;
      !isEdit ? userId = user.id : userId = id; // Si es edición, usa el ID del usuario autenticado, si no, usa el ID del objeto de usuario
      fetchUser(userId); // Llama a la función para obtener el usuario por ID
    },[id])

    const fetchUser = async (id) => {
      let fetchedUser = await getUserById(id); // Obtiene el usuario por ID      
      if(fetchedUser){
        setUserObject(fetchedUser); // Obtiene el usuario por ID
        setUserId(fetchedUser.id || ''); // Establece el ID del usuario
        setUsername(fetchedUser.userName || ''); // Establece el nombre de usuario
        setEmail(fetchedUser.email || ''); // Establece el email del usuario
        setScope(fetchedUser.scope || ''); // Establece el rol del usuario
        setBirthDate(fetchedUser.birthDate || ''); // Establece la fecha de nacimiento del usuario
        setName(fetchedUser.name || ''); // Establece el nombre del usuario
      }
    }

    const cleanInputs = () => {
      setUserId(''); // Limpia el ID del usuario
      setUsername(''); // Limpia el nombre de usuario
      setEmail(''); // Limpia el email del usuario
      setScope(''); // Limpia el rol del usuario
      setBirthDate(''); // Limpia la fecha de nacimiento del usuario
      setName(''); // Limpia el nombre del usuario
    }

    const checkPassword = () => {
      if (password === '') {return true, setPasswordError(false)}; // Si la contraseña está vacía, no verifica
      if (password.length < 6 || password.length > 12) {
        setPasswordError(true); // Establece el error si la contraseña no cumple con la longitud
        //showMessage("La contraseña debe tener entre 6 y 16 caracteres", "error"); // Muestra un mensaje de error
        return false;
      } else {
        setPasswordError(false); // Restablece el error si las contraseñas son válidas
        return true;
      }
    };

    const confirmPasswordCheck = () => {
      if (password !== confirmPassword) {
        setConfirmPasswordError(true); // Establece el error si las contraseñas no coinciden
        //showMessage("Las contraseñas no coinciden", "error"); // Muestra un mensaje de error
        return false;
      }else{
        setConfirmPasswordError(false); // Restablece el error si las contraseñas coinciden
        return true;
      } 
    }

    const checkEmail = () => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expresión regular para validar emails
      if (!emailRegex.test(email)) {
        setEmailError(true); // Establece el error si el email no es válido
        //showMessage("El email no tiene un formato válido", "error"); // Muestra un mensaje de error
        return false;
      } else {
        setEmailError(false); // Restablece el error si el email es válido
        return true;
      }
    };

    /*const checkNameLength = () => {
      if (username.length < 3) { // Verifica si el nombre tiene menos de 3 caracteres
        setNameError(true); // Establece el error si el nombre es demasiado corto     
        setUserNameError("El nombre debe tener al menos 3 caracteres")
        return false;
      } else {
        setNameError(false); // Restablece el error si el nombre es válido
        return true;
      }
    };*/
  
    /*const checkName = async () => {
      if (username === userObject.userName) return true; // Si el nombre no ha cambiado, no verifica
      if (!checkNameLength()) return false; // Verifica primero la longitud del nombre  
      if (await checkUserName(username)) {
        setNameError(true); // Establece el error si el nombre ya existe
        setUserNameError("El nombre de usuario ya está en uso")
        return false;
      } else {
        setNameError(false); // Restablece el error si el nombre es válido
        return true;
      }
    };*/

    /** Guarda los cambios del usuario */  
    const handleSave = async () => {
      let passwordsValid; //Si la password esta vacia, no modifica la contraseña
      password === '' ? passwordsValid = true : passwordsValid = checkPassword(); // Verifica las contraseñas
      const emailValid = checkEmail(); // Verifica el formato del email
      //const nameValid = await checkName(); // Espera a que se resuelva la verificación del nombre
      
      if (!passwordsValid || !emailValid || !confirmPasswordCheck()) {return;} // Si hay errores, no guarda los datos
      let userObj = new User({ id: userObject.id,  
        email: email, scope: scope, token: userObject.token, expiresIn: ''}); 
      userObj.setEtag(userObject.etag); // Establece el ETag del usuario
      userObj.setEmail(email); // Establece el email del usuario
      userObj.setBirthDate(birthDate); // Establece la fecha de nacimiento del usuario
      userObj.setName(name); // Establece el nombre del usuario
    
      await updateUser(userObj, password, userObj.scope); // Llama a la función de actualización del usuario
      await fetchUser(userObject.id); // Vuelve a obtener el usuario actualizado (Por el ETAG)
    };

    const handleCancel = () => { navigate(-1); }; // Redirige a la página anterior

  return (
    <div className="object-panel object-panel-user">
      <div className="object-header">
        <h1 className="object-title"></h1>
        <span className="object-id">ID:{userId}</span>
      </div>
      <div className="object-header">
        <h1 className="object-title">{isEdit ? `Editar usuario:` : "Mi Cuenta"}</h1>
      </div>
      <hr className="object-divider" />

      <div className="object-content">
        <div className="object-details-column">
          <div className="object-detail-row">
            <strong>UserName:</strong>
            <div className="input-container">
              <span style={{fontSize:"1.3rem"}}>{username}</span>
            </div>
          </div>
          <div className="object-detail-row">
            <strong>Nombre y apellidos:</strong>
            <div className="input-container">
              <input type="text"  value={name} onChange={(e) => setName(e.target.value)}
                placeholder="Introduce tu nombre "/> 
            </div>
          </div>
          <div className="object-detail-row">
            <strong>Email:</strong>
            <div className="input-container">
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="Introduce tu email" className={emailError ? 'input-error' : ''}
                onBlur={checkEmail} />
              {emailError && <span className="error-input-text">El email no tiene un formato válido</span>}
            </div>
          </div>
          <div className="object-detail-row">
            <strong>Fecha de nacimiento:</strong>
            <div className="input-container">
              <input type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} // Actualiza el estado al cambiar
                placeholder="Introduce tu fecha de nacimiento" className="birthdate-input"/>
            </div>
          </div>
          <div className="object-detail-row">
            <strong>Contraseña:</strong>
            <div className="input-container">
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                placeholder="Introduce tu contraseña" className={passwordError ? 'input-error' : ''}
                onBlur={checkPassword} />
              {passwordError &&<span className="error-input-text">La contraseña debe tener entre 6 y 12 caracteres</span>}
            </div>
          </div>
          <div className="object-detail-row">
            <strong>Confirmar contraseña:</strong>
            <div className="input-container">
              <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirma tu contraseña" className={confirmPasswordError ? 'input-error' : ''}
                onBlur={confirmPasswordCheck}/>
              {confirmPasswordError &&<span className="error-input-text">Las contraseñas deben coincidir</span>}
            </div>
          </div>
          {isEdit && // Solo muestra el selector de rol si es edición
          <div className="object-detail-row">
            <strong>Rol:</strong>
            <select value={scope} onChange={(e) => setScope(e.target.value)} // Actualiza el estado cuando se selecciona una opción
              className="role-selector" >
              <option value="READER">READER</option>
              <option value="WRITER">WRITER</option>
              <option value="INACTIVE">INACTIVE</option>
            </select>
          </div>}
        </div>
      </div>
      <hr className="object-divider" />

      {/* Botones de acción */}
      <div className="object-actions">
        <button className="cancel-button" onClick={handleCancel}> Cancelar </button>
        <button className="save-button" onClick={handleSave}> Guardar</button>
      </div>
    </div>
  );
};

export default UserEdit;