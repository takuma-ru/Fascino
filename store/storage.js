export const state = () => ({

})

export const getters = {

}

export const mutations = {

}

export const actions = {
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
