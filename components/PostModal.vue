<template>
  <div class="postmodal">
    <!-- <v-container>
      <v-row>
        <Button
          :color="$vuetify.theme.themes[$vuetify.theme.dark ? 'dark' : 'light'].text"
          icon="mdi-plus"
          type="lg"
          @click.native="modal = true"
        />
      </v-row>
    </v-container> -->
    <swipemodal
      v-model="modal"
      :color="$vuetify.theme.themes[$vuetify.theme.dark ? 'dark' : 'light'].background_middle"
      fullscreen
      width="100%"
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
            class="px-0 pb-8"
            step="1"
          >
            <v-container style="padding: 12px;">
              <v-row
                class="mb-2"
                justify="space-between"
              >
                <v-col>
                  <Button
                    type="nml"
                    color="green"
                    @click.native="modal = false"
                  >
                    戻 る
                  </Button>
                </v-col>
                <v-spacer />
                <v-col
                  style="text-align: right;"
                >
                  <Button
                    type="nml"
                    color="green"
                    @click.native="el = 2"
                  >
                    次 へ
                  </Button>
                </v-col>
              </v-row>
              <v-row
                v-if="isActive"
                class="mx-4 my-0 rounded-xl"
                style="height: 30vh; background-color: #929292"
              >
                <p class="selectImg">
                  写真を選ぶ
                </p>
                <v-file-input
                  ref="refImage"
                  v-model="image"
                  class="fileInput"
                  accept="image/*"
                  hide-input
                  prepend-icon=""
                  @change="active"
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
                style="margin: 0"
              >
                <v-img
                  id="spotImg"
                  class="rounded-xl"
                  max-height="50vh"
                  :src="url"
                />
                <v-file-input
                  ref="refImage"
                  v-model="image"
                  class="fileInput2"
                  accept="image/*"
                  hide-input
                  prepend-icon=""
                >
                  <template #append-outer>
                    <Button
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
            </v-container>
          </v-stepper-content>
          <v-stepper-content
            class="px-0"
            step="2"
          >
            <v-container>
              <v-row
                justify="space-between"
              >
                <v-col>
                  <Button
                    type="nml"
                    color="green"
                    @click.native="el = 1"
                  >
                    戻 る
                  </Button>
                </v-col>
                <v-spacer />
                <v-col
                  style="text-align: right;"
                >
                  <Button
                    type="nml"
                    color="green"
                    @click.native="modal = false"
                  >
                    投 稿
                  </Button>
                </v-col>
              </v-row>
              <v-row>
                <v-col class="pb-0">
                  <v-text-field
                    id="text-field"
                    placeholder="魅力や感想を伝えましょう！"
                    auto-grow
                    outlined
                    clearable
                    color="green"
                    style="word-break: break-all; white-space: normal;"
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
                <v-col class="pb-0">
                  <v-combobox
                    v-model="model"
                    hide-selected
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
                  class="pb-0"
                >
                  <v-text-field
                    persistent-hint
                    hint="タップして地図から選択してください！"
                    auto-grow
                    clearable
                    readonly
                    color="green"
                    outlined
                    @click="mapDialog=true, getLocation()"
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
                    :zoom="zoom"
                    :center="NowPlace"
                    :options="{zoomControl: false}"
                  >
                    <l-tile-layer
                      :url="mapUrl"
                      :attribution="attribution"
                    >
                      <l-marker
                        :lat-lng="NowPlace"
                        :icon="icon"
                      />
                    </l-tile-layer>
                  </l-map>
                  <Button
                    style="text-align: center;"
                    class="mt-2"
                    color="green"
                    text-color="text"
                    @click.native="mapDialog=true, getLocation(), active2()"
                  >
                    選びなおす
                  </Button>
                </v-col>
              </v-row>
              <v-row>
                <v-dialog
                  v-model="mapDialog"
                  fullscreen
                  transition="dialog-top-transition"
                >
                  <l-map
                    :zoom="zoom"
                    :center.sync="NowPlace"
                    :options="{zoomControl: false}"
                  >
                    <l-tile-layer
                      :url="mapUrl"
                      :attribution="attribution"
                    />
                    <l-marker
                      :lat-lng="NowPlace"
                      :icon="icon"
                      @click="thisPlace=true"
                    />

                    <v-dialog
                      v-model="thisPlace"
                    >
                      <v-card>
                        <v-card-title>
                          スポットの確認
                        </v-card-title>
                        <v-card-text class="pb-2">
                          この場所を追加しますか？
                        </v-card-text>
                        <v-card-actions>
                          <Button
                            type="lg"
                            color="green"
                            text-color="text"
                            @click.native="thisPlace=false"
                          >
                            いいえ
                          </Button>
                          <v-spacer />
                          <Button
                            type="lg"
                            color="green"
                            text-color="text"
                            @click.native="mapDialog=false, active2()"
                          >
                            追 加
                          </Button>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>

                    <l-control position="bottomright">
                      <Button
                        id="nowPlace"
                        icon="mdi-crosshairs-gps"
                        type="lg_sq"
                        color="blue"
                        icon-color="text"
                        @click.native="getLocation"
                      />
                    </l-control>
                    <l-control>
                      <Button
                        type="lg_sq"
                        color="blue"
                        icon="mdi-close"
                        text-color="text"
                        @click.native="mapDialog=false"
                      />
                    </l-control>
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
import L from 'leaflet'
import swipemodal from 'nekoo_vue_swipemodal'
import iconImg from '../static/icon/target.svg'
import spoticonImg from '../static/icon/map-marker-star.svg'
import 'nekoo_vue_swipemodal/dist/swipemodal.css'
import Button from './Button.vue'

export default {
  name: 'PostModal',

  components: {
    swipemodal,
    Button,
  },
  data () {
    return {
      thisPlace: false,
      mapDialog: false,
      modal: false,
      isActive: true,
      isActive2: true,
      model: [],
      search: null,
      el: 1,
      image: null,
      zoom: 18,
      mapUrl: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      NowPlace: [0, 0],
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
    }
  },
  computed: {
    url () {
      // eslint-disable-next-line no-useless-return
      if (this.image === null) { return } else { return URL.createObjectURL(this.image) }
    },
  },
  watch: {
    model (val) {
      if (val.length > 5) {
        this.$nextTick(() => this.model.pop())
      }
    },
  },
  methods: {
    openModal () {
      this.modal = true
    },
    imgInput () {
      this.$refs.refImage.$el.querySelector('input').click()
    },
    active () {
      this.isActive = !this.isActive
    },
    active2 () {
      this.isActive2 = !this.isActive2
    },
    getLocation () {
      if (!navigator.geolocation) {
        alert('ERROR')
      }

      const options = {
        enableHighAccuracy: false,
        timeout: 5000,
        maximumAge: 0,
      }

      navigator.geolocation.getCurrentPosition(this.success, this.error, options)
    },

    success (position) {
      const coords = position.coords
      this.NowPlace = [coords.latitude, coords.longitude]
    },

    error () {
      alert('ERROR')
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
.selectImg {
  color: #F0F0F0;
  font-size: 24px;
  position: absolute;
  top: calc(50% + 60px);
  left: 50%;
  transform: translate(-50%);
}
</style>
