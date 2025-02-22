<script setup lang="ts">
    import { useFeatureFlags } from '@/features/useFeatureFlags.ts';
    import { computed, unref } from 'vue';
    import { UiLoaderTypes } from '@/enums/UiLoaderTypes.ts';
    import UiLoaderText from '@/components/UiLoader/Text/UiLoaderText.vue';
    import UiLoaderSquare from '@/components/UiLoader/Square/UiLoaderSquare.vue';

    const { data: flags } = useFeatureFlags();

    const uiLoaderType = computed<UiLoaderTypes>(() => unref(flags)?.ui_loader_type as UiLoaderTypes);
    const uiLoaderText = computed<string>(() => unref(flags)?.ui_loader_text as string);
</script>

<template>
    <div class="ui-loader">
        <UiLoaderText
            v-if="uiLoaderType === UiLoaderTypes.TEXT"
            :text="uiLoaderText"
        />

        <UiLoaderSquare v-if="uiLoaderType === UiLoaderTypes.SQUARE" />
    </div>
</template>

<style scoped>
.ui-loader {
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
