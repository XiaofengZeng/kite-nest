const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

// Cesium目录映射
const cesiumSource = 'node_modules/cesium/Source';
const cesiumWorkers = '../Build/Cesium/Workers';

module.exports = {
  publicPath: './',
  configureWebpack: {
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      // 定义别名，方便开发时引用文件
      alias: {
        cesium: path.resolve(__dirname, cesiumSource),
      },
    },
    plugins: [
      // 编译时，复制目录至指定文件夹
      new CopyWebpackPlugin([
        // Cesium的引用路径变换，配合CESIUM_BASE_URL使用
        { from: path.join(cesiumSource, cesiumWorkers), to: 'cesium/Workers' },
        { from: path.join(cesiumSource, 'Assets'), to: 'cesium/Assets' },
        { from: path.join(cesiumSource, 'Widgets'), to: 'cesium/Widgets' },
        { from: path.join(cesiumSource, 'ThirdParty/Workers'), to: 'cesium/ThirdParty/Workers' },
      ]),

      new webpack.DefinePlugin({
        // 修改Cesium引用路径，对应CopyWebpackPlugin中Cesium的to配置
        CESIUM_BASE_URL: JSON.stringify('./cesium'),
      }),
    ],
    module: {
      // 不打印webpack载入特定库时的警告
      unknownContextCritical: false,
      unknownContextRegExp: /\/cesium\/cesium\/Source\/Core\/buildModuleUrl\.js/,
    },
  },
  devServer: {
    port: 1215,
  },
};
