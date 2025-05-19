import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from "./context/AuthContext.jsx";
import { useContext, useEffect } from 'react';
import { DataContext } from './context/DataContext';
import ProtectedRoute from './components/ProtectedRoute';
import { useAuth } from './context/AuthContext';



import Home from './pages/Home';
import Login from './pages/Login';
import NavBar from './components/NavBar';
import ObjectView from './pages/ObjectView';
import ObjectEdit from './pages/ObjectEdit';
import Register from './pages/Register';
import UserEdit from './pages/UserEdit';
import UserView from './pages/UserView';
import Management from './pages/Management.jsx';
import Search from './pages/Search.jsx';


function App() {  
  const {getPersons, getEntities, getProducts, getAssociations, getUsers, loadAllData} = useContext(DataContext); 
  const {user, getLocalUser, userLogin, loadData, isLoading} = useAuth(); // Obtiene el usuario autenticado del contexto
      //Aquí, los datos (persons, entities, products) se obtienen directamente del contexto.
      useEffect(() => {
        getLocalUser(); // Llama a la función para obtener el usuario local
        //getPersons(); // Llama a la función para obtener personas
        //getEntities(); // Llama a la función para obtener entidades
        //getProducts(); // Llama a la función para obtener productos
        //getAssociations(); // Llama a la función para obtener asociaciones
        //console.log("user", user); // Muestra el usuario en la consola
        //user && getUsers(); // Llama a la función para obtener usuarios
        //checkTokenExpiration(); // Llama a la función para verificar la expiración del token
        //console.log("useEffect normal", user); // Muestra el usuario en la consola
        loadAllData(); // Llama a la función para cargar todos los datos
        console.log("carga de todos los datos", user); // Muestra el usuario en la consola
      }, []);

      useEffect(() => {
        if (user?.scope === "writer" && !isLoading) {
          //console.log("user", user); // Muestra el usuario en la consola
          getUsers(); // Llama a la función para obtener usuarios          
        }
      },[isLoading]); // Se ejecuta cada vez que el usuario cambia*/

  return (
    <>
        <NavBar />        
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/view/:type/:id" element={<ObjectView />} />
            <Route path="/edit/:type/:id" element={<ProtectedRoute><ObjectEdit/></ProtectedRoute>} />
            <Route path="/view/user/:id" element={<ProtectedRoute><UserView /></ProtectedRoute>} />
            <Route path="/edit/user/:id" element={<ProtectedRoute><UserEdit/></ProtectedRoute>} />
            <Route path="/new/:type" element={<ProtectedRoute><ObjectEdit/></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><UserEdit/></ProtectedRoute>} />
            <Route path="/users" element={<Management type={"users"}/>} />
            <Route path="/associations" element={<Management type={"associations"}/>} />
            <Route path="/products" element={<Management type={"products"}/>} />
            <Route path="/persons" element={<Management type={"persons"}/>} />
            <Route path="/entities" element={<Management type={"entities"}/>} />
            <Route path="/search/" element={<Search/>} />

            <Route path="*" element={<Home />} />
          </Routes>
    </>
  )
}

export default App
