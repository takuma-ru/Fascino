<template>
  <Button
    type="sml"
    color="green_lighten"
    @click.native="!googleUserData ? signIn() : signOut()"
  >
    {{ googleUserData ? 'ログアウト' : 'ログイン' }}
  </Button>
</template>

<script>
export default {
  computed: {
    googleUserData () {
      return this.$store.getters['auth/googleUserData']
    },
  },

  methods: {
    signIn () {
      this.$store.dispatch('auth/signIn')
    },
    signOut () {
      this.$store.dispatch('auth/signOut')
    },
  },
}
</script>

<style>

</style>
