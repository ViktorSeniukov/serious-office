<script setup lang="ts">

</script>

<template>
    <header class="hero">
        <img
            class="hero__img"
            src="@assets/smoke-images/hero-1.png"
            alt="Люди в курилке" >
        <div class="hero__content">
            <h1 class="hero__title">Го Курить?</h1>

            <a
                href="#rules"
                class="button button--bg-blur button--neon">А как курить?</a>
        </div>
    </header>

    <section
        class="rules content"
        id="rules">
        <p class="rules__description">
            Мы курим по строго определенным правилам. Их не соблюдление карается законом
            <img
                class="rules__img"
                src="@assets/smoke-images/if-you-incorrect.png"
                alt="Топор в руке"
            >
        </p>

        <ul class="rules-list">
            <li>
                <h2>1. Кто ты?</h2>
                <p>
                    У каждого есть свой назначенный день недели, и он пропускает всех в свой день недели, а
                    остальные проходят в порядке их дней недели
                </p>

                <div>
                    <ul class="week">
                        <li class="week__day week-day">
                            <header class="week-day__header">
                                <div class="week-day__title">Пн</div>
                                <span>Заходишь первый</span>
                            </header>
                        </li>
                        <li class="week-day week-day--current">
                            <header class="week-day__header">
                                <div class="week-day__title">Вт</div>
                                <span>Допустим это сегодня</span>
                            </header>

                            <p class="week-day__description">
                                Ты всех пропускаешь и заходишь/выходишь в/из лифт(а) последний, дверь в офис,
                                курилка, все тоже самое, на протяжении всего маршрута до курилки
                            </p>
                        </li>
                        <li class="week__day week-day">
                            <header class="week-day__header">
                                <div class="week-day__title">Ср</div>
                                <span>Заходишь после понедельника</span>
                            </header>
                        </li>
                        <li class="week__day week-day">
                            <header class="week-day__header">
                                <div class="week-day__title">Чт</div>
                                <span>Заходишь после среды</span>
                            </header>
                        </li>
                        <li class="week__day week-day">
                            <header class="week-day__header">
                                <div class="week-day__title">Пт</div>
                                <span>Заходишь после Четверга</span>
                            </header>
                        </li>
                    </ul>
                </div>
            </li>

            <li>
                <h2>2. Вышел первый? Вызови лифт</h2>

                <img
                    class="rules__comics"
                    src="@assets/smoke-images/comics.png"
                    alt="Мужчина с короткими каштановыми волосами и бородой стоит в лифте, глядя на потолок. Фоном служат темные деревянные панели, создающие уютную атмосферу. У него широко раскрытые глаза, которые передают страх или удивление, как будто он видит над собой что-то неожиданное, в стиле комиксов."
                >
            </li>
        </ul>
    </section>
</template>

<style scoped>
.content {
  max-width: 500px;
  margin: 0 auto;
}

/* main */

.hero {
  --neon-button: var(--neon-orange);

  position: relative;
  height: 320px;
}

.hero__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 100% 20%;
}

.hero__content {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: calc(var(--gutter) * 4) calc(var(--gutter) * 3);
}

.hero__title {
  text-transform: uppercase;
  color: var(--light-main);

  font-weight: 700;
  font-size: 40px;
  text-align: center;
  width: 100%;
}

/* rules */
.rules {
  padding: var(--gutter);
}

.rules__description {
  font-size: 18px;
  display: flex;
}

.rules__img {
  width: 40%;
  height: 100%;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.8);

  /* Градиентная маска для размытия краев со всех сторон */
  -webkit-mask-image: radial-gradient(circle, rgba(0, 0, 0, 1) 15%, rgba(0, 0, 0, 0) 75%);
  mask-image: radial-gradient(circle, rgba(0, 0, 0, 1) 15%, rgba(0, 0, 0, 0) 75%);
}

/* week */
.week__day:not(:last-child) {
  margin-bottom: var(--gutter);
}

.week-day {
  --week-day-title-bg: var(--neon-orange);
  --week-day-title-color: var(--dark-main);
  --week-day-header-bg: var(--neon-orange-50);
}

.week-day--current {
  --week-day-title-bg: var(--neon-pink);
  --week-day-title-color: var(--light-main);
  --week-day-header-bg: var(--neon-pink-50);
}

.week-day__header {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: var(--gutter);

  border-radius: 90px 0 0 90px;

  background-image: linear-gradient(to right, var(--week-day-header-bg), hsla(0, 0%, 100%, 0));
}

.week-day__title {
  min-width: 40px;
  min-height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--week-day-title-color);
  background-color: var(--week-day-title-bg);
}

.week-day__description {
  margin: var(--gutter) 0;
  padding-left: calc(40px + var(--gutter));
}

.rules__comics {
  width: 100%;
  height: 100%;
}
</style>
