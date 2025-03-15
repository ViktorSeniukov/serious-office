import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import PrimeVue from 'primevue/config';

import App from './App.vue';
import router from './router';
import { setHeadInjectionHandler, VueHeadMixin } from '@unhead/vue';
import SimpleAnalytics from 'simple-analytics-vue';
import { VueQueryPlugin, QueryClient } from '@tanstack/vue-query';
import { vhPlugin } from '@/plugins/vhPlugin.ts';
import {head} from '@/plugins/head.ts';
import Aura from '@primeuix/themes/aura';

const app = createApp(App);

app.mixin(VueHeadMixin);
setHeadInjectionHandler(() => head);

app.use(SimpleAnalytics, { skip: process.env.NODE_ENV !== 'production' });

app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
});

const DEFAULT_STALE_TIME = 1000 * 60 * 60; // 1 hour
const DEFAULT_GC_TIME = DEFAULT_STALE_TIME * 5; // 5 hours
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: DEFAULT_STALE_TIME,
            gcTime: DEFAULT_GC_TIME
        }
    }
});

app.provide('queryClient', queryClient);
app.use(VueQueryPlugin);

app.use(vhPlugin);

app.use(createPinia());

app.use(router);

app.mount('#app');
