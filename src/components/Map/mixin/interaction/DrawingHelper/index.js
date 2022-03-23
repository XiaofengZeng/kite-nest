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
      switch (mode.toUpperCase()) {
        case '2D':
          this.is2dDrawing = true;
          break;
        case '3D':
          this.is2dDrawing = false;
          break;
        default:
          throw new Error('DrawingMode Error');
      }
    },
    // 测距
    measureDistance() {
      console.log(111);
    },
  },
};
