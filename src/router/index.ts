import { createRouter, createWebHistory } from 'vue-router';
import TestView from '../views/TestView.vue';
import SmokeView from '../views/SmokeView.vue';
import NotFoundView from '../views/NotFoundView.vue';
import { useQrCodeRedirect } from '@/features/useQrCodeRedirect.ts';

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
      path: '/qrcode',
      name: 'qrcode',
      redirect: () => useQrCodeRedirect()
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFoundView
    }
  ]
});

export default router;
