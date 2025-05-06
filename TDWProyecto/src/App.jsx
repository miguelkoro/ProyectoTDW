import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from "./context/AuthContext.jsx";
import { useContext, useEffect } from 'react';
import { DataContext } from './context/DataContext';
import ProtectedRoute from './components/ProtectedRoute';
import { useAuth } from './context/AuthContext';



import './styles/App.css'

import Home from './pages/Home';
import Login from './pages/Login';
import NavBar from './components/NavBar';
import ObjectView from './pages/ObjectView';
import ObjectEdit from './pages/ObjectEdit';
import Register from './pages/Register';
import UserEdit from './pages/UserEdit';


function App() {  
  const {getPersons, getEntities, getProducts, getAssociations, getUsers} = useContext(DataContext); 
  const {user, getLocalUser} = useAuth(); // Obtiene el usuario autenticado del contexto
      //Aquí, los datos (persons, entities, products) se obtienen directamente del contexto.
      useEffect(() => {
        getLocalUser(); // Llama a la función para obtener el usuario local
        getPersons(); // Llama a la función para obtener personas
        getEntities(); // Llama a la función para obtener entidades
        getProducts(); // Llama a la función para obtener productos
        getAssociations(); // Llama a la función para obtener asociaciones
        //console.log("user", user); // Muestra el usuario en la consola
        //user && getUsers(); // Llama a la función para obtener usuarios
        
        //checkTokenExpiration(); // Llama a la función para verificar la expiración del token
      }, []);

      useEffect(() => {
        if (user && user?.scope === "writer") {
          //console.log("user", user); // Muestra el usuario en la consola
          getUsers(); // Llama a la función para obtener usuarios
        }
      },[user]); // Se ejecuta cada vez que el usuario cambia

  return (
    <>
        <NavBar />        
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/view/:type/:id" element={<ObjectView />} />
            <Route path="/edit/:type/:id" element={<ProtectedRoute><ObjectEdit/></ProtectedRoute>} />
            <Route path="/new/:type" element={<ProtectedRoute><ObjectEdit/></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><UserEdit/></ProtectedRoute>} />
            <Route path="*" element={<Home />} />
          </Routes>
    </>
  )
}

export default App
