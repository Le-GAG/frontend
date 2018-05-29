/**
 * @author nstCactus
 * @date 30/01/2018 13:21
 */

import Vue from 'vue';
import moment from 'moment';

let producers     = new WeakMap();
let lastFetchDate = new WeakMap();

export default class ProducersApi {
  constructor () {
    producers.set(this, new Map());
    lastFetchDate.set(this, moment('1970-01-01'));
  }

  async fetchProducers () {
    const result = await Vue.prototype.$directusSdk.getItems('producteurs');

    for (const producer of result.data) {
      producers.get(this).set(producer.id, producer);
    }

    lastFetchDate.set(this, moment());
  }

  async getById (id) {
    if (!producers.get(this).has(id)) {
      await this.fetchProducers();

      return producers.get(this).get(id);
    }

    return producers.get(this).get(id);
  }

  async getProducers () {
    const lastFetched = lastFetchDate.get(this);
    const aMinuteAgo  = moment().subtract(1, 'minute');

    if (
      1 > producers.get(this).size
      || lastFetched.isBefore(aMinuteAgo)
    ) {
      await this.fetchProducers();
    }

    return producers.get(this);
  }
}
