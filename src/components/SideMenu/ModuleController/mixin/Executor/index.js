/* 功能执行器混入 */
export default {
  data() {
    return {
      executorMode: 'map2d', // 功能执行器模式，默认使用二维。map2d -> 二维；map3d -> 三维
    };
  },
  methods: {
    setExecutorMode(mode) {
      const modeLowerCase = mode.toLowerCase();
      switch (modeLowerCase) {
        case 'dashboard':
        case 'warehouse':
        case 'map3d':
          this.executorMode = modeLowerCase;
          break;
        case 'map':
        case 'map2d':
          this.executorMode = 'map2d';
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
};
