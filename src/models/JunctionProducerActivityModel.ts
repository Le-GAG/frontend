import {Fields, Model} from '@vuex-orm/core';

export default class JunctionProducerActivityModel extends Model
{
  static entity = '_producteurs_activites';

  static primaryKey = ['producteur_id', 'activite_id']

  static fields(): Fields
  {
    return {
      id:            this.number(null),
      producteur_id: this.attr(null),
      activite_id:   this.attr(null),
    };
  }
}
