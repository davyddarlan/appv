import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/nova-compatibilizacao',
    component: () => import('../views/NovaCompatibilizacao.vue')
  }, 
  {
    path: '/map',
    component: () => import('../views/Map.vue'),
  },
  {
    path: '/questions',
    component: () => import('../views/Questions.vue'),
  },
  {
    path: '/lista-ambientes',
    component: () => import('../views/ListaAmbientes.vue'),
  },
  {
    path: '/parecer',
    component: () => import('../views/Parecer.vue'),
  },
  {
    path: '/lista-projetos',
    component: () => import('../views/ListaProjetos.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
