<template>
  <div
    id="postCard"
    @click="openModal()"
  >
    <div
      class="contents"
      :style="{
        backgroundImage: `url(${imgURL})`
      }"
    >
      <div
        class="title"
        :style="{
          backgroundColor: $vuetify.theme.themes[$vuetify.theme.dark ? 'dark' : 'light'].background_middle,
        }"
      >
        <div class="tags">
          <v-chip
            v-for="tag in postData.tags"
            :key="tag"
            small
            class="mr-2 mb-2"
            :color="$vuetify.theme.themes[$vuetify.theme.dark ? 'light' : 'dark'].sub_text"
            v-text="tag"
          />
        </div>
        <div class="name">
          {{ userData.name }}
        </div>
        <div
          class="coordinate"
          :style="`color: ${$vuetify.theme.themes[$vuetify.theme.dark ? 'dark' : 'light'].sub2_text};`"
        >
          <p>
            <v-icon size="19px">
              mdi-map-marker
            </v-icon>
            {{ location }}
          </p>
        </div>
      </div>
    </div>
    <PostInfoModal
      v-model="isOpenPostInfoModal"
      :post-data="postData"
      :posted-user-data="userData"
    />
  </div>
</template>

<script>
export default {
  props: {
    postData: {
      type: Object,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: {
        date: 0,
        detail: null,
        imgCoordinate: [0, 0],
        imgName: null,
        likesSum: null,
        tags: null,
        uid: null,
        wentSum: null,
      },
    },
  },

  data () {
    return {
      isOpenPostInfoModal: false,
      location: '撮った場所',
      imgURL: null,
      userData: {
        photoURL: null,
        name: null,
      },
    }
  },

  mounted () {
    this.getData()
  },

  methods: {
    async getData () {
      await this.$store.dispatch('firestore/getData', this.postData.uid).then((res) => {
        this.userData = res
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
    openModal () {
      this.isOpenPostInfoModal = !this.isOpenPostInfoModal
    },
  },
}
</script>

<style lang="scss">
#postCard {
  width: min(100%, 480px);
  height: auto;
  padding: 8px;

  aspect-ratio: 1 / 1;
  cursor: pointer;

  .contents {
    position: relative;
    width: 100%;
    height: 100%;

    background-color: gray;
    background-size: cover;
    border-radius: 16px;
    box-shadow: 0px 0px 6px 3px #00214D28;
  }

  .title {
    position: absolute;
    min-width: 50%;
    max-width: 75%;
    height: auto;
    left: 0%;
    bottom: 24px;
    padding: 8px;

    background: white;
    border-radius: 0px 16px 16px 0px;

    .tags {
      font-family: 'SmartFontUI';
    }

    .name {
      font-size: 20px;
      font-family: 'SmartFontUI';
    }

    .coordinate p {
      margin-top: 8px;
      margin-bottom: 0px;
      line-height: 18px;

      font-size: 16px;
      font-family: 'SmartFontUI';
    }
  }
}
</style>
