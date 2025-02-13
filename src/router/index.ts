import { createRouter, createWebHistory } from 'vue-router';
import TestView from '../views/TestView.vue';
import SmokeView from '../views/SmokeView.vue';
import NotFoundView from '../views/NotFoundView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'test',
      component: TestView
    },
    {
      path: '/smoke',
      name: 'smoke',
      component: SmokeView
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFoundView
    }
  ]
});

export default router;
