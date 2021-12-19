<template>
  <div id="map">
    <div id="main">
      <l-map
        :zoom.sync="zoom"
        :options="mapOptions"
        :center="center"
      >
        <v-card
          style="position: absolute; z-index: 500;"
        >
          <v-btn
            @click="modal = !modal"
          >
            open
          </v-btn>
          <v-card-title>
            {{ modal }}
          </v-card-title>
          <v-card-text>
            {{ postData }}
          </v-card-text>
          <v-card-text>
            {{ zoom }}
          </v-card-text>
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
          v-for="marker in $store.getters['rtdb/imgCoordinatePostData']"
          :key="marker.uid"
          :lat-lng="marker.imgCoordinate"
          :icon="spotIcon"
        />
      </l-map>
    </div>
    <PostInfoModal
      v-model="modal"
      :post-data="{
        date : 1634863170,
        detail : 'ここからの眺めは最高！',
        imgCoordinate : [ 74.355, 65.1 ],
        imgName : '-MpEYScCrAgS-GrH1Lt3.jpg',
        likesSum : 154,
        tags : [ '絶景', '観光', '夜景' ],
        uid : 'wirA5GIggboAFRoMMAkjIStPaAY5',
        wentSum : 35
      }"
      :posted-user-data="{
        uid: 'aaa',
        photoURL: 'https://lh3.googleusercontent.com/a-/AOh14GjcMttL113-cCGPplKyv5TEWgquHkOC3qwEyudVUw=s96-c',
        name: 'test'
      }"
    />
  </div>
</template>
<script>
import L from 'leaflet'
import iconImage from '../static/icon/fascino_logo_noback.svg'
import spoticonImage from '../static/icon/map-marker.svg'
export default {
  name: 'Map',
  data () {
    return {
      postData: {
        uid: 0,
        detail: 0,
        tags: [],
        imgCoordinate: [],
        imgName: 0,
        likesum: 0,
        wentsum: 0,
        date: 0,
      },
      userData: {
        uid: 0,
        name: 0,
        detail: 0,
        liked: 0,
        wented: 0,
      },
      modal: false,
      zoom: 17,
      center: [0, 0],
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      mapOptions: {
        zoomControl: false,
        zoomSnap: 1,
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
    getPostdata () {
      this.postData = this.$store.getters['rtdb/imgCoordinatePostData']
    },
    getUid () {

    },
    getUserdata () {
      this.$store.dispatch('firestore/getData', this.uid).then((res) => {
        this.userData = res
      })
    },
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
    success (position) {
      const coords = position.coords
      this.center = [coords.latitude, coords.longitude]
      this.$store.dispatch('rtdb/getimgCoordinatePostData', { coords: this.center })
      this.getPostdata()
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
  z-index: 500;
  bottom: 72px;
  right: 16px;
}
#main {
  z-index: 0;
  position: relative;
  height: 100%;
  width: 100%;
}
</style>
