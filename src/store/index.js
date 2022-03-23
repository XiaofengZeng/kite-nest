import Vue from 'vue';
import Vuex from 'vuex';

import user from './user';
import map2d from './map2d';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentScene: 'dashboard',
    scenes: [
      { key: 'dashboard', title: '看板', path: '/dashboard' },
      { key: 'warehouse', title: '仓库管理', path: '/warehouse' },
      { key: 'map', title: '地图展示', path: '/map' },
    ],
  },
  mutations: {
    setScene(state, name) {
      state.currentScene = name;
    },
  },
  modules: {
    user,
    map2d,
  },
});
