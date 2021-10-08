<template>
  <div id="map">
    <no-ssr>
      <l-map :zoom="zoom" :center="NowPlace">
        <l-tile-layer :url="url" />
        <l-marker :lat-lng="NowPlace" />
      </l-map>
    </no-ssr>
  </div>
</template>
<script>
export default {
  data () {
    return {
      zoom: 10,
      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      NowPlace: [0, 0],
    }
  },
  mounted () {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          const coords = position.coords
          this.NowPlace = [coords.latitude, coords.longitude]
        }.bind(this),
      )
    }
  },
}
</script>
<style lang="scss" scoped>
#map {
  position: relative;
  height: 100%;
  width: 100%;
  z-index: 0;
}
</style>
