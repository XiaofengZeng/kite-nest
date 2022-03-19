export default {
  namespaced: true,
  state: {
    // 地图相关配置
    mapConfig: {
      // 底图
      baseLayer: 'OSM',
      // 系统坐标系
      projection: 'EPSG:3857',
      // 视图中心点
      viewCenter: [114.42, 23.12],
      // 初始缩放层级
      zoom: 12,
    },
    // 功能相关配置
    actionsConfig: {
    },
  },
  mutations: {
  },
  actions: {
  },
  getters: {
  },
};
