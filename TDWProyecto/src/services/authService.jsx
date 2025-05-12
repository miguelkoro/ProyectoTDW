import { ROUTES } from '../Routes.js';


export const login = async (username, password) => {
    try {
        const response = await fetch(ROUTES.LOGIN, {method: 'POST', 
                body: new URLSearchParams({username, password,})})
            .then(res =>  res.json())
            .then(
                (result) => {return result},
                (error) => { console.log('Error en la solicitud:', error); return error; }
            )
            console.log("login", response); // Muestra el objeto en la consola
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





//Delete

//getAPIObject


