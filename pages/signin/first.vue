<template>
  <v-container class="pa-6">
    <v-row justify="right" no-gutters>
      <v-col style="text-align: right;">
        <Button
          type="nml"
          flat
          color="green"
          @click.native="setupUserProfile()"
        >
          OK！
        </Button>
      </v-col>
    </v-row>
    <v-divider class="my-4" />
    <v-row no-gutters>
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
          counter="140"
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
