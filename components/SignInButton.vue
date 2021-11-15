<template>
  <Button
    type="sml"
    color="green_lighten"
    @click.native="!userData ? signIn() : signOut()"
  >
    {{ userData ? 'ログアウト' : 'ログイン' }}
  </Button>
</template>

<script>
export default {
  computed: {
    userData () {
      return this.$store.getters['auth/userData']
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
