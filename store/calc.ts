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
  }
}

export const actions = {
  getPerhitungan ({ commit }: any, payload: any) {
    commit('setPerhitungan', payload)
  },

  getHaid ({ commit }: any, payload: any) {
    commit('setHaid', payload)
  }
}
