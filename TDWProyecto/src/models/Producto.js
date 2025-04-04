import Objeto from './Objeto.js';
export default class Producto extends Objeto {
    constructor({ id, name, birthDate, deathDate, imageUrl, wikiUrl, persons, entities }) {
      super({ id, name, birthDate, deathDate, imageUrl, wikiUrl });
      this.persons = persons || []; // IDs de personas relacionadas
      this.entities = entities || []; // IDs de entidades relacionadas
    }
}