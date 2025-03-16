<script setup lang="ts">
    import { RouterView } from 'vue-router';
    import { VueQueryDevtools } from '@tanstack/vue-query-devtools';
    import {useFeatureFlags} from '@/features/useFeatureFlags.ts';
    import { onMounted } from 'vue';
    import Toast from 'primevue/toast';

    onMounted(useFeatureFlags);
</script>

<template>
    <RouterView />
    <VueQueryDevtools />

    <Toast class="toast-container" />

    <div id="modals"></div>
    <div id="falling-effects"></div>
</template>

<style>
@media (max-width: 768px) {
    .toast-container {
        top: 5px !important;
        right: 5px !important;

        --p-toast-width: calc(100% - 10px);
    }
}
</style>
