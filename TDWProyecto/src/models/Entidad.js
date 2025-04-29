import Objeto from './Objeto.js';
export default class Entidad extends Objeto {
    constructor({ id, name, birthDate, deathDate, imageUrl, wikiUrl, persons, products, associations }) {
      super({ id, name, birthDate, deathDate, imageUrl, wikiUrl });
      this.persons = persons || []; // IDs de personas relacionadas
      this.products = products || []; // IDs de personas relacionadas
      this.associations = associations || []; // IDs de personas relacionadas
    }
}