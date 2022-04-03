export default {
  namespaced: true,
  state: {
    lastestAddedLayer2dInfo: null,
    lastestDeletedLayer2dInfo: null,

    lastestAddedLayer3dInfo: null,
    lastestDeletedLayer3dInfo: null,
  },
  actions: {
  },
  mutations: {
    // 二维地图图层操作
    add2dLayer(state, lyrInfo) {
      state.lastestAddedLayer2dInfo = lyrInfo;
    },
    remove2dLayer(state, lyrInfo) {
      state.lastestDeletedLayer2dInfo = lyrInfo;
    },
    // clear2dLayers(state) {
    //   state.map2dLayers = [];
    // },

    // 三维地图图层操作
    add3dLayer(state, lyrInfo) {
      state.lastestAddedLayer3dInfo = lyrInfo;
    },
    remove3dLayer(state, lyrInfo) {
      state.lastestDeletedLayer3dInfo = lyrInfo;
    },
    // clear3dLayers(state) {
    //   state.map2dLayers = [];
    // },
  },
  getters: {

  },
};
