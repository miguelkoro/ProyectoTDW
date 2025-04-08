import Persona from '../models/Persona.js'; 
import Entidad from '../models/Entidad.js'; 
import Producto from '../models/Producto.js'; 

export const fetchPersons = async () => {
  const response = await fetch('/assets/jsons/persons.json');
  if (!response.ok) {
    throw new Error('Error al cargar persons.json');
  }
  const data = await response.json();

  // Transforma los datos en instancias de Persona
  const persons = data.persons.map((person) => {
    const instance = new Persona(person); // Crea una instancia de Persona
    //console.log('Instancia de Persona creada:', instance); // Depuración
    //console.log(instance.getType()); // Debería imprimir "Persona"
    instance.setType('person');
    return instance;
  });

  return persons;
};
  
export const fetchEntities = async () => {
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

  return entities;
};

export const fetchProducts = async () => {
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

  return products;
};

export const deletePerson = async (id) => {
  // eliminación local
  console.log(`Eliminando persona con ID: ${id}`);
  try {
    // Actualiza el estado local eliminando la persona con el ID correspondiente
    //setPersons((prevPersons) => prevPersons.filter((person) => person.id !== id));
    return id; // Devuelve el ID eliminado
  } catch (error) {
    console.error('Error al eliminar la persona:', error);
    return error;
  }
};