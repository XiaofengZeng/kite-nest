/* 绘制帮助器混入 */

import { Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';
import Draw from 'ol/interaction/Draw';

export default {
  data() {
    return {
      drawLayerSource: new VectorSource({ wrapX: false }),
      drawLayer: null,
      measureSupporter: {
        drawInteraction: null, // 交互

        sketch: null, // 绘制时的草图

        helpTooltip: null, // 帮助提示工具
        helpTooltipElement: null,

        measureTooltip: null, // 绘制提示工具
        measureTooltipElement: null,

        // 继续绘制草图的提示
        continueLineMsg: 'Click to continue drawing the line',
        continuePolygonMsg: 'Click to continue drawing the polygon',
      },
    };
  },
  mounted() {
    this.initDrawLayer();
  },
  methods: {
    // 初始化绘制图层
    initDrawLayer() {
      this.drawLayer = new VectorLayer({
        name: 'drawLayer',
        source: new VectorSource({ wrapX: false }),
      });
    },
    // 增加交互+监听绘制
    addInteraction(type) {
      // 现在已有绘制交互则移除
      if (this.measureSupporter.drawInteraction) {
        this.map2d.removeInteraction(this.measureSupporter.drawInteraction);
      }

      const drawLayerSource = this.drawLayer.getSource();
      this.measureSupporter.drawInteraction = new Draw({
        source: drawLayerSource,
        type,
      });
      this.map2d.addInteraction(this.measureSupporter.drawInteraction);
    },

    // 测量（测距/侧面加）
    mesure(geometryType) {
      // 原先已将绘制图层加入地图中则忽略再次添加
      const drawLayer = [];
      this.map2d.getLayers().getArray().forEach((layer) => {
        if (layer.get('name') === 'drawLayer') {
          drawLayer.push(layer);
        }
      });
      if (!drawLayer.length) {
        this.map2d.addLayer(this.drawLayer);
      }

      // TODO：丰富交互
      this.addInteraction(geometryType);
    },
  },
};
