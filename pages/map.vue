<template>
  <div id="map">
    <div id="main">
      <l-map
        :zoom.sync="zoom"
        :options="mapOptions"
        :center="center"
      >
        <Button
          id="nowPlace"
          icon-color="text"
          color="green_lighten"
          icon="mdi-crosshairs-gps"
          type="lg_sq"
          @click.native="getLocation()"
        />
        <l-tile-layer
          :url="`https://cartodb-basemaps-{s}.global.ssl.fastly.net/${$vuetify.theme.dark ? 'dark' : 'light'}_all/{z}/{x}/{y}.png`"
          :attribution="attribution"
        />
        <l-control-attribution position="topright" />
        <l-marker
          :lat-lng="center"
          :icon="icon"
        />
        <SpotMarkerAndModal
          v-for="data in imgCoordinatePostData"
          id="modal"
          :key="data.index"
          :post-data="data"
        />
      </l-map>
    </div>
  </div>
</template>
<script>
import L from 'leaflet'
import iconImage from '../static/icon/fascino_logo_noback.svg'
import SpotMarkerAndModal from '../components/SpotMarkerAndModal.vue'
export default {
  name: 'Map',
  components: { SpotMarkerAndModal },
  data () {
    return {
      imgCoordinatePostData: null,
      modal: false,
      zoom: 17,
      center: [0, 0],
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      mapOptions: {
        attributionControl: false,
        zoomControl: false,
        zoomSnap: 0.5,
      },
      icon: L.icon({
        iconUrl: iconImage,
        iconSize: [48, 48],
        iconAnchor: [24, 24],
      }),
      options: {
        enableHighAccuracy: false,
        timeout: 20000,
        maximumAge: 0,
      },
    }
  },
  mounted () {
    this.watchLocation()
  },
  methods: {
    getLocation () {
      this.zoom = 17
      if (!navigator.geolocation) {
        alert('ERROR_getLocation')
      }
      navigator.geolocation.getCurrentPosition(this.success, this.error, this.options)
    },
    watchLocation () {
      if (!navigator.geolocation) {
        alert('ERROR_watchLocation')
      }
      this.ID = navigator.geolocation.watchPosition(this.success, this.error, this.options)
    },
    async success (position) {
      const coords = position.coords
      this.center = [coords.latitude, coords.longitude]
      await this.$store.dispatch('rtdb/getimgCoordinatePostData', { coords: this.center })
      this.imgCoordinatePostData = await this.$store.getters['rtdb/imgCoordinatePostData']
    },
    error () {
      alert('ERROR')
    },
  },
}
</script>
<style lang="scss" scoped>
#map {
  height: 100%;
  width: 100%;
}
#nowPlace {
  position: absolute;
  z-index: 401;
  bottom: 72px;
  right: 16px;
}
#main {
  height: 100%;
  width: 100%;
}
</style>
