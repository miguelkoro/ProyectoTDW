import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from "./context/AuthContext.jsx";
import { DataProvider } from "./context/DataContext.jsx";

import './styles/App.css'

import Home from './pages/Home';
import Login from './pages/Login';
import NavBar from './components/NavBar';
import ObjectView from './pages/ObjectView';
import ObjectEdit from './pages/ObjectEdit';
import Register from './pages/Register';


function App() {  

  return (
    <AuthProvider>
      <DataProvider>
        <NavBar />        
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/view/:type/:id" element={<ObjectView />} />
            <Route path="/edit/:type/:id" element={<ObjectEdit/>} />
            <Route path="/new/:type" element={<ObjectEdit/>} />
            <Route path="*" element={<Home />} />
          </Routes>
        </DataProvider>
    </AuthProvider>
  )
}

export default App
