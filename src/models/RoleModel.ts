import {Fields} from '@vuex-orm/core';
import AbstractModel from '@/models/AbstractModel';

export default class RoleModel extends AbstractModel
{
  static entity = 'directus_roles';

  static get collectionName()
  {
    return 'directus_roles';
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
      id:                 this.attr(null),
      name:               this.string(''),
      description:        this.string(''),
      ip_whitelist:       this.attr([]),
      external_id:        this.number(null).nullable(),
      module_listing:     this.attr(null),
      collection_listing: this.attr(null),
      enforce_2fa:        this.boolean(false),
    };
  }

  id!: number;
  name!: string;
  description!: string;
  ip_whitelist!: any[];
  external_id!: number;
  module_listing!: any;
  collection_listing!: any;
  enforce_2fa!: boolean;
}
