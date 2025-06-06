import { useState, useEffect, useContext, } from 'react';
import { useAuth } from "../context/AuthContext";
import '../styles/index.scss'; // Archivo CSS para estilos
import { useNavigate, Link } from "react-router-dom"; // Importa useNavigate y Link para redirección
import { DataContext } from '../context/DataContext'; // Contexto para guardar datos

const Register = () => {
  const { user,  } = useAuth(); // Obtén la función register y el usuario autenticado
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [birthDate, setBirthDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0]; // Formato 'YYYY-MM-DD'
  });
  const [name, setName] = useState(""); // Estado para el nombre

  const [nameChecked, setNameChecked] = useState(false); // Estado para verificar el nombre de usuario

  const {register, checkUserName} = useContext(DataContext); // Accede al método getObjectById del contexto

  const navigate = useNavigate(); // Hook para redirigir

  const [passwordError, setPasswordError] = useState(false); // Estado para el error de contraseña
  const [confirmPasswordError, setConfirmPasswordError] = useState(false); // Estado para el error de confirmación de contraseña
  const [emailError, setEmailError] = useState(false); // Estado para el error de email
  const [nameError, setNameError] = useState(false); // Estado para el error de nombre
  const [userNameError, setUserNameError] = useState(""); 

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

  const checkPassword = () => {
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

  const checkNameLength = () => {
    if (userName.length < 3) { // Verifica si el nombre tiene menos de 3 caracteres
      setNameError(true); // Establece el error si el nombre es demasiado corto     
      setUserNameError("El nombre debe tener al menos 3 caracteres")
      return false;
    } else {
      setNameError(false); // Restablece el error si el nombre es válido
      return true;
    }
  };

  const checkName = async () => {
    if (!checkNameLength()) return false; // Verifica primero la longitud del nombre  
    if (await checkUserName(userName)) {
      setNameError(true); // Establece el error si el nombre ya existe
      setUserNameError("El nombre de usuario ya está en uso")
      return false;
    } else {
      setNameError(false); // Restablece el error si el nombre es válido
      setNameChecked(true); // Marca el nombre como verificado
      return true;
    }
  };

  // Redirige al Home si el usuario ya está logueado
  useEffect(() => {
    if (user) {
      navigate("/"); // Redirige al Home
    }
  }, [user, navigate]); // Se ejecuta cuando cambia el estado de user o navigate

  const handleSubmit = (e) => {
    e.preventDefault();
    if ( !checkEmail() || !confirmPasswordCheck() || !checkPassword()) return; // Verifica los campos antes de enviar el formulario
    //console.log("Registro de usuario:", userName, email, password, birthDate); // Muestra los datos en la consola
    register(userName, email, password, birthDate, name); // Llama a la función de registro
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Evita el comportamiento predeterminado del Enter
      if (!nameChecked) {
        checkName(); // Llama a la función para comprobar el nombre
      } else {
        handleSubmit(e); // Llama a la función para registrar al usuario
      }
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-title">{!nameChecked ? "Registro de nuevo Usuario" : `Termina de registrate, ${userName}`}</h1>
      <form onSubmit={handleSubmit}>
        {!nameChecked && <>
        <div className="input-container">
          <input type="text" placeholder="Nombre de Usuario" value={userName}
            onChange={(e) => setUserName(e.target.value)} className={nameError ? 'input-error' : ''}
            onBlur={checkNameLength} onKeyDown={handleKeyDown} />
          {nameError &&<span className="error-input-text">{userNameError}</span>}
        </div>
        <button type="button" onClick={checkName}>Comprobar nombre</button> </>}
        {nameChecked && <>
          <div className="input-container">
            <input type="email" placeholder="Correo Electrónico" value={email}
              onChange={(e) => setEmail(e.target.value)} className={emailError ? 'input-error' : ''}
              onBlur={checkEmail} onKeyDown={handleKeyDown} /><span style={{color: "red"}}>*</span>
            {emailError && <span className="error-input-text">El email no tiene un formato válido</span>}
          </div>
          <div className="input-container">
            <input type="text" placeholder="Nombre y apellidos" value={name}
              onChange={(e) => setName(e.target.value)}  />            
          </div>
          <div className="input-container">
            <input type="password" placeholder="Contraseña" value={password}
              onChange={(e) => setPassword(e.target.value)} className={passwordError ? 'input-error' : ''}
              onBlur={checkPassword} /><span style={{color: "red" }}>*</span>
            {passwordError &&<span className="error-input-text">La contraseña debe tener entre 6 y 12 caracteres</span>}
          </div>
          <div className="input-container">
            <input type="password" placeholder="Confirmar Contraseña" value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)} className={confirmPasswordError ? 'input-error' : ''}
              onBlur={confirmPasswordCheck} /><span style={{color: "red"}}>*</span>
            {confirmPasswordError &&<span className="error-input-text">Las contraseñas deben coincidir</span>}
          </div>  
          <span style={{fontSize: "0.9rem"}}>Fecha de nacimiento:</span>        
          <input type="date" placeholder="Fecha de Nacimiento" value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)} />
            
          <button type="submit">Registrarse</button> 
          <div className="input-container"><span style={{color: "red", fontSize: "0.8rem"}}>* El campo es obligatorio</span></div>
        </>} 
      </form>
      <p className="login-redirect"> ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link> </p>
    </div>
  );
};

export default Register;