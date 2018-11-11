import { itemService } from '../service/item.service'
// import { router } from '../router'

const state = {
  all: {}, status: {}
}

const actions = {
  additem ({ dispatch, commit }, item, category) {
    commit('addRequest', item)
    itemService.add(item, category)
      .then(
        item => {
          commit('addSuccess', item)
          setTimeout(() => {
            // display success message after route change completes
            dispatch('alert/success', 'item Addition successful', { root: true })
          })
        },
        error => {
          commit('addFailure', 'Addition Failure.')
          dispatch('alert/error', 'Addition Failure.' + error.toString(), { root: true })
        }
      )
  },
  getAll ({ commit }, category) {
    commit('getAllRequest')
    itemService.getAll(category)
      .then(
        items => commit('getAllSuccess', items),
        error => commit('getAllFailure', error.toString())
      )
  },
  delete ({ commit }, id, category) {
    commit('deleteRequest', id)
    // router.push('/')
    itemService.delete(id, category)
      .then(
        item => commit('deleteSuccess', id),
        error => commit('deleteSuccess', { id, error: error.toString() })
      )
  }
}

const mutations = {
  addRequest (state, item) {
    state.status = { registering: true }
  },
  addSuccess (state, item) {
    state.status = {}
  },
  addFailure (state, error) {
    state.status = {}
  },
  getAllRequest (state) {
    state.all = { loading: true }
  },
  getAllSuccess (state, items) {
    state.all = { items: items }
  },
  getAllFailure (state, error) {
    state.all = { error }
  },
  deleteRequest (state, id) {
    // add 'deleting:true' property to user being deleted
    state.all.items = state.all.items.map(item =>
      item.id === id
        ? { ...item, deleting: true }
        : item
    )
  },
  deleteSuccess (state, id) {
    // remove deleted user from state
    state.all.items = state.all.items.filter(item => item.id !== id)
  },
  deleteFailure (state, { id, error }) {
    // remove 'deleting:true' property and add 'deleteError:[error]' property to user
    state.all.items = state.items.map(item => {
      if (item.id === id) {
        // make copy of user without 'deleting:true' property
        const { deleting, ...itemCopy } = item
        // return copy of user with 'deleteError:[error]' property
        return { ...itemCopy, deleteError: error }
      }

      return item
    })
  }
}

export const items = {
  namespaced: true,
  state,
  actions,
  mutations
}
