import { ROUTES } from '../Routes.js';

const fetchParams = (name, order, ordering) => {
  const queryParams = new URLSearchParams();
  name!=='' && queryParams.append('name', name); // Agrega el parámetro de nombre si se proporciona   
  (order === 'id' || order === 'name')  && queryParams.append('order', order); // Agrega el parámetro de orden si se proporciona
  (ordering === 'ASC' || ordering === 'DESC') && queryParams.append('ordering', ordering); // Agrega el parámetro de ordenamiento si se proporciona
  return queryParams;
}

/**OBJETOS */
export const fetchAPIObjects = async (objectsType, name = '', order = '', ordering = '') => { //(contieneNombre, id | nombre, ASC | DESC)
  try{
    const queryParams = fetchParams(name, order, ordering);  
    const response = await fetch(`${ROUTES.OBJECTS(objectsType)}?${queryParams}`); 
    if (!response.ok) {     
      return {type: 'error', data: response.status}; // Devuelve un objeto de error
    }
    const objects = await response.json(); // Convierte la respuesta en JSON
    return {type: 'success', data: objects}; // Devuelve los datos obtenidos de la API
  }catch (error) {
    console.error('Error al realizar la solicitud:', error);
  }
}
/**Coger un objeto por su id */
export const fetchAPIObjectById = async (objectsType, id) => {
  try{
    const response = await fetch(ROUTES.OBJECT_BY_ID(objectsType,id)) // Realiza la solicitud a la API con el ID
      .then(async (res) => {
        const status = res.status; // Obtiene el estado de la respuesta 
        const etag = res.headers.get('ETag'); // Obtiene el ETag de la respuesta 
        const data = await res.json();
        return ({ data, etag, status });})
      .then(
        (result) => {return result},
        (error) => { console.log('Error en la solicitud:', error); return error; });    
    return response; // Devuelve el objeto obtenido de la API
  }catch (error) {
    console.error('Error al realizar la solicitud:', error);
  }
}
/**Crear un objeto */
export const createAPIObject = async (objectsType, object, token) => {
  try{
    const payload = {name: object.name,birthDate: object.birthDate,deathDate: object.deathDate,
      imageUrl: object.imageUrl,wikiUrl: object.wikiUrl,};
    const response = await fetch(ROUTES.CREATE_OBJECT(objectsType), {
        method: 'POST',
        headers: {'Content-Type': 'application/json','Authorization': `Bearer ${token}`,},
        body: JSON.stringify(payload)})
      .then(async (res) => {
          const status = res.status;
          const data = await res.json(); // Convierte la respuesta en JSON
          return ({ status, data }); // Devuelve el estado y los datos
        })
      .then(
        (result) => {return result},
        (error) => { console.log('Error en la solicitud:', error); return error; });
    return response; // Devuelve el resultado de la solicitud
  }catch (error) {
    console.error('Error al realizar la solicitud:', error);
  }
}
/**Actualiza un objeto */
export const updateAPIObject = async (objectsType, object, token) => {
  try{
    const payload = {name: object.name, birthDate: object.birthDate, deathDate: object.deathDate,
      imageUrl: object.imageUrl, wikiUrl: object.wikiUrl,};
    const response = await fetch(ROUTES.UPDATE_OBJECT(objectsType, object.id),{//`${API_URL}${BASE_PATH}${objectsType}/${object.id}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json', 'If-Match': object.etag, 'Authorization': `Bearer ${token}`, },
      body: JSON.stringify(payload),})
      .then(async (res) => {
        const data = await res.json()
        const status = res.status; // Obtiene el estado de la respuesta
        return ({ data , status });})
      .then(
        (result) => {return result},
        (error) => { console.log('Error en la solicitud:', error); return error; });
        console.log("Response", response)
    return response; // Devuelve el resultado de la solicitud
  }catch (error) {
    console.error('Error al realizar la solicitud:', error);
  }
}
/**Eliminar un objeto */
export const deleteAPIObject = async (objectsType,id, token) => {
  try{
    const response = await fetch(ROUTES.DELETE_OBJECT(objectsType, id),{//`${API_URL}${BASE_PATH}${objectsType}/${id}`, {
        method: 'DELETE',
        headers: {'Authorization': `Bearer ${token}`}}) // Agrega el token en la cabecera de autorización})
      .then(
        (result) => {return result},
        (error) => { console.log('Error en la solicitud:', error); return error; });       
    return response; // Devuelve el resultado de la solicitud    
  }catch (error) {
    console.error('Error al realizar la solicitud:', error);
  }
}
/**Añadir o eliminar una relacion con un objeto */
export const addRemRelationAPI = async (objectsType, id, relationType, relationId, action, token) => {
  try{                            //entities/idEntity/person/add|rem/idPerson (quita la personas de la entidad))
    const response = await fetch(ROUTES.ADD_REMOVE_RELATION(objectsType, id, relationType, action, relationId), {
        method: 'PUT',
        headers: {'Authorization': `Bearer ${token}`}}) 
      .then(
        (result) => {return result},
        (error) => { console.log('Error en la solicitud:', error); return error; });
    return response; // Devuelve el resultado de la solicitud    
  }catch (error) {
    console.error('Error al realizar la solicitud:', error);
  }
}

/** USUARIOS */
/**Coger todos los usuarios */
export const fetchAPIUsers = async (token,name = '', order = '', ordering = '') => {
  try{
    const queryParams = fetchParams(name, order, ordering); 
    const response = await fetch(`${ROUTES.USERS}?${queryParams}`,{ // Realiza la solicitud a la API con los parámetros de consulta
        headers: {'Authorization': `Bearer ${token}`}})
      .then(res => res.json())
      .then(
        (result) => {return result},
        (error) => { console.log('Error en la solicitud:', error); return error; });
    return response; // Devuelve el resultado de la solicitud
  }catch (error) {
    console.error('Error al realizar la solicitud:', error);
  }
}
/**Eliminar un usuario */
export const deleteAPIUser = async (id, token) => {
  try{
    const response = await fetch(ROUTES.DELETE_USER(id), {
        method: 'DELETE',
        headers: {'Authorization': `Bearer ${token}`,}})
      .then(
        (result) => {return result},
        (error) => { console.log('Error en la solicitud:', error); return error; });
    return response; // Devuelve el resultado de la solicitud
  }catch (error) {
    console.error('Error al realizar la solicitud:', error);
  }
}
/**Actualizar un usuario */
export const updateAPIUser = async (userObject, password, role, token) => {
  try{    
    const payload = {email: userObject.email, 
      role: role, birthDate: userObject.birthDate,name:userObject.name, ...(password && { password }) }; //Solo actualiza la contraseña si se proporciona
    const response = await fetch(ROUTES.UPDATE_USER(userObject.id), {
        method: 'PUT', body: JSON.stringify(payload), // Convierte el objeto a JSON
        headers: {'Content-Type': 'application/json',
                  'If-Match': userObject.etag, 
                  'Authorization': `Bearer ${token}`}})
      .then(res => res.json())
      .then(
        (result) => {return result},
        (error) => { console.log('Error en la solicitud:', error); return error; });
    return response; // Devuelve el resultado de la solicitud
  }catch (error) {
    console.error('Error al realizar la solicitud:', error);
  }
}
/**Crear un usuario */
export const createAPIUser = async (userName, email, password, birthDate, name) => {
  try{
    const payload = {username: userName, email: email, password: password,  birthDate: birthDate, name:name};
    console.log("Payload", payload)
    const response = await fetch(ROUTES.CREATE_USER, {
      method: 'POST', 
      headers: {'Content-Type': 'application/json'}, 
      body: JSON.stringify(payload),})
    .then(res => res.json())
    .then(
      (result) => {return result},
      (error) => { console.log('Error en la solicitud:', error); return error; });
    return response; 
  }catch (error) {
    console.error('Error al realizar la solicitud:', error);
  }
}
/**Coger un usuario por id */
export const getAPIUserById = async (id, token) => {
  try{
    const response = await fetch(ROUTES.USER_BY_ID(id), { // Realiza la solicitud a la API con el ID
      headers: {'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`} // Agrega el token en la cabecera de autorización
      }).then(async (res) => { 
          const etag = res.headers.get('ETag'); // Obtiene el ETag de la respuesta 
          const data = await res.json();
          return ({ data, etag });}) // Convierte la respuesta en JSON y devuelve el ETag
        .then(
          (result) => {return result},
          (error) => { console.log('Error en la solicitud:', error); return error; });
      return response; // Devuelve el objeto obtenido de la API 
  }catch (error) {
    console.error('Error al realizar la solicitud:', error);
  }
}
/**Comprobar si existe el nombre de usuario */
export const checkAPIUserName = async (name) => {
  try{
    const response = await fetch(ROUTES.USERNAME_CHECK(name), ) // Realiza la solicitud a la API con el nombre de usuario
    .then(
        (result) => {return result},
        (error) => { console.log('Error en la solicitud:', error); return error; }
    )
    if(response.ok)return true; 
    else return false; // El usuario no existe
  }catch (error) {
    console.error('Error al realizar la solicitud:', error);
    return false;
  }
}

