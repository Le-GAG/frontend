import {Fields} from '@vuex-orm/core';
import AbstractModel from '@/models/AbstractModel';

export default class JunctionOrderProductVariantsModel extends AbstractModel
{
  static entity     = '_commandes_produits_variantes';
  static primaryKey = ['produits_variantes_id', 'commandes_id'];

  static get collectionName()
  {
    return '_commandes_produits_variantes';
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
      id:                    this.attr(null),
      produits_variantes_id: this.attr(null),
      commandes_id:          this.attr(null),
      prix:                  this.number(null),
      quantite:              this.number(null),
    };
  }

  id!: number;
  produits_variantes_id!: number;
  commandes_id!: number;
  quantite!: number;
  prix!: number;
}
