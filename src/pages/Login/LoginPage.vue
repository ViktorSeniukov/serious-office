<script setup lang="ts">
    import TgWidgetLogin from './components/TgWidgetLogin.vue';
    import type { ITgWidgetLogin } from '@/pages/Login/types/ITgWidgetLogin.ts';
    import { useAuth } from '@/pages/Login/features/useAuth.ts';

    const loginCallBack = (user: ITgWidgetLogin) => {
        const {authCb} = useAuth();

        authCb(user);
    };
</script>

<template>
    <div class="login-page">
        <TgWidgetLogin
            @callback="loginCallBack"
            telegramLogin="sharpoffice_io_bot"
            mode="callback"
        />
    </div>
</template>

<style scoped>
.login-page {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>
