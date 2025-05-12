import { useState, useEffect } from 'react';
import { useAuth } from "../context/AuthContext";
import '../styles/index.scss'; // Archivo CSS para estilos
import { useNavigate, Link } from "react-router-dom"; 

const Login = () => { 
    const { login, user } = useAuth(); // Obtén la función login y el usuario autenticado
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const [nameError, setNameError] = useState(false); // Estado para el error de nombre
    const [passwordError, setPasswordError] = useState(false); // Estado para el error de contraseña
  
    const navigate = useNavigate(); // Hook para redirigir

    // Redirige al Home si el usuario ya está logueado
    useEffect(() => {
      if (user) {navigate("/");} // Redirige a la página de inicio si el usuario ya está autenticado
    }, [user, navigate]); // Se ejecuta cuando cambia el estado de user o navigate

    /**Comprobar longitud del nombre */
    const checkName = () => {
      if (userName.length < 3) {setNameError(true); return false;
      }else { setNameError(false); return true;}
    };
    /** Comprobar longitud de la contraseña */
    const checkPassword = () => {
      if (password.length < 6 || password.length > 12) {
        setPasswordError(true); return false;
      } else { setPasswordError(false);return true;}
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      if(!checkName() || !checkPassword()) return; // Verifica si los campos son válidos antes de iniciar sesión
      await login(userName, password); // Llama a la función de inicio de sesión
    };

    return (
        <div className="login-container">
          <h1 className="login-title">Iniciar Sesión</h1>
          <form onSubmit={handleSubmit}>
            <div className='input-container'>
              <input type="text" className={nameError ? 'input-error' : ''}
                placeholder="Usuario" value={userName} onBlur={checkName}
                onChange={(e) => setUserName(e.target.value)}/>
              {nameError && <span className="error-input-text">Introduce un usuario valido</span>}
            </div>
            <div className='input-container'>
              <input type="password" className={passwordError ? 'input-error' : ''}
                placeholder="Contraseña" value={password} onBlur={checkPassword}
                onChange={(e) => setPassword(e.target.value)}/>
              {passwordError && <span className="error-input-text">Introduce una contraseña valida</span>}
            </div>
            <button type="submit">Iniciar Sesión</button>
          </form>
          <p className="login-redirect"> ¿Aun no tienes cuenta? <Link to="/register">Registrate</Link></p>
        </div>
    );
};

export default Login;