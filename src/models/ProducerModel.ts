/**
 * @author nstCactus
 * @date 18/07/2018 13:13
 */

import AbstractDirectusModel from '@/models/AbstractDirectusModel';
import ProducerActivityModel, {ProducerActivityConstructorOptions} from '@/models/ProducerActivityModel';
import DirectusItemFactory from '@/factories/DirectusItemFactory';
import DirectusMediaModel, {DirectusMediaModelConstructorOptions} from '@/models/DirectusMediaModel';

interface DirectusMedia
{
  name: string,
  width: number,
  height: number,
}

export interface LatLng
{
  lat: number,
  lng: number,
}

export interface ProducerModelConstructorOptions
{
  id: number,
  slug: string,
  raison_sociale: string,
  siret: string,

  email: string,
  site_internet: string,
  numero_de_telephone: string,

  adresse: string,
  numero: string,
  rue: string,
  code_postal: string,
  ville: string,

  activites: { activite_id: ProducerActivityConstructorOptions }[],
  photo_de_presentation: DirectusMediaModelConstructorOptions;

  presentation: string,
}

export default class ProducerModel extends AbstractDirectusModel
{
  protected static readonly itemName: string = 'producteurs';

  id: number;
  slug: string;

  raison_sociale: string;
  siret: string;

  email: string;
  site_internet: string;
  numero_de_telephone: string;

  photo_de_presentation: DirectusMediaModel|null;

  adresse: LatLng|null = null;
  numero: string       = '';
  rue: string          = '';
  code_postal: string  = '';
  ville: string        = '';

  activites: ProducerActivityModel[] = [];
  presentation: string;

  constructor(options: ProducerModelConstructorOptions)
  {
    super();

    this.id = options.id;
    this.slug = options.slug;
    this.raison_sociale = options.raison_sociale;
    this.siret = options.siret;
    this.email = options.email;
    this.site_internet = options.site_internet;
    this.numero_de_telephone = options.numero_de_telephone;
    this.numero = options.numero;
    this.rue = options.rue;
    this.code_postal = options.code_postal;
    this.ville = options.ville;
    this.presentation = options.presentation;

    this.photo_de_presentation = ProducerModel.instantiatePhoto(options.photo_de_presentation);

    if (options.adresse && typeof options.adresse == 'object') {
      const {lat, lng} = options.adresse;
      this.adresse     = {
        lat: lat,
        lng: lng,
      };
    }

    this.activites = ProducerModel.instantiateActivites(options.activites);
  }

  static async getBySlug(slug: string, fields?: string[]): Promise<ProducerModel|null>
  {
    const response = await ProducerModel._findAll(ProducerModel.itemName, {
      fields: fields,
      filter: {
        slug:   slug,
        active: 'published',
      },
      limit: 1,
    });

    return DirectusItemFactory.instantiateSingleItem(ProducerModel, response);
  }

  static async findAll(fetchParams?: {}): Promise<ProducerModel[]>
  {
    const results = await AbstractDirectusModel._findAll(ProducerModel.itemName, fetchParams);

    return DirectusItemFactory.instantiateCollection(ProducerModel, results);
  }

  private static instantiatePhoto(photoDescriptor: DirectusMediaModelConstructorOptions): DirectusMediaModel|null
  {
    if (!photoDescriptor) {
      return null;
    }

    return new DirectusMediaModel(photoDescriptor);
  }

  private static instantiateActivites(activiteDescriptors: { activite_id: ProducerActivityConstructorOptions }[]): ProducerActivityModel[]
  {
    const activites: ProducerActivityModel[] = [];
    activiteDescriptors.forEach(activiteDescriptor => {
      activites.push(new ProducerActivityModel(activiteDescriptor.activite_id));
    });

    return activites;
  }
}
