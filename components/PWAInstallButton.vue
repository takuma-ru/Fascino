<template>
  <div>
    <Button
      v-if="isInstalled"
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

  mounted () {
    this.captureEvent()
  },

  methods: {
    captureEvent () {
      window.addEventListener('beforeinstallprompt', (e) => {
        // ! Prevent Chrome 67 and earlier from automatically showing the prompt
        e.preventDefault()
        // Stash the event so it can be triggered later.
        this.deferredPrompt = e
      })
    },
    clickCallback () {
      // Show the prompt
      this.deferredPrompt.prompt()
      // Wait for the user to respond to the prompt
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

<style>

</style>
