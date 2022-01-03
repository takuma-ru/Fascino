<template>
  <div :style="`background: ${$vuetify.theme.themes[$vuetify.theme.dark ? 'dark' : 'light'].background}`">
    <v-container class="pa-0">
      <v-row
        id="top"
        justify="center"
        align="center"
        no-gutters
        style="position: relative; min-height: 70vh; max-width: 100vw; text-align: center"
      >
        <v-col
          id="title"
          class="hidden-sm-and-down hidden-xs-and-down pa-4"
          cols="1"
          md="6"
          lg="6"
          xl="6"
        >
          <v-img
            :src="require('../assets/fascino_title_logo.svg')"
            style="max-width: 50%; margin-left: 25%;"
          />
        </v-col>
        <v-col
          id="title"
          class="pa-4"
          cols="9"
          sm="9"
          md="6"
          lg="6"
          xl="6"
        >
          <div class="decoBar my-4" :style="`background-color: ${$vuetify.theme.themes['dark'].red_lighten}`" />
          <v-img
            :src="require('../assets/fascino_title.svg')"
            style="max-width: 100%; margin-left: 0%;"
          />
          <div class="decoBar my-4" :style="`background-color: ${$vuetify.theme.themes['dark'].green_lighten}`" />
        </v-col>
      </v-row>
      <v-row
        no-gutters
        justify="center"
        style="position: relative; min-height: 30vh; text-align: center"
      >
        <div class="mt-10 px-auto">
          <p :style="`color:${$vuetify.theme.themes[$vuetify.theme.dark ? 'dark' : 'light'].text}`">
            現在開発中（アルファ版）です。<br><span class="br">UIや使用できる機能が</span><span class="br">大幅に変更される可能性があります。</span>
          </p>
          <Button
            type="nml"
            flat
            color="red"
            text-color="white"
            @click.native="$router.push('/signup')"
          >
            初めての方
          </Button>
          <Button
            type="sml"
            flat
            color="green"
            class="py-4"
            text-color="#001024"
            @click.native="$store.dispatch('darkMode/setUpIsDarkMode'); $router.push('/timeline')"
          >
            投稿を見てみる
          </Button>
        </div>
      </v-row>
      <v-row
        justify="center"
        align="center"
        no-gutters
        class="px-4"
        style="min-height: 100vh; max-width: 100vw; text-align: center"
      >
        <div>
          <h1 :style="`color: ${$vuetify.theme.themes['dark'].green}`">
            地域の魅力をしろう！
          </h1>
          <p class="mt-4">
            このアプリでは地域の魅力（おいしい食べ物、綺麗な景色）を発信する目的で作られました。
          </p>
          <p>あなたの見つけた魅力を投稿したり、アプリで新たな魅力を知りましょう！</p>
        </div>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  middleware ({ store, redirect }) {
    if (store.getters['auth/googleUserData'] != null || undefined) {
      return redirect('/timeLine')
    }
  },

  data () {
    return {
      dialog: false,
      e1: 1,
    }
  },
}
</script>

<style>
html {
  background-color: #F0F0F0;
}

span.br{
  display: inline-block;
}

.decoBar {
  width: 100%;
  height: 2.5vmin;

  border-radius: 2.5vmin;
}

#top #next_button {
  position: absolute;
  bottom: 48px;
  left: 50%;

  transform: translateX(-50%);
}
</style>
