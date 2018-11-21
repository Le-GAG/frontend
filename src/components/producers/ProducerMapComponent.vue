<template>
  <gmap-map
    class="producer-map-component"
    ref="map"
    :center.sync="center"
    :zoom.sync="zoom"
  >
    <gmap-info-window
      :options="infoOptions"
      :position="infoWindowPosition"
      :opened="isInfoWindowOpened"
      @closeclick="isInfoWindowOpened=false"
    >
      <h1 class="title is-6">{{ infoWindowTitle }}</h1>
      <h2 class="subtitle is-6">
        <span class="icon"><i class="fa fa-map-marker"></i></span>
        &nbsp;{{ infoWindowSubtitle }}
      </h2>
      <p v-html="infoWindowContent"></p>
    </gmap-info-window>

    <gmap-marker
      v-for="producer of producers"
      :key="producer.id"
      :title="producer.raison_sociale"
      :position="producer.adresse"
      @click="toggleInfoWindow(producer, producer.id)"
      :icon="{
          url: require('@/assets/map-marker-red.png'),
          labelOrigin: {
            x: 20,
            y: 15,
          },
          scaledSize: {
            width: 30,
            height: 30,
          }
        }"
    />
  </gmap-map>
</template>


<script lang="ts">
  import {Component, Vue, Prop, Watch} from 'vue-property-decorator';
  import ProducerModel from '../../models/ProducerModel';
  import ProducerActivityModel from '../../models/ProducerActivityModel';

  @Component
  export default class ProducerMapComponent extends Vue
  {
    @Prop({default: []}) protected producers!: ProducerModel[];
    @Prop({default: null}) protected error:any;

    $refs!: {
      map: Vue,
    };

    center = {
      lat: 45.4210664,
      lng: 6.0120676,
    };

    zoom: number = 12;

    currentProducerId: number = 1;

    // InfoWindow
    infoWindowTitle: string     = '';
    infoWindowSubtitle: string  = '';
    infoWindowContent: string   = '';
    //optional: offset infowindow so it visually sits nicely on top of our marker
    infoWindowPosition: any     = {
      lat: 0,
      lng: 0,
    };
    isInfoWindowOpened: boolean = false;
    infoOptions: any            = {
      pixelOffset: {
        width:  0,
        height: -35,
      },
    };

    @Watch('producers')
    onProducersChanged(producers:ProducerModel[])
    {
      if (producers.length > 2) {
        const bounds:google.maps.LatLngBounds = new google.maps.LatLngBounds();

        for (let producer of producers) {
          const producerLatLng = producer.adresse;
          if (producerLatLng != null) {
            bounds.extend(producerLatLng);
          }
        }

        this.$refs.map.$mapObject.fitBounds(bounds);
      }
    }

    toggleInfoWindow(producer:ProducerModel, producerId:number)
    {
      this.infoWindowPosition = producer.adresse;
      this.infoWindowTitle    = producer.raison_sociale || '';
      this.infoWindowSubtitle = producer.ville || '';

      let infoWindowContent = `<ul class="tags">`;
      producer.activites!.forEach((activite: ProducerActivityModel) => {
        infoWindowContent += `<li class="tag">${activite.nom}</li>`;
      });
      infoWindowContent += '</ul>';

      this.infoWindowContent = infoWindowContent;

      //check if its the same marker that was selected if yes toggle
      if (this.currentProducerId === producerId) {
        this.isInfoWindowOpened = !this.isInfoWindowOpened;
      }
      else {
        this.isInfoWindowOpened = true;
        this.currentProducerId  = producerId;
      }
    }
  };
</script>


<style scoped lang="scss">
  .producer-map-component {
    height: 500px;
  }
</style>
