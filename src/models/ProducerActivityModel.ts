/**
 * @author nstCactus
 * @date 2018-10-13 14:04
 */

export interface ProducerActivityConstructorOptions {
  id: number,
  nom: string,
}

export default class ProducerActivityModel {
  id: number;
  nom: string;

  constructor(options: ProducerActivityConstructorOptions) {
    this.nom = options.nom;
    this.id = options.id;
  }
}
