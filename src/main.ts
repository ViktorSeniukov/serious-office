import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import { setHeadInjectionHandler, VueHeadMixin } from '@unhead/vue';
import { VueQueryPlugin } from '@tanstack/vue-query';
import { vhPlugin } from '@/plugins/vhPlugin.ts';
import {head} from '@/plugins/head.ts';

const app = createApp(App);

app.mixin(VueHeadMixin);
setHeadInjectionHandler(() => head);


app.use(vhPlugin);
app.use(VueQueryPlugin);

app.use(createPinia());
app.use(router);

app.mount('#app');
