import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Crear el contexto
const AuthContext = createContext();

// Usuarios simulados
const mockUsers = {
  x: { password: "x", profileImage: "https://unavatar.io/Nintenderos" },
  y: { password: "y", profileImage: "https://unavatar.io/miguelkoro" },
  z: { password: "z", profileImage: "https://unavatar.io/realDonaldTrump" },
};

// Proveedor de autenticación
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Cargar usuario desde localStorage al iniciar
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);
 
  // Función para iniciar sesión
  const login = (userName, password) => {
    try {
      // Verificar si el usuario y la contraseña coinciden
      if (mockUsers[userName] && mockUsers[userName].password === password) {

        const userData = {
          userName,
          profileImage: mockUsers[userName].profileImage,
        }; // Datos del usuario logueado (Lo devuelve del backend)


        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        navigate("/"); // Redirigir al usuario a la pantalla principal
      } else {
        throw new Error("Usuario o contraseña incorrectos");
      }
    } catch (error) {
      console.error("Error:", error.message);
      alert(error.message); // Mostrar un mensaje de error al usuario
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