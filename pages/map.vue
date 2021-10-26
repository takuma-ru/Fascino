<template>
  <div id="map">
    <div id="main">
      <no-ssr>
        <l-map :zoom="zoom" :center="NowPlace">
          <Button
            id="nowPlace"
            icon="mdi-crosshairs-gps"
            type="lg_sq"
            @click.native="getLocation"
          />
          <l-tile-layer :url="`https://cartodb-basemaps-{s}.global.ssl.fastly.net/${$vuetify.theme.dark ? 'dark' : 'light'}_all/{z}/{x}/{y}.png`" />
          <l-marker
            :lat-lng="NowPlace"
            @click="modal = true"
          >
            <l-icon icon-url="icon/fascino_logo_noback.svg" />
          </l-marker>
        </l-map>
      </no-ssr>
    </div>
    <swipemodal
      v-model="modal"
      height="auto"
      width="100vw"
      redius="20px"
      style="position: absolute; z-index: 502;"
    >
      <v-card
        style="margin-bottom: 72px;"
        :color="$vuetify.theme.themes[$vuetify.theme.dark ? 'dark' : 'light'].background_front"
      >
        <v-card-title>
          TITLE
        </v-card-title>
        <v-card-text>
          XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        </v-card-text>
        <v-card-text>
          KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK
        </v-card-text>
      </v-card>
    </swipemodal>
  </div>
</template>
<script>
import swipemodal from 'nekoo_vue_swipemodal'
import 'nekoo_vue_swipemodal/dist/swipemodal.css'
export default {
  name: 'Map',
  components: {
    swipemodal,
  },
  data () {
    return {
      zoom: 15,
      NowPlace: [0, 0],
      modal: false,
    }
  },
  mounted () {
    this.getLocation()
  },

  methods: {
    reloadPlace () {
      navigator.geolocation.getCurrentPosition(this.success, this.error, this.options)
    },
    getLocation () {
      if (!navigator.geolocation) {
        alert('ERROR')
      }

      const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 1000,
      }

      navigator.geolocation.getCurrentPosition(this.success, this.error, options)
    },

    success (position) {
      const coords = position.coords
      this.NowPlace = [coords.latitude, coords.longitude]
      this.zoom = 20
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
