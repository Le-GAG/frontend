/**
 * @author nstCactus
 * @date 2018-10-13 14:04
 */
import SeoModel from '@/models/SeoModel';
import AbstractDirectusModel from '@/models/AbstractDirectusModel';

export interface ProductCategoryModelConstructorOptions {
  id?: number,
  active?: boolean,
  nom?: string,
  slug?: string,
  SEO_description?: string,
  SEO_titre?: string,
  SEO_keywords?: string,
  categorie_parente?: ProductCategoryModelConstructorOptions,
}

export default class ProductCategoryModel extends AbstractDirectusModel {
  public id?: number;
  public name?: string;
  public slug?: string;

  public parentCategory?: ProductCategoryModel;
  public seo?: SeoModel;

  constructor(options: ProductCategoryModelConstructorOptions) {
    super();

    this.id   = options.id;
    this.name = options.nom;
    this.slug = options.slug;

    if (options.categorie_parente) {
      this.parentCategory = new ProductCategoryModel(options.categorie_parente);
    }

    this.seo = new SeoModel({
      SEO_titre:       options.SEO_titre || '',
      SEO_description: options.SEO_description || '',
      SEO_keywords:    options.SEO_keywords || '',
    });
  }
}
