import {Fields} from '@vuex-orm/core';
import AbstractModel from '@/models/AbstractModel';

export default class JunctionProductPhotosModel extends AbstractModel
{
  static entity = '_produits_photos';
  static primaryKey = ['produit_id', 'photo_id'];

  static get collectionName()
  {
    return '_produits_photos';
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
      photo_id:   this.attr(null),
    };
  }

  id!: number;
  produit_id!: number;
  photo_id!: number;
}
