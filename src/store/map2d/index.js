import executor from '../executor';

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
          {
            id: '001', // 功能编号
            name: '测距', // 功能名称
            toggle: 'measureLength', // 触发方法名
            args: ['LineString'], // 触发参数
          },
          {
            id: '002',
            name: '侧面积',
            toggle: 'measureArea',
            args: ['Polygon'],
          },
          {
            id: '003',
            name: '属性查询',
            toggle: 'indentify',
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
            toggle: 'bufferAnalysis',
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
    executor,
  },
};
