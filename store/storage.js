export const actions = {
  // storageにファイルをアップロード
  async putImgFile ({ commit }, { img, postDataIDKey }) {
    let name = null
    switch (img.type) {
      case 'image/png':
        name = postDataIDKey + '.png'
        break
      case 'image/jpeg':
        name = postDataIDKey + '.jpeg'
        break
      case 'image/jpg':
        name = postDataIDKey + '.jpg'
        break
      default:
        console.error('対応していないファイル形式です')
        break
    }
    const storageRef = this.$fire.storage.ref('postImages').child(name)
    try {
      await storageRef.put(img)
      return true
    } catch (e) {
      alert(e.message)
      return false
    }
  },

  // storageに保存されている画像のURLを取得する
  async getFileUrl ({ commit }, imgNmae) {
    const storageRef = this.$fire.storage.ref('postImages').child(`${imgNmae}`)
    try {
      const url = await storageRef.getDownloadURL()
      return url
    } catch (e) {
      console.error(e.message)
    }
  },
}
