// Configuración base de la API
export const API_URL = 'http://localhost:8000';
export const BASE_PATH = '/api/v1/';

// Rutas específicas
export const ROUTES = {
  LOGIN: `${API_URL}/access_token`,
  USERS: `${API_URL}${BASE_PATH}users`,
  CREATE_USER: `${API_URL}${BASE_PATH}users`,
  UPDATE_USER: (id) => `${API_URL}${BASE_PATH}users/${id}`,
  DELETE_USER: (id) => `${API_URL}${BASE_PATH}users/${id}`,
  USERNAME_CHECK: (username) => `${API_URL}${BASE_PATH}users/username/${username}`,
  USER_BY_ID: (id) => `${API_URL}${BASE_PATH}users/${id}`,
  OBJECTS: (type) => `${API_URL}${BASE_PATH}${type}`,
  OBJECT_BY_ID: (type, id) => `${API_URL}${BASE_PATH}${type}/${id}`,
  CREATE_OBJECT: (type) => `${API_URL}${BASE_PATH}${type}`,
  UPDATE_OBJECT: (type, id) => `${API_URL}${BASE_PATH}${type}/${id}`,
  DELETE_OBJECT: (type, id) => `${API_URL}${BASE_PATH}${type}/${id}`,
  ADD_REMOVE_RELATION: (type, id, relationType, action, relationId) => `${API_URL}${BASE_PATH}${type}/${id}/${relationType}/${action}/${relationId}`,
};