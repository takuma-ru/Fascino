export const state = () => ({
  userData: {},
})

export const mutations = {
  updateUserData (state, status) {
    state.userData = status
  },
}

export const actions = {
  userDataInit ({ commit }) {
    commit('updateUserData', {})
  },

  async signIn ({ commit }) {

  },

  async signOut ({ commit }) {

  },
}
