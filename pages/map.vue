<template>
  <div id="map">
    <div id="main">
      <l-map
        :zoom.sync="zoom"
        :options="mapOptions"
        :center="center"
      >
        <v-card style="position: absolute; z-index: 500;">
          <v-card-title>
            {{ $store.getters['rtdb/imgCoordinatePostData'] }}
          </v-card-title>
          <v-card-text>
            {{ center }}
          </v-card-text>
        </v-card>
        <Button
          id="nowPlace"
          icon-color="text"
          color="green_lighten"
          icon="mdi-crosshairs-gps"
          type="lg_sq"
          @click.native="getLocation(), findSpot()"
        />
        <l-tile-layer
          :url="`https://cartodb-basemaps-{s}.global.ssl.fastly.net/${$vuetify.theme.dark ? 'dark' : 'light'}_all/{z}/{x}/{y}.png`"
          :attribution="attribution"
        />
        <l-marker
          :lat-lng="center"
          :icon="icon"
        />
        <!--一定のズーム値になるまではマーカー非表示とかのほうがいいかも-->
        <l-marker
          v-for="marker in markers"
          :key="marker.id"
          :lat-lng="marker.position"
          :icon="spotIcon"
        />
      </l-map>
    </div>
    <PostInfoModal v-show="modal" />
  </div>
</template>
<script>
import L from 'leaflet'
import iconImage from '../static/icon/fascino_logo_noback.svg'
import spoticonImage from '../static/icon/map-marker.svg'
export default {
  name: 'Map',
  components: {
  },
  data () {
    return {
      expand: false,
      zoom: 17,
      center: [0, 0],
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      mapOptions: {
        zoomControl: false,
        zoomSnap: 0.5,
      },
      icon: L.icon({
        iconUrl: iconImage,
        iconSize: [48, 48],
        iconAnchor: [24, 24],
      }),
      spotIcon: L.icon({
        iconUrl: spoticonImage,
        iconsize: [60, 60],
        iconAnchor: [30, 30],
      }),
      markers: [
        {
          id: 'm1',
          position: { lat: 38.919609806206346, lng: 141.1240648198379 },
        },
        {
          id: 'm2',
          position: { lat: 38.92480770805559, lng: 141.10752110839584 },
        },
        {
          id: 'm3',
          position: { lat: 38.93283557272672, lng: 141.10622267771873 },
        },
        {
          id: 'm4',
          position: { lat: 38.935654177411884, lng: 141.13602725401006 },
        },
      ],
      options: {
        enableHighAccuracy: false,
        timeout: 20000,
        maximumAge: 0,
      },
    }
  },
  mounted () {
    this.watchLocation()
    this.findSpot()
  },
  methods: {
    findSpot () {
      this.$store.dispatch('rtdb/getimgCoordinatePostData', { coords: [1, 12] })
    },
    getLocation () {
      this.zoom = 17
      if (!navigator.geolocation) {
        alert('ERROR')
      }
      navigator.geolocation.getCurrentPosition(this.success, this.error, this.options)
    },
    watchLocation () {
      if (!navigator.geolocation) {
        alert('ERROR')
      }
      this.ID = navigator.geolocation.watchPosition(this.success, this.error, this.options)
    },
    success (position) {
      const coords = position.coords
      this.center = [coords.latitude, coords.longitude]
    },
    error () {
      alert('ERROR')
    },
  },
}
</script>
<style lang="scss" scoped>
#map {
  z-index: 0;
  position: relative;
  height: 100%;
  width: 100%;
}
#nowPlace {
  position: absolute;
  z-index: 500;
  bottom: 72px;
  right: 16px;
}
#main {
  position: relative;
  height: 100%;
  width: 100%;
}
</style>
