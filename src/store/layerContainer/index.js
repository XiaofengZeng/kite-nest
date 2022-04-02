export default {
  namespaced: true,
  state: {
    map2dLayers: [],
    map3dLayers: [],
  },
  actions: {
  },
  mutations: {
    // 二维地图图层操作
    add2dLayer(state, lyrCfg) {
      state.map2dLayers.push(lyrCfg);
    },
    remove2dLayer(state, lyrCfg) {
      state.map2dLayers = state.map2dLayers.filter((lyr) => lyr.id !== lyrCfg.id);
    },
    clear2dLayers(state) {
      state.map2dLayers = [];
    },

    // 三维地图图层操作
    add3dLayer(state, lyrCfg) {
      state.map3dLayers.push(lyrCfg);
    },
    remove3dLayer(state, lyrCfg) {
      state.map2dLayers = state.map2dLayers.filter((lyr) => lyr.id !== lyrCfg.id);
    },
    clear3dLayers(state) {
      state.map2dLayers = [];
    },
  },
  getters: {

  },
};
