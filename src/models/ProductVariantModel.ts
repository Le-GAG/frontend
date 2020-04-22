import {Fields} from '@vuex-orm/core';
import ProductModel from '@/models/ProductModel';
import PackagingModel from '@/models/PackagingModel';
import MeasuringUnitModel from '@/models/MeasuringUnitModel';
import {Response} from '@vuex-orm/plugin-axios';
import AbstractModel from '@/models/AbstractModel';
import JunctionOrderProductVariantsModel from '@/models/JunctionOrderProductVariantsModel';

export default class ProductVariantModel extends AbstractModel
{
  static entity = 'produits_variantes';

  static get collectionName()
  {
    return 'produits_variantes';
  }

  static get defaultFetchParams()
  {
    return {
      fields: ['*', 'produit.*'],
      filter: {},
    };
  }

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

  static async fetchByIdWithProducts(ids: number[]): Promise<Response>
  {
    await this.fetchAll({ fields: ['*'], filter: { id: { in: ids } } });
    const productIds = this.findIn(ids).map((variant: ProductVariantModel) => variant.produit_id);
    return ProductModel.fetchAll({ filter: { id: { in: productIds } } });
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
  pivot: JunctionOrderProductVariantsModel|undefined;
}
