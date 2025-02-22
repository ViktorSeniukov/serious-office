<script setup lang="ts">

</script>

<template>
    <div class="poo-wrapper">
        <div class="poo"></div>
        <div
            v-if="$slots.content"
            class="poo-content"
        >
            <slot name="content"></slot>
        </div>
    </div>
</template>

<style scoped>
.poo-wrapper {
    --poo-width: var(--custom-poo-width, 100px);
    --poo-height: calc(var(--poo-width) * 0.85); /* Высота пропорциональна ширине */

    --poo-brown: var(--custom-poo-brown, hsl(42, 99%, 27%));

    position: relative;
    width: var(--poo-width);
    height: var(--poo-height);
}

.poo {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);

    display: inline-block;
    border-radius: calc(var(--poo-width) * 0.15);
    width: var(--poo-width);
    height: calc(var(--poo-height) * 0.35);
    background: var(--poo-brown);
}

.poo::before,
.poo::after {
    content: "";
    display: block;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
}

.poo::before {
    background: var(--poo-brown);
    border-radius: calc(var(--poo-width) * 0.15);
    top: calc(var(--poo-height) * -0.3);
    width: calc(var(--poo-width) * 0.75);
    height: calc(var(--poo-height) * 0.35);
}

.poo::after {
    border-top-left-radius: calc(var(--poo-width) * 0.3);
    top: calc(var(--poo-height) * -0.65);
    width: 0;
    height: 0;
    border-bottom: calc(var(--poo-height) * 0.355) solid var(--poo-brown);
    border-right: calc(var(--poo-width) * 0.4) solid transparent;
}

.poo-content {
    position: absolute;
    top: 70%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: calc(var(--poo-width) - 30%);
    height: calc(var(--poo-height) - 40%);
}
</style>
