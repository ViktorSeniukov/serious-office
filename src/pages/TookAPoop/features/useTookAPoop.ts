import { computed, ref, unref } from 'vue';
import Cookies, { type CookieChangeOptions } from 'universal-cookie';
import { useFallingEffect } from '@/features/useFallingEffect.ts';
import { useFeatureFlags } from '@/features/useFeatureFlags.ts';
import { BASE_API_URL } from '@/constants/baseUrl.ts';

export const useTookAPoop = () => {
    const { data } = useFeatureFlags();

    const savedTime = computed<number>(() => Number(cookies.get('last_poop')));

    const setStartedTime = () => {
        if (unref(savedTime)) {
            lastClickTime.value = unref(savedTime);
        }
    };

    const cookies = new Cookies();

    const userName = ref<string>('');

    const setUserName = (): void => {
        userName.value = cookies.get('user_name');
    };

    const lastClickTime = ref<number>(0);

    const {loadCssForFalling, createEffect} = useFallingEffect('💩');

    cookies.addChangeListener(({ name, value }: CookieChangeOptions) => {
        if (name === 'last_poop') {
            lastClickTime.value = Number(value);
        }
    });

    const isShowModal = ref<boolean>(false);
    const showModal = (): void => {
        isShowModal.value = true;
    };

    const cooldown = 30 * 1000;

    const onClickPoop = () => {
        const now = Date.now();

        if (now - lastClickTime.value < cooldown) {
            showModal();
            return;
        }

        cookies.set('last_poop', now);

        if (unref(data)?.is_show_poo_animate) {
            createEffect();
        }

        try {
            fetch(`${BASE_API_URL}/poop`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                },
                body: JSON.stringify({ userName: unref(userName) || 'Кто-то' })
            })
              .then(() => cookies.set('user_name', unref(userName)));
        } catch (error) {
            throw error;
        }
    };

    return {
        loadCssForFalling,
        setStartedTime,
        onClickPoop,
        userName,
        isShowModal,
        setUserName
    };
};
