/**
 * @author nstCactus
 * @date 30/01/2018 13:21
 */

import Vue from 'vue';
import moment from 'moment';

let items     = new WeakMap();
let lastFetchDate = new WeakMap();

// FIXME: Get rid of moment.js in favor of plain old JS Date object
export default class AbstractApi {
  itemName = 'change me please';
  fetchParams: any | null = null;

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

  async getById (id:number) {
    if (!items.get(this).has(id)) {
      await this.fetch();

      return items.get(this).get(id);
    }

    return items.get(this).get(id);
  }

  async getBySlug (slug:string) {
    // FIXME: Implement this method
  }

  async getAll () {
    const lastFetched = lastFetchDate.get(this);
    const aMinuteAgo  = moment().subtract(1, 'minute');

    if (
      items.get(this).size < 1
      || lastFetched.isBefore(aMinuteAgo)
    ) {
      await this.fetch();
    }

    return items.get(this);
  }
}
