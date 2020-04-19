import {Fields} from '@vuex-orm/core';
import AbstractModel from '@/models/AbstractModel';

export default class ProductTagModel extends AbstractModel
{
  static entity = 'tags_des_produits';

  static get collectionName()
  {
    return 'tags_des_produits';
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
      id:  this.attr(null),
      nom: this.string(''),
    };
  }

  id!: number;
  nom!: string;
}
