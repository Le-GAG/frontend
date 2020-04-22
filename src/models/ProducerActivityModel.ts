import {Fields} from '@vuex-orm/core';
import AbstractModel from '@/models/AbstractModel';

export default class ProducerActivityModel extends AbstractModel
{
  static entity = 'activites_des_producteurs';

  static get collectionName()
  {
    return 'activites_des_producteurs';
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
      nom: this.string(null),
    };
  }

  id!: number;
  nom!: string;
}
