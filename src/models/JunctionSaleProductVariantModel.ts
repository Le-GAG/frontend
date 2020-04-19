import {Fields} from '@vuex-orm/core';
import AbstractModel from '@/models/AbstractModel';

export default class JunctionSaleProductVariantModel extends AbstractModel
{
  static entity = 'ventes_produits_variantes';
  static primaryKey = ['ventes_id', 'produits_variantes_id'];

  static get collectionName()
  {
    return 'ventes_produits_variantes';
  }

  static get defaultFetchParams()
  {
    return {
      fields: ['*'],
      filter: {},
    };
  }

  static fields(): Fields
  {
    return {
      id:                    this.number(null),
      ventes_id:             this.number(null),
      produits_variantes_id: this.number(null),
    };
  }

  id!: number;
  ventes_id!: number;
  produits_variantes_id!: number;
}
