import Vue from 'vue'
import Vuex from 'vuex'

import { alert } from './alert.module'
import { items } from './item.module'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    alert,
    items
  }
})