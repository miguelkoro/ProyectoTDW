import Objeto from './Objeto.js';
export default class Persona extends Objeto {
  constructor({ id, name, birthDate, deathDate, imageUrl, wikiUrl }) {
    super({ id, name, birthDate, deathDate, imageUrl, wikiUrl });
  }
}