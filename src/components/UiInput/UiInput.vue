<script setup lang="ts">
    const model = defineModel<string>();
</script>

<template>
    <input
        v-model="model"
        type="text"
        class="ui-input"
    >
</template>

<style scoped>
.ui-input {
    border: 3px solid #000;
    border-radius: 5px;
    height: 50px;
    line-height: normal;
    color: #282828;
    display: block;
    width: 100%;
    box-sizing: border-box;
    user-select: auto;
    font-size: 16px;
    padding: 0 6px;
    padding-left: 12px;
}

.ui-input:focus {
    border: 3px solid var(--custom-ui-input-border-color, hsl(241, 100%, 66%));
}
</style>
