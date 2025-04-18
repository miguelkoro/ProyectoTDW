import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename="/ProyectoTDW">
      <AuthProvider>
        <App />
        </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
