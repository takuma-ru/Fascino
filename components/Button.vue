<template>
  <div>
    <v-btn
      :min-height="btnStyle.height"
      :min-width="btnStyle.width"
      depressed
      x-small
      :color="color"
      :outlined="outlined"
      style="color: white"
      :class="`rounded-normal ${flat ? '': 'btn'}`"
      :to="link"
      :style="`
        font-size: ${btnStyle.fontSize}px;
        text-transform: none;
        color: ${!textColor ? $vuetify.theme.themes[$vuetify.theme.dark ? 'light' : 'dark'].background_front : textColor};
      `"
    >
      <v-icon
        v-if="icon"
        :size="btnStyle.fontSize"
        :color="ComIconColor"
      >
        {{ icon }}
      </v-icon>
      <slot />
    </v-btn>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'nml',
    },
    flat: {
      type: Boolean,
      default: false,
    },
    outlined: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      default: null,
    },
    color: {
      type: String,
      default: null,
    },
    iconColor: {
      type: String,
      default: null,
    },
    textColor: {
      type: String,
      default: null,
    },
    link: {
      type: String,
      default: undefined,
    },
    clickFunc: {
      type: Function,
      default: undefined,
    },

  },

  computed: {
    ComIconColor () {
      if (this.iconColor) {
        return this.iconColor
      } else if (this.outlined) {
        return this.color
      } else {
        return this.$vuetify.theme.themes[this.$vuetify.theme.dark ? 'light' : 'dark'].background_front
      }
    },

    // eslint-disable-next-line vue/return-in-computed-property
    btnStyle () {
      switch (this.type) {
        case 'sml':
          return ({
            height: 36,
            width: 'auto',
            fontSize: 16,
          })
        case 'sml_sq':
          return ({
            height: 36,
            width: 36,
            fontSize: 16,
          })
        case 'nml':
          return ({
            height: 48,
            width: 'auto',
            fontSize: 24,
          })
        case 'nml_sq':
          return ({
            height: 48,
            width: 48,
            fontSize: 24,
          })
        case 'lg':
          return ({
            height: 64,
            width: 'auto',
            fontSize: 32,
          })
        case 'lg_sq':
          return ({
            height: 64,
            width: 64,
            fontSize: 32,
          })
        default:
          break
      }
    },
  },
}
</script>

<style>
.btn {
  box-shadow: 0px 0px 6px 3px #00214D28;
}
</style>
