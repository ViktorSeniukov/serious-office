<script setup lang="ts">
    import Poo from '@/components/Poo/Poo.vue';
    import { onMounted, ref, unref } from 'vue';
    import { loadCss } from '@/utils/loadCss.ts';
    import { useHead } from '@unhead/vue';
    import { BASE_URL } from '@/constants/baseUrl.ts';

    const userName = ref<string>('');

    const onPoop = () => {
        fetch(`${BASE_URL}/api/poop`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ userName: unref(userName) || 'Кто-то'})
        });
    };

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
                href: 'https://fonts.googleapis.com/css2?family=Rubik+Puddles&display=swap'
            },
            {
                rel: 'stylesheet',
                href: 'https://fonts.googleapis.com/css2?family=Roboto:wght@400&display=swap'
            }
        ]
    });

    onMounted(() => loadCss('TookAPoopView.specific.css'));
</script>

<template>
    <div class="took-a-poop">
        <h2 class="took-a-poop__title">Какаешь? :)</h2>
        <p class="took-a-poop__description">
            Ты можешь сказать кто ты если хочешь :) это необязательно
        </p>

        <input
            v-model="userName"
            type="text"
        >

        <Poo class="took-a-poop__poo">
            <template #content>
                <div class="poo-button-wrapper">
                    <button
                        @click="onPoop"
                        class="poo-button"
                    >
                        Я покакал
                    </button>
                </div>
            </template>
        </Poo>
    </div>
</template>

<style scoped>
.took-a-poop {
    height: calc(var(--vh) * 100);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: var(--gutter) calc(var(--gutter) * 2);
}

.took-a-poop__title {
    font-size: 2.5rem;
}

.took-a-poop__description {
    font-size: 1.25rem;
    font-family: "Roboto", sans-serif;
}

.took-a-poop__poo {
    margin-top: calc(var(--gutter) * 4);
}

.poo-button-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.poo-button {
    height: 70%;
    background-color: hsla(var(--hsl-custom-poo-brown), 0.2);
    border: none;
    font-size: 1.8rem;
    color: hsl(0, 0%, 100%);
    text-wrap: balance;
}

input[type=text] {
    appearance: none;
    border: none;
    outline: none;
    border-bottom: .2em solid hsl(340, 82%, 52%);
    background-color: hsla(340, 82%, 52%, .2);
    border-radius: .2em .2em 0 0;
    padding: .4em;
    color: hsl(340, 82%, 52%);
    font-size: 1.5rem;
}
</style>
