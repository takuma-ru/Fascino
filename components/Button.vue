<template>
  <div>
    <v-btn
      :color="color"
      rounded
      depressed
      :to="link"
      @click="clickFunc"
    >
      <slot />
    </v-btn>
  </div>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: '',
    },
    link: {
      type: String,
      default: undefined,
    },
    // eslint-disable-next-line vue/require-default-prop
    clickFunc: Function,
  },
}
</script>

<style>

</style>
