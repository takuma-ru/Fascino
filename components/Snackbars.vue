<template>
  <div class="snackbars_group">
    <div
      v-for="(item, index) in $store.getters['snackbar/alerts']"
      :key="index"
      :class="`snackbar_${item.type}`"
    >
      <div class="contents">
        <v-icon style="grid-column: 1" color="#001024">
          mdi-{{ item.type === 'success' ? 'check' : item.type === 'error' ? 'alert' : 'help' }}-circle-outline
        </v-icon>
        <p
          class="px-2 msg"
          v-text="item.msg"
        />
        <v-btn
          icon
          width="24px"
          height="24px"
          color="#315380"
          class="my-auto"
          style="grid-column: 3"
          @click="close(index)"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    close (index) {
      this.$store.dispatch('snackbar/removeAlertsItem', index)
    },
  },
}
</script>

<style lang="scss">
.snackbars_group {
  position: fixed;
  z-index: 500;
  width: min(calc(100vw - 32px), 960px);
  top: 16px;
  left: 50%;

  transform: translateX(-50%);
}

.snackbar {
  & {
    position: relative;
    width: min(calc(100vw - 32px), 960px);
    min-height: 40px;
    margin-top: 8px;

    border-radius: 16px;
    box-shadow: 0px 0px 6px 3px #00214D28;
  }

  $element: #{&};

  &_error {
    @extend #{$element};
    background-color: #FE8DA0;
  }

  &_success {
    @extend #{$element};
    background-color: #93ded2;
  }

  &_warn {
    @extend #{$element};
    background-color: #D6C565;
  }

  .contents {
    position: relative;
    display: grid;
    height: max-content;
    padding: 8px 16px 8px 16px ;

    grid-template-columns: 24px 1fr 24px;
  }

  .msg {
    grid-column: 2;
    margin: 0px;
    color: #001024;
    white-space: pre-wrap;
  }
}
</style>
