<template>
  <v-app>
    <v-app-bar
      flat
      fixed
      app
      color="light_darken2"
    >
      <v-toolbar-title v-text="title" />
    </v-app-bar>
    <v-main>
      <Nuxt />
    </v-main>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      title: 'Fasino ver0.0.1',
    }
  },
}
</script>

<style lang="scss" scoped>
@font-face {
  font-family: "SmartFontUI";
  src: url('./assets/font/03SmartFontUI.ttf') format("truetype");
}

.v-application {
  font-family: "SmartFontUI";
  background-color: #F0F0F0;
}
</style>
