import { mapState } from 'vuex';

/* 图层容器混入 */
export default {
  data() {
    return {
    };
  },
  computed: {
    ...mapState('layerContainer', ['map2dLayers']),
  },
  watch: {
    map2dLayers(newList, oldList) {
      const newListLength = newList.length;
      const oldListLength = oldList.length;
      let lyrCfg;
      if (newListLength - oldListLength > 0) {
        // 添加图层
        lyrCfg = newList[newList.length - 1];
        this.addLayer(lyrCfg);
      } else {
        // 移除图层
        // TODO: 获取两数组差别数据
        lyrCfg = null;
        this.removeLayer(lyrCfg);
      }
    },
  },
};
