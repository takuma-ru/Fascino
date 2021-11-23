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
  googleUserDataInit ({ commit }) {
    commit('updateGoogleUserData', null)
  },

  async signIn ({ commit, dispatch }) {
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

  async onAuthStateChangedAction ({ commit, dispatch }, { authUser, claims }) {
    if (!authUser) {
      console.warn('Can not get \'googleUserData\'')
      commit('updateGoogleUserData')
      return
    }

    const { uid, email, emailVerified, displayName } = await authUser

    commit('updateGoogleUserData', {
      uid,
      email,
      emailVerified,
      displayName,
      photoURL: claims.picture,
      isAdmin: claims.custom_claim,
    })
  },
}
