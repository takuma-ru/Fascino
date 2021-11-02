<template>
  <v-app
    :style="`background: ${$vuetify.theme.themes[$vuetify.theme.dark ? 'dark' : 'light'].background}`"
  >
    <v-main>
      <Nuxt />
    </v-main>
    <BottomNaviBar
      v-if="$route.path != '/'"
    />
  </v-app>
</template>

<script>
export default {
  data () {
    return {
    }
  },

  head () {
    return {
      meta: [
        { name: 'theme-color', content: JSON.parse(localStorage.isDarkMode.toLowerCase()) ? '#001024' : '#F0F0F0' },
        { name: 'background-color', content: JSON.parse(localStorage.isDarkMode.toLowerCase()) ? '#001024' : '#F0F0F0' },
      ],
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
