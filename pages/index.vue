<template>
  <v-container style="padding: 16px">
    <v-row justify="center">
      <v-col style="text-align: center">
        <PWAInstallButton />
        <Button
          type="lg_sq"
          flat
          icon="mdi-plus"
          color="red"
          class="mx-2 my-2"
        />
        <v-card
          color="background_front"
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
