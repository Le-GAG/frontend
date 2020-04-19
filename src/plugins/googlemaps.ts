/**
 * @author nstCactus
 * @date 08/01/2018 17:19
 */

import Vue from 'vue';
import {install} from 'vue2-google-maps';

declare module 'vue/types/vue' {
  interface Vue {
    $mapObject: any,
  }
}

Vue.use({install}, {
  load: {
    key:       'AIzaSyCm3g3uzj6HbZXLft0LTyXbzbUSGOc2BLc',
    libraries: 'places', // CSV, not array, for some reason
  },
});
