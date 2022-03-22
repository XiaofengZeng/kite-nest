import Vue from 'vue';
import Vuex from 'vuex';

import user from './user';
import map2d from './map2d';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentScene: 'dashboard',
  },
  mutations: {
    changeScene(state, name) {
      state.currentScene = name;
    },
  },
  modules: {
    user,
    map2d,
  },
});
