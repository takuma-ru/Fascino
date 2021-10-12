<template>
  <div id="map">
    <no-ssr>
      <l-map :zoom="zoom" :center="NowPlace">
        <v-btn
          id="nowPlace"
          fab
          x-large
          color="#00214D"
          @click="getLocation"
        >
          <v-icon large>
            {{ crosshairGps }}
          </v-icon>
        </v-btn>
        <l-tile-layer :url="url" />
        <l-marker :lat-lng="NowPlace" />
      </l-map>
    </no-ssr>
  </div>
</template>
<script>
import { mdiCrosshairsGps } from '@mdi/js'

export default {
  data () {
    return {
      zoom: 15,
      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      NowPlace: [0, 0],
      crosshairGps: mdiCrosshairsGps,
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

      const options = {
        enableHighAccuracy: false,
        timeout: 5000,
        maximumAge: 0,
      }

      navigator.geolocation.getCurrentPosition(this.success, this.error, options)
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
#nowPlace {
  position: relative;
  z-index: 10000;
  top: 80%;
  left: 80%;
}
#map {
  position: relative;
  height: 100%;
  width: 100%;
  z-index: 0;
}
</style>
