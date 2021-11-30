<template>
  <div id="map">
    <div id="main">
      <no-ssr>
        <l-map
          :zoom.sync="zoom"
          :options="mapOptions"
          :center="NowPlace"
        >
          <Button
            id="nowPlace"
            icon-color="text"
            icon="mdi-crosshairs-gps"
            type="lg_sq"
            @click.native="getLocation(); resetZoom()"
          />
          <l-tile-layer
            :url="`https://cartodb-basemaps-{s}.global.ssl.fastly.net/${$vuetify.theme.dark ? 'dark' : 'light'}_all/{z}/{x}/{y}.png`"
            :attribution="attribution"
          />
          <l-control-attribution position="topright" />
          <l-marker
            :lat-lng="NowPlace"
            :icon="icon"
          />
        </l-map>
      </no-ssr>
    </div>
  </div>
</template>
<script>
import L from 'leaflet'
import iconImage from '../static/icon/fascino_logo_noback.svg'
export default {
  name: 'Map',
  components: {
  },
  data () {
    return {
      zoom: 17,
      NowPlace: [0, 0],
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
    }
  },
  mounted () {
    this.getLocation()
  },

  methods: {
    resetZoom () {
      this.zoom = 17
    },
    getLocation () {
      if (!navigator.geolocation) {
        alert('ERROR')
      }
      navigator.geolocation.getCurrentPosition(this.success, this.error)
    },

    success (position) {
      const coords = position.coords
      this.NowPlace = [coords.latitude, coords.longitude]
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
  position: relative;
  z-index: 500;
  top: 80%;
  left: 80%;
}
#main {
  position: relative;
  height: 100%;
  width: 100%;
}
</style>
