export default class User {
  constructor({id, userName, scope, token, expiresIn}) {
    this.id = id; // ID del usuario
    this.userName = userName;
    this.scope = scope; // Puede ser "reader" o "writer" o inactivo
    this.token = token; // Token de autenticación
    this.expiresIn = expiresIn; // Tiempo de expiración del token
  }
}