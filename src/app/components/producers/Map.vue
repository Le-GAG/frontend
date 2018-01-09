<template>
  <gmap-map
    class="ProducerOverview__map"
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
      :position="getPosition(producer)"
      @click="toggleInfoWindow(producer, producer.id)"
      :icon="{
          url: require('static/map-marker-red.png'),
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


<script>
  export default {
    name: 'producer-map-component',

    props: {
      producers: {
        type:    Array,
        default: [],
      },

      error: {
        default: null,
      },

      loading: {
        type:    Boolean,
        default: false,
      },
    },

    data() {
      return {
        center: {
          lat: 45.4210664,
          lng: 6.0120676,
        },

        zoom: 12,

        currentProducerId: 1,

        // InfoWindow
        infoWindowTitle:    '',
        infoWindowSubtitle: '',
        infoWindowContent:  '',
        //optional: offset infowindow so it visually sits nicely on top of our marker
        infoWindowPosition: {
          lat: 0,
          lng: 0,
        },
        isInfoWindowOpened: false,
        infoOptions:        {
          pixelOffset: {
            width:  0,
            height: -35,
          },
        },
      };
    },

    watch: {
      producers(producers) {
        if (producers.length > 2) {
          const bounds = new google.maps.LatLngBounds();

          for (let producer of producers) {
            bounds.extend(this.getPosition(producer));
          }

          this.$refs.map.$mapObject.fitBounds(bounds);
        }
      },
    },

    methods: {
      getPosition(producer) {
        const parts = producer.adresse.split(',');
        return { lat: parseFloat(parts[ 0 ]), lng: parseFloat(parts[ 1 ]) };
      },

      toggleInfoWindow(producer, producerId) {
        this.infoWindowPosition = this.getPosition(producer);
        this.infoWindowTitle    = producer.raison_sociale;
        this.infoWindowSubtitle = producer.ville;

        let infoWindowContent = `<ul class="tags">`;
        producer.activites.data.forEach((activite) => {
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
      },
    },
  };
</script>


<style scoped lang="scss">

</style>
