import { createContext, useContext, useState, useRef} from "react";
import { useNavigate } from "react-router-dom";
import * as authService from '../services/authService'; // Importa todos los servicios de dataService
import User from '../models/User'; // Importa el modelo User

const AuthContext = createContext();


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
  const [userLogin, setUserLogin] = useState(false); // Estado de carga 

  const [isLoading, setIsLoading] = useState(true); // Estado de carga

  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState("");
  const timeoutIdRef = useRef(null);

  /** Funcion para mostrar un mensaje de error o fallo en el navbar */
const showMessage = (text, type) => {
  if (timeoutIdRef.current) { clearTimeout(timeoutIdRef.current);  timeoutIdRef.current = null;  }
  // Establece el nuevo mensaje y tipo
  setMessage(text);
  setMessageType(type);
  // Configura un nuevo temporizador para ocultar el mensaje después de 3 segundos
  timeoutIdRef.current = setTimeout(() => {setMessage(null);
    setMessageType(""); timeoutIdRef.current = null; }, 3000);
};

  /** Funcion para coger el usuario del localstorage */
  const getLocalUser = () => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser)); // Carga el usuario desde localStorage
        checkTokenExpiration(); // Verifica si el token ha expirado
      }
    } catch (error) {
      console.error("Error al cargar el usuario desde localStorage:", error); // Maneja el error
    } finally {
      setIsLoading(false); // Finaliza la carga
    }
  }
 
  /** Funcion para iniciar sesion y recibir un nuevo token */
  const login = async (userName, password) => {
    try {
      const data = await authService.login(userName, password);      
      if (data && data.access_token) { // Verifica si la respuesta contiene el token
        const decodedToken = decodeJwt(data.access_token); // Decodifica el token JWT
        const userData = new User({id: decodedToken.uid, userName,
          scope: decodedToken.scopes.includes("writer") ? "writer" : "reader", // Guarda el scope del token
          token: data.access_token, expiresIn: new Date(Date.now() + data.expires_in * 1000),
        });
        setUser(userData); // Guarda el usuario en el estado                
        localStorage.setItem("user", JSON.stringify(userData)); // Guarda el usuario en localStorage
        showMessage(`Inicio de sesion correcto. Bienvenido ${userData.userName}`, "success"); // Muestra un mensaje de éxito al usuario
        navigate("/"); // Redirige al usuario a la página principal
      } else {
        showMessage("Error al iniciar sesion", "error"); // Muestra un mensaje de error al usuario
      }
    } catch (error) {
      console.error("Error al iniciar sesión", error.message);
      showMessage("Usuario o contraseña incorrectos.", "error"); // Muestra un mensaje de error al usuario
    }finally {  
      setUserLogin(true); // Finaliza la carga
      setIsLoading(false); // Finaliza la carga
    }
  };

  /** Funcion para comprobar si el token sigue siendo valido */
  const checkTokenExpiration = () => {
    if (user?.expiresIn) {
      const currentTime = new Date();
      const expirationTime = new Date(user.expiresIn);
      if (currentTime > expirationTime) { // Si el token ha expirado, cierra sesión        
        logout();        
        showMessage("Su sesión ha expirado. Por favor, inicie sesión nuevamente.", "error"); // Muestra un mensaje de error al usuario
        navigate("/login"); // Redirigir al usuario a la pantalla de login        
      }
    }
  };

  // Función para cerrar sesión
  const logout = () => {
    setUser(null);
    setUserLogin(false); // Finaliza la carga
    localStorage.removeItem("user");
    showMessage("Sesión cerrada correctamente", "success"); // Muestra un mensaje de éxito al usuario
    navigate("/login"); // Redirigir al usuario a la pantalla de login
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, getLocalUser, isLoading,
      showMessage, message, messageType,
      checkTokenExpiration, userLogin}}>
      {children}
    </AuthContext.Provider>
  );
};



// Hook para acceder a la autenticación
export const useAuth = () => useContext(AuthContext);