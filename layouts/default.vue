<template>
  <v-app
    :style="`background: ${$vuetify.theme.themes[$vuetify.theme.dark ? 'dark' : 'light'].background}`"
  >
    <v-main>
      <Nuxt />
    </v-main>
    <BottomNaviBar />
  </v-app>
</template>

<script>
export default {
  data () {
    return {
    }
  },

  created () {
    this.$store.dispatch('darkMode/setUpIsDarkMode')
  },

  methods: {
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

<style>
html::-webkit-scrollbar {
  display: none;
}
</style>
