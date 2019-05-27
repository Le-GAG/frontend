/**
 * @author nstCactus
 * @date 2018-12-09 13:59
 */
import UnitOfMeasurementModel, {UnitOfMeasurementModelConstructorOptions} from '@/models/UnitOfMeasurementModel';

export interface ProductPriceModelConstructorOptions {
  id: number,

  prix: string,
  prix_unitaire: string,

  contenance: string,
  conditionnement: {id: number, nom: string},
  produit: {id: number, active: 0|1, nom: string, [key:string]: any},
  unite_de_mesure: UnitOfMeasurementModelConstructorOptions,
}

export default class ProductPriceModel {
  id: number;

  conditionnement: string;
  unitOfMeasurement: UnitOfMeasurementModel;

  capacity: string;
  price: number;
  unitPrice: number;

  public constructor (options: ProductPriceModelConstructorOptions) {
    this.id = options.id;

    this.capacity          = options.contenance;
    this.conditionnement   = options.conditionnement.nom;
    this.unitOfMeasurement = new UnitOfMeasurementModel(options.unite_de_mesure);

    this.price = Number(options.prix);
    this.unitPrice = Number(options.prix_unitaire);
  }
}
