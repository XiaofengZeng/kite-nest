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
    moduleDrectories: [
      {
        key: 'commonTool',
        title: '常用工具',
        list: [
          { id: '001', cnName: '测距', enName: 'measureDistance' },
          { id: '002', cnName: '侧面积', enName: 'measureArea' },
          { id: '003', cnName: '属性查询', enName: 'AttributesQuery' },
        ],
      },
      {
        key: 'analyzeTool',
        title: '分析工具',
        list: [
          { id: '001', cnName: '缓冲区分析', enName: 'BufferAnalysis' },
        ],
      },
    ],
    // 当前激活的功能
    activatedModules: [],
    activatedModule: '',
  },
  mutations: {
    addToActivatedModules(state, name) {
      state.activatedModules.push(name);
    },
    romoveFromActivatedModules(state, name) {
      const index = state.activatedModules.indexOf(name);
      if (index > -1) {
        state.activatedModules.splice(index, 1);
      }
    },
    setActivatedModule(state, name) {
      state.activatedModule = name;
    },
  },
  actions: {
  },
  getters: {
  },
};
