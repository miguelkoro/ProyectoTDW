import Persona from '../models/Persona.js'; // Asegúrate de que la ruta sea correcta
import Entidad from '../models/Entidad.js'; // Asegúrate de que la ruta sea correcta
import Producto from '../models/Producto.js'; // Asegúrate de que la ruta sea correcta

export const fetchPersons = async () => {
    const response = await fetch('/assets/jsons/persons.json');
    console.log(response.json);
    if (!response.ok) {
      throw new Error('Error al cargar persons.json');
    }
    const data = await response.json();
    return data.persons.map((person) => new Persona(person)); // Crear instancias de Persona
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