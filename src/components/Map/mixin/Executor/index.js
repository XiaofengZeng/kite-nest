import { mapState } from 'vuex';

/* 功能执行器混入 */
export default {
  data() {
    return {
      executorMode: 'map2d', // 功能执行器模式，默认使用二维。map2d -> 二维；map3d -> 三维
    };
  },
  methods: {
    setExecutorMode(mode) {
      switch (mode.toLowerCase()) {
        case 'map2d':
          this.executorMode = 'map2d';
          break;
        case 'map3d':
          this.executorMode = 'map3d';
          break;
        default:
          throw new Error('ExecutorMode Error');
      }
    },
    // 执行方法
    execute(name, ...args) {
      const methodObj = {
        name,
        args,
      };
      this.$store.commit(`${this.executorMode}/executor/addMethod`, methodObj);
    },
  },
  computed: {
    // TODO: 命名空间
    ...mapState('map2d/executor', ['methodList']),
    // ...mapState(`${this.executorMode}/executor`, ['methodList']),
  },
  watch: {
    methodList(_, newList) {
      if (newList.length) {
        newList.forEach((item) => {
          // 执行组件中的方法
          this[item.name](...item.args);
        });
        // 重置执行方法列表
        this.$store.commit(`${this.executorMode}/executor/resetMethodList`);
      }
    },
  },
};
