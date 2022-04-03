import Vue from 'vue';
import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
import './style/element-kn-primary/index.css'; // ElementUI自定义主题色 #f5995a

import * as Cesium from 'cesium/Cesium';
import widget from 'cesium/Widgets/widgets.css';

import request from './api';

import App from './App.vue';
import router from './router';
import store from './store';

import 'ol/ol.css';
import './style/kn.less';
import './style/kn-ol-custom.less';

// 定义为全局变量，以便调用
Vue.prototype.Cesium = Cesium;
Vue.prototype.Widgets = widget;

Vue.prototype.knRequest = request;

Vue.config.productionTip = false;

Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
