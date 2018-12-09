/**
 * @author nstCactus
 * @date 18/07/2018 13:13
 */

import AbstractDirectusModel from '@/models/AbstractDirectusModel';
import DirectusItemFactory from '@/factories/DirectusItemFactory';
import ProductCategoryModel, {ProductCategoryModelConstructorOptions} from '@/models/ProductCategoryModel';
import ProducerModel, {ProducerModelConstructorOptions} from '@/models/ProducerModel';
import DirectusMediaModel, {DirectusMediaModelConstructorOptions} from '@/models/DirectusMediaModel';
import ProductPriceModel, {ProductPriceModelConstructorOptions} from '@/models/ProductPriceModel';
import ProductTagModel, {ProductTagModelConstructorOptions} from '@/models/ProductTagModel';

interface ProductModelConstructorOptions
{
  id: number,
  nom: string;
  slug: string,

  categorie: ProductCategoryModel|ProductCategoryModelConstructorOptions;
  tags: {meta: any, data: {name: string, id: number}[]};

  producteur: ProducerModel|ProducerModelConstructorOptions;
  prix: {meta: any, data: ProductPriceModelConstructorOptions[]};
  photos: {
    meta: any[],
    data: DirectusMediaModelConstructorOptions[],
  };

  thumbnail: DirectusMediaModel|DirectusMediaModelConstructorOptions;
}

export default class ProductModel extends AbstractDirectusModel
{
  protected static readonly itemName: string = 'produits';

  id: number;
  name: string;
  slug: string;

  category: ProductCategoryModel;
  tags: ProductTagModel[];

  producer: ProducerModel;
  prices: ProductPriceModel[];
  photos: DirectusMediaModel[];

  thumbnail?: DirectusMediaModel;

  constructor(options: ProductModelConstructorOptions)
  {
    super();

    this.id        = options.id;
    this.name      = options.nom;
    this.slug      = options.slug;

    this.category  = ProductModel.instanciateCategory(options.categorie);
    this.tags      = ProductModel.instanciateTags(options.tags.data);

    this.producer  = ProductModel.instantiateProducer(options.producteur);
    this.prices    = ProductModel.instanciatePrices(options.prix.data);
    this.photos    = DirectusMediaModel.instanciatePhotos(options.photos.data);

    if (options.thumbnail) {
      this.thumbnail = ProductModel.instanciateThumbnail(options.thumbnail);
    }
  }

  private static instanciateCategory(category: ProductCategoryModel|ProductCategoryModelConstructorOptions): ProductCategoryModel
  {
    if (!(category instanceof ProductCategoryModel)) {
      category = new ProductCategoryModel(<ProductCategoryModelConstructorOptions>category);
    }
    return <ProductCategoryModel>category;
  }

  private static instanciateThumbnail(thumbnail: DirectusMediaModel|DirectusMediaModelConstructorOptions): DirectusMediaModel
  {
    if (!(thumbnail instanceof DirectusMediaModel)) {
      thumbnail = new DirectusMediaModel(<DirectusMediaModelConstructorOptions>thumbnail);
    }
    return <DirectusMediaModel>thumbnail;
  }

  private static instantiateProducer(producer: ProducerModel|ProducerModelConstructorOptions): ProducerModel
  {
    if (!(producer instanceof ProducerModel)) {
      producer = new ProducerModel(<ProducerModelConstructorOptions>producer);
    }
    return <ProducerModel>producer;
  }

  private static instanciatePrices(prices: ProductPriceModel[] | ProductCategoryModelConstructorOptions[]): ProductPriceModel[]
  {
    const instantiatedPrices:ProductPriceModel[] = [];

    for (let price of prices) {
      if (!(price instanceof ProductPriceModel)) {
        price = new ProductPriceModel(<ProductPriceModelConstructorOptions>price);
      }

      instantiatedPrices.push(<ProductPriceModel>price) ;
    }

    return instantiatedPrices;
  }

  private static instanciateTags(tags: ProductTagModel[] | ProductTagModelConstructorOptions[])
  {
    const instantiatedTags:ProductTagModel[] = [];

    for (let tag of tags) {
      if (!(tag instanceof ProductTagModel)) {
        instantiatedTags.push(new ProductTagModel(<ProductTagModelConstructorOptions>tag));
      }
    }

    return instantiatedTags;
  }

  static async getBySlug(slug: string): Promise<ProductModel>
  {
    const response = await ProductModel._findAll(ProductModel.itemName, {
      filters: {slug},
      limit:   1,
    });

    return DirectusItemFactory.instantiateSingleItem(ProductModel, response);
  }

  static async findAll(fetchParams?: {}): Promise<ProductModel[]>
  {
    const results = await AbstractDirectusModel._findAll(ProductModel.itemName, fetchParams);

    return DirectusItemFactory.instantiateCollection(ProductModel, results);
  }
}
