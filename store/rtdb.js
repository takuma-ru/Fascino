// rtdb/変数名import firebase from '@/plugins/firebase'

export const state = () => ({
  PostData: [],
  Userpost: [],
  userid: 'wirA5GIggboAFRoMMAkjIStPaAY5',
})

export const getters = {
  PostData (state) {
    return state.PostData
  },
}

export const mutations = {
  addPostDataID (state, payload) {
    Object.keys(payload).forEach((val, key) => {
      payload[val].id = val
      state.PostData.push(payload[val])
    })
    // state.PostData.push(payload)
  },
  removePostDataID (state, payload) {
    if (state.PostData != null) {
      state.PostData.splice(0, state.PostData.length)
      Object.keys(payload).forEach((val, key) => {
        payload[val].id = val
        state.PostData.push(payload[val])
      })
    }
  },
  userget (state, payload) {
    Object.keys(payload).forEach((val, key) => {
      payload[val].id = val
      state.Userpost.push(payload[val])
    })
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
  async removePostData ({ state, commit }) {
    const removePostDataRef = this.$fire.database.ref('posts')
    try {
      await removePostDataRef.child('a0eebc999c0b4ef8bb6d6bb9bd380a11').remove()
      // commit('removePostDataID')
      await removePostDataRef.orderByValue().once('value', (snapshot) => {
        commit('removePostDataID', snapshot.val())
      })
    } catch (e) {
      alert(e)
    }
  },
  async getPostDataID ({ commit }) {
    const getpostdataRef = this.$fire.database.ref('posts')
    try {
      await getpostdataRef.orderByValue().limitToFirst(10).once('value', (snapshot) => {
        console.log(snapshot.val())
        commit('addPostDataID', snapshot.val())
      })
      // const snapshot = await getpostdataRef.once('value')
      // console.log(snapshot.val())
      // commit('addPostDataID', snapshot.val())
    } catch (e) {
      alert(e)
    }
  },
  async userPostData ({ state, commit }) {
    console.log(state.userid)
    const userpostRef = this.$fire.database.ref('posts')
    try {
      await userpostRef.orderByChild('uid').startAt(state.userid).endAt(state.userid).once('value', (snapshot) => {
        console.log(snapshot.val())
        commit('userget', snapshot.val())
      })
    } catch (e) {
      alert(e)
    }
  },

}
