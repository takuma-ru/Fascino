// rtdb/変数名import firebase from '@/plugins/firebase'

export const state = () => ({
  PostDataID: {
    uid: '',
    detail: '',
    tags: [],
    imgCoordinate: [],
    imgName: '',
    likesSum: null,
    wentSum: null,
    date: null,
  },
})

export const getters = {
}

export const mutations = {
  addPostDataID (state) {

  },
  updatePostDataID (state) {
  },
  removePostDataID (state) {
  },
}

export const actions = {
  async updataPostData ({ state }) {
    const updataPostdataRef = this.$fire.database.ref('posts')
    try {
      await updataPostdataRef.update({
        a0eebc999c0b4ef8bb6d6bb9bd380a11: {
          uid: 'wirA5GIggboAFRoMMAkjIStPaAY5',
          detail: 'ここからの眺めは最高！',
          tags: ['絶景', '観光', '夜景'],
          imgCoordinate: [74.355, 65.1],
          imgName: 'a0eebc999c0b4ef8bb6d6bb9bd380a11.png',
          likesSum: 154,
          wentSum: 35,
          date: 1634863170,
        },
      })
    } catch (e) {
      alert(e)
    }
  },
  async getPostDataID ({ state }) {
    const getpostdataRef = window.$nuxt.$root.$fire.database.ref('posts')
    try {
      const snapshot = await getpostdataRef.once('value')
      alert(snapshot.val().message)
    } catch (e) {
      alert(e)
    }
  },

}
