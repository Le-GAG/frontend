import {Fields} from '@vuex-orm/core';
import ProducerModel from '@/models/ProducerModel';
import UserModel from '@/models/UserModel';
import ProductCategoryModel from '@/models/ProductCategoryModel';
import {AxiosResponse} from 'axios';
import DirectusFileModel from '@/models/DirectusFileModel';
import JunctionProductPhotosModel from '@/models/JunctionProductPhotosModel';
import ProductTagModel from '@/models/ProductTagModel';
import JunctionProductTagModel from '@/models/JunctionProductTagModel';
import ProductVariantModel from '@/models/ProductVariantModel';
import AbstractModel from '@/models/AbstractModel';

export default class ProductModel extends AbstractModel
{
  static entity = 'produits';

  static get defaultFetchParams()
  {
    return {
      fields: [
        '*',
        'producteur.*',
        'categorie.*',
        'tags.tag_id.*',
        'variantes.*',
        'variantes.conditionnement.*',
        'variantes.unite_de_mesure.*',
        'photos.*.*',
      ],
      filter: {
        'variantes.prix':    {nnull: true},
        'categorie':         {nnull: true},
        'active':            'published',
        'producteur.active': 'published',
      },
    };
  }

  static get collectionName()
  {
    return 'produits';
  }

  static fields(): Fields
  {
    return {
      id:            this.attr(null),
      active:        this.string(''),
      nom:           this.string(''),
      slug:          this.string(''),
      description:   this.string(''),
      producteur:    this.belongsTo(ProducerModel, 'producteur_id'),
      producteur_id: this.attr(null),
      categorie:     this.belongsTo(ProductCategoryModel, 'categorie_id'),
      categorie_id:  this.attr(null),
      created_by:    this.belongsTo(UserModel, 'created_by_id'),
      created_by_id: this.attr(null),
      updated_by:    this.belongsTo(UserModel, 'update_by_id'),
      updated_by_id: this.attr(null),
      date_created:  this.attr(new Date()),
      date_updated:  this.attr(new Date()),
      variantes:     this.hasMany(ProductVariantModel, 'produit_id'),
      photos:        this.belongsToMany(
        DirectusFileModel,
        JunctionProductPhotosModel,
        'produit_id',
        'photo_id',
      ),

      tags: this.belongsToMany(
        ProductTagModel,
        JunctionProductTagModel,
        'produit_id',
        'tag_id',
      ),
    };
  }

  static apiConfig = {
    dataTransformer: (response: AxiosResponse) => {
      let data = response.data.data;

      if (data instanceof Array) {
        data = data.map(ProductModel.transformPhotos);
        data = data.map(ProductModel.transformTags);
      } else {
        data = ProductModel.transformPhotos(data);
        data = ProductModel.transformTags(data);
      }

      return data;
    },
  }

  protected static transformPhotos(product: any)
  {
    if ('photos' in product) {
      product.photos = product.photos.map((photo: any) => {
        return photo.photo;
      });
    }

    return product;
  }

  protected static transformTags(product: any)
  {
    if ('tags' in product) {
      product.tags = product.tags.map((tag: any) => {
        return tag.tag_id;
      });
    }

    return product;
  }

  id!: number;
  active!: string;
  nom!: string;
  slug!: string;
  description!: string;
  producteur!: ProducerModel;
  producteur_id!: number;
  categorie!: ProductCategoryModel;
  categorie_id!: number;
  created_by!: UserModel;
  created_by_id!: number;
  updated_by!: UserModel;
  updated_by_id!: number;
  date_created!: any;
  date_updated!: any;
  variantes!: ProductVariantModel[];
  photos!: DirectusFileModel[];
  tags!: ProductTagModel[];
}
