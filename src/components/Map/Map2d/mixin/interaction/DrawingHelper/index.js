/* 绘制帮助器混入 */

import { Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';
import { Draw } from 'ol/interaction/Draw';

export default {
  data() {
    return {
      drawLayerSource: new VectorSource({ wrapX: false }),
    };
  },
  mounted() {
    this.initDrawLayer();
  },
  methods: {
    // 初始化绘制图层
    initDrawLayer() {
      const drawLayer = new VectorLayer({
        source: this.drawLayerSource,
      });
      this.map2d.addLayer(drawLayer);
    },
    // 增加交互+监听绘制
    addInteraction(type) {
      const drawInteraction = new Draw({
        source: this.drawLayerSource,
        type,
      });
      this.map2d.addInteraction(drawInteraction);
    },
    // 测距
    measureDistance() {
      // TODO: 完成测距逻辑
      const drawInteraction = new Draw({
        source: this.drawLayerSource,
        type: 'LineString',
      });
      function drawEndHandler(event) {
        console.log(event);
      }
      drawInteraction.on('drawend', drawEndHandler());
      this.map2d.addInteraction(drawInteraction);
    },
    // 测面积
    measureArea() {
      // TODO: 完成测面积逻辑
      this.addInteraction('Polygon');
    },
  },
};
