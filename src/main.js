import Vue from 'vue';
import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
import './style/element-kn-primary/index.css'; // ElementUI自定义主题色 #f5995a

import App from './App.vue';
import router from './router';
import store from './store';

import './style/kn.less';
import 'ol/ol.css';

const cesium = require('cesium/Cesium.js');
const widgets = require('cesium/Widgets/widgets.css');
// 定义为全局变量，以便调用
Vue.prototype.Cesium = cesium;
Vue.prototype.Widgets = widgets;

Vue.config.productionTip = false;

Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
