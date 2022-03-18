<template>
  <div id="kn-map2d" class="kn-map2d-container">
  </div>
</template>

<script>
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import { transform } from 'ol/proj';

export default {
  name: 'Map2d',
  mounted() {
    this.map = new Map({
      target: 'kn-map2d',
      layers: [
        new TileLayer({
          source: new XYZ({
            url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          }),
        }),
      ],
      view: new View({
        projection: 'EPSG:3857',
        center: transform([114.42, 23.12], 'EPSG:4326', 'EPSG:3857'), // 惠州市
        zoom: 12,
      }),
    });
  },
};
</script>

<style>
.kn-map2d-container {
  height: 100%;
  width: 100%;
}
</style>
