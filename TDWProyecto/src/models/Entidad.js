import Objeto from './Objeto.js';
export default class Entidad extends Objeto {
    constructor({ id, name, birthDate, deathDate, imageUrl, wikiUrl, persons }) {
      super({ id, name, birthDate, deathDate, imageUrl, wikiUrl });
      this.persons = persons || []; // IDs de personas relacionadas
    }
}