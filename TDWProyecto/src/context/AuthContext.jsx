import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as authService from '../services/authService'; // Importa todos los servicios de dataService
import User from '../models/User'; // Importa el modelo User
// Crear el contexto
const AuthContext = createContext();

// Usuarios simulados
/*const mockUsers = {
  x: { id: 1508, password: "x", profileImage: "https://unavatar.io/Nintenderos",  role: "reader"},
  y: { id: 2501, password: "y", profileImage: "https://unavatar.io/miguelkoro", role: "writer" },
  z: { id: 3652, password: "z", profileImage: "https://unavatar.io/realDonaldTrump", role: "writer" },
};*/

function decodeJwt(token) {
  const payloadBase64Url = token.split('.')[1]; // Extrae el payload
  const payloadBase64 = payloadBase64Url.replace(/-/g, '+').replace(/_/g, '/'); // Convierte Base64URL a Base64
  const payloadJson = atob(payloadBase64); // Decodifica Base64
  return JSON.parse(payloadJson); // Convierte a objeto JSON
}

// Proveedor de autenticación
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Cargar usuario desde localStorage al iniciar
  // Cargar usuario desde localStorage al iniciar
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Carga el usuario desde localStorage
    }
  }, []);
 
  // Función para iniciar sesión
  const login = async (userName, password) => {
    try {
       // Llama al servicio de autenticación
      const data = await authService.login(userName, password);
      // Verifica si la respuesta contiene el token
      if (data && data.access_token) {
        const decodedToken = decodeJwt(data.access_token);
        const userData = new User({
          id: decodedToken.uid, // ID del usuario
          userName, // Guarda el nombre de usuario
          scope: decodedToken.scopes.includes("writer") ? "writer" : "reader", // Guarda el scope del token
          token: data.access_token, // Guarda el token de acceso
          expiresIn: data.expires_in, // Guarda el tiempo de expiración
          //tokenType: data.token_type, // Guarda el tipo de token (opcional)
        });
        // Decodifica el token para obtener los datos del usuario
        console.log("decodedToken: ", decodedToken); // Muestra el token decodificado en la consola
        console.log("user: ", userData); // Muestra el token decodificado en la consola
        // Actualiza el estado global del usuario
        setUser(userData);        

         // Guarda el usuario en localStorage
         localStorage.setItem("user", JSON.stringify(userData));
        // Redirige al usuario a la página principal
        navigate("/");
      } else {
        throw new Error("Error en la autenticación: No se recibió un token válido.");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error.message);
      alert("Usuario o contraseña incorrectos."); // Muestra un mensaje de error al usuario
    }
  };

  // Función para cerrar sesión
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/login"); // Redirigir al usuario a la pantalla de login
  };


  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para acceder a la autenticación
export const useAuth = () => useContext(AuthContext);