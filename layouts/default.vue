<template>
  <v-app
    :style="`background: ${$vuetify.theme.themes[$vuetify.theme.dark ? 'dark' : 'light'].background}`"
  >
    <v-app-bar
      :dark="$vuetify.theme.dark"
      flat
      fixed
      app
      color="background"
    >
      <v-toolbar-title v-text="title" />
    </v-app-bar>
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
      title: 'Fasino ver0.0.1',
    }
  },

  created () {
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
      this.initDarkMode()

      this.$nuxt.$loading.finish()
    })
  },

  methods: {
    initDarkMode () {
      const darkMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

      darkMediaQuery.addEventListener('change', (e) => {
        this.$vuetify.theme.dark = !this.$vuetify.theme.dark
      })

      if (darkMediaQuery.matches) {
        setTimeout(() => {
          this.$vuetify.theme.dark = true
        }, 0.00)
      }
    },
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
