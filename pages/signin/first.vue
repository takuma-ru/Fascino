<template>
  <v-container class="pa-6">
    <v-row
      justify="center"
      no-gutters
      class="py-6"
    >
      <h1>アカウントの登録</h1>
    </v-row>
    <v-row
      justify="center"
      no-gutters
      style="text-align: center"
    >
      あなたのアカウントを登録しましょう。<br>
    </v-row>
    <v-row no-gutters class="pt-8">
      <v-col class="px-0">
        <v-text-field
          id="text-field"
          v-model="name"
          placeholder="好きな名前を設定しましょう"
          auto-grow
          outlined
          clearable
          color="green"
          style="word-break: break-all; white-space: normal;"
        >
          <template #label>
            <p style="font-size: 20px;">
              名前
            </p>
          </template>
        </v-text-field>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col class="px-0">
        <v-textarea
          id="text-field"
          v-model="detail"
          placeholder="あなたのことが分かるような紹介文を書いてみましょう"
          counter="100"
          auto-grow
          outlined
          clearable
          color="green"
          style="word-break: break-all; white-space: normal;"
        >
          <template #label>
            <p style="font-size: 20px;">
              自己紹介
            </p>
          </template>
        </v-textarea>
      </v-col>
    </v-row>
    <v-divider class="my-4" />
    <v-row justify="right" no-gutters>
      <v-col style="text-align: right;">
        <Button
          type="sml"
          flat
          color="green"
          @click.native="setupUserProfile()"
        >
          これで登録する！
        </Button>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      googleUserData: null,
      name: '',
      detail: '',
    }
  },

  created () {
    this.googleUserData = this.$store.getters['auth/googleUserData']
    this.name = this.googleUserData.displayName
  },

  methods: {
    async setupUserProfile () {
      await this.$store.dispatch('firestore/addData', {
        uid: this.googleUserData.uid,
        name: this.name,
        detail: this.detail,
        liked: 0,
        wented: 0,
        photoURL: this.googleUserData.photoURL,
      }).then(() => {
        this.$router.push('/timeline')
      })
    },
  },
}
</script>

<style>

</style>
