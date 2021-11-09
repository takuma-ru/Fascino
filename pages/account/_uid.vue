<template>
  <div>
    <v-container class="header">
      <v-row>
        <v-col>
          <!--アイコン-->
        </v-col>
        <v-col>
          <p class="b">{{name}}</p>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <p class="a">投稿</p>
          <p class="hen-number">{{toukou}}</p>
        </v-col>
        <v-col>
          <p class="a">いったよ</p>
          <p class="hen-number">{{ittayo}}</p>
        </v-col>
        <v-col>
          <p class="a">バッチ</p>
          <p class="hen-number">{{batti}}</p>
        </v-col>
      </v-row>
      <v-row class="location">
        <v-icon small>mdi-map-marker</v-icon>{{location}}
      </v-row>
      <v-row class="bio">
        {{bio}}
      </v-row>
    </v-container>
    <v-row align="center" justify="space-around" class="bunnki">
      <v-btn text>
        投稿
        </v-btn>
      <v-btn text>
        バッチ
        </v-btn>
    </v-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      uid: this.$route.params.uid,
      dialog: false,
      location: '日本',
      toukou: '555',
      ittayo: '555',
      batti: '555',
      name: 'josei',
      bio: 'わあああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああ',
    }
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
}
.bunnki{
  padding: 16px 16px 8px 16px;
}
</style>
