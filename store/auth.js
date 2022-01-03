export const state = () => ({
  googleUserData: null,
})

export const getters = {
  googleUserData (state) {
    return state.googleUserData
  },
}

export const mutations = {
  updateGoogleUserData (state, status) {
    state.googleUserData = status
  },
}

export const actions = {
  // googleUserDataをリセット
  googleUserDataInit ({ commit }) {
    commit('updateGoogleUserData', null)
  },

  // サインイン処理
  async signIn ({ commit }) {
    commit('updateGoogleUserData')

    const provider = new this.$fireModule.default.auth.GoogleAuthProvider()
    await this.$fire.auth.signInWithPopup(provider)
      .then(() => {
        console.log('success: signIn')
      })
      .catch((e) => {
        console.error(e)
      })
  },

  // サインアウト処理
  async signOut () {
    await this.$fire.auth.signOut()
      .then(() => {
        this.$router.go({ path: this.$router.currentRoute.path, force: true })
        console.log('success: signOut')
      })
      .catch((e) => {
        console.error(e)
      })
  },

  // サインイン状態の判定処理
  async onAuthStateChangedAction ({ rootState, commit, dispatch }, { authUser, claims }) {
    if (!authUser) {
      console.warn('Can not get \'googleUserData\'')
      commit('updateGoogleUserData')
      return 'noData'
    }

    const {
      uid,
      email,
      emailVerified,
      displayName,
    } = await authUser

    commit('updateGoogleUserData', {
      uid,
      email,
      emailVerified,
      displayName,
      photoURL: claims.picture,
      isAdmin: claims.custom_claim,
    })

    // firestoreからuserDataをログインしているユーザーのドキュメントが取得できるか
    let userData = null
    await dispatch('firestore/getData', uid, { root: true }).then((res) => {
      userData = res
    })
    if (userData === undefined || userData === null) {
      // 取得できなかった場合
      this.$router.push('/signup?step=2')
      /*
        await dispatch('firestore/addData', {
        uid,
        name: displayName,
        detail: '',
        liked: 0,
        wented: 0,
        photoURL: claims.picture,
      }, { root: true })
      */
      // eslint-disable-next-line no-useless-return
      return 'noData'
    } else {
      return 'existsData'
    }
  },
}
