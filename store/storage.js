export const state = () => ({

})

export const getters = {

}

export const mutations = {

}

export const actions = {
  // storageに保存されている画像のURLを取得する
  async getFileUrl (imgNmae) {
    const storageRef = this.$fire.storage.ref('postImages').child(`${imgNmae}`)
    try {
      const url = await storageRef.getDownloadURL()
      return url
    } catch (e) {
      console.error(e.message)
    }
  },
}
