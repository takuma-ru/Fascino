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
