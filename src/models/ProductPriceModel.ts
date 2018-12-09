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
  conditionnement: {meta: any, data: {id: number, nom: string}},
  produit: {meta: any, data: {id: number, active: 0|1, nom: string, [key:string]: any}},
  unite_de_mesure: {meta: any, data: UnitOfMeasurementModelConstructorOptions},
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
    this.conditionnement   = options.conditionnement.data.nom;
    this.unitOfMeasurement = new UnitOfMeasurementModel(options.unite_de_mesure.data);

    this.price = Number(options.prix);
    this.unitPrice = Number(options.prix_unitaire);
  }
}
