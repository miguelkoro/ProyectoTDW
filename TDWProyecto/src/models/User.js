export default class User {
  constructor({id, userName, scope, token, expiresIn}) {
    this.id = id; // ID del usuario
    this.userName = userName;
    this.scope = scope; // Puede ser "reader" o "writer" o inactivo
    this.token = token; // Token de autenticación
    this.expiresIn = expiresIn; // Tiempo de expiración del token
    this.etag = null; // ETag del usuario (opcional)
    this.email= null; // Correo electrónico del usuario (opcional)
    this.birthDate = null; // Fecha de nacimiento del usuario (opcional)
    this.name = null; // Nombre del usuario (opcional)
  }

  setEtag(etag) {
    this.etag = etag; // Establece el ETag del usuario
  }

  setEmail(email) {
    this.email = email; // Establece el correo electrónico del usuario
  }

  setBirthDate(birthDate) {
    this.birthDate = birthDate; // Establece la fecha de nacimiento del usuario
  }

  setName(name) {
    this.name = name; // Establece el nombre del usuario
  }
}