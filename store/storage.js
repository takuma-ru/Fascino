export const actions = {
  // storageにファイルをアップロード
  async putImgFile ({ commit }, { img, postDataIDKey }) {
    let fileType = null
    switch (img.type) {
      case 'image/png':
        fileType = 'png'
        break
      case 'image/jpeg':
        fileType = 'jpeg'
        break
      case 'image/jpg':
        fileType = 'jpg'
        break
      default:
        console.error('対応していないファイル形式です')
        break
    }
    const metaData = {
      cacheControl: 'public,max-age=2592000',
      contentType: 'image/' + fileType,
    }
    const storageRef = this.$fire.storage.ref('postImages').child(postDataIDKey + '.' + fileType)
    try {
      await storageRef.put(img)
      await storageRef.updateMetadata(metaData)
      return (postDataIDKey + '.' + fileType)
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
