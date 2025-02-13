import { useWindowSize } from '@vueuse/core';
import { computed, unref, watch } from 'vue';

export const vhPlugin = {
  install: () => {
    const { height } = useWindowSize();
    const vh = computed<number>(() => unref(height) * 0.01);

    watch(height, () => {
      document.documentElement.style.setProperty('--vh', `${unref(vh)}px`);
    }, {immediate: true});
  }
};
