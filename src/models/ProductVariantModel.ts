import {Fields, Model} from '@vuex-orm/core';
import ProductModel from '@/models/ProductModel';
import PackagingModel from '@/models/PackagingModel';
import MeasuringUnitModel from '@/models/MeasuringUnitModel';
import {Response} from '@vuex-orm/plugin-axios';
import {querify} from '@/utils/qs';
import {DirectusSdkFetchParams} from 'directus-sdk-javascript';

export default class ProductVariantModel extends Model
{
  static entity = 'produits_variantes';

  static fields(): Fields
  {
    return {
      id:                 this.attr(null),
      produit:            this.belongsTo(ProductModel, 'produit_id'),
      produit_id:         this.attr(null),
      prix:               this.number(0),
      conditionnement:    this.belongsTo(PackagingModel, 'conditionnement_id'),
      conditionnement_id: this.attr(null),
      contenance:         this.string(''),
      prix_de_base:       this.number(0),
      unite_de_mesure:    this.belongsTo(MeasuringUnitModel, 'unite_de_mesure_id'),
      unite_de_mesure_id: this.attr(null),
    };
  }

  static defaultFetchParams = {
    fields: [
      '*',
      'produit.*',
      // 'unite_de_mesure.*',
      // 'conditionnement.*',
    ],
    filter: {},
  };

  static async fetchAll(fetchParams: DirectusSdkFetchParams = {}): Promise<Response>
  {
    fetchParams = Object.assign({}, this.defaultFetchParams, fetchParams);

    const result = await ProductVariantModel.api().get(`items/produits_variantes?${querify(fetchParams)}`);
    return result.response.data.data;
  }

  static async fetchByIdWithProducts(ids: number[]): Promise<Response>
  {
    await this.fetchAll({ fields: ['*'], filter: { id: { in: ids } } });
    const productIds = ProductVariantModel.findIn(ids).map((variant: ProductVariantModel) => variant.produit_id);
    return ProductModel.fetchAll({ id: { in: productIds } });
  }

  static async fetchOne(fetchParams: DirectusSdkFetchParams = {}): Promise<Response>
  {
    fetchParams = Object.assign({}, this.defaultFetchParams, fetchParams);

    const result = await this.api().get(`items/produits_variantes?${querify(fetchParams)}`);
    return result.response.data.data;
  }


  id!: number;
  produit!: ProductModel;
  produit_id!: number;
  prix!: number;
  conditionnement!: PackagingModel;
  conditionnement_id!: number;
  contenance!: string;
  prix_de_base!: number;
  unite_de_mesure!: MeasuringUnitModel;
  unite_de_mesure_id!: number;
}
