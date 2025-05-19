import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";
import { HashRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { DataProvider } from "./context/DataContext.jsx";

createRoot(document.getElementById('root')).render(
  
    <HashRouter>
      <AuthProvider>
        <DataProvider>
          <App />
        </DataProvider>
        </AuthProvider>
    </HashRouter>
)
