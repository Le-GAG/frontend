import {Fields} from '@vuex-orm/core';
import AbstractModel from '@/models/AbstractModel';

export default class JunctionProducerActivityModel extends AbstractModel
{
  static entity = '_producteurs_activites';
  static primaryKey = ['producteur_id', 'activite_id']

  static fields(): Fields
  {
    return {
      id:            this.attr(null),
      producteur_id: this.attr(null),
      activite_id:   this.attr(null),
    };
  }

  static get collectionName()
  {
    return '_producteurs_activites';
  }

  static get defaultFetchParams()
  {
    return {
      fields: ['*'],
      filter: {},
    };
  }

  id!: number;
  producteur_id!: number;
  activite_id!: number;
}
