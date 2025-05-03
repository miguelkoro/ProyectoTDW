import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from "./context/AuthContext.jsx";
import { useContext, useEffect } from 'react';
import { DataContext } from './context/DataContext';
import ProtectedRoute from './components/ProtectedRoute';


import './styles/App.css'

import Home from './pages/Home';
import Login from './pages/Login';
import NavBar from './components/NavBar';
import ObjectView from './pages/ObjectView';
import ObjectEdit from './pages/ObjectEdit';
import Register from './pages/Register';
import UserEdit from './pages/UserEdit';


function App() {  
  const {getPersons, getEntities, getProducts, getAssociations} = useContext(DataContext); 
      //Aquí, los datos (persons, entities, products) se obtienen directamente del contexto.
      useEffect(() => {
        getPersons(); // Llama a la función para obtener personas
        getEntities(); // Llama a la función para obtener entidades
        getProducts(); // Llama a la función para obtener productos
        getAssociations(); // Llama a la función para obtener asociaciones
      }, []);

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
