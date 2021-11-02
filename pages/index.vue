<template>
  <v-container style="padding: 16px">
    <v-row justify="center">
      <v-col style="text-align: center">
        <PWAInstallButton />
        <Button
          type="sml_sq"
          flat
          color="red"
          class="mx-2 my-2"
          @click.native="$router.push('/timeline')"
        >
          timelineに移動
        </Button>
        <v-card
          :color="$vuetify.theme.themes[$vuetify.theme.dark ? 'dark' : 'light'].background_front"
          class="rounded-nomal"
          style="box-shadow: 0px 0px 6px 0px #00214D28;"
        >
          <v-card-title>title</v-card-title>
          <v-card-text>
            text
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {

}
</script>

<style>

</style>
