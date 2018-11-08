const state = {
  type: null,
  message: null
}

const actions = {
  success ({ commit }, message) {
    commit('success', message)
  },
  error ({ commit }, message) {
    commit('error', message)
  },
  clear ({ commit }, message) {
    commit('success', message)
  }
}

const mutations = {
  success (state, message) {
    state.type = 'alert-success'
    state.message = message
    setTimeout(function () {
      state.type = null
      state.message = null
    }, 5000)
  },
  error (state, message) {
    state.type = 'alert-danger'
    state.message = message
    setTimeout(function () {
      state.type = null
      state.message = null
    }, 5000)
  },
  clear (state) {
    state.type = null
    state.message = null
  }
}

export const alert = {
  namespaced: true,
  state,
  actions,
  mutations
}
