export default class VideoPlayer {
    constructor(triggers, overlay) {
        this.btns = document.querySelectorAll(triggers);
        this.overlay = document.querySelector(overlay);
        this.close = this.overlay.querySelector('.close');
    }
    // Настройка триггеров
    bindTriggers() {
        // Показ плеера по нажатию на кнопку
        this.btns.forEach(btn => {
            btn.addEventListener('click', () => {
                if (document.querySelector('iframe#frame')) {
                    this.overlay.style.display = 'flex';
                } else {
                    const path = btn.getAttribute('data-url');
                    this.createPlayer(path);
                }
            });
        });
    }
    // Закрытие модального окна с видео
    bindCloseBtn() {
        this.close.addEventListener('click', () => {
            this.overlay.style.display = 'none';
            this.player.stopVideo();
        });
    }
    // Создание и настройка плеера
    createPlayer(url) {
        this.player = new YT.Player('frame', {
            height: '100%',
            width: '100%',
            videoId: `${url}`
        });
        // Показ модально окна с видео
        this.overlay.style.display = 'flex';
    }
    // Инициализация плеера
    init() {
        // Подключение YouTube API
        const tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        // Инициализация триггеров
        this.bindTriggers();
        this.bindCloseBtn();
    }
}