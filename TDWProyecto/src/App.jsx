import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from "./context/AuthContext.jsx";

import './App.css'

import Home from './pages/Home';
import Login from './pages/Login';
import NavBar from './components/NavBar';
import ObjectView from './pages/ObjectView';
//import ObjectEdit from './pages/ObjectEdit';


function App() {  

  return (
    <AuthProvider>
        <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/object/:id" element={<ObjectView />} />
            <Route path="*" element={<Home />} />
          </Routes>
    </AuthProvider>
  )
}

export default App
