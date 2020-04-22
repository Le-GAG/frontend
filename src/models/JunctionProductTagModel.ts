import {Fields} from '@vuex-orm/core';
import AbstractModel from '@/models/AbstractModel';

export default class JunctionProductTagModel extends AbstractModel
{
  static entity     = '_produits_tags';
  static primaryKey = ['produit_id', 'tag_id'];

  static get collectionName()
  {
    return '_produits_tags';
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
      id:         this.attr(null),
      produit_id: this.attr(null),
      tag_id:     this.attr(null),
    };
  }

  id!: number;
  produit_id!: number;
  tag_id!: number;
}
