export const state = () => ({
  userData: null,
})

export const getters = {
  userData (state) {
    return state.userData
  },
}

export const mutations = {
  updateUserData (state, status) {
    state.userData = status
  },
}

export const actions = {
  userDataInit ({ commit }) {
    commit('updateUserData', null)
  },

  async signIn ({ commit, dispatch }) {
    commit('updateUserData', {})

    const provider = new this.$fireModule.default.auth.GoogleAuthProvider()
    await this.$fire.auth.signInWithPopup(provider)
      .then(() => {
        console.log('success: signIn')
      })
      .catch((e) => {
        console.error(e)
      })
  },

  async signOut () {
    await this.$fire.auth.signOut()
      .then(() => {
        console.log('success: signOut')
      })
      .catch((e) => {
        console.error(e)
      })
  },

  async onAuthStateChangedAction ({ commit, dispatch }, { authUser, claims }) {
    if (!authUser) {
      console.warn('Can not get \'userData\'')
      commit('updateUserData')
      return
    }

    const { uid, email, emailVerified, displayName } = await authUser

    commit('updateUserData', {
      uid,
      email,
      emailVerified,
      displayName,
      photoURL: claims.picture,
      isAdmin: claims.custom_claim,
    })
  },
}
