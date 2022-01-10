<template>
  <div>
    <l-marker
      :lat-lng="postData.imgCoordinate"
      :icon="spotIcon"
      @click="modal = !modal"
    />
    <l-control>
      <PostInfoModal
        v-model="modal"
        :post-data="postData"
        :posted-user-data="userData"
      />
    </l-control>
  </div>
</template>

<script>
import L from 'leaflet'
import spoticonImage from '../static/icon/map-marker.svg'
export default {
  props: {
    postData: {
      type: Object,
      default: null,
    },
  },
  data () {
    return {
      userData: {
        name: null,
        uid: null,
        photoURL: null,
      },
      spotIcon: L.icon({
        iconUrl: spoticonImage,
        iconsize: [60, 60],
        iconAnchor: [30, 30],
      }),
      modal: false,
    }
  },
  mounted () {
    this.getUserdata()
  },
  methods: {
    async getUserdata () {
      await this.$store.dispatch('firestore/getData', this.postData.uid).then((res) => { this.userData = res })
    },
  },
}
</script>

<style>

</style>
