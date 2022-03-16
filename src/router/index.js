import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeView from '../views/HomeView.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
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
