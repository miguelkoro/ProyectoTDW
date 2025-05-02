import Persona from '../models/Persona.js'; 
import Entidad from '../models/Entidad.js'; 
import Producto from '../models/Producto.js'; 

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

///////



const deletePersonRelations = (id) => {
   // Eliminar el ID de los arrays `persons` en `products`
   const products = fetchProductsFromLocalStorage();
   const updatedProducts = products.map((product) => {
     if (Array.isArray(product.persons)) {
       product.persons = product.persons.filter((personId) => personId !== Number(id));
     }
     return product;
   });
   localStorage.setItem('products', JSON.stringify(updatedProducts));
   // Eliminar el ID de los arrays `persons` en `entities`
   const entities = fetchEntitiesFromLocalStorage();
   const updatedEntities = entities.map((entity) => {
     if (Array.isArray(entity.persons)) {
       entity.persons = entity.persons.filter((personId) => personId !== Number(id));
     }
     return entity;
   });
   localStorage.setItem('entities', JSON.stringify(updatedEntities));
}

const deleteEntityRelations = (id) => {
  const products = fetchProductsFromLocalStorage();
   const updatedProducts = products.map((product) => {
     if (Array.isArray(product.entities)) {
       product.entities = product.entities.filter((entityId) => entityId !== Number(id));
     }
     return product;
   });
   localStorage.setItem('products', JSON.stringify(updatedProducts));
}


//create relations
export const addRelationToProductLocal = (fatherId, type, childId) => {
  const products = fetchProductsFromLocalStorage(); // Obtén todos los productos del localStorage
  const productIndex = products.findIndex((product) => product.id === Number(fatherId)); // Encuentra el índice del producto padre
  if (productIndex === -1) {
    console.error(`Producto con ID ${fatherId} no encontrado.`);
    return false; // Indica que no se encontró el producto padre
  }
  let child;
  if(type === "person") {
    child = fetchPersonByIdFromLocal(childId); // Obtén la persona hijo por su ID
  }else{
    child = fetchEntityByIdFromLocal(childId); // Obtén la entidad hijo por su ID
  }
  if (!child) {
    console.error(`Producto hijo con ID ${childId} no encontrado.`);
    return false; // Indica que no se encontró el producto hijo
  }
  products[productIndex][type].push(child.id); // Agrega la relación al producto padre
  localStorage.setItem('products', JSON.stringify(products)); // Guarda la lista actualizada en el localStorage
  console.log(`Relación añadida entre Producto ${fatherId} y ${childId}.`);
  return true; // Indica que la operación fue exitosa
}
export const addRelationToEntityLocal = (fatherId, type, childId) => {
  const entities = fetchEntitiesFromLocalStorage(); // Obtén todas las entidades del localStorage
  const entityIndex = entities.findIndex((entity) => entity.id === Number(fatherId)); // Encuentra el índice de la entidad padre
  if (entityIndex === -1) {
    console.error(`Entidad con ID ${fatherId} no encontrada.`);
    return false; // Indica que no se encontró la entidad padre
  }
  const child = fetchEntityByIdFromLocal(childId); // Obtén la entidad hijo por su ID
  if (!child) {
    console.error(`Entidad hijo con ID ${childId} no encontrada.`);
    return false; // Indica que no se encontró la entidad hijo
  }
  entities[entityIndex][type].push(child.id); // Agrega la relación a la entidad padre
  localStorage.setItem('entities', JSON.stringify(entities)); // Guarda la lista actualizada en el localStorage
  console.log(`Relación añadida entre Entidad ${fatherId} y ${childId}.`);
  return true; // Indica que la operación fue exitosa
}

//deleteRelations
export const deleteRelationFromProductLocal = (fatherId, type, childId) => {
  const products = fetchProductsFromLocalStorage(); // Obtén todos los productos del localStorage
  const productIndex = products.findIndex((product) => product.id === Number(fatherId)); // Encuentra el índice del producto padre
  if (productIndex === -1) {
    console.error(`Producto con ID ${fatherId} no encontrado.`);
    return false; // Indica que no se encontró el producto padre
  }
  const childIndex = products[productIndex][type].indexOf(Number(childId)); // Encuentra el índice del hijo en el padre
  if (childIndex === -1) {
    console.error(`Hijo con ID ${childId} no encontrado en Producto ${fatherId}.`);
    return false; // Indica que no se encontró el hijo en el padre
  }
  products[productIndex][type].splice(childIndex, 1); // Elimina la relación del producto padre
  localStorage.setItem('products', JSON.stringify(products)); // Guarda la lista actualizada en el localStorage
  console.log(`Relación eliminada entre Producto ${fatherId} y ${childId}.`);
  return true; // Indica que la operación fue exitosa
}
export const deleteRelationFromEntityLocal = (fatherId, type, childId) => {
  const entities = fetchEntitiesFromLocalStorage(); // Obtén todas las entidades del localStorage
  const entityIndex = entities.findIndex((entity) => entity.id === Number(fatherId)); // Encuentra el índice de la entidad padre
  if (entityIndex === -1) {
    console.error(`Entidad con ID ${fatherId} no encontrada.`);
    return false; // Indica que no se encontró la entidad padre
  }
  const childIndex = entities[entityIndex][type].indexOf(Number(childId)); // Encuentra el índice del hijo en el padre
  if (childIndex === -1) {
    console.error(`Hijo con ID ${childId} no encontrado en Entidad ${fatherId}.`);
    return false; // Indica que no se encontró el hijo en el padre
  }
  entities[entityIndex][type].splice(childIndex, 1); // Elimina la relación de la entidad padre
  localStorage.setItem('entities', JSON.stringify(entities)); // Guarda la lista actualizada en el localStorage
  console.log(`Relación eliminada entre Entidad ${fatherId} y ${childId}.`);
  return true; // Indica que la operación fue exitosa
}

//update objects
export const updateProductInLocal = (id, updatedProduct) => {
  try {
    const products = fetchProductsFromLocalStorage();     // Obtén todos los productos del localStorage
    // Encuentra el índice del producto con el ID especificado
    const productIndex = products.findIndex((product) => product.id === Number(id));
    //console.log("updateProductInLocal", id, updatedProduct); // Verifica los datos obtenidos
    if (productIndex === -1) {
      console.error(`Producto con ID ${id} no encontrado.`);
      return false; // Indica que no se encontró el producto
    }

    // Actualiza los valores del producto en el índice encontrado
    products[productIndex] = {
      ...products[productIndex], // Mantén los valores existentes
      ...updatedProduct, // Sobrescribe con los valores actualizados
    };

    // Guarda la lista actualizada en el localStorage
    localStorage.setItem('products', JSON.stringify(products));

    //console.log(`Producto con ID ${id} actualizado en el localStorage.`, products[productIndex]);
    return true; // Indica que la operación fue exitosa
  } catch (error) {
    console.error(`Error al actualizar el producto con ID ${id} en el localStorage:`, error);
    return false; // Indica que ocurrió un error
  }
};
export const updatePersonInLocal = (id, updatedPerson) => {
  try {
    const persons = fetchPersonsFromLocalStorage(); // Obtén todas las personas del localStorage
    // Encuentra el índice de la persona con el ID especificado
    const personIndex = persons.findIndex((person) => person.id === Number(id));

    if (personIndex === -1) {
      console.error(`Persona con ID ${id} no encontrada.`);
      return false; // Indica que no se encontró la persona
    }
    persons[personIndex] = {
      ...persons[personIndex], // Mantén los valores existentes
      ...updatedPerson, // Sobrescribe con los valores actualizados
    };
    localStorage.setItem('persons', JSON.stringify(persons)); // Guarda la lista actualizada en el localStorage
    //console.log(`Persona con ID ${id} actualizada en el localStorage.`, persons[personIndex]);
    return true; // Indica que la operación fue exitosa
  } catch (error) {
    console.error(`Error al actualizar la persona con ID ${id} en el localStorage:`, error);
    return false; // Indica que ocurrió un error
  }
};
export const updateEntityInLocal = (id, updatedEntity) => {
  try {
    const entities = fetchEntitiesFromLocalStorage(); // Obtén todas las entidades del localStorage
    // Encuentra el índice de la entidad con el ID especificado
    const entityIndex = entities.findIndex((entity) => entity.id === Number(id));
    if (entityIndex === -1) {
      console.error(`Entidad con ID ${id} no encontrada.`);
      return false; // Indica que no se encontró la entidad
    }
    entities[entityIndex] = {
      ...entities[entityIndex], // Mantén los valores existentes
      ...updatedEntity, // Sobrescribe con los valores actualizados
    };
    localStorage.setItem('entities', JSON.stringify(entities)); // Guarda la lista actualizada en el localStorage
    //console.log(`Entidad con ID ${id} actualizada en el localStorage.`, entities[entityIndex]);
    return true; // Indica que la operación fue exitosa
  } catch (error) {
    console.error(`Error al actualizar la entidad con ID ${id} en el localStorage:`, error);
    return false; // Indica que ocurrió un error
  }
};

//Create objects
export const createNewPersonToLocal = (person) => {
  const persons = fetchPersonsFromLocalStorage(); // Obtén la lista actual de personas
  const newId = persons.length > 0 ? Math.max(...persons.map(p => p.id)) + 1 : 1; // Genera un nuevo ID
  const newPerson = new Persona({ ...person, id: newId}); // Crea una nueva instancia de Persona con el nuevo ID
  newPerson.setType('person'); // Configura el tipo como 'person'
  persons.push(newPerson); // Agrega la nueva persona a la lista
  localStorage.setItem('persons', JSON.stringify(persons)); // Guarda la lista actualizada en el local storage
  console.log("createNewPerson", newPerson); // Verifica la nueva persona creada
  return newPerson; // Devuelve la nueva persona creada
}
export const createNewEntityToLocal = (entity) => {
  const entities = fetchEntitiesFromLocalStorage(); // Obtén la lista actual de entidades
  const newId = entities.length > 0 ? Math.max(...entities.map(e => e.id)) + 1 : 1; // Genera un nuevo ID
  const newEntity = new Entidad({ ...entity, id: newId }); // Crea una nueva instancia de Entidad con el nuevo ID
  newEntity.setType('entity'); // Configura el tipo como 'entity'
  entities.push(newEntity); // Agrega la nueva entidad a la lista
  localStorage.setItem('entities', JSON.stringify(entities)); // Guarda la lista actualizada en el local storage
  return newEntity; // Devuelve la nueva entidad creada
}


