export default class Objeto {
    constructor({ id, name, birthDate, deathDate, imageUrl, wikiUrl }) {
      this.id = id;
      this.name = name;
      this.birthDate = birthDate;
      this.deathDate = deathDate;
      this.imageUrl = imageUrl;
      this.wikiUrl = wikiUrl;
      this.type = null; // Inicializa el tipo como null      
      this.etag = null;
    }
    setType(type) {
      this.type = type;
    }
    setEtag(etag) {
      this.etag = etag;
    }

  }