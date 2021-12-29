<template>
  <div id="map">
    <div id="main">
      <l-map
        ref="lmap"
        :zoom.sync="map.zoom"
        :options="map.options"
        :center="map.center"
      >
        <l-control position="bottomright">
          <Button
            id="nowPlace"
            icon-color="text"
            color="green_lighten"
            icon="mdi-crosshairs-gps"
            type="lg_sq"
            @click.native="getLocation()"
          />
        </l-control>

        <l-tile-layer
          :url="`https://cartodb-basemaps-{s}.global.ssl.fastly.net/${$vuetify.theme.dark ? 'dark' : 'light'}_all/{z}/{x}/{y}.png`"
          :attribution="map.tileLayer.attribution"
        />
        <l-control-attribution position="topright" />
        <l-marker
          :lat-lng="map.center"
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
      map: {
        center: [0, 0],
        zoom: 17,
        marker: {
          latitude: 0,
          longitude: 0,
        },
        options: {
          attributionControl: false,
          zoomControl: false,
          zoomSnap: 0.2,
        },
        tileLayer: {
          attribution: '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors',
        },
      },
      imgCoordinatePostData: null,
      modal: false,
      icon: L.icon({
        iconUrl: iconImage,
        iconSize: [48, 48],
        iconAnchor: [24, 24],
      }),
      options: {
        enableHighAccuracy: true,
        timeout: 1000,
        maximumAge: 0,
      },
    }
  },
  mounted () {
    this.watchLocation()
  },
  methods: {
    getLocation () {
      if (!navigator.geolocation) {
        alert('現在地を取得できません')
      }
      // eslint-disable-next-line no-console
      navigator.geolocation.getCurrentPosition(this.success, console.log('ERROR_get'), this.options)
    },
    watchLocation () {
      if (!navigator.geolocation) {
        alert('現在地を取得できません')
      }
      // eslint-disable-next-line no-console
      navigator.geolocation.watchPosition(this.success, console.log('ERROR_watch'), this.options)
    },
    async success (position) {
      this.map.center = [
        position.coords.latitude,
        position.coords.longitude,
      ]
      await this.$store.dispatch('rtdb/getimgCoordinatePostData', { coords: this.map.center })
      this.imgCoordinatePostData = await this.$store.getters['rtdb/imgCoordinatePostData']
      // eslint-disable-next-line no-console
      console.log('成功')
      this.map.marker.latitude = position.coords.latitude
      this.map.marker.longitude = position.coords.longitude
      this.map.zoom = 17
    },
    async openModal () {
      this.mapDialog = true
      await this.$nextTick()
      this.$refs.lmap.mapObject.invalidateSize()
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
  position: fixed;
  z-index: 401;
  bottom: 72px;
  right: 16px;
}
#main {
  height: 100%;
  width: 100%;
}
</style>
