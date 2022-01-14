<template>
  <section
    style="
      font-family: 'SmartFontUI';
      cursor: default;
    "
    @mousemove="mouseMove"
  >
    <div
      v-show="modal"
      :style="`
        --bottomMove: ${bottomMoveS};
      `"
    >
      <div
        id="back_contents"
        @click="close()"
      />
      <div
        id="top_contents"
        :class="isModalAnim ? `top_contents__open` : `top_contents__close`"
      >
        <div id="photo">
          <img
            :src="imgURL"
            :style="`height: calc((100vh - ${modalHeight}px) + 24px);`"
          >
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
            type="nml_sq"
            :flat="isLikeInList"
            :outlined="!isLikeInList"
            icon="mdi-heart"
            color="red"
            class="mx-2 my-2"
            @click.native="pushLike() "
          >
            &nbsp;{{ likeList ? likeList.length : 0 }}
          </Button>
          <Button
            type="nml_sq"
            :flat="isWentInList"
            :outlined="!isWentInList"
            icon="mdi-hail"
            color="green"
            class="mx-2 my-2"
            @click.native="pushWent()"
          >
            &nbsp;行きたい！ {{ wentList ? wentList.length : 0 }}
          </Button>
        </div>
        <div
          id="modal"
          ref="modal"
          :style="`background-color: ${$vuetify.theme.themes[$vuetify.theme.dark ? 'dark' : 'light'].background_middle}`"
        >
          <div
            id="chip"
            @mousedown="mouseDown"
            @mouseup="mouseUp"
          />
          <div id="modal_contents">
            <v-list rounded color="transparent">
              <v-list-item
                class="grow px-0"
                style="cursor: pointer;"
              >
                <v-list-item-avatar
                  color="grey darken-3"
                  size="32"
                  @click="$router.push('/account/' + postData.uid)"
                >
                  <v-img
                    alt=""
                    :src="postedUserData.photoURL"
                  />
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title
                    style="font-size: 24px;"
                    @click="$router.push('/account/' + postData.uid)"
                  >
                    {{ postedUserData.name }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-divider class="my-2" />
              <div
                class="detail"
                style="white-space: pre-line"
                v-text="postData.detail"
              />
              <div class="pt-2">
                <v-chip
                  v-for="tag in postData.tags"
                  :key="tag"
                  class="mr-2 mb-2"
                  :color="$vuetify.theme.themes[$vuetify.theme.dark ? 'light' : 'dark'].sub_text"
                  v-text="tag"
                />
              </div>
              <div
                class="coordinate"
                :style="`color: ${$vuetify.theme.themes[$vuetify.theme.dark ? 'dark' : 'light'].sub2_text};`"
              >
                <v-icon>mdi-map-marker</v-icon>
                <span v-text="location" />
              </div>
            </v-list>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  model: {
    prop: 'modal',
    event: 'change-modal',
  },

  props: {
    modal: Boolean,
    postData: {
      type: Object,
      default: null,
    },
    postedUserData: {
      type: Object,
      default: null,
    },
  },

  data () {
    return {
      likeList: [],
      wentList: [],
      isLike: false,
      isWent: false,
      isLikeInList: false,
      isWentInList: false,
      uid: '',
      location: '',

      isTop: true,
      isModalAnim: true,
      isMouseDown: false,
      startY: 0,
      topY: null,
      topMove: 0,
      topMoveS: '0px',
      bottomMove: 0,
      bottomMoveS: '0px',
      imgURL: null,
      modalHeight: null,
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
    async getThispostData () {
      const dbRef = this.$fire.database.ref('posts')
      await dbRef.child(this.postData.id).get().then((snapshot) => {
        if (snapshot.exists()) {
          this.likeList = snapshot.val().likesSum ? snapshot.val().likesSum : []
          this.wentList = snapshot.val().wentSum ? snapshot.val().wentSum : []
          this.isLikeInList = this.likeList.includes(this.uid) === undefined ? false : this.likeList?.includes(this.uid)
          this.isWentInList = this.wentList.includes(this.uid) === undefined ? false : this.wentList?.includes(this.uid)
        }
      }).catch((error) => {
        console.error(error)
      })
    },

    checkLikeInList () {
      this.getThispostData()
    },

    checkWentInList () {
      this.getThispostData()
    },

    async pushLike () {
      await this.$store.dispatch('rtdb/likeChange', { PostDataId: this.postData.id })
      this.checkLikeInList()
    },

    async pushWent () {
      await this.$store.dispatch('rtdb/wentChange', { PostDataId: this.postData.id })
      this.checkWentInList()
    },

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
    },
    close () {
      this.isModalAnim = false
      setTimeout(this.init, 235)
      document.documentElement.style.overflowY = 'auto'
    },
    async open () {
      this.isModalAnim = true
      document.documentElement.style.overflowY = 'hidden'
      document.body.classList.add('modal-open')
      this.$emit('change-modal', true)
      this.uid = this.$store.getters['auth/googleUserData'].uid
      this.checkLikeInList()
      this.checkWentInList()
      this.$nextTick(() => {
        const modal = document.querySelector('#modal')
        const rect = modal.offsetHeight
        this.modalHeight = rect
      })
      await this.$store.dispatch('geolocation/getReverseGeo', {
        lat: this.postData.imgCoordinate[0],
        lng: this.postData.imgCoordinate[1],
      }).then((res) => {
        this.location = res
      })
      await this.$store.dispatch('storage/getFileUrl', this.postData.imgName).then((res) => {
        this.imgURL = res
      })
    },
    handleScroll () {
      let rect = 0
      this.$nextTick(() => {
        const title = document.querySelector('#modal_contents')
        rect = title.getBoundingClientRect().y
      })
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
/**背景 */
#back_contents {
  position: fixed;
  background: #00214D6E;
  height: 100vh;
  width: 100vw;

  top: 0%;
  left: 50%;
  z-index: 402;

  transform: translateX(-50%);
}

/**上から出てくる要素 */
#top_contents {
  position: fixed;
  height: auto;
  width: auto;

  top: 0%;
  left: 50%;
  z-index: 403;

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
  width: min(100vw, 960px);
  background-color: #DEDEDE;
  object-fit: cover;

  border-radius: 0px 0px 16px 16px;
  box-shadow: 0px 0px 6px 3px #00214D28;
}

/**下から出てくる要素 */
#bottom_contents {
  position: fixed;
  display: block;
  height: auto;
  width: auto;

  bottom: 0%;
  left: 50%;
  z-index: 403;

  transform: translateX(-50%);

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
  max-height: 50vh;
  width: min(100vw, 960px);

  border-radius: 16px 16px 0px 0px;

  box-shadow: 0px 0px 6px 3px #00214D28;

  -ms-overflow-style: none;
  scrollbar-width: none;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}

/**上の飾り */
#chip {
  z-index: 403;
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
  position: relative;
  padding: 16px;
}

.detail {
  max-height: 20vh;
  width: 100%;

  font-size: 16px;
  overflow-y: scroll;
}

.detail::-webkit-scrollbar {
  width: 5px;
}

/*スクロールバーの軌道*/
.detail::-webkit-scrollbar-track {
  border-radius: 10px;
  background-color: rgb(200, 200, 200, .3);
}

/*スクロールバーの動く部分*/
.detail::-webkit-scrollbar-thumb {
  background-color: rgba(200, 200, 200);
  border-radius: 10px;
}
</style>
