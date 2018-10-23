/**
 * @author nstCactus
 * @date 18/07/2018 13:13
 */

import AbstractDirectusModel from '@/models/AbstractDirectusModel';
import ProducerActivityModel from '@/models/ProducerActivityModel';
import {DirectusMeta} from 'directus-sdk-javascript';

interface DirectusMedia {
  name: string,
  width: number,
  height: number,
}

export interface LatLng {
  lat: number,
  lng: number,
}

interface ProducerModelConstructorOptions
{
  id: number,
  slug: string,
  raison_sociale: string,
  email: string,

  adresse: string,
  numero: string,
  rue: string,
  code_postal: string,
  ville: string,

  activites: { meta: DirectusMeta, data: {id: number, nom: string}},
  photo_de_presentation: {data: DirectusMedia},
}

export default class ProducerModel extends AbstractDirectusModel {
  protected static readonly itemName:string = 'producteurs';

  id: number;
  slug: string;
  raison_sociale: string;

  photo_de_presentation?: string;

  adresse?: LatLng;
  numero: string = '';
  rue: string = '';
  code_postal: string = '';
  ville: string = '';

  activites: ProducerActivityModel[] = [];

  constructor (options: ProducerModelConstructorOptions) {
    super();

    this.id = options.id;
    this.slug = options.slug;
    this.raison_sociale = options.raison_sociale;

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
      this.adresse = {
        lat: Number(lat),
        lng: Number(lng),
      };
    }

    this.numero = options.numero;
    this.rue = options.rue;
    this.code_postal = options.code_postal;
    this.ville = options.ville;
  }

  static async getBySlug(slug: string): Promise<ProducerModel|null>
  {
    const response =  await ProducerModel._findAll(ProducerModel.itemName, {
      filters: {slug},
      limit:   1,
    });

    console.log(response);

    return new ProducerModel(response.data as unknown as ProducerModelConstructorOptions);
  }

  static async findAll(fetchParams?: {}): Promise<ProducerModel[]>
  {
    const results = await AbstractDirectusModel._findAll(ProducerModel.itemName, fetchParams);

    const producers:ProducerModel[] = [];
    results.data.forEach((result:any) => {
      producers.push(new ProducerModel(result));
    });

    return producers;
  }
}
