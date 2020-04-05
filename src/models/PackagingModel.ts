import {Fields, Model} from '@vuex-orm/core';
import {Response} from '@vuex-orm/plugin-axios';
import {querify} from '@/utils/qs';

export default class PackagingModel extends Model
{
  static entity = 'conditionnements';

  static fields(): Fields
  {
    return {
      id:  this.attr(null),
      nom: this.string(''),
    };
  }

  static fetchParams = {
    fields: ['*'],
    filter: {},
  };

  static async fetchOne(filters: any): Promise<Response>
  {
    const fetchParams = Object.assign({}, this.fetchParams);
    fetchParams.filter = Object.assign(fetchParams.filter, filters);

    const result = await this.api().get(`items/conditionnements?${querify(fetchParams)}`);
    return result.response.data.data;
  }

  static async fetchAll(filters?: any): Promise<Response>
  {
    const fetchParams = Object.assign({}, this.fetchParams);
    fetchParams.filter = Object.assign(fetchParams.filter, filters);

    const result = await this.api().get(`items/conditionnements?${querify(fetchParams)}`);
    return result.response.data.data;
  }

  id!: number;
  nom!: string;
}
