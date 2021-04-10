import Slider from './slider';

export default class MainSlider extends Slider {
    constructor(btns) {
        super(btns);
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
        // Скрытие всплывающего блока на 3-м слайде
        this.hanson.style.opacity = '0';
        // По умолчанию показ первого слайда
        this.slides[this.slideIndex - 1].style.display = 'block';
    }
    // Добавление слайдеров(изменение счетчита slideIndex в зависимости от переключения слайдера, вперед или назад)
    plusSlider(n) {
        this.showSlides(this.slideIndex += n);
    }
    // Показ всплывающего блока при попадании на 3-й слайд
    showMessageBlock() {
        if (this.slideIndex == 3) {
            this.hanson.classList.add('animated');
            // Показ блока через 3 секунды
            setTimeout(() => {
                this.hanson.style.opacity = '1';
                this.hanson.classList.add('slideInUp');
            }, 3000);
        } else {
            this.hanson.classList.remove('slideInUp');
        }
    }
    // Инициализация слайдера
    render() {
        try {
            // Всплывающий блок
            try {
                this.hanson = document.querySelector('.hanson');
            } catch (e) {}
            // Перелистывание слайдов
            this.btns.forEach(btn => {
                btn.addEventListener('click', () => {
                    this.plusSlider(1);
                    this.showMessageBlock();
                });
                // Нажав на логотип, показывается первый слайд
                btn.parentNode.previousElementSibling.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.slideIndex = 1;
                    this.showSlides(this.slideIndex);
                });
            });
            // Показ слайда
            this.showSlides(this.slideIndex);
        } catch (error) {}

    }
}