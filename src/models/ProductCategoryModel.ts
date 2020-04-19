import {Fields} from '@vuex-orm/core';
import AbstractModel from '@/models/AbstractModel';

export default class ProductCategoryModel extends AbstractModel
{
  static entity = 'categories_de_produits';

  static get collectionName()
  {
    return 'categories_de_produits';
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
      id:                   this.attr(null),
      active:               this.string(''),
      nom:                  this.string(''),
      slug:                 this.string(''),
      categorie_parente:    this.belongsTo(ProductCategoryModel, 'categorie_parente_id'),
      categorie_parente_id: this.attr(null),
    };
  }

  static fetchParams = {
    fields: ['*'],
    filter: {},
  };

  id!: number;
  active!: string;
  nom!: string;
  slug!: string;
  categorie_parente!: ProductCategoryModel;
  categorie_parente_id!: number;

}
