import Slider from './slider';

export default class MainSlider extends Slider {
    constructor(btns, prevBtns) {
        super(btns, prevBtns);
    }
    // Показ слайдов
    showSlides(n) {
        // Переключение на первый слайд, если слайдер дошел до последнего слайдера
        if (n > this.slides.length) {
            this.slideIndex = 1;
        }
        // Переключение на последний слайд
        if (n < 1) {
            this.slideIndex = this.slides.length;
        }
        // Скрытие всех слайдов
        this.slides.forEach(slide => {
            slide.style.display = 'none';
        });
        try {
            // Скрытие всплывающего блока на 3-м слайде
            this.hanson.style.opacity = '0';
            // Показ всплывающего блока при попадании на 3-й слайд
            if (n == 3) {
                this.hanson.classList.add('animated');
                setTimeout(() => {
                    this.hanson.style.opacity = '1';
                    this.hanson.classList.add('slideInUp');
                }, 3000);
            } else {
                this.hanson.classList.remove('slideInUp');
            }
        } catch (e) {}
        // По умолчанию показ первого слайда
        this.slides[this.slideIndex - 1].style.display = 'block';
    }
    // Добавление слайдеров(изменение счетчита slideIndex в зависимости от переключения слайдера, вперед или назад)
    plusSlider(n) {
        this.showSlides(this.slideIndex += n);
    }
    // Работа с триггерами
    bindTriggers() {
        // Перелистывание слайдов
        this.btns.forEach(btn => {
            btn.addEventListener('click', () => {
                this.plusSlider(1);
            });
            // Нажав на логотип, показывается первый слайд
            btn.parentNode.previousElementSibling.addEventListener('click', (e) => {
                e.preventDefault();
                this.slideIndex = 1;
                this.showSlides(this.slideIndex);
            });
        });
        /*
            слайдер на второй странице
        */
        this.prevBtns.forEach(item => {
            item.addEventListener('click', (e) => {
                e.stopPropagation();
                e.preventDefault();
                this.plusSlider(-1);
            });
        });
    }
    // Инициализация слайдера
    render() {
        if (this.container) {
            // Всплывающий блок
            try {
                this.hanson = document.querySelector('.hanson');
            } catch (e) {}

            // Показ слайда
            this.showSlides(this.slideIndex);

            this.bindTriggers();

        }
    }
}