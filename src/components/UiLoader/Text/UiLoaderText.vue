<script setup lang="ts">
    import { computed } from 'vue'

    interface Props {
        text: string
    }

    const props = defineProps<Props>();

    const loaderText = computed<string>(() => `"${props.text}"`);
</script>

<template>
    <div class="ui-loader-text">
        <div class="ui-loader-text__loader"></div>
    </div>
</template>

<style scoped>
.ui-loader-text {
  position: relative;
  width: 200px;
  height: 200px;
  margin: auto;
  overflow: hidden;
}

.ui-loader-text::before {
  content: v-bind(loaderText);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: #bd313b;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.ui-loader-text__loader {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  width: 200px;
  height: 200px;
  border: 4px solid #bd313b;
  border-radius: 50%;
  border-right-color: transparent;
  animation:
    spin 2000ms linear infinite,
    color 2000ms linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes color {
  0% {
    border-color: #bd313b transparent;
  }
  25% {
    border-color: #7a1f24 transparent;
  }
  50% {
    border-color: #3f0f12 transparent;
  }
  75% {
    border-color: #7a1f24 transparent;
  }
  100% {
    border-color: #bd313b transparent;
  }
}
</style>
