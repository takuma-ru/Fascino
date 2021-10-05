/* eslint-disable vue/valid-v-for */
<template>
  <div id="map">
    <no-ssr>
      <l-map :zoom="zoom" :center="center">
        <l-tile-layer :url="url" />
      </l-map>
    </no-ssr>
  </div>
</template>
<script>
export default {
  data () {
    return {
      zoom: 5,
      center: [35.6804, 136.7690],
      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
    }
  },
}
</script>
<style scoped>
#map {
  position: relative;
  height: 100%;
  width: 100%;
  z-index: 0;
}
</style>
