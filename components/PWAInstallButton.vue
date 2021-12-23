<template>
  <div>
    <Button
      v-if="isInstalled"
      type="nml"
      flat
      color="red"
      :text-color="$vuetify.theme.themes[$vuetify.theme.dark ? 'light' : 'dark'].text"
      @click.native="installApp()"
    >
      インストールする
    </Button>
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

  created () {
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
