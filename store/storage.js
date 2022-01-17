import imageCompression from 'browser-image-compression'

export const actions = {
  // storageにファイルをアップロード
  async putImgFile ({ commit }, { img, postDataIDKey }) {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 800,
    }
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
      let resizeImg = null
      try {
        // 圧縮画像の生成
        resizeImg = await imageCompression(img, options)
      } catch (error) {
        console.error('getCompressImageFileAsync is error', error)
        throw error
      }
      await storageRef.put(resizeImg)
      await storageRef.updateMetadata(metaData)
      return (postDataIDKey + '.' + fileType)
    } catch (e) {
      alert(e.message)
      return false
    }
  },

  // storageに保存されている画像のURLを取得する
  async getFileUrl ({ commit }, imgName) {
    const storageRef = this.$fire.storage.ref('postImages').child(`${imgName}`)
    try {
      const url = await storageRef.getDownloadURL()
      return url
    } catch (e) {
      console.error(e.message)
    }
  },

  // 画像を削除
  async removeImgFile ({ commit }, imgName) {
    const storageRef = this.$fire.storage.ref('postImages').child(`${imgName}`)
    try {
      await storageRef.delete()
    } catch (e) {
      console.error(e.message)
    }
  },
}

// リサイズ参考URL：https://qiita.com/nobu17/items/64f51d43827424db4b6a
