import { loadCss } from '@/utils/loadCss.ts';

export const useFallingEffect = (fallingText: string) => {
    const fallingContainer: HTMLDivElement | null = document.querySelector('#falling-effects');

    const createElement = (text: string): HTMLDivElement => {
        const element = document.createElement('div');
        element.className = 'falling-animate';
        element.textContent = text;

        return element;
    };

    const getRandomHorizontalPosition = (): number => Math.random() * 100;
    const getRandomStartSize = (): number => Math.random() * 20 + 20;
    const getRandomSpeed = (): number => Math.random() * 2 + 2;

    const generateAnimate = () => {
        const pooCount = Math.floor(Math.random() * 5) + 3; // От 3 до 7 какашек

        for (let i = 0; i < pooCount; i++) {
            const poo = createElement(fallingText);

            poo.style.left = `${getRandomHorizontalPosition()}vw`;

            poo.style.fontSize = `${getRandomStartSize()}px`;

            const duration = getRandomSpeed();
            poo.style.animationDuration = `${duration}s`;

            fallingContainer?.appendChild(poo);

            setTimeout(() => poo.remove(), duration * 1000); // Удаляем после анимации
        }
    };

    const loadCssForFalling = (): void => {
        loadCss('FallingEffect.css');
    };

    const createEffect = (): void => {
        generateAnimate();
    };

    return {
        createEffect,
        loadCssForFalling
    };
};
