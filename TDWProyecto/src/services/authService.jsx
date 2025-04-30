import User from '../models/User.js'; 

const API_URL = 'http://localhost:8000/access_token'; // Cambia esto según tu configuración



export const login = async (username, password, scope = 'reader') => {
    try {
        const response = await fetch(API_URL, {method: 'POST', 
                body: new URLSearchParams({username, password,})})
            .then(res =>  res.json())
            .then(
                (result) => {return result},
                (error) => { console.log('Error en la solicitud:', error); return error; }
            )
            return response; // Devuelve el resultado de la solicitud
  
      /*if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.statusText}`);
      }*/
  
      /*const data = await response.json(); // Convierte la respuesta en JSON
      console.log('Token obtenido:', data); // Muestra el token en la consola
      return data; // Devuelve los datos obtenidos*/
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
      throw error; // Lanza el error para manejarlo en el componente que llama a esta función
    }
};