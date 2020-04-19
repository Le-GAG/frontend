import {Fields} from '@vuex-orm/core';
import DirectusFileModel from '@/models/DirectusFileModel';
import ProducerActivityModel from '@/models/ProducerActivityModel';
import JunctionProducerActivityModel from '@/models/JunctionProducerActivityModel';
import {AxiosResponse} from 'axios';
import AbstractModel from '@/models/AbstractModel';

export default class ProducerModel extends AbstractModel
{
  static entity = 'producteurs';

  static get collectionName()
  {
    return 'producteurs';
  }

  static get defaultFetchParams()
  {
    return {
      fields: ['*', 'photo_de_presentation.*', 'activites.*.*'],
      filter: {
        active: 'published',
      },
    };
  }

  static fields(): Fields
  {
    return {
      id:                       this.attr(null),
      active:                   this.string(null),
      adresse:                  this.attr(null),
      code_postal:              this.string(null),
      email:                    this.string(null),
      numero:                   this.string(null),
      numero_de_telephone:      this.string(null),
      photo_de_presentation:    this.belongsTo(DirectusFileModel, 'photo_de_presentation_id'),
      photo_de_presentation_id: this.attr(null),
      presentation:             this.string(null),
      raison_sociale:           this.string(null),
      rue:                      this.string(null),
      siret:                    this.string(null),
      site_internet:            this.string(null),
      slug:                     this.string(null),
      ville:                    this.string(null),
      activites:                this.belongsToMany(
        ProducerActivityModel,
        JunctionProducerActivityModel,
        'producteur_id',
        'activite_id',
      ),
    };
  }

  static apiConfig = {
    dataTransformer: (response: AxiosResponse) => {
      let data = response.data.data;

      if (data instanceof Array) {
        data = data.map(ProducerModel.transformActivities);
      } else {
        data = ProducerModel.transformActivities(data);
      }

      return data;
    },
  }

  protected static transformActivities(producer: any)
  {
    if ('activites' in producer) {
      producer.activites = producer.activites.map((activite:any) => {
        return activite.activite_id;
      });
    }

    return producer;
  }

  id!: number;
  active!: string;
  adresse!: { lat: number; lng: number } | null;
  code_postal!: string;
  email!: string;
  numero!: string;
  numero_de_telephone!: string;
  photo_de_presentation!: DirectusFileModel;
  photo_de_presentation_id!: number;
  presentation!: string;
  raison_sociale!: string;
  rue!: string;
  siret!: string;
  site_internet!: string;
  slug!: string;
  ville!: string;
  activites!: ProducerActivityModel[];
}
