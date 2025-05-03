
const API_URL = 'http://127.0.0.1:8000'; // Cambia esto a la URL de tu API
const BASE_PATH = '/api/v1/'

const fetchParams = (name, order, ordering) => {
  const queryParams = new URLSearchParams();
  name!=='' && queryParams.append('name', name); // Agrega el parámetro de nombre si se proporciona   
  (order === 'id' || order === 'name')  && queryParams.append('order', order); // Agrega el parámetro de orden si se proporciona
  (ordering === 'ASC' || ordering === 'DESC') && queryParams.append('ordering', ordering); // Agrega el parámetro de ordenamiento si se proporciona
  return queryParams;
}

export const fetchAPIObjects = async (objectsType, name = '', order = '', ordering = '') => { //(contieneNombre, id | nombre, ASC | DESC)
  try{
    const queryParams = fetchParams(name, order, ordering); // Obtiene los parámetros de consulta   
    const response = await fetch(`${API_URL}${BASE_PATH}${objectsType}?${queryParams}`); // Realiza la solicitud a la API con los parámetros de consulta
    //console.log("URL de la API:", `${API_URL}${BASE_PATH}${objectsType}?${queryParams}`); // Muestra la URL de la API en la consola
    if (!response.ok) {
      //throw new Error('Error en la solicitud a la API');
      //console.error('Error en la solicitud a la API:', response.status, response.statusText); // Muestra el error en la consola
      return {type: 'error', data: response.status}; // Devuelve un objeto de error
    }
    const objects = await response.json(); // Convierte la respuesta en JSON
    //console.log("Entidad obtenida de la API:", persons); // Muestra la entidad en la consola
    return {type: 'success', data: objects}; // Devuelve los datos obtenidos de la API
  }catch (error) {
    console.error('Error al realizar la solicitud:', error);
  }
}
//Obtener un objeto por ID de la API
export const fetchAPIObjectById = async (objectsType, id) => {
  try{
    const response = await fetch(`${API_URL}${BASE_PATH}${objectsType}/${id}`) // Realiza la solicitud a la API con el ID
      .then((res) => { 
        const etag = res.headers.get('ETag'); // Obtiene el ETag de la respuesta 
        return res.json().then((data) => ({ data, etag })); // Convierte la respuesta en JSON y devuelve el ETag
      })
      .then(
        (result) => {return result},
        (error) => { console.log('Error en la solicitud:', error); return error; });

    //const object = await response.json(); // Convierte la respuesta en JSON
    console.log("Objeto obtenido de la API:", response); // Muestra el objeto en la consola
    return response; // Devuelve el objeto obtenido de la API
  }catch (error) {
    console.error('Error al realizar la solicitud:', error);
  }
}

export const createAPIObject = async (objectsType, object, token) => {
  try{
    //console.log("createAPIObject", objectsType, object); // Verifica el objeto recibido
    // Extrae solo las propiedades necesarias del objeto
    const payload = {
      name: object.name,
      birthDate: object.birthDate,
      deathDate: object.deathDate,
      imageUrl: object.imageUrl,
      wikiUrl: object.wikiUrl,
    };
    //console.log("crefdfdateAPIObject", JSON.stringify(name, birthdate, deathdate, imageurl, wikiurl)); // Verifica el objeto recibido
    const response = await fetch(`${API_URL}${BASE_PATH}${objectsType}`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`, // Agrega el token en la cabecera de autorización
      },
      body: JSON.stringify(payload), // Convierte el objeto a JSON
    }).then(res => res.json())
      .then(
        (result) => {return result},
        (error) => { console.log('Error en la solicitud:', error); return error; });
    return response; // Devuelve el resultado de la solicitud
    //const createdObject = await response.json(); // Convierte la respuesta en JSON
    //console.log("Objeto creado en la API:", createdObject); // Muestra el objeto creado en la consola
    //return createdObject; // Devuelve el objeto creado
  }catch (error) {
    console.error('Error al realizar la solicitud:', error);
  }
}

export const updateAPIObject = async (objectsType, object, token) => {
  try{
    // Extrae solo las propiedades necesarias del objeto
    const payload = {
      name: object.name,
      birthDate: object.birthDate,
      deathDate: object.deathDate,
      imageUrl: object.imageUrl,
      wikiUrl: object.wikiUrl,
    };
    console.log("ggf", payload); // Verifica el objeto recibido
    const response = await fetch(`${API_URL}${BASE_PATH}${objectsType}/${object.id}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json','If-Match': object.etag, 'Authorization': `Bearer ${token}`, // Agrega el token en la cabecera de autorización
      },
      body: JSON.stringify(payload), // Convierte el objeto a JSON
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

export const deleteAPIObject = async (objectsType,id, token) => {
  try{
    const response = await fetch(`${API_URL}${BASE_PATH}${objectsType}/${id}`, {
      method: 'DELETE',
      headers: {'Authorization': `Bearer ${token}`}}) // Agrega el token en la cabecera de autorización})
      .then(
        (result) => {return result},
        (error) => { console.log('Error en la solicitud:', error); return error; });
        console.log("Objeto eliminado de la API:", response); // Muestra el objeto eliminado en la consola
    return response; // Devuelve el resultado de la solicitud    
  }catch (error) {
    console.error('Error al realizar la solicitud:', error);
  }
}

export const addRemRelationAPI = async (objectsType, id, relationType, relationId, action, token) => {
  try{                                                 //entities/idEntity/person/add|rem/idPerson (quita la personas de la entidad))
    const response = await fetch(`${API_URL}${BASE_PATH}${objectsType}/${id}/${relationType}/${action}/${relationId}`, {
      method: 'PUT',
      headers: {'Authorization': `Bearer ${token}`}}) // Agrega el token en la cabecera de autorización})
      .then(
        (result) => {return result},
        (error) => { console.log('Error en la solicitud:', error); return error; });
    console.log("Relación añadida en la API:", response); // Muestra la relación añadida en la consola
    return response; // Devuelve el resultado de la solicitud    
  }catch (error) {
    console.error('Error al realizar la solicitud:', error);
  }
}

export const createAPIUser = async (userName, email, password) => {
  try{
    const payload = {
      username: userName,
      email: email,
      password: password      
    };
    const response = await fetch(`${API_URL}${BASE_PATH}users`, {
      method: 'POST', body: JSON.stringify(payload), // Convierte el objeto a JSON
      headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`,}

    }).then(res => res.json())
      .then(
        (result) => {return result},
        (error) => { console.log('Error en la solicitud:', error); return error; });
    return response; // Devuelve el resultado de la solicitud
  }catch (error) {
    console.error('Error al realizar la solicitud:', error);
  }
}

export const updateAPIUser = async (userId, userName, email, password, etag) => {
  try{
    const payload = {
      username: userName,
      email: email,
      password: password      
    };
    const response = await fetch(`${API_URL}${BASE_PATH}users/${userId}`, {
      method: 'PUT', body: JSON.stringify(payload), // Convierte el objeto a JSON
      headers: {'Content-Type': 'application/json', 'If-Match': etag, 'Authorization': `Bearer ${token}`,}

    }).then(res => res.json())
      .then(
        (result) => {return result},
        (error) => { console.log('Error en la solicitud:', error); return error; });
    return response; // Devuelve el resultado de la solicitud
  }catch (error) {
    console.error('Error al realizar la solicitud:', error);
  }
}

///////
