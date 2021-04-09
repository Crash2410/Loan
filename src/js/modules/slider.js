export default class Slider {
    constructor(page, btns) {
        this.page = document.querySelector(page);
        this.slides = this.page.children;
        this.btns = document.querySelectorAll(btns);
        this.slideIndex = 1;
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
        // По умолчанию показ первого слайда
        this.slides[this.slideIndex - 1].style.display = 'block';
    }
    // Добавление слайдеров(изменение счетчита slideIndex в зависимости от переключения слайдера, вперед или назад)
    plusSlider(n) {
        this.showSlides(this.slideIndex += n);
    }
    // Инициализация слайдера
    render() {
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
        // Показ слайда
        this.showSlides(this.slideIndex);
    }
}