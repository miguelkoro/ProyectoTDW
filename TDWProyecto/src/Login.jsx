import { useState } from 'react';
import './Login.css'; // Archivo CSS para estilos
const Login = ({ onLoginSuccess }) => { // Recibe la función como prop
    const [nombre, setNombre] = useState(''); // Estado para el nombre de usuario
    const [password, setPassword] = useState(''); // Estado para la contraseña
    const [error, setError] = useState(''); // Estado para manejar errores


    const handleSubmit = (e) => {
        e.preventDefault(); // Evita el comportamiento predeterminado del formulario
        if(!nombre || !password) {
            /*alert("Por favor, completa todos los campos."); // Mensaje de alerta si los campos están vacíos*/
            setError("Por favor, completa todos los campos."); // Actualiza el estado del error
            return;
        }

        // Aquí puedes agregar lógica de autenticación
        // Simulando una autenticación fallida
        if (nombre !== 'admin' || password !== '1234') {
            /*alert("Nombre de usuario o contraseña incorrectos."); // Mensaje de alerta si la autenticación falla*/
            setError("Nombre de usuario o contraseña incorrectos."); // Actualiza el estado del error
            return;
        }
        
      // Aquí puedes agregar lógica de validación o autenticación
        // Simulando una autenticación exitosa
        setError(''); // Limpia el error si la autenticación es exitosa
        onLoginSuccess(); // Llama a la función para notificar que el usuario ha iniciado sesión
    };
    return (
        <div className="login-container">
        <h1 className="login-title">Login</h1>
        <form className="login-form" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Username"
                className="login-input"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)} // Actualiza el estado del nombre
            />
            <input
                type="password"
                placeholder="Password"
                className="login-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Actualiza el estado de la contraseña
            />
            <button type="submit" className="login-button">
            Login
            </button>
        </form>
        {error && <p className="login-error">{error}</p>} {/* Muestra el error si existe */}
        </div>
    );
}
export default Login;