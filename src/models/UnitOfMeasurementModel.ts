/**
 * @author nstCactus
 * @date 2018-12-09 15:15
 */

export interface UnitOfMeasurementModelConstructorOptions {
  sans_unite: 0 | 1;
  nom: string;
}

export default class UnitOfMeasurementModel {
  public name: string;
  public isUnitless: boolean;

  constructor(options: UnitOfMeasurementModelConstructorOptions) {
    this.name = options.nom;
    this.isUnitless = Boolean(options.sans_unite);
  }
}
