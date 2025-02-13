import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import { createHead, VueHeadMixin } from '@unhead/vue';
import { vhPlugin } from '@/plugins/vhPlugin.ts';

const app = createApp(App);

const head = createHead();
app.mixin(VueHeadMixin);
app.use(head);

app.use(vhPlugin);

app.use(createPinia());
app.use(router);

app.mount('#app');
