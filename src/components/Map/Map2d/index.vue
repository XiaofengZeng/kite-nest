<template>
  <div id="kn-map2d" class="kn-map2d-container"></div>
</template>

<script>
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { transform } from 'ol/proj';

import ExecutorSubscriber from './mixin/subscriber/exectuor';
import Layer2dSubscriber from './mixin/subscriber/layer2d';
import DrawingHelper from './mixin/interaction/DrawingHelper';

export default {
  name: 'Map2d',
  data() {
    return {
      map2d: null,
    };
  },
  mixins: [ExecutorSubscriber, Layer2dSubscriber, DrawingHelper],
  methods: {
    createMap2d(id, config) {
      let baseLayer = null;
      // 底图
      if (!config.baseLayer.indexOf('http') > -1) {
        switch (config.baseLayer.toUpperCase()) {
          case 'OSM':
            baseLayer = new TileLayer({
              source: new OSM(),
            });
            break;
          default:
            break;
        }
      }
      // 视图
      const initialView = new View({
        projection: config.projection,
        center: transform(config.viewCenter, 'EPSG:4326', config.projection), // 惠州市
        zoom: config.zoom,
      });
      const map = new Map({
        target: id,
        layers: [baseLayer],
        view: initialView,
      });
      return map;
    },
  },
  mounted() {
    const { mapConfig } = this.$store.state.map2d;
    this.map2d = this.createMap2d('kn-map2d', mapConfig);
  },
};
</script>

<style>
.kn-map2d-container {
  height: 100%;
  width: 100%;
}
</style>
