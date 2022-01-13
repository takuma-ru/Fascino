<template>
  <div class="postmodal">
    <swipemodal
      ref="nekooModal"
      v-model="_modal"
      :color="$vuetify.theme.themes[$vuetify.theme.dark ? 'dark' : 'light'].background_middle"
      fullscreen
      width="min(100vw, 960px)"
      radius="16px"
    >
      <v-stepper
        v-model="el"
        style="background-color: rgba(0,0,0,0);"
        :color="$vuetify.theme.themes[$vuetify.theme.dark ? 'dark' : 'light'].background_middle"
        flat
      >
        <v-stepper-header
          style="display: none;"
        >
          <v-stepper-step
            :complete="el > 1"
            step="1"
          />
          <v-divider />
          <v-stepper-step
            :complete="el > 2"
            step="2"
          />
        </v-stepper-header>
        <v-stepper-items>
          <v-stepper-content
            class="px-4 pb-8"
            step="1"
          >
            <v-container>
              <v-row
                justify="space-between"
              >
                <v-col class="px-0">
                  <Button
                    flat
                    type="sml"
                    color="green"
                    @click.native="closeModal()"
                  >
                    戻 る
                  </Button>
                </v-col>
                <v-spacer />
                <v-col
                  class="px-0"
                  style="text-align: right;"
                >
                  <Button
                    flat
                    type="sml"
                    color="green"
                    @click.native="nextStep()"
                  >
                    次 へ
                  </Button>
                </v-col>
              </v-row>
              <v-row
                v-if="isActive"
                class="rounded-xl"
                style="height: 30vh; background-color: #929292;"
              >
                <div class="selectImg">
                  写真を選ぶ
                </div>
                <v-file-input
                  ref="refImage"
                  v-model="image"
                  class="fileInput"
                  style="padding-top: 0;"
                  accept=".png, .jpeg, .jpg"
                  hide-input
                  prepend-icon=""
                  @change="isActive = !isActive"
                >
                  <template #append-outer>
                    <v-btn
                      icon
                      x-large
                      @click="imgInput"
                    >
                      <v-icon
                        color="#F0F0F0"
                        size="64px"
                      >
                        mdi-plus
                      </v-icon>
                    </v-btn>
                  </template>
                </v-file-input>
              </v-row>
              <v-row
                v-else
              >
                <v-img
                  id="spotImg"
                  class="rounded-xl"
                  max-height="50vh"
                  width="100%"
                  :src="url"
                />
                <v-file-input
                  ref="refImage"
                  v-model="image"
                  class="fileInput2"
                  accept=".png, .jpeg, .jpg"
                  hide-input
                  prepend-icon=""
                >
                  <template #append-outer>
                    <Button
                      flat
                      style="margin: auto;
                            position: absolute;
                            bottom: 2%;
                            left: 50%;
                            transform: translate(-50%);"
                      color="green"
                      text-color="text"
                      @click.native="imgInput"
                    >
                      選びなおす
                    </Button>
                  </template>
                </v-file-input>
              </v-row>
              <v-row id="selectMessage">
                {{ imgErrMessage }}
              </v-row>
            </v-container>
          </v-stepper-content>
          <v-stepper-content
            class="px-4"
            step="2"
          >
            <v-container>
              <v-row
                justify="space-between"
              >
                <v-col class="px-0">
                  <Button
                    flat
                    type="sml"
                    color="green"
                    @click.native="el = 1"
                  >
                    戻 る
                  </Button>
                </v-col>
                <v-spacer />
                <v-col
                  class="px-0"
                  style="text-align: right;"
                >
                  <Button
                    flat
                    type="sml"
                    color="green"
                    @click.native="submit()"
                  >
                    投 稿
                  </Button>
                </v-col>
              </v-row>
              <v-row>
                <v-col class="px-0">
                  <v-text-field
                    id="text-field"
                    v-model="Detail"
                    :error-messages="detailError"
                    placeholder="魅力や感想を伝えましょう！"
                    auto-grow
                    outlined
                    clearable
                    color="green"
                    style="word-break: break-all; white-space: normal;"
                    @input="$v.Detail.$touch()"
                    @blur="$v.Detail.$touch()"
                  >
                    <template #label>
                      <p style="font-size: 20px;">
                        内容
                      </p>
                    </template>
                  </v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col class="px-0">
                  <v-combobox
                    v-model="Tag"
                    hide-selected
                    :error-messages="tagError"
                    hint="最大5個 (タグとタグの間には半角スペースを入れてください)"
                    multiple
                    outlined
                    color="green"
                    clearable
                    deletable-chips
                    hide-no-data
                    placeholder="例) タグ1 タグ2"
                    persistent-hint
                    small-chips
                    @input="$v.Tag.$touch()"
                    @blur="$v.Tag.$touch()"
                  >
                    <v-icon
                      slot="append"
                    />
                    <template #label>
                      <p style="font-size: 20px;">
                        タグ
                      </p>
                    </template>
                  </v-combobox>
                </v-col>
              </v-row>
              <v-row>
                <v-col
                  v-if="isActive2"
                  class="px-0"
                >
                  <v-text-field
                    persistent-hint
                    hint="タップして地図から選択してください！"
                    clearable
                    :error-messages="postPlaceError"
                    readonly
                    color="green"
                    outlined
                    @click="openModal($event), getLocation()"
                  >
                    <template #label>
                      <p style="font-size: 20px;">
                        撮影場所
                      </p>
                    </template>
                  </v-text-field>
                </v-col>
                <v-col
                  v-else
                >
                  <l-map
                    class="rounded-xl"
                    style="height: 30vh; pointer-events: none;"
                    :zoom="map.zoom"
                    :center="[map.marker.latitude, map.marker.longitude]"
                    :options="map.options"
                  >
                    <l-tile-layer
                      style="pointer-events: none;"
                      :url="map.tileLayer.url"
                      :attribution="map.tileLayer.attribution"
                    />
                    <l-marker
                      style="pointer-events: none;"
                      :lat-lng="[map.marker.latitude, map.marker.longitude]"
                      :icon="icon"
                    />
                  </l-map>
                  <Button
                    flat
                    style="text-align: center;"
                    class="mt-2"
                    color="green"
                    text-color="text"
                    @click.native="openModal($event), getLocation(), isActive2 = !isActive2"
                  >
                    選びなおす
                  </Button>
                </v-col>
              </v-row>
              <v-row>
                <v-dialog
                  v-model="mapDialog"
                  style=" position: absolute; z-index: 500;"
                  fullscreen
                  transition="dialog-top-transition"
                >
                  <l-map
                    ref="lmap"
                    :zoom.sync="map.zoom"
                    :center="map.center"
                    :options="map.options"
                    @drag="mapDrag($event)"
                  >
                    <l-tile-layer
                      :url="map.tileLayer.url"
                      :attribution="map.tileLayer.attribution"
                    />
                    <Button
                      id="here"
                      type="lg_sq"
                      flat
                      text-color="text"
                      color="red"
                      @click.native="thisPlace=true"
                    >
                      &nbsp;決定&nbsp;
                    </Button>
                    <v-dialog
                      v-model="thisPlace"
                      style="border-radius: 16px;"
                    >
                      <v-card
                        class="rounded-normal"
                        :color="$vuetify.theme.themes[$vuetify.theme.dark ? 'dark' : 'light'].background_middle"
                      >
                        <v-card-title>
                          スポットの確認
                        </v-card-title>
                        <v-card-text class="pb-2">
                          この場所でよろしいですか？
                        </v-card-text>
                        <v-card-actions class="py-4">
                          <Button
                            flat
                            type="nml"
                            color="red_lighten"
                            text-color="text"
                            @click.native="thisPlace=false"
                          >
                            いいえ
                          </Button>
                          <v-spacer />
                          <Button
                            flat
                            type="nml"
                            color="green"
                            text-color="text"
                            @click.native="mapDialog=false, isActive2 = !isActive2"
                          >
                            &nbsp;はい&nbsp;
                          </Button>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                    <l-marker
                      :lat-lng="[map.marker.latitude, map.marker.longitude]"
                      :icon="icon"
                    />

                    <Button
                      id="nowPlace"
                      flat
                      icon="mdi-crosshairs-gps"
                      type="lg_sq"
                      color="blue"
                      icon-color="text"
                      @click.native="getLocation()"
                    />
                    <Button
                      id="close"
                      type="lg_sq"
                      flat
                      icon="mdi-close"
                      :color="$vuetify.theme.themes[$vuetify.theme.dark ? 'dark' : 'light'].background_middle"
                      class="mx-2 my-2"
                      @click.native="mapDialog = false"
                    />
                  </l-map>
                </v-dialog>
              </v-row>
            </v-container>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </swipemodal>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, maxLength } from 'vuelidate/lib/validators'
import L from 'leaflet'
import swipemodal from 'nekoo_vue_swipemodal'
import iconImg from '../static/icon/target.svg'
import spoticonImg from '../static/icon/map-marker-star.svg'
import 'nekoo_vue_swipemodal/dist/swipemodal.css'

const spotValidators = (value) => {
  return value === false
}
export default {
  name: 'PostModal',

  components: {
    swipemodal,
  },

  mixins: [validationMixin],

  validations: {
    Detail: { required, maxLength: maxLength(140) },
    Tag: { required },
    isActive2: { spotValidators },
    image: { required },
  },
  model: {
    prop: 'modal',
    event: 'change',
  },
  props: {
    modal: {
      type: Boolean,
      default: false,
    },
  },
  data () {
    return {
      map: {
        center: [38.9245985, 141.106909],
        zoom: 17,
        marker: {
          latitude: 38.9245985,
          longitude: 141.106909,
        },
        options: {
          zoomControl: false,
          zoomSnap: 0.5,
        },
        tileLayer: {
          attribution: '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors',
          url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        },
      },
      Detail: '', // 投稿文
      thisPlace: false,
      mapDialog: false,
      isActive: true,
      isActive2: true,
      Tag: [], // 投稿タグ
      search: null,
      el: 1,
      image: null,
      imgErrMessage: '',
      icon: L.icon({
        iconUrl: iconImg,
        iconSize: [64, 64],
        iconAnchor: [32, 32],
      }),
      spotIcon: L.icon({
        iconUrl: spoticonImg,
        iconSize: [64, 64],
        iconAnchor: [32, 32],
      }),
      options: {
        timeout: 5000,
        maximumAge: 0,
        enableHighAccuracy: true,
      },
    }
  },
  computed: {
    url () {
      // eslint-disable-next-line no-useless-return
      if (this.image === null) { return } else { return URL.createObjectURL(this.image) }
    },
    _modal: {
      get () {
        return this.modal
      },
      set (value) {
        this.$emit('change', value)
      },
    },
    detailError () {
      const errors = []
      if (!this.$v.Detail.$dirty) { return errors }
      !this.$v.Detail.maxLength && errors.push('140字以下で入力してください。')
      !this.$v.Detail.required && errors.push('入力必須')
      return errors
    },
    tagError () {
      const errors = []
      if (!this.$v.Tag.$dirty) { return errors }
      !this.$v.Tag.required && errors.push('入力必須')
      return errors
    },
    postPlaceError () {
      const errors = []
      if (!this.$v.isActive2.$dirty) { return errors }
      !this.$v.isActive2.required && errors.push('選択必須')
      return errors
    },
  },
  watch: {
    model (val) {
      if (val.length > 5) {
        this.$nextTick(() => this.model.pop())
      }
    },
    isActive (newisActive) {
      if (!newisActive) { this.imgErrMessage = '' }
    },
    // eslint-disable-next-line camelcase
    _modal (new_modal) {
      // eslint-disable-next-line camelcase
      if (new_modal) { this.el = 1 }
    },
  },
  methods: {
    clear () {
      this.Detail = ''
      this.Tag = []
      this.center = []
      this.image = null
      this.$v.$reset()
      this.isActive = true
      this.isActive2 = true
      this.imgErrMessage = ''
    },
    submit () {
      this.$v.$touch()
      if (this.$v.$invalid === false) {
        this.$store
          .dispatch('rtdb/updataPostData', {
            detail: this.Detail,
            tags: this.Tag,
            imgCoordinate: [
              this.map.marker.latitude,
              this.map.marker.longitude,
            ],
            img: this.image,
          })
          .then(this.$store.dispatch('snackbar/addAlertsItem', {
            type: 'success',
            msg: '投稿しました！',
          }), this.closeModal())
          .catch((e) => {
            return this.$store.dispatch('snackbar/addAlertsItem', {
              type: 'error',
              msg: e,
            })
          })
      }
    },
    nextStep () {
      if (this.isActive) { this.imgErrMessage = '選択必須' } else { this.el = 2 }
    },
    closeModal () {
      this.$refs.nekooModal.close()
      this.clear()
    },
    imgInput () {
      this.$refs.refImage.$el.querySelector('input').click()
    },
    getLocation () {
      if (!navigator.geolocation) {
        this.$store.dispatch('snackbar/addAlertsItem', {
          type: 'error',
          msg: 'お使いのブラウザは対応していません',
        })
      }
      navigator.geolocation.getCurrentPosition((position) => {
        this.map.center = [
          position.coords.latitude,
          position.coords.longitude,
        ]
        console.log('現在地取得成功')
        this.map.marker.latitude = position.coords.latitude
        this.map.marker.longitude = position.coords.longitude
        this.map.zoom = 17
      }, console.log('現在地取得失敗'), this.options)
    },
    mapDrag ($event) {
      const center = $event.target.getCenter()
      this.map.marker.latitude = center.lat
      this.map.marker.longitude = center.lng
    },
    async openModal () {
      this.mapDialog = true
      await this.$nextTick()
      this.$refs.lmap.mapObject.invalidateSize()
    },
  },
}
</script>
<style lang="scss" scoped>
.fileInput {
  height:50%;
  position: absolute;
  top: calc(70% + 10px);
  left: 50%;
  transform: translate(-50%, -50%);
}
#selectMessage {
  color: #FF5470;
  position: absolute;
  font-size: 24px;
  text-decoration:underline;
  text-decoration-color:#FF5470;
  z-index: 402;
  left: 50%;
  bottom: 0%;
  transform: translate(-34%, -24%);
}
.selectImg {
  color: #F0F0F0;
  font-size: 24px;
  position: absolute;
  top: calc(50% + 60px);
  left: calc(50% + 5px);
  transform: translate(-50%);
}
#here {
  position: fixed;
  z-index: 500;
  left: 50%;
  bottom: 24px;
  transform: translate(-50%, 0);

}
#nowPlace {
  position: fixed;
  z-index: 402;
  bottom: 24px;
  right: 16px;
}
#close {
  position: fixed;
  z-index: 402;
  top: 24px;
  right: 16px;
}
</style>
