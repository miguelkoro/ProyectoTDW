export const fetchPersons = async () => {
    const response = await fetch('/assets/mocks/persons.json'); // Cambiar a la URL de la API en el futuro
    if (!response.ok) {
      throw new Error('Error al cargar persons.json');
    }
    return response.json();
  };
  
  export const fetchEntities = async () => {
    const response = await fetch('/assets/mocks/entities.json');
    //console.log(response.json); // Depura el valor de objects
    if (!response.ok) {
      throw new Error('Error al cargar entities.json');
    }
    return response.json();
  };
  
  export const fetchProducts = async () => {
    const response = await fetch('/assets/mocks/products.json');
    if (!response.ok) {
      throw new Error('Error al cargar products.json');
    }
    return response.json();
  };