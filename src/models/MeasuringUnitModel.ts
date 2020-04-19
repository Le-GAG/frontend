import {Fields} from '@vuex-orm/core';
import AbstractModel from '@/models/AbstractModel';

export default class MeasuringUnitModel extends AbstractModel
{
  static entity = 'unites';

  static get collectionName()
  {
    return 'unites';
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
      id:            this.attr(null),
      nom:           this.string(''),
      sans_quantite: this.boolean(false),
    };
  }

  id!: number;
  nom!: string;
  sans_quantite!: boolean;
}
