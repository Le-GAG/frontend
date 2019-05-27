/**
 * @author nstCactus
 * @date 2018-11-28 08:32
 */

interface SeoModelConstructorOptions
{
  SEO_description: string;
  SEO_titre: string;
  SEO_keywords: string;
}

export default class SeoModel
{
  public title: string;
  public description: string;
  protected keywords: string[];

  constructor(options: SeoModelConstructorOptions)
  {
    this.title = options.SEO_titre;
    this.description = options.SEO_description;
    this.keywords = options.SEO_keywords.split(',');
  }
}
