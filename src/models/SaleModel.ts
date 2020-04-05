import {Fields, Model} from '@vuex-orm/core';
import {Response} from '@vuex-orm/plugin-axios';
import {AxiosResponse} from 'axios';
import {querify} from '@/utils/qs';
import ProductVariantModel from '@/models/ProductVariantModel';
import JunctionSaleProductVariantModel from '@/models/JunctionSaleProductVariantModel';

export default class SaleModel extends Model
{
  static entity = 'ventes';

  static fields(): Fields
  {
    return {
      id:             this.attr(null),
      date_ouverture: this.attr(null),
      date_cloture:   this.attr(null),
      produits:       this.belongsToMany(
        ProductVariantModel,
        JunctionSaleProductVariantModel,
        'ventes_id',
        'produits_variantes_id',
      ),
    };
  }

  static apiConfig = {
    dataTransformer: (response: AxiosResponse) => {
      let data = response.data.data;
      if (data instanceof Array) {
        data = data.map(SaleModel.transformProducts);
      } else {
        data = SaleModel.transformProducts(data);
      }

      return data;
    },
  }

  static fetchParams = {
    fields: [
      '*',
      'produits.*.*',
    ],
    filter: {},
  };

  static async fetchAll(filters?: any): Promise<Response>
  {
    const fetchParams  = Object.assign({}, SaleModel.fetchParams);
    fetchParams.filter = Object.assign(fetchParams.filter, filters);

    const result = await SaleModel.api().get(`items/ventes?${querify(fetchParams)}`);
    return result.response.data.data;
  }

  static async fetchOne(filters: any): Promise<Response>
  {
    const fetchParams  = Object.assign({}, SaleModel.fetchParams);
    fetchParams.filter = Object.assign(fetchParams.filter, filters);

    const result = await SaleModel.api().get(`items/produits_variantes?${querify(fetchParams)}`);
    return result.response.data.data;
  }

  protected static transformProducts(sale: any)
  {
    if ('produits' in sale) {
      sale.produits = sale.produits.map((productVariant: any) => {
        if (typeof productVariant.produits_variantes_id === 'number') {
          return {id: productVariant.produits_variantes_id};
        }

        return productVariant.produits_variantes_id;
      });
    }

    return sale;
  }

  id!: number;
  date_ouverture!: any;
  date_cloture!: any;
  produits!: ProductVariantModel[];
}
