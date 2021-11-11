<template>
  <v-app
    :style="`background: ${$vuetify.theme.themes[$vuetify.theme.dark ? 'dark' : 'light'].background}`"
  >
    <v-container class="container">
      <h1
        v-if="error.statusCode === 404"
        :style="`color: ${$vuetify.theme.themes[$vuetify.theme.dark ? 'light' : 'dark'].background}`"
        v-html="pageNotFound"
      />
      <h1
        v-else
        :style="`color: ${$vuetify.theme.themes[$vuetify.theme.dark ? 'light' : 'dark'].background}`"
        v-html="otherError"
      />
      <Button
        type="sml"
        color="red"
        flat
        class="my-4"
        @click.native="$router.push('/')"
      >
        トップ画面に戻る
      </Button>
      <Button
        type="sml"
        color="red"
        flat
        class="my-4"
        @click.native="$router.go({path: $router.currentRoute.path, force: true})"
      >
        リロードする
      </Button>
    </v-container>
  </v-app>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data () {
    return {
      pageNotFound: '404 Not Found<br>ページが見つかりません',
      otherError: 'エラーが発生しました',
    }
  },
  head () {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title,
    }
  },
}
</script>

<style scoped>
h1 {
  font-size: 24px;
}

.container {
  padding: 16px;
  text-align: center;
  min-height: 100vh;
}
</style>
