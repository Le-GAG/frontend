import {Fields} from '@vuex-orm/core';
import RoleModel from '@/models/RoleModel';
import AbstractModel from '@/models/AbstractModel';

export default class UserModel extends AbstractModel
{
  static entity = 'directus_users';

  static get collectionName()
  {
    return 'directus_users';
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
      id:                   this.attr(null),
      status:               this.string(null),
      role_id:              this.attr(null),
      role:                 this.belongsTo(RoleModel, 'role_id'),
      first_name:           this.string(''),
      last_name:            this.string(''),
      email:                this.string(''),
      token:                this.string(null),
      last_access_on:       this.string(null),
      last_page:            this.string(null),
      theme:                this.string(null),
      "2fa_secret":         this.string(null),
      password_reset_token: this.string(null),
      timezone:             this.string(null),
      locale:               this.string(null),
      locale_options:       this.attr(null),
      avatar:               this.string(null),
      company:              this.string(null),
      title:                this.string(null),
      email_notifications:  this.boolean(true),
    };
  }

  static me()
  {
    return UserModel.api().get('/users/me?fields=*,role.*');
  }

  id!: number;
  status!: string;
  role_id!: number;
  role!: RoleModel;
  first_name!: string;
  last_name!: string;
  email!: string;
  token!: string;
  last_access_on!: any;
  last_page!: string;
  theme!: string;
  "2fa_secret"!: string;
  password_reset_token!: string;
  timezone!: string;
  locale!: string;
  locale_options!: any;
  avatar!: any;
  company!: string;
  title!: string;
  email_notifications!: boolean;
}
