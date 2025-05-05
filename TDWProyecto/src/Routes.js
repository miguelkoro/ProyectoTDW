// Configuración base de la API
export const API_URL = 'http://localhost:8000'; // Cambia esto según tu configuración
export const BASE_PATH = '/api/v1/';

// Rutas específicas
export const ROUTES = {
  LOGIN: `${API_URL}/access_token`,
  USERS: `${API_URL}${BASE_PATH}users`,
  USERNAME_CHECK: (username) => `${API_URL}${BASE_PATH}users/username/${username}`,
  USER_BY_ID: (id) => `${API_URL}${BASE_PATH}users/${id}`,
  OBJECTS: (type) => `${API_URL}${BASE_PATH}${type}`,
  OBJECT_BY_ID: (type, id) => `${API_URL}${BASE_PATH}${type}/${id}`,
};