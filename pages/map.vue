<template>
  <div id="map">
    <div id="main">
      <no-ssr>
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
          <l-marker
            :lat-lng="center"
            :icon="icon"
          />
          <l-marker
            v-for="marker in markers"
            :key="marker.id"
            :lat-lng.sync="marker.position"
            :icon="spotIcon"
          />
        </l-map>
      </no-ssr>
    </div>
  </div>
</template>
<script>
import L from 'leaflet'
import iconImage from '../static/icon/fascino_logo_noback.svg'
import spoticonImage from '../static/icon/map-marker-star.svg'
export default {
  name: 'Map',
  components: {
  },
  data () {
    return {
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
        iconsize: [48, 48],
        iconAnchor: [24, 24],
      }),
      markers: [
        {
          id: 'm1',
          position: { lat: 39.42, lng: 141.09 },
        },
        {
          id: 'm2',
          position: { lat: 51.8905, lng: -0.09 },
        },
        {
          id: 'm3',
          position: { lat: 51.005, lng: -0.09 },
        },
        {
          id: 'm4',
          position: { lat: 50.7605, lng: -0.09 },
        },
      ],
    }
  },
  mounted () {
    this.getLocation()
  },

  methods: {
    getLocation () {
      if (!navigator.geolocation) {
        alert('ERROR')
      }

      this.options = {
        enableHighAccuracy: false,
        timeout: 500,
        maximumAge: 0,
      }
      navigator.geolocation.getCurrentPosition(this.success, this.error, this.options)
    },

    success (position) {
      this.zoom = 17
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
