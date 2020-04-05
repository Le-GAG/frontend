import {Fields, Model} from '@vuex-orm/core';

export default class RoleModel extends Model
{
  static entity = 'directus_roles';

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
