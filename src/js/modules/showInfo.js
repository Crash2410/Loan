export default class ShowInfo {
    constructor(btns) {
        this.btns = document.querySelectorAll(btns);
    }
    // Пока блока при нажатии на кнопку
    showInfo() {
        this.btns.forEach(btn => {
            btn.addEventListener('click', function () {
                const sibling = btn.closest('.module__info-show').nextElementSibling;
                
                sibling.classList.toggle('msg');
                sibling.style.marginTop = '20px';
            });
        });
    }
    // Инициализация
    init() {
        this.showInfo();
    }
}