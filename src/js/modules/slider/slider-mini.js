import {
    setInterval
} from 'core-js';
import Slider from './slider';

export default class MiniSlider extends Slider {
    constructor(container, next, prev, activeClass, animate, autoplay) {
        super(container, next, prev, activeClass, animate, autoplay);
    }

    // Работа со стилями слайдов
    decorizeSlider() {
        // Изменения активного класса в зависимости от выбранного слайда
        this.slides.forEach(slide => {
            slide.classList.remove(this.activeClass);
            if (this.animate) {
                slide.querySelector('.card__title').style.opacity = '0.4';
                slide.querySelector('.card__controls-arrow').style.opacity = '0';
            }
        });

        this.slides[0].classList.add(this.activeClass);

        // Работа с заголовками слайдеров
        if (this.animate) {
            this.slides[0].querySelector('.card__title').style.opacity = '1';
            this.slides[0].querySelector('.card__controls-arrow').style.opacity = '1';
        }
    }
    // Перетаскивание кнопок в конец массива
    moveButtonsToEnd() {
        this.slides.forEach((slide, i) => {
            if (slide.tagName === "BUTTON") {
                this.container.appendChild(this.slides[i]);
            }
        });
    }
    // Переключение слайдеров
    nextSlide() {
        this.container.appendChild(this.slides[0]);
        this.decorizeSlider();
        this.moveButtonsToEnd();
    }
    // Инициализация триггеров
    bindTriggers() {
        this.next.addEventListener('click', () => {
            this.nextSlide()
        });

        this.prev.addEventListener('click', () => {
            let active = this.slides[0];
            this.container.insertBefore(active, this.slides[this.slides.length - 1]);
            this.decorizeSlider();
            this.moveButtonsToEnd();

        });
        let playing = false;
        // Автоматическое переключение слайдов
        if (this.autoplay) {
            playing = setInterval(() => {
                this.nextSlide();
            }, 3000);
        }
        // Приостановка автоматического переключения при наведении
        this.slides.forEach((slide) => {
            slide.addEventListener('mouseenter', () => {
                clearInterval(playing);
            });
        });
        // Активация автоматического переключения 
        this.slides.forEach((slide) => {
            slide.addEventListener('mouseleave', () => {
                if (this.autoplay) {
                    playing = setInterval(() => {
                        this.nextSlide();
                    }, 3000);
                }
            });
        });



    }
    // Инициализация слайдера
    init() {
        try {
            this.container.style.cssText = `
                display: flex;
                flex-wrap: wrap;
                overflow: hidden;
                align-items: flex-start;
            `;

            this.bindTriggers();
            this.decorizeSlider();
        } catch (error) {}

    }
}