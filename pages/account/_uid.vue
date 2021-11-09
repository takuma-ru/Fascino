<template>
  <div class="header">
    <v-container>
      <v-row>
        {{name}}
      </v-row>
      <v-row>
        <v-col>
          <v-card>
            投稿<br>{{toukou}}
          </v-card>
        </v-col>
        <v-col>
          <v-card>
            いったよ<br>{{ittayo}}
          </v-card>
        </v-col>
        <v-col>
          <v-card>
            バッチ<br>{{batti}}
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-icon>mdi-map-marker</v-icon>{{location}}
        {{bio}}
      </v-row>
    </v-container>
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
      bio: 'わあああああああああああああああ',
    }
  },
}
</script>

<style>
.header {
  background:#00EBC7;
  border-radius: 0px 0px 16px 16px;
}

</style>
