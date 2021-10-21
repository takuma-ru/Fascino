<template>
  <div id="map">
    <div id="main">
      <no-ssr>
        <l-map :zoom="zoom" :center="NowPlace">
          <v-btn
            id="nowPlace"
            fab
            x-large
            :color="$vuetify.theme.themes[$vuetify.theme.dark ? 'dark' : 'light'].background_front"
            @click="getLocation"
          >
            <v-icon large>
              {{ crosshairGps }}
            </v-icon>
          </v-btn>
          <l-tile-layer :url="url" />
          <l-marker
            :lat-lng="NowPlace"
            @click="dialog = true"
          >
            <l-icon icon-url="icon/fascino_logo_noback.svg" />
          </l-marker>
        </l-map>
      </no-ssr>
    </div>
    <div id="modal">
      <v-dialog
        v-model="dialog"
        max-width="290"
        persistent
      >
        <v-card>
          <v-card-title>
            TITLE
          </v-card-title>
          <v-card-text>
            XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn
              @click="dialog = false"
            >
              CLOSE
            </v-btn>
            <v-spacer />
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>
<script>
import { mdiCrosshairsGps } from '@mdi/js'

export default {
  data () {
    return {
      staticAnchor: [16, 37],
      zoom: 15,
      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      NowPlace: [0, 0],
      crosshairGps: mdiCrosshairsGps,
      dialog: false,
    }
  },
  mounted () {
    /* 押下時にズーム倍率もリセット */
    this.getLocation()
  },
  methods: {
    overLay () {
      alert('OK')
    },
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
    nowPlace () {
      alert('NOW PLACE')
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
  z-index: 1000;
  top: 80%;
  left: 80%;
}
#main {
  position: relative;
  height: 100%;
  width: 100%;
}
</style>
