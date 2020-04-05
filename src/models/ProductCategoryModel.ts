import {Fields, Model} from '@vuex-orm/core';
import {Response} from '@vuex-orm/plugin-axios';
import {querify} from '@/utils/qs';

export default class ProductCategoryModel extends Model
{
  static entity = 'categories_de_produits';

  static fields(): Fields
  {
    return {
      id:                   this.attr(null),
      active:               this.string(''),
      nom:                  this.string(''),
      slug:                 this.string(''),
      categorie_parente:    this.belongsTo(ProductCategoryModel, 'categorie_parente_id'),
      categorie_parente_id: this.attr(null),
    };
  }

  static fetchParams = {
    fields: ['*'],
    filter: {},
  };

  static async fetchOne(filters: any): Promise<Response>
  {
    const fetchParams = Object.assign({}, this.fetchParams);
    fetchParams.filter = Object.assign(fetchParams.filter, filters);

    const result = await this.api().get(`items/categories_de_produits?${querify(fetchParams)}`);
    return result.response.data.data;
  }

  static async fetchAll(filters?: any): Promise<Response>
  {
    const fetchParams = Object.assign({}, this.fetchParams);
    fetchParams.filter = Object.assign(fetchParams.filter, filters);

    const result = await this.api().get(`items/categories_de_produits?${querify(fetchParams)}`);
    return result.response.data.data;
  }

  id!: number;
  active!: string;
  nom!: string;
  slug!: string;
  categorie_parente!: ProductCategoryModel;
  categorie_parente_id!: number;

}
