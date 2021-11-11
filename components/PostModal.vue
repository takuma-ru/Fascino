<template>
  <v-container>
    <v-col>
      <v-card
        class="rounded-xl"
      >
        <v-card-actions>
          <div class="mx-auto my-16">
            <v-img
              v-if="uploadImageUrl"
              :src="uploadImageUrl"
              :aspect-ratio="16/9"
              :width="width"
            />
            <v-file-input
              v-model="img"
              accept="image/*"
              hide-input
              prepend-icon="mdi-plus"
              @change="onImgPicked"
            />
          </div>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      img: null,
      width: 300,
    }
  },
  mounted () {
    this.uploadImageUrl = ''
  },
  methods: {
    onImgPicked (file) {
      if (file !== undefined && file !== null) {
        if (file.name.lastIndexOf('.') <= 0) {
          return
        }
        const fr = new FileReader()
        fr.readAsDataURL(file)
        fr.addEventListener('load', () => {
          this.uploadImageUrl = fr.result
        })
      } else {
        this.uploadImageUrl = ''
      }
    },
  },
}
</script>

<style lang="scss" scoped>
</style>
