export const fetchPersons = async () => {
    const response = await fetch('/mocks/persons.json'); // Cambiar a la URL de la API en el futuro
    return response.json();
  };
  
  export const fetchEntities = async () => {
    const response = await fetch('/mocks/entities.json');
    //console.log(response.json); // Depura el valor de objects
    return response.json();
  };
  
  export const fetchProducts = async () => {
    const response = await fetch('/mocks/products.json');
    return response.json();
  };