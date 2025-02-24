<script setup lang="ts">

</script>

<template>
    <button class="ui-button">
        <slot></slot>
    </button>
</template>

<style scoped>
.ui-button {
    font-family: 'Roboto', sans-serif;
    display: inline-block;
    outline: none;
    cursor: pointer;
    border-radius: 3px;
    font-size: 14px;
    font-weight: 500;
    line-height: 16px;
    padding: 2px 16px;
    height: 38px;
    min-width: 96px;
    width: 100%;
    min-height: 38px;
    border: none;
    color: var(--custom-ui-input-color, hsl(0, 0%, 100%));
    background-color: var(--custom-ui-input-bg-color, hsl(235, 86%, 65%));
    transition: background-color .17s ease,color .17s ease;
}

.ui-button:hover {
    background-color: var(--custom-ui-input-bg-color-hover, hsl(235, 51%, 52%));
}

.ui-button:active {
    background-color: var(--custom-ui-input-bg-color-active);
}
</style>
