<script setup lang="ts">
    import { onMounted, ref } from 'vue';
    import axios from 'axios';
    import dayjs from 'dayjs';
    import utc from 'dayjs/plugin/utc';
    import { BASE_API_URL } from '@/constants/baseUrl.ts';
    import { useHead } from '@unhead/vue';

    let errorCount = 0;
    const MAX_ERROR_COUNT = 1;

    dayjs.extend(utc);

    const lastSmokeTime = ref({
        time: '',
        message: 'Исследование вселенной'
    });

    const subscribe = async () => {
        if (errorCount >= MAX_ERROR_COUNT) {
            throw `Error count ${errorCount}`;
        }

        try {
            const { data } = await axios.get(`${BASE_API_URL}/smoke-time`);

            lastSmokeTime.value = data;
            await subscribe();
        } catch {
            errorCount++;

            setTimeout(() => {
                subscribe();
            }, 500);
        }
    };

    const onMessageSubmit = async (isCheck?: boolean) => {
        const now = dayjs.utc();

        await axios.post(`${BASE_API_URL}/smoke-time`, {
            date: now.format('YYYY-MM-DD'),
            time: !isCheck && now.format('HH:mm:ss')
        });
    };

    onMounted(() => {
        subscribe();
        onMessageSubmit(true);
    });

    useHead({
        meta: [
            {
                name: 'og:title',
                content: 'А когда мы курили?'
            },
            {
                name: 'og:description',
                content: 'Курение убивает! Не кури часто! Следи за временем!Таймер последнего покура один на всех'
            }
        ]
    });
</script>

<template>
    <div class="smoke-time-page">
        <p>Последний раз пришли с перекура</p>

        <span>
            <h3>{{ lastSmokeTime.message || dayjs.utc(lastSmokeTime.time).local().format('HH:mm:ss') }}</h3>
        </span>

        <button
            @click="() => onMessageSubmit(false)"
            class="button button--neon"
            type="button"
        >
            Пришли с перекура
        </button>
    </div>
</template>

<style scoped>
.smoke-time-page {
  --neon-button: var(--neon-pink);

  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  padding: calc(var(--gutter) * 2);

  min-height: calc(var(--vh) * 100);
}

p, h3 {
  margin-top: 0;
  margin-bottom: 0;
  text-align: center;
}

p {
  margin-bottom: calc(var(--gutter) * 2);
}

span {
  display: block;
  width: 100%;
  height: 40px;
  margin-bottom: calc(var(--gutter) * 4);
}

button {
  height: 46px;
}
</style>
