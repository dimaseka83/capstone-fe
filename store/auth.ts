export const state = () => ({
  user: null,
  token: null
})

export const mutations = {
  setUser (state: { user: any }, payload: any) {
    state.user = {
      name: payload
    }
  },

  setToken (state: { token: any }, payload: any) {
    state.token = payload
  },

  resetUser (state: { user: any, token: any }) {
    state.user = null
    state.token = null
  }

}

export const actions = {
  getUser ({ commit }: any, payload: any) {
    commit('setUser', payload)
  },
  getToken ({ commit }: any, payload: any) {
    commit('setToken', payload)
  },
  resetUser ({ commit }: any) {
    commit('resetUser')
  }

}
