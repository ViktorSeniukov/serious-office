<script setup lang="ts">
    import { useRoute } from 'vue-router';
    import SosStatusContent from '@/pages/Sos/components/SosStatusContent.vue';
    import type { ToiletTypes } from '@/pages/Sos/enums/ToiletTypes.ts';
    import type { SosRequestTypes } from '@/pages/Sos/enums/SosRequestTypes.ts';

    const {
        toilet,
        room,
        request,
        message
    } = useRoute().query;


</script>

<template>
    <div class="sos-status-page h-full flex flex-column items-center justify-center">
        <SosStatusContent
            :toiletType="toilet as ToiletTypes"
            :roomNumber="Number(room)"
            :request="request as SosRequestTypes"
            :message="message as string"
            class="mx-4 shadow-xl py-10 px-6"
        />
    </div>
</template>
