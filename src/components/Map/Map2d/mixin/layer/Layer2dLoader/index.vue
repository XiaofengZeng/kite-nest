<script>
import VectorLayer from '../VectorLayer';

export default {
  name: 'Layer2dLoader',
  data() {
    return {
    };
  },
  mixins: [VectorLayer],
  methods: {
    addLayer(lyrInfo) {
      // TODO: 根据type加载图层
      switch (lyrInfo.type.toLowerCase()) {
        case 'geojson':
          this.addVectorLayerWithGeoJSON(lyrInfo);
          break;
        default:
          console.log('default');
          break;
      }
    },
    removeLayer(lyrInfo) {
      // 遍历图层类型+属性（图层ID），匹配则移除
      const layers = this.map2d.getLayers().getArray();
      for (let i = 0; i < layers.length; i += 1) {
        const layer = layers[i];
        if (layers[i].get('id') === lyrInfo.id) {
          this.map2d.removeLayer(layer);
        }
      }
    },
  },
};
</script>
