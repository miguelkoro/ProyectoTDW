import { ROUTES } from '../Routes.js';


export const login = async (username, password) => {
    try {
      const response = await fetch(ROUTES.LOGIN, {method: 'POST', 
              body: new URLSearchParams({username, password,})})
        .then(async (res) =>  {
          //console.log(res); 
          const status = res.status; // Obtiene el estado de la respuesta
          const data = await res.json(); // Espera a que se resuelva la promesa y convierte la respuesta a JSON
          return ({data, status});})
        .then(
            (result) => {return result},
            (error) => { console.log('Error en la solicitud:', error); return error; })
      return response; // Devuelve el resultado de la solicitud
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
      throw error; // Lanza el error para manejarlo en el componente que llama a esta función
    }
};


