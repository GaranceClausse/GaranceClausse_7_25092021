import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import Homepage from '@/views/Homepage.vue';
import Login from '@/views/Login.vue';
import Profil from '@/views/Profil.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'Accueil'
    }
  },
  {
    path: '/homepage',
    name: 'homepage',
    component: Homepage,
    meta: {
      title: 'Fil d\'actualité'
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: 'Login'
    }
  },
  {
    path: '/profil',
    name: 'Profil',
    component: Profil,
    meta: {
      title: 'Profil'
    }
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

router.afterEach((to) => {
  document.title = to.meta.title;
});

export default router;
