export const state = () => ({
  isDarkMode: false,
})

export const mutations = {
  updateIsDarkMode (state, status) {
    state.isDarkMode = status
  },
}

export const actions = {
  setUpIsDarkMode ({ commit }) {
    let isDarkMode = false

    if (localStorage.isDarkMode) {
      isDarkMode = localStorage.isDarkMode
      isDarkMode = JSON.parse(isDarkMode.toLowerCase())
      window.$nuxt.$root.$vuetify.theme.dark = isDarkMode
      commit('updateIsDarkMode', isDarkMode)
    } else {
      const darkMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

      darkMediaQuery.addEventListener('change', (e) => {
        window.$nuxt.$root.$vuetify.theme.dark = !window.$nuxt.$root.$vuetify.theme.dark
      })

      if (darkMediaQuery.matches) {
        setTimeout(() => {
          window.$nuxt.$root.$vuetify.theme.dark = true
          localStorage.isDarkMode = true
        }, 0.00)
      }
      commit('updateIsDarkMode', isDarkMode)
    }
  },
  updateIsDarkMode ({ commit }, isDarkMode) {
    window.$nuxt.$root.$vuetify.theme.dark = isDarkMode
    localStorage.isDarkMode = isDarkMode
    commit('updateIsDarkMode', isDarkMode)
  },
}
