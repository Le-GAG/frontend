import {Fields} from '@vuex-orm/core';
import {AxiosResponse} from 'axios';
import ProductVariantModel from '@/models/ProductVariantModel';
import JunctionSaleProductVariantModel from '@/models/JunctionSaleProductVariantModel';
import AbstractModel from '@/models/AbstractModel';

export default class SaleModel extends AbstractModel
{
  static entity = 'ventes';
  static get collectionName()
  {
    return 'ventes';
  }

  static get defaultFetchParams()
  {
    return {
      fields: ['*', 'produits.*.*'], // FIXME: Decide whether to fetch related products with sales
      filter: {},
    };
  }

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
