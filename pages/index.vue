<template>
  <div style="background-color: #F0F0F0">
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
            <p style="color: #001024">
              現在開発中（アルファ版）です。<br><span class="br">UIや使用できる機能が</span><span class="br">大幅に変更される可能性があります。</span>
            </p>
            <PWAInstallButton />
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
                <path id="多角形_1" data-name="多角形 1" d="M30.216,11.925a8,8,0,0,1,13.839,0L67.3,51.985A8,8,0,0,1,60.38,64H13.891a8,8,0,0,1-6.92-12.015Z" transform="translate(74.272 64) rotate(180)" fill="#001024" />
              </svg>
            </div>
          </div>
        </v-col>
      </v-row>
      <v-row
        justify="center"
        align="center"
        no-gutters
        style="min-height: 100vh; max-width: 100vw; z-index: 1;"
      />
    </v-container>
  </div>
</template>

<script>
export default {
  mounted () {
    this.$vuetify.theme.dark = false
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
