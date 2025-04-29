import Objeto from './Objeto.js';
export default class Asociacion extends Objeto {
    constructor({ id, name, birthDate, deathDate, imageUrl, wikiUrl, entities }) {
      super({ id, name, birthDate, deathDate, imageUrl, wikiUrl });
      this.entities = entities || []; // IDs de entidades relacionadas
    }
}