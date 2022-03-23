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
          { id: '001', cnName: '三维测距', enName: 'measureDistance' },
          { id: '002', cnName: '三维测面积', enName: 'measureArea' },
          { id: '003', cnName: '属性查询', enName: 'AttributesQuery' },
        ],
      },
      {
        key: 'analyzeTool',
        title: '分析工具',
        list: [
          { id: '001', cnName: '缓冲区分析', enName: 'BufferAnalysis' },
          { id: '002', cnName: '可视分析', enName: 'SightAnalysis' },
          { id: '003', cnName: '淹没分析', enName: 'FloodAnalysis' },
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
