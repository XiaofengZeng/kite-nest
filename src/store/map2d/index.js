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

    // 图层资源相关配置
    defaultCheckedKeys: ['t001-1'],
    layerDirectories: [
      {
        id: 't001',
        name: '底图',
        disabled: true,
        children: [
          {
            id: 't001-1',
            name: 'OpenStreeMap',
            tag: 'baseLayer',
            type: 'wmts',
            url: 'https://geo.datav.aliyun.com/areas_v3/bound/441300_full.json',
          },
          {
            id: 't001-2',
            name: '天地图',
            tag: 'baseLayer',
            type: 'wmts',
            url: 'http://t0.tianditu.gov.cn/img_c/wmts?LAYER=img&tk=20a24b65d7901cf54d9bd05843e70f5b',
          },
        ],
      },
      {
        id: 't002',
        name: '供应商',
        children: [
          {
            id: 't002-1',
            name: '供应商-1',
            type: '',
          },
        ],
      },
      {
        id: 't003',
        name: '零售商',
        type: '',
      },
      {
        id: 't004',
        name: '批发商',
        type: '',
      },
      {
        id: 't005',
        name: '惠州市行政区划',
        type: 'geojson',
        url: 'https://geo.datav.aliyun.com/areas_v3/bound/441300_full.json',
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
