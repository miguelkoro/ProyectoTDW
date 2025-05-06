import User from '../models/User.js'; 
import { ROUTES } from '../Routes.js';

const API_URL = 'http://localhost:8000'; // Cambia esto según tu configuración
const BASE_PATH = "/api/v1/"; // Cambia esto según tu configuración



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

export const checkAPIUserName = async (name) => {
  const response = await fetch(ROUTES.USERNAME_CHECK(name), ) // Realiza la solicitud a la API con el nombre de usuario
  .then(
      (result) => {return result},
      (error) => { console.log('Error en la solicitud:', error); return error; }
  )
  //console.log("checkAPIUserName", response.ok); // Muestra el objeto en la consola
  return response.ok; // Devuelve el resultado de la solicitud
}

export const createAPIUser = async (userName, email, password) => {
  try{
    const payload = {
      username: userName,
      email: email,
      password: password      
    };
    console.log("createAPIUser", payload); // Verifica el objeto recibido
    const response = await fetch(`${API_URL}${BASE_PATH}users`, {
      method: 'POST',headers: {'Content-Type': 'application/json'}, body: JSON.stringify(payload),
    }).then(res => res.json())
      .then(
        (result) => {return result},
        (error) => { console.log('Error en la solicitud:', error); return error; });
    return response; // Devuelve el resultado de la solicitud
  }catch (error) {
    console.error('Error al realizar la solicitud:', error);
  }
}

export const updateAPIUser = async (userObject, password, role, token) => {
  try{    
    const payload = {
      username: userObject.userName,
      email: userObject.email,
      role: role,
      ...(password && { password }), // Solo incluye la contraseña si no está vacía

    };
    const response = await fetch(`${API_URL}${BASE_PATH}users/${userObject.id}`, {
      method: 'PUT', body: JSON.stringify(payload), // Convierte el objeto a JSON
      headers: {'Content-Type': 'application/json', 'If-Match': userObject.etag, 'Authorization': `Bearer ${token}`,}

    }).then(res => res.json())
      .then(
        (result) => {return result},
        (error) => { console.log('Error en la solicitud:', error); return error; });
    console.log("Objeto actualizado en la API:", response); // Muestra el objeto actualizado en la consola
    return response; // Devuelve el resultado de la solicitud
  }catch (error) {
    console.error('Error al realizar la solicitud:', error);
  }
}

//Delete

//getAPIObject
export const getAPIUserById = async (id, token) => {
  const response = await fetch(ROUTES.USER_BY_ID(id), { // Realiza la solicitud a la API con el ID
    headers: {'Authorization': `Bearer ${token}`} // Agrega el token en la cabecera de autorización
    }).then(async (res) => { 
        const etag = res.headers.get('ETag'); // Obtiene el ETag de la respuesta 
        const data = await res.json();
      return ({ data, etag }); // Convierte la respuesta en JSON y devuelve el ETag
      })
      .then(
        (result) => {return result},
        (error) => { console.log('Error en la solicitud:', error); return error; });

    //const object = await response.json(); // Convierte la respuesta en JSON
    console.log("Objeto obtenido de la API:", response); // Muestra el objeto en la consola
    return response; // Devuelve el objeto obtenido de la API 
}

