// 图层加载器
export default {
  name: 'Layer2dLoader',
  data() {
    return {};
  },
  methods: {
    addLayer(lyrOpt) {
      // TODO: 根据type加载图层
      switch (lyrOpt.type.toLowerCase()) {
        case 'geojson':
          break;
        default:
          break;
      }
    },
    removeLayer() {
      // TODO: 移除图层
    },
  },
};
