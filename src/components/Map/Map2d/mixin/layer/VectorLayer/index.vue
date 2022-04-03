<script>
import {
  Circle as CircleStyle,
  Fill,
  Stroke,
  Style,
} from 'ol/style';
import { Vector as VectorLayer } from 'ol/layer';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';

export default {
  data() {
    return {
      styles: {
        Point: new Style({
          // image: image,
        }),
        LineString: new Style({
          stroke: new Stroke({
            color: 'green',
            width: 1,
          }),
        }),
        MultiLineString: new Style({
          stroke: new Stroke({
            color: 'green',
            width: 1,
          }),
        }),
        MultiPoint: new Style({
          // image: image,
        }),
        MultiPolygon: new Style({
          stroke: new Stroke({
            color: 'rgba(243, 128, 49, 1)',
            width: 1,
          }),
          fill: new Fill({
            color: 'rgba(255, 255, 0, 0.1)',
          }),
        }),
        Polygon: new Style({
          stroke: new Stroke({
            color: 'blue',
            lineDash: [4],
            width: 3,
          }),
          fill: new Fill({
            color: 'rgba(0, 0, 255, 0.1)',
          }),
        }),
        GeometryCollection: new Style({
          stroke: new Stroke({
            color: 'magenta',
            width: 2,
          }),
          fill: new Fill({
            color: 'magenta',
          }),
          image: new CircleStyle({
            radius: 10,
            fill: null,
            stroke: new Stroke({
              color: 'magenta',
            }),
          }),
        }),
        Circle: new Style({
          stroke: new Stroke({
            color: 'red',
            width: 2,
          }),
          fill: new Fill({
            color: 'rgba(255,0,0,0.2)',
          }),
        }),
      },
    };
  },
  methods: {
    // 加载GeoJSON数据
    addVectorLayerWithGeoJSON(opt) {
      this.knRequest.get(opt.url).then((response) => {
        const features = new GeoJSON().readFeatures(response.data, {
          dataProjection: 'EPSG:4326', // GeoJSON数据投影坐标系
          featureProjection: 'EPSG:3857', // ol.Feature投影坐标系
        });
        const source = new VectorSource({
          features,
        });
        this.vectorlayer({
          id: opt.id, // 标识图层，用于后续移除
          source,
          // style: style // 可自定义传入图层样式
        });
      });
    },

    vectorlayer(opt) {
      const lyr = new VectorLayer({
        id: opt.id,
        source: opt.source,
        style: opt.style || this.styleFunction,
      });
      this.map2d.addLayer(lyr);
      // TODO: 视图平移
    },
    styleFunction(feature) {
      return this.styles[feature.getGeometry().getType()];
    },
  },
};
</script>
