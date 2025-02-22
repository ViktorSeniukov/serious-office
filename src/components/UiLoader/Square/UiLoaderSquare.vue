<script setup lang="ts">

</script>

<template>
    <i class="ui-loader-square"></i>
</template>

<style scoped>

.ui-loader-square {
    --color: #c03360;
    --size-square: 3vmin;

    position: relative;
    width: 50%;
    display: grid;
    place-items: center;
}

.ui-loader-square::before,
.ui-loader-square::after {
    content: '';
    box-sizing: border-box;
    position: absolute;
}

.ui-loader-square::before,
.ui-loader-square::after {
    width: var(--size-square);
    height: var(--size-square);
    background-color: var(--color);
}

.ui-loader-square::before {
    top: calc(50% - var(--size-square));
    left: calc(50% - var(--size-square));
    animation: ui-loader-square-2 2.4s cubic-bezier(0, 0, 0.24, 1.21) infinite;
}

.ui-loader-square::after {
    top: 50%;
    left: 50%;
    animation: ui-loader-square-1 2.4s cubic-bezier(0, 0, 0.24, 1.21) infinite;
}

@keyframes ui-loader-square-2 {
    0%, 100% {
        transform: none;
    }

    25% {
        transform: translateX(100%);
    }

    50% {
        transform: translateX(100%) translateY(100%);
    }

    75% {
        transform: translateY(100%);
    }
}

@keyframes ui-loader-square-1 {
    0%, 100% {
        transform: none;
    }

    25% {
        transform: translateX(-100%);
    }

    50% {
        transform: translateX(-100%) translateY(-100%);
    }

    75% {
        transform: translateY(-100%);
    }
}
</style>
