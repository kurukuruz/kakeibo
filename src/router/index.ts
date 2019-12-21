import Vue from 'vue';
import VueRouter from 'vue-router';
import firebase from 'firebase/app';
import Home from '@/views/Home.vue';
import Main from '@/views/Main.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/main',
    name: 'main',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Main,
  },
];

const router = new VueRouter({
  routes,
});

// 未認証の場合はログイン画面へ
router.beforeResolve((to, from, next) => {
  if (to.path === '/') {
    next();
  } else {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        next();
      } else {
        next({ path: '/' });
      }
    });
  }
});

export default router;
