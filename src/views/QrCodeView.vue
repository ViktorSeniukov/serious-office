<script setup lang="ts">
    import QrCodePage from '@/pages/QrCode/QrCodePage.vue';
    import {useTitle} from '@vueuse/core';

    useTitle('qrcode');
</script>

<template>
    <QrCodePage />
</template>
