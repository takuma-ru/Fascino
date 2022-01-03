export const state = () => ({
  alerts: [],
})

export const getters = {
  alerts (state) {
    return state.alerts
  },
}

export const mutations = {
  addAlertsItem (state, status) {
    state.alerts.push(status)
  },
  removeAlertsItem (state, index) {
    state.alerts.splice(index, 1)
  },
  initAlerts (state) {
    state.alerts = []
  },
}

export const actions = {
  addAlertsItem ({ commit }, { type, msg }) {
    commit('addAlertsItem', { type, msg })
  },
  removeAlertsItem ({ commit }, index) {
    commit('removeAlertsItem', index)
  },
  initAlerts ({ commit }) {
    commit('initAlerts')
  },
}
