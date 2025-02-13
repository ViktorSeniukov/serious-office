import { useHead } from '@unhead/vue';
import { ref, unref, watch } from 'vue';

export const loadCss = (path: string): void => {
  const style = ref<string>('');

  fetch(path)
    .then((res) => res.text())
    .then((text: string) => style.value = text);

  watch(style, () => {
    useHead({
      style: [unref(style)]
    });
  });
};
