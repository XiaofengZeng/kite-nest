/* 绘制帮助混入 */
export default {
  data() {
    return {
      is2dDrawing: true, // 是否为二维地图绘制？默认为true
    };
  },
  methods: {
    // 设置绘制模式（二维绘制/三维绘制），需要在初始化地图时设置
    setDrawingMode(mode) {
      switch (mode.toLowerCase()) {
        case 'map2d':
          this.is2dDrawing = true;
          break;
        case 'map3d':
          this.is2dDrawing = false;
          break;
        default:
          throw new Error('DrawingMode Error');
      }
    },
    // 测距
    measureDistance() {
      // TODO: 完成测距逻辑
      console.log(111);
    },
  },
};
