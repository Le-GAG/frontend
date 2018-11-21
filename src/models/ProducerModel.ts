/**
 * @author nstCactus
 * @date 18/07/2018 13:13
 */

import AbstractDirectusModel from '@/models/AbstractDirectusModel';
import ProducerActivityModel from '@/models/ProducerActivityModel';
import {DirectusMeta} from 'directus-sdk-javascript';
import DirectusItemFactory from '@/factories/DirectusItemFactory';

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

interface ProducerModelConstructorOptions
{
  [index: string]: any;

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

  activites: { meta: DirectusMeta, data: { id: number, nom: string } },
  photo_de_presentation: { data: DirectusMedia },
  presentation: string,
}

export default class ProducerModel extends AbstractDirectusModel
{
  [index: string]: any;

  protected static readonly itemName: string = 'producteurs';

  id?: number;
  slug?: string;

  raison_sociale?: string;
  siret?: string;

  email?: string;
  site_internet?: string;
  numero_de_telephone?: string;

  photo_de_presentation?: string;

  adresse?: LatLng;
  numero?: string      = '';
  rue?: string         = '';
  code_postal?: string = '';
  ville?: string       = '';

  activites?: ProducerActivityModel[] = [];
  presentation?: string;

  constructor(options: ProducerModelConstructorOptions)
  {
    super();

    [
      'id', 'slug',
      'raison_sociale', 'siret', 'email', 'site_internet', 'numero_de_telephone',
      'presentation',
      'numero', 'rue', 'ville', 'code_postal',
    ].forEach(property => {
      this[property] = options[property];
    });

    this.photo_de_presentation = '';
    if (
      options.photo_de_presentation
      && options.photo_de_presentation.data
      && options.photo_de_presentation.data.name
    ) {
      this.photo_de_presentation = options.photo_de_presentation.data.name;
    }

    if (options.adresse) {
      const [lat, lng] = options.adresse.split(',');
      this.adresse     = {
        lat: Number(lat),
        lng: Number(lng),
      };
    }
  }

  static async getBySlug(slug: string): Promise<ProducerModel>
  {
    const response = await ProducerModel._findAll(ProducerModel.itemName, {
      filters: {slug},
      limit:   1,
    });

    return DirectusItemFactory.instantiateSingleItem(ProducerModel, response);
  }

  static async findAll(fetchParams?: {}): Promise<ProducerModel[]>
  {
    const results = await AbstractDirectusModel._findAll(ProducerModel.itemName, fetchParams);

    return DirectusItemFactory.instantiateCollection(ProducerModel, results);
  }
}
