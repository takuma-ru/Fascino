<template>
  <div>
    <v-container>
      <v-row>
        <Button
          :color="$vuetify.theme.themes[$vuetify.theme.dark ? 'dark' : 'light'].text"
          icon="mdi-plus"
          type="lg"
          @click.native="modal = true"
        />
      </v-row>
    </v-container>
    <swipemodal
      v-model="modal"
      :color="$vuetify.theme.themes[$vuetify.theme.dark ? 'dark' : 'light'].background_middle"
      fullscreen
      width="100%"
      radius="16px"
    >
      <v-stepper
        v-model="el"
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
            class="px-0"
            step="1"
          >
            <v-container>
              <v-row
                class="mb-2"
                justify="space-between"
              >
                <v-col
                  class="ml-2"
                >
                  <Button
                    type="nml"
                    color="green"
                    @click.native="modal = false"
                  >
                    戻る
                  </Button>
                </v-col>
                <v-spacer />
                <v-col
                  style="text-align: right;"
                  class="mr-2"
                >
                  <Button
                    type="nml"
                    color="green"
                    @click.native="el = 2"
                  >
                    次へ
                  </Button>
                </v-col>
              </v-row>
              <v-row
                color=""
                class="mx-2 my-0 rounded-xl"
                style="height: 30vh;"
              >
                <p class="selectImg">
                  写真を選ぶ
                </p>
                <v-file-input
                  v-if="isActive"
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
                        size="60px"
                      >
                        mdi-plus
                      </v-icon>
                    </v-btn>
                  </template>
                </v-file-input>
                <v-img
                  v-else
                  class="ma-auto"
                  max-height="500px"
                  :src="url"
                  @click="active"
                />
              </v-row>
            </v-container>
          </v-stepper-content>
          <v-stepper-content
            class="px-0"
            step="2"
          >
            <v-container>
              <v-row
                class="my-20"
                justify="space-between"
              >
                <v-col>
                  <Button
                    type="nml"
                    color="green"
                    @click.native="el = 1"
                  >
                    戻る
                  </Button>
                </v-col>
                <v-spacer />
                <v-col
                  style="text-align: right;"
                >
                  <Button
                    type="nml"
                    color="green"
                  >
                    投稿
                  </Button>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-textarea
                    label="内容"
                    auto-grow
                    outlined
                    rows="1"
                    row-height="5"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-combobox
                    v-model="model"
                    :search-input.sync="search"
                    hide-selected
                    hint="Maximum of 5 tags"
                    label="Add some tags"
                    multiple
                    hide-no-data
                    persistent-hint
                    small-chips
                  >
                    <v-icon
                      slot="append"
                    />
                    <template #no-data>
                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title>
                            No results matching "<strong>{{ search }}</strong>". Press <kbd>enter</kbd> to create a new one
                          </v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                    </template>
                  </v-combobox>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-textarea
                    v-col
                    label="撮影場所"
                    auto-grow
                    outlined
                    rows="1"
                    row-height="5"
                  />
                </v-col>
              </v-row>
            </v-container>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </swipemodal>
  </div>
</template>

<script>
import swipemodal from 'nekoo_vue_swipemodal'
import 'nekoo_vue_swipemodal/dist/swipemodal.css'

export default {
  name: 'PostModal',

  components: {
    swipemodal,
  },

  data () {
    return {
      model: [],
      search: null,
      el: 1,
      image: null,
      modal: false,
      isActive: true,
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
    imgInput () {
      this.$refs.refImage.$el.querySelector('input').click()
    },
    active () {
      this.isActive = !this.isActive
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
  font-size: 24px;
  position: absolute;
  top: calc(50% + 60px);
  left: 50%;
  transform: translate(-50%);
}
</style>
