<script setup lang="ts">
    import { useHead } from '@unhead/vue';
    import {useTitle} from '@vueuse/core';

    useTitle('Идем курить?');

    useHead({
        link: [
            {
                rel: 'preconnect',
                href: 'https://fonts.googleapis.com'
            },
            {
                rel: 'preconnect',
                href: 'https://fonts.gstatic.com'
            },
            {
                rel: 'stylesheet',
                href: 'https://fonts.googleapis.com/css2' +
                    '?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;' +
                    '1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap'
            }
        ],
        htmlAttrs: {
            lang: 'ru'
        }
    });
</script>

<template>
    <RouterView />
</template>

<style>
:root {
  --gutter: 8px;

  --neon-orange: hsl(44, 97%, 72%);
  --neon-orange-50: hsl(44, 97%, 72%, .5);
  --neon-pink: hsl(309, 70%, 58%);
  --neon-pink-50: hsla(309, 70%, 58%, .5);

  --dark-main: hsl(212, 41%, 15%);
  --light-main: hsl(32, 92%, 95%);

  color-scheme: light dark;
}

html {
  background-color: light-dark(var(--light-main), var(--dark-main));

  scroll-behavior: smooth;
}

body {
  padding: 0;
  font-family: 'Poppins', sans-serif;
  font-weight: 400;
  color: light-dark(var(--dark-main), var(--light-main));
}

* {
  box-sizing: border-box;
}

ul {
  list-style-type: none;
  padding: 0;
}

html {
  background-color: light-dark(var(--light-main), var(--dark-main));

  scroll-behavior: smooth;
}

body {
  margin: 0;
  padding: 0;
  font-family: 'Poppins', sans-serif;
  font-weight: 400;
  color: light-dark(var(--dark-main), var(--light-main));
}

.button {
  border: none;
  outline: none;
  cursor: pointer;
  font-size: 24px;
  text-decoration: none;
  text-transform: none;
  color: light-dark(var(--light-main), var(--dark-main));
  padding: var(--gutter) calc(var(--gutter) * 2);
  backdrop-filter: blur(4px);

  background-color: hsla(0, 0%, 100%, 0);
}
.button:not(.button--neon) {
  min-height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.button--neon {
  color: var(--neon-button);
  border: 1px solid var(--neon-button);
  box-shadow:
    0 0 5px var(--neon-button),
    0 0 5px inset;
}
.button--neon:after {
  position: absolute;
  content: '';
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  height: 70%;
  border: 1px solid var(--neon-button);
  box-shadow: 0 0 5px var(--neon-button) inset;
  opacity: 0;
  transition: all 0.3s ease;
}
.button--neon:hover:after {
  opacity: 1;
}
</style>
