<template>
  <div>
    <v-btn
      v-if="isInstalled"
      dark
      height="36"
      depressed
      color="red"
      class="rounded-normal"
      @click="installApp()"
    >
      アプリをインストールする
    </v-btn>
  </div>
</template>

<script>
export default {
  data () {
    return {
      defferedPrompt: null,
    }
  },

  computed: {
    // インストール済みかどうか
    isInstalled () {
      if (window.matchMedia('(display-mode: standalone)').matches === false || window.navigator.standalone === false) {
        return true
      } else {
        return false
      }
    },
  },

  mounted () {
    // ページ読み込み時にインストールバナーを非表示にさせる
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault()
      this.defferedPrompt = e
      return false
    })
  },

  methods: {
    installApp () {
      this.defferedPrompt.prompt()
    },
  },
}
</script>

<style>

</style>
