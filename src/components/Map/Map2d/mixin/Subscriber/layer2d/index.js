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
    map2dLayers(newList) {
      if (newList.length) {
        newList.forEach((item) => {
          // 执行组件中的方法
          this[item.name](...item.args);
        });
        // 重置执行方法列表
        this.$store.commit('map2d/executor/resetMethodList');
      }
    },
    shutdownList(newList) {
      if (newList.length) {
        newList.forEach(() => {
          // 执行组件中的方法
          this.shutdown();
        });
        // 重置执行关闭列表
        this.$store.commit('map2d/executor/resetShutdownList');
      }
    },
  },
};
