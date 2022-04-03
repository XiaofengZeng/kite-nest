import { mapState } from 'vuex';

/* 图层容器混入 */
export default {
  data() {
    return {
    };
  },
  computed: {
    ...mapState('layerContainer', ['lastestAddedLayer2dInfo', 'lastestDeletedLayer2dInfo']),
  },
  watch: {
    lastestAddedLayer2dInfo(lyrInfo) {
      this.addLayer(lyrInfo);
    },
    lastestDeletedLayer2dInfo(lyrInfo) {
      this.removeLayer(lyrInfo);
    },
  },
};
