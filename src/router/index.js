import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeView from '../views/HomeView.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('../components/Dashboard'),
      },
      {
        path: 'warehouse',
        name: 'Warehouse',
        component: () => import('../components/Warehouse'),
      },
      {
        path: 'map',
        name: 'Map',
        component: () => import('../views/MapView'),
        // 访问 http://localhost:1215/#/map 时重定向至 http://localhost:1215/#/map/2d
        redirect: '/map/2d',
        children: [
          {
            path: '2d',
            name: 'Map2d',
            component: () => import('../components/Map/Map2d'),
          },
          // TODO: 后续会添加三维地图组件
        ],
      },
    ],
  },
  {
    path: '/login',
    component: () => import('../views/LoginView.vue'),
    name: 'Login',
    meta: {
      isLogin: true,
    },
  },
];

const router = new VueRouter({
  routes,
});

// 全局前置路由守卫
router.beforeEach((to, from, next) => {
  // 鉴权
  if (to.meta.isLogin) {
    next();
  } else {
    const token = JSON.parse(localStorage.getItem('kn-token'));
    if (token && token.name === 'admin' && token.expires > new Date().getTime()) {
      next();
    } else {
      // 非法用户/token过期
      next({
        path: '/login',
      });
    }
  }
});

export default router;
