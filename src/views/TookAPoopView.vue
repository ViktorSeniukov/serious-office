<script setup lang="ts">
    import Poo from '@/components/Poo/Poo.vue';
    import { onMounted, ref, unref } from 'vue';
    import { loadCss } from '@/utils/loadCss.ts';
    import { useHead } from '@unhead/vue';
    import { BASE_URL } from '@/constants/baseUrl.ts';
    import Cookies from 'universal-cookie';
    import type { CookieChangeOptions } from 'universal-cookie';
    import UiModal from '@/components/UiModal/UiModal.vue';
    import { useFeatureFlags } from '@/features/useFeatureFlags.ts';

    const { data } = useFeatureFlags();

    const isShowModal = ref(false);
    const showModal = (): void => {
        isShowModal.value = true;
    };
    const hideModal = (): void => {
        isShowModal.value = false;
    };

    const cookies = new Cookies();

    const userName = ref<string>('');

    const createPoo = () => {
        const pooCount = Math.floor(Math.random() * 5) + 3; // От 3 до 7 какашек

        for (let i = 0; i < pooCount; i++) {
            const poo = document.createElement('div');
            poo.className = 'poo-animate';
            poo.textContent = '💩';

            // Случайная горизонтальная позиция
            poo.style.left = `${Math.random() * 100}vw`;

            // Случайный начальный размер
            const size = Math.random() * 20 + 20; // от 20px до 40px
            poo.style.fontSize = `${size}px`;

            // Немного разной скорости падения
            const duration = Math.random() * 2 + 2; // от 2 до 4 сек
            poo.style.animationDuration = `${duration}s`;

            document.body.appendChild(poo);

            setTimeout(() => poo.remove(), duration * 1000); // Удаляем после анимации
        }
    };

    const lastClickTime = ref<number>(0); // Храним время последнего нажатия

    onMounted(() => {
        const savedTime = cookies.get('last_poop');
        if (savedTime) {
            lastClickTime.value = Number(savedTime);
        }
    });

    cookies.addChangeListener(({ name, value }: CookieChangeOptions) => {
        if (name === 'last_poop') {
            lastClickTime.value = Number(value);
        }
    });

    const cooldown = 30 * 1000; // 30 секунд в миллисекундах

    const onPoop = () => {
        const now = Date.now();

        if (now - lastClickTime.value < cooldown) {
            showModal();
            return;
        }

        cookies.set('last_poop', now);

        if (unref(data)?.is_show_poo_animate) {
            createPoo();
        }

        fetch(`${BASE_URL}/api/poop`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify({ userName: unref(userName) || 'Кто-то' })
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
                href: 'https://fonts.googleapis.com/css2?family=Roboto:wght@100..900&display=swap'
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
            type="text" >

        <Poo class="took-a-poop__poo">
            <template #content>
                <div class="poo-button-wrapper">
                    <button
                        @click="onPoop"
                        class="poo-button">Я покакал</button>
                </div>
            </template>
        </Poo>
    </div>

    <Teleport to="#modals">
        <!-- use the modal component, pass in the prop -->
        <UiModal
            @close="hideModal"
            :show="isShowModal">
            <template #header>
                <h3>Ты слишком часто какаешь -_-</h3>
            </template>
            <template #body>
                <p>Посмотри тут 👇</p>

                <a
                    href="https://goo.su/rBD2XA"
                    target="_blank"> тут </a>
            </template>
            <template #footer>
                <button
                    @click="hideModal"
                    class="modal-button">Read More</button>
            </template>
        </UiModal>
    </Teleport>
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
  font-family: 'Roboto', sans-serif;
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
  background-color: transparent;
  border: none;
  font-size: 1.8rem;
  color: hsl(0, 0%, 100%);
  text-wrap: balance;
}

input[type='text'] {
  appearance: none;
  border: none;
  outline: none;
  border-bottom: 0.2em solid var(--poo-pink);
  background-color: hsla(var(--hsl-poo-pink), 0.2);
  border-radius: 0.2em 0.2em 0 0;
  padding: 0.4em;
  color: var(--poo-pink);
  font-size: 1.5rem;
}

.modal-button {
  font-family: 'Roboto', sans-serif;
  width: 100%;
  height: 40px;
  color: #fff;
  border-radius: 5px;
  padding: 10px 25px;
  font-weight: 500;
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  display: inline-block;
  box-shadow:
    inset 2px 2px 2px 0px rgba(255, 255, 255, 0.5),
    7px 7px 20px 0px rgba(0, 0, 0, 0.1),
    4px 4px 5px 0px rgba(0, 0, 0, 0.1);
  outline: none;
}

.modal-button {
  border: none;
  background: var(--poo-pink);
  background: linear-gradient(0deg, hsl(var(--hsl-poo-pink), 1) 0%, hsl(337, 79%, 61%) 100%);
  color: #fff;
  overflow: hidden;
}
.modal-button:hover {
  text-decoration: none;
  color: #fff;
}
.modal-button:before {
  position: absolute;
  content: '';
  display: inline-block;
  top: -180px;
  left: 0;
  width: 30px;
  height: 100%;
  background-color: #fff;
  animation: shiny-btn1 5s ease-in-out infinite;
}
.modal-button:hover {
  opacity: 0.7;
}
.modal-button:active {
  box-shadow:
    4px 4px 6px 0 rgba(255, 255, 255, 0.3),
    -4px -4px 6px 0 rgba(116, 125, 136, 0.2),
    inset -4px -4px 6px 0 rgba(255, 255, 255, 0.2),
    inset 4px 4px 6px 0 rgba(0, 0, 0, 0.2);
}

@-webkit-keyframes shiny-btn1 {
  0% {
    -webkit-transform: scale(0) rotate(45deg);
    opacity: 0;
  }
  80% {
    -webkit-transform: scale(0) rotate(45deg);
    opacity: 0.5;
  }
  81% {
    -webkit-transform: scale(4) rotate(45deg);
    opacity: 1;
  }
  100% {
    -webkit-transform: scale(50) rotate(45deg);
    opacity: 0;
  }
}
</style>

<style>
.poo-animate {
  position: absolute;
  top: 20px;
  font-size: 24px;
  animation: fall linear forwards;
}

@keyframes fall {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(calc(var(--vh) * 100));
  }
}
</style>
