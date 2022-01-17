<template>
  <v-app
    :style="`background: ${$vuetify.theme.themes[$vuetify.theme.dark ? 'dark' : 'light'].background}`"
  >
    <v-main>
      <Nuxt />
      <BottomNaviBar
        v-if="$route.path != '/' && $route.path != '/signin' && $route.path != '/signup'"
      />
      <Snackbars />
    </v-main>
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
        { name: 'theme-color', content: this.$vuetify.theme.dark ? '#001024' : '#F0F0F0' },
        { name: 'background-color', content: this.$vuetify.theme.dark ? '#001024' : '#F0F0F0' },
      ],
    }
  },

  created () {
    this.$store.dispatch('darkMode/setUpIsDarkMode')
  },

  mounted () {
    this.checkUpdate()
  },

  methods: {
    async checkUpdate () {
      const workbox = await window.$workbox
      if (workbox) {
        workbox.addEventListener('installed', (event) => {
          // If we don't do this we'll be displaying the notification after the initial installation, which isn't perferred.
          if (event.isUpdate) {
            console.warn('最新版があります。')
            this.$store.dispatch('snackbar/addAlertsItem', {
              type: 'warn',
              msg: '最新版がリリースされました！アプリを開きなおすことで更新が完了します。',
            })
          }
        })
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@font-face {
  font-family: "SmartFontUI";
  src: url('./assets/font/03SmartFontUI.woff') format("woff");
}

.v-application {
  font-family: "SmartFontUI";
}
</style>

<style>
html::-webkit-scrollbar {
  display: none;
}
html {
  overscroll-behavior-y: none;
}
</style>
