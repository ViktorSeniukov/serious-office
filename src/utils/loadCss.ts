import { useHead } from '@unhead/vue';

export const loadCss = (path: string): void => {
  fetch(path)
    .then((res) => res.text())
    .then((text: string) => {
      useHead({
        style: [text]
      });
    });
};
