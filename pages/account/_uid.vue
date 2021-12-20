<template>
  <div>
    <v-container class="header">
      <v-row>
        <v-col cols="4">
          <v-avatar
            size="28"
            style="float: left;"
          >
            <v-img
              :src="userData.photoURL"
            />
          </v-avatar>
        </v-col>
        <v-col cols="8">
          <p class="b" style="float: left;">
            {{ userData.name }}
          </p>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <p class="a">
            投稿
          </p>
          <p class="hen-number">
            0
          </p>
        </v-col>
        <v-col>
          <p class="a">
            いったよ
          </p>
          <p class="hen-number">
            {{ userData.wented }}
          </p>
        </v-col>
        <v-col>
          <p class="a">
            バッチ
          </p>
          <p class="hen-number">
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
      <Button type="sml" flat :color="isVisible ? 'green_lighten' : 'transparent'" @click.native="isVisible = !isVisible">
        投稿
      </Button>
      <Button type="sml" flat :color="isVisible ? 'transparent' : 'green_lighten'" @click.native="isVisible = !isVisible">
        バッチ
      </Button>
    </v-row>
    <div v-if="isVisible">
      coming soon..
    </div>
    <!-- isVisible=ture ならバッチの画面-->
    <div v-if="!isVisible">
      coming soon...
    </div>
    <!-- isVisible=false なら投稿の画面-->
  </div>
</template>

<script>
export default {
  data () {
    return {
      uid: this.$route.params.uid,
      dialog: false,
      bio: 'coming soon...',
      isVisible: false,
      userData: {
        name: null,
        liked: null,
        wented: null,
        detail: null,
        photoURL: null,
      },
    }
  },

  computed: {
    googleUserData () {
      return this.$store.getters['auth/googleUserData']
    },
  },

  async mounted () {
    console.log(this.uid)
    await this.$store.dispatch('firestore/getData', this.uid).then((res) => {
      this.userData = res
      console.log(this.userData)
    })
  },
}
</script>

<style>
.header {
  background:#93DED2;
  border-radius: 0px 0px 16px 16px;
}
.a{
  font-size: 16px;
  color: #315380;
  text-align: center;
}
.hen-number{
  font-size: 24px;
  text-align: center;
}
.location{
  font-size: 12px;
  color: #315380;
  padding: 0px 16px 0px 16px;
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
</style>
