<script setup lang="ts">
    import RadioButton from 'primevue/radiobutton';
    import RadioButtonGroup from 'primevue/radiobuttongroup';
    import SelectButton from 'primevue/selectbutton';
    import Fieldset from 'primevue/fieldset';
    import Textarea from 'primevue/textarea';
    import Button from 'primevue/button';
    import { Form } from '@primevue/forms';
    import Dialog from 'primevue/dialog';

    import { ToiletTypes } from '@/pages/Sos/enums/ToiletTypes.ts';
    import { computed, ref, unref } from 'vue';
    import { SosRequestTypes } from '@/pages/Sos/enums/SosRequestTypes.ts';

    import axios from 'axios';
    import { BASE_API_URL } from '@/constants/baseUrl.ts';
    import type { ISosRequest } from '@/pages/Sos/types/ISosRequest.ts';
    import type { ISosResponse } from '@/pages/Sos/types/ISosResponse.ts';
    import SosStatusContent from '@/pages/Sos/components/SosStatusContent.vue';
    import { useCookies } from '@vueuse/integrations/useCookies';
    import { isDefined } from '@vueuse/core';
    import { useToast } from 'primevue';

    const cookies = useCookies();

    const toiletType = ref<ToiletTypes>(cookies.get('toilet_type') || null);
    const roomNumber = ref<number | null>(null);
    const requestType = ref<SosRequestTypes | null>(null);
    const requestMessage = ref<string>('');

    const isShowModal = ref<boolean>(false);
    const sosResponse = ref<ISosRequest | null>(null);

    const toast = useToast();

    const validateForm = () => {
        if (!(isDefined(toiletType) && isDefined(roomNumber) && isDefined(requestType))) {
            toast.add({
                severity: 'error',
                summary: 'Отправка невозможна',
                detail: 'Выберите туалет, номер кабинки и тип запроса',
                life: 5000
            });

            return false;
        }

        if (unref(requestType) === SosRequestTypes.OTHER && unref(requestMessage).trim() === '') {
            toast.add({
                severity: 'error',
                summary: 'Отправка невозможна',
                detail: 'При выборе типа "Другое" необходимо написать сообщение',
                life: 5000
            });

            return false;
        }

        return true;
    };

    const onSubmit = async () => {
        if (!validateForm()) {
            return;
        }

        const formState: ISosRequest = {
            toiletType: unref(toiletType) || ('' as ToiletTypes),
            roomNumber: unref(roomNumber) || 0,
            request: unref(requestType) || ('' as SosRequestTypes),
            message: unref(requestMessage) || ''
        };

        const { data } = await axios.post<ISosResponse>(`${BASE_API_URL}/sos`, formState, {
            headers: {
                Authorization: cookies.get('access_token')
            }
        });

        cookies.set('toilet_type', unref(toiletType));

        sosResponse.value = data?.data || null;
        isShowModal.value = true;
    };

    const resetForm = () => {
        toiletType.value =cookies.get('toilet_type');
        roomNumber.value = null;
        requestType.value = null;
        requestMessage.value = '';
    };

    const onCloseModal = () => {
        resetForm();
        isShowModal.value = false;
    };

    const isToiletTypeValid = computed(() => unref(toiletType) !== null);
</script>

<template>
    <section class="px-5 pb-5 overflow-hidden">
        <header class="relative pt-5">
            <h1 class="text-3xl text-center font-bold mt-[7%]">Обратись за помощью в туалете</h1>
            <span
                style="--custom-width: calc(100% * 1.3)"
                class="absolute -top-px -right-[20%] transform-[rotate(-7deg)] w-(--custom-width) text-start p-2 bg-pink-500 z-50"
            >
                <h2 class="ml-[6%] font-bold text-xl text-white">Легко! Бесплано! Анонимно!</h2>
            </span>
        </header>

        <Form
            @submit="onSubmit"
            class="flex flex-col gap-4 mt-4"
        >
            <Fieldset
                legend="Выберете туалет"
                toggleable>
                <RadioButtonGroup
                    v-model="toiletType"
                    :invalid="!isToiletTypeValid"
                    name="toiletType"
                    class="flex flex-wrap"
                >
                    <label class="cursor-pointer flex items-center gap-2 py-3 px-4">
                        <RadioButton :value="ToiletTypes.MAN" />

                        Мужской
                    </label>
                    <label class="cursor-pointer flex items-center gap-2 py-3 px-4">
                        <RadioButton :value="ToiletTypes.WOMAN" />

                        Женский
                    </label>
                </RadioButtonGroup>
            </Fieldset>

            <Fieldset
                legend="Выберете номер кабинки"
                :toggleable="isToiletTypeValid"
                :collapsed="!isToiletTypeValid"
            >
                <SelectButton
                    v-model="roomNumber"
                    :disabled="toiletType === null"
                    :options="['1', '2', '3']"
                    name="roomNumber"
                    class="mb-5 w-full sos-form-room"
                />

                <div class="relative grid grid-cols-3 gap-3 p-6 w-full border-1 rounded-md text-neutral-300 mb-3"
                >
                    <div class="flex items-center justify-center border-2 h-[60px] rounded-md text-neutral-300"
                    >
                        1
                    </div>
                    <div class="flex items-center justify-center border-2 h-[60px] rounded-md text-neutral-300"
                    >
                        2
                    </div>
                    <div class="flex items-center justify-center border-2 h-[60px] rounded-md text-neutral-300"
                    >
                        3
                    </div>

                    <span
                        :class="[
                            toiletType === ToiletTypes.MAN ? 'right-(--custom-right)' : 'left-(--custom-right)',
                        ]"
                        style="
              --custom-right: calc(
                calc(
                    100% - calc(calc(var(--spacing)) * 6 * 2) - calc(calc(var(--spacing) * 3) * 2)
                  ) /
                  6
              );
            "
                        class="absolute bottom-0 bg-white transform-[translateY(50%)] px-3 border-l-2 border-r-2 text-neutral-300"
                    >
                        Дверь
                    </span>
                </div>
            </Fieldset>

            <Fieldset
                legend="Что требуется"
                :toggleable="isToiletTypeValid"
                :collapsed="!isToiletTypeValid"
            >
                <RadioButtonGroup
                    v-model="requestType"
                    :formControl="{ validateOnValueUpdate: true }"
                    name="requestType"
                    class="grid grid-cols-2 gap-2 w-full grid-rows-1"
                >
                    <label
                        :class="{ 'image-radio-label--checked': requestType === SosRequestTypes.TOILET_PAPER }"
                        class="image-radio-label w-full p-4 border-1 border-[var(--p-radiobutton-border-color)] rounded-md flex items-center justify-start flex-col gap-2 font-semibold"
                    >
                        <RadioButton
                            :value="SosRequestTypes.TOILET_PAPER"
                            class="sr-only!" />

                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="100%"
                            height="100%"
                            class="max-w-[110px] h-fit"
                        >
                            <path
                                fill="currentColor"
                                d="M20,0H6.5C3.977,0,2,3.075,2,7v14c0,1.103-.897,2-2,2v1H13.5c1.93,0,3.5-1.57,3.5-3.5v-4.5h3c2.243,0,4-3.514,4-8S22.243,0,20,0Zm-4,8v12.5c0,1.379-1.121,2.5-2.5,2.5H2.234c.476-.531,.766-1.232,.766-2V7c0-3.252,1.603-6,3.5-6h11.535c-1.224,1.353-2.035,3.952-2.035,7Zm1,7v-1.655c.294,.662,.643,1.222,1.035,1.655h-1.035Zm3,0c-1.419,0-3-2.875-3-7s1.581-7,3-7,3,2.875,3,7-1.581,7-3,7Zm1-7c0,.828-.448,1.5-1,1.5s-1-.672-1-1.5,.448-1.5,1-1.5,1,.672,1,1.5Z"
                            />
                        </svg>
                        <span class="h-full flex items-center justify-center text-center flex-1">
                            Туалетная бумага
                        </span>
                    </label>

                    <label
                        :class="{ 'image-radio-label--checked': requestType === SosRequestTypes.OTHER }"
                        class="image-radio-label w-full p-4 border-1 border-[var(--p-radiobutton-border-color)] rounded-md flex items-center justify-start flex-col gap-2 font-semibold"
                    >
                        <RadioButton
                            :value="SosRequestTypes.OTHER"
                            class="sr-only!" />

                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="100%"
                            height="100%"
                            class="max-w-[110px] h-fit"
                        >
                            <path
                                fill="currentColor"
                                d="m0,2.5v7.5h10V0H2.5C1.122,0,0,1.122,0,2.5Zm9,6.5H1V2.5c0-.827.673-1.5,1.5-1.5h6.5v8Zm13-6.5c0-1.378-1.122-2.5-2.5-2.5h-7.5v10h10V2.5Zm-1,6.5h-8V1h6.5c.827,0,1.5.673,1.5,1.5v6.5ZM0,19.5c0,1.378,1.122,2.5,2.5,2.5h7.5v-10H0v7.5Zm1-6.5h8v8H2.5c-.827,0-1.5-.673-1.5-1.5v-6.5Zm22.605,9.898l-3.605-3.605c.616-.77,1-1.733,1-2.793,0-2.481-2.019-4.5-4.5-4.5s-4.5,2.019-4.5,4.5,2.019,4.5,4.5,4.5c1.06,0,2.023-.384,2.793-1l3.605,3.605.707-.707Zm-7.105-2.898c-1.93,0-3.5-1.57-3.5-3.5s1.57-3.5,3.5-3.5,3.5,1.57,3.5,3.5-1.57,3.5-3.5,3.5Z"
                            />
                        </svg>
                        <span class="h-full flex items-center justify-center text-center flex-1">
                            Другое
                        </span>
                    </label>
                </RadioButtonGroup>
            </Fieldset>

            <Fieldset
                legend="Оставьте сообщение"
                :toggleable="isToiletTypeValid"
                :collapsed="!isToiletTypeValid"
            >
                <Textarea
                    v-model="requestMessage"
                    :variant="'filled'"
                    autoResize
                    name="message"
                    rows="5"
                    class="w-full"
                />
            </Fieldset>

            <Button type="submit"> Отправить заявку </Button>
        </Form>
    </section>

    <Dialog
        v-model:visible="isShowModal"
        modal
    >
        <SosStatusContent
            :toiletType="sosResponse?.toiletType || '' as ToiletTypes"
            :roomNumber="sosResponse?.roomNumber || 0"
            :request="sosResponse?.request || '' as SosRequestTypes"
            :message="sosResponse?.message || '' as string"
        >
            <template #footer>
                <Button
                    @click="onCloseModal"
                    type="button"
                    class="w-full"
                >
                    Закрыть
                </Button>
            </template>
        </SosStatusContent>
    </Dialog>
</template>

<style scoped>
.sos-form-room :deep(button) {
  width: 100%;
}

.image-radio-label {
  transition:
    background var(--p-radiobutton-transition-duration),
    color var(--p-radiobutton-transition-duration),
    border-color var(--p-radiobutton-transition-duration),
    box-shadow var(--p-radiobutton-transition-duration),
    outline-color var(--p-radiobutton-transition-duration);
}

.image-radio-label--checked {
  border-color: var(--p-radiobutton-checked-hover-border-color);
  outline-color: var(--p-radiobutton-checked-hover-background);
  outline-offset: var(--p-radiobutton-border-width);
  outline-style: solid;
  outline-width: var(--p-radiobutton-border-width);
}
</style>
