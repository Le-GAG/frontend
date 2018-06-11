/**
 * @author nstCactus
 * @date 30/01/2018 13:21
 */

import Vue from 'vue';
import moment from 'moment';

let items     = new WeakMap();
let lastFetchDate = new WeakMap();

export default class AbstractApi {
  itemName = 'change me please';
  fetchParams = null;

  constructor () {
    items.set(this, new Map());
    lastFetchDate.set(this, moment('1970-01-01'));
  }

  async fetch () {
    const result = await Vue.prototype.$directusSdk.getItems(this.itemName, this.fetchParams);

    for (const item of result.data) {
      items.get(this).set(item.id, item);
    }

    lastFetchDate.set(this, moment());
  }

  async getById (id) {
    if (!items.get(this).has(id)) {
      await this.fetch();

      return items.get(this).get(id);
    }

    return items.get(this).get(id);
  }

  async getAll () {
    const lastFetched = lastFetchDate.get(this);
    const aMinuteAgo  = moment().subtract(1, 'minute');

    if (
      1 > items.get(this).size
      || lastFetched.isBefore(aMinuteAgo)
    ) {
      await this.fetch();
    }

    return items.get(this);
  }
}
