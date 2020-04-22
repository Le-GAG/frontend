import {Fields} from '@vuex-orm/core';
import {AxiosResponse} from 'axios';
import ProductVariantModel from '@/models/ProductVariantModel';
import AbstractModel from '@/models/AbstractModel';
import UserModel from '@/models/UserModel';
import SaleModel from '@/models/SaleModel';
import JunctionOrderProductVariantsTagModel from '@/models/JunctionOrderProductVariantsModel';
import JunctionOrderProductVariantsModel from '@/models/JunctionOrderProductVariantsModel';

export default class OrderModel extends AbstractModel
{
  static entity = 'commandes';
  static get collectionName()
  {
    return 'commandes';
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
      statut:             this.attr(null),
      created_by:         this.belongsTo(UserModel, 'created_by_id'),
      created_by_id:      this.attr(null),
      modified_by:        this.belongsTo(UserModel, 'modified_by_id'),
      modified_by_id:     this.attr(null),
      created_on:         this.attr(new Date()),
      updated_on:         this.attr(new Date()),
      vente:              this.belongsTo(SaleModel, 'vente_id'),
      vente_id:           this.attr(null),
      produits_variantes: this.belongsToMany(
        ProductVariantModel,
        JunctionOrderProductVariantsTagModel,
        'commandes_id',
        'produits_variantes_id',
      ),
    };
  }

  static apiConfig = {
    dataTransformer: (response: AxiosResponse) => {
      let data = response.data.data;
      return data;
    },
  }

  public static postItem(order: OrderModel)
  {
    return this.api().post(`items/${this.collectionName}`, {
      vente:              order.vente_id,
      statut:             order.statut,
      produits_variantes: order.produits_variantes.map((variant) => {
        variant.pivot = variant.pivot || ({} as JunctionOrderProductVariantsModel);
        return {
          produits_variantes_id: { id: variant.id },
          prix:                  variant.pivot.prix,
          quantite:              variant.pivot.quantite,
        };
      }),
    });
  }

  id!: number;
  statut!: string;
  created_by!: UserModel;
  created_by_id!: number;
  modified_by!: UserModel;
  modified_by_id!: number;
  created_on!: string;
  updated_on!: string;
  vente!: SaleModel;
  vente_id!: number;
  produits_variantes!: ProductVariantModel[];
}
