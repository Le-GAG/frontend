/**
 * @author nstCactus
 * @date 11/06/2018 13:43
 */

import AbstractApi from '@/api/abstractApi';
import { DirectusSdkFetchParams } from 'directus-sdk-javascript';

export default class ProductsApi extends AbstractApi {
  constructor () {
    super();

    this.itemName = 'produits';
  }
}
