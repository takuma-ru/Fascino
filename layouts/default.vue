<template>
  <v-app
    :style="`background: ${$vuetify.theme.themes[$vuetify.theme.dark ? 'dark' : 'light'].background}`"
  >
    <v-app-bar
      flat
      fixed
      app
      :color="$vuetify.theme.themes[$vuetify.theme.dark ? 'dark' : 'light'].background"
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

  computed: {
    isdarkmode () {
      return window.matchMedia('(prefers-color-scheme: dark)').matches
    },
  },

  mounted () {
    // OSのテーマに合わせる
    this.$vuetify.theme.dark = window.matchMedia('(prefers-color-scheme: dark)').matches
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
}
</style>
