import {Fields, Model} from '@vuex-orm/core';
import ProductTagModel from '@/models/ProductTagModel';
import ProducerModel from '@/models/ProducerModel';

export default class JunctionProductTagModel extends Model
{
  static entity = '_produits_tags';

  static primaryKey = ['produit_id', 'tag_id'];

  static fields(): Fields
  {
    return {
      id:         this.number(null),
      produit_id: this.attr(null),
      tag_id:     this.attr(null),
    };
  }
}
