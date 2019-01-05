import { itemService } from '../service/item.service'
// import { router } from '../router'

const state = {
  all: {}, status: {}
}

const actions = {
  additem ({ dispatch, commit }, item ) {
    commit('addRequest', item)
    itemService.add(item)
      .then(
        item => {
          commit('addSuccess', item, item.relativeCategory)
          setTimeout(() => {
            // display success message after route change completes
            dispatch('alert/success', 'item Addition successful', { root: true })
          })
        },
        error => {
          commit('addFailure', 'Addition Failure.', item.relativeCategory)
          dispatch('alert/error', 'Addition Failure.' + error.toString(), { root: true })
        }
      )
  },
  getAll ({ commit }, relativeCategory) {
    console.log('getting all items under' + relativeCategory)
    commit('getAllRequest', relativeCategory)
    itemService.getAll(relativeCategory)
      .then(
        items => commit('getAllSuccess', items, relativeCategory),
        error => commit('getAllFailure', error.toString(), relativeCategory)
      )
  },
  delete ({ commit }, item) {
    var id = item.id
    var relativeCategory = item.relativeCategory
    commit('deleteRequest', id, relativeCategory)
    // router.push('/')
    itemService.delete(id, relativeCategory)
      .then(
        item => commit('deleteSuccess', id, relativeCategory),
        error => commit('deleteSuccess', { id, error: error.toString() }, relativeCategory)
      )
  },
  deleteAll({ commit }) {
    var id = 'all';
    commit('deleteRequest', id, relativeCategory)
    // router.push('/')
    itemService.deleteAll(id, relativeCategory)
      .then(
        item => commit('deleteSuccess', id, relativeCategory),
        error => commit('deleteSuccess', { id, error: error.toString() }, relativeCategory)
      )
  },
  changeStatus ({ commit }, id) {
    commit('changeStatusRequest')
    itemService.changeStatus(id)
      .then(
        item => commit('changeStatusSuccess', { id, item }),
        error => commit('changeStatusFailure', { id, error: error.toString() })
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
  changeStatusRequest (state, id) {
    console.log('mutation for change status request committed.')
    state.all.items = state.all.items.map(item =>
      item.id === id
        ? { ...item, updating: true }
        : item
    )
  },
  changeStatusSuccess (state, id, update) {
    console.log('mutation for change status success committed.')
    state.all.items = state.all.items.map(item =>
      item.id === id
        ? update
        : item
    )
  },
  changeStatusFailure (state, { id, error }) {
    console.log('mutation for change status failure committed.')
    // remove 'deleting:true' property and add 'deleteError:[error]' property to user
    state.all.items = state.items.map(item => {
      if (item.id === id) {
        // make copy of user without 'deleting:true' property
        const { updating, ...itemCopy } = item
        // return copy of user with 'deleteError:[error]' property
        return { ...itemCopy, statusUpdate: error }
      }

      return item
    })
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
    state.all.items = state.all.items.filter(item => item._id !== id)
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
