<template>
    <div class="sos-view">
        <RouterView />
    </div>
</template>

<style>
@import "tailwindcss";

:root {
    --gutter: 8px;
}
</style>

<style scoped>
.sos-view {
    height: calc(var(--vh) * 100);
}
</style>
