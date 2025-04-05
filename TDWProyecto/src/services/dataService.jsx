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
    return instance;
  });

  return persons;
};
  
export const fetchEntities = async () => {
  const response = await fetch('/assets/jsons/entities.json');
  //console.log(response.json); // Depura el valor de objects
  if (!response.ok) {
    throw new Error('Error al cargar entities.json');
  }
  const data = await response.json();
  return data.entities.map((entity) => new Entidad(entity)); // Crear instancias de Persona
};
  
export const fetchProducts = async () => {
  const response = await fetch('/assets/jsons/products.json');
  if (!response.ok) {
    throw new Error('Error al cargar products.json');
  }
  const data = await response.json();
  return data.products.map((product) => new Producto(product)); // Crear instancias de Persona
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