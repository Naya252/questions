import Vue from 'vue';
import Vuex from 'vuex';

import menuStore from './module/menuStore';
import questionsStore from './module/questionsStore';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loaderCount: 0,
  },
  getters: {
    LOADER_SHOW: (state) => {
      return state.loaderCount !== 0;
    },
  },
  mutations: {
    LOADER_INCREMENT(state) {
      state.loaderCount++;
    },

    LOADER_DECREMENT(state) {
      state.loaderCount--;
    },
  },
  actions: {},
  modules: {
    menuStore,
    questionsStore,
  },
});
