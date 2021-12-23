export const actions = {
  async getReverseGeo ({ commit }, { lat, lng }) {
    try {
      const geo = await this.$axios.$get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=16`)
      const ary = geo.display_name.split(',').reverse()
      return (
        ary.slice(2).join('')
      )
    } catch (e) {
      console.error(e)
    }
  },
}
