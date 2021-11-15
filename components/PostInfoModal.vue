<template>
  <div @mousemove="mouseMove">
    <div
      v-show="modal"
      :style="`
        --bottomMove: ${bottomMoveS};
      `"
    >
      <div
        id="top_contents"
        :class="isModalAnim ? `top_contents__open` : `top_contents__close`"
      >
        <div id="photo">
          <img src="https://cdn.vuetifyjs.com/images/parallax/material.jpg">
        </div>
        <div id="button">
          <Button
            type="nml_sq"
            flat
            icon="mdi-chevron-left"
            :color="$vuetify.theme.themes[$vuetify.theme.dark ? 'dark' : 'light'].background_middle"
            class="mx-2 my-2"
            @click.native="close()"
          />
        </div>
      </div>
      <div
        id="bottom_contents"
        :class="isModalAnim ? `modal__open` : `modal__close`"
        :style="`bottom: ${bottomMoveS};`"
        @touchstart="touchStart"
        @touchmove="touchMove"
        @touchend="touchEnd"
      >
        <div id="button">
          <Button
            type="sml_sq"
            flat
            color="red"
            class="mx-2 my-2"
          >
            いいね {{ 123 }}
          </Button>
          <Button
            type="sml_sq"
            flat
            color="red"
            class="mx-2 my-2"
          >
            行ってみたい {{ 123 }}
          </Button>
        </div>
        <div
          id="modal"
          :style="`background-color: ${$vuetify.theme.themes[$vuetify.theme.dark ? 'dark' : 'light'].background_middle}`"
        >
          <div
            id="chip"
            @mousedown="mouseDown"
            @mouseup="mouseUp"
          />
          <div id="modal_contents">
            <p>modal contents</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Button from './Button.vue'
export default {
  components: { Button },

  model: {
    prop: 'modal',
    event: 'change-modal',
  },

  props: {
    modal: Boolean,
  },

  data () {
    return {
      isTop: true,
      isModalAnim: true,
      isMouseDown: false,
      startY: 0,
      topY: null,
      topMove: 0,
      topMoveS: '0px',
      bottomMove: 0,
      bottomMoveS: '0px',
    }
  },

  computed: {
    styles () {
      return {
        '--topMove': {
          type: String,
          default: this.topMoveS,
        },
        '--bottomMove': {
          type: String,
          default: this.bottomMoveS,
        },
      }
    },
  },

  watch: {
    modal (newmodal) {
      if (newmodal) {
        this.open()
      } else if (!newmodal) {
        this.close()
      }
    },
  },

  mounted () {
    document.querySelector('#bottom_contents').addEventListener('scroll', this.handleScroll)
  },

  destroyed () {
    document.querySelector('#bottom_contents').removeEventListener('scroll', this.handleScroll)
  },

  methods: {
    // common
    init () {
      this.isMouseDown = false
      this.topY = null
      this.modal_height = 0
      document.querySelector('#modal_contents').scrollIntoView(true)
      this.startY = 0
      this.bottomMove = 0
      this.bottomMoveS = 0
      document.body.classList.remove('modal-open')
      this.$emit('change-modal', false)
      // console.log('close')
    },
    close () {
      this.isModalAnim = false
      setTimeout(this.init, 235)
    },
    open () {
      // console.log('open')
      this.isModalAnim = true
      document.body.classList.add('modal-open')
      this.$emit('change-modal', true)
    },
    handleScroll () {
      const title = document.querySelector('#modal_contents')
      const rect = title.getBoundingClientRect().y
      if (this.topY == null) {
        this.topY = rect
      }
      if (rect >= this.topY) {
        this.isTop = true
      } else {
        this.isTop = false
      }
      // console.log('topY: ' + this.topY + ' rect: ' + rect)
    },

    // mobile
    touchStart (e) {
      this.startY = e.touches[0].pageY
    },
    touchMove (e) {
      if (this.isTop) {
        this.bottomMove = -1 * (e.touches[0].pageY - this.startY)
        this.bottomMoveS = this.bottomMove + 'px'
        if (this.bottomMove > 0) {
          this.bottomMove = 0
          this.bottomMoveS = this.bottomMove + 'px'
        }
        // console.log('move:' + this.bottomMoveS + '  height:' + window.outerHeight)
      }
    },
    touchEnd (e) {
      if (this.bottomMove < -1 * window.outerHeight / 8) {
        this.close()
      } else {
        this.bottomMove = 0
        this.bottomMoveS = this.bottomMove + 'px'
      }
    },

    // PC
    mouseDown (e) {
      this.startY = e.pageY
      this.isMouseDown = true
      // console.log('mouseDown')
    },
    mouseMove (e) {
      if (this.isMouseDown) {
        this.bottomMove = -1 * (e.pageY - this.startY)
        this.bottomMoveS = this.bottomMove + 'px'
        if (this.bottomMove > 0) {
          this.bottomMove = 0
          this.bottomMoveS = this.bottomMove + 'px'
        }
      }
    },
    mouseUp (e) {
      if (this.bottomMove < -1 * window.outerHeight / 8) {
        this.close()
      } else {
        this.bottomMove = 0
        this.bottomMoveS = this.bottomMove + 'px'
      }
      this.isMouseDown = false
      // console.log('mouseUp')
    },
  },
}
</script>

<style lang="scss" scoped>
/**上から出てくる要素 */
#top_contents {
  position: fixed;
  height: auto;
  width: auto;

  top: 0%;
  left: 50%;
  z-index: 2;

  transform: translateX(-50%);
}

.top_contents__open {
  animation-name: topOpen;
  animation-duration: 0.3s;
  animation-timing-function: ease;
}

.top_contents__close {
  animation-name: topClose;
  animation-duration: 0.3s;
  animation-timing-function: ease;
}

/**下要素を開くアニメーション */
@keyframes topOpen {
  0% {
    top: -100vh;
  }
  100% {
    top: 0%;
  }
}

@keyframes topClose {
  0% {
    top: 0vh;
  }
  100% {
    top: -100vh;
  }
}

#top_contents #button {
  position: absolute;
  height: auto;
  width: auto;

  top: 8px;
  left: 8px;
}

/**画像 */
#photo img {
  position: relative;
  height: calc(70vh + 24px);
  width: 100vw;
  object-fit: cover;

  border-radius: 0px 0px 16px 16px;
}

/**下から出てくる要素 */
#bottom_contents {
  position: fixed;
  display: block;
  height: auto;
  width: auto;

  bottom: 0%;
  left: 50%;
  z-index: 2;

  transform: translateX(-50%);

  overflow: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}

/**modal外に置く要素 */
#bottom_contents #button {
  height: auto;
  width: auto;

  margin-bottom: 16px;
  margin-right: 8px;

  text-align: right;
}

.modal__open {
  animation-name: modalOpen;
  animation-duration: 0.3s;
  animation-timing-function: ease;
}

.modal__close {
  animation-name: modalClose;
  animation-duration: 0.3s;
  animation-timing-function: ease;
}

/**下要素を開くアニメーション */
@keyframes modalOpen {
  0% {
    bottom: -100vh;
  }
  100% {
    bottom: 0%;
  }
}

@keyframes modalClose {
  0% {
    bottom: var(--bottomMove);
  }
  100% {
    bottom: -100vh;
  }
}

/**モダール */
#modal {
  position: relative;
  min-height: 30vh;
  width: 100vw;

  border-radius: 16px 16px 0px 0px;

  box-shadow: 0 10px 25px 0 #00214D;

  overflow: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}

/**上の飾り */
#chip {
  z-index: 2;
  position: sticky;
  top: 0px;
  height: 4px;
  width: 100%;

  padding-top: 8px;
  cursor: s-resize;
}

#chip::after {
  position: absolute;
  content: "";
  top: 8px;
  height: 4px;
  width: 40px;
  background-color: rgb(200, 200, 200);

  margin-left: calc(50% - 17.5px);

  border-radius: 10px;
}

/**メイン */
#modal_contents {
  padding: 16px;
}
</style>
