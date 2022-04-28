<script>
import { WMTS } from 'ol/source';
import WMTSTileGrid from 'ol/tilegrid/WMTS';
import { get } from 'ol/proj';
import { getTopLeft, getWidth } from 'ol/extent';
import TileLayer from 'ol/layer/Tile';
// import Attribution from 'ol/control/Attribution';

export default {
  data() {
    return {};
  },
  methods: {
    addTileLayerWithWMTS(opt) {
      let source = null;
      switch (opt.name) {
        case '天地图':
          source = this._setTDTSource(opt.url);
          break;
        default:
          break;
      }
      // Tile图层
      const tileLayer = new TileLayer({
        id: opt.id,
        opacity: 1,
        wrapX: true,
        source,
      });
      this.map2d.addLayer(tileLayer);
    },

    _setTDTSource(url) {
      const projection = get('EPSG:4326');
      const projectionExtent = projection.getExtent();
      const size = getWidth(projectionExtent) / 256;
      const resolutions = new Array(19);
      const matrixIds = new Array(19);
      for (let z = 0; z < 19; ++z) {
        resolutions[z] = size / 2 ** z;
        matrixIds[z] = z;
      }

      return new WMTS({
        url, // 地址
        attributions: [
          'Tiles&copy;<a herf="https://www.tianditu.gov.cn/">天地图</a>',
        ],
        matrixSet: 'c', // 矩阵集
        format: 'png',
        projection,
        tileGrid: new WMTSTileGrid({
          origin: getTopLeft(projectionExtent),
          resolutions,
          matrixIds,
        }),
        style: 'default',
      });
    },
  },
};
</script>
