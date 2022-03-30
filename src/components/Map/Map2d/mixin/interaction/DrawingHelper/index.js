/* 绘制帮助器混入 */

import { Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';
import {
  Style,
  Stroke,
  Fill,
  Circle as CircleStyle,
} from 'ol/style';
import Draw from 'ol/interaction/Draw';
import { Overlay } from 'ol';
import { LineString, Polygon } from 'ol/geom';
import { getArea, getLength } from 'ol/sphere';
import { unByKey } from 'ol/Observable';

export default {
  data() {
    return {
      drawLayerSource: new VectorSource({ wrapX: false }),
      drawLayer: null,
      measureSupporter: {
        drawInteraction: null, // 交互，后续切换绘制模式时可移除

        sketch: null, // 绘制时的草图
        sketchListener: null,

        helpTooltip: null, // 帮助提示工具
        helpTooltipElement: null,

        measureTooltip: null, // 绘制提示工具
        measureTooltipElement: null,

        // 继续绘制草图的提示
        continueLineMsg: '点击继续绘制当前线段',
        continuePolygonMsg: '点击继续绘制当前多边形',
      },
    };
  },
  mounted() {
    this.initDrawLayer();
  },
  methods: {
    // 初始化绘制图层
    initDrawLayer() {
      const style = new Style({
        fill: new Fill({
          color: [255, 255, 255, 0.5],
        }),
        stroke: new Stroke({
          color: '#F5995A',
          width: 3,
        }),
      });
      this.drawLayer = new VectorLayer({
        name: 'drawLayer',
        source: new VectorSource({ wrapX: false }),
        style,
      });
    },
    // 增加交互+监听绘制
    addInteraction(type) {
      // 现在已有绘制交互则移除
      if (this.measureSupporter.drawInteraction) {
        this.map2d.removeInteraction(this.measureSupporter.drawInteraction);
      }

      const drawLayerSource = this.drawLayer.getSource();
      const style = new Style({
        fill: new Fill({
          color: [255, 255, 255, 0.5],
        }),
        stroke: new Stroke({
          color: '#F5995A',
          lineDash: [10, 10],
          width: 3,
        }),
        // 绘制时指针的样式
        image: new CircleStyle({
          radius: 5,
          fill: new Fill({
            color: [255, 255, 255, 0.5],
          }),
          stroke: new Stroke({
            color: '#F5995A',
            width: 1.5,
          }),
        }),
      });
      this.measureSupporter.drawInteraction = new Draw({
        source: drawLayerSource,
        type,
        style,
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

      this.addInteraction(geometryType);

      this.createHelpTooltip();
      this.createMeasureTooltip();
      this.createPointerTooltip();

      // 绘制监听
      this.measureSupporter.drawInteraction.on('drawstart', (evt) => {
        this.measureSupporter.sketch = evt.feature;
        let tooltipCoord = evt.coordinate;

        this.measureSupporter.sketchListener = this.measureSupporter.sketch.getGeometry().on('change', (e) => {
          const gemo = e.target;
          let output;

          if (gemo instanceof LineString) {
            output = this.formatLength(gemo);
            tooltipCoord = gemo.getLastCoordinate();
          } else if (gemo instanceof Polygon) {
            output = this.formatArea(gemo);
            tooltipCoord = gemo.getInteriorPoint().getCoordinates();
          }

          this.measureSupporter.measureTooltipElement.innerHTML = output;
          this.measureSupporter.measureTooltip.setPosition(tooltipCoord);
        });
      });
      this.measureSupporter.drawInteraction.on('drawend', () => {
        this.measureSupporter.measureTooltipElement.className = 'ol-tooltip ol-tooltip-static';
        this.measureSupporter.measureTooltip.setOffset([0, -7]);
        // 绘制草图置空
        this.measureSupporter.sketch = null;
        // DOM元素置空，为了后续重新创建的同时保留原先的DOM元素
        this.measureSupporter.measureTooltipElement = null;
        this.createMeasureTooltip();
        unByKey(this.measureSupporter.sketchListener);
      });
    },

    // 创建鼠标指针提示工具
    createPointerTooltip() {
      this.map2d.on('pointermove', (evt) => {
        if (evt.dragging) {
          return;
        }

        let helpMsg = '点击开始绘制...';

        if (this.measureSupporter.sketch) {
          const geom = this.measureSupporter.sketch.getGeometry();
          if (geom instanceof Polygon) {
            helpMsg = this.measureSupporter.continuePolygonMsg;
          } else if (geom instanceof LineString) {
            helpMsg = this.measureSupporter.continueLineMsg;
          }
        }

        this.measureSupporter.helpTooltipElement.innerHTML = helpMsg;
        this.measureSupporter.helpTooltip.setPosition(evt.coordinate);

        this.measureSupporter.helpTooltipElement.classList.remove('hidden');
      });

      this.map2d.getViewport().addEventListener('mouseout', () => {
        this.measureSupporter.helpTooltipElement.classList.add('hidden');
      });
    },

    // 创建帮助提示工具
    createHelpTooltip() {
      if (this.measureSupporter.helpTooltipElement) {
        this.measureSupporter.helpTooltipElement.parentNode
          .removeChild(this.measureSupporter.helpTooltipElement);
      }
      this.measureSupporter.helpTooltipElement = document.createElement('div');
      // TODO 更改样式
      this.measureSupporter.helpTooltipElement.className = 'ol-tooltip hidden';
      this.measureSupporter.helpTooltip = new Overlay({
        element: this.measureSupporter.helpTooltipElement,
        offset: [15, 0],
        positioning: 'center-left',
      });
      this.map2d.addOverlay(this.measureSupporter.helpTooltip);
    },

    // 创建绘制提示工具
    createMeasureTooltip() {
      if (this.measureSupporter.measureTooltipElement) {
        this.measureSupporter.measureTooltipElement.parentNode
          .removeChild(this.measureSupporter.measureTooltipElement);
      }
      this.measureSupporter.measureTooltipElement = document.createElement('div');
      // TODO 更改样式
      this.measureSupporter.measureTooltipElement.className = 'ol-tooltip ol-tooltip-measure';
      this.measureSupporter.measureTooltip = new Overlay({
        element: this.measureSupporter.measureTooltipElement,
        offset: [0, -15],
        positioning: 'bottom-center',
        stopEvent: false, // 确定Overlay的DOM元素存放的DOM容器(true -> 与Control放在相同的容器中)，用于控制事件冒泡
        insertFirst: false, // 确定Overlay是否不与Control重叠（总是显示在Control下方）
      });
      this.map2d.addOverlay(this.measureSupporter.measureTooltip);
    },

    // 格式化距离
    formatLength(line) {
      const length = getLength(line);
      let output;
      if (length > 100) {
        output = `${Math.round((length / 1000) * 100) / 100} km`;
      } else {
        output = `${Math.round(length * 100) / 100} km`;
      }
      return output;
    },

    // 格式化面积
    formatArea(polygon) {
      const area = getArea(polygon);
      let output;
      if (area > 10000) {
        output = `${Math.round((area / 1000000) * 100) / 100} km<sup>2</sup>`;
      } else {
        output = `${Math.round(area * 100) / 100} m<sup>2</sup>`;
      }
      return output;
    },
  },
};