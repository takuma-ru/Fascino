<template>
  <div>
    <Button
      id="post"
      icon-color="text"
      color="green_lighten"
      icon="mdi-plus"
      type="lg_sq"
      @click.native="isPostModal = !isPostModal"
    />
    <PostModal v-model="isPostModal" style="position: fixed; z-index: 402" />
  </div>
</template>

<script>
export default {
  data () {
    return {
      isPostModal: false,
    }
  },
}
</script>

<style>
#post {
  position: fixed;
  z-index: 401;
  bottom: 72px;
  right: 16px;
}
</style>
