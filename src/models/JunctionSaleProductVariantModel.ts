import {Fields, Model} from '@vuex-orm/core';

export default class JunctionSaleProductVariantModel extends Model
{
  static entity = 'ventes_produits_variantes';

  static primaryKey = ['ventes_id', 'produits_variantes_id'];

  static fields(): Fields
  {
    return {
      id:                    this.number(null),
      ventes_id:             this.attr(null),
      produits_variantes_id: this.attr(null),
    };
  }
}
