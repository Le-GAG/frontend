/**
 * @author nstCactus
 * @date 22/07/2019 08:47
 */

import AbstractDirectusModel from '@/models/AbstractDirectusModel';
import DirectusItemFactory from '@/factories/DirectusItemFactory';

export interface SaleModelConstructorOptions
{
  id: number,
  date_ouverture: string,
  date_cloture: string,
}

export default class SaleModel extends AbstractDirectusModel
{
  protected static readonly itemName: string = 'ventes';

  id: number;
  openingDate: Date;
  closureDate: Date;

  constructor(options: SaleModelConstructorOptions)
  {
    super();

    this.id = options.id;
    this.openingDate = new Date(options.date_ouverture);
    this.closureDate = new Date(options.date_cloture);
  }

  static async findAll(fetchParams?: {}): Promise<SaleModel[]>
  {
    const results = await AbstractDirectusModel._findAll(SaleModel.itemName, fetchParams);

    return DirectusItemFactory.instantiateCollection(SaleModel, results);
  }
}
