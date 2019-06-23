/**
 * @author nstCactus
 * @date 2018-12-09 17:25
 */

export interface ProductTagModelConstructorOptions {
  id: number;
  nom: string;
}

export default class ProductTagModel {
  public id: number;
  public name: string;

  constructor(options: ProductTagModelConstructorOptions) {
    this.id = options.id;
    this.name = options.nom;
  }
}
