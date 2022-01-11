<template>
  <div>
    <div id="contents">
      <div>
        <v-img
          :src="require(`../assets/fascino_title_logo${$vuetify.theme.dark ? '_dark' : ''}.svg`)"
          class="mx-auto mt-2"
          style="width: 40px; height: auto;"
        />
      </div>
      <div
        id="timeline"
      >
        <PostCard
          v-for="data in PostData"
          :key="data.id"
          :post-data="data"
        />
      </div>
      <div class="mx-auto">
        <Button
          flat
          :color="$vuetify.theme.themes[$vuetify.theme.dark ? 'dark' : 'light'].background"
          icon="mdi-arrow-down-thin-circle-outline"
          @click.native="$store.dispatch('rtdb/getPostData')"
        >
          ここを押してもっと読み込む
        </Button>
      </div>
    </div>
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

  computed: {
    PostData () {
      return this.$store.getters['rtdb/PostData']
    },
  },

  mounted () {
    this.$store.dispatch('rtdb/getPostData')
  },
}
</script>

<style>
#contents {
  display: grid;
  margin-bottom: 128px;

  grid-template-rows: 64px auto 64px;
}

#timeline {
  display: grid;
  width: min(100vw, 1600px);
  min-height: 100vh;
  margin-left: auto;
  margin-right: auto;
  padding: 16px 8px 8px 8px;

  grid-template-columns: repeat(auto-fill, min(100%, 480px));
  justify-content: center;
}

#post {
  position: fixed;
  z-index: 401;
  bottom: 72px;
  right: 16px;
}
</style>
