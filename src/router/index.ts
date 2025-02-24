import { createRouter, createWebHistory } from 'vue-router';
import TestView from '../views/TestView.vue';
import SmokeView from '../views/SmokeView.vue';
import NotFoundView from '../views/NotFoundView.vue';
import QrCodeView from '../views/QrCodeView.vue';
import TookAPoopView from '@/views/TookAPoopView.vue';
import { inject } from 'vue';
import { QueryClient } from '@tanstack/vue-query';
import { fetchFeatureFlags } from '@/features/fetchFeatureFlags.ts';

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
            path:'/took-a-poop',
            name: 'took_a_poop',
            component: TookAPoopView
        },
        {
            path: '/qrcode',
            name: 'qrcode',
            component: QrCodeView
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'NotFound',
            component: NotFoundView
        }
    ]
});

router.beforeEach(async (to) => {
    const queryClient = inject('queryClient', new QueryClient());
    const data = await queryClient.fetchQuery({
        queryKey: ['flags'],
        queryFn: async () => {
            return await fetchFeatureFlags();
        }
    });

    const whiteListRoutes = ['qrcode', 'NotFound', 'test'];

    const availableRoutes = [...whiteListRoutes, ...data.available_routes];

    if (!availableRoutes.includes(to.name as string)) {
        return { name: 'NotFound' };
    }
});

export default router;
