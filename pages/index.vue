<template>
  <div :style="`background: ${$vuetify.theme.themes[$vuetify.theme.dark ? 'dark' : 'light'].background}`">
    <v-container class="pa-0">
      <v-row
        id="top"
        justify="center"
        align="center"
        no-gutters
        style="position: relative; min-height: 100vh; max-width: 100vw; text-align: center"
      >
        <v-col
          id="title"
          class="pa-4"
        >
          <v-img
            :src="require('../assets/title.svg')"
            style="max-width: 100%;"
          />
          <div class="mt-10 px-auto">
            <p :style="`color:${$vuetify.theme.themes[$vuetify.theme.dark ? 'dark' : 'light'].text}`">
              現在開発中（アルファ版）です。<br><span class="br">UIや使用できる機能が</span><span class="br">大幅に変更される可能性があります。</span>
            </p>
            <Button
              type="nml"
              flat
              color="red"
              @click.native="$router.push('/signin')"
            >
              簡単にはじめてみる
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
          <div id="next_button">
            <p class="mb-2">
              どんなアプリ？
            </p>
            <div>
              <svg style="height: 5vh" xmlns="http://www.w3.org/2000/svg" width="74.272" height="64" viewBox="0 0 74.272 64">
                <path id="多角形_1" data-name="多角形 1" d="M30.216,11.925a8,8,0,0,1,13.839,0L67.3,51.985A8,8,0,0,1,60.38,64H13.891a8,8,0,0,1-6.92-12.015Z" transform="translate(74.272 64) rotate(180)" :fill="$vuetify.theme.themes[$vuetify.theme.dark ? 'light' : 'dark'].background" />
              </svg>
            </div>
          </div>
        </v-col>
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

#title {

}

#top #next_button {
  position: absolute;
  bottom: 48px;
  left: 50%;

  transform: translateX(-50%);
}
</style>
