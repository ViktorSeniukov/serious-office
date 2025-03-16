<script setup lang="ts">
    import type { ISosRequest } from '@/pages/Sos/types/ISosRequest.ts';
    import {RouterLink} from 'vue-router';
    import Button from 'primevue/button';

    type Props = ISosRequest

    const props = defineProps<Props>();

    const getToiletType = () => {
        switch (props.toiletType) {
        case 'man':
            return '🚹 Мужской';
        case 'woman':
            return '🚺 Женский';
        default:
            return '❓ Неизвестный';
        }
    };

    const getSosRequest = () => {
        switch (props.request) {
        case 'toilet_paper':
            return 'Туалетная бумага';
        case 'other':
            return 'Что-то еще, проверь запрос';
        default:
            return 'Скорее всего это туалетна бумага';
        }
    };

</script>

<template>
    <section class="flex flex-col items-center justify-center">
        <h1 class="text-2xl font-bold mb-3 text-center">Ваша заявка отправлена</h1>

        <span
            style="font-size: 60px"
            class="mb-3"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 50 50"
                width="1em"
                height="1em"
                xml:space="preserve"
            >
                <circle
                    style="fill:#25ae88"
                    cx="25"
                    cy="25"
                    r="25"
                />
                <path
                    style="fill:none;stroke:#fff;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10"
                    d="M38 15 22 33l-10-8"/>
            </svg>
        </span>

        <dl class="grid grid-cols-2 gap-2">

            <dt class="font-bold">Туалет</dt>
            <dd>{{ getToiletType() }}</dd>

            <dt class="font-bold">Комната</dt>
            <dd>{{ roomNumber }}</dd>

            <dt class="font-bold">Запрос</dt>
            <dd>{{ getSosRequest() }}</dd>

            <template v-if="message">
                <dt class="font-bold">Сообщение</dt>
                <dd>{{ message }}</dd>
            </template>
        </dl>

        <footer class="mt-8 w-full">
            <slot name="footer">
                <Button asChild
                >
                    <template #default="slotProps">
                        <RouterLink
                            to="/sos"
                            :class="slotProps?.class || ''"
                            class="w-full"
                        >
                            Создать новую заявку
                        </RouterLink>
                    </template>
                </Button>
            </slot>
        </footer>
    </section>
</template>

<style scoped>

</style>
