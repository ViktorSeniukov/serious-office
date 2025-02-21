<script setup lang="ts">
    import { useFeatureFlags } from '@/features/useFeatureFlags.ts';
    import { useQrCodeRedirect } from '@/features/useQrCodeRedirect.ts';
    import { useFeatureFlagsStore } from '@/stores/featureFlagsStore.ts';
    import { unref, watch } from 'vue';
    import { useFlagsMapping } from '@/features/useFlagsMapping.ts';

    const { data } = useFeatureFlags();

    const {isUpdate, setFlags} = useFeatureFlagsStore();

    const {redirect} = useQrCodeRedirect();

    watch(data,  () => {
        setFlags(useFlagsMapping().map(unref(data) || []));
    });

    watch(isUpdate, () => {
        if (unref(isUpdate)) redirect();
    });
</script>

<template></template>
