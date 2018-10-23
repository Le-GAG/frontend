import Vue from 'vue';
import {DirectusSdkFetchParams} from 'directus-sdk-javascript';

interface DirectusResponse
{
  data: {}[],
  meta: {},
}

/**
 * @author nstCactus
 * @date 18/07/2018 13:15
 */
export default class AbstractDirectusModel {
  find (conditions:Array<any>) {}

  protected static async _findAll(table: string, fetchParams?: DirectusSdkFetchParams): Promise<DirectusResponse> {
    const result = await Vue.prototype.$directusSdk.getItems(table, fetchParams);

    // TODO: Implement caching
    return result;
  }
}
