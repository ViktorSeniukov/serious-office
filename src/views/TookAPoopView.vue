<script setup lang="ts">
    import { onMounted } from 'vue';
    import { loadCss } from '@/utils/loadCss.ts';
    import { useHead } from '@unhead/vue';
    import TookAPoopPage from '@/pages/TookAPoop/TookAPoopPage.vue';
    import {useTitle} from '@vueuse/core';

    useTitle('Приятных покакушек');

    useHead({
        link: [
            {
                rel: 'preconnect',
                href: 'https://fonts.googleapis.com'
            },
            {
                rel: 'preconnect',
                href: 'https://fonts.gstatic.com'
            },
            {
                rel: 'stylesheet',
                href: 'https://fonts.googleapis.com/css2?family=Rubik+Puddles&display=swap'
            },
            {
                rel: 'stylesheet',
                href: 'https://fonts.googleapis.com/css2?family=Roboto:wght@100..900&display=swap'
            }
        ]
    });

    onMounted(() => loadCss('TookAPoopView.specific.css'));
</script>

<template>
    <TookAPoopPage />
</template>
