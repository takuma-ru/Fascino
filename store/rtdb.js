
// rtdb/変数名import firebase from '@/plugins/firebase'
export const state = () => ({
  PostData: [],
  UserPostData: [],
  imgCoordinatePostData: [],
  postdataId: '',
  // 今のところ投稿データごとには出来ないだよねー
  like: false,
  went: false,
})

export const getters = {
  PostData (state) {
    return state.PostData
  },
  UserPostData (state) {
    return state.Userpost
  },
  imgCoordinatePostData (state) {
    return state.imgCoordinatePostData
  },
}

export const mutations = {
  addPostData (state, payload) {
    if (state.PostData.length) {
      state.PostData.pop()
    }
    Object.keys(payload).forEach((val, key) => {
      payload[val].id = val
      state.PostData.push(payload[val])
      state.postdataId = payload[val].id
    })
  },
  removePostData (state, payload) {
    if (state.PostData != null) {
      state.PostData.splice(0, state.PostData.length)
      Object.keys(payload).forEach((val, key) => {
        payload[val].id = val
        state.PostData.push(payload[val])
      })
    }
  },
  userget (state, payload) {
    if (state.UserpostData != null) {
      state.UserpostData = null
    }
    Object.keys(payload).forEach((val, key) => {
      payload[val].id = val
      state.UserpostData.push(payload[val])
    })
  },
  getimgCoordinatePostData (state, payload) {
    if (state.imgCoordinatePostData.find(value => value.id !== payload.id)) {
      console.log('good')
    }
    Object.keys(payload).forEach((val, key) => {
      payload[val].id = val
      state.imgCoordinatePostData.push(payload[val])
    })
  },
  likesum (state) {
    if (state.like === false) {
      state.like = true
    } else if (state.like === true) {
      state.like = false
    }
  },
  wentsum (state) {
    if (state.went === false) {
      state.went = true
    } else if (state.like === true) {
      state.went = false
    }
  },

}

export const actions = {
  async updataPostData ({ rootState }, { detail, tags, imgCoordinate, imgName }) {
    const updataPostdataRef = this.$fire.database.ref('posts')
    const newref = updataPostdataRef.push()
    try {
      await newref.set({
        uid: rootState.auth.googleUserData.uid,
        detail,
        tags,
        imgCoordinate,
        imgName,
        likesSum: 0,
        wentSum: 0,
        date: new Date().getTime(),
      })
    } catch (e) {
      alert(e)
    }
  },
  // 修正後でしないとね
  async likechange ({ state, commit }) {
    // const likesumRef = this.$fire.datadase.ref('posts')
    const likesumRef = this.$fire.database.ref('posts/' + state.postdataId + '/likesSum')
    try {
      commit('likesum')
      if (state.like === false) {
        await likesumRef.transaction((likesSum) => {
          return likesSum + 1
        })
      } else if (state.like === true) {
        await likesumRef.transaction((likesSum) => {
          return likesSum - 1
        })
      }
      // commit('likesum')
    } catch (e) {
      alert(e)
    }
  },
  async wentchange ({ state, commit }) {
    const wentsumRef = this.$fire.database.ref('posts/' + state.postdataId + '/wentSum')
    try {
      commit('wentsum')
      if (state.like === false) {
        await wentsumRef.transaction((wentSum) => {
          return wentSum + 1
        })
      } else if (state.like === true) {
        await wentsumRef.transaction((wentSum) => {
          return wentSum - 1
        })
      }
      // commit('likesum')
    } catch (e) {
      alert(e)
    }
  },
  async removePostData ({ state, commit }, { PostDataId }) {
    const removePostDataRef = this.$fire.database.ref('posts')
    try {
      await removePostDataRef.child(PostDataId).remove()
      await removePostDataRef.orderByKey().endAt(state.postdataId).once('value', (snapshot) => {
        commit('removePostData', snapshot.val())
      })
    } catch (e) {
      alert(e)
    }
  },
  async getPostData ({ state, commit }) {
    const getpostdataRef = this.$fire.database.ref('posts')
    try {
      if (state.PostData.length) {
        await getpostdataRef.orderByKey().startAt(state.postdataId).limitToFirst(11).once('value', (snapshot) => {
          console.log(snapshot.val())
          commit('addPostData', snapshot.val())
        })
      } else {
        await getpostdataRef.orderByKey().limitToFirst(10).once('value', (snapshot) => {
          console.log(snapshot.val())
          commit('addPostData', snapshot.val())
        })
      }
    } catch (e) {
      alert(e)
    }
  },
  async getuserPostData ({ commit }, { uid }) {
    console.log(uid)
    const userpostRef = this.$fire.database.ref('posts')
    try {
      await userpostRef.orderByChild('uid').startAt(uid).endAt(uid).once('value', (snapshot) => {
        console.log(snapshot.val())
        commit('userget', snapshot.val())
        // EqualTo()で出来るくね？
      })
    } catch (e) {
      alert(e)
    }
  },
  async getimgCoordinatePostData ({ commit }, { coords }) {
    const imgCoordinateref = this.$fire.database.ref('posts')
    try {
      await imgCoordinateref.orderByChild('imgCoordinate/0').startAt(-0.05 + coords[0]).endAt(0.05 + coords[0]).once('value', (snapshot) => {
        console.log(snapshot.val())
        commit('getimgCoordinatePostData', snapshot.val())
      })
    } catch (e) {
      alert(e)
    }
  },
}
