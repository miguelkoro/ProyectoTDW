export default class Objeto {
    constructor({ id, name, birthDate, deathDate, imageUrl, wikiUrl }) {
      this.id = id;
      this.name = name;
      this.birthDate = birthDate;
      this.deathDate = deathDate;
      this.imageUrl = imageUrl;
      this.wikiUrl = wikiUrl;
    }

      // Método para obtener el tipo del objeto
    getType() {
      return this.constructor.name; // Devuelve el nombre de la clase
    }
  }