import {Fields, Model} from '@vuex-orm/core';
import ProductTagModel from '@/models/ProductTagModel';
import ProducerModel from '@/models/ProducerModel';

export default class JunctionProductPhotosModel extends Model
{
  static entity = '_produits_photos';

  static primaryKey = ['produit_id', 'photo_id'];

  static fields(): Fields
  {
    return {
      id:         this.number(null),
      produit_id: this.attr(null),
      photo_id:   this.attr(null),
    };
  }
}
