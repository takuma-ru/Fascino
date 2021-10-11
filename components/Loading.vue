<template>
  <v-container
    v-if="loading"
    class="loading"
  >
    <div class="contents">
      now loading ...
    </div>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    loading: false,
  }),

  methods: {
    start () {
      this.loading = true
    },
    finish () {
      this.loading = false
    },
  },
}
</script>

<style>
  .loading {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 50%;
    left: 50%;

    transform: translate(-50%, -50%);
    z-index: 99;

    background-color: #0000003a;
  }

  .contents {
    position: absolute;
    top: 50%;
    left: 50%;

    color: #FFFFFE;

    transform: translate(-50%, -50%);
  }
</style>
