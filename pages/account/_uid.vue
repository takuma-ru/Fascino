<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6">
        <v-card class="py-4 d-flex justify-center">
          {{ uid }}
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      uid: this.$route.params.uid,
    }
  },
}
</script>

<style>

</style>
