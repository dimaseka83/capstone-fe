import axios from 'axios'
export const state = () => ({
  berita: []
})

export const mutations = {
  setBerita (state: { berita: any
    }, payload: any) {
    state.berita = payload
  }
}

export const actions = {
  async getBerita ({ commit }: { commit: any }) {
    const { data } = await axios.get('https://crudberitadanhelper-production.up.railway.app/products')
    const urutkanTerbaru = data.sort((a: { createdAt: string }, b: { createdAt: string }) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    }
    )
    commit('setBerita', urutkanTerbaru)
  }
}
