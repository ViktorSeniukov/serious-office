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
</template>

<style scoped>
</style>
