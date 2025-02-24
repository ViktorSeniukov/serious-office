<script setup lang="ts">
    import { onMounted } from 'vue';
    import PooButton from '@/pages/TookAPoop/ui/components/button/PooButton.vue';
    import UiModal from '@/components/UiModal/UiModal.vue';
    import UiInput from '@/components/UiInput/UiInput.vue';
    import { useTookAPoop } from '@/pages/TookAPoop/features/useTookAPoop.ts';

    const {
        loadCssForFalling,
        setStartedTime,
        onClickPoop,
        userName,
        isShowModal,
        setUserName
    } = useTookAPoop();

    onMounted(() => {
        loadCssForFalling();
        setStartedTime();
        setUserName();
    });
</script>

<template>
    <div class="took-a-poop">
        <h2 class="took-a-poop__title">Какаешь? :)</h2>
        <p class="took-a-poop__description">
            Ты можешь сказать кто ты если хочешь :) это необязательно
        </p>

        <UiInput
            v-model="userName"
            class="took-a-poop__input"
        />

        <PooButton
            @click="onClickPoop"
            class="took-a-poop__button"
        />
    </div>

    <UiModal
        v-model:open="isShowModal"
        title="Ты слишком часто какаешь -_-"
        footer-button-label="Close"
        modalClass="took-a-poop-modal"
        class="took-a-poop__modal"
    >
        <template #body>
            <p>Посмотри тут 👇</p>

            <a
                href="https://goo.su/rBD2XA"
                target="_blank"
            >
                тут
            </a>
        </template>
    </UiModal>
</template>

<style scoped>
.took-a-poop {
    height: calc(var(--vh) * 100);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: var(--gutter) calc(var(--gutter) * 2);
}

.took-a-poop__title {
    font-size: 2.5rem;
}

.took-a-poop__description {
    font-size: 1.25rem;
    font-family: 'Roboto', sans-serif;
}

.took-a-poop__input {
    --custom-ui-input-border-color: hsl(22, 78%, 26%);

    width: 260px;
}

@media (min-width: 475px) {
    .took-a-poop__input {
        width: 300px;
    }
}

.took-a-poop__button {
    margin-top: calc(var(--gutter) * 4);
}
</style>

<style>
.took-a-poop-modal {
    --custom-ui-input-bg-color: hsl(23, 83%, 31%);
    --custom-ui-input-bg-color-hover: hsl(26, 90%, 37%);
    --custom-ui-input-bg-color-active: hsl(22, 78%, 26%);
}
</style>
