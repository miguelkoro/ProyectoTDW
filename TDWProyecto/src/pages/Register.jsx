import { useState, useEffect } from 'react';
import { useAuth } from "../context/AuthContext";
import '../styles/Login.css'; // Archivo CSS para estilos
import { useNavigate, Link } from "react-router-dom"; // Importa useNavigate y Link para redirección

const Register = () => {
  const { register, user } = useAuth(); // Obtén la función register y el usuario autenticado
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
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
    register(userName, email, password); // Llama a la función de registro
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Registro de Usuario</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre de Usuario"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Correo Electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Registrarse</button>
      </form>
      <p className="login-redirect">
        ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
      </p>
    </div>
  );
};

export default Register;