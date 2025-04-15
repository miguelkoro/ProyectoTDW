import Persona from '../models/Persona.js'; 
import Entidad from '../models/Entidad.js'; 
import Producto from '../models/Producto.js'; 

//Volcado de datos de JSON a local storage
export const fetchJSONPersons = async () => {
  const response = await fetch('/assets/jsons/persons.json');
  if (!response.ok) {
    throw new Error('Error al cargar persons.json');
  }
  const data = await response.json();

  // Transforma los datos en instancias de Persona
  const persons = data.persons.map((person) => {
    const instance = new Persona(person); // Crea una instancia de Persona
    instance.setType('person');
    return instance;
  });
  localStorage.setItem('persons', JSON.stringify(persons)); // Guardar los datos en el local storage
  return persons;
};
export const fetchJSONEntities = async () => {
  const response = await fetch('/assets/jsons/entities.json');
  if (!response.ok) {
    throw new Error('Error al cargar entities.json');
  }
  const data = await response.json();

  // Transforma los datos en instancias de Entidad
  const entities = data.entities.map((entity) => {
    const instance = new Entidad(entity); // Crea una instancia de Entidad
    instance.setType('entity'); // Configura el tipo como 'entity'
    
    return instance;
  });
  localStorage.setItem('entities', JSON.stringify(entities)); // Guardar los datos en el local storage
  return entities;
};
export const fetchJSONProducts = async () => {
  const response = await fetch('/assets/jsons/products.json');
  if (!response.ok) {
    throw new Error('Error al cargar products.json');
  }
  const data = await response.json();

  // Transforma los datos en instancias de Producto
  const products = data.products.map((product) => {
    const instance = new Producto(product); // Crea una instancia de Producto
    instance.setType('product'); // Configura el tipo como 'product'
    return instance;
  });
  localStorage.setItem('products', JSON.stringify(products)); // Guardar los datos en el local storage
  return products;
};

//getObjects from local storage
export const fetchPersonsFromLocalStorage = () => {
  const storedPersons = localStorage.getItem('persons');
  if (storedPersons) {
    try {
      const parsedPersons = JSON.parse(storedPersons);
      const persons = parsedPersons.map((person) => {
        const instance = new Persona(person); // Crea una instancia de Persona
        instance.setType('person'); // Restaura el tipo como 'person'
        return instance;
      });
      //console.log("fetchPersonsFromLocalStorage", persons); // Verifica los datos obtenidos
      return persons;
    } catch (error) {
      console.error('Error al parsear los datos de localStorage:', error);
      return [];
    }
  }
  return []; // Devuelve un array vacío si no hay datos en localStorage
};
export const fetchEntitiesFromLocalStorage = () => {
  const storedEntities = localStorage.getItem('entities');
  if (storedEntities) {
    try {
      const parsedEntities = JSON.parse(storedEntities);
      const entities = parsedEntities.map((entity) => {
        const instance = new Entidad(entity); // Crea una instancia de Entidad
        instance.setType('entity'); // Restaura el tipo como 'entity'
        return instance;
      });
      //console.log("fetchEntitiesFromLocalStorage", entities); // Verifica los datos obtenidos
      return entities;
    } catch (error) {
      console.error('Error al parsear los datos de localStorage:', error);
      return [];
    }
  }
  return []; // Devuelve un array vacío si no hay datos en el local storage
};
export const fetchProductsFromLocalStorage = () => {
  const storedProducts = localStorage.getItem('products');
  if (storedProducts) {
    try {
      const parsedProducts = JSON.parse(storedProducts);
      const products = parsedProducts.map((product) => {
        const instance = new Producto(product); // Crea una instancia de Producto
        instance.setType('product'); // Restaura el tipo como 'product'
        return instance;
      });
      //console.log("fetchProductsFromLocalStorage", products); // Verifica los datos obtenidos
      return products;
    } catch (error) {
      console.error('Error al parsear los datos de localStorage:', error);
      return [];
    }
  }
  return []; // Devuelve un array vacío si no hay datos en el local storage
};

//getObject by id from local storage
export const fetchPersonByIdFromLocal = (id) => {
  const persons = fetchPersonsFromLocalStorage();
  console.log("fetchPersonByIdFromLocal", id, persons); // Verifica los datos obtenidos
  const person = persons.find((person) => person.id === Number(id));
  return person; // Devuelve la persona encontrada o undefined si no existe
};
export const fetchEntityByIdFromLocal = (id) => {
  const entities = fetchEntitiesFromLocalStorage();
  const entity = entities.find((entity) => entity.id === Number(id));
  return entity; // Devuelve la entidad encontrada o undefined si no existe
}
export const fetchProductByIdFromLocal = (id) => {
  const products = fetchProductsFromLocalStorage();
  const product = products.find((product) => product.id === Number(id));
  return product; // Devuelve el producto encontrado o undefined si no existe
}

//Delete objects
export const deletePersonFromLocal = (id) => {
  try {
    // Obtén todas las personas del localStorage
    const persons = fetchPersonsFromLocalStorage();
    // Filtra las personas para excluir la que tiene el ID especificado
    const updatedPersons = persons.filter((person) => person.id !== Number(id));
    // Guarda la lista actualizada en el localStorage
    localStorage.setItem('persons', JSON.stringify(updatedPersons));

    console.log(`Persona con ID ${id} eliminada del localStorage.`);
    return true; // Indica que la operación fue exitosa
  } catch (error) {
    console.error(`Error al eliminar la persona con ID ${id} del localStorage:`, error);
    return false; // Indica que ocurrió un error
  }
}
export const deleteEntityFromLocal = (id) => {
  try {
    // Obtén todas las entidades del localStorage
    const entities = fetchEntitiesFromLocalStorage();
    // Filtra las entidades para excluir la que tiene el ID especificado
    const updatedEntities = entities.filter((entity) => entity.id !== Number(id));
    // Guarda la lista actualizada en el localStorage
    localStorage.setItem('entities', JSON.stringify(updatedEntities));

    console.log(`Entidad con ID ${id} eliminada del localStorage.`);
    return true; // Indica que la operación fue exitosa
  } catch (error) {
    console.error(`Error al eliminar la entidad con ID ${id} del localStorage:`, error);
    return false; // Indica que ocurrió un error
  }
}
export const deleteProductFromLocal = (id) => {
  try {
    // Obtén todos los productos del localStorage
    const products = fetchProductsFromLocalStorage();
    // Filtra los productos para excluir el que tiene el ID especificado
    const updatedProducts = products.filter((product) => product.id !== Number(id));
    // Guarda la lista actualizada en el localStorage
    localStorage.setItem('products', JSON.stringify(updatedProducts));

    console.log(`Producto con ID ${id} eliminado del localStorage.`);
    return true; // Indica que la operación fue exitosa
  } catch (error) {
    console.error(`Error al eliminar el producto con ID ${id} del localStorage:`, error);
    return false; // Indica que ocurrió un error
  }
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
    console.log("updateProductInLocal", id, updatedProduct); // Verifica los datos obtenidos
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

    console.log(`Producto con ID ${id} actualizado en el localStorage.`, products[productIndex]);
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
    console.log(`Persona con ID ${id} actualizada en el localStorage.`, persons[personIndex]);
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
    console.log(`Entidad con ID ${id} actualizada en el localStorage.`, entities[entityIndex]);
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
export const createNewProductToLocal = (product) => {
  const products = fetchProductsFromLocalStorage(); // Obtén la lista actual de productos
  const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1; // Genera un nuevo ID
  const newProduct = new Producto({ ...product, id: newId }); // Crea una nueva instancia de Producto con el nuevo ID
  newProduct.setType('product'); // Configura el tipo como 'product'
  products.push(newProduct); // Agrega el nuevo producto a la lista
  localStorage.setItem('products', JSON.stringify(products)); // Guarda la lista actualizada en el local storage
  return newProduct; // Devuelve el nuevo producto creado
}

