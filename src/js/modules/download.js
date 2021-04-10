export default class Download {
    constructor(btns) {
        this.btns = document.querySelectorAll(btns);
        this.path = 'assets/img/mainbg.jpg';
    }
    // Скачивание файла (имитация нажатия на ссылку)
    downLoadItem(url) {
        const element = document.createElement('a');
        element.setAttribute('href', url);
        element.setAttribute('download', 'nice_picture');
        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
    }
    // Инициализация
    init() {
        this.btns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.downLoadItem(this.path);
            });
        });
    }
}