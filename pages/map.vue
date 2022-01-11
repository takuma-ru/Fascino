<template>
  <div id="map">
    <div id="main">
      <l-map
        ref="lmap"
        :zoom.sync="map.zoom"
        :options="map.options"
        :center="map.center"
        @drag="mapDrag($event)"
      >
        <Button
          id="nowPlace"
          icon-color="text"
          color="green_lighten"
          icon="mdi-crosshairs-gps"
          type="lg_sq"
          @click.native="getLocation(), active = false"
        />
        <Button
          id="spotFind"
          icon-color="text"
          color="green_lighten"
          icon="mdi-magnify"
          type="lg_sq"
          @click.native="findSpot()"
        />
        <l-marker
          :visible="false"
          :lat-lng="[map.marker.latitude, map.marker.longitude]"
          :icon="spotIcon"
        />
        <l-marker
          :lat-lng="map.center"
          :icon="icon"
        />
        <l-tile-layer
          :url="`https://cartodb-basemaps-{s}.global.ssl.fastly.net/${$vuetify.theme.dark ? 'dark' : 'light'}_all/{z}/{x}/{y}.png`"
          :attribution="map.tileLayer.attribution"
        />
        <l-control-attribution position="topright" />
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
import iconImg from '../static/icon/target.svg'
import iconImage from '../static/icon/fascino_logo_noback.svg'
import SpotMarkerAndModal from '../components/SpotMarkerAndModal.vue'
export default {
  name: 'Map',
  components: { SpotMarkerAndModal },
  data () {
    return {
      active: false,
      map: {
        center: [38.9245985, 141.106909],
        zoom: 17,
        marker: {
          latitude: 38.9245985,
          longitude: 141.106909,
        },
        options: {
          attributionControl: false,
          zoomControl: false,
          zoomSnap: 0.5,
        },
        tileLayer: {
          attribution: '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors',
        },
      },
      imgCoordinatePostData: [],
      modal: false,
      icon: L.icon({
        iconUrl: iconImage,
        iconSize: [48, 48],
        iconAnchor: [24, 24],
      }),
      spotIcon: L.icon({
        iconUrl: iconImg,
        iconSize: [64, 64],
        iconAnchor: [32, 32],
      }),
      options: {
        enableHighAccuracy: true,
        timeout: 1000,
        maximumAge: 0,
      },
    }
  },
  created () {
    this.getLocation()
  },
  methods: {
    getLocation () {
      if (!navigator.geolocation) {
        this.$store.dispatch('snackbar/addAlertsItem', {
          type: 'error',
          msg: 'お使いのブラウザは対応していません',
        })
      }
      navigator.geolocation.getCurrentPosition((position) => {
        this.map.center = [
          position.coords.latitude,
          position.coords.longitude,
        ]
        this.$store.dispatch('rtdb/getimgCoordinatePostData', { coords: this.map.center })
        this.imgCoordinatePostData = this.$store.getters['rtdb/imgCoordinatePostData']
        console.log('取得成功')
        this.map.marker.latitude = position.coords.latitude
        this.map.marker.longitude = position.coords.longitude
        this.map.zoom = 17
      }, console.log('取得失敗'), this.options)
    },
    findSpot () {
      this.$store.dispatch('rtdb/getimgCoordinatePostData', { coords: [this.map.marker.latitude, this.map.marker.longitude] })
      this.imgCoordinatePostData = this.$store.getters['rtdb/imgCoordinatePostData']
    },
    mapDrag ($event) {
      const center = $event.target.getCenter()
      this.map.marker.latitude = center.lat
      this.map.marker.longitude = center.lng
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
#spotFind{
  position: fixed;
  z-index: 401;
  bottom: 144px;
  right: 16px;
}
#main {
  height: 100%;
  width: 100%;
}
#here {
  position: absolute;
  z-index: 500;
  left: 50%;
  bottom: calc(4% + 8px);
  transform: translate(-50%, -50%);

}
</style>
