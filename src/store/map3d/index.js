export default {
  namespaced: true,
  state: {
    // 地图相关配置
    mapConfig: {
    },
    // 功能相关配置
    moduleDrectories: [
      {
        key: 'commonTool',
        title: '常用工具',
        list: [
          {
            id: '001',
            name: '三维测距',
            toggle: 'measureDistance',
            args: [],
          },
          {
            id: '002',
            name: '三维测面积',
            toggle: 'measureArea',
            args: [],
          },
          {
            id: '003',
            name: '属性查询',
            toggle: 'AttributesQuery',
            args: [],
          },
        ],
      },
      {
        key: 'analyzeTool',
        title: '分析工具',
        list: [
          {
            id: '001',
            name: '缓冲区分析',
            toggle: 'BufferAnalysis',
            args: [],
          },
          {
            id: '002',
            name: '可视分析',
            toggle: 'SightAnalysis',
            args: [],
          },
          {
            id: '003',
            name: '淹没分析',
            toggle: 'FloodAnalysis',
            args: [],
          },
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
  modules: {
  },
};
