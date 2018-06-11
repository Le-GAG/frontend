/**
 * @author nstCactus
 * @date 11/06/2018 13:43
 */
import AbstractApi from '@/api/abstractApi';

export default class ProducersApi extends AbstractApi {
  fetchParams = {
    columns: [
      'id',
      'nom',
      'producteur',
      'descriptions',
      'categorie',
      'tags',
      'prix',
      'photos',

      'prix_des_produits.conditionnement',
      'prix_des_produits.unite',
      'prix_des_produits.unite_de_mesure',
    ],

    filters: {
      prix: { has: 1 },
    },
  };

  constructor () {
    super();

    this.itemName = 'produits';
  }
}
