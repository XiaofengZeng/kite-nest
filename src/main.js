import Vue from 'vue';
import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
import './style/element-kn-primary/index.css'; // ElementUI自定义主题色 #f5995a

import * as Cesium from 'cesium/Cesium';
import widget from 'cesium/Widgets/widgets.css';

import App from './App.vue';
import router from './router';
import store from './store';

import './style/kn.less';
import 'ol/ol.css';

// 定义为全局变量，以便调用
Vue.prototype.Cesium = Cesium;
Vue.prototype.Widgets = widget;

Vue.config.productionTip = false;

Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
