<script setup lang="ts">
    import { ref, onMounted, defineProps, defineEmits } from 'vue';
    import type { ITgWidgetLogin } from '@/pages/Login/types/ITgWidgetLogin.ts';

    const telegram = ref<HTMLDivElement | null>(null);
    const emit = defineEmits<{
        (e: 'callback', user: ITgWidgetLogin): void;
    }>();

    declare global {
        interface Window {
            onTelegramAuth?: (user: ITgWidgetLogin) => void;
        }
    }

    const props = defineProps<{
        mode: 'callback' | 'redirect';
        telegramLogin: string;
        redirectUrl?: string;
        requestAccess?: 'read' | 'write';
        size?: 'small' | 'medium' | 'large';
        userpic?: boolean;
        radius?: string;
    }>();

    const onTelegramAuth = (user: ITgWidgetLogin) => {
        emit('callback', user);
    };

    onMounted(() => {
        const script = document.createElement('script');
        script.async = true;
        script.src = 'https://telegram.org/js/telegram-widget.js?3';

        script.setAttribute('data-size', props.size ?? 'large');
        script.setAttribute('data-userpic', String(props.userpic ?? true));
        script.setAttribute('data-telegram-login', props.telegramLogin);
        script.setAttribute('data-request-access', props.requestAccess ?? 'read');

        if (props.radius) {
            script.setAttribute('data-radius', props.radius);
        }

        if (props.mode === 'callback') {
            window.onTelegramAuth = onTelegramAuth;
            script.setAttribute('data-onauth', 'window.onTelegramAuth(user)');
        } else {
            script.setAttribute('data-auth-url', props.redirectUrl ?? '');
        }

        telegram.value?.appendChild(script);
    });
</script>

<template>
    <div ref="telegram"></div>
</template>
