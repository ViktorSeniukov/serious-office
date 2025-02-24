<script setup lang="ts">
    import PooClickSvg from '@/components/Svg/PooClickSvg.vue';
    import PooSvg from '@/components/Svg/PooSvg.vue';
</script>

<template>
    <button class="poo-button"
    >
        <PooSvg class="poo-button__svg poo-button__svg--default" />
        <PooClickSvg class="poo-button__svg poo-button__svg--click" />
        <span class="poo-button__label">
            Я покакал
        </span>
    </button>
</template>

<style scoped>
.poo-button {
    height: 160px;
    width: 200px;
    background-color: transparent;
    border: none;
    position: relative;
}

.poo-button:active .poo-button__svg {
    color: var(--custom-poo-brown);
}

.poo-button:active .poo-button__svg--default {
    display: none;
}
.poo-button:active .poo-button__svg--click {
    display: block;
}

.poo-button__svg {
    width: 95%;
    color: var(--custom-poo-brown);
}

.poo-button__svg--click {
    display: none;
}

.poo-button__label {
    position: absolute;
    top: 58%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: fit-content;
    font-size: 1.8rem;
    color: hsl(0, 0%, 100%);
    text-wrap: balance;
}
</style>
