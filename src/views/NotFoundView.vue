<script setup lang="ts">

</script>

<template>
    <section>
        <h2>Нет такой страницы, зато теперь мы точно знаем</h2>
        <h1>что ты точно сосал :) &#128527;</h1>

        <RouterLink to="/">
            Пройти тест
        </RouterLink>
    </section>
</template>

<style scoped>
section {
  width: 100%;
  height: calc(var(--vh) * 100);

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 2rem;

  padding: 2rem;

  background-color: light-dark(#ffffff, #000000);
  color: light-dark(#000000, #ffffff);

  color-scheme: light dark;
}

h1, h2 {
  margin: 0;
}
</style>
