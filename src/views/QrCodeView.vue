<script setup lang="ts">
    import { useQrCodeRedirect } from '@/features/useQrCodeRedirect.ts';
    import { unref, watch } from 'vue';
    import { useFeatureFlags } from '@/features/useFeatureFlags.ts';
    import UiLoader from '@/components/UiLoader/UiLoader.vue';

    const {isFetched} = useFeatureFlags();
    const {redirect} = useQrCodeRedirect();

    watch(isFetched, () => {
        if (unref(isFetched)) {
            redirect();
        }
    });
</script>

<template>
    <UiLoader class="qr-code-view" />
</template>

<style scoped>
.qr-code-view {
    height: calc(var(--vh) * 100);
}
</style>
