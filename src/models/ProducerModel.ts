/**
 * @author nstCactus
 * @date 18/07/2018 13:13
 */

import AbstractDirectusModel from '@/models/AbstractDirectusModel';
import ProducerActivityModel, {ProducerActivityConstructorOptions} from '@/models/ProducerActivityModel';
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

  activites: {meta: any, data: ProducerActivityConstructorOptions[]},
  photo_de_presentation: { meta: any, data: DirectusMedia },
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

  photo_de_presentation: string;

  adresse?: LatLng;
  numero: string      = '';
  rue: string         = '';
  code_postal: string = '';
  ville: string       = '';

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

    this.photo_de_presentation = '';
    if (
      options.photo_de_presentation
      && options.photo_de_presentation.data
      && options.photo_de_presentation.data.name
    ) {
      this.photo_de_presentation = options.photo_de_presentation.data.name;
    }

    this.adresse = undefined;
    if (options.adresse) {
      const [lat, lng] = options.adresse.split(',');
      this.adresse     = {
        lat: Number(lat),
        lng: Number(lng),
      };
    }

    this.activites = [];
    if (options.activites) {
      options.activites.data.forEach((activite: ProducerActivityConstructorOptions) => {
        this.activites.push(new ProducerActivityModel(activite));
      });
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
