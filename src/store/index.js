import Vue from 'vue';
import Vuex from 'vuex';

import user from './user';
import map2d from './map2d';
import map3d from './map3d';
import layerContainer from './layerContainer';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentScene: 'dashboard',
    scenes: [
      { key: 'dashboard', title: '看板', path: '/dashboard' },
      { key: 'warehouse', title: '仓库管理', path: '/warehouse' },
      { key: 'map', title: '地图展示', path: '/map' },
    ],
    currentMap: 'map2d',
    maps: [
      { key: 'map2d', title: '二维地图', path: '/map/2d' },
      { key: 'map3d', title: '三维地图', path: '/map/3d' },
    ],
  },
  mutations: {
    setScene(state, name) {
      state.currentScene = name;
    },
    setMap(state, name) {
      state.currentMap = name;
    },
  },
  modules: {
    user,
    map2d,
    map3d,
    layerContainer,
  },
});
