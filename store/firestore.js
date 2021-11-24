export const getters = {
  userData (state) {
    return state.userData
  },
}

export const mutations = {
  updateuserData (state, condition) {
    state.userData = condition
  },
}

export const actions = {
  userDataReset ({ commit }) {
    commit('updateuserData', null)
  },

  async getData ({ commit }, uid) {
    console.log('get data')
    // FireStoreからデータを取ってくる
    const userDataRef = this.$fire.firestore.collection('user').doc(uid)
    try {
      const getData = await userDataRef.get()
      console.log(getData.data())
      commit('updateuserData', getData.data())
    } catch (e) {
      console.log(e)
    }
  },
  async addData ({ commit }, { uid, name, detail, liked, wented }) {
    console.log('add data')
    // FireStoreからデータを追加
    const userDataRef = this.$fire.firestore.collection('user').doc(uid)
    try {
      await userDataRef.set({
        name,
        detail,
        liked,
        wented,
      })
    } catch (e) {
      console.log(e)
    }
  },

  async updateData ({ commit }, { uid, name, detail, liked, wented }) {
    console.log('update data')
    // firestoreの値を更新
    const userDataRef = this.$fire.firestore.collection('user').doc(uid)
    try {
      await userDataRef.update({
        name,
        detail,
        liked,
        wented,
      })
    } catch (e) {
      console.log(e)
    }
  },

  async deleteData ({ commit }, { uid }) {
    console.log('delete data')
    // FireStoreから既存データを削除
    const userDataRef = this.$fire.firestore.collection('user').doc(uid)
    try {
      await userDataRef.update({
        uid: this.$fireModule.firestore.FieldValue.delete(),
        detail: this.$fireModule.firestore.FieldValue.delete(),
        liked: this.$fireModule.firestore.FieldValue.delete(),
        wented: this.$fireModule.firestore.FieldValue.delete(),
      })
    } catch (e) {
      console.log(e)
    }
  },
}