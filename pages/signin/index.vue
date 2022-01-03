<template>
  <v-container class="pa-6">
    <v-row>
      <Button
        type="nml_sq"
        flat
        icon="mdi-chevron-left"
        :color="$vuetify.theme.themes[$vuetify.theme.dark ? 'dark' : 'light'].background_middle"
        @click.native="$router.go(-1)"
      >
        戻る
      </Button>
    </v-row>
    <v-row
      justify="center"
      no-gutters
      class="py-6"
    >
      <h1>ログイン</h1>
    </v-row>
    <v-row
      justify="center"
      no-gutters
      style="text-align: center"
    >
      ログインすることで、投稿が出来たり、報酬が貰えるようになります。
    </v-row>
    <v-row
      justify="center"
      align="center"
      class="pt-8"
      style="text-align: center"
    >
      <v-col cols="12">
        Googleアカウントを使ってログイン。新たなパスワードを考える必要がありません。
      </v-col>
      <v-col cols="12">
        <SignInButton />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  middleware ({ store, redirect }) {
    if (store.getters['auth/googleUserData'] != null || undefined) {
      return redirect('/timeLine')
    }
  },
}
</script>

<style>

</style>
