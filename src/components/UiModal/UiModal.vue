<script setup lang="ts">
    import UiModalBase from '@/components/UiModal/UiModalBase.vue';
    import UiButton from '@/components/UiButton/UiButton.vue';

    interface Props {
        title?: string
        footerButtonLabel?: string
        modalClass?: string
    }

    defineProps<Props>();

    interface Emits {
        (_event: 'onOpenModal'): void
        (_event: 'onHideModal'): void
    }

    const emits = defineEmits<Emits>();

    const open = defineModel<boolean>('open',{default: false});

    const hideModal = (): void => {
        open.value = false;

        emits('onHideModal');
    };
</script>

<template>
    <Teleport to="#modals">
        <UiModalBase
            v-bind="$attrs"
            @close="hideModal"
            :show="open"
            :class="modalClass"
            class="ui-modal"
        >
            <template #header>
                <slot name="header">
                    <h3 class="ui-modal__title">{{ title }}</h3>
                </slot>
            </template>
            <template #body>
                <slot name="body"></slot>
            </template>
            <template #footer>
                <slot name="footer">
                    <UiButton @click="hideModal">
                        {{ footerButtonLabel }}
                    </UiButton>
                </slot>
            </template>
        </UiModalBase>
    </Teleport>
</template>

<style scoped>
.ui-modal__title {
  margin-top: 0;
    font-weight: 700;
}
</style>
