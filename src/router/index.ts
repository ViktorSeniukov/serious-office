import { createRouter, createWebHistory } from 'vue-router';
import TestView from '../views/TestView.vue';
import NotFoundView from '../views/NotFoundView.vue';
import QrCodeView from '../views/QrCodeView.vue';
import TookAPoopView from '@/views/TookAPoopView.vue';
import SmokeRulesPage from '@/pages/SmokeRules/SmokeRulesPage.vue';
import SmokeTimePage from '@/pages/SmokeTime/SmokeTimePage.vue';
// import { inject } from 'vue';
// import { QueryClient } from '@tanstack/vue-query';
// import { fetchFeatureFlags } from '@/features/fetchFeatureFlags.ts';

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
            component: () => import('../views/SmokeView.vue'),
            children: [
                {
                    path: '',
                    name: 'smoke_rules',
                    component: SmokeRulesPage
                },
                {
                    path: 'time',
                    name: 'smoke_time',
                    component: SmokeTimePage
                }
            ]
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

// router.beforeEach(async (to) => {
//     const queryClient = inject('queryClient', new QueryClient());
//     const data = await queryClient.fetchQuery({
//         queryKey: ['flags'],
//         queryFn: async () => {
//             return await fetchFeatureFlags();
//         }
//     });
//
//     const whiteListRoutes = ['qrcode', 'NotFound', 'test'];
//
//     const availableRoutes = [...whiteListRoutes, ...data.available_routes];
//
//     if (!availableRoutes.includes(to.name as string)) {
//         return {
//             name: 'NotFound',
//             params: { pathMatch: to.path.substring(1).split('/') }
//         };
//     }
// });

export default router;
