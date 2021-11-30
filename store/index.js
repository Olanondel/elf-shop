export const state = () => ({
  isAdmin: null
})

export const mutations = {
  setAdmin(state, payload) {
    state.isAdmin = payload
  }
}

export const getters = {
  isAdmin: (state) => state.isAdmin
}

