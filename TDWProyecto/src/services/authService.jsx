import { ROUTES } from '../Routes.js';


export const login = async (username, password) => {
    try {
      const response = await fetch(ROUTES.LOGIN, {method: 'POST', 
              body: new URLSearchParams({username, password,})})
        .then(res =>  res.json())
        .then(
            (result) => {return result},
            (error) => { console.log('Error en la solicitud:', error); return error; })
      return response; // Devuelve el resultado de la solicitud
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
      throw error; // Lanza el error para manejarlo en el componente que llama a esta función
    }
};


