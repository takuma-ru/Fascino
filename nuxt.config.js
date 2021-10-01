export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - fascino',
    title: 'fascino',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
      { name: 'google-site-verification', content: 'iUZdpKqaFKB1nsiz5mR0KHODO9mT-WbzzWwZbCDl9Sg' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    '@nuxtjs/eslint-module',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/firebase',
  ],

  firebase: {
    config: {
      apiKey: process.env.APIKEY,
      authDomain: process.env.AUTHDOMAIN,
      databaseURL: process.env.DATABASEURL,
      projectId: process.env.PROJECTID,
      storageBucket: process.env.STORAGEBUCKET,
      messagingSenderId: process.env.MESSAGINGSENDERID,
      appId: process.env.APPID,
      measurementId: process.env.MEASUREMENTID,
    },
    services: {
      auth: true,
      firestore: true,
      database: true,
      storage: true,
    },
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      name: 'Fascino(地域創生ゲームSNSアプリ)',
      short_name: 'Fasino',
      lang: 'ja',
      background_color: '#001024',
      theme_color: '#001024',
      description: '地域創生を目的としたゲーム型SNSアプリです。あなたの地域の魅力を発信しましょう！',
      screenshots: [
        {
          src: '/screenshots/screenshot_01.png',
          sizes: '375x812',
          type: 'image/gif',
        },
        {
          src: '/screenshots/screenshot_02.png',
          sizes: '375x812',
          type: 'image/gif',
        },
        {
          src: '/screenshots/screenshot_03.png',
          sizes: '375x812',
          type: 'image/gif',
        },
      ],
    },
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    defaultAssets: {
      font: false,
      icons: ['mdi', 'fa'],
    },
    theme: {
      themes: {
        light: {
          background: '#F0F0F0',
          dark: '#001024',
          dark_lighten: '#001432',
          light: '#FFFFFE',
          light_darken: '#F2F4F6',
          light_darken2: '#F0F0F0',
          blue: '#00214D',
          blue_lighten: '#1B2D45',
          blue_lighten2: '#B7C9E4',
          yellow: '#FDE24F',
          red: '#FF5470',
          red_lighten: '#FE8DA0',
          green: '#00EBC7',
          green_lighten: '#93DED2',
          gray: '#929292',
          gray_lighten: '#DEDEDE',
        },
        dark: {
          background: '#001024',
          dark: '#001024',
          dark_lighten: '#001432',
          light: '#FFFFFE',
          light_darken: '#F2F4F6',
          light_darken2: '#F0F0F0',
          blue: '#00214D',
          blue_lighten: '#1B2D45',
          blue_lighten2: '#B7C9E4',
          yellow: '#FDE24F',
          red: '#FF5470',
          red_lighten: '#FE8DA0',
          green: '#00EBC7',
          green_lighten: '#93DED2',
          gray: '#929292',
          gray_lighten: '#DEDEDE',
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },
}
