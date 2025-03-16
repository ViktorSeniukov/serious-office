<script setup lang="ts">
    import Button from 'primevue/button';
    import router from '@/router';
    import { useAuth } from '@/pages/Login/features/useAuth.ts';

    const {updateToken} = useAuth();

    const reload = async () => {
        await updateToken();

        const redirectTo = new URL(location.href).searchParams.get('redirectTo');

        return router.push(redirectTo || '/');
    };
</script>

<template>
    <div class="px-5 py-5 mx-auto flex justify-center items-center flex-col h-full">
        <h1 class="text-xl font-bold text-center">
            Доступ запрещен, подождите пока вам добавят права для просмотра раздела
        </h1>

        <Button
            @click="reload"
            class="mt-10"
        >
            Перезагрузить страницу
        </Button>
    </div>
</template>

<style>
@import "tailwindcss";
</style>
