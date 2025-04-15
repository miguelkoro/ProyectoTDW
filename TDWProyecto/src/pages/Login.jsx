import { useState, useEffect } from 'react';
import { useAuth } from "../context/AuthContext";
import '../styles/Login.css'; // Archivo CSS para estilos
import { useNavigate } from "react-router-dom"; // Importa useNavigate para redirección

const Login = () => { // Recibe la función como prop


    const { login, user } = useAuth(); // Obtén la función login y el usuario autenticado
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
  
    const navigate = useNavigate(); // Hook para redirigir
    // Redirige al Home si el usuario ya está logueado
    useEffect(() => {
      if (user) {
        navigate("/"); // Redirige al Home
      }
    }, [user, navigate]); // Se ejecuta cuando cambia el estado de user o navigate

    const handleSubmit = (e) => {
      e.preventDefault();
      login(userName, password); // Llama a la función de inicio de sesión
    };
    return (
        <div className="login-container">
          <h1 className="login-title">Iniciar Sesión</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Usuario"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Iniciar Sesión</button>
          </form>
        </div>
    );
};

export default Login;