export const state = () => ({
  hasilPerhitungan: [],
  haid: null,
  period: null
})

export const mutations = {
  setPerhitungan (state: { hasilPerhitungan: any }, payload: any) {
    state.hasilPerhitungan = payload
  },

  setHaid (state: { haid: any, period: any }, payload: any) {
    state.haid = payload.haid,
    state.period = payload.siklus
  },

  resetPerhitungan (state: { hasilPerhitungan: any, haid: any, period: any }) {
    state.hasilPerhitungan = []
    state.haid = null
    state.period = null
  }
}

export const actions = {
  getPerhitungan ({ commit }: any, payload: any) {
    commit('setPerhitungan', payload)
  },

  getHaid ({ commit }: any, payload: any) {
    commit('setHaid', payload)
  },

  resetPerhitungan ({ commit }: any) {
    commit('resetPerhitungan')
  }
}
