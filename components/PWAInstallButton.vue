<template>
  <div>
    <Button
      v-if="isInstalled"
      id="installBtn"
      type="nml"
      flat
      color="red"
      :text-color="$vuetify.theme.themes[$vuetify.theme.dark ? 'light' : 'dark'].text"
      @click.native="clickCallback()"
    >
      アプリをインストール
    </Button>
  </div>
</template>

<script>
// TODO: beforeinstallprompt（EventListener）をadd出来ない。ライフサイクルに問題がありそう。
export default {
  data () {
    return {
      deferredPrompt: null,
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

  beforeMount () {
    this.captureEvent()
  },

  methods: {
    async captureEvent () {
      await window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault()
        this.deferredPrompt = e
      })
    },
    clickCallback () {
      // Show the prompt
      this.deferredPrompt.prompt()
      this.deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          // Call another function?
        }
        this.deferredPrompt = null
      })
    },
  },
}
</script>
