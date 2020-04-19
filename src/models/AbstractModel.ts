/**
 * @author nstCactus
 * @date 19/04/2020 18:02
 */
import {Model} from '@vuex-orm/core';
import {DirectusSdkFetchParams} from 'directus-sdk-javascript';
import {Response} from '@vuex-orm/plugin-axios';
import {querify} from '@/utils/qs';

export default class AbstractModel extends Model {
  static get collectionName(): string
  {
    throw new Error('The collectionName getter must be overriden');
  }

  static get defaultFetchParams(): DirectusSdkFetchParams
  {
    throw new Error('The defaultFetchParams getter must be overriden');
  }

  static async fetchAll(fetchParams: DirectusSdkFetchParams = {}): Promise<Response>
  {
    fetchParams = Object.assign({}, this.defaultFetchParams, fetchParams);

    const result = await this.api().get(`items/${this.collectionName}?${querify(fetchParams)}`);
    return result.response.data.data;
  }
}
