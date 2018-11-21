import Vue from 'vue';
import {DirectusResponse, DirectusSdkFetchParams} from 'directus-sdk-javascript';

/**
 * @author nstCactus
 * @date 18/07/2018 13:15
 */

import Cache from '../helpers/CacheHelper';

export default class AbstractDirectusModel
{
  protected static readonly responseCache = new Cache<string, DirectusResponse>();

  protected static async _findAll(table: string, fetchParams?: DirectusSdkFetchParams): Promise<DirectusResponse>
  {
    const cacheKey = this.getCacheKey(table, fetchParams);
    let response = this.responseCache.get(cacheKey);

    if (response !== undefined) {
      return response;
    }

    response = await Vue.prototype.$directusSdk.getItems(table, fetchParams);

    this.responseCache.set(cacheKey, response!, 60);
    return response!;
  }

  protected static getCacheKey(table: string, fetchParams?: DirectusSdkFetchParams)
  {
    return table + '_' + JSON.stringify(fetchParams);
  }
}
