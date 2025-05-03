import { useState, useEffect, useContext, } from 'react';
import { useAuth } from "../context/AuthContext";
import '../styles/Login.css'; // Archivo CSS para estilos
import { useNavigate, Link } from "react-router-dom"; // Importa useNavigate y Link para redirección
import { DataContext } from '../context/DataContext'; // Contexto para guardar datos

const Register = () => {
  const { register, user, checkUserName } = useAuth(); // Obtén la función register y el usuario autenticado
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [nameChecked, setNameChecked] = useState(false); // Estado para verificar el nombre de usuario

  const {showMessage} = useContext(DataContext); // Accede al método getObjectById del contexto

  const navigate = useNavigate(); // Hook para redirigir

  const [passwordError, setPasswordError] = useState(false); // Estado para el error de contraseña
  const [emailError, setEmailError] = useState(false); // Estado para el error de email
  const [nameError, setNameError] = useState(false); // Estado para el error de nombre


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

  const checkNameLength = () => {
    if (userName.length < 3) { // Verifica si el nombre tiene menos de 3 caracteres
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
  
    if (await checkUserName(userName)) {
      setNameError(true); // Establece el error si el nombre ya existe
      showMessage("El nombre de usuario ya está en uso", "error"); // Muestra un mensaje de error
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
    if ( !checkEmail() || !checkPasswords()) return; // Verifica los campos antes de enviar el formulario
    register(userName, email, password); // Llama a la función de registro
  };

  return (
    <div className="login-container">
      <h1 className="login-title">{!nameChecked ? "Registro de nuevo Usuario" : `Termina de registrate, ${userName}`}</h1>
      <form onSubmit={handleSubmit}>
        {!nameChecked && <><input
          type="text"
          placeholder="Nombre de Usuario"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className={nameError ? 'input-error' : ''}
          onBlur={checkNameLength}/>
          <button type="button" onClick={checkName}>Comprobar nombre</button> </>}
        {nameChecked && <><input
          type="email"
          placeholder="Correo Electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={emailError ? 'input-error' : ''}
          onBlur={checkEmail} // Valida al deseleccionar el campo
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={passwordError ? 'input-error' : ''}
          onBlur={checkPasswords} // Valida al deseleccionar el campo
        />
        <input
          type="password"
          placeholder="Confirmar Contraseña"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className={passwordError ? 'input-error' : ''}
          onBlur={checkPasswords} // Valida al deseleccionar el campo
        /><button type="submit">Registrarse</button> </>} 
      </form>
      <p className="login-redirect">
        ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
      </p>
    </div>
  );
};

export default Register;