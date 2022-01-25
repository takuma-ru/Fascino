<template>
  <div>
    <v-container
      class="header"
      :style="{
        backgroundColor: $vuetify.theme.themes[$vuetify.theme.dark ? 'dark' : 'light'].background_front
      }"
    >
      <v-row>
        <v-col>
          <v-avatar
            size="28"
            style="float: left;"
          >
            <v-img
              :src="userData.photoURL"
            />
          </v-avatar>
        </v-col>
        <v-col>
          <p class="b" style="float: left;">
            {{ userData.name }}
          </p>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <p
            class="a"
          >
            いいね
          </p>
          <p class="var">
            {{ userData.liked }}
          </p>
        </v-col>
        <v-col>
          <p class="a">
            いったよ
          </p>
          <p class="var">
            {{ userData.wented }}
          </p>
        </v-col>
        <v-col>
          <p class="a">
            バッチ
          </p>
          <p class="var">
            0
          </p>
        </v-col>
      </v-row>
      <!--<v-row class="location">
        <v-icon small>
          mdi-map-marker
        </v-icon>{{ location }}
      </v-row>-->
      <v-row class="bio" color="text">
        {{ userData.detail }}
      </v-row>
    </v-container>
    <v-row align="center" justify="space-around" class="bunnki no-gutters">
      <Button
        type="sml"
        flat
        :color="isVisible ? 'green_lighten' : 'transparent'"
        @click.native="isVisible = true"
      >
        投稿
      </Button>
      <Button
        type="sml"
        flat
        :color="isVisible ? 'transparent' : 'green_lighten'"
        @click.native="isVisible = false"
      >
        バッチ
      </Button>
    </v-row>
    <div v-show="isVisible" style="margin-bottom: 128px;">
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
          class="mx-auto"
          @click.native="$store.dispatch('rtdb/getPostData')"
        >
          ここを押してもっと読み込む
        </Button>
      </div>
    </div>
    <div v-show="!isVisible">
      coming soon...
      <!--<div v-for="(item, index) in obj" :key="index">
        <v-col justify="space-around" class="title">
          <div v-if="item.isget > 1">
            <button @click="item.isopen = true">
              <v-img
                :src="userData.photoURL"
              />
            </button>
            <swipemodal
              v-model="item.isopen"
              height="80vh"
              width="100%"
              radius="20px"
            >
              <v-list-item
                class="grow px-0"
                style="cursor: pointer;"
              >
                <v-list-item-avatar
                  color="grey darken-3"
                  size="32"
                >
                  <v-img
                    alt=""
                    :src="userData.photoURL"
                  />
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title
                    style="font-size: 24px;"
                  >
                    {{ item.title }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-divider class="my-2" />
              <div
                class="detail"
                style="white-space: pre-line"
                v-text="item.detail"
              />
              <div class="jj">
                獲得済
              </div>
            </swipemodal>
          </div>
          <div v-if="item.isget < 1">
            <button @click="item.isopen = true">
              <v-img
                :src="userData.photoURL"
              />
            </button>
            <swipemodal
              v-model="item.isopen"
              height="80vh"
              width="100%"
              radius="20px"
            >
              <v-list-item
                class="grow px-0"
                style="cursor: pointer;"
              >
                <v-list-item-avatar
                  color="grey darken-3"
                  size="32"
                >
                  <v-img
                    alt=""
                    :src="userData.photoURL"
                  />
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title
                    style="font-size: 24px;"
                  >
                    {{ item.title }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-divider class="my-2" />
              <div
                class="detail"
                style="white-space: pre-line"
                v-text="item.detail"
              />
              <div class="fjj">
                未獲得
              </div>
            </swipemodal>
          </div>
        </v-col>-->
    </div>
  </div>
</template>

<script>
// import swipemodal from 'nekoo_vue_swipemodal'
import 'nekoo_vue_swipemodal/dist/swipemodal.css'

export default {

  components: {
    // swipemodal,
  },
  data () {
    return {
      uid: this.$route.params.uid,
      dialog: false,
      bio: 'coming soon...',
      isVisible: true,
      userData: {
        uid: null,
        name: null,
        liked: null,
        wented: null,
        detail: null,
        photoURL: null,
      },
      obj: [
        {
          title: '一関master',
          detail: '一関に100000000個の投稿',
          isopen: false,
          isget: 0,
        },
        {
          title: 'WorldMaster',
          detail: '全世界に投稿',
          isopen: false,
          isget: 2,
        },
      ],
      modal: false,
      isPostModal: false,
    }
  },

  computed: {
    googleUserData () {
      return this.$store.getters['auth/googleUserData']
    },
    PostData () {
      return this.$store.getters['rtdb/UserPostData']
    },
  },

  async mounted () {
    console.log(this.uid)
    await this.$store.dispatch('firestore/getData', this.uid).then((res) => {
      this.userData = res
      console.log(this.userData)
    })
    this.$store.dispatch('rtdb/getUserPostData', {
      uid: this.uid,
    })
  },
}

</script>

<style>
.header {
  border-radius: 0px 0px 16px 16px;
}
.a{
  font-size: 16px;
  text-align: center;
}
.var{
  font-size: 24px;
  text-align: center;
}

.bio{
  font-size: 16px;
  padding: 0px 16px 24px 16px;
}
.b{
  font-size: 24px;
  text-align: center;
}
.bunnki{
  padding: 16px 0px 16px 0px;
}
.title{
  padding: 0px 16px 16px 16px;
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
.detail {
  max-height: 20vh;
  width: 100%;

  font-size: 16px;
  overflow-y: scroll;
}
.fjj{
  font-size: 12px;
  color: red;
}
.jj{
  font-size: 12px;
  color: lightgreen;
}
</style>
