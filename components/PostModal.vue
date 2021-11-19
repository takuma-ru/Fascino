<template>
  <div>
    <v-container>
      <v-row>
        <!-- colを減らせ！！！！！ -->
        <v-col>
          <v-card>
            <v-card-actions
              @click="modal = true"
            >
              <v-icon
                class="mx-auto"
                x-large
              >
                mdi-plus
              </v-icon>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <swipemodal
      v-model="modal"
      height="80vh"
      width="100%"
      radius="20px"
    >
      <v-stepper
        v-model="el"
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
                justify="space-between"
              >
                <v-col>
                  <v-btn
                    block
                    @click="modal = false"
                  >
                    Back
                  </v-btn>
                </v-col>
                <v-spacer />
                <v-col>
                  <v-btn
                    block
                    @click="el = 2"
                  >
                    Next
                  </v-btn>
                </v-col>
              </v-row>
              <v-row
                style="height: 250px; border: solid;"
              >
                <v-file-input
                  v-if="isActive"
                  id="fileInput"
                  ref="refImage"
                  v-model="image"
                  accept="image/*"
                  hide-input
                  prepend-icon=""
                  style="width: 0%; margin-left: calc(50% - 35px); margin-bottom: 16px;"
                  @change="active"
                >
                  <template #append-outer>
                    <v-btn
                      icon
                      x-large
                      @click="imgInput"
                    >
                      <v-icon
                        x-large
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
                  <v-btn
                    block
                    @click="el = 1"
                  >
                    Back
                  </v-btn>
                </v-col>
                <v-spacer />
                <v-col>
                  <v-btn
                    block
                  >
                    Next
                  </v-btn>
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
</style>
