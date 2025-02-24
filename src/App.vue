<script setup lang="ts">
    import { RouterView } from 'vue-router';
    import { VueQueryDevtools } from '@tanstack/vue-query-devtools';
    import {useFeatureFlags} from '@/features/useFeatureFlags.ts';
    import { onMounted } from 'vue';

    onMounted(useFeatureFlags);
</script>

<template>
    <RouterView />
    <VueQueryDevtools />

    <div id="modals"></div>
    <div id="falling-effects"></div>
</template>

<style scoped>
</style>
