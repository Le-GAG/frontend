import {Fields} from '@vuex-orm/core';
import AbstractModel from '@/models/AbstractModel';

export default class PackagingModel extends AbstractModel
{
  static entity = 'conditionnements';

  static get collectionName()
  {
    return 'conditionnements';
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
